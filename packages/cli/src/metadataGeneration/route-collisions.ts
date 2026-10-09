import type { Tsoa } from '@tsoa-next/runtime'
import { GenerateMetadataError } from './exceptions'

export function checkForMethodSignatureDuplicates(controllers: Tsoa.Controller[]) {
  const map: Tsoa.MethodsSignatureMap = {}
  controllers.forEach(controller => {
    controller.methods.forEach(method => {
      const signature = method.path ? `@${method.method}(${controller.path}/${method.path})` : `@${method.method}(${controller.path})`
      const methodDescription = `${controller.name}#${method.name}`

      if (map[signature]) {
        map[signature].push(methodDescription)
      } else {
        map[signature] = [methodDescription]
      }
    })
  })

  let message = ''
  Object.keys(map).forEach(signature => {
    const controllers = map[signature]
    if (controllers.length > 1) {
      message += `Duplicate method signature ${signature} found in controllers: ${controllers.join(', ')}\n`
    }
  })

  if (message) {
    throw new GenerateMetadataError(message)
  }
}

export function checkForPathParamSignatureDuplicates(controllers: Tsoa.Controller[]) {
  const paramRegExp = /\{(\w*)}|:(\w+)/g
  type RouteCollision = {
    type: PathDuplicationType
    method: Tsoa.Method
    controller: Tsoa.Controller
    collidesWith: Tsoa.Method[]
  }

  enum PathDuplicationType {
    FULL, // Fully duplicate.
    PARTIAL, // Collides, check order or fix route
  }

  const collisions: RouteCollision[] = []

  function addCollision(type: PathDuplicationType, method: Tsoa.Method, controller: Tsoa.Controller, collidesWith: Tsoa.Method) {
    let existingCollision = collisions.find(collision => collision.type === type && collision.method === method && collision.controller === controller)
    if (!existingCollision) {
      existingCollision = {
        type,
        method,
        controller,
        collidesWith: [],
      }
      collisions.push(existingCollision)
    }

    existingCollision.collidesWith.push(collidesWith)
  }

  controllers.forEach(controller => {
    const methodRouteGroup: {
      [key: string]: Array<{
        path: string
        method: Tsoa.Method
      }>
    } = {}
    // Group all ts methods with HTTP method decorator into same object in same controller.
    controller.methods.forEach(method => {
      const routesForMethod = (methodRouteGroup[method.method] ??= [])

      const params = method.path.match(paramRegExp)

      routesForMethod.push({
        method, // method.name + ": " + method.path) as any,
        path:
          params?.reduce((s, a) => {
            // replace all params with {} placeholder for comparison
            return s.replace(a, '{}')
          }, method.path) || method.path,
      })
    })

    Object.keys(methodRouteGroup).forEach((key: string) => {
      const methodRoutes = methodRouteGroup[key]

      // check each route with the routes that are defined before it
      for (let i = 0; i < methodRoutes.length; i += 1) {
        for (let j = 0; j < i; j += 1) {
          if (methodRoutes[i].path === methodRoutes[j].path) {
            // full match
            addCollision(PathDuplicationType.FULL, methodRoutes[i].method, controller, methodRoutes[j].method)
          } else if (
            methodRoutes[i].path.split('/').length === methodRoutes[j].path.split('/').length &&
            methodRoutes[j].path
              .substring(methodRoutes[j].path.lastIndexOf('/')) // compare only the "last" part of the path
              .split('/')
              .some(v => !!v) && // ensure the comparison path has a value
            methodRoutes[i].path.split('/').every((v, index) => {
              const comparisonPathPart = methodRoutes[j].path.split('/')[index]
              // if no params, compare values
              if (!v.includes('{}')) {
                return v === comparisonPathPart
              }
              // otherwise check if route starts with comparison route
              return v.startsWith(methodRoutes[j].path.split('/')[index])
            })
          ) {
            // partial match - reorder routes!
            addCollision(PathDuplicationType.PARTIAL, methodRoutes[i].method, controller, methodRoutes[j].method)
          }
        }
      }
    })
  })

  // print warnings for each collision (grouped by route)
  collisions.forEach(collision => {
    let message = ''
    if (collision.type === PathDuplicationType.FULL) {
      message = `Duplicate path parameter definition signature found in controller `
    } else if (collision.type === PathDuplicationType.PARTIAL) {
      message = `Overlapping path parameter definition signature found in controller `
    }
    message += collision.controller.name
    message += ` [ method ${collision.method.method.toUpperCase()} ${collision.method.name} route: ${collision.method.path} ] collides with `
    message += collision.collidesWith
      .map((method: Tsoa.Method) => {
        return `[ method ${method.method.toUpperCase()} ${method.name} route: ${method.path} ]`
      })
      .join(', ')

    message += '\n'
    console.warn(message)
  })
}
