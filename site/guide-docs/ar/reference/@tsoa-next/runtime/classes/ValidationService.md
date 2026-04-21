---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidationService

# الرتبة: شهادة المصادقة

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:101](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L101)

محرك التثبيت الذي يستخدمه متحكمو الطرق المولدون

## Constructors

### المؤسسة

```ts
new ValidationService(models, config): ValidationService;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:104](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L104)

#### البارامترات

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### العودة

`ValidationService`

## الطرائق

### hasCorrectJsType()

```ts
hasCorrectJsType(
   value, 
   type, 
   isBodyParam): boolean;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:482](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L482)

#### البارامترات

##### value

`unknown`

##### type

`"string"` \| `"number"` \| `"boolean"` \| `"object"`

##### isBodyParam

`boolean`

#### العودة

`boolean`

***

### validateArray()

#### التوقيع

```ts
validateArray(options): unknown[] | undefined;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:709](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L709)

##### البارامترات

###### options

`ValidateArrayOptions`

##### العودة

`unknown`[] \| `undefined`

#### التوقيع

```ts
validateArray(...args): unknown[] | undefined;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:713](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L713)

##### البارامترات

###### args

...`ValidateArrayTupleArgs`

##### العودة

`unknown`[] \| `undefined`

##### Deprecated

استعملي تحميل الجسم بدلاً من ذلك

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:687](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L687)

#### البارامترات

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

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:810](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L810)

#### البارامترات

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string` = `''`

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:630](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L630)

#### البارامترات

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

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:649](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L649)

#### البارامترات

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

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:607](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L607)

#### البارامترات

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

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:588](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L588)

#### البارامترات

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

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:569](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L569)

#### البارامترات

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

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:868](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L868)

#### البارامترات النوعية

##### TValue

`TValue`

#### البارامترات

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

#### العودة

`TValue`

***

### validateModel()

```ts
validateModel<TValue>(input): TValue;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:1060](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1060)

#### البارامترات النوعية

##### TValue

`TValue`

#### البارامترات

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

#### العودة

`TValue`

***

### validateNestedObjectLiteral()

#### التوقيع

```ts
validateNestedObjectLiteral(...args): unknown;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:486](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L486)

##### البارامترات

###### args

...\[`ValidateNestedObjectLiteralOptions`\]

##### العودة

`unknown`

#### التوقيع

```ts
validateNestedObjectLiteral(...args): unknown;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:490](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L490)

##### البارامترات

###### args

...`ValidateNestedObjectLiteralTupleArgs`

##### العودة

`unknown`

##### Deprecated

استعملي تحميل الجسم بدلاً من ذلك

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:118](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L118)

#### البارامترات النوعية

##### TValue

`TValue`

#### البارامترات

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

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:668](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L668)

#### البارامترات

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

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:697](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L697)

#### البارامترات

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string` = `''`

#### العودة

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

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:830](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L830)

#### البارامترات النوعية

##### TValue

`TValue`

#### البارامترات

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

#### العودة

`TValue`
