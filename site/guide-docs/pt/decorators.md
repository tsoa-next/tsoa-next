---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Decoradores

Por favor, note que esta seção abrange apenas decoradores que não são descritos separadamente, como [`@Response`](./error-handling) ou os principais decoradores de parâmetros introduzidos em [Primeiros passos](./getting-started).
Para uma visão geral completa, verifique o [Referência da API](./reference/).
Referência da API relevante: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Tags`](./reference/tsoa-next/functions/Tags.md), [`@OperationId`](./reference/tsoa-next/functions/OperationId.md), [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md), [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`@Hidden`](./reference/tsoa-next/functions/Hidden.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md), [`@Inject`](./reference/tsoa-next/functions/Inject.md), [`@Produces`](./reference/tsoa-next/functions/Produces.md), e [`@Consumes`](./reference/tsoa-next/functions/Consumes.md).

## Segurança

A [`@Security`](./reference/tsoa-next/functions/Security.md) O decorador pode ser usado acima dos métodos do controlador para indicar que deve haver autenticação antes de executar esses métodos. Como descrito acima, a autenticação é feita em um arquivo que é referenciado em tsoaA configuração. Os nomes do esquema são definidos pelo usuário e devem corresponder aos nomes no seu OpenAPI módulo de configuração e autenticação de segurança. Ao utilizar o `@Security` decorador, você pode escolher entre ter um ou vários métodos de autenticação. Se você optar por ter vários métodos de autenticação, você pode escolher entre ter que passar um dos métodos (OR):

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

ou tendo de passar por todos eles (E):

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## Sem Segurança

Utilização [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) Quando um controlador ou ação deve esclarecer os requisitos de segurança herdados ou a nível da API.

```ts
import { Controller, Get, NoSecurity, Route, Security } from 'tsoa-next'

@Route('users')
@Security('api_key')
export class UsersController extends Controller {
  @Get('private')
  public async privateEndpoint(): Promise<string> {
    return 'private'
  }

  @Get('public')
  @NoSecurity()
  public async publicEndpoint(): Promise<string> {
    return 'public'
  }
}
```

## Etiquetas

Tags são definidas com o [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) decorador nos controladores e/ou nos métodos como nos exemplos a seguir.

```ts
import { Controller, Get, Request, Response, Route, Tags } from 'tsoa-next'

@Route('users')
@Tags('User')
export class UsersController extends Controller {
  @Get('UserInfo')
  @Tags('Info', 'Get')
  @Response<{ message: string }>('default', 'Unexpected error')
  public async userInfo(@Request() request: { user: { id: number; name: string } }): Promise<{ id: number; name: string }> {
    return Promise.resolve(request.user)
  }

  @Get('EditUser')
  @Tags('Edit')
  public async editUser(): Promise<string> {
    return 'ok'
  }
}
```

Se você tem um projeto que precisa de uma descrição e/ou documentos externos para tags, você pode configurar os geradores internos para usar as definições corretas de tags e documentos externos, fornecendo uma propriedade de tags para especificar a propriedade em tsoa.json.

```js
{
  "spec": {
    "tags":  [
      {
        "name": "User",
        "description": "Operations about users",
        "externalDocs": {
          "description": "Find out more about users",
          "url": "http://swagger.io"
        }
      }
    ],
    ...
  },
  "routes": {
    ...
  }
}
```

## Operação ID

Definir [`operationId`](./reference/tsoa-next/functions/OperationId.md) sob o caminho de uma operação.
Útil para utilização com OpenAPI ferramenta de geração de código uma vez que este parâmetro é usado para nomear a função gerada no cliente SDK.

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## Depreciada

OpenAPI permite que você deprecate [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated), [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated), e [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated). Isso permite que você indique que certos endpoint/formats/etc. não devem mais ser usados, enquanto permite aos clientes o tempo de migração para a nova abordagem.

Para deprecar partes de sua API, você pode anexar o [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) decorador de propriedades, métodos e parâmetros de classe. Para construções que não suportam decoradores (por exemplo, interfaces e aliases de tipo), você pode usar um `@deprecated` JSDoc anotação. Alguns exemplos:

### Operações

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### Parâmetros (OpenAPI Apenas 3+)

```ts
@Get("v2")
public async findV2(
  @Query() text: string,
  @Deprecated() @Query() dontUse?: string
): Promise<any> {

}
```

```ts
interface QueryParams {
  text: string;
  sort?: string;
  page?: number;
}

@Get("v2")
public async findV2(
  @Queries() queryParams: QueryParams
): Promise<any> {

}
```

### Esquemas (OpenAPI Apenas 3+)

```ts
class CreateUserRequest {
  name: string;
  @Deprecated() firstName?: string;

  constructor(
    public emailAddress: string,
    @Deprecated() public icqHandle?: string
  ) {}
}

