---
lastUpdated: 2026-04-20T21:59:41.347Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Components31

# Interfaz: Componentes31

Definido en: [packages/runtime/src/swagger/swagger.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L89)

## Extensión

- `Omit`\<[`Components`](Components.md), `"schemas"`\>

## Propiedades

### callbacks?

```ts
optional callbacks?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L78)

#### Index Signature

```ts
[name: string]: unknown
```

#### Inhered from

[`Components`](Components.md).[`callbacks`](Components.md#callbacks)

***

### examples?

```ts
optional examples?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L79)

#### Index Signature

```ts
[name: string]: string | Example3
```

#### Inhered from

[`Components`](Components.md).[`examples`](Components.md#examples)

***

### headers?

```ts
optional headers?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L80)

#### Index Signature

```ts
[name: string]: unknown
```

#### Inhered from

[`Components`](Components.md).[`headers`](Components.md#headers)

***

### links?

```ts
optional links?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L81)

#### Index Signature

```ts
[name: string]: unknown
```

#### Inhered from

[`Components`](Components.md).[`links`](Components.md#links)

***

### parameters?

```ts
optional parameters?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L82)

#### Index Signature

```ts
[name: string]: Parameter3
```

#### Inhered from

[`Components`](Components.md).[`parameters`](Components.md#parameters)

***

### requestBodies?

```ts
optional requestBodies?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L83)

#### Index Signature

```ts
[name: string]: unknown
```

#### Inhered from

[`Components`](Components.md).[`requestBodies`](Components.md#requestbodies)

***

### responses?

```ts
optional responses?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L84)

#### Index Signature

```ts
[name: string]: Response
```

#### Inhered from

[`Components`](Components.md).[`responses`](Components.md#responses)

***

### schemas?

```ts
optional schemas?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L90)

#### Index Signature

```ts
[name: string]: Schema31
```

***

### securitySchemes?

```ts
optional securitySchemes?: object;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L86)

#### Index Signature

```ts
[name: string]: SecuritySchemes
```

#### Inhered from

[`Components`](Components.md).[`securitySchemes`](Components.md#securityschemes)
