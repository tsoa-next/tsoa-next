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

  return {
    async getSpecObject() {
      if (!specPromise) {
        specPromise = (async () => {
          const runtimeConfig = assertSpecConfig(config)
          const cli = await loadCli()
          return cli.buildSpec(runtimeConfig.spec, runtimeConfig.compilerOptions as import('typescript').CompilerOptions | undefined, runtimeConfig.ignore, undefined, runtimeConfig.defaultNumberType)
        })()
      }

      return specPromise
    },
    async getSpecString(format) {
      const cached = stringCache.get(format)
      if (cached) {
        return cached
      }

      const stringPromise = (async () => {
        const cli = await loadCli()
        return cli.serializeSpec(await this.getSpecObject(), format === 'yaml')
      })()

      stringCache.set(format, stringPromise)
      return stringPromise
    },
  }
}
