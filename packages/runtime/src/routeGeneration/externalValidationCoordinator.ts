import { getParameterExternalValidatorMetadata } from '../decorators/validate'
import type { Tsoa } from '../metadataGeneration/tsoa'
import type { AdditionalProps } from './additionalProps'
import { validateExternalSchema } from './externalValidation'
import type { FieldErrors, ParameterValidationMetadata } from './templateHelpers'
import type { TsoaRoute } from './tsoa-route'

export interface ExternalValidationOwner {
  readonly config: AdditionalProps
}

export function validateExternal(
  owner: ExternalValidationOwner,
  name: string,
  rawValue: unknown,
  fieldErrors: FieldErrors,
  property: TsoaRoute.PropertySchema,
  parent: string,
  metadata?: ParameterValidationMetadata,
): unknown {
  const value = rawValue === undefined && property.default !== undefined ? property.default : rawValue
  const runtimeMetadata = getRuntimeExternalValidatorMetadata(metadata, property)
  const fieldPath = parent + name

  if (!runtimeMetadata) {
    fieldErrors[fieldPath] = {
      message: `Missing runtime schema metadata for external validator '${property.externalValidator?.kind || 'unknown'}' on '${fieldPath || '(anonymous parameter)'}'. Ensure the controller module is imported so decorators run, and ensure custom templates pass controllerClass, methodName, and parameterIndex into validation.`,
      value,
    }
    return undefined
  }

  const declaredKind = property.externalValidator?.kind
  const runtimeKind = runtimeMetadata.kind

  if (declaredKind && declaredKind !== runtimeKind) {
    fieldErrors[fieldPath] = {
      message: `External validator kind mismatch for '${fieldPath}'. Route schema expects '${declaredKind}' but runtime metadata provided '${runtimeKind}'.`,
      value,
    }
    return undefined
  }

  const kindToUse = declaredKind || runtimeKind
  const result = validateExternalSchema(kindToUse, runtimeMetadata.schema, value, owner.config.validation ?? {})
  if (result.ok) {
    return result.value
  }

  projectExternalFailureToFieldErrors(result.failure, fieldErrors, name, parent, value)
  return undefined
}

function getRuntimeExternalValidatorMetadata(metadata: ParameterValidationMetadata | undefined, property: TsoaRoute.PropertySchema) {
  if (!metadata?.controllerClass || metadata.parameterIndex === undefined || !metadata.methodName || !property.externalValidator) {
    return undefined
  }

  const controllerTarget = metadata.controllerClass as object & { prototype?: object }
  const candidateTargets = controllerTarget.prototype ? [controllerTarget.prototype, controllerTarget] : [controllerTarget]

  for (const target of candidateTargets) {
    const runtimeMetadata = getParameterExternalValidatorMetadata(target, metadata.methodName, metadata.parameterIndex)
    if (runtimeMetadata) {
      return runtimeMetadata
    }
  }

  return undefined
}

function projectExternalFailureToFieldErrors(failure: Tsoa.ValidationFailure, fieldErrors: FieldErrors, name: string, parent: string, value: unknown) {
  if (failure.issues.length === 0) {
    fieldErrors[parent + name] = {
      message: failure.summaryMessage,
      value,
    }
    return
  }

  for (const issue of failure.issues) {
    const baseFieldPath = parent + name
    const fieldPath = issue.path ? buildIssueFieldPath(baseFieldPath, issue.path) : baseFieldPath
    if (!fieldErrors[fieldPath]) {
      fieldErrors[fieldPath] = {
        message: issue.message || failure.summaryMessage,
        value,
      }
    }
  }
}

function buildIssueFieldPath(baseFieldPath: string, issuePath: string): string {
  return baseFieldPath ? `${baseFieldPath}.${issuePath}` : issuePath
}
