---
lastUpdated: 2026-04-20T21:59:41.351Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema3

# Interface: Schema3

محددة في: [packages/runtime/src/swagger/swagger.ts:399](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L399)

## التذييلات

- `Omit`\<[`BaseSchema`](BaseSchema.md), `"additionalProperties"` \| `"items"` \| `"properties"` \| `"type"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## الممتلكات

### $ref?

```ts
optional $ref?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

#### Inherited from

```ts
Omit.$ref
```

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | Schema3;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:402](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L402)

***

### allOf?

```ts
optional allOf?: Schema3[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:405](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L405)

***

### anyOf?

```ts
optional anyOf?: Schema3[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:404](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L404)

***

### default?

```ts
optional default?: unknown;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

#### Inherited from

```ts
Omit.default
```

***

### deprecated?

```ts
optional deprecated?: boolean;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:406](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L406)

***

### description?

```ts
optional description?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

#### Inherited from

```ts
Omit.description
```

***

### discriminator?

```ts
optional discriminator?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L365)

#### Inherited from

```ts
Omit.discriminator
```

***

### enum?

```ts
optional enum?: (string | number | boolean | null)[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

#### Inherited from

```ts
Omit.enum
```

***

### example?

```ts
optional example?: unknown;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

#### Inherited from

```ts
Omit.example
```

***

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: boolean;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:407](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L407)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: boolean;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:408](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L408)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

#### Inherited from

```ts
Omit.externalDocs
```

***

### format?

```ts
optional format?: DataFormat;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

#### Inherited from

```ts
Omit.format
```

***

### items?

```ts
optional items?: Schema3;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:403](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L403)

***

### maximum?

```ts
optional maximum?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

#### Inherited from

```ts
Omit.maximum
```

***

### maxItems?

```ts
optional maxItems?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

#### Inherited from

```ts
Omit.maxItems
```

***

### maxLength?

```ts
optional maxLength?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

#### Inherited from

```ts
Omit.maxLength
```

***

### maxProperties?

```ts
optional maxProperties?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

#### Inherited from

```ts
Omit.maxProperties
```

***

### minimum?

```ts
optional minimum?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

#### Inherited from

```ts
Omit.minimum
```

***

### minItems?

```ts
optional minItems?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

#### Inherited from

```ts
Omit.minItems
```

***

### minLength?

```ts
optional minLength?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

#### Inherited from

```ts
Omit.minLength
```

***

### minProperties?

```ts
optional minProperties?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

#### Inherited from

```ts
Omit.minProperties
```

***

### multipleOf?

```ts
optional multipleOf?: number;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

#### Inherited from

```ts
Omit.multipleOf
```

***

### nullable?

```ts
optional nullable?: boolean;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:401](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L401)

***

### pattern?

```ts
optional pattern?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

#### Inherited from

```ts
Omit.pattern
```

***

### properties?

```ts
optional properties?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:409](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L409)

#### مؤشر التوقيع

```ts
[propertyName: string]: Schema3
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

#### Inherited from

```ts
Omit.readOnly
```

***

### required?

```ts
optional required?: string[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

#### Inherited from

```ts
Omit.required
```

***

### title?

```ts
optional title?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

#### Inherited from

```ts
Omit.title
```

***

### type?

```ts
optional type?: DataType;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:400](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L400)

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

#### Inherited from

```ts
Omit.uniqueItems
```

***

### xml?

```ts
optional xml?: XML;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)

#### Inherited from

```ts
Omit.xml
```
