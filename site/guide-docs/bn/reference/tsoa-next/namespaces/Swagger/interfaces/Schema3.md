---
lastUpdated: 2026-04-20T21:59:41.351Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema3

# ইন্টারফেস: স্কিমা ৩

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:399](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L399)

## সফল

- `Omit`\<[`BaseSchema`](BaseSchema.md), `"additionalProperties"` \| `"items"` \| `"properties"` \| `"type"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## বৈশিষ্ট্য

### $ref?

```ts
optional $ref?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.$ref
```

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | Schema3;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:402](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L402)

***

### allOf?

```ts
optional allOf?: Schema3[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:405](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L405)

***

### anyOf?

```ts
optional anyOf?: Schema3[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:404](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L404)

***

### default?

```ts
optional default?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.default
```

***

### deprecated?

```ts
optional deprecated?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:406](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L406)

***

### description?

```ts
optional description?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.description
```

***

### discriminator?

```ts
optional discriminator?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L365)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.discriminator
```

***

### enum?

```ts
optional enum?: (string | number | boolean | null)[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.enum
```

***

### example?

```ts
optional example?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.example
```

***

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:407](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L407)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:408](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L408)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.externalDocs
```

***

### format?

```ts
optional format?: DataFormat;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.format
```

***

### items?

```ts
optional items?: Schema3;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:403](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L403)

***

### maximum?

```ts
optional maximum?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.maximum
```

***

### maxItems?

```ts
optional maxItems?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.maxItems
```

***

### maxLength?

```ts
optional maxLength?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.maxLength
```

***

### maxProperties?

```ts
optional maxProperties?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.maxProperties
```

***

### minimum?

```ts
optional minimum?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.minimum
```

***

### minItems?

```ts
optional minItems?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.minItems
```

***

### minLength?

```ts
optional minLength?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.minLength
```

***

### minProperties?

```ts
optional minProperties?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.minProperties
```

***

### multipleOf?

```ts
optional multipleOf?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.multipleOf
```

***

### nullable?

```ts
optional nullable?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:401](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L401)

***

### pattern?

```ts
optional pattern?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.pattern
```

***

### properties?

```ts
optional properties?: object;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:409](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L409)

#### ইন্ডেক্স স্বাক্ষর

```ts
[propertyName: string]: Schema3
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.readOnly
```

***

### required?

```ts
optional required?: string[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.required
```

***

### title?

```ts
optional title?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.title
```

***

### type?

```ts
optional type?: DataType;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:400](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L400)

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.uniqueItems
```

***

### xml?

```ts
optional xml?: XML;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Omit.xml
```
