---
lastUpdated: 2026-04-20T21:59:41.318Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Spec31

# Interfaz: Spec31

Definido en: [packages/runtime/src/swagger/swagger.ts:53](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L53)

OpenAPI 3.1.x especificación

## Extensión

- [`Spec3x`](Spec3x.md)

## Propiedades

### components

```ts
components: Components31;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L55)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Inhered from

[`Spec3x`](Spec3x.md).[`externalDocs`](Spec3x.md#externaldocs)

***

### info

```ts
info: Info;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Inhered from

[`Spec3x`](Spec3x.md).[`info`](Spec3x.md#info)

***

### openapi

```ts
openapi: "3.1.0";
```

Definido en: [packages/runtime/src/swagger/swagger.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L54)

***

### paths

```ts
paths: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L56)

#### Index Signature

```ts
[name: string]: Path31
```

***

### servers

```ts
servers: Server[];
```

Definido en: [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

#### Inhered from

[`Spec3x`](Spec3x.md).[`servers`](Spec3x.md#servers)

***

### tags?

```ts
optional tags?: Tag[];
```

Definido en: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Inhered from

[`Spec3x`](Spec3x.md).[`tags`](Spec3x.md#tags)
