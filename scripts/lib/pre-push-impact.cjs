const COMMON_TEST_WORKSPACES = ['tsoa-tests', 'tsoa-tests-esm']
const UNIT_TEST_WORKSPACES = ['tsoa-tests']

const NON_TEST_PATH_PREFIXES = ['.github/', '.vscode/', 'site/']
const NON_TEST_ROOT_FILES = new Set([
  '.gitignore',
  '.syncpackrc.json',
  'LICENSE',
  'README.MD',
  'README.md',
  'commitlint.config.cjs',
  'eslint.config.ts',
  'prettier.config.ts',
])
const EXACT_PATH_WORKSPACES = new Map([
  ['.husky/pre-push', UNIT_TEST_WORKSPACES],
  ['package-lock.json', COMMON_TEST_WORKSPACES],
  ['package.json', COMMON_TEST_WORKSPACES],
  ['scripts/check-pre-push.cjs', UNIT_TEST_WORKSPACES],
  ['scripts/lib/pre-push-impact.cjs', UNIT_TEST_WORKSPACES],
  ['scripts/prepare-dev-publish.cjs', UNIT_TEST_WORKSPACES],
  ['turbo.json', COMMON_TEST_WORKSPACES],
])

function getAffectedTestsForFiles(files) {
  const affected = new Set()

  for (const file of files) {
    for (const workspace of getAffectedTestWorkspacesForFile(file)) {
      affected.add(workspace)
    }
  }

  return Array.from(affected).sort(comparePaths)
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

  if (file.startsWith('packages/cli/') || file.startsWith('packages/runtime/') || file.startsWith('packages/tsoa/')) {
    return COMMON_TEST_WORKSPACES
  }

  const exactMatch = EXACT_PATH_WORKSPACES.get(file)
  if (exactMatch) {
    return exactMatch
  }

  if (!file.includes('/')) {
    return NON_TEST_ROOT_FILES.has(file) ? [] : []
  }

  return []
}

function comparePaths(left, right) {
  return left.localeCompare(right)
}

module.exports = {
  COMMON_TEST_WORKSPACES,
  getAffectedTestsForFiles,
  getAffectedTestWorkspacesForFile,
}
