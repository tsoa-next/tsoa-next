---
lastUpdated: 2026-04-20T21:59:41.326Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [TsoaRoute](../index.md) / PropertySchema

# Interface: PropertySchema

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L55)

Fragmento de esquema usado para validar uma única propriedade ou valor aninhado no tempo de execução.

## Estendido por

- [`ParameterSchema`](ParameterSchema.md)

## Propriedades

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:67](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L67)

***

### array?

```ts
optional array?: PropertySchema;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:61](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L61)

***

### dataType?

```ts
optional dataType?: TypeStringLiteral;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L56)

***

### default?

```ts
optional default?: unknown;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:66](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L66)

***

### enums?

```ts
optional enums?: (string | number | boolean | null)[];
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L62)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:60](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L60)

***

### nestedProperties?

```ts
optional nestedProperties?: object;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L68)

#### Assinatura do índice

```ts
[name: string]: PropertySchema
```

***

### ref?

```ts
optional ref?: string;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L57)

***

### required?

```ts
optional required?: boolean;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:58](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L58)

***

### subSchemas?

```ts
optional subSchemas?: PropertySchema[];
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L64)

***

### type?

```ts
optional type?: PropertySchema;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L63)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:59](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L59)

***

### validators?

```ts
optional validators?: Partial<Record<ValidatorKey, {
  errorMsg?: string;
  value?: unknown;
}>>;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:65](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L65)
