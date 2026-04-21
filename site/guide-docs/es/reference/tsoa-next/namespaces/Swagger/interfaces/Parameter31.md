---
lastUpdated: 2026-04-20T21:59:41.350Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Parameter31

# Interfaz: parámetro31

Definido en: [packages/runtime/src/swagger/swagger.ts:205](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L205)

## Extensión

- `Omit`\<[`Parameter3`](Parameter3.md), `"schema"`\>

## Indexable

```ts
[key: `x-${string}`]: unknown
```

## Propiedades

### allowReserved?

```ts
optional allowReserved?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:200](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L200)

#### Inhered from

[`Parameter3`](Parameter3.md).[`allowReserved`](Parameter3.md#allowreserved)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:196](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L196)

#### Inhered from

[`Parameter3`](Parameter3.md).[`deprecated`](Parameter3.md#deprecated)

***

### description?

```ts
optional description?: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:137](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L137)

#### Inhered from

[`Parameter3`](Parameter3.md).[`description`](Parameter3.md#description)

***

### example?

```ts
optional example?: unknown;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:201](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L201)

#### Inhered from

[`Parameter3`](Parameter3.md).[`example`](Parameter3.md#example)

***

### examples?

```ts
optional examples?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L202)

#### Index Signature

```ts
[name: string]: string | Example3
```

#### Inhered from

```ts
Omit.examples
```

***

### explode?

```ts
optional explode?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L199)

#### Inhered from

[`Parameter3`](Parameter3.md).[`explode`](Parameter3.md#explode)

***

### in

```ts
in: "cookie" | "path" | "query" | "header";
```

Definido en: [packages/runtime/src/swagger/swagger.ts:195](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L195)

#### Inhered from

```ts
Omit.in
```

***

### name

```ts
name: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L135)

#### Inhered from

[`Parameter3`](Parameter3.md).[`name`](Parameter3.md#name)

***

### required?

```ts
optional required?: boolean;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:136](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L136)

#### Inhered from

[`Parameter3`](Parameter3.md).[`required`](Parameter3.md#required)

***

### schema

```ts
schema: Schema31;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:206](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L206)

***

### style?

```ts
optional style?: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:198](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L198)

#### Inhered from

[`Parameter3`](Parameter3.md).[`style`](Parameter3.md#style)
