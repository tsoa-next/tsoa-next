---
lastUpdated: 2026-04-20T21:59:41.350Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Parameter31

# Интерфейс: Параметр 31

Определено в: [packages/runtime/src/swagger/swagger.ts:205](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L205)

## расширять

- `Omit`\<[`Parameter3`](Parameter3.md), `"schema"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## Свойства

### allowReserved?

```ts
optional allowReserved?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:200](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L200)

#### Унаследованный от

[`Parameter3`](Parameter3.md).[`allowReserved`](Parameter3.md#allowreserved)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:196](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L196)

#### Унаследованный от

[`Parameter3`](Parameter3.md).[`deprecated`](Parameter3.md#deprecated)

***

### description?

```ts
optional description?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:137](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L137)

#### Унаследованный от

[`Parameter3`](Parameter3.md).[`description`](Parameter3.md#description)

***

### example?

```ts
optional example?: unknown;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:201](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L201)

#### Унаследованный от

[`Parameter3`](Parameter3.md).[`example`](Parameter3.md#example)

***

### examples?

```ts
optional examples?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L202)

#### Индексная подпись

```ts
[name: string]: string | Example3
```

#### Унаследованный от

```ts
Omit.examples
```

***

### explode?

```ts
optional explode?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L199)

#### Унаследованный от

[`Parameter3`](Parameter3.md).[`explode`](Parameter3.md#explode)

***

### in

```ts
in: "cookie" | "path" | "query" | "header";
```

Определено в: [packages/runtime/src/swagger/swagger.ts:195](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L195)

#### Унаследованный от

```ts
Omit.in
```

***

### name

```ts
name: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L135)

#### Унаследованный от

[`Parameter3`](Parameter3.md).[`name`](Parameter3.md#name)

***

### required?

```ts
optional required?: boolean;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:136](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L136)

#### Унаследованный от

[`Parameter3`](Parameter3.md).[`required`](Parameter3.md#required)

***

### schema

```ts
schema: Schema31;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:206](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L206)

***

### style?

```ts
optional style?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:198](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L198)

#### Унаследованный от

[`Parameter3`](Parameter3.md).[`style`](Parameter3.md#style)
