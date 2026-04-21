---
lastUpdated: 2026-04-20T21:59:41.323Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / ResParameter

# 接口:resparameter

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:93](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L93)

## 扩展

- [`Parameter`](Parameter.md)

## 属性

### $ref?

```ts
optional $ref?: BaseSchema<unknown>;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L90)

#### 继承自

[`Parameter`](Parameter.md).[`$ref`](Parameter.md#ref)

***

### default?

```ts
optional default?: unknown;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L83)

#### 继承自

[`Parameter`](Parameter.md).[`default`](Parameter.md#default)

***

### deprecated

```ts
deprecated: boolean;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:87](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L87)

#### 继承自

[`Parameter`](Parameter.md).[`deprecated`](Parameter.md#deprecated)

***

### description

```ts
description: string;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L95)

#### 覆盖

[`Parameter`](Parameter.md).[`description`](Parameter.md#description)

***

### example?

```ts
optional example?: Example[];
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L77)

#### 继承自

[`Parameter`](Parameter.md).[`example`](Parameter.md#example)

***

### exampleLabels?

```ts
optional exampleLabels?: (string | undefined)[];
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:99](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L99)

#### 覆盖

[`Parameter`](Parameter.md).[`exampleLabels`](Parameter.md#examplelabels)

***

### examples?

```ts
optional examples?: Example[];
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:98](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L98)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L86)

#### 继承自

[`Parameter`](Parameter.md).[`externalValidator`](Parameter.md#externalvalidator)

***

### headers?

```ts
optional headers?: HeaderType;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:100](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L100)

***

### in

```ts
in: "res";
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:94](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L94)

#### 覆盖

[`Parameter`](Parameter.md).[`in`](Parameter.md#in)

***

### name

```ts
name: string;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L80)

#### 继承自

[`Parameter`](Parameter.md).[`name`](Parameter.md#name)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L75)

#### 继承自

[`Parameter`](Parameter.md).[`parameterIndex`](Parameter.md#parameterindex)

***

### parameterName

```ts
parameterName: string;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L76)

#### 继承自

[`Parameter`](Parameter.md).[`parameterName`](Parameter.md#parametername)

***

### produces?

```ts
optional produces?: string[];
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:96](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L96)

***

### required?

```ts
optional required?: boolean;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L81)

#### 继承自

[`Parameter`](Parameter.md).[`required`](Parameter.md#required)

***

### schema?

```ts
optional schema?: Type;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:97](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L97)

***

### title?

```ts
optional title?: string;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L89)

#### 继承自

[`Parameter`](Parameter.md).[`title`](Parameter.md#title)

***

### type

```ts
type: Type;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L82)

#### 继承自

[`Parameter`](Parameter.md).[`type`](Parameter.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:85](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L85)

#### 继承自

[`Parameter`](Parameter.md).[`validationStrategy`](Parameter.md#validationstrategy)

***

### validators

```ts
validators: Validators;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L84)

#### 继承自

[`Parameter`](Parameter.md).[`validators`](Parameter.md#validators)
