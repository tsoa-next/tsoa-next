---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Gerando Rotas e OEA

Referência da API relevante: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md), [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md), [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md), e [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md).

## Utilização CLI

### Comandos Básicos

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

### Opções

#### OpenAPI Geração de especificações (OAS)

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### Geração de rota

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### Descoberta de configuração

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` pesquisa abaixo do caminho fornecido, ou abaixo do diretório de trabalho atual quando nenhum argumento é fornecido.
- As entradas Glob são suportadas, por isso comandos como `tsoa discover "packages/*"` ou `tsoa spec --discover "services/*"` irá expandir as raízes correspondentes primeiro.
- Discovery reconhece estes nomes de ficheiros de configuração convencionais:
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`, `routes`, e `spec-and-routes` pode espalhar-se por todas as configurações descobertas:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

Você pode encontrar a referência para o tsoa arquivo de configuração [here](./reference/tsoa-next/interfaces/Config.md)

Para informações sobre o objeto de configuração (`tsoa.json`), você também pode estar interessado em:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## Programático

Importar APIs de geração programática de `tsoa-next/cli`. A raiz `tsoa-next` o ponto de entrada é apenas em tempo de execução e deve ser usado para decoradores e ajudantes em tempo de execução.

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

**Nota:** Se utilizar tsoa programaticamente, esteja ciente de que tsoaOs seus métodos podem (em circunstâncias raras) alterar as libertações menores e de sistemas transdérmicos. Mas se você estiver usando tsoa em um arquivo .ts, então TypeScript irá ajudá-lo a migrar para qualquer alteração. Reservamo-nos este direito de alterar o que são essencialmente os nossos métodos internos para que possamos continuar a fornecer valor incremental ao utilizador maioritário (o nosso CLI utilizadores). A CLI no entanto, só receberá mudanças de quebra durante um grande lançamento.
