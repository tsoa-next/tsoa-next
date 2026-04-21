---
lastUpdated: 2026-04-20T21:59:41.352Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Spec3x

# Interface: Spec3x

Definido em: [packages/runtime/src/swagger/swagger.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L37)

Interface base para todos OpenAPI 3.x especificações
Contém campos compartilhados em todas as versões 3.x

## Extensões

- [`Spec`](Spec.md)

## Estendido por

- [`Spec30`](Spec30.md)
- [`Spec31`](Spec31.md)

## Propriedades

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Herdadas de

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### info

```ts
info: Info;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Herdadas de

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### servers

```ts
servers: Server[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

***

### tags?

```ts
optional tags?: Tag[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Herdadas de

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
