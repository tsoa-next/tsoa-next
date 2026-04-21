---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecCacheHandler

# Interface: SpecCacheHandler

Definido em: [packages/runtime/src/decorators/specPath.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L54)

Adaptador de cache usado por [SpecPath](../functions/SpecPath.md) para memorizar respostas geradas.

## Métodos

### get()

```ts
get(context): 
  | SpecResponseValue
  | Promise<SpecResponseValue | undefined>
  | undefined;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L55)

#### Parâmetros

##### context

[`SpecCacheContext`](SpecCacheContext.md)

#### Retorna

  \| [`SpecResponseValue`](../type-aliases/SpecResponseValue.md)
  \| `Promise`\<SpecResponseValue \| undefined\>
  \| `undefined`

***

### set()

```ts
set(context, value): void | Promise<void>;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L56)

#### Parâmetros

##### context

[`SpecCacheContext`](SpecCacheContext.md)

##### value

`string`

#### Retorna

`void` \| `Promise`\<`void`\>
