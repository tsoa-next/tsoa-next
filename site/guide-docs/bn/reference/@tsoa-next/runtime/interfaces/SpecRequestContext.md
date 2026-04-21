---
lastUpdated: 2026-04-20T21:59:41.314Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecRequestContext

# ইন্টারফেস: SpecyCoqtext

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L41)

স্বনির্ধারিত রঙের জন্য অনুরোধ করা কনটেক্সটের অনুরোধ [SpecPath](../functions/SpecPath.md) হ্যান্ডলার.

## সফল

- [`SpecCacheContext`](SpecCacheContext.md)

## বৈশিষ্ট্য

### cacheKey

```ts
cacheKey: string;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L31)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`SpecCacheContext`](SpecCacheContext.md).[`cacheKey`](SpecCacheContext.md#cachekey)

***

### controllerClass

```ts
controllerClass: object;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L32)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`SpecCacheContext`](SpecCacheContext.md).[`controllerClass`](SpecCacheContext.md#controllerclass)

***

### format?

```ts
optional format?: SpecDocumentFormat | "html";
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L37)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`SpecCacheContext`](SpecCacheContext.md).[`format`](SpecCacheContext.md#format)

***

### fullPath

```ts
fullPath: string;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L33)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`SpecCacheContext`](SpecCacheContext.md).[`fullPath`](SpecCacheContext.md#fullpath)

***

### path

```ts
path: string;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L34)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`SpecCacheContext`](SpecCacheContext.md).[`path`](SpecCacheContext.md#path)

***

### request?

```ts
optional request?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:42](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L42)

***

### response?

```ts
optional response?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:43](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L43)

***

### runtime

```ts
runtime: SpecRuntime;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L35)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`SpecCacheContext`](SpecCacheContext.md).[`runtime`](SpecCacheContext.md#runtime)

***

### target

```ts
target: 
  | BuiltinSpecPathTarget
  | "custom";
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L36)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`SpecCacheContext`](SpecCacheContext.md).[`target`](SpecCacheContext.md#target)

## পদ্ধতি

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L44)

#### প্রাপ্ত মান

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L45)

#### পরামিতি

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### প্রাপ্ত মান

`Promise`\<`string`\>
