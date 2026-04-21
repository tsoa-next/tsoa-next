---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Produces

# Функция: Продукты()

```ts
function Produces(value): MethodDecorator & ClassDecorator;
```

Определено в: [packages/runtime/src/decorators/response.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L48)

Переопределяет тип среды отклика на контроллере или одном действии.

## Параметры

### value

`string`

Тип реакционной среды, например `application/json`.
Видишь? [Swagger media-type documentation](https://swagger.io/docs/specification/media-types/).

## Возвращение

`MethodDecorator` & `ClassDecorator`
