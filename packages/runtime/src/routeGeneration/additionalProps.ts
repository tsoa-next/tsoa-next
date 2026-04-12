import { Config, RoutesConfig } from '../config'
import type { Tsoa } from '../metadataGeneration/tsoa'

/** Runtime validation options passed into generated route template services. */
export interface AdditionalProps {
  noImplicitAdditionalProperties: Exclude<Config['noImplicitAdditionalProperties'], undefined>
  bodyCoercion: Exclude<RoutesConfig['bodyCoercion'], undefined>
  maxValidationErrorSize?: number
  validation?: Tsoa.ValidationContext
}
