---
lastUpdated: 2026-04-20T21:59:41.352Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Spec31

# Antarmuka: Spec31

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:53](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L53)

OpenAPI Spesifikasi 3.1.x

## Extending

- [`Spec3x`](Spec3x.md)

## Properti

### components

```ts
components: Components31;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L55)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Diwarisi dari

[`Spec3x`](Spec3x.md).[`externalDocs`](Spec3x.md#externaldocs)

***

### info

```ts
info: Info;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Diwarisi dari

[`Spec3x`](Spec3x.md).[`info`](Spec3x.md#info)

***

### openapi

```ts
openapi: "3.1.0";
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L54)

***

### paths

```ts
paths: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L56)

#### Tanda tangan indeks

```ts
[name: string]: Path31
```

***

### servers

```ts
servers: Server[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

#### Diwarisi dari

[`Spec3x`](Spec3x.md).[`servers`](Spec3x.md#servers)

***

### tags?

```ts
optional tags?: Tag[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Diwarisi dari

[`Spec3x`](Spec3x.md).[`tags`](Spec3x.md#tags)
