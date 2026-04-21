---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Extension

# समारोह: एक्सटेंशन ()

```ts
function Extension(name, value): PropertyDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

जोड़ना OpenAPI एक मॉडल संपत्ति के लिए विनिर्देश विस्तार।

## पैरामीटर

### name

`string`

एक्सटेंशन कुंजी, आम तौर पर साथ शुरू `x-`।

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

विस्तार मूल्य।

## रिटर्न

`PropertyDecorator`
