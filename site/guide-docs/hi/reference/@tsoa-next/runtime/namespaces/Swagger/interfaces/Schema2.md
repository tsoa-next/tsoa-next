---
lastUpdated: 2026-04-20T21:59:41.317Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Schema2

# इंटरफ़ेस: Schema2

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:412](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L412)

## विस्तार

- `Omit`\<[`BaseSchema`](BaseSchema.md), `"additionalProperties"` \| `"items"` \| `"properties"`\>

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
optional additionalProperties?: boolean | Schema2;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:413](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L413)

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

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:416](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L416)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:417](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L417)

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
optional items?: Schema2;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:414](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L414)

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

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:418](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L418)

#### सूचकांक हस्ताक्षर

```ts
[propertyName: string]: Schema2
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

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:415](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L415)

#### ओवरराइड

```ts
Omit.type
```

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

### x-deprecated?

```ts
optional x-deprecated?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:420](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L420)

***

### x-nullable?

```ts
optional x-nullable?: boolean;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:419](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L419)

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
