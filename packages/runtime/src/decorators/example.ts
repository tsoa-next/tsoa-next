/**
 * Attaches an example value to a model property.
 *
 * @param _exampleModel The example value to include in generated schema metadata.
 * @param _exampleLabel Optional label used when multiple examples are present.
 */
export function Example<T>(_exampleModel: T, _exampleLabel?: string): PropertyDecorator {
  return () => {
    return
  }
}
