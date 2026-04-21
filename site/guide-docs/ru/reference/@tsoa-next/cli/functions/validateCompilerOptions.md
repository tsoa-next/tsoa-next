---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# Функция: validateCompilerOptions()

Решает параметры компилятора для tsoa генерация из полного конфигурационного объекта или сырого `compilerOptions` Карта.

## Вызов подписи

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

Определено в: [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### Параметры

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### Возвращение

`CompilerOptions`

## Вызов подписи

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

Определено в: [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### Параметры

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### Возвращение

`CompilerOptions`
