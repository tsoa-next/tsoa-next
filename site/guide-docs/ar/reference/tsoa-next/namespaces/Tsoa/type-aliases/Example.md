---
lastUpdated: 2026-04-20T21:59:41.361Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / Example

# نوع الياس: مثال

```ts
type Example = 
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | Example[]
  | {
[exampleName: string]: Example;
};
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L38)
