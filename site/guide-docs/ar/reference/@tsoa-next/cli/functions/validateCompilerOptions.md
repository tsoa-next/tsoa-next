---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# المهمة: المصادقة على المرافعات

حلول خيارات التجميع tsoa جيل من جسم كامل أو خام `compilerOptions` خريطة

## التوقيع

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

محددة في: [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### البارامترات

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### العودة

`CompilerOptions`

## التوقيع

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

محددة في: [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### البارامترات

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### العودة

`CompilerOptions`