interface CreateUserResponse {
  /** @deprecated */ durationMs?: number;
  details: UserDetails;
}

type UserDetails = {
  name: string;
  /** @deprecated */ firstName?: string;
};
```

## Validar

O decorador de esquema externo é nomeado [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Use-o nos parâmetros do método do controller quando você quiser uma biblioteca de esquema externa suportada para substituir a validação em tempo de execução para esse parâmetro subtree.

- Formulários suportados: `@Validate(schema)`, `@Validate('zod', schema)`, `@Validate({ kind: 'zod', schema })`- Bibliotecas suportadas: `zod`, `joi`, `yup`, `superstruct`, `io-ts`- Decoradores de parâmetros suportados: `@Body`, `@BodyProp`, `@Query`, `@Queries`, `@Path`, `@Header`, `@FormField`, `@UploadedFile`, `@UploadedFiles`- OpenAPI geração ainda vem de sua TypeScript Tipos; `@Validate(...)` somente alterações na validação em tempo de execução

```ts
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'
import { z } from 'zod'

type CreateUser = {
  name: string
  tags: string[]
}

const CreateUserSchema = z.object({
  name: z.string().min(3),
  tags: z.array(z.string()).min(1),
})

@Route('users')
export class UsersController extends Controller {
  @Post()
  public create(@Body() @Validate(CreateUserSchema) payload: CreateUser): CreateUser {
    return payload
  }
}
```

Para notas completas de configuração e exemplos para cada biblioteca de validadores suportada, consulte [External Validators](./external-validators).

## SpecPath

Utilização [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) em um controlador quando você deseja que o controlador expire um endpoint de especificação ou documentação em tempo de execução sem ler um arquivo de especificação gerado do disco local.

- `@SpecPath()` padrão para um endpoint JSON em `/<controller-path>/spec`- Alvos incorporados: `json`, `yaml`, `swagger`, `redoc`, `rapidoc`- Alvos embutidos exigem geração de rota para ter acesso à configuração específica, como o padrão `tsoa spec-and-routes` fluxo de trabalho ou uma configuração de rotas que incorpora `runtimeSpecConfig`- Um controlador pode declarar múltiplos `@SpecPath(...)` decoradores, desde que os caminhos resolvidos não colidem
- A documentação incorporada tem como alvo dependências opcionais de pares preguiçosas:
  - `swagger-ui-express` em vez Express  - `swagger-ui-koa` em vez Koa  - `hapi-swagger` em vez Hapi  - `redoc` em vez Redoc  - `rapidoc` em vez RapiDoc- Os manipuladores personalizados podem retornar `string` ou a `Readable`- Utilização `@SpecPath(path, options?)` para configurar [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) tais como `target`, `cache`, e um opcional `gate`- `gate` pode ser um booleano ou uma função que recebe o [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) e retorna se a especificação deve ser servido para esse pedido
- Cache pode ser desativado com `'none'`, mantidos em processo com `'memory'`, ou delegado em um costume [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` as rotas são auxiliares e não são adicionadas à geração OpenAPI documento

```ts
import { Controller, Get, Route, SpecPath } from 'tsoa-next'

@Route('users')
@SpecPath()
@SpecPath('openapi.yaml', { target: 'yaml' })
@SpecPath('docs', { target: 'swagger' })
export class UsersController extends Controller {
  @Get()
  public list(): string[] {
    return []
  }
}
```

Nesse exemplo:

- `GET /users/spec` serve a OpenAPI documento como JSON
- `GET /users/openapi.yaml` serve o mesmo documento que YAML
- `GET /users/docs` serve Swagger UI se a dependência por pares específica para execução estiver instalada

Você também pode fornecer um manipulador personalizado e implementação de cache externa:

```ts
import { Readable } from 'node:stream'
import { Controller, Get, Route, SpecCacheHandler, SpecPath, SpecRequestContext } from 'tsoa-next'

const cacheStore = new Map<string, string>()

const cache: SpecCacheHandler = {
  async get(context) {
    return cacheStore.get(context.cacheKey)
  },
  async set(context, value) {
    cacheStore.set(context.cacheKey, value)
  },
}

async function customDocs(context: SpecRequestContext) {
  return Readable.from([await context.getSpecString('json')])
}

@Route('internal')
@SpecPath('spec.json', { target: customDocs, cache })
export class InternalController extends Controller {
  @Get('status')
  public status() {
    return { ok: true }
  }
}
```

Você também pode abrir uma rota específica:

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

Quando o cache está habilitado e um manipulador personalizado retorna um fluxo, `tsoa-next` buffers o fluxo para uma string antes de armazená- lo através do manipulador de cache.


## Escondido

Utilização [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) sobre métodos para excluir um ponto final do produto gerado OpenAPI Documento de especificação.

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

