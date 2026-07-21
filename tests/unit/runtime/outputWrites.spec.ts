import { expect } from 'chai'
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import 'mocha'
import { fsMkDir, fsWriteFile, withOutputWriteMode } from '../../../packages/cli/src/utils/fs'

describe('change-aware output writes', () => {
  const temporaryDirectories = new Set<string>()

  afterEach(() => {
    for (const directory of temporaryDirectories) {
      rmSync(directory, { force: true, recursive: true })
    }

    temporaryDirectories.clear()
  })

  const createTemporaryDirectory = () => {
    const directory = mkdtempSync(join(tmpdir(), 'tsoa-output-writes-'))
    temporaryDirectories.add(directory)
    return directory
  }

  it('does not rewrite an output whose content is unchanged', async () => {
    const directory = createTemporaryDirectory()
    const outputPath = join(directory, 'routes.ts')
    writeFileSync(outputPath, 'current output', 'utf8')
    const originalModificationTime = statSync(outputPath).mtimeMs

    const output = await withOutputWriteMode('if-changed', async () => {
      await fsWriteFile(outputPath, 'current output', { encoding: 'utf8' })
    })

    expect(output.changedFiles).to.deep.equal([])
    expect(statSync(outputPath).mtimeMs).to.equal(originalModificationTime)
  })

  it('writes and reports outputs whose content changed', async () => {
    const directory = createTemporaryDirectory()
    const outputPath = join(directory, 'swagger.json')
    writeFileSync(outputPath, 'old output', 'utf8')

    const output = await withOutputWriteMode('if-changed', async () => {
      await fsWriteFile(outputPath, 'new output', { encoding: 'utf8' })
    })

    expect(output.changedFiles).to.deep.equal([outputPath])
    expect(readFileSync(outputPath, 'utf8')).to.equal('new output')
  })

  it('reports missing and stale outputs in check mode without changing the filesystem', async () => {
    const directory = createTemporaryDirectory()
    const existingOutputPath = join(directory, 'swagger.json')
    const missingDirectory = join(directory, 'generated')
    const missingOutputPath = join(missingDirectory, 'routes.ts')
    writeFileSync(existingOutputPath, 'old output', 'utf8')

    const output = await withOutputWriteMode('check', async () => {
      await fsMkDir(missingDirectory, { recursive: true })
      await fsWriteFile(existingOutputPath, 'new output', { encoding: 'utf8' })
      await fsWriteFile(missingOutputPath, 'new route output', { encoding: 'utf8' })
    })

    expect(output.changedFiles).to.deep.equal([missingOutputPath, existingOutputPath])
    expect(readFileSync(existingOutputPath, 'utf8')).to.equal('old output')
    expect(existsSync(missingDirectory)).to.equal(false)
  })

  it('keeps concurrent output modes isolated', async () => {
    const directory = createTemporaryDirectory()
    const checkedPath = join(directory, 'checked.ts')
    const writtenPath = join(directory, 'written.ts')

    const [checkedOutput, writtenOutput] = await Promise.all([
      withOutputWriteMode('check', async () => {
        await fsWriteFile(checkedPath, 'checked output')
      }),
      withOutputWriteMode('if-changed', async () => {
        await fsWriteFile(writtenPath, 'written output')
      }),
    ])

    expect(checkedOutput.changedFiles).to.deep.equal([checkedPath])
    expect(writtenOutput.changedFiles).to.deep.equal([writtenPath])
    expect(existsSync(checkedPath)).to.equal(false)
    expect(readFileSync(writtenPath, 'utf8')).to.equal('written output')
  })
})
