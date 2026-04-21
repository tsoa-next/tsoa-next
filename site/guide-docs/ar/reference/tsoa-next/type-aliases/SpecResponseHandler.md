---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecResponseHandler

# نوع &quot; ألياس &quot; :

```ts
type SpecResponseHandler = (context) => 
  | SpecResponseValue
| Promise<SpecResponseValue>;
```

محددة في: [packages/runtime/src/decorators/specPath.ts:49](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L49)

معالج تقليدي يستخدمه [SpecPath](../functions/SpecPath.md) لخدمة محتوى العينات.

## البارامترات

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## العودة

  \| [`SpecResponseValue`](SpecResponseValue.md)
  \| `Promise`\<[`SpecResponseValue`](SpecResponseValue.md)\>