Utilização [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) em controladores para excluir todos os seus objetivos do gerado OpenAPI Documento de especificação.

```ts
import { Controller, Get, Hidden, Post, Route } from 'tsoa-next'

@Route('hidden')
@Hidden()
export class HiddenController extends Controller {
  @Get()
  public async find(): Promise<any> {}

  @Post()
  public async create(): Promise<any> {}
}
```

Utilização em `@Query` parâmetros para excluir parâmetros de consulta do gerado OpenAPI Documento de especificação. O parâmetro deve permitir que não seja definido ou ter um valor padrão para ser oculto.

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## Pedido

Para acessar o objeto de pedido expresso em um método de controller use o [`@Request`](./reference/tsoa-next/functions/Request.md) Decorador:

```typescript
// src/users/usersController.ts

import * as express from 'express'
import { Controller, Get, Path, Request, Route } from 'tsoa-next'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Request() request: express.Request
  ): Promise<{ id: number; requestedBy?: string }> {
    // TODO: implement some code that uses the request as well
    return {
      id: userId,
      requestedBy: request.header('x-requested-by'),
    }
  }
}
```
Acesso Koao objeto request (que tem o objeto ctx) em um método controller usa o [`@Request`](./reference/tsoa-next/functions/Request.md) Decorador:

```typescript
// src/users/usersController.ts

import * as koa from 'koa'
import { Controller, Get, Path, Request, Route } from 'tsoa-next'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Request() request: koa.Request
  ): Promise<{ id: number; path: string }> {
    const ctx = request.ctx;
    return {
      id: userId,
      path: ctx.path,
    }
  }
}
```

::: danger
Note que o parâmetro `request` não aparece no seu ficheiro OAS.
Utilização [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) quando o valor já vive no objeto de solicitação em tempo de execução subjacente.
Utilização [`@Inject()`](./reference/tsoa-next/functions/Inject.md) quando um parâmetro é fornecido inteiramente pelo seu próprio modelo de rota ou código de embalagem e deve ser omitido da geração de especificações.
:::

## PedidoProp

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) liga uma única propriedade do objeto de solicitação em tempo de execução subjacente.

```ts
import { Controller, Post, RequestProp, Route } from 'tsoa-next'

@Route('request-props')
export class RequestPropsController extends Controller {
  @Post('body')
  public async getBody(@RequestProp('body') body: { name: string }): Promise<{ name: string }> {
    return body
  }
}
```

## Produtos

A [`@Produces`](./reference/tsoa-next/functions/Produces.md) Decorador é usado para definir tipos de mídia personalizados para as respostas dos métodos de controlador na OpenAPI Gerador. Ele permite que você especifique um tipo de mídia específico para cada método, sem sobrescrever a resposta padrão do Tipo de Conteúdo.

Aqui está um exemplo de como usar o `@Produces` Decorador:

```typescript
@Route('MediaTypeTest')
@Produces('application/vnd.mycompany.myapp+json')
export class MediaTypeTestController extends Controller {
  @Get('users/{userId}')
  public async getDefaultProduces(@Path() userId: number): Promise<{ id: number; name: string }> {
    this.setHeader('Content-Type', 'application/vnd.mycompany.myapp+json')
    return Promise.resolve({
      id: userId,
      name: 'foo',
    })
  }
  @Get('custom/security.txt')
  @Produces('text/plain')
  public async getCustomProduces(): Promise<string> {
    const securityTxt = 'Contact: mailto: security@example.com\nExpires: 2012-12-12T12:37:00.000Z'
    this.setHeader('Content-Type', 'text/plain')
    return securityTxt
  }
}
```

::: danger
Por favor note que usando [`@Produces`](./reference/tsoa-next/functions/Produces.md) apenas afeta o gerado OpenAPI Especificação. Você também deve garantir que você envia o cabeçalho correto usando `this.setHeader('Content-Type', 'MEDIA_TYPE')` nos seus métodos de controlo.
:::

## Consume

Utilização [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) quando uma ação aceita um tipo de mídia corporal não padrão.

```ts
import { Body, Consumes, Controller, Post, Response, Route, SuccessResponse } from 'tsoa-next'

@Route('MediaTypeTest')
export class MediaTypeTestController extends Controller {
  @Post('custom')
  @Consumes('application/vnd.mycompany.myapp.v2+json')
  @SuccessResponse('202', 'Accepted', 'application/vnd.mycompany.myapp.v2+json')
  @Response<{ message: string }>('400', 'Bad Request', undefined, 'application/problem+json')
  public async postCustomConsumes(@Body() body: { name: string }): Promise<{ id: number; name: string }> {
    this.setStatus(202)
    return {
      id: body.name.length,
      name: body.name,
    }
  }
}
```
