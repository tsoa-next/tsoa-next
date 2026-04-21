---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecPathGateHandler

# نوع &quot; ألياس &quot; :

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

محددة في: [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

معالج البوابة [SpecPath](../functions/SpecPath.md) أن يقرر ما إذا كان الطلب قد يتلقّى رد المواصفات.

## البارامترات

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## العودة

`boolean` \| `Promise`\<`boolean`\>
