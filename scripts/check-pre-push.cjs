#!/usr/bin/env node

const { execFileSync, spawnSync } = require('node:child_process')
const { existsSync, readFileSync } = require('node:fs')
const path = require('node:path')

const EMPTY_TREE_SHA = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'
const BUILD_WORKSPACES = ['@tsoa-next/cli', '@tsoa-next/runtime', 'tsoa-next']
const TEST_DEPENDENCIES = {
  'tsoa-tests': BUILD_WORKSPACES,
  'tsoa-tests-esm': BUILD_WORKSPACES,
}
const ZERO_SHA_PATTERN = /^0+$/
const NON_TEST_PATH_PREFIXES = ['.github/', '.vscode/', 'site/']
const NON_TEST_ROOT_FILES = new Set(['README.MD', 'README.md', 'LICENSE'])
const GLOBAL_TEST_PATHS = new Set([
  '.c8rc.json',
  '.gitignore',
  '.husky/pre-push',
  '.husky/pre-commit',
  '.nvmrc',
  '.npmrc',
  '.syncpackrc.json',
  'commitlint.config.cjs',
  'eslint.config.ts',
  'package-lock.json',
  'package.json',
  'prettier.config.ts',
  'turbo.json',
])
const TRUSTED_GIT_EXECUTABLES = ['/opt/homebrew/bin/git', '/usr/local/bin/git', '/usr/bin/git']
const GIT_EXECUTABLE = resolveGitExecutable()
const NPM_CLI = resolveNpmCliPath()

const repoRoot = execFileSync(GIT_EXECUTABLE, ['rev-parse', '--show-toplevel'], {
  cwd: process.cwd(),
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
}).trim()
const hookArgs = process.argv.slice(2)
const dryRun = hookArgs.includes('--dry-run')
const remoteName = hookArgs.find(arg => arg !== '--dry-run') || 'origin'
const stdin = process.stdin.isTTY ? '' : readStdin()

const pushSpecs = parsePushSpecs(stdin)
const changedFiles = pushSpecs.length > 0 ? collectChangedFilesFromPushSpecs(pushSpecs, remoteName) : collectChangedFilesFromFallback(remoteName)
const affectedTests = getAffectedTests(changedFiles)

if (changedFiles.length === 0) {
  console.log('No changed files detected for this push; skipping pre-push tests.')
  process.exit(0)
}

if (affectedTests.length === 0) {
  console.log('No affected test workspaces detected for this push; skipping pre-push tests.')
  process.exit(0)
}

console.log(`Affected test workspaces: ${affectedTests.join(', ')}`)

if (dryRun) {
  console.log('Dry run enabled; not executing build or test commands.')
  process.exit(0)
}

const buildWorkspaces = Array.from(new Set(affectedTests.flatMap(testWorkspace => TEST_DEPENDENCIES[testWorkspace] || [])))
runNpmExec(['turbo', 'run', 'build', ...toTurboFilters(buildWorkspaces), '--output-logs=full'])
runNpmExec(['turbo', 'run', 'test', ...toTurboFilters(affectedTests), '--concurrency=1', '--output-logs=full'])

function readStdin() {
  return readFileSync(0, 'utf8')
}

function parsePushSpecs(input) {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [localRef, localSha, remoteRef, remoteSha] = line.split(/\s+/)
      return { localRef, localSha, remoteRef, remoteSha }
    })
    .filter(spec => spec.localRef && spec.localSha && spec.remoteRef && spec.remoteSha)
}

function collectChangedFilesFromPushSpecs(pushSpecs, remote) {
  const files = new Set()

  for (const spec of pushSpecs) {
    if (ZERO_SHA_PATTERN.test(spec.localSha) || spec.localRef.startsWith('refs/tags/')) {
      continue
    }

    const baseSha = ZERO_SHA_PATTERN.test(spec.remoteSha) ? resolveNewBranchBase(spec.localSha, remote) : spec.remoteSha
    for (const file of diffFiles(baseSha, spec.localSha)) {
      files.add(file)
    }
  }

  return Array.from(files).sort(comparePaths)
}

