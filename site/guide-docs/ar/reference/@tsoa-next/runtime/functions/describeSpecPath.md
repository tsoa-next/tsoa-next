---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / describeSpecPath

# Function: describeSpecPath

```ts
function describeSpecPath(specPath): object;
```

محددة في: [packages/runtime/src/decorators/specPath.ts:192](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L192)

يُنتج ملخصاً قابلاً للقراءة للإنسان لتعريف المضاربة لقطع الأشجار والتشخيصات.

## البارامترات

### specPath

[`SpecPathDefinition`](../interfaces/SpecPathDefinition.md)

## العودة

`object`

### cache

```ts
cache: string;
```

### path

```ts
path: string = specPath.path;
```

### target

```ts
target: string;
```
