---
lastUpdated: 2026-04-20T21:59:41.314Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecRequestContext

# Antarmuka: Konteks SpekRequest

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L41)

Konteks yang diminta dipindai dilewatkan ke gubahan [SpecPath](../functions/SpecPath.md) Penangan.

## Extending

- [`SpecCacheContext`](SpecCacheContext.md)

## Properti

### cacheKey

```ts
cacheKey: string;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L31)

#### Diwarisi dari

[`SpecCacheContext`](SpecCacheContext.md).[`cacheKey`](SpecCacheContext.md#cachekey)

***

### controllerClass

```ts
controllerClass: object;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L32)

#### Diwarisi dari

[`SpecCacheContext`](SpecCacheContext.md).[`controllerClass`](SpecCacheContext.md#controllerclass)

***

### format?

```ts
optional format?: SpecDocumentFormat | "html";
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L37)

#### Diwarisi dari

[`SpecCacheContext`](SpecCacheContext.md).[`format`](SpecCacheContext.md#format)

***

### fullPath

```ts
fullPath: string;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L33)

#### Diwarisi dari

[`SpecCacheContext`](SpecCacheContext.md).[`fullPath`](SpecCacheContext.md#fullpath)

***

### path

```ts
path: string;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L34)

#### Diwarisi dari

[`SpecCacheContext`](SpecCacheContext.md).[`path`](SpecCacheContext.md#path)

***

### request?

```ts
optional request?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:42](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L42)

***

### response?

```ts
optional response?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:43](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L43)

***

### runtime

```ts
runtime: SpecRuntime;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L35)

#### Diwarisi dari

[`SpecCacheContext`](SpecCacheContext.md).[`runtime`](SpecCacheContext.md#runtime)

***

### target

```ts
target: 
  | BuiltinSpecPathTarget
  | "custom";
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L36)

#### Diwarisi dari

[`SpecCacheContext`](SpecCacheContext.md).[`target`](SpecCacheContext.md#target)

## Metode

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L44)

#### Kembali

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L45)

#### Parameter

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### Kembali

`Promise`\<`string`\>
