---
lastUpdated: 2026-04-20T21:59:41.318Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Spec31

# Интерфейс: Spec31

Определено в: [packages/runtime/src/swagger/swagger.ts:53](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L53)

OpenAPI 3.1.x спецификация

## расширять

- [`Spec3x`](Spec3x.md)

## Свойства

### components

```ts
components: Components31;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L55)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Унаследованный от

[`Spec3x`](Spec3x.md).[`externalDocs`](Spec3x.md#externaldocs)

***

### info

```ts
info: Info;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Унаследованный от

[`Spec3x`](Spec3x.md).[`info`](Spec3x.md#info)

***

### openapi

```ts
openapi: "3.1.0";
```

Определено в: [packages/runtime/src/swagger/swagger.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L54)

***

### paths

```ts
paths: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L56)

#### Индексная подпись

```ts
[name: string]: Path31
```

***

### servers

```ts
servers: Server[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

#### Унаследованный от

[`Spec3x`](Spec3x.md).[`servers`](Spec3x.md#servers)

***

### tags?

```ts
optional tags?: Tag[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Унаследованный от

[`Spec3x`](Spec3x.md).[`tags`](Spec3x.md#tags)
