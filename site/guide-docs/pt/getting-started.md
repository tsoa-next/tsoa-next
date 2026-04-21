---
title: Primeiros passos
lang: pt-BR
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Começar

** Sobre o que vamos falar:

[[toc]]

Referência da API relevante: [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), [`@Get`](./reference/tsoa-next/functions/Get.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Post`](./reference/tsoa-next/functions/Post.md), [`@Body`](./reference/tsoa-next/functions/Body.md), e [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

::: warning NOTA DE COMPATIBILIDADE
Objectivos deste guia [express](https://expressjs.com) e assume `tsoa-next`A actual política de apoio: Node.js 22 ou mais novo.
Verificamos o suporte através do LTS anterior, LTS atual, e Node vPróximo em IC.
Exemplos abaixo incluem `npm`, `pnpm`, e `yarn` variantes onde o comando difere.
:::

## Inicializando nosso projeto

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

Criar um `package.json` e `tsconfig.json` com seu gerenciador de pacotes de escolha:

::: code-group

```shell [npm]
npm init -y
npm exec tsc -- --init
```

```shell [pnpm]
pnpm init
pnpm exec tsc --init
```

```shell [yarn]
yarn init -y
yarn exec tsc --init
```

:::

Instalar o aplicativo e TypeScript dependências com o gestor de pacotes escolhido:

::: code-group

```shell [npm]
npm i tsoa-next express
npm i -D typescript @types/node @types/express
```

```shell [pnpm]
pnpm add tsoa-next express
pnpm add -D typescript @types/node @types/express
```

```shell [yarn]
yarn add tsoa-next express
yarn add -D typescript @types/node @types/express
```

:::

As rotas geradas importam de `tsoa-next`, então o pacote que sua aplicação instala é também o pacote usado pelos controladores e gerado `RegisterRoutes` ficheiros.
Você também pode encontrar o pacote publicado em [npm](https://www.npmjs.com/package/tsoa-next).

## Configurar tsoa e digitação

```js
// tsoa.json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*Controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build"
  }
}
```

Vamos ver o que estamos a dizer. tsoa Aqui:
Primeiro, especificamos onde será o ponto de entrada para nossa aplicação.
Muito provavelmente, este arquivo será chamado `index.ts` ou `app.ts`. Vamos criar este arquivo em um segundo.

Depois, o nível superior `controllerPathGlobs` opções tsoa onde pode procurar por controladores para que não tenhamos que importá-los manualmente.

A seguir, contamos tsoa quão rigorosa é a verificação do excesso de propriedade (para usar o TypeScript termo) ou adicional Verificação de propriedades (a utilizar OpenAPI terminologia) deve ser.
Podemos optar por "ignorar" propriedades adicionais (o OpenAPI padrão), removê-los durante a validação ("silently-remove-extras"), ou jogar um Erro de volta para o Cliente ("throw-on-extras").
Em seguida, definimos o diretório de saída para fora OpenAPI especificação (OAS) e nossa `routes.ts` ficheiro, que falaremos mais tarde.

Nós definimos o `specVersion` para `3` assim tsoa irá gerar uma OpenAPI especificação v3.
Também pode utilizar `3.1` quando você quiser OpenAPI 3.1 saída.

Para uma lista completa de todas as configurações possíveis, dê uma olhada no [Referência da API](./reference/tsoa-next/interfaces/Config.md)

::: tip
Enquanto a configuração padrão ts funcionará para este guia, um tsconfig melhorado. O Json pareceria algo assim:
::: details

```jsonc
{
  "compilerOptions": {
    /* Basic Options */
    "incremental": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "build",

    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Additional Checks */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Module Resolution Options */
    "moduleResolution": "node",
    "baseUrl": ".",
    "esModuleInterop": true,

    /* Experimental Options */
    "experimentalDecorators": true,
    // emitDecoratorMetadata is not needed by tsoa-next itself

    /* Advanced Options */
    "forceConsistentCasingInFileNames": true,
  },
}
```

:::

## Definindo nosso primeiro modelo

Se você já tem um OpenAPI Especificação, você pode usar existente OpenAPI ferramenta para gerar seus modelos ou interfaces.
Caso contrário, vamos definir um `User` Interface em `src/users/user.ts`.

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

Antes de começarmos a definir nosso Controlador, geralmente é uma boa ideia criar um Serviço que lida com a interação com nossos Modelos em vez de empurrar toda essa lógica para a camada do controlador.

```ts
// src/users/usersService.ts
import { User } from './user'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      status: 'Happy',
      phoneNumbers: [],
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: 'Happy',
      ...userCreationParams,
    }
  }
}
```

## Definir um controlador simples

```typescript {15,17,19,20,25,26,28}
// src/users/usersController.ts
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

