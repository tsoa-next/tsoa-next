---
lastUpdated: 2026-04-20T21:59:41.350Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema2

# Antar muka: Skema 2

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:412](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L412)

## Extending

- `Omit`\<[`BaseSchema`](BaseSchema.md), `"additionalProperties"` \| `"items"` \| `"properties"`\>

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
optional additionalProperties?: boolean | Schema2;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:413](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L413)

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
optional discriminator?: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L365)

#### Diwarisi dari

```ts
Omit.discriminator
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

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:416](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L416)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:417](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L417)

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
optional items?: Schema2;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:414](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L414)

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

### properties?

```ts
optional properties?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:418](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L418)

#### Tanda tangan indeks

```ts
[propertyName: string]: Schema2
```

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

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:415](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L415)

#### Timpa

```ts
Omit.type
```

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

### x-decated?

```ts
optional x-deprecated?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:420](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L420)

***

### x-nulable?

```ts
optional x-nullable?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:419](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L419)

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
