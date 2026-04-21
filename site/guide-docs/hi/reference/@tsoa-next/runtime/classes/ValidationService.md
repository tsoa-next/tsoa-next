---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidationService

# वर्ग: वैधता सेवा

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:101](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L101)

उत्पन्न मार्ग हैंडलर द्वारा उपयोग किया जाने वाला सत्यापन इंजन।

## कंस्ट्रक्टर

### रचनाकार

```ts
new ValidationService(models, config): ValidationService;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:104](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L104)

#### पैरामीटर

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### रिटर्न

`ValidationService`

## विधि

### hasCorrectJsType()

```ts
hasCorrectJsType(
   value, 
   type, 
   isBodyParam): boolean;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:482](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L482)

#### पैरामीटर

##### value

`unknown`

##### type

`"string"` \| `"number"` \| `"boolean"` \| `"object"`

##### isBodyParam

`boolean`

#### रिटर्न

`boolean`

***

### validateArray()

#### कॉल हस्ताक्षर

```ts
validateArray(options): unknown[] | undefined;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:709](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L709)

##### पैरामीटर

###### options

`ValidateArrayOptions`

##### रिटर्न

`unknown`[] \| `undefined`

#### कॉल हस्ताक्षर

```ts
validateArray(...args): unknown[] | undefined;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:713](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L713)

##### पैरामीटर

###### args

...`ValidateArrayTupleArgs`

##### रिटर्न

`unknown`[] \| `undefined`

##### Deprecated

इसके बजाय ऑब्जेक्ट ओवरलोड का उपयोग करें।

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:687](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L687)

#### पैरामीटर

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

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:810](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L810)

#### पैरामीटर

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string` = `''`

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:630](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L630)

#### पैरामीटर

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

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:649](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L649)

#### पैरामीटर

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

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:607](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L607)

#### पैरामीटर

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

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:588](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L588)

#### पैरामीटर

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

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:569](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L569)

#### पैरामीटर

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

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:868](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L868)

#### प्रकार पैरामीटर

##### TValue

`TValue`

#### पैरामीटर

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

#### रिटर्न

`TValue`

***

### validateModel()

```ts
validateModel<TValue>(input): TValue;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:1060](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1060)

#### प्रकार पैरामीटर

##### TValue

`TValue`

#### पैरामीटर

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

#### रिटर्न

`TValue`

***

### validateNestedObjectLiteral()

#### कॉल हस्ताक्षर

```ts
validateNestedObjectLiteral(...args): unknown;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:486](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L486)

##### पैरामीटर

###### args

...\[`ValidateNestedObjectLiteralOptions`\]

##### रिटर्न

`unknown`

#### कॉल हस्ताक्षर

```ts
validateNestedObjectLiteral(...args): unknown;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:490](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L490)

##### पैरामीटर

###### args

...`ValidateNestedObjectLiteralTupleArgs`

##### रिटर्न

`unknown`

##### Deprecated

इसके बजाय ऑब्जेक्ट ओवरलोड का उपयोग करें।

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:118](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L118)

#### प्रकार पैरामीटर

##### TValue

`TValue`

#### पैरामीटर

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

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:668](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L668)

#### पैरामीटर

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

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:697](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L697)

#### पैरामीटर

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string` = `''`

#### रिटर्न

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

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:830](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L830)

#### प्रकार पैरामीटर

##### TValue

`TValue`

#### पैरामीटर

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

#### रिटर्न

`TValue`
