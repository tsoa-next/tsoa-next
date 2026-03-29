#!/usr/bin/env node

const { spawnSync } = require('node:child_process')
const { rmSync } = require('node:fs')
const path = require('node:path')

const repoRoot = path.resolve(__dirname, '..')
const npmCli = resolveNpmCliPath()
const c8Cli = require.resolve('c8/bin/c8.js')

try {
  removePath('coverage')
  runNodeTool(npmCli, ['--prefix', 'tests', 'run', 'pretest'])
  runNodeTool(c8Cli, [npmCli, '--prefix', 'tests', 'run', 'test:ci'])
} finally {
  removePath(path.join('coverage', 'tmp'))
}

function removePath(targetPath) {
  rmSync(path.join(repoRoot, targetPath), { recursive: true, force: true })
}

function runNodeTool(toolPath, args) {
  const result = spawnSync(process.execPath, [toolPath, ...args], {
    cwd: repoRoot,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

function resolveNpmCliPath() {
  const nodeBinDir = path.dirname(process.execPath)
  const candidates = [
    path.resolve(nodeBinDir, '../lib/node_modules/npm/bin/npm-cli.js'),
    path.resolve(nodeBinDir, '../../lib/node_modules/npm/bin/npm-cli.js'),
  ]

  for (const candidate of candidates) {
    try {
      require('node:fs').accessSync(candidate)
      return candidate
    } catch {
      // Keep scanning.
    }
  }

  throw new Error(`Unable to locate npm-cli.js from Node executable '${process.execPath}'.`)
}
