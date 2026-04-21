---
lastUpdated: 2026-04-20T21:59:41.327Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RuntimeSchemaAdapterResult

# Тип Alias: RuntimeSchemaAdapter\<T\>

```ts
type RuntimeSchemaAdapterResult<T> = 
  | {
  ok: true;
  value: T;
}
  | {
  failure: ValidationFailure;
  ok: false;
};
```

Определено в: [packages/runtime/src/routeGeneration/externalValidation.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L4)

Результат возвращается адаптером времени выполнения для внешней библиотеки проверки.

## Параметры типа

### T

`T` = `unknown`
