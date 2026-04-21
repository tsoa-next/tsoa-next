---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecCacheHandler

# इंटरफ़ेस: SpecCacheHandler

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L54)

द्वारा इस्तेमाल कैश एडाप्टर [SpecPath](../functions/SpecPath.md) उत्पन्न प्रतिक्रियाओं को मापने के लिए।

## विधि

### get()

```ts
get(context): 
  | SpecResponseValue
  | Promise<SpecResponseValue | undefined>
  | undefined;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L55)

#### पैरामीटर

##### context

[`SpecCacheContext`](SpecCacheContext.md)

#### रिटर्न

  \| [`SpecResponseValue`](../type-aliases/SpecResponseValue.md)
  \| `Promise`\<SpecResponseValue \| undefined\>
  \| `undefined`

***

### set()

```ts
set(context, value): void | Promise<void>;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L56)

#### पैरामीटर

##### context

[`SpecCacheContext`](SpecCacheContext.md)

##### value

`string`

#### रिटर्न

`void` \| `Promise`\<`void`\>
