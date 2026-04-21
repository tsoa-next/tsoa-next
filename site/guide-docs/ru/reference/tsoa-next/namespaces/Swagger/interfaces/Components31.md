---
lastUpdated: 2026-04-20T21:59:41.347Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Components31

# Интерфейс: компоненты31

Определено в: [packages/runtime/src/swagger/swagger.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L89)

## расширять

- `Omit`\<[`Components`](Components.md), `"schemas"`\>

## Свойства

### callbacks?

```ts
optional callbacks?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L78)

#### Индексная подпись

```ts
[name: string]: unknown
```

#### Унаследованный от

[`Components`](Components.md).[`callbacks`](Components.md#callbacks)

***

### examples?

```ts
optional examples?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L79)

#### Индексная подпись

```ts
[name: string]: string | Example3
```

#### Унаследованный от

[`Components`](Components.md).[`examples`](Components.md#examples)

***

### headers?

```ts
optional headers?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L80)

#### Индексная подпись

```ts
[name: string]: unknown
```

#### Унаследованный от

[`Components`](Components.md).[`headers`](Components.md#headers)

***

### links?

```ts
optional links?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L81)

#### Индексная подпись

```ts
[name: string]: unknown
```

#### Унаследованный от

[`Components`](Components.md).[`links`](Components.md#links)

***

### parameters?

```ts
optional parameters?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L82)

#### Индексная подпись

```ts
[name: string]: Parameter3
```

#### Унаследованный от

[`Components`](Components.md).[`parameters`](Components.md#parameters)

***

### requestBodies?

```ts
optional requestBodies?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L83)

#### Индексная подпись

```ts
[name: string]: unknown
```

#### Унаследованный от

[`Components`](Components.md).[`requestBodies`](Components.md#requestbodies)

***

### responses?

```ts
optional responses?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L84)

#### Индексная подпись

```ts
[name: string]: Response
```

#### Унаследованный от

[`Components`](Components.md).[`responses`](Components.md#responses)

***

### schemas?

```ts
optional schemas?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L90)

#### Индексная подпись

```ts
[name: string]: Schema31
```

***

### securitySchemes?

```ts
optional securitySchemes?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L86)

#### Индексная подпись

```ts
[name: string]: SecuritySchemes
```

#### Унаследованный от

[`Components`](Components.md).[`securitySchemes`](Components.md#securityschemes)
