---
lastUpdated: 2026-04-20T21:59:41.349Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Operation

# Interface: Operação

Definido em: [packages/runtime/src/swagger/swagger.ts:236](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L236)

## Indexable

```ts
[key: string]: unknown
```

## Propriedades

### consumes?

```ts
optional consumes?: string[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:242](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L242)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:247](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L247)

***

### description?

```ts
optional description?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L239)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:240](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L240)

***

### operationId

```ts
operationId: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:241](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L241)

***

### parameters?

```ts
optional parameters?: Parameter2[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L244)

***

### produces?

```ts
optional produces?: string[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:243](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L243)

***

### responses

```ts
responses: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:245](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L245)

#### Assinatura do índice

```ts
[name: string]: Response
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:246](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L246)

***

### security?

```ts
optional security?: Security[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:248](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L248)

***

### summary?

```ts
optional summary?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:238](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L238)

***

### tags?

```ts
optional tags?: string[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:237](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L237)
