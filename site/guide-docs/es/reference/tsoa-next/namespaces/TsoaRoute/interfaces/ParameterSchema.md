---
lastUpdated: 2026-04-20T21:59:41.363Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / ParameterSchema

# Interfaz: ParameterSchema

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:72](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L72)

Esquema de tiempo de ejecución para un parámetro de ruta.

## Extensión

- [`PropertySchema`](PropertySchema.md)

## Propiedades

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:67](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L67)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`additionalProperties`](PropertySchema.md#additionalproperties)

***

### array?

```ts
optional array?: PropertySchema;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:61](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L61)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`array`](PropertySchema.md#array)

***

### dataType?

```ts
optional dataType?: TypeStringLiteral;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L56)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`dataType`](PropertySchema.md#datatype)

***

### default?

```ts
optional default?: unknown;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:66](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L66)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`default`](PropertySchema.md#default)

***

### enums?

```ts
optional enums?: (string | number | boolean | null)[];
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L62)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`enums`](PropertySchema.md#enums)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:60](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L60)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`externalValidator`](PropertySchema.md#externalvalidator)

***

### in

```ts
in: string;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L75)

***

### name

```ts
name: string;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:74](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L74)

***

### nestedProperties?

```ts
optional nestedProperties?: object;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L68)

#### Index Signature

```ts
[name: string]: PropertySchema
```

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`nestedProperties`](PropertySchema.md#nestedproperties)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L73)

***

### ref?

```ts
optional ref?: string;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L57)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`ref`](PropertySchema.md#ref)

***

### required?

```ts
optional required?: boolean;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:58](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L58)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`required`](PropertySchema.md#required)

***

### subSchemas?

```ts
optional subSchemas?: PropertySchema[];
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L64)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`subSchemas`](PropertySchema.md#subschemas)

***

### type?

```ts
optional type?: PropertySchema;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L63)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`type`](PropertySchema.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:59](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L59)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`validationStrategy`](PropertySchema.md#validationstrategy)

***

### validators?

```ts
optional validators?: Partial<Record<ValidatorKey, {
  errorMsg?: string;
  value?: unknown;
}>>;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:65](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L65)

#### Inhered from

[`PropertySchema`](PropertySchema.md).[`validators`](PropertySchema.md#validators)
