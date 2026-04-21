---
title: Tratamento de Erros
lang: pt-BR
lastUpdated: 2026-04-20T00:28:55.924Z
---

# Tratamento de Erros

::: warning NOTA DE COMPATIBILIDADE
Objectivos deste guia [express](https://expressjs.com) e assume `tsoa-next`A actual política de apoio: Node.js 22 ou mais novo.
Verificamos o suporte através do LTS anterior, LTS atual, e Node vPróximo em IC.
Exemplos nos guias de configuração vinculados incluem `npm`, `pnpm`, e `yarn` variantes onde o comando difere.
Este guia assume que você seguiu o [getting started guide](./getting-started) ou ter uma configuração semelhante.
:::

Referência da API relevante: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md), e [`Controller`](./reference/tsoa-next/classes/Controller.md).

Como você deve ter notado depois de seguir todos os passos da [getting started guide](./getting-started), nosso servidor não permite parâmetros inválidos, mas a resposta ainda não é muito ideal.

![Current Error Response](/docs-images/errors-server.png)

Para o Cliente, é algo assim:

![Client Error Response](/docs-images/errors-client.png)

## Configuração do tratamento de erros

### Manipulação de Erros de Validação

Vamos primeiro certificar-nos de que, sempre que o Cliente desencadeia um Erro de Validação, em vez de imprimir o traço da pilha, em vez disso, mostramos uma resposta json formatada corretamente.

No fim da nossa `app.ts`, após a chamada para `RegisterRoutes(app)`, vamos adicionar um manipulador de erro expresso global:

```ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa-next'
// ...

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
```

Agora, o mesmo pedido vai responder assim:

![Client Error with handler](/docs-images/errors-json-client.png)

Além disso, nosso console mostrará:

![Server Error with handler](/docs-images/errors-json-server.png)

### Tratamento de rotas em falta

A fim de lidar com urls faltando mais graciosamente, podemos adicionar um manipulador de rota "catch-all":

```ts
// app.ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'

// ...

RegisterRoutes(app)

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(
// ...
```

## Especificando tipos de resposta de erro para OpenAPI

Se você verificar o endpoint Documentação, você notará que ainda não temos nenhuma documentação para nossos Erros.
Desde TypeScript não verifica os erros de lançamento, tsoa Não podemos inferir o tipo de resposta que estamos a enviar nestes casos.

::: warning
Utilizar o `@Response` decorador exportado por `tsoa-next`, não Express's `Response` Tipo.
Nomeadamente tsoa-next importação é bom, mas ainda precisa de resolver para o tsoa-next Decorador.
:::

No entanto, temos uma maneira para você especificar manualmente estes retornos:

```ts
import { Body, Controller, Post, Route, Response, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

interface ValidateErrorJSON {
  message: string
  details: { [name: string]: unknown }
}

@Route('users')
export class UsersController extends Controller {
  // more code here

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

Isto deve fazer com que os nossos médicos mostrem algo assim:

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI permite a correspondência de códigos de estado tais como '2xx' ou correspondência de todos os códigos usando 'default'. tsoa apoiará o seguinte:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## Respostas alternativas verificadas por tipo

Em versões recentes de tsoa, temos a opção de injetar uma função de resposta a um diagnóstico de framework em nossa função que podemos chamar para formular uma resposta que não cumpra com o tipo de retorno do nosso método de controle/código de status e cabeçalhos (que é usado para a resposta de sucesso).
Isto é especialmente útil para responder com uma resposta de erro sem o risco de erros de tipo associados a erros de lançamento.
Para injetar um/mais respondedores, podemos usar o `@Res()` Decorador:

```ts
import { Route, Controller, Get, Query, Res, TsoaResponse } from 'tsoa-next'

@Route('/greeting')
export class GreetingsController extends Controller {
  /**
   * @param notFoundResponse The responder function for a not found response
   */
  @Get('/')
  public async greet(@Query() name?: string, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): Promise<string> {
    if (!name) {
      return notFoundResponse(404, { reason: 'We don\'t know you yet. Please provide a name' })
    }

    return `Hello, ${name}`
  }
}
```
