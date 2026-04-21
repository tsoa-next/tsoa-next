---
lastUpdated: 2026-04-20T21:59:41.314Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / BaseSchema

# ইন্টারফেস: বেসচেমা\<P\>

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:338](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L338)

## পরামিতির পরামিতি

### P

`P` = `unknown`

## Indexable

```ts
[ext: `x-${string}`]: unknown
```

## বৈশিষ্ট্য

### $ref?

```ts
optional $ref?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | BaseSchema<unknown>;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:363](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L363)

***

### default?

```ts
optional default?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

***

### description?

```ts
optional description?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

***

### discriminator?

```ts
optional discriminator?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L365)

***

### enum?

```ts
optional enum?: (string | number | boolean | null)[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

***

### example?

```ts
optional example?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

***

### format?

```ts
optional format?: DataFormat;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

***

### items?

```ts
optional items?: BaseSchema<unknown>;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:372](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L372)

***

### maximum?

```ts
optional maximum?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

***

### maxItems?

```ts
optional maxItems?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

***

### maxLength?

```ts
optional maxLength?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

***

### maxProperties?

```ts
optional maxProperties?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

***

### minimum?

```ts
optional minimum?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

***

### minItems?

```ts
optional minItems?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

***

### minLength?

```ts
optional minLength?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

***

### minProperties?

```ts
optional minProperties?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

***

### multipleOf?

```ts
optional multipleOf?: number;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

***

### pattern?

```ts
optional pattern?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

***

### properties?

```ts
optional properties?: object;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L364)

#### ইন্ডেক্স স্বাক্ষর

```ts
[propertyName: string]: P
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

***

### required?

```ts
optional required?: string[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

***

### title?

```ts
optional title?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

***

### type?

```ts
optional type?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:339](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L339)

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

***

### এক্স-ভার-নাম?

```ts
optional x-enum-varnames?: string[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:358](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L358)

***

### xml?

```ts
optional xml?: XML;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)
