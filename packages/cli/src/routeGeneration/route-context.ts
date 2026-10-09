import type { Tsoa, TsoaRoute } from '@tsoa-next/runtime'
import type { ExtendedRoutesConfig } from '../api'
import { normalisePath } from '../utils/pathUtils'
import type { AbstractRouteGenerator } from './routeGenerator'
import type { RouteSchemaOwner } from './route-schema'

export interface RouteContextOwner<Config extends ExtendedRoutesConfig> extends RouteSchemaOwner {
  readonly options: Config
  pathTransformer(path: string): string
  getRelativeImportPath(fileLocation: string): string
  buildParameterSchema(source: Tsoa.Parameter): TsoaRoute.ParameterSchema
  buildModels(): TsoaRoute.Models
  buildEmbeddedSpecGeneratorArtifacts: AbstractRouteGenerator<Config>['buildEmbeddedSpecGeneratorArtifacts']
}

export function buildContext<Config extends ExtendedRoutesConfig>(owner: RouteContextOwner<Config>) {
  const authenticationModule = owner.options.authenticationModule ? owner.getRelativeImportPath(owner.options.authenticationModule) : undefined
  const iocModule = owner.options.iocModule ? owner.getRelativeImportPath(owner.options.iocModule) : undefined

  // Left in for backwards compatibility, previously if we're working locally then tsoa runtime code wasn't an importable module but now it is.
  const canImportByAlias = true

  const normalisedBasePath = normalisePath(owner.options.basePath as string, '/')
  const useSpecPaths = owner.metadata.controllers.some(controller => controller.hasSpecPaths === true)
  const embeddedSpecGeneratorArtifacts = owner.buildEmbeddedSpecGeneratorArtifacts(useSpecPaths)

  return {
    authenticationModule,
    basePath: normalisedBasePath,
    canImportByAlias,
    controllers: owner.metadata.controllers.map(controller => {
      const normalisedControllerPath = owner.pathTransformer(normalisePath(controller.path, '/'))

      return {
        actions: controller.methods.map(method => {
          const parameterObjs: { [name: string]: TsoaRoute.ParameterSchema } = {}
          method.parameters.forEach(parameter => {
            parameterObjs[parameter.parameterName] = owner.buildParameterSchema(parameter)
          })
          const normalisedMethodPath = owner.pathTransformer(normalisePath(method.path, '/'))

          const normalisedFullPath = normalisePath(`${normalisedBasePath}${normalisedControllerPath}${normalisedMethodPath}`, '/', '', false)

          const uploadFilesWithDifferentFieldParameter = method.parameters.filter(
            parameter => parameter.type.dataType === 'file' || (parameter.type.dataType === 'array' && parameter.type.elementType.dataType === 'file'),
          )
          return {
            fullPath: normalisedFullPath,
            method: method.method.toLowerCase(),
            name: method.name,
            parameters: parameterObjs,
            path: normalisedMethodPath,
            uploadFile: uploadFilesWithDifferentFieldParameter.length > 0,
            uploadFileName: uploadFilesWithDifferentFieldParameter.map(parameter => ({
              name: parameter.name,
              maxCount: parameter.type.dataType === 'file' ? 1 : undefined,
              multiple: parameter.type.dataType === 'array' && parameter.type.elementType.dataType === 'file',
            })),
            security: method.security,
            successStatus: method.successStatus ?? 'undefined',
          }
        }),
        modulePath: owner.getRelativeImportPath(controller.location),
        name: controller.name,
        path: normalisedControllerPath,
      }
    }),
    environment: process.env,
    existingGetPaths: owner.metadata.controllers.flatMap(controller =>
      controller.methods
        .filter(method => method.method.toLowerCase() === 'get')
        .map(method => normalisePath(`${normalisedBasePath}${owner.pathTransformer(normalisePath(controller.path, '/'))}${owner.pathTransformer(normalisePath(method.path, '/'))}`, '/', '', false)),
    ),
    iocModule,
    minimalSwaggerConfig: { noImplicitAdditionalProperties: owner.options.noImplicitAdditionalProperties, bodyCoercion: owner.options.bodyCoercion },
    models: owner.buildModels(),
    embeddedSpecGeneratorArtifacts,
    runtimeSpecConfig: owner.options.runtimeSpecConfig
      ? {
          ...owner.options.runtimeSpecConfig,
          metadata: owner.metadata,
        }
      : undefined,
    useSpecPaths,
    useFileUploads: owner.metadata.controllers.some(controller => controller.methods.some(method => method.parameters.some(parameter => isFileUploadParameter(parameter)))),
    multerOpts: {
      limits: {
        fileSize: 8388608, // 8mb
      },
      ...owner.options.multerOpts,
    } as Config['multerOpts'],
    useSecurity: owner.metadata.controllers.some(controller => controller.methods.some(method => method.security.length > 0)),
    esm: owner.options.esm,
  }
}

export function buildParameterSchema(owner: Pick<RouteSchemaOwner, 'buildProperty'>, source: Tsoa.Parameter): TsoaRoute.ParameterSchema {
  const property = owner.buildProperty(source.type)
  const parameter = {
    default: source.default,
    externalValidator: source.externalValidator,
    in: source.in,
    name: source.name,
    parameterIndex: source.parameterIndex,
    required: source.required ? true : undefined,
    validationStrategy: source.validationStrategy,
  } as TsoaRoute.ParameterSchema
  const parameterSchema = Object.assign(parameter, property)

  if (Object.keys(source.validators).length > 0) {
    parameterSchema.validators = source.validators
  }

  return parameterSchema
}

function isFileUploadParameter(parameter: Tsoa.Parameter): boolean {
  return parameter.type.dataType === 'file' || (parameter.type.dataType === 'array' && parameter.type.elementType.dataType === 'file')
}
