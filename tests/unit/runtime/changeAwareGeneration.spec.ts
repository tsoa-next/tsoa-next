import { expect } from 'chai'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import 'mocha'
import { generateSpecAndRoutes } from '../../../packages/cli/src/api'
import { withOutputWriteMode } from '../../../packages/cli/src/utils/fs'
import type { Config, Tsoa } from '@tsoa-next/runtime'
import { getDefaultOptions } from '../../fixtures/defaultOptions'

describe('change-aware combined generation', () => {
  const temporaryDirectories = new Set<string>()
  const metadata: Tsoa.Metadata = {
    controllers: [],
    referenceTypeMap: {},
  }

  afterEach(() => {
    for (const directory of temporaryDirectories) {
      rmSync(directory, { force: true, recursive: true })
    }

    temporaryDirectories.clear()
  })

  const createFixture = () => {
    const rootDirectory = mkdtempSync(join(tmpdir(), 'tsoa-change-aware-generation-'))
    temporaryDirectories.add(rootDirectory)
    const entryFile = join(rootDirectory, 'entry.ts')
    const routesDirectory = join(rootDirectory, 'routes')
    const specDirectory = join(rootDirectory, 'spec')
    writeFileSync(entryFile, 'export const entry = true\n', 'utf8')

    const config: Config = getDefaultOptions(specDirectory, entryFile)
    config.routes.routesDir = routesDirectory

    return {
      config,
      routesPath: join(routesDirectory, 'routes.ts'),
      specPath: join(specDirectory, 'swagger.json'),
    }
  }

  it('creates missing outputs and repairs only stale outputs', async () => {
    const fixture = createFixture()

    await withOutputWriteMode('if-changed', async () => await generateSpecAndRoutes({ configuration: fixture.config }, metadata))

    expect(existsSync(fixture.routesPath)).to.equal(true)
    expect(existsSync(fixture.specPath)).to.equal(true)
    const expectedRoutes = readFileSync(fixture.routesPath, 'utf8')
    const expectedSpec = readFileSync(fixture.specPath, 'utf8')
    writeFileSync(fixture.routesPath, 'stale routes', 'utf8')

    await withOutputWriteMode('if-changed', async () => await generateSpecAndRoutes({ configuration: fixture.config }, metadata))

    expect(readFileSync(fixture.routesPath, 'utf8')).to.equal(expectedRoutes)
    expect(readFileSync(fixture.specPath, 'utf8')).to.equal(expectedSpec)
  })

  it('reports stale outputs without writing files', async () => {
    const fixture = createFixture()
    await withOutputWriteMode('if-changed', async () => await generateSpecAndRoutes({ configuration: fixture.config }, metadata))
    const expectedSpec = readFileSync(fixture.specPath, 'utf8')
    writeFileSync(fixture.routesPath, 'stale routes', 'utf8')

    const output = await withOutputWriteMode('check', async () => await generateSpecAndRoutes({ configuration: fixture.config }, metadata))

    expect(output.changedFiles).to.deep.equal([fixture.routesPath])
    expect(readFileSync(fixture.routesPath, 'utf8')).to.equal('stale routes')
    expect(readFileSync(fixture.specPath, 'utf8')).to.equal(expectedSpec)
  })
})
