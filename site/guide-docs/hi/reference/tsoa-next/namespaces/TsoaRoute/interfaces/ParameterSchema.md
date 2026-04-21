---
lastUpdated: 2026-04-20T21:59:41.363Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / ParameterSchema

# इंटरफ़ेस: पैरामीटर

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:72](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L72)

रूट पैरामीटर के लिए रनटाइम स्कीमा।

## विस्तार

- [`PropertySchema`](PropertySchema.md)

## गुण

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:67](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L67)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`additionalProperties`](PropertySchema.md#additionalproperties)

***

### array?

```ts
optional array?: PropertySchema;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:61](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L61)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`array`](PropertySchema.md#array)

***

### dataType?

```ts
optional dataType?: TypeStringLiteral;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L56)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`dataType`](PropertySchema.md#datatype)

***

### default?

```ts
optional default?: unknown;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:66](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L66)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`default`](PropertySchema.md#default)

***

### enums?

```ts
optional enums?: (string | number | boolean | null)[];
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L62)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`enums`](PropertySchema.md#enums)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:60](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L60)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`externalValidator`](PropertySchema.md#externalvalidator)

***

### in

```ts
in: string;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L75)

***

### name

```ts
name: string;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:74](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L74)

***

### nestedProperties?

```ts
optional nestedProperties?: object;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L68)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: PropertySchema
```

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`nestedProperties`](PropertySchema.md#nestedproperties)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L73)

***

### ref?

```ts
optional ref?: string;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L57)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`ref`](PropertySchema.md#ref)

***

### required?

```ts
optional required?: boolean;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:58](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L58)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`required`](PropertySchema.md#required)

***

### subSchemas?

```ts
optional subSchemas?: PropertySchema[];
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L64)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`subSchemas`](PropertySchema.md#subschemas)

***

### type?

```ts
optional type?: PropertySchema;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L63)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`type`](PropertySchema.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:59](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L59)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`validationStrategy`](PropertySchema.md#validationstrategy)

***

### validators?

```ts
optional validators?: Partial<Record<ValidatorKey, {
  errorMsg?: string;
  value?: unknown;
}>>;
```

में परिभाषित: [packages/runtime/src/routeGeneration/tsoa-route.ts:65](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L65)

#### से विरासत

[`PropertySchema`](PropertySchema.md).[`validators`](PropertySchema.md#validators)
