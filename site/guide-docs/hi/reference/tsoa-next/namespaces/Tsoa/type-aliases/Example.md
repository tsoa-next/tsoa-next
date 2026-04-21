---
lastUpdated: 2026-04-20T21:59:41.361Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / Example

# उपनाम: उदाहरण

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

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L38)
