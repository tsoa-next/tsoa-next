---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecRequestContext

# इंटरफ़ेस: SpecRequestContext

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L41)

अनुरोध-स्किप किए गए संदर्भ को कस्टम में पारित किया गया [SpecPath](../functions/SpecPath.md) हैंडलर

## विस्तार

- [`SpecCacheContext`](SpecCacheContext.md)

## गुण

### cacheKey

```ts
cacheKey: string;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L31)

#### से विरासत

[`SpecCacheContext`](SpecCacheContext.md).[`cacheKey`](SpecCacheContext.md#cachekey)

***

### controllerClass

```ts
controllerClass: object;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L32)

#### से विरासत

[`SpecCacheContext`](SpecCacheContext.md).[`controllerClass`](SpecCacheContext.md#controllerclass)

***

### format?

```ts
optional format?: SpecDocumentFormat | "html";
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L37)

#### से विरासत

[`SpecCacheContext`](SpecCacheContext.md).[`format`](SpecCacheContext.md#format)

***

### fullPath

```ts
fullPath: string;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L33)

#### से विरासत

[`SpecCacheContext`](SpecCacheContext.md).[`fullPath`](SpecCacheContext.md#fullpath)

***

### path

```ts
path: string;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L34)

#### से विरासत

[`SpecCacheContext`](SpecCacheContext.md).[`path`](SpecCacheContext.md#path)

***

### request?

```ts
optional request?: unknown;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:42](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L42)

***

### response?

```ts
optional response?: unknown;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:43](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L43)

***

### runtime

```ts
runtime: SpecRuntime;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L35)

#### से विरासत

[`SpecCacheContext`](SpecCacheContext.md).[`runtime`](SpecCacheContext.md#runtime)

***

### target

```ts
target: 
  | BuiltinSpecPathTarget
  | "custom";
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L36)

#### से विरासत

[`SpecCacheContext`](SpecCacheContext.md).[`target`](SpecCacheContext.md#target)

## विधि

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L44)

#### रिटर्न

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L45)

#### पैरामीटर

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### रिटर्न

`Promise`\<`string`\>
