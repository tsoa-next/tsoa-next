---
lastUpdated: 2026-04-20T21:59:41.352Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Spec30

# Interface: Spec30

Définie dans : [packages/runtime/src/swagger/swagger.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L44)

OpenAPI 3.0.x spécification

## Prolongation

- [`Spec3x`](Spec3x.md)

## Propriétés

### components

```ts
components: Components;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:46](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L46)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Hérité de

[`Spec3x`](Spec3x.md).[`externalDocs`](Spec3x.md#externaldocs)

***

### info

```ts
info: Info;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Hérité de

[`Spec3x`](Spec3x.md).[`info`](Spec3x.md#info)

***

### openapi

```ts
openapi: "3.0.0";
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L45)

***

### paths

```ts
paths: object;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L47)

#### Index Signature

```ts
[name: string]: Path3
```

***

### servers

```ts
servers: Server[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

#### Hérité de

[`Spec3x`](Spec3x.md).[`servers`](Spec3x.md#servers)

***

### tags?

```ts
optional tags?: Tag[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Hérité de

[`Spec3x`](Spec3x.md).[`tags`](Spec3x.md#tags)
