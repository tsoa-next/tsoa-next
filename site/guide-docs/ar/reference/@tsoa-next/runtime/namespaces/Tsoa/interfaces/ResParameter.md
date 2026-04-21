---
lastUpdated: 2026-04-20T21:59:41.323Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / ResParameter

# Interface: ResParameter

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:93](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L93)

## التذييلات

- [`Parameter`](Parameter.md)

## الممتلكات

### $ref?

```ts
optional $ref?: BaseSchema<unknown>;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L90)

#### Inherited from

[`Parameter`](Parameter.md).[`$ref`](Parameter.md#ref)

***

### default?

```ts
optional default?: unknown;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L83)

#### Inherited from

[`Parameter`](Parameter.md).[`default`](Parameter.md#default)

***

### deprecated

```ts
deprecated: boolean;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:87](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L87)

#### Inherited from

[`Parameter`](Parameter.md).[`deprecated`](Parameter.md#deprecated)

***

### description

```ts
description: string;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L95)

#### تجاوزات

[`Parameter`](Parameter.md).[`description`](Parameter.md#description)

***

### example?

```ts
optional example?: Example[];
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L77)

#### Inherited from

[`Parameter`](Parameter.md).[`example`](Parameter.md#example)

***

### exampleLabels?

```ts
optional exampleLabels?: (string | undefined)[];
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:99](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L99)

#### تجاوزات

[`Parameter`](Parameter.md).[`exampleLabels`](Parameter.md#examplelabels)

***

### examples?

```ts
optional examples?: Example[];
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:98](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L98)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L86)

#### Inherited from

[`Parameter`](Parameter.md).[`externalValidator`](Parameter.md#externalvalidator)

***

### headers?

```ts
optional headers?: HeaderType;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:100](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L100)

***

### in

```ts
in: "res";
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:94](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L94)

#### تجاوزات

[`Parameter`](Parameter.md).[`in`](Parameter.md#in)

***

### name

```ts
name: string;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L80)

#### Inherited from

[`Parameter`](Parameter.md).[`name`](Parameter.md#name)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L75)

#### Inherited from

[`Parameter`](Parameter.md).[`parameterIndex`](Parameter.md#parameterindex)

***

### parameterName

```ts
parameterName: string;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L76)

#### Inherited from

[`Parameter`](Parameter.md).[`parameterName`](Parameter.md#parametername)

***

### produces?

```ts
optional produces?: string[];
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:96](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L96)

***

### required?

```ts
optional required?: boolean;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L81)

#### Inherited from

[`Parameter`](Parameter.md).[`required`](Parameter.md#required)

***

### schema?

```ts
optional schema?: Type;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:97](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L97)

***

### title?

```ts
optional title?: string;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L89)

#### Inherited from

[`Parameter`](Parameter.md).[`title`](Parameter.md#title)

***

### type

```ts
type: Type;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L82)

#### Inherited from

[`Parameter`](Parameter.md).[`type`](Parameter.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:85](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L85)

#### Inherited from

[`Parameter`](Parameter.md).[`validationStrategy`](Parameter.md#validationstrategy)

***

### validators

```ts
validators: Validators;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L84)

#### Inherited from

[`Parameter`](Parameter.md).[`validators`](Parameter.md#validators)
