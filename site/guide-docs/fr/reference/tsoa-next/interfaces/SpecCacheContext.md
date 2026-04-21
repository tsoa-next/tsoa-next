---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecCacheContext

# Interface : SpecCacheContext

Définie dans : [packages/runtime/src/decorators/specPath.ts:30](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L30)

Contexte passé aux caches de réponse spéc.

## Prorogé par

- [`SpecRequestContext`](SpecRequestContext.md)

## Propriétés

### cacheKey

```ts
cacheKey: string;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L31)

***

### controllerClass

```ts
controllerClass: object;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L32)

***

### format?

```ts
optional format?: SpecDocumentFormat | "html";
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L37)

***

### fullPath

```ts
fullPath: string;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L33)

***

### path

```ts
path: string;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L34)

***

### runtime

```ts
runtime: SpecRuntime;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L35)

***

### target

```ts
target: 
  | BuiltinSpecPathTarget
  | "custom";
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L36)
