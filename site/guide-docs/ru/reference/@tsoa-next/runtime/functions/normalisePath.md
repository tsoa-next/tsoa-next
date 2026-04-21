---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / normalisePath

# Функция: нормализоватьPath()

```ts
function normalisePath(
   path, 
   withPrefix?, 
   withSuffix?, 
   skipPrefixAndSuffixIfEmpty?): string;
```

Определено в: [packages/runtime/src/utils/pathUtils.ts:43](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/utils/pathUtils.ts#L43)

Нормализует использование слэша в маршрутном пути и необязательно применяет префикс и суффикс.

## Параметры

### path

`string`

### withPrefix?

`string`

### withSuffix?

`string`

### skipPrefixAndSuffixIfEmpty?

`boolean` = `true`

## Возвращение

`string`
