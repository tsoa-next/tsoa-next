import * as fs from 'fs'
import { promisify } from 'util'

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

export const fsMkDir = promisify(fs.mkdir)
export const fsWriteFile = promisify(fs.writeFile)
export const fsReadFile = promisify(fs.readFile)
