---
lastUpdated: 2026-04-20T21:59:41.314Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Components31

# Interface: Componentes31

Definido em: [packages/runtime/src/swagger/swagger.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L89)

## Extensões

- `Omit`\<[`Components`](Components.md), `"schemas"`\>

## Propriedades

### callbacks?

```ts
optional callbacks?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L78)

#### Assinatura do índice

```ts
[name: string]: unknown
```

#### Herdadas de

[`Components`](Components.md).[`callbacks`](Components.md#callbacks)

***

### examples?

```ts
optional examples?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L79)

#### Assinatura do índice

```ts
[name: string]: string | Example3
```

#### Herdadas de

[`Components`](Components.md).[`examples`](Components.md#examples)

***

### headers?

```ts
optional headers?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L80)

#### Assinatura do índice

```ts
[name: string]: unknown
```

#### Herdadas de

[`Components`](Components.md).[`headers`](Components.md#headers)

***

### links?

```ts
optional links?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L81)

#### Assinatura do índice

```ts
[name: string]: unknown
```

#### Herdadas de

[`Components`](Components.md).[`links`](Components.md#links)

***

### parameters?

```ts
optional parameters?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L82)

#### Assinatura do índice

```ts
[name: string]: Parameter3
```

#### Herdadas de

[`Components`](Components.md).[`parameters`](Components.md#parameters)

***

### requestBodies?

```ts
optional requestBodies?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L83)

#### Assinatura do índice

```ts
[name: string]: unknown
```

#### Herdadas de

[`Components`](Components.md).[`requestBodies`](Components.md#requestbodies)

***

### responses?

```ts
optional responses?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L84)

#### Assinatura do índice

```ts
[name: string]: Response
```

#### Herdadas de

[`Components`](Components.md).[`responses`](Components.md#responses)

***

### schemas?

```ts
optional schemas?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L90)

#### Assinatura do índice

```ts
[name: string]: Schema31
```

***

### securitySchemes?

```ts
optional securitySchemes?: object;
```

Definido em: [packages/runtime/src/swagger/swagger.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L86)

#### Assinatura do índice

```ts
[name: string]: SecuritySchemes
```

#### Herdadas de

[`Components`](Components.md).[`securitySchemes`](Components.md#securityschemes)
