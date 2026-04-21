---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecCacheHandler

# Interface : SpecCacheHandler

Définie dans : [packages/runtime/src/decorators/specPath.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L54)

Adaptateur de cache utilisé par [SpecPath](../functions/SpecPath.md) pour mémoriser les réponses générées.

## Méthodes

### get()

```ts
get(context): 
  | SpecResponseValue
  | Promise<SpecResponseValue | undefined>
  | undefined;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L55)

#### Paramètres

##### context

[`SpecCacheContext`](SpecCacheContext.md)

#### Retourne

  \| [`SpecResponseValue`](../type-aliases/SpecResponseValue.md)
  \| `Promise`\<SpecResponseValue \| undefined\>
  \| `undefined`

***

### set()

```ts
set(context, value): void | Promise<void>;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L56)

#### Paramètres

##### context

[`SpecCacheContext`](SpecCacheContext.md)

##### value

`string`

#### Retourne

`void` \| `Promise`\<`void`\>
