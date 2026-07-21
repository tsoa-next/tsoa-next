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
})

function expectPatchedPackageResolution(packageName: string, minimumVersion: string) {
  const packageLock = readPackageLock()
  const matchingPackages = Object.entries(packageLock.packages).filter(([, metadata]) => metadata.name === packageName || hasPackageResolution(packageName, metadata))

  expect(matchingPackages, `${packageName} should be present in package-lock.json`).not.to.be.empty
  expect(matchingPackages.filter(([, metadata]) => compareVersions(metadata.version, minimumVersion) < 0).map(([packagePath, metadata]) => `${packagePath}: ${metadata.version}`)).to.deep.equal([])
}

function readPackageLock() {
  const packageLockPath = resolve(__dirname, '..', '..', '..', 'package-lock.json')
  return JSON.parse(readFileSync(packageLockPath, 'utf8')) as PackageLock
}

function hasPackageResolution(packageName: string, metadata: LockfilePackage) {
  return typeof metadata.resolved === 'string' && metadata.resolved.includes(`/${packageName}/-/${packageName}-`)
}

function compareVersions(left: string | undefined, right: string) {
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

function normaliseVersion(version: string | undefined) {
  return String(version)
    .split('.')
    .map(part => Number.parseInt(part, 10))
    .filter(part => Number.isFinite(part))
}
