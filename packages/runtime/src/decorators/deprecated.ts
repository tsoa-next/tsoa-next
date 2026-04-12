/**
 * Marks a reflected API element as deprecated in generated documentation.
 */
export function Deprecated(): PropertyDecorator & ClassDecorator & ParameterDecorator {
  return () => {
    return
  }
}
