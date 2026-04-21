---
lastUpdated: 2026-04-20T21:59:41.338Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Consumes

# Функция: Потребители()

```ts
function Consumes(value): MethodDecorator;
```

Определено в: [packages/runtime/src/decorators/parameter.ts:109](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L109)

Переопределяет тип СМИ, используемый для документирования органа запроса для одного действия.

## Параметры

### value

`string`

Тип среды запроса, например `application/json`.
Видишь? [Swagger request-body documentation](https://swagger.io/docs/specification/describing-request-body/).

## Возвращение

`MethodDecorator`
