---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Controller

# Classe: Controlador

Definido em: [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

Classe do controlador base que permite que as ações sobreponham o eventual código de estado e cabeçalhos.

## Construtores

### Construtor

```ts
new Controller(): Controller;
```

#### Retorna

`Controller`

## Métodos

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

Definido em: [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

Devolve um valor de cabeçalho de resposta previamente atribuído.

#### Parâmetros

##### name

`string`

#### Retorna

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

Definido em: [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

Devolve todos os cabeçalhos de resposta atribuídos na instância do controlador.

#### Retorna

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

Definido em: [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

Devolve o código de estado HTTP definido [setStatus](#setstatus), se houver.

#### Retorna

`number` \| `undefined`

***

### setHeader()

Armazena um valor de cabeçalho de resposta que o manipulador de rota gerado deve emitir.

#### Assinatura da chamada

```ts
setHeader<H>(name, value?): void;
```

Definido em: [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### Parâmetros do tipo

###### H

`H` *extensões* chave de `OutgoingHttpHeaders`

##### Parâmetros

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### Retorna

`void`

#### Assinatura da chamada

```ts
setHeader(name, value?): void;
```

Definido em: [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### Parâmetros

###### name

`string`

###### value?

`string` \| `string`[]

##### Retorna

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

Definido em: [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

Define o código de estado HTTP que o manipulador de rota gerado deve retornar.

#### Parâmetros

##### statusCode

`number`

#### Retorna

`void`
