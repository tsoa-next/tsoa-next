---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSpecConfigSnapshot

# Antarmuka: RuntimeSpecConfigSnapshot

Didefinisikan dalam: [packages/runtime/src/routeGeneration/specPathSupport.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L12)

Snapshot dari konfigurasi spec- generasi tertanam ke dalam rute yang dihasilkan untuk [SpecPath](../functions/SpecPath.md).

## Properti

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/specPathSupport.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L13)

***

### defaultNumberType?

```ts
optional defaultNumberType?: "long" | "integer" | "double" | "float";
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/specPathSupport.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L14)

***

### ignore?

```ts
optional ignore?: string[];
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/specPathSupport.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L15)

***

### metadata?

```ts
optional metadata?: Metadata;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/specPathSupport.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L16)

***

### spec

```ts
spec: SpecConfig & object;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/specPathSupport.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L17)

#### Deklarasi Tipe

##### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

##### entryFile

```ts
entryFile: string;
```

##### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```
