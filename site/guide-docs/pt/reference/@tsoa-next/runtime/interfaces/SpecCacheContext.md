---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecCacheContext

# Interface: SpecCacheContext

Definido em: [packages/runtime/src/decorators/specPath.ts:30](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L30)

Contexto passado para caches de resposta.

## Estendido por

- [`SpecRequestContext`](SpecRequestContext.md)

## Propriedades

### cacheKey

```ts
cacheKey: string;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L31)

***

### controllerClass

```ts
controllerClass: object;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L32)

***

### format?

```ts
optional format?: SpecDocumentFormat | "html";
```

Definido em: [packages/runtime/src/decorators/specPath.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L37)

***

### fullPath

```ts
fullPath: string;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L33)

***

### path

```ts
path: string;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L34)

***

### runtime

```ts
runtime: SpecRuntime;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L35)

***

### target

```ts
target: 
  | BuiltinSpecPathTarget
  | "custom";
```

Definido em: [packages/runtime/src/decorators/specPath.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L36)
