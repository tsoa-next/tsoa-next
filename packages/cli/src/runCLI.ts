import { generateRoutesFromArgs, generateSpecAndRoutes, generateSpecFromArgs } from './api'
import type { ConfigArgs, SwaggerArgs } from './api'
import type yargs from 'yargs'
import type { hideBin as hideBinImport } from 'yargs/helpers'
import type { ArgumentsCamelCase, Options } from 'yargs'

const configurationArgs = {
  alias: 'c',
  describe: 'tsoa configuration file; default is tsoa.json in the working directory',
  required: false,
  string: true,
} satisfies Options

const hostArgs = {
  describe: 'API host',
  required: false,
  string: true,
} satisfies Options

const basePathArgs = {
  describe: 'Base API path',
  required: false,
  string: true,
} satisfies Options

const yamlArgs = {
  describe: 'Swagger spec yaml format',
  required: false,
  boolean: true,
} satisfies Options

const jsonArgs = {
  describe: 'Swagger spec json format',
  required: false,
  boolean: true,
} satisfies Options

const configCommandArgs = {
  basePath: basePathArgs,
  configuration: configurationArgs,
}

const specCommandArgs = {
  ...configCommandArgs,
  host: hostArgs,
  json: jsonArgs,
  yaml: yamlArgs,
}

type ConfigCommandArguments = ArgumentsCamelCase<ConfigArgs>
type SpecCommandArguments = ArgumentsCamelCase<SwaggerArgs>
type YargsFactory = typeof yargs
type HideBin = typeof hideBinImport

const isYargsFactory = (value: unknown): value is YargsFactory => typeof value === 'function'

const getYargsFactory = (moduleExports: unknown): YargsFactory => {
  if (isYargsFactory(moduleExports)) {
    return moduleExports
  }

  if (typeof moduleExports === 'object' && moduleExports !== null && 'default' in moduleExports) {
    const defaultExport = moduleExports.default

    if (isYargsFactory(defaultExport)) {
      return defaultExport
    }
  }

  throw new TypeError('Unable to load yargs')
}

const isHideBin = (value: unknown): value is HideBin => typeof value === 'function'

const getHideBin = (moduleExports: unknown): HideBin => {
  if (typeof moduleExports === 'object' && moduleExports !== null && 'hideBin' in moduleExports) {
    const hideBin = moduleExports.hideBin

    if (isHideBin(hideBin)) {
      return hideBin
    }
  }

  throw new TypeError('Unable to load yargs/helpers')
}

export async function runCLI() {
  const [yargsModule, yargsHelpers] = await Promise.all([import('yargs'), import('yargs/helpers')])
  const yargsFactory = getYargsFactory(yargsModule)
  const hideBin = getHideBin(yargsHelpers)
  const cli = yargsFactory(hideBin(process.argv))

  return cli
    .scriptName('tsoa')
    .usage('Usage: $0 <command> [options]')
    .command('spec', 'Generate OpenAPI spec', specCommandArgs, async (args: SpecCommandArguments) => {
      await generateSpecFromArgs({
        basePath: args.basePath,
        configuration: args.configuration,
        host: args.host,
        json: args.json,
        yaml: args.yaml,
      })
    })
    .command('routes', 'Generate routes', configCommandArgs, async (args: ConfigCommandArguments) => {
      await generateRoutesFromArgs({
        basePath: args.basePath,
        configuration: args.configuration,
      })
    })
    .command('spec-and-routes', 'Generate OpenAPI spec and routes', specCommandArgs, async (args: SpecCommandArguments) => {
      await generateSpecAndRoutes({
        basePath: args.basePath,
        configuration: args.configuration,
        host: args.host,
        json: args.json,
        yaml: args.yaml,
      })
    })
    .demandCommand(1, 1, 'Must provide a valid command.')
    .help('help')
    .alias('help', 'h')
    .exitProcess(false)
    .fail((message: string, error: Error | undefined) => {
      if (!error && message) {
        cli.showHelp('error')
      }

      if (error instanceof Error) {
        throw error
      }

      throw new Error(message)
    })
    .parseAsync()
}
