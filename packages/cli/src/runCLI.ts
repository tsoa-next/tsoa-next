import { generateRoutesFromArgs, generateSpecAndRoutes, generateSpecFromArgs } from './api'
import type { ConfigArgs, SwaggerArgs } from './api'

const configurationArgs = {
  alias: 'c',
  describe: 'tsoa configuration file; default is tsoa.json in the working directory',
  required: false,
  string: true,
} as const

const hostArgs = {
  describe: 'API host',
  required: false,
  string: true,
} as const

const basePathArgs = {
  describe: 'Base API path',
  required: false,
  string: true,
} as const

const yarmlArgs = {
  describe: 'Swagger spec yaml format',
  required: false,
  boolean: true,
} as const

const jsonArgs = {
  describe: 'Swagger spec json format',
  required: false,
  boolean: true,
} as const

export async function runCLI() {
  const [yargsModule, yargsHelpers] = await Promise.all([import('yargs'), import('yargs/helpers')])

  return yargsModule
    .default(yargsHelpers.hideBin(process.argv))
    .usage('Usage: $0 <command> [options]')
    .command(
      'spec',
      'Generate OpenAPI spec',
      {
        basePath: basePathArgs,
        configuration: configurationArgs,
        host: hostArgs,
        json: jsonArgs,
        yaml: yarmlArgs,
      },
      args => void generateSpecFromArgs(args as SwaggerArgs),
    )
    .command(
      'routes',
      'Generate routes',
      {
        basePath: basePathArgs,
        configuration: configurationArgs,
      },
      args => void generateRoutesFromArgs(args as ConfigArgs),
    )
    .command(
      'spec-and-routes',
      'Generate OpenAPI spec and routes',
      {
        basePath: basePathArgs,
        configuration: configurationArgs,
        host: hostArgs,
        json: jsonArgs,
        yaml: yarmlArgs,
      },
      args => void generateSpecAndRoutes(args as SwaggerArgs),
    )
    .demandCommand(1, 1, 'Must provide a valid command.')
    .help('help')
    .alias('help', 'h')
    .parse()
}
