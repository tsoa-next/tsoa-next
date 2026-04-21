---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# Функция: генерировать маршруты()

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Определено в: [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

Генерирует файлы маршрута на диске и возвращает метаданные, используемые для их создания.

## Параметры типа

### Config

`Config` *расширяется* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Параметры

### routesConfig

`Config`

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
