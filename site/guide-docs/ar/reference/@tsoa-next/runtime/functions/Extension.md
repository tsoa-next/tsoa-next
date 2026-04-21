---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Extension

# المهمة: تمديدها

```ts
function Extension(name, value): PropertyDecorator;
```

محددة في: [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

يضاف OpenAPI تمديد محدد لممتلكات نموذجية.

## البارامترات

### name

`string`

مفتاح التمديد، الذي يبدأ عادة `x-`.

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

قيمة التمديد

## العودة

`PropertyDecorator`
