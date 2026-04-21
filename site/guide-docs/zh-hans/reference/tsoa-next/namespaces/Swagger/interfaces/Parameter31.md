---
lastUpdated: 2026-04-20T21:59:41.350Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Parameter31

# 接口:参数31

定义如下: [packages/runtime/src/swagger/swagger.ts:205](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L205)

## 扩展

- `Omit`\<[`Parameter3`](Parameter3.md), `"schema"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## 属性

### allowReserved?

```ts
optional allowReserved?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:200](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L200)

#### 继承自

[`Parameter3`](Parameter3.md).[`allowReserved`](Parameter3.md#allowreserved)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:196](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L196)

#### 继承自

[`Parameter3`](Parameter3.md).[`deprecated`](Parameter3.md#deprecated)

***

### description?

```ts
optional description?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:137](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L137)

#### 继承自

[`Parameter3`](Parameter3.md).[`description`](Parameter3.md#description)

***

### example?

```ts
optional example?: unknown;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:201](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L201)

#### 继承自

[`Parameter3`](Parameter3.md).[`example`](Parameter3.md#example)

***

### examples?

```ts
optional examples?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L202)

#### 索引签名

```ts
[name: string]: string | Example3
```

#### 继承自

```ts
Omit.examples
```

***

### explode?

```ts
optional explode?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L199)

#### 继承自

[`Parameter3`](Parameter3.md).[`explode`](Parameter3.md#explode)

***

### in

```ts
in: "cookie" | "path" | "query" | "header";
```

定义如下: [packages/runtime/src/swagger/swagger.ts:195](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L195)

#### 继承自

```ts
Omit.in
```

***

### name

```ts
name: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L135)

#### 继承自

[`Parameter3`](Parameter3.md).[`name`](Parameter3.md#name)

***

### required?

```ts
optional required?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:136](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L136)

#### 继承自

[`Parameter3`](Parameter3.md).[`required`](Parameter3.md#required)

***

### schema

```ts
schema: Schema31;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:206](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L206)

***

### style?

```ts
optional style?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:198](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L198)

#### 继承自

[`Parameter3`](Parameter3.md).[`style`](Parameter3.md#style)
