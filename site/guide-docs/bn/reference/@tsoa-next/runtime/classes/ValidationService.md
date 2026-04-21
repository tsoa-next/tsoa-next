---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidationService

# শ্রেণী: (_S)

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:101](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L101)

রাস্তা হ্যান্ডলার দ্বারা প্রাপ্ত বৈধতা যাচাই ইঞ্জিন ব্যবহার করা হয়েছে।

## কনস্ট্রাক্টর

### কনস্ট্রাক্টর

```ts
new ValidationService(models, config): ValidationService;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:104](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L104)

#### পরামিতি

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### প্রাপ্ত মান

`ValidationService`

## পদ্ধতি

### hasCorrectJsType()

```ts
hasCorrectJsType(
   value, 
   type, 
   isBodyParam): boolean;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:482](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L482)

#### পরামিতি

##### value

`unknown`

##### type

`"string"` \| `"number"` \| `"boolean"` \| `"object"`

##### isBodyParam

`boolean`

#### প্রাপ্ত মান

`boolean`

***

### validateArray()

#### কল স্বাক্ষর

```ts
validateArray(options): unknown[] | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:709](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L709)

##### পরামিতি

###### options

`ValidateArrayOptions`

##### প্রাপ্ত মান

`unknown`[] \| `undefined`

#### কল স্বাক্ষর

```ts
validateArray(...args): unknown[] | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:713](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L713)

##### পরামিতি

###### args

...`ValidateArrayTupleArgs`

##### প্রাপ্ত মান

`unknown`[] \| `undefined`

##### Deprecated

পরিবর্তে বস্তুর উপর ছবি স্থাপন করো

***

### validateBool()

```ts
validateBool(
   name, 
   value, 
   fieldErrors, 
   isBodyParam, 
   validators?, 
   parent?): boolean | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:687](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L687)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### isBodyParam

`boolean`

##### validators?

[`BooleanValidator`](../interfaces/BooleanValidator.md)

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`boolean` \| `undefined`

***

### validateBuffer()

```ts
validateBuffer(
   name, 
   value, 
   fieldErrors, 
   parent?): Buffer<ArrayBufferLike> | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:810](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L810)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`Buffer`\<`ArrayBufferLike`\> \| `undefined`

***

### validateDate()

```ts
validateDate(
   name, 
   value, 
   fieldErrors, 
   isBodyParam, 
   validators?, 
   parent?): Date | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:630](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L630)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### isBodyParam

`boolean`

##### validators?

[`DateValidator`](../interfaces/DateValidator.md)

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`Date` \| `undefined`

***

### validateDateTime()

```ts
validateDateTime(
   name, 
   value, 
   fieldErrors, 
   isBodyParam, 
   validators?, 
   parent?): Date | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:649](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L649)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### isBodyParam

`boolean`

##### validators?

[`DateTimeValidator`](../interfaces/DateTimeValidator.md)

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`Date` \| `undefined`

***

### validateEnum()

```ts
validateEnum(
   name, 
   value, 
   fieldErrors, 
   members?, 
   parent?): unknown;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:607](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L607)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### members?

(`string` \| `number` \| `boolean` \| `null`)[]

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`unknown`

***

### validateFloat()

```ts
validateFloat(
   name, 
   value, 
   fieldErrors, 
   isBodyParam, 
   validators?, 
   parent?): number | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:588](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L588)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### isBodyParam

`boolean`

##### validators?

[`FloatValidator`](../interfaces/FloatValidator.md)

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`number` \| `undefined`

***

### validateInt()

```ts
validateInt(
   name, 
   value, 
   fieldErrors, 
   isBodyParam, 
   validators?, 
   parent?): number | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:569](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L569)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### isBodyParam

`boolean`

##### validators?

[`IntegerValidator`](../interfaces/IntegerValidator.md)

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`number` \| `undefined`

***

### validateIntersection()

```ts
validateIntersection<TValue>(
   name, 
   value, 
   fieldErrors, 
   isBodyParam, 
   subSchemas, 
   parent?, 
   metadata?): TValue;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:868](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L868)

#### পরামিতির পরামিতি

##### TValue

`TValue`

#### পরামিতি

##### name

`string`

##### value

`TValue`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### isBodyParam

`boolean`

##### subSchemas

  \| [`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)[]
  \| `undefined`

##### parent?

`string`

##### metadata?

[`ParameterValidationMetadata`](../interfaces/ParameterValidationMetadata.md)

#### প্রাপ্ত মান

`TValue`

***

### validateModel()

```ts
validateModel<TValue>(input): TValue;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:1060](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1060)

#### পরামিতির পরামিতি

##### TValue

`TValue`

#### পরামিতি

##### input

###### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

###### isBodyParam

`boolean`

###### metadata?

[`ParameterValidationMetadata`](../interfaces/ParameterValidationMetadata.md)

###### modelDefinition

[`ModelSchema`](../namespaces/TsoaRoute/type-aliases/ModelSchema.md)

###### name

`string`

###### parent?

`string`

###### value

`TValue`

#### প্রাপ্ত মান

`TValue`

***

### validateNestedObjectLiteral()

#### কল স্বাক্ষর

```ts
validateNestedObjectLiteral(...args): unknown;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:486](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L486)

##### পরামিতি

###### args

...\[`ValidateNestedObjectLiteralOptions`\]

##### প্রাপ্ত মান

`unknown`

#### কল স্বাক্ষর

```ts
validateNestedObjectLiteral(...args): unknown;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:490](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L490)

##### পরামিতি

###### args

...`ValidateNestedObjectLiteralTupleArgs`

##### প্রাপ্ত মান

`unknown`

##### Deprecated

পরিবর্তে বস্তুর উপর ছবি স্থাপন করো

***

### ValidateParam()

```ts
ValidateParam<TValue>(
   property, 
   rawValue, 
   name, 
   fieldErrors, 
   isBodyParam, 
   parent?, 
   metadata?): TValue;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:118](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L118)

#### পরামিতির পরামিতি

##### TValue

`TValue`

#### পরামিতি

##### property

[`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)

##### rawValue

`TValue`

##### name

`string` \| `undefined`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### isBodyParam

`boolean`

##### parent?

`string`

##### metadata?

[`ParameterValidationMetadata`](../interfaces/ParameterValidationMetadata.md)

#### প্রাপ্ত মান

`TValue`

***

### validateString()

```ts
validateString(
   name, 
   value, 
   fieldErrors, 
   validators?, 
   parent?): string | undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:668](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L668)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### validators?

[`StringValidator`](../interfaces/StringValidator.md)

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`string` \| `undefined`

***

### validateUndefined()

```ts
validateUndefined(
   name, 
   value, 
   fieldErrors, 
   parent?): undefined;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:697](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L697)

#### পরামিতি

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string` = `''`

#### প্রাপ্ত মান

`undefined`

***

### validateUnion()

```ts
validateUnion<TValue>(
   name, 
   value, 
   fieldErrors, 
   isBodyParam, 
   property, 
   parent?, 
   metadata?): TValue;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:830](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L830)

#### পরামিতির পরামিতি

##### TValue

`TValue`

#### পরামিতি

##### name

`string`

##### value

`TValue`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### isBodyParam

`boolean`

##### property

[`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)

##### parent?

`string`

##### metadata?

[`ParameterValidationMetadata`](../interfaces/ParameterValidationMetadata.md)

#### প্রাপ্ত মান

`TValue`
