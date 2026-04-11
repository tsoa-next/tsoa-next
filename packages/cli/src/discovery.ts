import { lstat, readdir, realpath, stat } from 'node:fs/promises'
import { basename, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { glob, hasMagic } from 'glob'
import type { Dirent, Stats } from 'node:fs'

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
  path: string
}

type DiscoveryAccumulator = {
  results: DiscoveredConfigFile[]
  seenDirectoryRealPaths: Set<string>
  seenFileRealPaths: Set<string>
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

const createDiscoveryAccumulator = (): DiscoveryAccumulator => ({
  results: [],
  seenDirectoryRealPaths: new Set<string>(),
  seenFileRealPaths: new Set<string>(),
})

const sortDiscoveredConfigs = (results: DiscoveredConfigFile[]) => {
  results.sort((left, right) => left.sortKey.localeCompare(right.sortKey))
}

const enqueueDirectoryIfIncluded = (pendingDirectories: DirectoryLikeEntry[], parentPath: string, name: string) => {
  if (skippedDirectoryNames.has(name)) {
    return
  }

  pendingDirectories.push({
    path: join(parentPath, name),
  })
}

const getOptionalSymbolicTargetStats = async (symbolicPath: string): Promise<Stats | undefined> => {
  try {
    return await stat(symbolicPath)
  } catch (error) {
    if (isFileSystemMissingError(error)) {
      return undefined
    }

    throw error
  }
}

const getRequiredSymbolicTargetStats = async (input: string, symbolicPath: string): Promise<Stats> => {
  const symbolicTargetStats = await getOptionalSymbolicTargetStats(symbolicPath)
  if (!symbolicTargetStats) {
    throw new Error(`Discover path '${input}' does not exist.`)
  }

  return symbolicTargetStats
}

const processDirectoryEntry = async (
  entry: Dirent,
  currentDirectoryPath: string,
  displayBasePath: string,
  pendingDirectories: DirectoryLikeEntry[],
  accumulator: DiscoveryAccumulator,
): Promise<void> => {
  if (entry.isDirectory()) {
    enqueueDirectoryIfIncluded(pendingDirectories, currentDirectoryPath, entry.name)
    return
  }

  const entryPath = join(currentDirectoryPath, entry.name)

  if (entry.isFile()) {
    await addDiscoveredConfig(entryPath, displayBasePath, accumulator.seenFileRealPaths, accumulator.results)
    return
  }

  if (!entry.isSymbolicLink()) {
    return
  }

  const symbolicTargetStats = await getOptionalSymbolicTargetStats(entryPath)
  if (!symbolicTargetStats) {
    return
  }

  if (symbolicTargetStats.isDirectory()) {
    enqueueDirectoryIfIncluded(pendingDirectories, currentDirectoryPath, entry.name)
    return
  }

  if (symbolicTargetStats.isFile()) {
    await addDiscoveredConfig(entryPath, displayBasePath, accumulator.seenFileRealPaths, accumulator.results)
  }
}

const processRootPath = async (rootPath: string, rootStats: Stats, displayBasePath: string, accumulator: DiscoveryAccumulator): Promise<void> => {
  if (rootStats.isDirectory()) {
    await scanDirectoryTree(rootPath, displayBasePath, accumulator)
    return
  }

  if (rootStats.isFile()) {
    await addDiscoveredConfig(rootPath, displayBasePath, accumulator.seenFileRealPaths, accumulator.results)
  }
}

const scanDirectoryTree = async (rootPath: string, displayBasePath: string, accumulator: DiscoveryAccumulator): Promise<void> => {
  const pendingDirectories: DirectoryLikeEntry[] = [{ path: rootPath }]

  while (pendingDirectories.length > 0) {
    const currentDirectory = pendingDirectories.pop()
    if (!currentDirectory) {
      continue
    }

    const currentRealPath = await realpath(currentDirectory.path)
    if (accumulator.seenDirectoryRealPaths.has(currentRealPath)) {
      continue
    }

    accumulator.seenDirectoryRealPaths.add(currentRealPath)

    const directoryEntries = await readdir(currentDirectory.path, { withFileTypes: true })
    for (const entry of directoryEntries) {
      await processDirectoryEntry(entry, currentDirectory.path, displayBasePath, pendingDirectories, accumulator)
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

  const accumulator = createDiscoveryAccumulator()

  if (rootStats.isSymbolicLink()) {
    const symbolicTargetStats = await getRequiredSymbolicTargetStats(input, resolvedPath)
    await processRootPath(resolvedPath, symbolicTargetStats, resolvedPath, accumulator)
  } else {
    await processRootPath(resolvedPath, rootStats, resolvedPath, accumulator)
  }

  sortDiscoveredConfigs(accumulator.results)

  return {
    effectiveRoot: resolvedPath,
    matches: accumulator.results,
    mode: 'path',
  }
}

const processGlobMatch = async (expandedPath: string, displayBasePath: string, accumulator: DiscoveryAccumulator): Promise<void> => {
  const expandedPathStats = await lstat(expandedPath)
  if (expandedPathStats.isSymbolicLink()) {
    const symbolicTargetStats = await getOptionalSymbolicTargetStats(expandedPath)
    if (!symbolicTargetStats) {
      return
    }

    await processRootPath(expandedPath, symbolicTargetStats, displayBasePath, accumulator)
    return
  }

  await processRootPath(expandedPath, expandedPathStats, displayBasePath, accumulator)
}

const discoverFromGlob = async (input: string): Promise<DiscoveryResult> => {
  const expandedPaths = await expandGlobInput(input)
  if (expandedPaths.length === 0) {
    throw new Error(`No filesystem entries matched discover glob '${input}'.`)
  }

  const accumulator = createDiscoveryAccumulator()
  const displayBasePath = process.cwd()

  for (const expandedPath of expandedPaths) {
    await processGlobMatch(expandedPath, displayBasePath, accumulator)
  }

  sortDiscoveredConfigs(accumulator.results)

  return {
    effectiveRoot: displayBasePath,
    matches: accumulator.results,
    mode: 'glob',
  }
}

export const getDefaultDiscoverRoot = (): string => process.cwd()

export async function discoverConfigs(input = getDefaultDiscoverRoot()): Promise<DiscoveryResult> {
  return hasMagic(input) ? discoverFromGlob(input) : discoverFromPath(input)
}
