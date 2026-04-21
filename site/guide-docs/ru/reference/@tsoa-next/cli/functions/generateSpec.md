---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# Функция: generateSpec()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Определено в: [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

генерирует OpenAPI документ на диске и возвращает метаданные, используемые для его создания.

## Параметры

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

прохождение в кэшированных метаданных, возвращенных на предыдущем этапе, чтобы ускорить процесс

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## Возвращение

`Promise`\<`Metadata`\>
