---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# المهمة: إنشاء جهاز للتجسس

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

محددة في: [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

يخلق مولداً للمواصفات من قبل البناء OpenAPI مصنوعة يدوية مدمجة في رمز الطريق المولد
هذا يبقي مبنياً `SpecPath` أهداف مستقلة عن ملفات المصادر TypeScript التحليل عند الطلب

## البارامترات

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## العودة

[`SpecGenerator`](../interfaces/SpecGenerator.md)
