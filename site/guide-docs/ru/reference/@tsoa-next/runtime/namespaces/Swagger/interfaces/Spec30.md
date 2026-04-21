---
lastUpdated: 2026-04-20T21:59:41.317Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Spec30

# Интерфейс: Spec30

Определено в: [packages/runtime/src/swagger/swagger.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L44)

OpenAPI Спецификация 3.0.x

## расширять

- [`Spec3x`](Spec3x.md)

## Свойства

### components

```ts
components: Components;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:46](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L46)

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
openapi: "3.0.0";
```

Определено в: [packages/runtime/src/swagger/swagger.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L45)

***

### paths

```ts
paths: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L47)

#### Индексная подпись

```ts
[name: string]: Path3
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
