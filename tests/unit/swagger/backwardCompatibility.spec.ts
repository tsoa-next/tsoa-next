import { validateCompilerOptions } from '@tsoa-next/cli'
import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { DefaultRouteGenerator } from '@tsoa-next/cli/routeGeneration/defaultRouteGenerator'
import { SpecGenerator2 } from '@tsoa-next/cli/swagger/specGenerator2'
import { SpecGenerator3 } from '@tsoa-next/cli/swagger/specGenerator3'
import { Swagger, Tsoa } from '@tsoa-next/runtime'
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

function getPropertyNames(type: Tsoa.Type | undefined): string[] {
  if (!type) {
    return []
  }

  if (type.dataType === 'refAlias') {
    return getPropertyNames(type.type)
  }

  if (type.dataType === 'refObject' || type.dataType === 'nestedObjectLiteral') {
    return (type.properties ?? []).map(property => property.name)
  }

  return []
}

async function withBackendStyleFixture(
  run: (paths: {
    config: {
      compilerOptions: {
        baseUrl: string
        paths: Record<string, string[]>
      }
      controllerPathGlobs: string[]
      entryFile: string
      routes: {
        middleware: 'express'
        routesDir: string
      }
      spec: {
        basePath: string
        outputDirectory: string
        specVersion: 3
      }
    }
    configBaseDir: string
  }) => Promise<void>,
) {
  const sourceRepoRoot = resolve(__dirname, '../../..')
  const repoRoot = await fs.mkdtemp(join(tmpdir(), 'tsoa-backend-style-'))

  try {
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'dice', 'lib', 'controllers'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'dice', 'types', 'domain'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'game', 'lib', 'controllers'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'game', 'types'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'ledger', 'types'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'slide', 'lib'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'slide', 'types'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'blackjack', 'lib'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'blackjack', 'types'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'limbo', 'lib'), { recursive: true })
    await fs.mkdir(join(repoRoot, 'src', 'modules', 'limbo', 'types'), { recursive: true })

    await fs.writeFile(
      join(repoRoot, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          baseUrl: '.',
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          module: 'commonjs',
          paths: {
            '@tsoa-next/cli': ['../packages/cli/src/index.ts'],
            '@tsoa-next/cli/*': ['../packages/cli/src/*'],
            '@tsoa-next/runtime': ['../packages/runtime/src/index.ts'],
            '@tsoa-next/runtime/*': ['../packages/runtime/src/*'],
            'src/*': ['src/*'],
            'tsoa-next': ['../packages/tsoa/src/index.ts'],
          },
          target: 'es2021',
        },
      })
        .replaceAll('../packages/cli/src/index.ts', `${sourceRepoRoot.replaceAll('\\', '/')}/packages/cli/src/index.ts`)
        .replaceAll('../packages/cli/src/*', `${sourceRepoRoot.replaceAll('\\', '/')}/packages/cli/src/*`)
        .replaceAll('../packages/runtime/src/index.ts', `${sourceRepoRoot.replaceAll('\\', '/')}/packages/runtime/src/index.ts`)
        .replaceAll('../packages/runtime/src/*', `${sourceRepoRoot.replaceAll('\\', '/')}/packages/runtime/src/*`)
        .replaceAll('../packages/tsoa/src/index.ts', `${sourceRepoRoot.replaceAll('\\', '/')}/packages/tsoa/src/index.ts`),
      'utf8',
    )

    await fs.mkdir(join(repoRoot, 'node_modules', 'io-ts'), { recursive: true })

    await fs.writeFile(
      join(repoRoot, 'node_modules', 'io-ts', 'index.d.ts'),
      `
        export type Validation<T> = { readonly right: T; readonly _tag: 'Right' }
        export type OutputOf<T extends { readonly _O: unknown }> = T['_O']
        export type TypeOf<T extends { readonly _A: unknown }> = T['_A']
        export type Context = ReadonlyArray<unknown>

        export class Type<A, O = A, I = unknown> {
          public readonly _A!: A
          public readonly _O!: O
          public readonly _I!: I

          constructor(
            public readonly name: string,
            public readonly is: (input: unknown) => input is A,
            public readonly validate: (input: I, context: Context) => Validation<A>,
            public readonly encode: (input: A) => O,
          ) {}
        }

        export const number = new Type<number, number, unknown>(
          'number',
          (input: unknown): input is number => typeof input === 'number',
          (input: unknown): Validation<number> => ({ _tag: 'Right', right: input as number }),
          (input: number): number => input,
        )

        export const type = <P extends Record<string, Type<any, any, any>>>(
          _props: P,
        ): Type<
          { [K in keyof P]: P[K]['_A'] },
          { [K in keyof P]: P[K]['_O'] },
          unknown
        > =>
          new Type(
            'type',
            (_input: unknown): _input is { [K in keyof P]: P[K]['_A'] } => true,
            (input: unknown): Validation<{ [K in keyof P]: P[K]['_A'] }> => ({
              _tag: 'Right',
              right: input as { [K in keyof P]: P[K]['_A'] },
            }),
            (input: { [K in keyof P]: P[K]['_A'] }): { [K in keyof P]: P[K]['_O'] } =>
              input as { [K in keyof P]: P[K]['_O'] },
          )
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'game', 'types', 'Config.ts'),
      `
        interface SensitiveGameConfig {
          seed: string
        }

        export interface BaseGameConfig {
          edge: number
          minBet: number
          maxBet: number
        }

        export type PrivateGameConfig = BaseGameConfig & SensitiveGameConfig

        export type PublicGameConfig<Config extends PrivateGameConfig> = Omit<Config, keyof SensitiveGameConfig>
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'game', 'types', 'Error.ts'),
      `
        export class GameError extends Error {
          public static readonly httpCode = '400'
          public static readonly httpStatus = 'Bad Request'
          public context!: Record<string, unknown>
        }

        export class GameSystemError extends GameError {
          public originalError!: { name: string }
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'game', 'types', 'index.ts'),
      `
        export * from './Config'
        export * from './Error'
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'game', 'lib', 'controllers', 'gameController.ts'),
      `
        import { Controller, Get, Response } from 'tsoa-next'
        import { GameSystemError, type PrivateGameConfig, type PublicGameConfig } from 'src/modules/game/types'

        export abstract class GamesController<C extends PrivateGameConfig> extends Controller {
          @Get('config')
          @Response<GameSystemError>(GameSystemError.httpCode, GameSystemError.httpStatus)
          public async getConfig(): Promise<PublicGameConfig<C>> {
            throw new Error('not implemented')
          }
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'dice', 'types', 'domain', 'game.ts'),
      `
        import { type PrivateGameConfig, type PublicGameConfig } from 'src/modules/game/types'

        export interface DiceGameConfig extends PrivateGameConfig {
          maxProfit: number
          maxPayout: number
          highrollerThreshold: number
        }

        export type DicePublicConfig = PublicGameConfig<DiceGameConfig>

        export interface DiceGameboardResponse {
          edge: number
          minBet: number
          maxBet: number
          maxProfit: number
          maxPayout: number
          highrollerThreshold: number
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'dice', 'types', 'requests.ts'),
      `
        import * as t from 'io-ts'

        export interface DiceRollRequestWithLegacyDto {
          amount: number
          targetNumber: number
        }

        const DiceRollRequestWithLegacyInputT = t.type({
          amount: t.number,
          targetNumber: t.number,
        })

        export const DiceRollRequestWithLegacyT = new t.Type<
          DiceRollRequestWithLegacyDto,
          t.OutputOf<typeof DiceRollRequestWithLegacyInputT>,
          unknown
        >(
          'DiceRollRequestWithLegacyT',
          DiceRollRequestWithLegacyInputT.is,
          (input: unknown, context: t.Context): t.Validation<DiceRollRequestWithLegacyDto> =>
            DiceRollRequestWithLegacyInputT.validate(input, context),
          (input: DiceRollRequestWithLegacyDto): t.OutputOf<typeof DiceRollRequestWithLegacyInputT> => input,
        )

        export type DiceRollRequestWithLegacy = t.TypeOf<typeof DiceRollRequestWithLegacyT>
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'dice', 'types', 'index.ts'),
      `
        export * from './domain/game'
        export * from './requests'
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'dice', 'lib', 'controllers', 'diceController.ts'),
      `
        import { Body, Get, Post, Route, Validate } from 'tsoa-next'
        import { GamesController } from 'src/modules/game/lib/controllers/gameController'
        import {
          type DiceGameConfig,
          type DiceGameboardResponse,
          type DiceRollRequestWithLegacy,
          DiceRollRequestWithLegacyT,
        } from 'src/modules/dice/types'

        @Route('dice')
        export class DiceController extends GamesController<DiceGameConfig> {
          @Get('gameboard')
          public async getGameboard(): Promise<DiceGameboardResponse> {
            return {
              edge: 1,
              minBet: 1,
              maxBet: 10,
              maxProfit: 100,
              maxPayout: 250,
              highrollerThreshold: 500,
            }
          }

          @Post('roll')
          public async roll(
            @Body()
            @Validate('io-ts', DiceRollRequestWithLegacyT)
            body: DiceRollRequestWithLegacy,
          ): Promise<DiceGameboardResponse> {
            return {
              edge: body.targetNumber,
              minBet: body.amount,
              maxBet: 10,
              maxProfit: 100,
              maxPayout: 250,
              highrollerThreshold: 500,
            }
          }
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'ledger', 'types', 'Balance.ts'),
      `
        export interface BalanceTypeConfigEntry {
          shortCode: string
        }

        export interface BalanceTypesConfig {
          [key: string]: BalanceTypeConfigEntry
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'slide', 'types', 'game.ts'),
      `
        import { type BalanceTypesConfig } from 'src/modules/ledger/types/Balance'

        export interface SlideConfig {
          balanceTypes: BalanceTypesConfig
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'slide', 'lib', 'slideController.ts'),
      `
        import { Controller, Get, Route } from 'tsoa-next'
        import { type SlideConfig } from 'src/modules/slide/types/game'

        @Route('slide')
        export class SlideController extends Controller {
          @Get('config')
          public getConfig(): SlideConfig {
            return {
              balanceTypes: {
                cash: { shortCode: 'cash' },
              },
            }
          }
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'blackjack', 'types', 'index.ts'),
      `
        import type { PrivateGameConfig, PublicGameConfig } from 'src/modules/game/types'

        export interface BlackjackConfig extends PrivateGameConfig {
          decks: number
        }

        export type BlackjackPublicConfig = PublicGameConfig<BlackjackConfig>
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'blackjack', 'lib', 'gameController.ts'),
      `
        import { Get, Route } from 'tsoa-next'
        import { GamesController } from 'src/modules/game/lib/controllers/gameController'
        import { type BlackjackConfig, type BlackjackPublicConfig } from 'src/modules/blackjack/types'

        @Route('blackjack')
        export class BlackjackController extends GamesController<BlackjackConfig> {
          @Get('config')
          public override async getConfig(): Promise<BlackjackPublicConfig> {
            return {
              edge: 1,
              minBet: 1,
              maxBet: 25,
              decks: 6,
            }
          }
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'limbo', 'types', 'index.ts'),
      `
        import type { PrivateGameConfig, PublicGameConfig } from 'src/modules/game/types'

        export interface LimboGameConfig extends PrivateGameConfig {
          maxProfit: number
        }

        export type LimboPublicConfig = PublicGameConfig<LimboGameConfig>
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'limbo', 'lib', 'gameController.ts'),
      `
        import { Get, Route } from 'tsoa-next'
        import { GamesController } from 'src/modules/game/lib/controllers/gameController'
        import { type LimboGameConfig, type LimboPublicConfig } from 'src/modules/limbo/types'

        @Route('limbo')
        export class LimboController extends GamesController<LimboGameConfig> {
          @Get('config')
          public override async getConfig(): Promise<LimboPublicConfig> {
            return {
              edge: 1,
              minBet: 1,
              maxBet: 50,
              maxProfit: 1000,
            }
          }
        }
      `,
      'utf8',
    )

    await fs.writeFile(
      join(repoRoot, 'src', 'modules', 'dice', 'tsoa.json'),
      JSON.stringify({
        compilerOptions: {
          baseUrl: '.',
          paths: {
            'src/*': ['src/*'],
          },
        },
        controllerPathGlobs: ['src/modules/**/*Controller*.ts'],
        entryFile: 'src/modules/dice/index.ts',
        routes: {
          middleware: 'express',
          routesDir: join(repoRoot, 'build', 'routes'),
        },
        spec: {
          basePath: '/_api',
          outputDirectory: join(repoRoot, 'build', 'spec'),
          specVersion: 3,
        },
      }),
      'utf8',
    )

    const configBaseDir = join(repoRoot, 'src', 'modules', 'dice')
    const config = JSON.parse(await fs.readFile(join(configBaseDir, 'tsoa.json'), 'utf8'))
    const previousWorkingDirectory = process.cwd()
    process.chdir(repoRoot)
    try {
      await run({ config, configBaseDir })
    } finally {
      process.chdir(previousWorkingDirectory)
    }
  } finally {
    await fs.rm(repoRoot, { force: true, recursive: true })
  }
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

  it('generates metadata, specs, and route models for backend-style nested tsoa configs', async () => {
    await withBackendStyleFixture(async ({ config, configBaseDir }) => {
      const compilerOptions = validateCompilerOptions(config, configBaseDir)
      const metadata = new MetadataGenerator(config.entryFile, compilerOptions, undefined, config.controllerPathGlobs).Generate()
      const specConfig = getDefaultExtendedOptions(config.spec.outputDirectory, config.entryFile)
      specConfig.basePath = config.spec.basePath

      const spec = new SpecGenerator3(metadata, specConfig).GetSpec()
      const routeGenerator = new DefaultRouteGenerator(metadata, {
        basePath: config.spec.basePath,
        bodyCoercion: true,
        controllerPathGlobs: config.controllerPathGlobs,
        entryFile: config.entryFile,
        middleware: 'express',
        noImplicitAdditionalProperties: 'ignore',
        routesDir: config.routes.routesDir,
      })
      const models = routeGenerator.buildModels()
      const diceController = metadata.controllers.find(controller => controller.name === 'DiceController')

      expect(compilerOptions.baseUrl?.replaceAll('\\', '/')).to.equal(resolve(configBaseDir, '../../..').replaceAll('\\', '/'))

      expect(metadata.referenceTypeMap).to.have.property('PublicGameConfig_DiceGameConfig_')
      expect(metadata.referenceTypeMap).to.have.property('DiceGameboardResponse')
      expect(metadata.referenceTypeMap).to.have.property('DiceRollRequestWithLegacy')
      expect(metadata.referenceTypeMap).to.have.property('DiceRollRequestWithLegacyDto')
      expect(metadata.referenceTypeMap).to.have.property('GameSystemError')
      expect(metadata.referenceTypeMap).to.have.property('BalanceTypesConfig')
      expect(metadata.referenceTypeMap).to.have.property('SlideConfig')
      expect(metadata.referenceTypeMap).to.have.property('PublicGameConfig_BlackjackConfig_')
      expect(metadata.referenceTypeMap).to.have.property('BlackjackPublicConfig')
      expect(metadata.referenceTypeMap).to.have.property('PublicGameConfig_LimboGameConfig_')
      expect(metadata.referenceTypeMap).to.have.property('LimboPublicConfig')

      expect((getSchema(spec, 'BlackjackPublicConfig') as Swagger.Schema3).$ref).to.equal('#/components/schemas/PublicGameConfig_BlackjackConfig_')
      expect((getSchema(spec, 'LimboPublicConfig') as Swagger.Schema3).$ref).to.equal('#/components/schemas/PublicGameConfig_LimboGameConfig_')

      const slideSchema = getSchema(spec, 'SlideConfig') as Swagger.Schema3
      expect((slideSchema.properties!.balanceTypes as Swagger.Schema3).$ref).to.equal('#/components/schemas/BalanceTypesConfig')

      const gameSystemError = getSchema(spec, 'GameSystemError') as Swagger.Schema3
      expect(gameSystemError.type).to.equal('object')

      expect(diceController?.methods.map(method => method.name)).to.include('getConfig')
      expect(spec.paths['/dice/config']).to.have.property('get')
      expect(spec.paths['/dice/gameboard']).to.have.property('get')
      expect(spec.paths['/dice/roll']).to.have.property('post')
      expect((spec.paths['/dice/config'].get!.responses['200'] as Swagger.Response3).content?.['application/json'].schema).to.deep.equal({
        $ref: '#/components/schemas/PublicGameConfig_DiceGameConfig_',
      })
      expect((spec.paths['/dice/gameboard'].get!.responses['200'] as Swagger.Response3).content?.['application/json'].schema).to.deep.equal({
        $ref: '#/components/schemas/DiceGameboardResponse',
      })
      expect((spec.paths['/dice/roll'].post!.requestBody as Swagger.RequestBody3).content?.['application/json'].schema).to.deep.equal({
        allOf: [{ $ref: '#/components/schemas/DiceRollRequestWithLegacy' }],
        'x-schema-validator': 'io-ts',
      })
      expect((getSchema(spec, 'DiceRollRequestWithLegacy') as Swagger.Schema3).$ref).to.equal('#/components/schemas/DiceRollRequestWithLegacyDto')

      expect(models).to.have.property('PublicGameConfig_DiceGameConfig_')
      expect(models).to.have.property('DiceGameboardResponse')
      expect(models).to.have.property('DiceRollRequestWithLegacy')
      expect(models).to.have.property('DiceRollRequestWithLegacyDto')
      expect(models).to.have.property('GameSystemError')
      expect(models).to.have.property('SlideConfig')

      const diceConfigProperties = getPropertyNames(metadata.referenceTypeMap.PublicGameConfig_DiceGameConfig_)
      expect(diceConfigProperties).to.include.members(['edge', 'minBet', 'maxBet', 'maxProfit', 'maxPayout', 'highrollerThreshold'])
      expect(diceConfigProperties).to.not.include('seed')
    })
  })

  it('does not crash OpenAPI schema generation when a partial refObject slips into the metadata map', () => {
    const metadata = {
      controllers: [],
      referenceTypeMap: {
        PartialRefObject: {
          dataType: 'refObject',
          deprecated: false,
          refName: 'PartialRefObject',
        },
      },
    } as unknown as Tsoa.Metadata

    const spec = new SpecGenerator3(metadata, getDefaultExtendedOptions('', '')).GetSpec()
    const schema = getSchema(spec, 'PartialRefObject') as Swagger.Schema3

    expect(schema).to.include({
      additionalProperties: true,
      type: 'object',
    })
    expect(schema.properties).to.deep.equal({})
  })

  it('does not crash Swagger 2 definition generation when a partial refObject slips into the metadata map', () => {
    const metadata = {
      controllers: [],
      referenceTypeMap: {
        PartialRefObject: {
          dataType: 'refObject',
          deprecated: false,
          refName: 'PartialRefObject',
        },
      },
    } as unknown as Tsoa.Metadata

    const spec = new SpecGenerator2(metadata, getDefaultExtendedOptions('', '')).GetSpec()
    const definition = spec.definitions?.PartialRefObject as Swagger.Schema2

    expect(definition).to.include({
      additionalProperties: true,
      type: 'object',
    })
    expect(definition.properties).to.deep.equal({})
  })

  it('does not crash route model generation when a partial refObject slips into the metadata map', () => {
    const metadata = {
      controllers: [],
      referenceTypeMap: {
        PartialRefObject: {
          dataType: 'refObject',
          deprecated: false,
          refName: 'PartialRefObject',
        },
      },
    } as unknown as Tsoa.Metadata

    const routeGenerator = new DefaultRouteGenerator(metadata, {
      basePath: '/',
      bodyCoercion: true,
      controllerPathGlobs: [],
      entryFile: '',
      middleware: 'express',
      noImplicitAdditionalProperties: 'ignore',
      routesDir: '/tmp',
    })

    expect(routeGenerator.buildModels()).to.deep.equal({
      PartialRefObject: {
        additionalProperties: true,
        dataType: 'refObject',
        properties: {},
      },
    })
  })
})
