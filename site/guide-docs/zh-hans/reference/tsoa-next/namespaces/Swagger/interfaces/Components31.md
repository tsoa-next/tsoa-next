---
lastUpdated: 2026-04-20T21:59:41.347Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Components31

# 接口:组件31

定义如下: [packages/runtime/src/swagger/swagger.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L89)

## 扩展

- `Omit`\<[`Components`](Components.md), `"schemas"`\>

## 属性

### callbacks?

```ts
optional callbacks?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L78)

#### 索引签名

```ts
[name: string]: unknown
```

#### 继承自

[`Components`](Components.md).[`callbacks`](Components.md#callbacks)

***

### examples?

```ts
optional examples?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L79)

#### 索引签名

```ts
[name: string]: string | Example3
```

#### 继承自

[`Components`](Components.md).[`examples`](Components.md#examples)

***

### headers?

```ts
optional headers?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L80)

#### 索引签名

```ts
[name: string]: unknown
```

#### 继承自

[`Components`](Components.md).[`headers`](Components.md#headers)

***

### links?

```ts
optional links?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L81)

#### 索引签名

```ts
[name: string]: unknown
```

#### 继承自

[`Components`](Components.md).[`links`](Components.md#links)

***

### parameters?

```ts
optional parameters?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L82)

#### 索引签名

```ts
[name: string]: Parameter3
```

#### 继承自

[`Components`](Components.md).[`parameters`](Components.md#parameters)

***

### requestBodies?

```ts
optional requestBodies?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L83)

#### 索引签名

```ts
[name: string]: unknown
```

#### 继承自

[`Components`](Components.md).[`requestBodies`](Components.md#requestbodies)

***

### responses?

```ts
optional responses?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L84)

#### 索引签名

```ts
[name: string]: Response
```

#### 继承自

[`Components`](Components.md).[`responses`](Components.md#responses)

***

### schemas?

```ts
optional schemas?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L90)

#### 索引签名

```ts
[name: string]: Schema31
```

***

### securitySchemes?

```ts
optional securitySchemes?: object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L86)

#### 索引签名

```ts
[name: string]: SecuritySchemes
```

#### 继承自

[`Components`](Components.md).[`securitySchemes`](Components.md#securityschemes)
