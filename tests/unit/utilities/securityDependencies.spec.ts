import { expect } from 'chai'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface LockfilePackage {
  name?: string
  resolved?: string
  version?: string
}

interface PackageLock {
  packages: Record<string, LockfilePackage>
}

describe('Security dependency resolutions', () => {
  it('should keep serialize-javascript on a patched version', () => {
    expectPatchedPackageResolution('serialize-javascript', '7.0.5')
  })

  it('should keep esbuild on a patched version', () => {
    expectPatchedPackageResolution('esbuild', '0.25.0')
  })

  it('should keep vite on a patched version', () => {
    expectPatchedPackageResolution('vite', '6.4.3')
  })

  it('should reject protected dependency resolutions without a version', () => {
    expect(() => requirePackageVersion('vite', 'node_modules/vite', {})).to.throw('vite resolution at node_modules/vite should declare a version')
  })
})

function expectPatchedPackageResolution(packageName: string, minimumVersion: string) {
  const packageLock = readPackageLock()
  const matchingPackages = Object.entries(packageLock.packages).filter(([, metadata]) => metadata.name === packageName || hasPackageResolution(packageName, metadata))

  expect(matchingPackages, `${packageName} should be present in package-lock.json`).not.to.be.empty
  const resolvedPackages = matchingPackages.map(([packagePath, metadata]) => [packagePath, requirePackageVersion(packageName, packagePath, metadata)] as const)
  expect(resolvedPackages.filter(([, version]) => compareVersions(version, minimumVersion) < 0).map(([packagePath, version]) => `${packagePath}: ${version}`)).to.deep.equal([])
}

function readPackageLock() {
  const packageLockPath = resolve(__dirname, '..', '..', '..', 'package-lock.json')
  return JSON.parse(readFileSync(packageLockPath, 'utf8')) as PackageLock
}

function hasPackageResolution(packageName: string, metadata: LockfilePackage) {
  return typeof metadata.resolved === 'string' && metadata.resolved.includes(`/${packageName}/-/${packageName}-`)
}

function requirePackageVersion(packageName: string, packagePath: string, metadata: LockfilePackage) {
  if (typeof metadata.version !== 'string' || metadata.version.length === 0) {
    throw new Error(`${packageName} resolution at ${packagePath} should declare a version`)
  }

  return metadata.version
}

function compareVersions(left: string, right: string) {
  const leftParts = normaliseVersion(left)
  const rightParts = normaliseVersion(right)
  const maxLength = Math.max(leftParts.length, rightParts.length)

  for (let index = 0; index < maxLength; index++) {
    const difference = (leftParts[index] ?? 0) - (rightParts[index] ?? 0)
    if (difference !== 0) {
      return difference
    }
  }

  return 0
}

function normaliseVersion(version: string) {
  return version
    .split('.')
    .map(part => Number.parseInt(part, 10))
    .filter(part => Number.isFinite(part))
}
