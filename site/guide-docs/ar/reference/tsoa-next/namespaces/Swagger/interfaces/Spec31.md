---
lastUpdated: 2026-04-20T21:59:41.352Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Spec31

# Interface: Spec31

محددة في: [packages/runtime/src/swagger/swagger.ts:53](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L53)

OpenAPI 3-1-x التحديد

## التذييلات

- [`Spec3x`](Spec3x.md)

## الممتلكات

### components

```ts
components: Components31;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L55)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Inherited from

[`Spec3x`](Spec3x.md).[`externalDocs`](Spec3x.md#externaldocs)

***

### info

```ts
info: Info;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Inherited from

[`Spec3x`](Spec3x.md).[`info`](Spec3x.md#info)

***

### openapi

```ts
openapi: "3.1.0";
```

محددة في: [packages/runtime/src/swagger/swagger.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L54)

***

### paths

```ts
paths: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L56)

#### مؤشر التوقيع

```ts
[name: string]: Path31
```

***

### servers

```ts
servers: Server[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

#### Inherited from

[`Spec3x`](Spec3x.md).[`servers`](Spec3x.md#servers)

***

### tags?

```ts
optional tags?: Tag[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Inherited from

[`Spec3x`](Spec3x.md).[`tags`](Spec3x.md#tags)
