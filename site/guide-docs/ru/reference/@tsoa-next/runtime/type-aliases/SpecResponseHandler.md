---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecResponseHandler

# Тип Alias: SpecResponseHandler

```ts
type SpecResponseHandler = (context) => 
  | SpecResponseValue
| Promise<SpecResponseValue>;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:49](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L49)

Пользовательский обработчик, используемый [SpecPath](../functions/SpecPath.md) Обслуживание специального контента.

## Параметры

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Возвращение

  \| [`SpecResponseValue`](SpecResponseValue.md)
  \| `Promise`\<[`SpecResponseValue`](SpecResponseValue.md)\>
