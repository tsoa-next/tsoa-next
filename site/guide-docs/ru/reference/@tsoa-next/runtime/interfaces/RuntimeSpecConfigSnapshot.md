---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RuntimeSpecConfigSnapshot

# Интерфейс: RuntimeSpecConfigSnapshot

Определено в: [packages/runtime/src/routeGeneration/specPathSupport.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L12)

Снимок настроек спецификации, встроенных в генерируемые маршруты для [SpecPath](../functions/SpecPath.md).

## Свойства

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

Определено в: [packages/runtime/src/routeGeneration/specPathSupport.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L13)

***

### defaultNumberType?

```ts
optional defaultNumberType?: "long" | "integer" | "float" | "double";
```

Определено в: [packages/runtime/src/routeGeneration/specPathSupport.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L14)

***

### ignore?

```ts
optional ignore?: string[];
```

Определено в: [packages/runtime/src/routeGeneration/specPathSupport.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L15)

***

### metadata?

```ts
optional metadata?: Metadata;
```

Определено в: [packages/runtime/src/routeGeneration/specPathSupport.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L16)

***

### spec

```ts
spec: SpecConfig & object;
```

Определено в: [packages/runtime/src/routeGeneration/specPathSupport.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L17)

#### Тип декларации

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
