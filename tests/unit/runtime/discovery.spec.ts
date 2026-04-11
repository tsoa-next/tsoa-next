import { expect } from 'chai'
import { mkdtemp, mkdir, rm, symlink, unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, relative, sep } from 'node:path'
import 'mocha'
import { discoverConfigs } from '../../../packages/cli/src/discovery'

const normalizePathForAssertion = (value: string) => value.replaceAll(sep, '/')

describe('CLI discovery', () => {
  const temporaryDirectories = new Set<string>()
  let originalWorkingDirectory = process.cwd()

  afterEach(async () => {
    process.chdir(originalWorkingDirectory)

    for (const directory of temporaryDirectories) {
      await rm(directory, { force: true, recursive: true })
    }

    temporaryDirectories.clear()
  })

  it('defaults to the current working directory when no input is provided', async () => {
    const rootDir = await mkdtemp(join(tmpdir(), 'tsoa-discovery-default-'))
    temporaryDirectories.add(rootDir)
    originalWorkingDirectory = process.cwd()

    await mkdir(join(rootDir, 'packages', 'app'), { recursive: true })
    await writeFile(join(rootDir, 'packages', 'app', 'tsoa.json'), '{}', 'utf8')

    process.chdir(rootDir)

    const discoveryResult = await discoverConfigs()

    expect(discoveryResult.mode).to.equal('path')
    expect(discoveryResult.matches.map(match => normalizePathForAssertion(match.displayPath))).to.deep.equal(['packages/app/tsoa.json'])
  })

  it('discovers supported config files without recursing the call stack and skips common junk folders', async () => {
    const rootDir = await mkdtemp(join(tmpdir(), 'tsoa-discovery-path-'))
    temporaryDirectories.add(rootDir)

    let deepDirectory = rootDir
    for (let index = 0; index < 120; index += 1) {
      deepDirectory = join(deepDirectory, `d${index}`)
      await mkdir(deepDirectory, { recursive: true })
    }

    await mkdir(join(rootDir, 'project-a'), { recursive: true })
    await mkdir(join(rootDir, 'node_modules', 'pkg'), { recursive: true })
    await mkdir(join(rootDir, 'dist'), { recursive: true })

    await writeFile(join(deepDirectory, 'tsoa.json'), '{}', 'utf8')
    await writeFile(join(rootDir, 'project-a', 'tsoa.yaml'), 'spec: {}\n', 'utf8')
    await writeFile(join(rootDir, 'project-a', 'tsoa.config.cjs'), 'module.exports = {}\n', 'utf8')
    await writeFile(join(rootDir, 'node_modules', 'pkg', 'tsoa.json'), '{}', 'utf8')
    await writeFile(join(rootDir, 'dist', 'tsoa.yml'), 'spec: {}\n', 'utf8')

    const discoveryResult = await discoverConfigs(rootDir)
    const discoveredPaths = discoveryResult.matches.map(match => normalizePathForAssertion(match.displayPath))

    expect(discoveredPaths).to.include(normalizePathForAssertion(relative(rootDir, join(deepDirectory, 'tsoa.json'))))
    expect(discoveredPaths).to.include('project-a/tsoa.config.cjs')
    expect(discoveredPaths).to.include('project-a/tsoa.yaml')
    expect(discoveredPaths).to.not.include('node_modules/pkg/tsoa.json')
    expect(discoveredPaths).to.not.include('dist/tsoa.yml')
  })

  it('expands glob inputs and reports paths relative to the current working directory', async () => {
    const rootDir = await mkdtemp(join(tmpdir(), 'tsoa-discovery-glob-'))
    temporaryDirectories.add(rootDir)
    originalWorkingDirectory = process.cwd()

    await mkdir(join(rootDir, 'packages', 'alpha', 'service'), { recursive: true })
    await mkdir(join(rootDir, 'packages', 'beta'), { recursive: true })
    await writeFile(join(rootDir, 'packages', 'alpha', 'service', 'tsoa.json'), '{}', 'utf8')
    await writeFile(join(rootDir, 'packages', 'beta', 'tsoa.config.js'), 'module.exports = {}\n', 'utf8')

    process.chdir(rootDir)

    const discoveryResult = await discoverConfigs('packages/*')

    expect(discoveryResult.mode).to.equal('glob')
    expect(discoveryResult.matches.map(match => normalizePathForAssertion(match.displayPath))).to.deep.equal(['packages/alpha/service/tsoa.json', 'packages/beta/tsoa.config.js'])
  })

  it('follows symlinks and deduplicates results by real path', async function () {
    const rootDir = await mkdtemp(join(tmpdir(), 'tsoa-discovery-symlink-'))
    temporaryDirectories.add(rootDir)

    const realDirectory = join(rootDir, 'real')
    const aliasDirectory = join(rootDir, 'alias')
    const linkedFile = join(rootDir, 'linked-tsoa.json')
    await mkdir(realDirectory, { recursive: true })
    await writeFile(join(realDirectory, 'tsoa.json'), '{}', 'utf8')

    try {
      await symlink(realDirectory, aliasDirectory, process.platform === 'win32' ? 'junction' : 'dir')
      await symlink(join(realDirectory, 'tsoa.json'), linkedFile, 'file')
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && (error.code === 'EPERM' || error.code === 'EACCES')) {
        this.skip()
        return
      }

      throw error
    }

    const discoveryResult = await discoverConfigs(rootDir)

    expect(discoveryResult.matches).to.have.length(1)
  })

  it('throws a clear error when a discover path is a broken symlink', async function () {
    const rootDir = await mkdtemp(join(tmpdir(), 'tsoa-discovery-broken-symlink-'))
    temporaryDirectories.add(rootDir)

    const danglingTarget = join(rootDir, 'missing', 'tsoa.json')
    const brokenLink = join(rootDir, 'broken-tsoa.json')

    try {
      await symlink(danglingTarget, brokenLink, 'file')
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && (error.code === 'EPERM' || error.code === 'EACCES')) {
        this.skip()
        return
      }

      throw error
    }

    let thrownError: Error | undefined

    try {
      await discoverConfigs(brokenLink)
    } catch (error) {
      if (error instanceof Error) {
        thrownError = error
      } else {
        throw error
      }
    } finally {
      await unlink(brokenLink).catch(() => undefined)
    }

    expect(thrownError?.message).to.equal(`Discover path '${brokenLink}' does not exist.`)
  })

  it('throws a clear error when a discover glob matches no filesystem entries', async () => {
    const rootDir = await mkdtemp(join(tmpdir(), 'tsoa-discovery-empty-glob-'))
    temporaryDirectories.add(rootDir)
    originalWorkingDirectory = process.cwd()
    process.chdir(rootDir)

    let thrownError: Error | undefined

    try {
      await discoverConfigs('packages/*')
    } catch (error) {
      if (error instanceof Error) {
        thrownError = error
      } else {
        throw error
      }
    }

    expect(thrownError?.message).to.equal("No filesystem entries matched discover glob 'packages/*'.")
  })
})
