---
lastUpdated: 2026-04-20T21:59:41.352Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Spec3x

# Interfaz: Spec3x

Definido en: [packages/runtime/src/swagger/swagger.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L37)

Interfaz de base para todos OpenAPI 3.x especificaciones
Contiene campos compartidos en todas las versiones 3.x

## Extensión

- [`Spec`](Spec.md)

## Extendido por

- [`Spec30`](Spec30.md)
- [`Spec31`](Spec31.md)

## Propiedades

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Inhered from

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### info

```ts
info: Info;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Inhered from

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### servers

```ts
servers: Server[];
```

Definido en: [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

***

### tags?

```ts
optional tags?: Tag[];
```

Definido en: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Inhered from

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
