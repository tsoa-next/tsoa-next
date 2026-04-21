---
lastUpdated: 2026-04-20T21:59:41.316Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / RequestBody31

# Interface: RequestBody31

Definido em: [packages/runtime/src/swagger/swagger.ts:282](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L282)

## Indexable

```ts
[ext: `x-${string}`]: unknown
```

## Propriedades

### $ref?

```ts
optional $ref?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:286](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L286)

***

### content

```ts
content: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:283](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L283)

#### Assinatura do índice

```ts
[requestMediaType: string]: MediaType31
```

***

### description?

```ts
optional description?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:284](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L284)

***

### examples?

```ts
optional examples?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L288)

#### Assinatura do índice

```ts
[media: string]: string | Example3
```

***

### required?

```ts
optional required?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:285](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L285)

***

### summary?

```ts
optional summary?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:287](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L287)
