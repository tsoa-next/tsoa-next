---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecCacheHandler

# Interfaz: SpecCacheHandler

Definido en: [packages/runtime/src/decorators/specPath.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L54)

Adaptador de caché utilizado por [SpecPath](../functions/SpecPath.md) memoizar respuestas generadas.

## Métodos

### get()

```ts
get(context): 
  | SpecResponseValue
  | Promise<SpecResponseValue | undefined>
  | undefined;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L55)

#### Parámetros

##### context

[`SpecCacheContext`](SpecCacheContext.md)

#### Devoluciones

  \| [`SpecResponseValue`](../type-aliases/SpecResponseValue.md)
  \| `Promise`\<SpecResponseValue \| undefined\>
  \| `undefined`

***

### set()

```ts
set(context, value): void | Promise<void>;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L56)

#### Parámetros

##### context

[`SpecCacheContext`](SpecCacheContext.md)

##### value

`string`

#### Devoluciones

`void` \| `Promise`\<`void`\>
