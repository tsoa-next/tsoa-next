---
lastUpdated: 2026-04-20T21:59:41.316Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Operation

# Interface: fonctionnement

Définie dans : [packages/runtime/src/swagger/swagger.ts:236](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L236)

## Indexable

```ts
[key: string]: unknown
```

## Propriétés

### consumes?

```ts
optional consumes?: string[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:242](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L242)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:247](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L247)

***

### description?

```ts
optional description?: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L239)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:240](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L240)

***

### operationId

```ts
operationId: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:241](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L241)

***

### parameters?

```ts
optional parameters?: Parameter2[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L244)

***

### produces?

```ts
optional produces?: string[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:243](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L243)

***

### responses

```ts
responses: object;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:245](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L245)

#### Index Signature

```ts
[name: string]: Response
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:246](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L246)

***

### security?

```ts
optional security?: Security[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:248](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L248)

***

### summary?

```ts
optional summary?: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:238](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L238)

***

### tags?

```ts
optional tags?: string[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:237](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L237)
