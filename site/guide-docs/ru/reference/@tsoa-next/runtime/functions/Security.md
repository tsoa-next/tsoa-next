---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Security

# Функция: Безопасность()

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

Определено в: [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

Объявляет требования безопасности для контроллера или действия.

## Параметры

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

Название схемы безопасности или объект полного требования безопасности.

### scopes?

`string`[]

Сферы охвата, требуемые схемой, когда `name` Это веревка.

## Возвращение

`ClassDecorator` & `MethodDecorator`
