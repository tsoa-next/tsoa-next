---
lastUpdated: 2026-04-20T21:59:41.318Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Spec3x

# Interface : Spec3x

Définie dans : [packages/runtime/src/swagger/swagger.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L37)

Interface de base pour tous OpenAPI 3.x spécifications
Contient des champs partagés dans toutes les versions 3.x

## Prolongation

- [`Spec`](Spec.md)

## Prorogé par

- [`Spec30`](Spec30.md)
- [`Spec31`](Spec31.md)

## Propriétés

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Hérité de

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### info

```ts
info: Info;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Hérité de

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### servers

```ts
servers: Server[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

***

### tags?

```ts
optional tags?: Tag[];
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Hérité de

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
