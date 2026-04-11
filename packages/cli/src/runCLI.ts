import { AsyncLocalStorage } from 'node:async_hooks'
import { availableParallelism } from 'node:os'
import { format } from 'node:util'
import { discoverConfigs, getDefaultDiscoverRoot } from './discovery'
import type { ConfigArgs, SwaggerArgs } from './api'
import type yargs from 'yargs'
import type { hideBin as hideBinImport } from 'yargs/helpers'
import type { ArgumentsCamelCase, Options } from 'yargs'

const outputPrefixStorage = new AsyncLocalStorage<string | undefined>()

const configurationArgs = {
  alias: 'c',
  describe: 'tsoa configuration file; default is tsoa.json in the working directory',
  required: false,
  string: true,
} satisfies Options

const discoverArgs = {
  describe: 'discover tsoa config files using a path or glob before running the command',
  required: false,
  requiresArg: true,
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
  discover: discoverArgs,
}

const specCommandArgs = {
  ...configCommandArgs,
  host: hostArgs,
  json: jsonArgs,
  yaml: yamlArgs,
}

type DiscoverOptionArguments = {
  discover?: string
}

type ConfigCommandArguments = ArgumentsCamelCase<ConfigArgs & DiscoverOptionArguments>
type DiscoverCommandArguments = ArgumentsCamelCase<{ pathOrGlob?: string }>
type SpecCommandArguments = ArgumentsCamelCase<SwaggerArgs & DiscoverOptionArguments>
type CLIApi = typeof import('./api')
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

const loadCLIAPI = async (): Promise<CLIApi> => {
  return await import('./api')
}

const renderPrefixedOutput = (prefix: string, args: unknown[]): string => {
  const rendered = format(...args)
  return rendered
    .split('\n')
    .map(line => `${prefix}${line}`)
    .join('\n')
}

const withPatchedConsole = async <T>(action: () => Promise<T>): Promise<T> => {
  const originalConsoleError = console.error
  const originalConsoleLog = console.log
  const originalConsoleWarn = console.warn

  console.log = (...args: unknown[]) => {
    const prefix = outputPrefixStorage.getStore()
    if (!prefix) {
      originalConsoleLog(...args)
      return
    }

    originalConsoleLog(renderPrefixedOutput(prefix, args))
  }

  console.warn = (...args: unknown[]) => {
    const prefix = outputPrefixStorage.getStore()
    if (!prefix) {
      originalConsoleWarn(...args)
      return
    }

    originalConsoleWarn(renderPrefixedOutput(prefix, args))
  }

  console.error = (...args: unknown[]) => {
    const prefix = outputPrefixStorage.getStore()
    if (!prefix) {
      originalConsoleError(...args)
      return
    }

    originalConsoleError(renderPrefixedOutput(prefix, args))
  }

  try {
    return await action()
  } finally {
    console.error = originalConsoleError
    console.log = originalConsoleLog
    console.warn = originalConsoleWarn
  }
}

const ensureExclusiveConfigurationModes = (configuration: string | ConfigArgs['configuration'] | undefined, discover: string | undefined) => {
  if (configuration !== undefined && discover !== undefined) {
    throw new Error('The --configuration and --discover options cannot be used together.')
  }
}

const getDiscoveryInputDisplay = (input?: string): string => input ?? getDefaultDiscoverRoot()

const ensureDiscoveredConfigs = async (input?: string) => {
  const discoveryResult = await discoverConfigs(input)
  if (discoveryResult.matches.length === 0) {
    throw new Error(`No tsoa config files found for '${getDiscoveryInputDisplay(input)}'.`)
  }

  return discoveryResult.matches
}

const runTasksWithConcurrency = async <T>(limit: number, tasks: Array<() => Promise<T>>): Promise<Array<PromiseSettledResult<T>>> => {
  const results = new Array<PromiseSettledResult<T>>(tasks.length)
  let nextTaskIndex = 0

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
    while (nextTaskIndex < tasks.length) {
      const currentTaskIndex = nextTaskIndex
      nextTaskIndex += 1

      try {
        const currentTask = tasks[currentTaskIndex]
        if (!currentTask) {
          continue
        }

        const value = await currentTask()
        results[currentTaskIndex] = {
          status: 'fulfilled',
          value,
        }
      } catch (error) {
        results[currentTaskIndex] = {
          status: 'rejected',
          reason: error,
        }
      }
    }
  })

  await Promise.all(workers)
  return results
}

