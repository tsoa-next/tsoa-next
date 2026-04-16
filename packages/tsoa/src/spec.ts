import type { EmbeddedSpecGeneratorArtifacts, RuntimeSpecConfigSnapshot, SpecGenerator } from '@tsoa-next/runtime'

const loadCli = async () => await import('@tsoa-next/cli')

function assertSpecConfig(config?: RuntimeSpecConfigSnapshot): RuntimeSpecConfigSnapshot {
  if (!config) {
    throw new Error('SpecPath requires spec generation settings. Provide spec configuration when generating routes so built-in spec targets can rebuild the OpenAPI document at runtime.')
  }

  return config
}

function serializeEmbeddedJson(spec: EmbeddedSpecGeneratorArtifacts['spec']) {
  return JSON.stringify(spec, null, '\t')
}

/**
 * Creates a runtime spec generator from a prebuilt OpenAPI artifact embedded into generated route code.
 * This keeps built-in `SpecPath` targets independent from source files and TypeScript analysis at request time.
 */
export function createEmbeddedSpecGenerator(artifacts: EmbeddedSpecGeneratorArtifacts): SpecGenerator {
  const specPromise = Promise.resolve(artifacts.spec)
  const stringCache = new Map<'json' | 'yaml', Promise<string>>()

  const getSpecObject: SpecGenerator['getSpecObject'] = async () => specPromise

  const getSpecString: SpecGenerator['getSpecString'] = async format => {
    const cached = stringCache.get(format)
    if (cached) {
      return cached
    }

    let stringPromise: Promise<string>
    if (format === 'json') {
      stringPromise = Promise.resolve(artifacts.json ?? serializeEmbeddedJson(artifacts.spec))
    } else {
      const yaml = artifacts.yaml
      if (yaml === undefined) {
        stringPromise = Promise.reject(
          new Error(
            'Embedded spec generator cannot produce YAML because no embedded YAML artifact was provided. Embed `artifacts.yaml` when generating routes, or use `createOpenApiSpecGenerator` if runtime CLI-based serialization is required.',
          ),
        )
      } else {
        stringPromise = Promise.resolve(yaml)
      }
    }

    stringCache.set(format, stringPromise)
    return stringPromise
  }

  return {
    getSpecObject,
    getSpecString,
  }
}

/**
 * Creates a runtime spec generator that lazily builds the OpenAPI document once per generator instance using `@tsoa-next/cli`,
 * then caches the generated spec object and serialized strings for subsequent reads.
 */
export function createOpenApiSpecGenerator(config?: RuntimeSpecConfigSnapshot): SpecGenerator {
  let specPromise: Promise<import('@tsoa-next/runtime').Swagger.Spec> | undefined
  const stringCache = new Map<'json' | 'yaml', Promise<string>>()

  const getSpecObject: SpecGenerator['getSpecObject'] = async () => {
    specPromise ??= (async () => {
      const runtimeConfig = assertSpecConfig(config)
      const cli = await loadCli()
      return cli.buildSpec(
        runtimeConfig.spec,
        runtimeConfig.compilerOptions as import('typescript').CompilerOptions | undefined,
        runtimeConfig.ignore,
        runtimeConfig.metadata,
        runtimeConfig.defaultNumberType,
      )
    })()

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
