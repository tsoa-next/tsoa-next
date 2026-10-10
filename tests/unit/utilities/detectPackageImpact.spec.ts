import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { expect } from 'chai'
import 'mocha'

const TEST_GIT_ENV = {
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_CONFIG_NOSYSTEM: '1',
}

describe('detect-package-impact', function () {
  this.timeout(60000)

  const repoRoot = resolve(__dirname, '../../..')
  const scriptPath = resolve(repoRoot, '.github/actions/detect-package-impact/detect-impact.sh')

  function createTempDir(prefix: string) {
    return mkdtempSync(join(tmpdir(), prefix))
  }

  function git(cwd: string, args: string[], env?: NodeJS.ProcessEnv) {
    return execFileSync('git', ['-c', 'commit.gpgsign=false', '-c', 'tag.gpgsign=false', ...args], {
      cwd,
      env: env ? { ...process.env, ...TEST_GIT_ENV, ...env } : { ...process.env, ...TEST_GIT_ENV },
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim()
  }

  function setupRepositoryFixture(changedFile = '.changeset/fixture.md', shallowHead = true) {
    const workspace = createTempDir('tsoa-detect-impact-')
    const sourceRepo = join(workspace, 'source')
    const originRepo = join(workspace, 'origin.git')
    const runnerRepo = join(workspace, 'runner')

    try {
      git(workspace, ['init', '-b', 'main', sourceRepo])
      git(sourceRepo, ['config', 'user.name', 'Codex'])
      git(sourceRepo, ['config', 'user.email', 'codex@example.com'])

      writeFileSync(join(sourceRepo, 'README.md'), '# fixture\n')
      git(sourceRepo, ['add', 'README.md'])
      git(sourceRepo, ['commit', '-m', 'base'])
      const baseSha = git(sourceRepo, ['rev-parse', 'HEAD'])

      git(sourceRepo, ['checkout', '-b', 'feature/dev-build'])
      const changedPath = join(sourceRepo, changedFile)
      mkdirSync(dirname(changedPath), { recursive: true })
      const content = changedFile.startsWith('.changeset/') ? "---\n'tsoa-next': patch\n---\n\nFixture change.\n" : '// Functional regression fixture.\n'
      writeFileSync(changedPath, content)
      git(sourceRepo, ['add', changedFile])
      git(sourceRepo, ['commit', '-m', 'feature'])
      const headSha = git(sourceRepo, ['rev-parse', 'HEAD'])

      git(sourceRepo, ['checkout', 'main'])
      git(sourceRepo, ['merge', '--no-ff', 'feature/dev-build', '-m', 'merge feature'])
      const mergeSha = git(sourceRepo, ['rev-parse', 'HEAD'])

      git(workspace, ['clone', '--bare', sourceRepo, originRepo])

      git(workspace, ['init', runnerRepo])
      git(runnerRepo, ['remote', 'add', 'origin', originRepo])
      git(runnerRepo, ['fetch', '--no-tags', '--prune', '--no-recurse-submodules', 'origin', '+refs/heads/*:refs/remotes/origin/*', '+refs/tags/*:refs/tags/*'])
      git(runnerRepo, ['checkout', '--progress', '--force', mergeSha])
      if (shallowHead) {
        git(runnerRepo, ['fetch', '--no-tags', '--depth=1', 'origin', headSha])
      }

      return { baseSha, headSha, mergeSha, runnerRepo, workspace }
    } catch (error) {
      rmSync(workspace, { force: true, recursive: true })
      throw error
    }
  }

  it('publishes merged pull requests with changesets even when the fetched head commit has shallow history', () => {
    const { baseSha, headSha, mergeSha, runnerRepo, workspace } = setupRepositoryFixture()
    const outputFile = join(workspace, 'github-output.txt')
    const summaryFile = join(workspace, 'github-summary.txt')

    try {
      execFileSync('bash', [scriptPath], {
        cwd: runnerRepo,
        env: {
          ...process.env,
          BASE_SHA: baseSha,
          DEFAULT_BRANCH: 'main',
          EVENT_NAME: 'pull_request',
          GITHUB_OUTPUT: outputFile,
          GITHUB_STEP_SUMMARY: summaryFile,
          HEAD_SHA: mergeSha,
          PR_HEAD_REF: 'feature/dev-build',
          PR_HEAD_SHA: headSha,
          PR_MERGED: 'true',
        },
        encoding: 'utf8',
        stdio: 'pipe',
      })

      const output = readFileSync(outputFile, 'utf8')

      expect(output).to.include('has-changeset=true')
      expect(output).to.include('should-publish-dev-build=true')
      expect(output).to.include('has-impact=true')
    } finally {
      rmSync(workspace, { force: true, recursive: true })
    }
  })

  it('runs required checks for a test-only diff without selecting dev publication', () => {
    const changedFile = 'tests/unit/swagger/templateHelpers.spec.ts'
    const { baseSha, headSha, mergeSha, runnerRepo, workspace } = setupRepositoryFixture(changedFile, false)

    try {
      for (const headRef of ['feature/test-recovery', 'changeset-release/main']) {
        const outputName = headRef.startsWith('changeset-release/') ? 'release' : 'feature'
        for (const merged of ['false', 'true']) {
          const outputFile = join(workspace, `${outputName}-${merged}-output.txt`)
          execFileSync('bash', [scriptPath], {
            cwd: runnerRepo,
            env: {
              ...process.env,
              BASE_SHA: baseSha,
              DEFAULT_BRANCH: 'main',
              EVENT_NAME: 'pull_request',
              GITHUB_OUTPUT: outputFile,
              GITHUB_STEP_SUMMARY: '',
              HEAD_SHA: mergeSha,
              PR_HEAD_REF: headRef,
              PR_HEAD_SHA: headSha,
              PR_MERGED: merged,
            },
            encoding: 'utf8',
            stdio: 'pipe',
          })

          const output = readFileSync(outputFile, 'utf8')
          expect(output).to.include('has-impact=true')
          expect(output).to.include('has-changeset=false')
          expect(output).to.include('should-publish-dev-build=false')
          expect(output).to.include(`is-release-pr=${headRef.startsWith('changeset-release/')}`)
          expect(output).to.include(`changed-files<<__EOF__\n${changedFile}\n__EOF__`)
          expect(output).to.include(`impactful-files<<__EOF__\n${changedFile}\n__EOF__`)
        }
      }
    } finally {
      rmSync(workspace, { force: true, recursive: true })
    }
  })
})
