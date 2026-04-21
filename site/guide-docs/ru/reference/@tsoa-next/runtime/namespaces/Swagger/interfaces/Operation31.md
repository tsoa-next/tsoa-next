---
lastUpdated: 2026-04-20T21:59:41.316Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Operation31

# Интерфейс: Операция 31

Определено в: [packages/runtime/src/swagger/swagger.ts:270](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L270)

## расширять

- `Omit`\<[`Operation3`](Operation3.md), `"responses"` \| `"requestBody"` \| `"parameters"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## Свойства

### consumes?

```ts
optional consumes?: string[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L259)

#### Унаследованный от

[`Operation3`](Operation3.md).[`consumes`](Operation3.md#consumes)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:263](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L263)

#### Унаследованный от

[`Operation3`](Operation3.md).[`deprecated`](Operation3.md#deprecated)

***

### description?

```ts
optional description?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:256](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L256)

#### Унаследованный от

[`Operation3`](Operation3.md).[`description`](Operation3.md#description)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:257](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L257)

#### Унаследованный от

[`Operation3`](Operation3.md).[`externalDocs`](Operation3.md#externaldocs)

***

### operationId

```ts
operationId: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:258](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L258)

#### Унаследованный от

[`Operation3`](Operation3.md).[`operationId`](Operation3.md#operationid)

***

### parameters?

```ts
optional parameters?: Parameter31[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:271](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L271)

***

### requestBody?

```ts
optional requestBody?: RequestBody31;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:272](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L272)

***

### responses

```ts
responses: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:273](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L273)

#### Индексная подпись

```ts
[name: string]: Response31
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:262](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L262)

#### Унаследованный от

[`Operation3`](Operation3.md).[`schemes`](Operation3.md#schemes)

***

### security?

```ts
optional security?: Security[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L264)

#### Унаследованный от

[`Operation3`](Operation3.md).[`security`](Operation3.md#security)

***

### summary?

```ts
optional summary?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:255](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L255)

#### Унаследованный от

[`Operation3`](Operation3.md).[`summary`](Operation3.md#summary)

***

### tags?

```ts
optional tags?: string[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L254)

#### Унаследованный от

[`Operation3`](Operation3.md).[`tags`](Operation3.md#tags)
