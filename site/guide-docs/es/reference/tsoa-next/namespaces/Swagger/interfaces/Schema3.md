---
lastUpdated: 2026-04-20T21:59:41.351Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema3

# Interfaz: Schema3

Definido en: [packages/runtime/src/swagger/swagger.ts:399](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L399)

## Extensión

- `Omit`\<[`BaseSchema`](BaseSchema.md), `"additionalProperties"` \| `"items"` \| `"properties"` \| `"type"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## Propiedades

### $ref?

```ts
optional $ref?: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

#### Inhered from

```ts
Omit.$ref
```

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | Schema3;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:402](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L402)

***

### allOf?

```ts
optional allOf?: Schema3[];
```

Definido en: [packages/runtime/src/swagger/swagger.ts:405](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L405)

***

### anyOf?

```ts
optional anyOf?: Schema3[];
```

Definido en: [packages/runtime/src/swagger/swagger.ts:404](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L404)

***

### default?

```ts
optional default?: unknown;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

#### Inhered from

```ts
Omit.default
```

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:406](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L406)

***

### description?

```ts
optional description?: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

#### Inhered from

```ts
Omit.description
```

***

### discriminator?

```ts
optional discriminator?: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L365)

#### Inhered from

```ts
Omit.discriminator
```

***

### enum?

```ts
optional enum?: (string | number | boolean | null)[];
```

Definido en: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

#### Inhered from

```ts
Omit.enum
```

***

### example?

```ts
optional example?: unknown;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

#### Inhered from

```ts
Omit.example
```

***

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:407](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L407)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:408](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L408)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

#### Inhered from

```ts
Omit.externalDocs
```

***

### format?

```ts
optional format?: DataFormat;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

#### Inhered from

```ts
Omit.format
```

***

### items?

```ts
optional items?: Schema3;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:403](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L403)

***

### maximum?

```ts
optional maximum?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

#### Inhered from

```ts
Omit.maximum
```

***

### maxItems?

```ts
optional maxItems?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

#### Inhered from

```ts
Omit.maxItems
```

***

### maxLength?

```ts
optional maxLength?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

#### Inhered from

```ts
Omit.maxLength
```

***

### maxProperties?

```ts
optional maxProperties?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

#### Inhered from

```ts
Omit.maxProperties
```

***

### minimum?

```ts
optional minimum?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

#### Inhered from

```ts
Omit.minimum
```

***

### minItems?

```ts
optional minItems?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

#### Inhered from

```ts
Omit.minItems
```

***

### minLength?

```ts
optional minLength?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

#### Inhered from

```ts
Omit.minLength
```

***

### minProperties?

```ts
optional minProperties?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

#### Inhered from

```ts
Omit.minProperties
```

***

### multipleOf?

```ts
optional multipleOf?: number;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

#### Inhered from

```ts
Omit.multipleOf
```

***

### nullable?

```ts
optional nullable?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:401](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L401)

***

### pattern?

```ts
optional pattern?: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

#### Inhered from

```ts
Omit.pattern
```

***

### properties?

```ts
optional properties?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:409](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L409)

#### Index Signature

```ts
[propertyName: string]: Schema3
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

#### Inhered from

```ts
Omit.readOnly
```

***

### required?

```ts
optional required?: string[];
```

Definido en: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

#### Inhered from

```ts
Omit.required
```

***

### title?

```ts
optional title?: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

#### Inhered from

```ts
Omit.title
```

***

### type?

```ts
optional type?: DataType;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:400](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L400)

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

#### Inhered from

```ts
Omit.uniqueItems
```

***

### xml?

```ts
optional xml?: XML;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)

#### Inhered from

```ts
Omit.xml
```
