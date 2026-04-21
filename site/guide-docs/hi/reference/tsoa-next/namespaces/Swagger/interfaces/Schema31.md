---
lastUpdated: 2026-04-20T21:59:41.351Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema31

# इंटरफ़ेस: Schema31

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L375)

## विस्तार

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

## गुण

### $ref?

```ts
optional $ref?: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

#### से विरासत

```ts
Omit.$ref
```

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | Schema31;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:381](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L381)

***

### allOf?

```ts
optional allOf?: Schema31[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L387)

***

### anyOf?

```ts
optional anyOf?: Schema31[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L388)

***

### contains?

```ts
optional contains?: Schema31;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:385](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L385)

***

### default?

```ts
optional default?: unknown;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

#### से विरासत

```ts
Omit.default
```

***

### deprecated?

```ts
optional deprecated?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:406](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L406)

#### से विरासत

[`Schema3`](Schema3.md).[`deprecated`](Schema3.md#deprecated)

***

### description?

```ts
optional description?: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

#### से विरासत

```ts
Omit.description
```

***

### discriminator?

```ts
optional discriminator?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:393](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L393)

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

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

#### से विरासत

```ts
Omit.enum
```

***

### example?

```ts
optional example?: unknown;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

#### से विरासत

```ts
Omit.example
```

***

### examples?

```ts
optional examples?: unknown[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:376](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L376)

***

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:377](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L377)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:378](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L378)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

#### से विरासत

```ts
Omit.externalDocs
```

***

### format?

```ts
optional format?: DataFormat;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

#### से विरासत

```ts
Omit.format
```

***

### items?

```ts
optional items?: false | Schema31;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:383](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L383)

***

### maximum?

```ts
optional maximum?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

#### से विरासत

```ts
Omit.maximum
```

***

### maxItems?

```ts
optional maxItems?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

#### से विरासत

```ts
Omit.maxItems
```

***

### maxLength?

```ts
optional maxLength?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

#### से विरासत

```ts
Omit.maxLength
```

***

### maxProperties?

```ts
optional maxProperties?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

#### से विरासत

```ts
Omit.maxProperties
```

***

### minimum?

```ts
optional minimum?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

#### से विरासत

```ts
Omit.minimum
```

***

### minItems?

```ts
optional minItems?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

#### से विरासत

```ts
Omit.minItems
```

***

### minLength?

```ts
optional minLength?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

#### से विरासत

```ts
Omit.minLength
```

***

### minProperties?

```ts
optional minProperties?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

#### से विरासत

```ts
Omit.minProperties
```

***

### multipleOf?

```ts
optional multipleOf?: number;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

#### से विरासत

```ts
Omit.multipleOf
```

***

### not?

```ts
optional not?: Schema31;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L390)

***

### nullable?

```ts
optional nullable?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:401](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L401)

#### से विरासत

[`Schema3`](Schema3.md).[`nullable`](Schema3.md#nullable)

***

### oneOf?

```ts
optional oneOf?: Schema31[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L389)

***

### pattern?

```ts
optional pattern?: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

#### से विरासत

```ts
Omit.pattern
```

***

### prefixItems?

```ts
optional prefixItems?: Schema31[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:384](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L384)

***

### properties?

```ts
optional properties?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:380](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L380)

#### सूचकांक हस्ताक्षर

```ts
[key: string]: Schema31
```

***

### propertyNames?

```ts
optional propertyNames?: Schema31;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:391](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L391)

***

### readOnly?

```ts
optional readOnly?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

#### से विरासत

```ts
Omit.readOnly
```

***

### required?

```ts
optional required?: string[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

#### से विरासत

```ts
Omit.required
```

***

### title?

```ts
optional title?: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

#### से विरासत

```ts
Omit.title
```

***

### type?

```ts
optional type?: DataType;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:400](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L400)

#### से विरासत

[`Schema3`](Schema3.md).[`type`](Schema3.md#type)

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

#### से विरासत

```ts
Omit.uniqueItems
```

***

### xml?

```ts
optional xml?: XML;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)

#### से विरासत

```ts
Omit.xml
```
