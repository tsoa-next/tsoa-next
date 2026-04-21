---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Security

# समारोह: सुरक्षा ()

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

एक नियंत्रक या कार्रवाई के लिए सुरक्षा आवश्यकता की घोषणा करता है।

## पैरामीटर

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

सुरक्षा योजना का नाम, या पूर्ण सुरक्षा आवश्यकता वस्तु।

### scopes?

`string`[]

जब योजना द्वारा आवश्यक OAuth दायरे `name` एक स्ट्रिंग है।

## रिटर्न

`ClassDecorator` & `MethodDecorator`
