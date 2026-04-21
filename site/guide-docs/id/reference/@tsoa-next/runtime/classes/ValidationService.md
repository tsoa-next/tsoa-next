---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidationService

# Kelas: Layanan ValidationService

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:101](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L101)

Mesin validasi digunakan oleh penangan rute yang dihasilkan.

## Konstruktor

### Konstruktor

```ts
new ValidationService(models, config): ValidationService;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:104](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L104)

#### Parameter

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### Kembali

`ValidationService`

## Metode

### hasCorrectJsType()

```ts
hasCorrectJsType(
   value, 
   type, 
   isBodyParam): boolean;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:482](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L482)

#### Parameter

##### value

`unknown`

##### type

`"string"` \| `"number"` \| `"boolean"` \| `"object"`

##### isBodyParam

`boolean`

#### Kembali

`boolean`

***

### validateArray()

#### Panggil Tandatangan

```ts
validateArray(options): unknown[] | undefined;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:709](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L709)

##### Parameter

###### options

`ValidateArrayOptions`

##### Kembali

`unknown`[] \| `undefined`

#### Panggil Tandatangan

```ts
validateArray(...args): unknown[] | undefined;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:713](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L713)

##### Parameter

###### args

...`ValidateArrayTupleArgs`

##### Kembali

`unknown`[] \| `undefined`

##### Deprecated

Gunakan objek overload sebagai gantinya.

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:687](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L687)

#### Parameter

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

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:810](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L810)

#### Parameter

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string` = `''`

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:630](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L630)

#### Parameter

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

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:649](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L649)

#### Parameter

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

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:607](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L607)

#### Parameter

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

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:588](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L588)

#### Parameter

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

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:569](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L569)

#### Parameter

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

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:868](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L868)

#### Parameter Tipe

##### TValue

`TValue`

#### Parameter

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

#### Kembali

`TValue`

***

### validateModel()

```ts
validateModel<TValue>(input): TValue;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:1060](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1060)

#### Parameter Tipe

##### TValue

`TValue`

#### Parameter

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

#### Kembali

`TValue`

***

### validateNestedObjectLiteral()

#### Panggil Tandatangan

```ts
validateNestedObjectLiteral(...args): unknown;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:486](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L486)

##### Parameter

###### args

...\[`ValidateNestedObjectLiteralOptions`\]

##### Kembali

`unknown`

#### Panggil Tandatangan

```ts
validateNestedObjectLiteral(...args): unknown;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:490](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L490)

##### Parameter

###### args

...`ValidateNestedObjectLiteralTupleArgs`

##### Kembali

`unknown`

##### Deprecated

Gunakan objek overload sebagai gantinya.

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:118](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L118)

#### Parameter Tipe

##### TValue

`TValue`

#### Parameter

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

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:668](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L668)

#### Parameter

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

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:697](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L697)

#### Parameter

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string` = `''`

#### Kembali

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:830](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L830)

#### Parameter Tipe

##### TValue

`TValue`

#### Parameter

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

#### Kembali

`TValue`
