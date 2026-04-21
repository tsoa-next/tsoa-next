---
lastUpdated: 2026-04-20T21:59:41.351Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema31

# Antar muka: Skema 31

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L375)

## Extending

- `Omit`\<[`Schema3`](Schema3.md), 
  \| `"items"`
  \| `"properties"`
  \| `"additionalProperties"`
  \| `"discriminator"`
  \| `"anyOf"`
  \| `"allOf"`
  \| `"exclusiveMaximum"`
  \| `"exclusiveMinimum"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## Properti

### $ref?

```ts
optional $ref?: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

#### Diwarisi dari

```ts
Omit.$ref
```

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | Schema31;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:381](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L381)

***

### allOf?

```ts
optional allOf?: Schema31[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L387)

***

### anyOf?

```ts
optional anyOf?: Schema31[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L388)

***

### contains?

```ts
optional contains?: Schema31;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:385](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L385)

***

### default?

```ts
optional default?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

#### Diwarisi dari

```ts
Omit.default
```

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:406](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L406)

#### Diwarisi dari

[`Schema3`](Schema3.md).[`deprecated`](Schema3.md#deprecated)

***

### description?

```ts
optional description?: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

#### Diwarisi dari

```ts
Omit.description
```

***

### discriminator?

```ts
optional discriminator?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:393](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L393)

#### mapping?

```ts
optional mapping?: Record<string, string>;
```

#### propertyName

```ts
propertyName: string;
```

***

### enum?

```ts
optional enum?: (string | number | boolean | null)[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

#### Diwarisi dari

```ts
Omit.enum
```

***

### example?

```ts
optional example?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

#### Diwarisi dari

```ts
Omit.example
```

***

### examples?

```ts
optional examples?: unknown[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:376](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L376)

***

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:377](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L377)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:378](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L378)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

#### Diwarisi dari

```ts
Omit.externalDocs
```

***

### format?

```ts
optional format?: DataFormat;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

#### Diwarisi dari

```ts
Omit.format
```

***

### items?

```ts
optional items?: false | Schema31;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:383](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L383)

***

### maximum?

```ts
optional maximum?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

#### Diwarisi dari

```ts
Omit.maximum
```

***

### maxItems?

```ts
optional maxItems?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

#### Diwarisi dari

```ts
Omit.maxItems
```

***

### maxLength?

```ts
optional maxLength?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

#### Diwarisi dari

```ts
Omit.maxLength
```

***

### maxProperties?

```ts
optional maxProperties?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

#### Diwarisi dari

```ts
Omit.maxProperties
```

***

### minimum?

```ts
optional minimum?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

#### Diwarisi dari

```ts
Omit.minimum
```

***

### minItems?

```ts
optional minItems?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

#### Diwarisi dari

```ts
Omit.minItems
```

***

### minLength?

```ts
optional minLength?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

#### Diwarisi dari

```ts
Omit.minLength
```

***

### minProperties?

```ts
optional minProperties?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

#### Diwarisi dari

```ts
Omit.minProperties
```

***

### multipleOf?

```ts
optional multipleOf?: number;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

#### Diwarisi dari

```ts
Omit.multipleOf
```

***

### not?

```ts
optional not?: Schema31;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L390)

***

### nullable?

```ts
optional nullable?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:401](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L401)

#### Diwarisi dari

[`Schema3`](Schema3.md).[`nullable`](Schema3.md#nullable)

***

### oneOf?

```ts
optional oneOf?: Schema31[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L389)

***

### pattern?

```ts
optional pattern?: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

#### Diwarisi dari

```ts
Omit.pattern
```

***

### prefixItems?

```ts
optional prefixItems?: Schema31[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:384](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L384)

***

### properties?

```ts
optional properties?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:380](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L380)

#### Tanda tangan indeks

```ts
[key: string]: Schema31
```

***

### propertyNames?

```ts
optional propertyNames?: Schema31;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:391](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L391)

***

### readOnly?

```ts
optional readOnly?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

#### Diwarisi dari

```ts
Omit.readOnly
```

***

### required?

```ts
optional required?: string[];
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

#### Diwarisi dari

```ts
Omit.required
```

***

### title?

```ts
optional title?: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

#### Diwarisi dari

```ts
Omit.title
```

***

### type?

```ts
optional type?: DataType;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:400](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L400)

#### Diwarisi dari

[`Schema3`](Schema3.md).[`type`](Schema3.md#type)

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

#### Diwarisi dari

```ts
Omit.uniqueItems
```

***

### xml?

```ts
optional xml?: XML;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)

#### Diwarisi dari

```ts
Omit.xml
```
