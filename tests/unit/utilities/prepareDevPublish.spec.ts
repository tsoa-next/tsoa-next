import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { expect } from 'chai'
import 'mocha'

describe('prepare-dev-publish', () => {
  const repoRoot = resolve(__dirname, '../../..')
  const scriptPath = resolve(repoRoot, 'scripts/prepare-dev-publish.cjs')
  const runtimeSourcePackage = readJson(resolve(repoRoot, 'packages/runtime/package.json'))

  function createOutputDir() {
    return mkdtempSync(join(tmpdir(), 'tsoa-dev-publish-'))
  }

  function readJson(filePath: string) {
    return JSON.parse(readFileSync(filePath, 'utf8'))
  }

  afterEach(() => {
    rmSync(resolve(repoRoot, '.tmp'), { force: true, recursive: true })
  })

  it('stamps all publishable packages with the same dev version and rewrites internal dependencies', () => {
    const outDir = createOutputDir()

    try {
      const manifest = JSON.parse(
        execFileSync('node', [scriptPath, '--suffix', 'dev.42.abcdef0', '--out-dir', outDir], {
          cwd: repoRoot,
          encoding: 'utf8',
        }),
      )
      const expectedVersion = `${runtimeSourcePackage.version}-dev.42.abcdef0`

      expect(manifest.version).to.equal(expectedVersion)
      expect(manifest.packages.map((pkg: { name: string }) => pkg.name)).to.deep.equal(['@tsoa-next/runtime', '@tsoa-next/cli', 'tsoa-next'])

      const runtimePackage = readJson(join(outDir, 'runtime', 'package.json'))
      const cliPackage = readJson(join(outDir, 'cli', 'package.json'))
      const tsoaPackage = readJson(join(outDir, 'tsoa', 'package.json'))

      expect(runtimePackage.version).to.equal(manifest.version)
      expect(cliPackage.version).to.equal(manifest.version)
      expect(tsoaPackage.version).to.equal(manifest.version)

      expect(cliPackage.dependencies['@tsoa-next/runtime']).to.equal(manifest.version)
      expect(tsoaPackage.dependencies['@tsoa-next/cli']).to.equal(manifest.version)
      expect(tsoaPackage.dependencies['@tsoa-next/runtime']).to.equal(manifest.version)
      expect(runtimePackage.dependencies.validator).to.equal(runtimeSourcePackage.dependencies.validator)
    } finally {
      rmSync(outDir, { force: true, recursive: true })
    }
  })

  it('rejects output directories that would delete the repository root or its ancestors', () => {
    expect(() =>
      execFileSync('node', [scriptPath, '--suffix', 'dev.42.abcdef0', '--out-dir', '.'], {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: 'pipe',
      }),
    ).to.throw(/repository root or one of its ancestors/)
  })

  it('fails fast for invalid prerelease suffixes without producing staged packages', () => {
    const outDir = createOutputDir()

    try {
      expect(() =>
        execFileSync('node', [scriptPath, '--suffix', 'dev bad suffix', '--out-dir', outDir], {
          cwd: repoRoot,
          encoding: 'utf8',
          stdio: 'pipe',
        }),
      ).to.throw(/Invalid prerelease suffix/)

      expect(existsSync(join(outDir, 'runtime', 'package.json'))).to.equal(false)
      expect(existsSync(join(outDir, 'cli', 'package.json'))).to.equal(false)
      expect(existsSync(join(outDir, 'tsoa', 'package.json'))).to.equal(false)
    } finally {
      rmSync(outDir, { force: true, recursive: true })
    }
  })
})
