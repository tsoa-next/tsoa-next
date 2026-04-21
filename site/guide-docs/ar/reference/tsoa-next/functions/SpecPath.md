---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecPath

# المهمة:

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

محددة في: [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

يسجل مساراً محلياً للتحكم يخدم المولد OpenAPI وثيقة أو تقليد مستمد من الرد.

## البارامترات

### path?

`string`

الطريق النسبي العجز عن الدفع `spec`.

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

إما `SpecPathOptions` هدف أو حجة الهدف المتروكة

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md)

حجّة إستراتيجيّة (ليجايسي) إخفاقات في التقطيع

## العودة

`ClassDecorator`
