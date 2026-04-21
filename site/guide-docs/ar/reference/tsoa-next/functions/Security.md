---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Security

# المهمة: الأمن

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

محددة في: [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

تعلن الشرط الأمني لمراقب أو إجراء.

## البارامترات

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

اسم المخطط الأمني، أو موضوع شرط أمني كامل.

### scopes?

`string`[]

النطاقات العامة التي يتطلبها النظام عندما `name` هو خيط.

## العودة

`ClassDecorator` & `MethodDecorator`
