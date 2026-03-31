import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { expect } from 'chai'
import 'mocha'

describe('detect-package-impact', function () {
  this.timeout(20000)

  const repoRoot = resolve(__dirname, '../../..')
  const scriptPath = resolve(repoRoot, '.github/actions/detect-package-impact/detect-impact.sh')

  function createTempDir(prefix: string) {
    return mkdtempSync(join(tmpdir(), prefix))
  }

  function git(cwd: string, args: string[], env?: NodeJS.ProcessEnv) {
    return execFileSync('git', args, {
      cwd,
      env: env ? { ...process.env, ...env } : process.env,
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim()
  }

  function setupRepositoryFixture() {
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
      const changesetPath = join(sourceRepo, '.changeset')
      mkdirSync(changesetPath, { recursive: true })
      writeFileSync(join(changesetPath, 'fixture.md'), "---\n'tsoa-next': patch\n---\n\nFixture change.\n")
      git(sourceRepo, ['add', '.changeset/fixture.md'])
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
      git(runnerRepo, ['fetch', '--no-tags', '--depth=1', 'origin', headSha])

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
})
