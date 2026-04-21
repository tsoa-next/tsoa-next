---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# समारोह: EmbeddedSpecGenerator()

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

में परिभाषित: [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

एक पूर्वनिर्मित से एक रनटाइम स्पेक जनरेटर बनाता है OpenAPI कलाकृति उत्पन्न रूट कोड में एम्बेडेड।
यह अंतर्निहित रहता है `SpecPath` स्रोत फ़ाइलों से स्वतंत्र लक्ष्य और TypeScript अनुरोध समय पर विश्लेषण।

## पैरामीटर

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## रिटर्न

[`SpecGenerator`](../interfaces/SpecGenerator.md)
