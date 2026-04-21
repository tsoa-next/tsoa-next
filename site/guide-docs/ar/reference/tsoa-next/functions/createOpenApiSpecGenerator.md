---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createOpenApiSpecGenerator

# المهمة: إنشاء أوبن آبي سبيكجينر

```ts
function createOpenApiSpecGenerator(config?): SpecGenerator;
```

محددة في: [packages/tsoa/src/spec.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L63)

يخلق مولداً كهربائياً يعمل على تشغيل المواصفات التي تُبني بشدّة OpenAPI وثيقة واحدة لكل مولد كهربائي `@tsoa-next/cli`..
ثمّ يُخرّبُ الجسم المُطوّرَ والسلاسل المُتسلسلة للقراءةِ اللاحقةِ.

## البارامترات

### config?

[`RuntimeSpecConfigSnapshot`](../interfaces/RuntimeSpecConfigSnapshot.md)

## العودة

[`SpecGenerator`](../interfaces/SpecGenerator.md)