const formatFailureReason = (reason: unknown): string => {
  if (reason instanceof Error) {
    return reason.message
  }

  return String(reason)
}

const runDiscoveredCommand = async <TArguments extends ConfigCommandArguments | SpecCommandArguments>(
  commandName: string,
  args: TArguments,
  execute: (api: CLIApi, configurationPath: ConfigArgs['configuration'] | undefined, resolvedArgs: TArguments) => Promise<unknown>,
) => {
  ensureExclusiveConfigurationModes(args.configuration, args.discover)

  if (!args.discover) {
    const api = await loadCLIAPI()
    return await execute(api, args.configuration, args)
  }

  const discoveredConfigs = await ensureDiscoveredConfigs(args.discover)
  const api = await loadCLIAPI()
  const concurrency = Math.min(discoveredConfigs.length, availableParallelism())

  const results = await withPatchedConsole(async () => {
    return await runTasksWithConcurrency(
      concurrency,
      discoveredConfigs.map(discoveredConfig => {
        return async () => {
          return await outputPrefixStorage.run(`[${discoveredConfig.displayPath}] `, async () => {
            console.log(`Starting ${commandName}`)
            const result = await execute(api, discoveredConfig.absolutePath, args)
            console.log(`Finished ${commandName}`)
            return result
          })
        }
      }),
    )
  })

  const failures = results.flatMap((result, index) => {
    if (result?.status !== 'rejected') {
      return []
    }

    const discoveredConfig = discoveredConfigs[index]
    if (!discoveredConfig) {
      return []
    }

    return [`- ${discoveredConfig.displayPath}: ${formatFailureReason(result.reason)}`]
  })

  if (failures.length > 0) {
    throw new Error(`Failed ${commandName} for discovered config files:\n${failures.join('\n')}`)
  }

  return results
}

const runDiscoverCommand = async (pathOrGlob?: string) => {
  const discoveryResult = await ensureDiscoveredConfigs(pathOrGlob)

  for (const discoveredConfig of discoveryResult) {
    process.stdout.write(`${discoveredConfig.displayPath}\n`)
  }
}

export async function runCLI() {
  const [yargsModule, yargsHelpers] = await Promise.all([import('yargs'), import('yargs/helpers')])
  const yargsFactory = getYargsFactory(yargsModule)
  const hideBin = getHideBin(yargsHelpers)
  const cli = yargsFactory(hideBin(process.argv))

  return cli
    .scriptName('tsoa')
    .usage('Usage: $0 <command> [options]')
    .command(
      'discover [pathOrGlob]',
      'Discover tsoa config files beneath a path or glob',
      command =>
        command.positional('pathOrGlob', {
          describe: 'Path or glob to search. Defaults to the current working directory.',
          string: true,
          type: 'string',
        }),
      async (args: DiscoverCommandArguments) => {
        await runDiscoverCommand(args.pathOrGlob)
      },
    )
    .command('spec', 'Generate OpenAPI spec', specCommandArgs, async (args: SpecCommandArguments) => {
      await runDiscoveredCommand('spec', args, async (api, configurationPath, resolvedArgs) => {
        await api.generateSpecFromArgs({
          basePath: resolvedArgs.basePath,
          configuration: configurationPath,
          host: resolvedArgs.host,
          json: resolvedArgs.json,
          yaml: resolvedArgs.yaml,
        })
      })
    })
    .command('routes', 'Generate routes', configCommandArgs, async (args: ConfigCommandArguments) => {
      await runDiscoveredCommand('routes', args, async (api, configurationPath, resolvedArgs) => {
        await api.generateRoutesFromArgs({
          basePath: resolvedArgs.basePath,
          configuration: configurationPath,
        })
      })
    })
    .command('spec-and-routes', 'Generate OpenAPI spec and routes', specCommandArgs, async (args: SpecCommandArguments) => {
      await runDiscoveredCommand('spec-and-routes', args, async (api, configurationPath, resolvedArgs) => {
        await api.generateSpecAndRoutes({
          basePath: resolvedArgs.basePath,
          configuration: configurationPath,
          host: resolvedArgs.host,
          json: resolvedArgs.json,
          yaml: resolvedArgs.yaml,
        })
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
