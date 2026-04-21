---
lastUpdated: 2026-04-20T21:59:41.354Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / ArrayParameter

# इंटरफ़ेस: ArrayParameter

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:103](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L103)

## विस्तार

- [`Parameter`](Parameter.md)

## गुण

### $ref?

```ts
optional $ref?: BaseSchema<unknown>;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L90)

#### से विरासत

[`Parameter`](Parameter.md).[`$ref`](Parameter.md#ref)

***

### collectionFormat?

```ts
optional collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" | "multi";
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L105)

***

### default?

```ts
optional default?: unknown;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L83)

#### से विरासत

[`Parameter`](Parameter.md).[`default`](Parameter.md#default)

***

### deprecated

```ts
deprecated: boolean;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:87](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L87)

#### से विरासत

[`Parameter`](Parameter.md).[`deprecated`](Parameter.md#deprecated)

***

### description?

```ts
optional description?: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L78)

#### से विरासत

[`Parameter`](Parameter.md).[`description`](Parameter.md#description)

***

### example?

```ts
optional example?: Example[];
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L77)

#### से विरासत

[`Parameter`](Parameter.md).[`example`](Parameter.md#example)

***

### exampleLabels?

```ts
optional exampleLabels?: (string | undefined)[];
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L88)

#### से विरासत

[`Parameter`](Parameter.md).[`exampleLabels`](Parameter.md#examplelabels)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L86)

#### से विरासत

[`Parameter`](Parameter.md).[`externalValidator`](Parameter.md#externalvalidator)

***

### in

```ts
in: 
  | "request"
  | "body"
  | "path"
  | "query"
  | "header"
  | "res"
  | "formData"
  | "queries"
  | "body-prop"
  | "request-prop";
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L79)

#### से विरासत

[`Parameter`](Parameter.md).[`in`](Parameter.md#in)

***

### name

```ts
name: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L80)

#### से विरासत

[`Parameter`](Parameter.md).[`name`](Parameter.md#name)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L75)

#### से विरासत

[`Parameter`](Parameter.md).[`parameterIndex`](Parameter.md#parameterindex)

***

### parameterName

```ts
parameterName: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L76)

#### से विरासत

[`Parameter`](Parameter.md).[`parameterName`](Parameter.md#parametername)

***

### required?

```ts
optional required?: boolean;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L81)

#### से विरासत

[`Parameter`](Parameter.md).[`required`](Parameter.md#required)

***

### title?

```ts
optional title?: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L89)

#### से विरासत

[`Parameter`](Parameter.md).[`title`](Parameter.md#title)

***

### type

```ts
type: ArrayType;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:104](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L104)

#### ओवरराइड

[`Parameter`](Parameter.md).[`type`](Parameter.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:85](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L85)

#### से विरासत

[`Parameter`](Parameter.md).[`validationStrategy`](Parameter.md#validationstrategy)

***

### validators

```ts
validators: Validators;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L84)

#### से विरासत

[`Parameter`](Parameter.md).[`validators`](Parameter.md#validators)
