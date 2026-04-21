---
lastUpdated: 2026-04-20T21:59:41.316Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Parameter31

# Antar muka: Parameter31

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:205](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L205)

## Extending

- `Omit`\<[`Parameter3`](Parameter3.md), `"schema"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## Properti

### allowReserved?

```ts
optional allowReserved?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:200](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L200)

#### Diwarisi dari

[`Parameter3`](Parameter3.md).[`allowReserved`](Parameter3.md#allowreserved)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:196](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L196)

#### Diwarisi dari

[`Parameter3`](Parameter3.md).[`deprecated`](Parameter3.md#deprecated)

***

### description?

```ts
optional description?: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:137](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L137)

#### Diwarisi dari

[`Parameter3`](Parameter3.md).[`description`](Parameter3.md#description)

***

### example?

```ts
optional example?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:201](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L201)

#### Diwarisi dari

[`Parameter3`](Parameter3.md).[`example`](Parameter3.md#example)

***

### examples?

```ts
optional examples?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L202)

#### Tanda tangan indeks

```ts
[name: string]: string | Example3
```

#### Diwarisi dari

```ts
Omit.examples
```

***

### explode?

```ts
optional explode?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L199)

#### Diwarisi dari

[`Parameter3`](Parameter3.md).[`explode`](Parameter3.md#explode)

***

### in

```ts
in: "cookie" | "path" | "query" | "header";
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:195](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L195)

#### Diwarisi dari

```ts
Omit.in
```

***

### name

```ts
name: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L135)

#### Diwarisi dari

[`Parameter3`](Parameter3.md).[`name`](Parameter3.md#name)

***

### required?

```ts
optional required?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:136](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L136)

#### Diwarisi dari

[`Parameter3`](Parameter3.md).[`required`](Parameter3.md#required)

***

### schema

```ts
schema: Schema31;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:206](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L206)

***

### style?

```ts
optional style?: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:198](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L198)

#### Diwarisi dari

[`Parameter3`](Parameter3.md).[`style`](Parameter3.md#style)
