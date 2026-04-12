import type { RuntimeSpecConfigSnapshot, SpecGenerator } from '@tsoa-next/runtime'

function assertSpecConfig(config?: RuntimeSpecConfigSnapshot): RuntimeSpecConfigSnapshot {
  if (!config) {
    throw new Error('SpecPath requires spec generation settings. Provide spec configuration when generating routes so built-in spec targets can rebuild the OpenAPI document at runtime.')
  }

  return config
}

export function createOpenApiSpecGenerator(config?: RuntimeSpecConfigSnapshot): SpecGenerator {
  let specPromise: Promise<import('@tsoa-next/runtime').Swagger.Spec> | undefined
  const stringCache = new Map<'json' | 'yaml', Promise<string>>()

  const loadCli = async () => await import('@tsoa-next/cli')
  const getSpecObject: SpecGenerator['getSpecObject'] = async () => {
    if (!specPromise) {
      specPromise = (async () => {
        const runtimeConfig = assertSpecConfig(config)
        const cli = await loadCli()
        return cli.buildSpec(runtimeConfig.spec, runtimeConfig.compilerOptions as import('typescript').CompilerOptions | undefined, runtimeConfig.ignore, undefined, runtimeConfig.defaultNumberType)
      })()
    }

    return specPromise
  }

  const getSpecString: SpecGenerator['getSpecString'] = async format => {
    const cached = stringCache.get(format)
    if (cached) {
      return cached
    }

    const stringPromise = (async () => {
      const cli = await loadCli()
      return cli.serializeSpec(await getSpecObject(), format === 'yaml')
    })()

    stringCache.set(format, stringPromise)
    return stringPromise
  }

  return {
    getSpecObject,
    getSpecString,
  }
}
