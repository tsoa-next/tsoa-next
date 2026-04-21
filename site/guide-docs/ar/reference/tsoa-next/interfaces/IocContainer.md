---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / IocContainer

# Interface: IocContainer

محددة في: [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

استخدام عقد حاويات دنيا تعمل على مدار الزمن لتسوية حالات المتحكمين.

## الطرائق

### get()

#### التوقيع

```ts
get<T>(controller): T;
```

محددة في: [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### البارامترات النوعية

###### T

`T`

##### البارامترات

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### العودة

`T`

#### التوقيع

```ts
get<T>(controller): Promise<T>;
```

محددة في: [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### البارامترات النوعية

###### T

`T`

##### البارامترات

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### العودة

`Promise`\<`T`\>
