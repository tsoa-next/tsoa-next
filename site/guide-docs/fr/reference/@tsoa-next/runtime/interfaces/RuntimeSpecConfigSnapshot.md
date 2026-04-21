---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RuntimeSpecConfigSnapshot

# Interface: RuntimeSpecConfigSnapshot

Définie dans : [packages/runtime/src/routeGeneration/specPathSupport.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L12)

Aperçu des paramètres de génération de spécifications intégrés dans les routes générées pour [SpecPath](../functions/SpecPath.md).

## Propriétés

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

Définie dans : [packages/runtime/src/routeGeneration/specPathSupport.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L13)

***

### defaultNumberType?

```ts
optional defaultNumberType?: "long" | "integer" | "float" | "double";
```

Définie dans : [packages/runtime/src/routeGeneration/specPathSupport.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L14)

***

### ignore?

```ts
optional ignore?: string[];
```

Définie dans : [packages/runtime/src/routeGeneration/specPathSupport.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L15)

***

### metadata?

```ts
optional metadata?: Metadata;
```

Définie dans : [packages/runtime/src/routeGeneration/specPathSupport.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L16)

***

### spec

```ts
spec: SpecConfig & object;
```

Définie dans : [packages/runtime/src/routeGeneration/specPathSupport.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L17)

#### Déclaration de type

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
