---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / describeSpecPath

# Функция: описывать SpecPath()

```ts
function describeSpecPath(specPath): object;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:192](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L192)

Производит считываемое человеком резюме определения спектра для регистрации и диагностики.

## Параметры

### specPath

[`SpecPathDefinition`](../interfaces/SpecPathDefinition.md)

## Возвращение

`object`

### cache

```ts
cache: string;
```

### path

```ts
path: string = specPath.path;
```

### target

```ts
target: string;
```
