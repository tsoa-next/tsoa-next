# Generating Routes and OAS

Relevant API reference: [`Config`](../reference/tsoa-next/interfaces/Config.md), [`generateRoutes`](../reference/@tsoa-next/cli/functions/generateRoutes.md), [`generateSpec`](../reference/@tsoa-next/cli/functions/generateSpec.md), [`generateSpecAndRoutes`](../reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), [`ExtendedRoutesConfig`](../reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md), and [`ExtendedSpecConfig`](../reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md).

## Using CLI

### Basic Commands

```bash
# generate OAS
tsoa spec

# generate routes
tsoa routes

# discover configs and update only stale route and OpenAPI outputs
tsoa generate

# fail when generated outputs are stale without writing files
tsoa check

# discover config files beneath the current directory
tsoa discover

# discover config files beneath a path or glob
tsoa discover "packages/*"
```

### Options

#### OpenAPI Specification (OAS) generation

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### Route generation

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### Config discovery

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` searches beneath the provided path, or beneath the current working directory when no argument is provided.
- Glob inputs are supported, so commands like `tsoa discover "packages/*"` or `tsoa spec --discover "services/*"` will expand matching roots first.
- Discovery recognizes these conventional config filenames:
  - `tsoa.json`
  - `tsoa.yaml`
  - `tsoa.yml`
  - `tsoa.config.js`
  - `tsoa.config.cjs`
- `spec`, `routes`, and `spec-and-routes` can fan out across all discovered configs:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

#### Change-aware generation and CI checks

`generate` and `check` discover conventional tsoa config files automatically. Both commands search beneath the current working directory by default, or beneath an optional path or glob:

```bash
# Generate routes and OpenAPI specs for every discovered config.
# Existing files are written only when their generated content changed.
tsoa generate
tsoa generate "services/*"

# Compare generated content with the files on disk without creating directories
# or writing files. The command exits non-zero when any output is missing or stale.
tsoa check
tsoa check "services/*"
```

Each discovered config used by these combined commands must include both `spec` and `routes` sections. `check` reports the stale output paths and suggests running `tsoa generate`, which makes it suitable as a pull request CI gate.

Because config discovery is automatic, `generate` and `check` ignore the `--configuration` (`-c`) and `--discover` options and print a warning when either is supplied. Use the optional `[pathOrGlob]` argument to limit discovery instead.

Change-aware generation cannot safely control file writes performed by a custom `routes.routeGenerator`, so `generate` and `check` reject those configs. The existing `routes` and `spec-and-routes` commands continue to support custom route generators.

You can find the Reference for the tsoa configuration file [here](../reference/tsoa-next/interfaces/Config.md)

For information on the configuration object (`tsoa.json`), you may also be interested in:

[`Config` interface reference](../reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## Programmatic

Import programmatic generation APIs from `tsoa-next/cli`. The root `tsoa-next` entrypoint is runtime-only and should be used for decorators and runtime helpers.

```typescript
import { generateRoutes, generateSpec, generateSpecAndRoutes, ExtendedRoutesConfig, ExtendedSpecConfig } from 'tsoa-next/cli'

;(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    specVersion: 3,
    outputDirectory: './api/dist',
    controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
  }

  const routeOptions: ExtendedRoutesConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    routesDir: './api',
  }

  await generateSpec(specOptions)

  await generateRoutes(routeOptions)

  // Or generate both outputs from one shared metadata pass:
  await generateSpecAndRoutes({
    configuration: {
      entryFile: './api/server.ts',
      controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
      spec: {
        outputDirectory: './api/dist',
        specVersion: 3.1,
      },
      routes: {
        routesDir: './api',
      },
    },
  })
})()
```

**Note:** If you use tsoa programmatically, please be aware that tsoa's methods can (under rare circumstances) change in minor and patch releases. But if you are using tsoa in a .ts file, then TypeScript will help you migrate to any changes. We reserve this right to change what are essentially our internal methods so that we can continue to provide incremental value to the majority user (our CLI users). The CLI however will only receive breaking changes during a major release.
