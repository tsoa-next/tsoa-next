---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecCacheContext

# Интерфейс: SpecCacheContext

Определено в: [packages/runtime/src/decorators/specPath.ts:30](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L30)

Контекст передавался в специальные кэши.

## расширенный

- [`SpecRequestContext`](SpecRequestContext.md)

## Свойства

### cacheKey

```ts
cacheKey: string;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L31)

***

### controllerClass

```ts
controllerClass: object;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L32)

***

### format?

```ts
optional format?: SpecDocumentFormat | "html";
```

Определено в: [packages/runtime/src/decorators/specPath.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L37)

***

### fullPath

```ts
fullPath: string;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L33)

***

### path

```ts
path: string;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L34)

***

### runtime

```ts
runtime: SpecRuntime;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L35)

***

### target

```ts
target: 
  | BuiltinSpecPathTarget
  | "custom";
```

Определено в: [packages/runtime/src/decorators/specPath.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L36)
