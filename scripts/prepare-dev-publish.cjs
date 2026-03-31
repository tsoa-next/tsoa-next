#!/usr/bin/env node

const fs = require('node:fs/promises')
const path = require('node:path')

const repoRoot = path.resolve(__dirname, '..')
const packageDirs = ['packages/runtime', 'packages/cli', 'packages/tsoa']
const dependencyFields = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})

async function main() {
  const { outDir, suffix } = parseArgs(process.argv.slice(2))
  const absoluteOutDir = path.resolve(repoRoot, outDir)

  if (!/^[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*$/.test(suffix)) {
    throw new Error(`Invalid prerelease suffix '${suffix}'. Use only alphanumerics, '-' and '.' segments.`)
  }

  assertSafeOutputDirectory(absoluteOutDir)

  await fs.rm(absoluteOutDir, { force: true, recursive: true })
  await fs.mkdir(absoluteOutDir, { recursive: true })

  const sourcePackages = await Promise.all(
    packageDirs.map(async relativeDir => {
      const packageDir = path.join(repoRoot, relativeDir)
      const packageJsonPath = path.join(packageDir, 'package.json')
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))

      return {
        packageDir,
        packageJson,
        relativeDir,
      }
    }),
  )

  const baseVersion = sourcePackages[0]?.packageJson.version
  if (!baseVersion) {
    throw new Error('Unable to determine base version from package manifests.')
  }

  const devVersion = `${baseVersion}-${suffix}`
  const internalPackageNames = new Set(sourcePackages.map(pkg => pkg.packageJson.name))
  const preparedPackages = []

  for (const sourcePackage of sourcePackages) {
    const targetDir = path.join(absoluteOutDir, path.basename(sourcePackage.relativeDir))
    await fs.cp(sourcePackage.packageDir, targetDir, { recursive: true })

    const updatedPackageJson = structuredClone(sourcePackage.packageJson)
    updatedPackageJson.version = devVersion

    for (const field of dependencyFields) {
      if (!updatedPackageJson[field]) {
        continue
      }

      for (const dependencyName of Object.keys(updatedPackageJson[field])) {
        if (internalPackageNames.has(dependencyName)) {
          updatedPackageJson[field][dependencyName] = devVersion
        }
      }
    }

    await fs.writeFile(path.join(targetDir, 'package.json'), `${JSON.stringify(updatedPackageJson, null, 2)}\n`, 'utf8')
    preparedPackages.push({
      dir: targetDir,
      name: updatedPackageJson.name,
      version: updatedPackageJson.version,
    })
  }

  process.stdout.write(
    `${JSON.stringify(
      {
        outDir: absoluteOutDir,
        packages: preparedPackages,
        version: devVersion,
      },
      null,
      2,
    )}\n`,
  )
}

function parseArgs(args) {
  let outDir
  let suffix

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    const value = args[index + 1]

    if (arg === '--out-dir') {
      outDir = value
      index += 1
      continue
    }

    if (arg === '--suffix') {
      suffix = value
      index += 1
      continue
    }

    throw new Error(`Unknown argument '${arg}'.`)
  }

  if (!outDir) {
    throw new Error('Missing required --out-dir argument.')
  }

  if (!suffix) {
    throw new Error('Missing required --suffix argument.')
  }

  return { outDir, suffix }
}

function assertSafeOutputDirectory(absoluteOutDir) {
  const fileSystemRoot = path.parse(absoluteOutDir).root
  if (absoluteOutDir === fileSystemRoot) {
    throw new Error(`Refusing to remove filesystem root '${absoluteOutDir}'.`)
  }

  const relativeToRepo = path.relative(absoluteOutDir, repoRoot)
  const targetsRepoRoot = relativeToRepo === ''
  const targetsRepoAncestor = relativeToRepo !== '' && !relativeToRepo.startsWith('..') && !path.isAbsolute(relativeToRepo)

  if (targetsRepoRoot || targetsRepoAncestor) {
    throw new Error(`Refusing to remove '${absoluteOutDir}' because it would delete the repository root or one of its ancestors.`)
  }
}