Vamos dar um passo atrás e falar sobre o que se passa aqui.
Como você pode esperar já dizer, estamos definindo um `/users/` rota usando o [`@Route()`](./reference/tsoa-next/functions/Route.md) Decorador acima de nossa classe controlador.

Além disso, definimos 2 métodos: `getUser` e `createUser`.
A [`@Get()`](./reference/tsoa-next/functions/Get.md) decorador em combinação com a nossa rota base `/users/` vai dizer tsoa para invocar este método para cada _GET_ request to `/users/{{userId}}`, onde _{usuário Id}_ é um modelo.

::: tip Templating do Caminho do OpenAPI
Roteamento tsoa está espelhando de perto OpenAPIO caminho templating por razões de compatibilidade.
Path templating refere-se ao uso de expressões de modelo, delimitadas por chavetas cacheadas ({}), para marcar uma seção de um caminho URL como substituível usando parâmetros de caminho.
:::

Sob o capô, isso seria como definir `app.get('users/:userId')`.
Enquanto o Express permite que você use definições de rota regex-ish, preferimos dividir o roteamento e a validação mais claramente.
Porque você está pedindo para o _id_ ser um _número_ usando o [`@Path()`](./reference/tsoa-next/functions/Path.md) decorador com uma `userId` número de tipo, tsoa rejeitará passar ou seja, um _string_ aqui.
Da mesma forma, se você quiser aceitar um _string_ com um determinado padrão, você pode fazer isso usando anotações JSON Schema. Você pode aprender mais sobre isso [here](#what-s-next).

tsoa-next suporta o caminho habitual, consulta, cabeçalho e decoradores de corpo, e também suporta multipart forma-data decoradores como [`@FormField()`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md), e [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md), mais parâmetros injectados apenas em tempo de execução, tais como [`@Request()`](./reference/tsoa-next/functions/Request.md) e [`@Res()`](./reference/tsoa-next/functions/Res.md).

::: tip
Se o nome do parâmetro for igual ao parâmetro de mensagem http, você pode omitir o argumento aos decoradores, caso contrário você pode fornecer um argumento:

```ts
@Query('my-query') myQuery: string;
```

:::

Uma lista completa de todos os decoradores pode ser encontrada [here](./decorators).

::: warning Caveat
Usar sempre uma exportação nomeada (`export class C`) na classe do controlador em ordem tsoa para o apanhar correctamente.
Exportações por defeito (`export default class C`) não são actualmente suportados.
:::

## Criando nosso servidor expresso

Vamos agora criar um `app.ts` e a `server.ts` arquivo em nosso diretório de origem como este:

```ts
// src/app.ts
import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from '../build/routes'

export const app = express()

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
)
app.use(json())

RegisterRoutes(app)
```

```ts
// src/server.ts
import { app } from './app'

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## Compilando os arquivos gerados

Neste ponto você deve ter notado que TypeScript não vai encontrar o `RegisterRoutes` importação de `build/routes`.
Isso porque não pedimos tsoa para gerar o arquivo de rotas e OpenAPI Espec ainda.
Vamos fazer isso agora.

```shell
mkdir -p build # Create the build directory if it doesn't exist
```

::: code-group

```shell [npm]
npm exec tsoa -- spec-and-routes
```

```shell [pnpm]
pnpm exec tsoa spec-and-routes
```

```shell [yarn]
yarn exec tsoa spec-and-routes
```

:::

Agora seus arquivos gerados devem ter sido criados e você pode compilar TypeScript e iniciar o seu servidor:

::: code-group

```shell [npm]
npm exec tsc -- --outDir build --experimentalDecorators
```

```shell [pnpm]
pnpm exec tsc --outDir build --experimentalDecorators
```

```shell [yarn]
yarn exec tsc --outDir build --experimentalDecorators
```

:::

```shell
node build/src/server.js
```

::: tip

Você pode querer adicionar estes scripts ao seu `package.json` Neste ponto:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## E a seguir?

- Invocação manual `tsc` e `tsoa routes` em desenvolvimento não é muito conveniente.
- Inspecionando nosso primeiro OpenAPI especificação e supercarga do nosso loop de feedback, servindo uma versão atualizada de SwaggerUI durante o desenvolvimento.

Podemos melhorar isso usando [live reloading](./live-reloading).

- Melhorar a nossa resposta para erros de validação usando adequadamente [error handling](./error-handling)- Utilização [Descriptions](./descriptions), [Exemplos](./examples) e [Annotations](./annotations) para validação avançada e melhor documentação
