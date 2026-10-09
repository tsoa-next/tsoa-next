import * as ts from 'typescript'
import type { ExtendedSpecConfig } from '../api'
import { Tsoa, Swagger, Config } from '@tsoa-next/runtime'
import { fsMkDir, fsWriteFile } from '../utils/fs'

/** Returns the final output path for the generated OpenAPI document. */
export const getSwaggerOutputPath = (swaggerConfig: ExtendedSpecConfig) => {
  const ext = swaggerConfig.yaml ? 'yaml' : 'json'
  const specFileBaseName = swaggerConfig.specFileBaseName || 'swagger'

  return `${swaggerConfig.outputDirectory}/${specFileBaseName}.${ext}`
}

/**
 * Generates an OpenAPI document on disk and returns the metadata used to build it.
 */
export const generateSpec = async (
  swaggerConfig: ExtendedSpecConfig,
  compilerOptions?: ts.CompilerOptions,
  ignorePaths?: string[],
  /**
   * pass in cached metadata returned in a previous step to speed things up
   */
  metadata?: Tsoa.Metadata,
  defaultNumberType?: Config['defaultNumberType'],
) => {
  const controllerPathGlobs = swaggerConfig.controllerPathGlobs?.length ? swaggerConfig.controllerPathGlobs : undefined
  if (metadata === undefined || metadata === null) {
    const { MetadataGenerator } = require('../metadataGeneration/metadataGenerator') as typeof import('../metadataGeneration/metadataGenerator')
    metadata = new MetadataGenerator(swaggerConfig.entryFile, compilerOptions, ignorePaths, controllerPathGlobs, swaggerConfig.rootSecurity, defaultNumberType).Generate()
  }
  const spec = buildSpec(swaggerConfig, compilerOptions, ignorePaths, metadata, defaultNumberType)

  await fsMkDir(swaggerConfig.outputDirectory, { recursive: true })

  const outputPath = getSwaggerOutputPath(swaggerConfig)
  await fsWriteFile(outputPath, serializeSpec(spec, swaggerConfig.yaml), { encoding: 'utf8' })

  return metadata
}

/**
 * Builds an OpenAPI document in memory without writing it to disk.
 */
export const buildSpec = (
  swaggerConfig: ExtendedSpecConfig,
  compilerOptions?: ts.CompilerOptions,
  ignorePaths?: string[],
  metadata?: Tsoa.Metadata,
  defaultNumberType?: Config['defaultNumberType'],
): Swagger.Spec => {
  const controllerPathGlobs = swaggerConfig.controllerPathGlobs?.length ? swaggerConfig.controllerPathGlobs : undefined
  if (metadata === undefined || metadata === null) {
    const { MetadataGenerator } = require('../metadataGeneration/metadataGenerator') as typeof import('../metadataGeneration/metadataGenerator')
    metadata = new MetadataGenerator(swaggerConfig.entryFile, compilerOptions, ignorePaths, controllerPathGlobs, swaggerConfig.rootSecurity, defaultNumberType).Generate()
  }
  const specVersion = swaggerConfig.specVersion ?? 2

  switch (specVersion) {
    case 2: {
      const { SpecGenerator2 } = require('../swagger/specGenerator2') as typeof import('../swagger/specGenerator2')
      return new SpecGenerator2(metadata, swaggerConfig).GetSpec()
    }
    case 3: {
      const { SpecGenerator3 } = require('../swagger/specGenerator3') as typeof import('../swagger/specGenerator3')
      return new SpecGenerator3(metadata, swaggerConfig).GetSpec()
    }
    default: {
      const { SpecGenerator31 } = require('../swagger/specGenerator31') as typeof import('../swagger/specGenerator31')
      return new SpecGenerator31(metadata, swaggerConfig).GetSpec()
    }
  }
}

/** Serializes an OpenAPI document to JSON or YAML text. */
export const serializeSpec = (spec: Swagger.Spec, yaml = false) => {
  const data = JSON.stringify(spec, null, '\t')
  if (!yaml) {
    return data
  }

  const normalized: unknown = JSON.parse(data)
  const YAML = require('yaml') as typeof import('yaml')
  return YAML.stringify(normalized)
}
