import { expect } from 'chai'
import 'mocha'

const { getAffectedTestsForFiles, getAffectedTestWorkspacesForFile } = require('../../../scripts/lib/pre-push-impact.cjs') as {
  getAffectedTestsForFiles: (files: string[]) => string[]
  getAffectedTestWorkspacesForFile: (file: string) => string[]
}

describe('pre-push impact detection', () => {
  it('does not run tests for .gitignore-only changes', () => {
    expect(getAffectedTestWorkspacesForFile('.gitignore')).to.deep.equal([])
  })

  it('runs only the common test workspace for pre-push impact logic changes', () => {
    expect(getAffectedTestWorkspacesForFile('scripts/check-pre-push.cjs')).to.deep.equal(['tsoa-tests'])
    expect(getAffectedTestWorkspacesForFile('scripts/lib/pre-push-impact.cjs')).to.deep.equal(['tsoa-tests'])
  })

  it('runs both test workspaces for package source changes', () => {
    expect(getAffectedTestWorkspacesForFile('packages/runtime/src/config.ts')).to.deep.equal(['tsoa-tests', 'tsoa-tests-esm'])
  })

  it('runs the esm suite only for esm fixture changes', () => {
    expect(getAffectedTestWorkspacesForFile('tests/esm/fixtures/express/server.ts')).to.deep.equal(['tsoa-tests-esm'])
  })

  it('aggregates workspace impacts without duplicates', () => {
    expect(getAffectedTestsForFiles(['.gitignore', 'packages/cli/src/index.ts', 'scripts/check-pre-push.cjs', 'tests/esm/integration/express.spec.ts'])).to.deep.equal(['tsoa-tests', 'tsoa-tests-esm'])
  })
})
