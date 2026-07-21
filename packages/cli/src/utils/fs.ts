import * as fs from 'node:fs'
import { AsyncLocalStorage } from 'node:async_hooks'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export type OutputWriteMode = 'always' | 'if-changed' | 'check'

export interface OutputWriteResult<T> {
  result: T
  changedFiles: string[]
}

type OutputWriteContext = {
  changedFiles: Set<string>
  mode: OutputWriteMode
}

const outputWriteStorage = new AsyncLocalStorage<OutputWriteContext>()

const resolvePathLike = (path: fs.PathLike): string => resolve(path instanceof URL ? fileURLToPath(path) : path.toString())

export async function fsExists(path: fs.PathLike): Promise<boolean> {
  try {
    await fs.promises.access(path, fs.constants.F_OK)
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false
    }

    throw error
  }
}

const validateExistingDirectory = async (path: fs.PathLike): Promise<void> => {
  try {
    const stats = await fs.promises.stat(path)
    if (!stats.isDirectory()) {
      throw new Error(`Output directory '${resolvePathLike(path)}' is not a directory.`)
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return
    }

    throw error
  }
}

export const fsMkDir = async (path: fs.PathLike, options?: fs.MakeDirectoryOptions & { recursive?: boolean }): Promise<string | undefined> => {
  if (outputWriteStorage.getStore()?.mode === 'check') {
    await validateExistingDirectory(path)
    return undefined
  }

  return await fs.promises.mkdir(path, options)
}

const getEncoding = (options?: fs.WriteFileOptions): BufferEncoding => {
  if (typeof options === 'string') {
    return options
  }

  return options?.encoding ?? 'utf8'
}

const toBuffer = (data: string | NodeJS.ArrayBufferView, options?: fs.WriteFileOptions): Buffer => {
  if (typeof data === 'string') {
    return Buffer.from(data, getEncoding(options))
  }

  return Buffer.from(data.buffer, data.byteOffset, data.byteLength)
}

const fileContentsMatch = async (path: fs.PathLike, expectedContent: Buffer): Promise<boolean> => {
  try {
    const existingContent = await fs.promises.readFile(path)
    return existingContent.equals(expectedContent)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false
    }

    throw error
  }
}

export const fsWriteFile = async (path: fs.PathLike, data: string | NodeJS.ArrayBufferView, options?: fs.WriteFileOptions): Promise<void> => {
  const context = outputWriteStorage.getStore()
  if (context && context.mode !== 'always') {
    const content = toBuffer(data, options)
    if (await fileContentsMatch(path, content)) {
      return
    }

    context.changedFiles.add(resolvePathLike(path))
    if (context.mode === 'check') {
      return
    }
  }

  await fs.promises.writeFile(path, data, options)
}

export const fsReadFile = fs.promises.readFile

export const withOutputWriteMode = async <T>(mode: OutputWriteMode, action: () => Promise<T>): Promise<OutputWriteResult<T>> => {
  const context: OutputWriteContext = {
    changedFiles: new Set<string>(),
    mode,
  }
  const result = await outputWriteStorage.run(context, action)

  return {
    result,
    changedFiles: [...context.changedFiles].sort((left, right) => left.localeCompare(right)),
  }
}

export const getOutputWriteMode = (): OutputWriteMode => outputWriteStorage.getStore()?.mode ?? 'always'
