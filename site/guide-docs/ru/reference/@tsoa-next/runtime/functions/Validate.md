---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Validate

# Функция: Validate()

```ts
function Validate(...args): ParameterDecorator;
```

Определено в: [packages/runtime/src/decorators/validate.ts:141](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/validate.ts#L141)

Прикрепляет метаданные проверки внешней схемы к параметру контроллера.

Поддерживаемые формы являются `@Validate(schema)`, `@Validate(kind, schema)`и `@Validate({ kind, schema })`.

## Параметры

### args

...`unknown`[]

## Возвращение

`ParameterDecorator`
