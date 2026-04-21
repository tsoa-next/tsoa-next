---
lastUpdated: 2026-04-20T21:59:41.351Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Schema3

# 接口: Schema3

定义如下: [packages/runtime/src/swagger/swagger.ts:399](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L399)

## 扩展

- `Omit`\<[`BaseSchema`](BaseSchema.md), `"additionalProperties"` \| `"items"` \| `"properties"` \| `"type"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## 属性

### $ref?

```ts
optional $ref?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:341](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L341)

#### 继承自

```ts
Omit.$ref
```

***

### additionalProperties?

```ts
optional additionalProperties?: boolean | Schema3;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:402](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L402)

***

### allOf?

```ts
optional allOf?: Schema3[];
```

定义如下: [packages/runtime/src/swagger/swagger.ts:405](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L405)

***

### anyOf?

```ts
optional anyOf?: Schema3[];
```

定义如下: [packages/runtime/src/swagger/swagger.ts:404](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L404)

***

### default?

```ts
optional default?: unknown;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:345](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L345)

#### 继承自

```ts
Omit.default
```

***

### deprecated?

```ts
optional deprecated?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:406](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L406)

***

### description?

```ts
optional description?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:343](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L343)

#### 继承自

```ts
Omit.description
```

***

### discriminator?

```ts
optional discriminator?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L365)

#### 继承自

```ts
Omit.discriminator
```

***

### enum?

```ts
optional enum?: (string | number | boolean | null)[];
```

定义如下: [packages/runtime/src/swagger/swagger.ts:357](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L357)

#### 继承自

```ts
Omit.enum
```

***

### example?

```ts
optional example?: unknown;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L369)

#### 继承自

```ts
Omit.example
```

***

### exclusiveMaximum?

```ts
optional exclusiveMaximum?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:407](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L407)

***

### exclusiveMinimum?

```ts
optional exclusiveMinimum?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:408](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L408)

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:368](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L368)

#### 继承自

```ts
Omit.externalDocs
```

***

### format?

```ts
optional format?: DataFormat;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:340](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L340)

#### 继承自

```ts
Omit.format
```

***

### items?

```ts
optional items?: Schema3;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:403](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L403)

***

### maximum?

```ts
optional maximum?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:347](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L347)

#### 继承自

```ts
Omit.maximum
```

***

### maxItems?

```ts
optional maxItems?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:352](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L352)

#### 继承自

```ts
Omit.maxItems
```

***

### maxLength?

```ts
optional maxLength?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:349](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L349)

#### 继承自

```ts
Omit.maxLength
```

***

### maxProperties?

```ts
optional maxProperties?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:355](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L355)

#### 继承自

```ts
Omit.maxProperties
```

***

### minimum?

```ts
optional minimum?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:348](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L348)

#### 继承自

```ts
Omit.minimum
```

***

### minItems?

```ts
optional minItems?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:353](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L353)

#### 继承自

```ts
Omit.minItems
```

***

### minLength?

```ts
optional minLength?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:350](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L350)

#### 继承自

```ts
Omit.minLength
```

***

### minProperties?

```ts
optional minProperties?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L356)

#### 继承自

```ts
Omit.minProperties
```

***

### multipleOf?

```ts
optional multipleOf?: number;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:346](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L346)

#### 继承自

```ts
Omit.multipleOf
```

***

### nullable?

```ts
optional nullable?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:401](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L401)

***

### pattern?

```ts
optional pattern?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:351](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L351)

#### 继承自

```ts
Omit.pattern
```

***

### properties?

```ts
optional properties?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:409](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L409)

#### 索引签名

```ts
[propertyName: string]: Schema3
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:366](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L366)

#### 继承自

```ts
Omit.readOnly
```

***

### required?

```ts
optional required?: string[];
```

定义如下: [packages/runtime/src/swagger/swagger.ts:370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L370)

#### 继承自

```ts
Omit.required
```

***

### title?

```ts
optional title?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:342](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L342)

#### 继承自

```ts
Omit.title
```

***

### type?

```ts
optional type?: DataType;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:400](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L400)

***

### uniqueItems?

```ts
optional uniqueItems?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:354](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L354)

#### 继承自

```ts
Omit.uniqueItems
```

***

### xml?

```ts
optional xml?: XML;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:367](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L367)

#### 继承自

```ts
Omit.xml
```
