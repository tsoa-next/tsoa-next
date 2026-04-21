---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# Функция: CreateEmbeddedSpecGenerator()

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

Определено в: [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

Создает генератор спецификаций времени выполнения из предварительно построенного OpenAPI Артефакт, встроенный в сгенерированный код маршрута.
Это сохраняет встроенный `SpecPath` цели, независимые от исходных файлов и TypeScript Анализ по запросу времени.

## Параметры

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## Возвращение

[`SpecGenerator`](../interfaces/SpecGenerator.md)
