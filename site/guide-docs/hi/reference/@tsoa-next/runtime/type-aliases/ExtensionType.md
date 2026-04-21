---
lastUpdated: 2026-04-20T21:59:41.327Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ExtensionType

# प्रकार उपनाम: एक्सटेंशन प्रकार

```ts
type ExtensionType = 
  | string
  | number
  | boolean
  | null
  | ExtensionType[]
  | {
[name: string]: ExtensionType | ExtensionType[];
};
```

में परिभाषित: [packages/runtime/src/decorators/extension.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L14)

द्वारा समर्थित मूल्य प्रकार OpenAPI विनिर्देश एक्सटेंशन।
