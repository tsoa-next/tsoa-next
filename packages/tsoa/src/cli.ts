#!/usr/bin/env node
import {
  AbstractRouteGenerator,
  DefaultRouteGenerator,
  generateRoutes,
  generateRoutesFromArgs,
  generateSpec,
  generateSpecAndRoutes,
  generateSpecFromArgs,
  getSwaggerOutputPath,
  runCLI,
  validateCompilerOptions,
  validateRoutesConfig,
  validateSpecConfig,
} from '@tsoa-next/cli'
export * from '@tsoa-next/cli'
export {
  AbstractRouteGenerator,
  DefaultRouteGenerator,
  generateRoutes,
  generateRoutesFromArgs,
  generateSpec,
  generateSpecAndRoutes,
  generateSpecFromArgs,
  getSwaggerOutputPath,
  runCLI,
  validateCompilerOptions,
  validateRoutesConfig,
  validateSpecConfig,
}

if (require.main === module) {
  void (async () => {
    try {
      await runCLI()
    } catch (err) {
      console.error('tsoa cli error:\n', err)
      process.exit(1)
    }
  })()
}
