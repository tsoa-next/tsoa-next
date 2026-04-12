import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { delimiter, join } from 'node:path'
import { tmpdir } from 'node:os'

const Module = require('node:module') as typeof import('node:module') & {
  _initPaths(): void
}

let mockUiPeersRoot: string | undefined
let previousNodePath: string | undefined

function ensurePackageFile(nodeModulesRoot: string, packageName: string, relativePath: string, contents: string) {
  const packageRoot = join(nodeModulesRoot, packageName)
  mkdirSync(join(packageRoot, relativePath === 'package.json' ? '' : relativePath.substring(0, relativePath.lastIndexOf('/'))), { recursive: true })
  writeFileSync(join(packageRoot, relativePath), contents, 'utf8')
}

export function installMockUiPeers() {
  if (mockUiPeersRoot) {
    return mockUiPeersRoot
  }

  mockUiPeersRoot = mkdtempSync(join(tmpdir(), `tsoa-specpath-ui-peers-${process.pid}-`))
  const nodeModulesRoot = join(mockUiPeersRoot, 'node_modules')
  previousNodePath = process.env.NODE_PATH

  mkdirSync(nodeModulesRoot, { recursive: true })

  ensurePackageFile(nodeModulesRoot, 'swagger-ui-express', 'package.json', JSON.stringify({ name: 'swagger-ui-express', version: '0.0.0' }))
  ensurePackageFile(nodeModulesRoot, 'swagger-ui-express', 'node_modules/swagger-ui-dist/package.json', JSON.stringify({ name: 'swagger-ui-dist', version: '0.0.0' }))
  ensurePackageFile(
    nodeModulesRoot,
    'swagger-ui-express',
    'node_modules/swagger-ui-dist/swagger-ui-bundle.js',
    'window.SwaggerUIBundle = window.SwaggerUIBundle || function () {}; window.SwaggerUIBundle.presets = { apis: {} };',
  )
  ensurePackageFile(nodeModulesRoot, 'swagger-ui-express', 'node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js', 'window.SwaggerUIStandalonePreset = {};')
  ensurePackageFile(nodeModulesRoot, 'swagger-ui-express', 'node_modules/swagger-ui-dist/swagger-ui.css', 'body { background: #fff; }')

  ensurePackageFile(nodeModulesRoot, 'swagger-ui-koa', 'package.json', JSON.stringify({ name: 'swagger-ui-koa', version: '0.0.0' }))
  ensurePackageFile(
    nodeModulesRoot,
    'swagger-ui-koa',
    'static/swagger-ui-bundle.js',
    'window.SwaggerUIBundle = window.SwaggerUIBundle || function () {}; window.SwaggerUIBundle.presets = { apis: {} };',
  )
  ensurePackageFile(nodeModulesRoot, 'swagger-ui-koa', 'static/swagger-ui-standalone-preset.js', 'window.SwaggerUIStandalonePreset = {};')
  ensurePackageFile(nodeModulesRoot, 'swagger-ui-koa', 'static/swagger-ui.css', 'body { background: #fff; }')

  ensurePackageFile(nodeModulesRoot, 'hapi-swagger', 'package.json', JSON.stringify({ name: 'hapi-swagger', version: '0.0.0' }))
  ensurePackageFile(nodeModulesRoot, 'hapi-swagger', 'node_modules/swagger-ui-dist/package.json', JSON.stringify({ name: 'swagger-ui-dist', version: '0.0.0' }))
  ensurePackageFile(
    nodeModulesRoot,
    'hapi-swagger',
    'node_modules/swagger-ui-dist/swagger-ui-bundle.js',
    'window.SwaggerUIBundle = window.SwaggerUIBundle || function () {}; window.SwaggerUIBundle.presets = { apis: {} };',
  )
  ensurePackageFile(nodeModulesRoot, 'hapi-swagger', 'node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js', 'window.SwaggerUIStandalonePreset = {};')
  ensurePackageFile(nodeModulesRoot, 'hapi-swagger', 'node_modules/swagger-ui-dist/swagger-ui.css', 'body { background: #fff; }')

  ensurePackageFile(nodeModulesRoot, 'redoc', 'package.json', JSON.stringify({ name: 'redoc', version: '0.0.0' }))
  ensurePackageFile(nodeModulesRoot, 'redoc', 'bundles/redoc.standalone.js', 'window.Redoc = { init: function () {} };')

  ensurePackageFile(nodeModulesRoot, 'rapidoc', 'package.json', JSON.stringify({ name: 'rapidoc', version: '0.0.0' }))
  ensurePackageFile(nodeModulesRoot, 'rapidoc', 'dist/rapidoc-min.js', 'window.customElements = window.customElements || { define: function () {} };')

  process.env.NODE_PATH = previousNodePath ? `${nodeModulesRoot}${delimiter}${previousNodePath}` : nodeModulesRoot
  Module._initPaths()

  return mockUiPeersRoot
}

export function cleanupMockUiPeers() {
  if (!mockUiPeersRoot) {
    return
  }

  rmSync(mockUiPeersRoot, { force: true, recursive: true })
  mockUiPeersRoot = undefined

  if (previousNodePath === undefined) {
    delete process.env.NODE_PATH
  } else {
    process.env.NODE_PATH = previousNodePath
  }
  previousNodePath = undefined
  Module._initPaths()
}
