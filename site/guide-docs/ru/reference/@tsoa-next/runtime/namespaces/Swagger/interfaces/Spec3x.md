---
lastUpdated: 2026-04-20T21:59:41.318Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Spec3x

# Интерфейс: Spec3x

Определено в: [packages/runtime/src/swagger/swagger.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L37)

Базовый интерфейс для всех OpenAPI 3.x спецификации
Содержит поля, общие для всех версий 3.x

## расширять

- [`Spec`](Spec.md)

## расширенный

- [`Spec30`](Spec30.md)
- [`Spec31`](Spec31.md)

## Свойства

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Унаследованный от

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### info

```ts
info: Info;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Унаследованный от

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### servers

```ts
servers: Server[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

***

### tags?

```ts
optional tags?: Tag[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Унаследованный от

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
