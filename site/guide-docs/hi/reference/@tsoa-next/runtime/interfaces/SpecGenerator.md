---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecGenerator

# इंटरफ़ेस: SpecGenerator

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L24)

रनटाइम अनुबंध का वर्णन करने के लिए एक पुनर्निर्माण की जरूरत है OpenAPI मांग पर दस्तावेज।

## विधि

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L25)

#### रिटर्न

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L26)

#### पैरामीटर

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### रिटर्न

`Promise`\<`string`\>
