import { Config, RoutesConfig } from '../config'
import { Tsoa } from '../metadataGeneration/tsoa'

export interface AdditionalProps {
  noImplicitAdditionalProperties: Exclude<Config['noImplicitAdditionalProperties'], undefined>
  bodyCoercion: Exclude<RoutesConfig['bodyCoercion'], undefined>
  maxValidationErrorSize?: number
  validation?: Tsoa.ValidationContext
}
