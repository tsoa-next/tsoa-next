import { lstat, readdir, realpath, stat } from 'node:fs/promises'
import { basename, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { glob, hasMagic } from 'glob'
import type { Stats } from 'node:fs'

const discoverableConfigFileNames = new Set(['tsoa.json', 'tsoa.yaml', 'tsoa.yml', 'tsoa.config.js', 'tsoa.config.cjs'])
const skippedDirectoryNames = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage', '.turbo', '.cache'])

export type DiscoveryMode = 'path' | 'glob'

export interface DiscoveredConfigFile {
  absolutePath: string
  displayPath: string
  sortKey: string
}

export interface DiscoveryResult {
  effectiveRoot: string
  matches: DiscoveredConfigFile[]
  mode: DiscoveryMode
}

type DirectoryLikeEntry = {
  name: string
  path: string
}

const normalizePathForDisplay = (value: string) => value.replaceAll(sep, '/')

const toDisplayPath = (basePath: string, absolutePath: string): string => {
  const relativePath = relative(basePath, absolutePath)
  return normalizePathForDisplay(relativePath.length > 0 ? relativePath : basename(absolutePath))
}

const isDiscoverableConfigPath = (path: string): boolean => discoverableConfigFileNames.has(basename(path))

const getGlobOptions = () => ({
  absolute: true,
  dot: true,
  follow: true,
  nodir: false,
  windowsPathsNoEscape: sep === '\\',
})

const isFileSystemMissingError = (error: unknown): error is NodeJS.ErrnoException => {
  return !!error && typeof error === 'object' && 'code' in error && (error.code === 'ENOENT' || error.code === 'ENOTDIR')
}

const addDiscoveredConfig = async (path: string, displayBasePath: string, seenRealPaths: Set<string>, results: DiscoveredConfigFile[]): Promise<void> => {
  if (!isDiscoverableConfigPath(path)) {
    return
  }

  const resolvedRealPath = await realpath(path)
  if (seenRealPaths.has(resolvedRealPath)) {
    return
  }

  seenRealPaths.add(resolvedRealPath)
  const displayPath = toDisplayPath(displayBasePath, path)
  results.push({
    absolutePath: path,
    displayPath,
    sortKey: normalizePathForDisplay(displayPath),
  })
}

const scanDirectoryTree = async (rootPath: string, displayBasePath: string, seenDirectoryRealPaths: Set<string>, seenFileRealPaths: Set<string>, results: DiscoveredConfigFile[]): Promise<void> => {
  const pendingDirectories: DirectoryLikeEntry[] = [{ name: basename(rootPath), path: rootPath }]

  while (pendingDirectories.length > 0) {
    const currentDirectory = pendingDirectories.pop()
    if (!currentDirectory) {
      continue
    }

    const currentRealPath = await realpath(currentDirectory.path)
    if (seenDirectoryRealPaths.has(currentRealPath)) {
      continue
    }

    seenDirectoryRealPaths.add(currentRealPath)

    const directoryEntries = await readdir(currentDirectory.path, { withFileTypes: true })
    for (const entry of directoryEntries) {
      if (entry.isDirectory()) {
        if (!skippedDirectoryNames.has(entry.name)) {
          pendingDirectories.push({
            name: entry.name,
            path: join(currentDirectory.path, entry.name),
          })
        }
        continue
      }

      if (entry.isFile()) {
        await addDiscoveredConfig(join(currentDirectory.path, entry.name), displayBasePath, seenFileRealPaths, results)
        continue
      }

      if (!entry.isSymbolicLink()) {
        continue
      }

      const symbolicPath = join(currentDirectory.path, entry.name)
      let symbolicTargetStats: Stats
      try {
        symbolicTargetStats = await stat(symbolicPath)
      } catch (error) {
        if (isFileSystemMissingError(error)) {
          continue
        }

        throw error
      }

      if (symbolicTargetStats.isDirectory()) {
        if (!skippedDirectoryNames.has(entry.name)) {
          pendingDirectories.push({
            name: entry.name,
            path: symbolicPath,
          })
        }
        continue
      }

      if (symbolicTargetStats.isFile()) {
        await addDiscoveredConfig(symbolicPath, displayBasePath, seenFileRealPaths, results)
      }
    }
  }
}

const expandGlobInput = async (input: string): Promise<string[]> => {
  return await glob(input, getGlobOptions())
}

const resolvePathInput = (input: string): string => {
  return isAbsolute(input) ? input : resolve(input)
}

const discoverFromPath = async (input: string): Promise<DiscoveryResult> => {
  const resolvedPath = resolvePathInput(input)
  let rootStats: Stats
  try {
    rootStats = await lstat(resolvedPath)
  } catch (error) {
    if (isFileSystemMissingError(error)) {
      throw new Error(`Discover path '${input}' does not exist.`)
    }

    throw error
  }

  const seenDirectoryRealPaths = new Set<string>()
  const seenFileRealPaths = new Set<string>()
  const results: DiscoveredConfigFile[] = []

  if (rootStats.isDirectory()) {
    await scanDirectoryTree(resolvedPath, resolvedPath, seenDirectoryRealPaths, seenFileRealPaths, results)
  } else if (rootStats.isFile()) {
    await addDiscoveredConfig(resolvedPath, resolvedPath, seenFileRealPaths, results)
  } else if (rootStats.isSymbolicLink()) {
    const symbolicTargetStats = await stat(resolvedPath)
    if (symbolicTargetStats.isDirectory()) {
      await scanDirectoryTree(resolvedPath, resolvedPath, seenDirectoryRealPaths, seenFileRealPaths, results)
    } else if (symbolicTargetStats.isFile()) {
      await addDiscoveredConfig(resolvedPath, resolvedPath, seenFileRealPaths, results)
    }
  }

  results.sort((left, right) => left.sortKey.localeCompare(right.sortKey))

  return {
    effectiveRoot: resolvedPath,
    matches: results,
    mode: 'path',
  }
}

const discoverFromGlob = async (input: string): Promise<DiscoveryResult> => {
  const expandedPaths = await expandGlobInput(input)
  if (expandedPaths.length === 0) {
    throw new Error(`No filesystem entries matched discover glob '${input}'.`)
  }

  const seenDirectoryRealPaths = new Set<string>()
  const seenFileRealPaths = new Set<string>()
  const results: DiscoveredConfigFile[] = []
  const displayBasePath = process.cwd()

  for (const expandedPath of expandedPaths) {
    const expandedPathStats = await lstat(expandedPath)
    if (expandedPathStats.isDirectory()) {
      await scanDirectoryTree(expandedPath, displayBasePath, seenDirectoryRealPaths, seenFileRealPaths, results)
      continue
    }

    if (expandedPathStats.isFile()) {
      await addDiscoveredConfig(expandedPath, displayBasePath, seenFileRealPaths, results)
      continue
    }

    if (!expandedPathStats.isSymbolicLink()) {
      continue
    }

    let symbolicTargetStats: Stats
    try {
      symbolicTargetStats = await stat(expandedPath)
    } catch (error) {
      if (isFileSystemMissingError(error)) {
        continue
      }

      throw error
    }
    if (symbolicTargetStats.isDirectory()) {
      await scanDirectoryTree(expandedPath, displayBasePath, seenDirectoryRealPaths, seenFileRealPaths, results)
    } else if (symbolicTargetStats.isFile()) {
      await addDiscoveredConfig(expandedPath, displayBasePath, seenFileRealPaths, results)
    }
  }

  results.sort((left, right) => left.sortKey.localeCompare(right.sortKey))

  return {
    effectiveRoot: displayBasePath,
    matches: results,
    mode: 'glob',
  }
}

export const getDefaultDiscoverRoot = (): string => process.cwd()

export async function discoverConfigs(input = getDefaultDiscoverRoot()): Promise<DiscoveryResult> {
  return hasMagic(input) ? discoverFromGlob(input) : discoverFromPath(input)
}
