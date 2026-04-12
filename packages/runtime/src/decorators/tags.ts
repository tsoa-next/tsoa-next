/**
 * Adds OpenAPI tags to a controller or action.
 *
 * @param _values One or more tag names to attach.
 */
export function Tags(..._values: string[]): ClassDecorator & MethodDecorator {
  return () => {
    return
  }
}
