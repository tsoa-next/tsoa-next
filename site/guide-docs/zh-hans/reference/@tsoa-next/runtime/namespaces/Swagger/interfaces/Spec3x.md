---
lastUpdated: 2026-04-20T21:59:41.318Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Spec3x

# 接口: spec3x

定义如下: [packages/runtime/src/swagger/swagger.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L37)

全部基本接口 OpenAPI 3.x 规格
包含所有 3. x 版本共享的字段

## 扩展

- [`Spec`](Spec.md)

## 由

- [`Spec30`](Spec30.md)
- [`Spec31`](Spec31.md)

## 属性

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### 继承自

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### info

```ts
info: Info;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### 继承自

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### servers

```ts
servers: Server[];
```

定义如下: [packages/runtime/src/swagger/swagger.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L38)

***

### tags?

```ts
optional tags?: Tag[];
```

定义如下: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### 继承自

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
