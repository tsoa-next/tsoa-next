---
lastUpdated: 2026-04-20T21:59:41.359Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / ResParameter

# Interface: ResParameter

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:93](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L93)

## Prolongation

- [`Parameter`](Parameter.md)

## Propriétés

### $ref?

```ts
optional $ref?: BaseSchema<unknown>;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L90)

#### Hérité de

[`Parameter`](Parameter.md).[`$ref`](Parameter.md#ref)

***

### default?

```ts
optional default?: unknown;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L83)

#### Hérité de

[`Parameter`](Parameter.md).[`default`](Parameter.md#default)

***

### deprecated

```ts
deprecated: boolean;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:87](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L87)

#### Hérité de

[`Parameter`](Parameter.md).[`deprecated`](Parameter.md#deprecated)

***

### description

```ts
description: string;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L95)

#### Dépassements

[`Parameter`](Parameter.md).[`description`](Parameter.md#description)

***

### example?

```ts
optional example?: Example[];
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L77)

#### Hérité de

[`Parameter`](Parameter.md).[`example`](Parameter.md#example)

***

### exampleLabels?

```ts
optional exampleLabels?: (string | undefined)[];
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:99](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L99)

#### Dépassements

[`Parameter`](Parameter.md).[`exampleLabels`](Parameter.md#examplelabels)

***

### examples?

```ts
optional examples?: Example[];
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:98](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L98)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L86)

#### Hérité de

[`Parameter`](Parameter.md).[`externalValidator`](Parameter.md#externalvalidator)

***

### headers?

```ts
optional headers?: HeaderType;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:100](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L100)

***

### in

```ts
in: "res";
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:94](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L94)

#### Dépassements

[`Parameter`](Parameter.md).[`in`](Parameter.md#in)

***

### name

```ts
name: string;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L80)

#### Hérité de

[`Parameter`](Parameter.md).[`name`](Parameter.md#name)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L75)

#### Hérité de

[`Parameter`](Parameter.md).[`parameterIndex`](Parameter.md#parameterindex)

***

### parameterName

```ts
parameterName: string;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L76)

#### Hérité de

[`Parameter`](Parameter.md).[`parameterName`](Parameter.md#parametername)

***

### produces?

```ts
optional produces?: string[];
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:96](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L96)

***

### required?

```ts
optional required?: boolean;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L81)

#### Hérité de

[`Parameter`](Parameter.md).[`required`](Parameter.md#required)

***

### schema?

```ts
optional schema?: Type;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:97](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L97)

***

### title?

```ts
optional title?: string;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L89)

#### Hérité de

[`Parameter`](Parameter.md).[`title`](Parameter.md#title)

***

### type

```ts
type: Type;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L82)

#### Hérité de

[`Parameter`](Parameter.md).[`type`](Parameter.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:85](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L85)

#### Hérité de

[`Parameter`](Parameter.md).[`validationStrategy`](Parameter.md#validationstrategy)

***

### validators

```ts
validators: Validators;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L84)

#### Hérité de

[`Parameter`](Parameter.md).[`validators`](Parameter.md#validators)
