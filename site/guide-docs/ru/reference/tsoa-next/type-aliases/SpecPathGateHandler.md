---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecPathGateHandler

# Тип Alias: SpecPathGateHandler

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

Ворота, используемые [SpecPath](../functions/SpecPath.md) чтобы решить, может ли запрос получить ответ спецификации.

## Параметры

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Возвращение

`boolean` \| `Promise`\<`boolean`\>
