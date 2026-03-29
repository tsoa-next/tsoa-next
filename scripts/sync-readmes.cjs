#!/usr/bin/env node

const { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } = require('node:fs')
const path = require('node:path')

const repoRoot = path.resolve(__dirname, '..')
const templatePath = path.join(repoRoot, 'README.template.MD')
const sourceLogoPath = path.join(repoRoot, 'assets', 'tsoa-next-logo-590.png')
const generatedNotice = '<!-- This file is generated from README.template.MD by `npm run sync:readmes`. Do not edit directly. -->\n\n'
const checkMode = process.argv.includes('--check')

const readmeTargets = [
  {
    path: path.join(repoRoot, 'README.MD'),
    logoPath: './assets/tsoa-next-logo-590.png',
  },
  {
    path: path.join(repoRoot, 'packages', 'tsoa', 'README.MD'),
    logoPath: './tsoa-next-logo-590.png',
  },
]

const binaryTargets = [
  {
    source: sourceLogoPath,
    target: path.join(repoRoot, 'packages', 'tsoa', 'tsoa-next-logo-590.png'),
  },
]

const template = readFileSync(templatePath, 'utf8')

if (!template.includes('{{LOGO_PATH}}')) {
  throw new Error(`Template '${path.relative(repoRoot, templatePath)}' is missing the {{LOGO_PATH}} placeholder.`)
}

const changedPaths = []

for (const target of readmeTargets) {
  const rendered = `${generatedNotice}${template.replaceAll('{{LOGO_PATH}}', target.logoPath).trimEnd()}\n`
  if (ensureFileContent(target.path, rendered)) {
    changedPaths.push(path.relative(repoRoot, target.path))
  }
}

for (const target of binaryTargets) {
  if (ensureBinaryCopy(target.source, target.target)) {
    changedPaths.push(path.relative(repoRoot, target.target))
  }
}

if (checkMode && changedPaths.length > 0) {
  console.error(`README artifacts are out of sync: ${changedPaths.join(', ')}`)
  process.exit(1)
}

if (!checkMode && changedPaths.length > 0) {
  console.log(`Synchronized README artifacts: ${changedPaths.join(', ')}`)
}

function ensureFileContent(targetPath, nextContent) {
  if (isSymlink(targetPath)) {
    unlinkSync(targetPath)
  }

  const previousContent = existsSync(targetPath) ? readFileSync(targetPath, 'utf8') : undefined
  if (previousContent === nextContent) {
    return false
  }

  mkdirSync(path.dirname(targetPath), { recursive: true })
  writeFileSync(targetPath, nextContent, 'utf8')
  return true
}

function ensureBinaryCopy(sourcePath, targetPath) {
  if (isSymlink(targetPath)) {
    unlinkSync(targetPath)
  }

  const nextContent = readFileSync(sourcePath)
  const previousContent = existsSync(targetPath) ? readFileSync(targetPath) : undefined
  if (previousContent && Buffer.compare(previousContent, nextContent) === 0) {
    return false
  }

  mkdirSync(path.dirname(targetPath), { recursive: true })
  cpSync(sourcePath, targetPath)
  return true
}

function isSymlink(targetPath) {
  return existsSync(targetPath) && lstatSync(targetPath).isSymbolicLink()
}
