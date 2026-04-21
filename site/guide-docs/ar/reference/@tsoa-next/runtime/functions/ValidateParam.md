---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidateParam

# المهمة: ValidateParam

## التوقيع

```ts
function ValidateParam<TValue>(options): TValue;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L90)

تُقيّم قيمة غير متوقّعة مقارنةً بـ tsoa ميثاداتا

### البارامترات النوعية

#### TValue

`TValue`

### البارامترات

#### options

`ValidateParamOptions`\<`TValue`\>

### العودة

`TValue`

## التوقيع

```ts
function ValidateParam<TValue>(...args): TValue;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:94](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L94)

### البارامترات النوعية

#### TValue

`TValue`

### البارامترات

#### args

...`ValidateParamTupleArgs`\<`TValue`\>

### العودة

`TValue`

### Deprecated

استعملي تحميل الجسم بدلاً من ذلك
