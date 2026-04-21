---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Consumes

# समारोह: उपभोग ()

```ts
function Consumes(value): MethodDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/parameter.ts:109](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L109)

मीडिया प्रकार को ओवरराइड करता है जो एक एकल कार्रवाई के लिए एक अनुरोध निकाय को दस्तावेज करने के लिए उपयोग किया जाता है।

## पैरामीटर

### value

`string`

उदाहरण के लिए अनुरोध शरीर मीडिया प्रकार, `application/json`।
देखें [Swagger request-body documentation](https://swagger.io/docs/specification/describing-request-body/)।

## रिटर्न

`MethodDecorator`
