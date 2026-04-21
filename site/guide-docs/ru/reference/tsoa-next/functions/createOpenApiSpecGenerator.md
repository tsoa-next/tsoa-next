---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createOpenApiSpecGenerator

# Функция: createOpenApiSpecGenerator()

```ts
function createOpenApiSpecGenerator(config?): SpecGenerator;
```

Определено в: [packages/tsoa/src/spec.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L63)

Создает генератор спецификаций времени выполнения, который лениво строит OpenAPI документ один раз в экземпляре генератора с использованием `@tsoa-next/cli`,
Затем кэширует сгенерированный объект спецификации и сериализованные строки для последующих считываний.

## Параметры

### config?

[`RuntimeSpecConfigSnapshot`](../interfaces/RuntimeSpecConfigSnapshot.md)

## Возвращение

[`SpecGenerator`](../interfaces/SpecGenerator.md)
