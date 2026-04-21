---
lastUpdated: 2026-04-20T21:59:41.316Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Parameter3

# 接口:参数3

定义如下: [packages/runtime/src/swagger/swagger.ts:194](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L194)

## 扩展

- `ParameterCommonFields`

## Indexable

```ts
[ext: `x-${string}`]: unknown
```

## 属性

### allowReserved?

```ts
optional allowReserved?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:200](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L200)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:196](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L196)

***

### description?

```ts
optional description?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:137](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L137)

#### 继承自

```ts
ParameterCommonFields.description
```

***

### example?

```ts
optional example?: unknown;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:201](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L201)

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

***

### explode?

```ts
optional explode?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L199)

***

### in

```ts
in: "cookie" | "path" | "query" | "header";
```

定义如下: [packages/runtime/src/swagger/swagger.ts:195](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L195)

***

### name

```ts
name: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L135)

#### 继承自

```ts
ParameterCommonFields.name
```

***

### required?

```ts
optional required?: boolean;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:136](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L136)

#### 继承自

```ts
ParameterCommonFields.required
```

***

### schema

```ts
schema: Schema3;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L197)

***

### style?

```ts
optional style?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:198](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L198)
