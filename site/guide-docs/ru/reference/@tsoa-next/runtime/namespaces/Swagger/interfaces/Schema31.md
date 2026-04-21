---
lastUpdated: 2026-04-20T21:59:41.317Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Schema31

# Интерфейс: Schema31

Определено в: [packages/runtime/src/swagger/swagger.ts:375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L375)

## расширять

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

## Свойства

### $ref?

```ts
optional $ref?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

#### Унаследованный от

```ts
Omit.$ref
```

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | Schema31;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:381](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L381)

***

### allOf?

```ts
optional allOf?: Schema31[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L387)

***

### anyOf?

```ts
optional anyOf?: Schema31[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L388)

***

### contains?

```ts
optional contains?: Schema31;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:385](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L385)

***

### default?

```ts
optional default?: unknown;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

#### Унаследованный от

```ts
Omit.default
```

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:406](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L406)

#### Унаследованный от

[`Schema3`](Schema3.md).[`deprecated`](Schema3.md#deprecated)

***

### description?

```ts
optional description?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

#### Унаследованный от

```ts
Omit.description
```

***

### discriminator?

```ts
optional discriminator?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:393](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L393)

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

Определено в: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

#### Унаследованный от

```ts
Omit.enum
```

***

### example?

```ts
optional example?: unknown;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

#### Унаследованный от

```ts
Omit.example
```

***

### examples?

```ts
optional examples?: unknown[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:376](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L376)

***

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:377](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L377)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:378](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L378)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

#### Унаследованный от

```ts
Omit.externalDocs
```

***

### format?

```ts
optional format?: DataFormat;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

#### Унаследованный от

```ts
Omit.format
```

***

### items?

```ts
optional items?: false | Schema31;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:383](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L383)

***

### maximum?

```ts
optional maximum?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

#### Унаследованный от

```ts
Omit.maximum
```

***

### maxItems?

```ts
optional maxItems?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

#### Унаследованный от

```ts
Omit.maxItems
```

***

### maxLength?

```ts
optional maxLength?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

#### Унаследованный от

```ts
Omit.maxLength
```

***

### maxProperties?

```ts
optional maxProperties?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

#### Унаследованный от

```ts
Omit.maxProperties
```

***

### minimum?

```ts
optional minimum?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

#### Унаследованный от

```ts
Omit.minimum
```

***

### minItems?

```ts
optional minItems?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

#### Унаследованный от

```ts
Omit.minItems
```

***

### minLength?

```ts
optional minLength?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

#### Унаследованный от

```ts
Omit.minLength
```

***

### minProperties?

```ts
optional minProperties?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

#### Унаследованный от

```ts
Omit.minProperties
```

***

### multipleOf?

```ts
optional multipleOf?: number;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

#### Унаследованный от

```ts
Omit.multipleOf
```

***

### not?

```ts
optional not?: Schema31;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L390)

***

### nullable?

```ts
optional nullable?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:401](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L401)

#### Унаследованный от

[`Schema3`](Schema3.md).[`nullable`](Schema3.md#nullable)

***

### oneOf?

```ts
optional oneOf?: Schema31[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L389)

***

### pattern?

```ts
optional pattern?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

#### Унаследованный от

```ts
Omit.pattern
```

***

### prefixItems?

```ts
optional prefixItems?: Schema31[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:384](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L384)

***

### properties?

```ts
optional properties?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:380](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L380)

#### Индексная подпись

```ts
[key: string]: Schema31
```

***

### propertyNames?

```ts
optional propertyNames?: Schema31;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:391](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L391)

***

### readOnly?

```ts
optional readOnly?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

#### Унаследованный от

```ts
Omit.readOnly
```

***

### required?

```ts
optional required?: string[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

#### Унаследованный от

```ts
Omit.required
```

***

### title?

```ts
optional title?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

#### Унаследованный от

```ts
Omit.title
```

***

### type?

```ts
optional type?: DataType;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:400](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L400)

#### Унаследованный от

[`Schema3`](Schema3.md).[`type`](Schema3.md#type)

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

#### Унаследованный от

```ts
Omit.uniqueItems
```

***

### xml?

```ts
optional xml?: XML;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)

#### Унаследованный от

```ts
Omit.xml
```
