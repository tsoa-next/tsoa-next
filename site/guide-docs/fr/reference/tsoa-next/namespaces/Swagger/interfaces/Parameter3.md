---
lastUpdated: 2026-04-20T21:59:41.349Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Parameter3

# Interface : Parameter3

Définie dans : [packages/runtime/src/swagger/swagger.ts:194](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L194)

## Prolongation

- `ParameterCommonFields`

## Indexable

```ts
[ext: `x-${string}`]: unknown
```

## Propriétés

### allowReserved?

```ts
optional allowReserved?: boolean;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:200](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L200)

***

### deprecated?

```ts
optional deprecated?: boolean;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:196](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L196)

***

### description?

```ts
optional description?: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:137](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L137)

#### Hérité de

```ts
ParameterCommonFields.description
```

***

### example?

```ts
optional example?: unknown;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:201](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L201)

***

### examples?

```ts
optional examples?: object;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L202)

#### Index Signature

```ts
[name: string]: string | Example3
```

***

### explode?

```ts
optional explode?: boolean;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L199)

***

### in

```ts
in: "cookie" | "path" | "query" | "header";
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:195](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L195)

***

### name

```ts
name: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L135)

#### Hérité de

```ts
ParameterCommonFields.name
```

***

### required?

```ts
optional required?: boolean;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:136](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L136)

#### Hérité de

```ts
ParameterCommonFields.required
```

***

### schema

```ts
schema: Schema3;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L197)

***

### style?

```ts
optional style?: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:198](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L198)
