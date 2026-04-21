---
lastUpdated: 2026-04-20T21:59:41.363Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / ParameterSchema

# Antarmuka: ParameterSkema

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:72](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L72)

Skema runtime untuk parameter rute.

## Extending

- [`PropertySchema`](PropertySchema.md)

## Properti

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:67](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L67)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`additionalProperties`](PropertySchema.md#additionalproperties)

***

### array?

```ts
optional array?: PropertySchema;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:61](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L61)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`array`](PropertySchema.md#array)

***

### dataType?

```ts
optional dataType?: TypeStringLiteral;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L56)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`dataType`](PropertySchema.md#datatype)

***

### default?

```ts
optional default?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:66](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L66)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`default`](PropertySchema.md#default)

***

### enums?

```ts
optional enums?: (string | number | boolean | null)[];
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L62)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`enums`](PropertySchema.md#enums)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:60](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L60)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`externalValidator`](PropertySchema.md#externalvalidator)

***

### in

```ts
in: string;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L75)

***

### name

```ts
name: string;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:74](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L74)

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

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`nestedProperties`](PropertySchema.md#nestedproperties)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L73)

***

### ref?

```ts
optional ref?: string;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L57)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`ref`](PropertySchema.md#ref)

***

### required?

```ts
optional required?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:58](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L58)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`required`](PropertySchema.md#required)

***

### subSchemas?

```ts
optional subSchemas?: PropertySchema[];
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L64)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`subSchemas`](PropertySchema.md#subschemas)

***

### type?

```ts
optional type?: PropertySchema;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L63)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`type`](PropertySchema.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:59](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L59)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`validationStrategy`](PropertySchema.md#validationstrategy)

***

### validators?

```ts
optional validators?: Partial<Record<ValidatorKey, {
  errorMsg?: string;
  value?: unknown;
}>>;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:65](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L65)

#### Diwarisi dari

[`PropertySchema`](PropertySchema.md).[`validators`](PropertySchema.md#validators)
