---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Consumindo rotas geradas

Referência da API relevante: [`Config`](./reference/tsoa-next/interfaces/Config.md) e [`@Route`](./reference/tsoa-next/functions/Route.md).

Você tem duas opções para saber tsoa onde pode encontrar os controladores que irá usar para criar o auto-gerado `routes.ts` Arquivo.

## Usando descoberta automática de controladores

Você pode dizer `tsoa-next` utilizar a descoberta automática do controlador, fornecendo um ou mais [minimatch globs](http://www.globtester.com/) no nível superior `controllerPathGlobs` campo da sua [`Config`](./reference/tsoa-next/interfaces/Config.md) ficheiro (por exemplo `tsoa.json`).

Prós:

- Novos desenvolvedores podem adicionar um controlador sem ter que saber como tsoa "Crawls" para os controladores. Enquanto o seu controlador for capturado pelo glob que você fornece, o controlador será adicionado ao OpenAPI documentação e para a geração automática `routes.ts` Arquivo.

Contras:

- Pode ser ligeiramente mais lento do que a abordagem alternativa de importação explícita porque tsoa precisa expandir e carregar os globs configurados.

Como você pode ver a partir dos padrões globs controladores abaixo, você pode fornecer vários globs de vários padrões:

```js
{
  "entryFile": "...",
  "controllerPathGlobs": [
    "./dir-with-controllers/*",
    "./recursive-dir/**/*",
    "./custom-filerecursive-dir/**/*.controller.ts"
  ],
  "routes": {
    "routesDir": "...",
    "middleware": "..."
  }
}
```

## Contar manualmente tsoa quais controladores usar no arquivo de entrada do aplicativo

Se omitir `controllerPathGlobs`, tsoa pode rastrear o arquivo de entrada do aplicativo e seguir as importações do controlador que têm o `@Route` Decorador.

Prós:

- A geração de rotas será geralmente mais rápida porque tsoa segue suas importações explícitas em vez de expandir globs.

Contras:

- Novos desenvolvedores em sua equipe podem adicionar um controller e não entender por que o novo controller não foi exposto ao roteador ou OpenAPI geração. Se isso é um problema para você, prefira `controllerPathGlobs`.

```typescript
import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { RegisterRoutes } from './routes'

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './users/usersController'
// ########################################################################

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

app.listen(3000)
```
