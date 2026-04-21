---
lastUpdated: 2026-04-20T21:59:41.349Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Parameter3

# Interface: Parâmetro 3

Definido em: [packages/runtime/src/swagger/swagger.ts:194](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L194)

## Extensões

- `ParameterCommonFields`

## Indexable

```ts
[ext: `x-${string}`]: unknown
```

## Propriedades

### allowReserved?

```ts
optional allowReserved?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:200](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L200)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:196](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L196)

***

### description?

```ts
optional description?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:137](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L137)

#### Herdadas de

```ts
ParameterCommonFields.description
```

***

### example?

```ts
optional example?: unknown;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:201](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L201)

***

### examples?

```ts
optional examples?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L202)

#### Assinatura do índice

```ts
[name: string]: string | Example3
```

***

### explode?

```ts
optional explode?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L199)

***

### in

```ts
in: "cookie" | "path" | "query" | "header";
```

Definido em: [packages/runtime/src/swagger/swagger.ts:195](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L195)

***

### name

```ts
name: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L135)

#### Herdadas de

```ts
ParameterCommonFields.name
```

***

### required?

```ts
optional required?: boolean;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:136](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L136)

#### Herdadas de

```ts
ParameterCommonFields.required
```

***

### schema

```ts
schema: Schema3;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L197)

***

### style?

```ts
optional style?: string;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:198](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L198)
