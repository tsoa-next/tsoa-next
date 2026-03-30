import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { SpecGenerator3 } from '@tsoa-next/cli/swagger/specGenerator3'
import { Swagger } from '@tsoa-next/runtime'
import { expect } from 'chai'
import { promises as fs } from 'node:fs'
import 'mocha'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import * as ts from 'typescript'
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions'

type TempCompatibilityPaths = {
  controllerFile: string
}

function getTempCompilerOptions(): ts.CompilerOptions {
  const repoRoot = resolve(__dirname, '../../..')
  return {
    baseUrl: repoRoot,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: ts.ModuleKind.CommonJS,
    paths: {
      'tsoa-next': ['packages/tsoa/src/index.ts'],
      '@tsoa-next/cli': ['packages/cli/src/index.ts'],
      '@tsoa-next/cli/*': ['packages/cli/src/*'],
      '@tsoa-next/runtime': ['packages/runtime/src/index.ts'],
      '@tsoa-next/runtime/*': ['packages/runtime/src/*'],
    },
    target: ts.ScriptTarget.ES2021,
  }
}

async function withCompatibilityFixture(run: (paths: TempCompatibilityPaths) => Promise<void>) {
  const tmpRoot = await fs.mkdtemp(join(tmpdir(), 'tsoa-back-compat-'))
  const modelsFile = join(tmpRoot, 'models.ts')
  const controllerFile = join(tmpRoot, 'controller.ts')

  try {
    await fs.writeFile(
      modelsFile,
      `
        export interface BalanceTypesConfig {
          kind: string
        }

        export interface SlideConfig {
          enabled: boolean
        }

        export type DicePublicConfig = {
          balance: BalanceTypesConfig
          slide: SlideConfig
        }

        export interface BlackjackConfig {
          decks: number
        }

        export type PublicGameConfig<T> = {
          game: T
          enabled: boolean
        }

        export type BlackjackPublicConfig = PublicGameConfig<BlackjackConfig>

        export class GameSystemError extends Error {
          code!: string
        }

        export class CommunityGamesError extends Error {
          status!: number
        }

        export class CommunityGamesInvalidVersionError extends CommunityGamesError {
          version!: string
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      controllerFile,
      `
        import { Controller, Get, Response, Route } from 'tsoa-next'
        import type {
          BlackjackConfig,
          BlackjackPublicConfig,
          CommunityGamesError,
          CommunityGamesInvalidVersionError,
          DicePublicConfig,
          GameSystemError,
          PublicGameConfig,
        } from './models'

        @Route('compatibility')
        export class CompatibilityController extends Controller {
          @Get('dice')
          public dice(): DicePublicConfig {
            return {
              balance: { kind: 'cash' },
              slide: { enabled: true },
            }
          }

          @Get('blackjack')
          public blackjack(): PublicGameConfig<BlackjackConfig> {
            return {
              enabled: true,
              game: { decks: 6 },
            }
          }

          @Get('blackjack-public')
          public blackjackPublic(): BlackjackPublicConfig {
            return {
              enabled: true,
              game: { decks: 8 },
            }
          }

          @Get('errors')
          @Response<GameSystemError>('400', 'Game system error')
          @Response<CommunityGamesError>('401', 'Community games error')
          @Response<CommunityGamesInvalidVersionError>('409', 'Community games invalid version error')
          public errors(): string {
            return 'ok'
          }
        }
      `,
      'utf8',
    )

    await run({ controllerFile })
  } finally {
    await fs.rm(tmpRoot, { force: true, recursive: true })
  }
}

function getCompatibilitySpec(controllerFile: string) {
  const metadata = new MetadataGenerator(controllerFile, getTempCompilerOptions()).Generate()
  const specConfig = getDefaultExtendedOptions('', controllerFile)

  return {
    metadata,
    spec: new SpecGenerator3(metadata, specConfig).GetSpec(),
  }
}

function getSchema(spec: Swagger.Spec3, name: string) {
  return spec.components?.schemas?.[name]
}

describe('Backward compatibility regressions', () => {
  it('resolves imported named types used within other named return types', async () => {
    await withCompatibilityFixture(async ({ controllerFile }) => {
      const { metadata, spec } = getCompatibilitySpec(controllerFile)

      expect(metadata.referenceTypeMap).to.have.property('DicePublicConfig')
      expect(metadata.referenceTypeMap).to.have.property('BalanceTypesConfig')
      expect(metadata.referenceTypeMap).to.have.property('SlideConfig')

      const diceSchema = getSchema(spec, 'DicePublicConfig') as Swagger.Schema3
      expect(diceSchema.properties).to.have.property('balance')
      expect(diceSchema.properties).to.have.property('slide')
      expect((diceSchema.properties!.balance as Swagger.Schema3).$ref).to.equal('#/components/schemas/BalanceTypesConfig')
      expect((diceSchema.properties!.slide as Swagger.Schema3).$ref).to.equal('#/components/schemas/SlideConfig')
    })
  })

  it('resolves instantiated generic aliases without missing declaration errors', async () => {
    await withCompatibilityFixture(async ({ controllerFile }) => {
      const { metadata, spec } = getCompatibilitySpec(controllerFile)

      expect(metadata.referenceTypeMap).to.have.property('PublicGameConfig_BlackjackConfig_')
      expect(metadata.referenceTypeMap).to.have.property('BlackjackPublicConfig')

      const genericSchema = getSchema(spec, 'PublicGameConfig_BlackjackConfig_') as Swagger.Schema3
      expect(genericSchema.properties).to.have.property('game')
      expect(genericSchema.properties).to.have.property('enabled')
      expect((genericSchema.properties!.game as Swagger.Schema3).$ref).to.equal('#/components/schemas/BlackjackConfig')

      const aliasSchema = getSchema(spec, 'BlackjackPublicConfig') as Swagger.Schema3
      expect(aliasSchema.$ref).to.equal('#/components/schemas/PublicGameConfig_BlackjackConfig_')
    })
  })

  it('skips the built-in Error base while keeping custom error inheritance chains resolvable', async () => {
    await withCompatibilityFixture(async ({ controllerFile }) => {
      const { metadata, spec } = getCompatibilitySpec(controllerFile)

      expect(metadata.referenceTypeMap).to.have.property('GameSystemError')
      expect(metadata.referenceTypeMap).to.have.property('CommunityGamesError')
      expect(metadata.referenceTypeMap).to.have.property('CommunityGamesInvalidVersionError')

      const gameSystemError = getSchema(spec, 'GameSystemError') as Swagger.Schema3
      expect(gameSystemError.properties).to.have.property('code')

      const communityGamesError = getSchema(spec, 'CommunityGamesError') as Swagger.Schema3
      expect(communityGamesError.properties).to.have.property('status')

      const invalidVersionError = getSchema(spec, 'CommunityGamesInvalidVersionError') as Swagger.Schema3
      expect(invalidVersionError.properties).to.have.property('status')
      expect(invalidVersionError.properties).to.have.property('version')
    })
  })

  it('resolves imported custom error types used by response decorators', async () => {
    await withCompatibilityFixture(async ({ controllerFile }) => {
      const { spec } = getCompatibilitySpec(controllerFile)
      const operation = spec.paths['/compatibility/errors'].get!
      const responses = operation.responses

      expect((responses['400'] as Swagger.Response3).content?.['application/json'].schema).to.deep.equal({
        $ref: '#/components/schemas/GameSystemError',
      })
      expect((responses['401'] as Swagger.Response3).content?.['application/json'].schema).to.deep.equal({
        $ref: '#/components/schemas/CommunityGamesError',
      })
      expect((responses['409'] as Swagger.Response3).content?.['application/json'].schema).to.deep.equal({
        $ref: '#/components/schemas/CommunityGamesInvalidVersionError',
      })
    })
  })
})
