---
lastUpdated: 2026-04-20T21:59:41.326Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [TsoaRoute](../index.md) / PropertySchema

# Antar muka: Skema Akses

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L55)

Fragmen skema digunakan untuk memvalidasi sebuah properti tunggal atau nested nilai pada waktu-jalan.

## Diperluas oleh

- [`ParameterSchema`](ParameterSchema.md)

## Properti

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:67](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L67)

***

### array?

```ts
optional array?: PropertySchema;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:61](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L61)

***

### dataType?

```ts
optional dataType?: TypeStringLiteral;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L56)

***

### default?

```ts
optional default?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:66](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L66)

***

### enums?

```ts
optional enums?: (string | number | boolean | null)[];
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L62)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:60](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L60)

***

### nestedProperties?

```ts
optional nestedProperties?: object;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L68)

#### Tanda tangan indeks

```ts
[name: string]: PropertySchema
```

***

### ref?

```ts
optional ref?: string;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L57)

***

### required?

```ts
optional required?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:58](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L58)

***

### subSchemas?

```ts
optional subSchemas?: PropertySchema[];
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L64)

***

### type?

```ts
optional type?: PropertySchema;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L63)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:59](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L59)

***

### validators?

```ts
optional validators?: Partial<Record<ValidatorKey, {
  errorMsg?: string;
  value?: unknown;
}>>;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:65](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L65)
