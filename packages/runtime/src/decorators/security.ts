/**
 * Can be used to indicate that a method requires no security.
 */
export function NoSecurity(): ClassDecorator & MethodDecorator {
  return () => {
    return
  }
}

/**
 * @param {name} security name from securityDefinitions
 */
export function Security(_name: string | { [name: string]: string[] }, _scopes?: string[]): ClassDecorator & MethodDecorator {
  return () => {
    return
  }
}
