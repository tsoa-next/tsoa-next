---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / ValidationService

# Classe: Service de validation

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:101](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L101)

Moteur de validation utilisé par les gestionnaires de route générés.

## Constructeurs

### Constructeur

```ts
new ValidationService(models, config): ValidationService;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:104](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L104)

#### Paramètres

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### Retourne

`ValidationService`

## Méthodes

### hasCorrectJsType()

```ts
hasCorrectJsType(
   value, 
   type, 
   isBodyParam): boolean;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:482](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L482)

#### Paramètres

##### value

`unknown`

##### type

`"string"` \| `"number"` \| `"boolean"` \| `"object"`

##### isBodyParam

`boolean`

#### Retourne

`boolean`

***

### validateArray()

#### Signature d'appel

```ts
validateArray(options): unknown[] | undefined;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:709](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L709)

##### Paramètres

###### options

`ValidateArrayOptions`

##### Retourne

`unknown`[] \| `undefined`

#### Signature d'appel

```ts
validateArray(...args): unknown[] | undefined;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:713](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L713)

##### Paramètres

###### args

...`ValidateArrayTupleArgs`

##### Retourne

`unknown`[] \| `undefined`

##### Deprecated

Utilisez plutôt la surcharge objet.

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:687](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L687)

#### Paramètres

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

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:810](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L810)

#### Paramètres

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:630](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L630)

#### Paramètres

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

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:649](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L649)

#### Paramètres

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

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:607](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L607)

#### Paramètres

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### members?

(`string` \| `number` \| `boolean` \| `null`)[]

##### parent?

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:588](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L588)

#### Paramètres

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

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:569](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L569)

#### Paramètres

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

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:868](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L868)

#### Paramètres de type

##### TValue

`TValue`

#### Paramètres

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

#### Retourne

`TValue`

***

### validateModel()

```ts
validateModel<TValue>(input): TValue;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:1060](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1060)

#### Paramètres de type

##### TValue

`TValue`

#### Paramètres

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

#### Retourne

`TValue`

***

### validateNestedObjectLiteral()

#### Signature d'appel

```ts
validateNestedObjectLiteral(...args): unknown;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:486](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L486)

##### Paramètres

###### args

...\[`ValidateNestedObjectLiteralOptions`\]

##### Retourne

`unknown`

#### Signature d'appel

```ts
validateNestedObjectLiteral(...args): unknown;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:490](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L490)

##### Paramètres

###### args

...`ValidateNestedObjectLiteralTupleArgs`

##### Retourne

`unknown`

##### Deprecated

Utilisez plutôt la surcharge objet.

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:118](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L118)

#### Paramètres de type

##### TValue

`TValue`

#### Paramètres

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

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:668](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L668)

#### Paramètres

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### validators?

[`StringValidator`](../interfaces/StringValidator.md)

##### parent?

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:697](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L697)

#### Paramètres

##### name

`string`

##### value

`unknown`

##### fieldErrors

[`FieldErrors`](../interfaces/FieldErrors.md)

##### parent?

`string`

#### Retourne

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

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:830](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L830)

#### Paramètres de type

##### TValue

`TValue`

#### Paramètres

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

#### Retourne

`TValue`
