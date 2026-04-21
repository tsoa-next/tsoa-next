---
lastUpdated: 2026-04-20T21:59:41.314Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Components31

# Antar muka: Komponen 31

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L89)

## Extending

- `Omit`\<[`Components`](Components.md), `"schemas"`\>

## Properti

### callbacks?

```ts
optional callbacks?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L78)

#### Tanda tangan indeks

```ts
[name: string]: unknown
```

#### Diwarisi dari

[`Components`](Components.md).[`callbacks`](Components.md#callbacks)

***

### examples?

```ts
optional examples?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L79)

#### Tanda tangan indeks

```ts
[name: string]: string | Example3
```

#### Diwarisi dari

[`Components`](Components.md).[`examples`](Components.md#examples)

***

### headers?

```ts
optional headers?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L80)

#### Tanda tangan indeks

```ts
[name: string]: unknown
```

#### Diwarisi dari

[`Components`](Components.md).[`headers`](Components.md#headers)

***

### links?

```ts
optional links?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L81)

#### Tanda tangan indeks

```ts
[name: string]: unknown
```

#### Diwarisi dari

[`Components`](Components.md).[`links`](Components.md#links)

***

### parameters?

```ts
optional parameters?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L82)

#### Tanda tangan indeks

```ts
[name: string]: Parameter3
```

#### Diwarisi dari

[`Components`](Components.md).[`parameters`](Components.md#parameters)

***

### requestBodies?

```ts
optional requestBodies?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L83)

#### Tanda tangan indeks

```ts
[name: string]: unknown
```

#### Diwarisi dari

[`Components`](Components.md).[`requestBodies`](Components.md#requestbodies)

***

### responses?

```ts
optional responses?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L84)

#### Tanda tangan indeks

```ts
[name: string]: Response
```

#### Diwarisi dari

[`Components`](Components.md).[`responses`](Components.md#responses)

***

### schemas?

```ts
optional schemas?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L90)

#### Tanda tangan indeks

```ts
[name: string]: Schema31
```

***

### securitySchemes?

```ts
optional securitySchemes?: object;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L86)

#### Tanda tangan indeks

```ts
[name: string]: SecuritySchemes
```

#### Diwarisi dari

[`Components`](Components.md).[`securitySchemes`](Components.md#securityschemes)
