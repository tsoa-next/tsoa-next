---
lastUpdated: 2026-04-20T21:59:41.350Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema2

# Interface: Esquema2

Definido em: [packages/runtime/src/swagger/swagger.ts:412](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L412)

## Extensões

- `Omit`\<[`BaseSchema`](BaseSchema.md), `"additionalProperties"` \| `"items"` \| `"properties"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## Propriedades

### $ref?

```ts
optional $ref?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

#### Herdadas de

```ts
Omit.$ref
```

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | Schema2;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:413](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L413)

***

### default?

```ts
optional default?: unknown;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

#### Herdadas de

```ts
Omit.default
```

***

### description?

```ts
optional description?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

#### Herdadas de

```ts
Omit.description
```

***

### discriminator?

```ts
optional discriminator?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L365)

#### Herdadas de

```ts
Omit.discriminator
```

***

### enum?

```ts
optional enum?: (string | number | boolean | null)[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

#### Herdadas de

```ts
Omit.enum
```

***

### example?

```ts
optional example?: unknown;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

#### Herdadas de

```ts
Omit.example
```

***

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:416](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L416)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:417](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L417)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

#### Herdadas de

```ts
Omit.externalDocs
```

***

### format?

```ts
optional format?: DataFormat;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

#### Herdadas de

```ts
Omit.format
```

***

### items?

```ts
optional items?: Schema2;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:414](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L414)

***

### maximum?

```ts
optional maximum?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

#### Herdadas de

```ts
Omit.maximum
```

***

### maxItems?

```ts
optional maxItems?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

#### Herdadas de

```ts
Omit.maxItems
```

***

### maxLength?

```ts
optional maxLength?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

#### Herdadas de

```ts
Omit.maxLength
```

***

### maxProperties?

```ts
optional maxProperties?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

#### Herdadas de

```ts
Omit.maxProperties
```

***

### minimum?

```ts
optional minimum?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

#### Herdadas de

```ts
Omit.minimum
```

***

### minItems?

```ts
optional minItems?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

#### Herdadas de

```ts
Omit.minItems
```

***

### minLength?

```ts
optional minLength?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

#### Herdadas de

```ts
Omit.minLength
```

***

### minProperties?

```ts
optional minProperties?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

#### Herdadas de

```ts
Omit.minProperties
```

***

### multipleOf?

```ts
optional multipleOf?: number;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

#### Herdadas de

```ts
Omit.multipleOf
```

***

### pattern?

```ts
optional pattern?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

#### Herdadas de

```ts
Omit.pattern
```

***

### properties?

```ts
optional properties?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:418](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L418)

#### Assinatura do índice

```ts
[propertyName: string]: Schema2
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

#### Herdadas de

```ts
Omit.readOnly
```

***

### required?

```ts
optional required?: string[];
```

Definido em: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

#### Herdadas de

```ts
Omit.required
```

***

### title?

```ts
optional title?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

#### Herdadas de

```ts
Omit.title
```

***

### type?

```ts
optional type?: DataType;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:415](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L415)

#### Substituição

```ts
Omit.type
```

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

#### Herdadas de

```ts
Omit.uniqueItems
```

***

### "X-depreciado"?

```ts
optional x-deprecated?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:420](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L420)

***

### X-nullable?

```ts
optional x-nullable?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:419](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L419)

***

### xml?

```ts
optional xml?: XML;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)

#### Herdadas de

```ts
Omit.xml
```
