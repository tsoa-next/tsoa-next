---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Генерирующие маршруты и OAS

Соответствующая ссылка API: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md), [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md), [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md)и [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md).

## использовать CLI

### Основные команды

```bash
# generate OAS
tsoa spec

# generate routes
tsoa routes

# discover config files beneath the current directory
tsoa discover

# discover config files beneath a path or glob
tsoa discover "packages/*"
```

### Варианты

#### OpenAPI Генерация спецификаций (OAS)

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### генерация маршрутов

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### Открытие конфигураций

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` Поиски под предоставленным путем или под текущим рабочим каталогом, когда аргумент не приводится.
- Входные данные Glob поддерживаются, поэтому команды, такие как `tsoa discover "packages/*"` или `tsoa spec --discover "services/*"` Сначала расширит соответствующие корни.
- Discovery распознает эти обычные имена файлов конфигураций:
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`, `routes`и `spec-and-routes` Может раздуваться по всем обнаруженным конфигурациям:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

Вы можете найти ссылку на tsoa конфигурационный файл [here](./reference/tsoa-next/interfaces/Config.md)

Для информации об объекте конфигурации (`tsoa.json`Вы также можете быть заинтересованы в:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## программный

Импорт программных генерирующих API из `tsoa-next/cli`. Корень `tsoa-next` Точка входа предназначена только для выполнения и должна использоваться для декораторов и помощников во время выполнения.

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

**Примечание: ** Если вы используете tsoa Программно, пожалуйста, помните, что tsoaМетоды могут (при редких обстоятельствах) изменяться в незначительных и патч-релизах. Если вы используете tsoa в файле .ts, затем TypeScript Это поможет вам перейти к любым изменениям. Мы оставляем за собой право изменять наши внутренние методы таким образом, чтобы мы могли продолжать предоставлять дополнительную ценность для большинства пользователей. CLI пользователей). The CLI Однако изменения будут происходить только во время крупного релиза.
