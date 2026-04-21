---
lastUpdated: 2026-04-20T21:59:41.351Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema3

# इंटरफ़ेस: Schema3

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:399](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L399)

## विस्तार

- `Omit`\<[`BaseSchema`](BaseSchema.md), `"additionalProperties"` \| `"items"` \| `"properties"` \| `"type"`\>

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
optional additionalProperties?: boolean | Schema3;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:402](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L402)

***

### allOf?

```ts
optional allOf?: Schema3[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:405](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L405)

***

### anyOf?

```ts
optional anyOf?: Schema3[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:404](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L404)

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
optional discriminator?: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L365)

#### से विरासत

```ts
Omit.discriminator
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

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:407](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L407)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:408](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L408)

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
optional items?: Schema3;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:403](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L403)

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

### nullable?

```ts
optional nullable?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:401](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L401)

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

### properties?

```ts
optional properties?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:409](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L409)

#### सूचकांक हस्ताक्षर

```ts
[propertyName: string]: Schema3
```

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
