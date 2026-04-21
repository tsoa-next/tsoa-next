---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createOpenApiSpecGenerator

# समारोह: OpenApiSpecGenerator()

```ts
function createOpenApiSpecGenerator(config?): SpecGenerator;
```

में परिभाषित: [packages/tsoa/src/spec.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L63)

एक रनटाइम स्पेक जनरेटर बनाता है जो lazily बनाता है OpenAPI एक बार जनरेटर उदाहरण का उपयोग करके `@tsoa-next/cli`,
फिर उत्पन्न स्पेक ऑब्जेक्ट को कैश और बाद में पढ़ने के लिए अनुक्रमित स्ट्रिंग्स को कैश करता है।

## पैरामीटर

### config?

[`RuntimeSpecConfigSnapshot`](../interfaces/RuntimeSpecConfigSnapshot.md)

## रिटर्न

[`SpecGenerator`](../interfaces/SpecGenerator.md)