function collectChangedFilesFromFallback(remote) {
  const upstreamRef = tryRunGit(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{upstream}'])
  const headSha = runGit(['rev-parse', 'HEAD'])

  if (upstreamRef) {
    return diffFiles(upstreamRef, headSha)
  }

  return diffFiles(resolveNewBranchBase(headSha, remote), headSha)
}

function resolveNewBranchBase(localSha, remote) {
  const defaultRemoteRef = resolveDefaultRemoteRef(remote)
  if (!defaultRemoteRef) {
    return EMPTY_TREE_SHA
  }

  return tryRunGit(['merge-base', localSha, defaultRemoteRef]) || EMPTY_TREE_SHA
}

function resolveDefaultRemoteRef(remote) {
  const remoteHead = tryRunGit(['symbolic-ref', '--quiet', '--short', `refs/remotes/${remote}/HEAD`])
  if (remoteHead) {
    return remoteHead
  }

  for (const candidate of [`refs/remotes/${remote}/main`, `refs/remotes/${remote}/master`]) {
    if (tryRunGit(['show-ref', '--verify', '--quiet', candidate]) !== undefined) {
      return candidate
    }
  }

  return undefined
}

function diffFiles(base, head) {
  if (base === head) {
    return []
  }

  const output = runGit(['diff', '--name-only', '--diff-filter=ACMR', `${base}..${head}`])
  return output ? output.split('\n').filter(Boolean) : []
}

function getAffectedTests(files) {
  const affected = new Set()

  for (const file of files) {
    for (const workspace of getAffectedTestWorkspacesForFile(file)) {
      affected.add(workspace)
    }
  }

  return Array.from(affected).sort(comparePaths)
}

function toTurboFilters(workspaces) {
  return workspaces.flatMap(workspace => ['--filter', workspace])
}

function runNpmExec(args) {
  const result = spawnSync(process.execPath, [NPM_CLI, 'exec', '--', ...args], {
    cwd: repoRoot,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

function runGit(args) {
  return execFileSync(GIT_EXECUTABLE, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  }).trim()
}

function tryRunGit(args) {
  try {
    return runGit(args)
  } catch {
    return undefined
  }
}

function getAffectedTestWorkspacesForFile(file) {
  if (NON_TEST_PATH_PREFIXES.some(prefix => file.startsWith(prefix))) {
    return []
  }

  if (file.startsWith('tests/esm/')) {
    return ['tsoa-tests-esm']
  }

  if (file.startsWith('tests/')) {
    return ['tsoa-tests']
  }

  if (startsWithAny(file, ['packages/cli/', 'packages/runtime/', 'packages/tsoa/', 'scripts/', '.husky/'])) {
    return ['tsoa-tests', 'tsoa-tests-esm']
  }

  if (GLOBAL_TEST_PATHS.has(file)) {
    return ['tsoa-tests', 'tsoa-tests-esm']
  }

  if (!file.includes('/')) {
    return NON_TEST_ROOT_FILES.has(file) ? [] : ['tsoa-tests', 'tsoa-tests-esm']
  }

  return []
}

function startsWithAny(value, prefixes) {
  return prefixes.some(prefix => value.startsWith(prefix))
}

function comparePaths(left, right) {
  return left.localeCompare(right)
}

function resolveFirstExistingPath(candidates) {
  const executable = candidates.find(candidate => existsSync(candidate))
  if (!executable) {
    throw new Error(`Unable to locate an executable in the trusted path list: ${candidates.join(', ')}`)
  }

  return executable
}

function resolveGitExecutable() {
  const envOverride = process.env.TSOA_GIT_EXECUTABLE
  if (envOverride) {
    return envOverride
  }

  const trustedExecutable = TRUSTED_GIT_EXECUTABLES.find(candidate => existsSync(candidate))
  if (trustedExecutable) {
    return trustedExecutable
  }

  const pathResolvedGit = spawnSync('git', ['--version'], {
    cwd: process.cwd(),
    stdio: 'ignore',
  })
  if (pathResolvedGit.status === 0) {
    return 'git'
  }

  throw new Error(
    `Unable to locate Git. Checked trusted paths (${TRUSTED_GIT_EXECUTABLES.join(', ')}) and then tried resolving 'git' from PATH. ` +
      `Set TSOA_GIT_EXECUTABLE to override the executable path.`,
  )
}

function resolveNpmCliPath() {
  const nodeBinDir = path.dirname(process.execPath)
  return resolveFirstExistingPath([
    path.resolve(nodeBinDir, '../lib/node_modules/npm/bin/npm-cli.js'),
    path.resolve(nodeBinDir, '../../lib/node_modules/npm/bin/npm-cli.js'),
  ])
}
