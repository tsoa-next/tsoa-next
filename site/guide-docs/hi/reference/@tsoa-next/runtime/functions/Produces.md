---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Produces

# समारोह: निर्माण ()

```ts
function Produces(value): MethodDecorator & ClassDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/response.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L48)

एक नियंत्रक या एक कार्रवाई पर प्रतिक्रिया मीडिया प्रकार को ओवरराइड करता है।

## पैरामीटर

### value

`string`

उदाहरण के लिए प्रतिक्रिया मीडिया प्रकार, `application/json`।
देखें [Swagger media-type documentation](https://swagger.io/docs/specification/media-types/)।

## रिटर्न

`MethodDecorator` & `ClassDecorator`
