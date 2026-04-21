---
lastUpdated: 2026-04-20T21:59:41.354Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / ArrayParameter

# Antar muka: ArrayParameter

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:103](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L103)

## Extending

- [`Parameter`](Parameter.md)

## Properti

### $ref?

```ts
optional $ref?: BaseSchema<unknown>;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L90)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`$ref`](Parameter.md#ref)

***

### collectionFormat?

```ts
optional collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" | "multi";
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L105)

***

### default?

```ts
optional default?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L83)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`default`](Parameter.md#default)

***

### deprecated

```ts
deprecated: boolean;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:87](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L87)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`deprecated`](Parameter.md#deprecated)

***

### description?

```ts
optional description?: string;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L78)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`description`](Parameter.md#description)

***

### example?

```ts
optional example?: Example[];
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L77)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`example`](Parameter.md#example)

***

### exampleLabels?

```ts
optional exampleLabels?: (string | undefined)[];
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L88)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`exampleLabels`](Parameter.md#examplelabels)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L86)

#### Diwarisi dari

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

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L79)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`in`](Parameter.md#in)

***

### name

```ts
name: string;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L80)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`name`](Parameter.md#name)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L75)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`parameterIndex`](Parameter.md#parameterindex)

***

### parameterName

```ts
parameterName: string;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L76)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`parameterName`](Parameter.md#parametername)

***

### required?

```ts
optional required?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L81)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`required`](Parameter.md#required)

***

### title?

```ts
optional title?: string;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L89)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`title`](Parameter.md#title)

***

### type

```ts
type: ArrayType;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:104](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L104)

#### Timpa

[`Parameter`](Parameter.md).[`type`](Parameter.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:85](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L85)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`validationStrategy`](Parameter.md#validationstrategy)

***

### validators

```ts
validators: Validators;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L84)

#### Diwarisi dari

[`Parameter`](Parameter.md).[`validators`](Parameter.md#validators)
