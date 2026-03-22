import 'mocha'

import { expect } from 'chai'
import { execFileSync } from 'child_process'
import { resolve } from 'path'

type TscResult = {
  output: string
  succeeded: boolean
}

function runFixture(projectFile: string): TscResult {
  const fixtureRoot = resolve(__dirname, '../../fixtures/swagger-typing')
  const projectPath = resolve(fixtureRoot, projectFile)
  const tscPath = require.resolve('typescript/bin/tsc')

  try {
    const output = execFileSync(process.execPath, [tscPath, '--pretty', 'false', '-p', projectPath], {
      cwd: resolve(__dirname, '../..'),
      encoding: 'utf8',
      stdio: 'pipe',
    })

    return { output, succeeded: true }
  } catch (error) {
    const stdout = error instanceof Error && 'stdout' in error ? String(error.stdout) : ''
    const stderr = error instanceof Error && 'stderr' in error ? String(error.stderr) : ''
    return { output: `${stdout}${stderr}`, succeeded: false }
  }
}

describe('Swagger spec typings', () => {
  it('accepts valid version-specific parameter shapes', () => {
    const result = runFixture('tsconfig.valid.json')
    expect(result.succeeded, result.output).to.be.true
  })

  it('rejects Swagger 2.0 non-body parameters with schema objects', () => {
    const result = runFixture('tsconfig.invalid-swagger2-query-schema.json')
    expect(result.succeeded).to.be.false
    expect(result.output).to.contain("'schema' does not exist")
  })

  it('rejects Swagger 2.0 body parameters with root-level numeric constraints', () => {
    const result = runFixture('tsconfig.invalid-swagger2-body-root-constraints.json')
    expect(result.succeeded).to.be.false
    expect(result.output).to.contain("'minimum' does not exist")
  })

  it('rejects OpenAPI 3.x parameters with root-level schema keywords', () => {
    const result = runFixture('tsconfig.invalid-openapi3-root-schema-keywords.json')
    expect(result.succeeded).to.be.false
    expect(result.output).to.match(/'type' does not exist|'exclusiveMinimum' does not exist/)
  })
})
