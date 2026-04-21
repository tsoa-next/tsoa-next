---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / describeSpecPath

# समारोह: वर्णन SpecPath()

```ts
function describeSpecPath(specPath): object;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:192](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L192)

लॉगिंग और निदान के लिए एक स्पेक-पैथ परिभाषा का मानव पठनीय सारांश तैयार करता है।

## पैरामीटर

### specPath

[`SpecPathDefinition`](../interfaces/SpecPathDefinition.md)

## रिटर्न

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
