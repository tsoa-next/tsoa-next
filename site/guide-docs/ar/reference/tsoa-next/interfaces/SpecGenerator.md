---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecGenerator

# Interface: SpecGenerator

محددة في: [packages/runtime/src/decorators/specPath.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L24)

يصف العقد الزمني اللازم لإعادة بناء OpenAPI وثيقة بشأن الطلب.

## الطرائق

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

محددة في: [packages/runtime/src/decorators/specPath.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L25)

#### العودة

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

محددة في: [packages/runtime/src/decorators/specPath.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L26)

#### البارامترات

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### العودة

`Promise`\<`string`\>
