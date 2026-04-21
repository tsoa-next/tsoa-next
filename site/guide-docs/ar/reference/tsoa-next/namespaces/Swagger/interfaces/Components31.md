---
lastUpdated: 2026-04-20T21:59:41.347Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Components31

# Interface: componentss31

محددة في: [packages/runtime/src/swagger/swagger.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L89)

## التذييلات

- `Omit`\<[`Components`](Components.md), `"schemas"`\>

## الممتلكات

### callbacks?

```ts
optional callbacks?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L78)

#### مؤشر التوقيع

```ts
[name: string]: unknown
```

#### Inherited from

[`Components`](Components.md).[`callbacks`](Components.md#callbacks)

***

### examples?

```ts
optional examples?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L79)

#### مؤشر التوقيع

```ts
[name: string]: string | Example3
```

#### Inherited from

[`Components`](Components.md).[`examples`](Components.md#examples)

***

### headers?

```ts
optional headers?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L80)

#### مؤشر التوقيع

```ts
[name: string]: unknown
```

#### Inherited from

[`Components`](Components.md).[`headers`](Components.md#headers)

***

### links?

```ts
optional links?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L81)

#### مؤشر التوقيع

```ts
[name: string]: unknown
```

#### Inherited from

[`Components`](Components.md).[`links`](Components.md#links)

***

### parameters?

```ts
optional parameters?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L82)

#### مؤشر التوقيع

```ts
[name: string]: Parameter3
```

#### Inherited from

[`Components`](Components.md).[`parameters`](Components.md#parameters)

***

### requestBodies?

```ts
optional requestBodies?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L83)

#### مؤشر التوقيع

```ts
[name: string]: unknown
```

#### Inherited from

[`Components`](Components.md).[`requestBodies`](Components.md#requestbodies)

***

### responses?

```ts
optional responses?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L84)

#### مؤشر التوقيع

```ts
[name: string]: Response
```

#### Inherited from

[`Components`](Components.md).[`responses`](Components.md#responses)

***

### schemas?

```ts
optional schemas?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L90)

#### مؤشر التوقيع

```ts
[name: string]: Schema31
```

***

### securitySchemes?

```ts
optional securitySchemes?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L86)

#### مؤشر التوقيع

```ts
[name: string]: SecuritySchemes
```

#### Inherited from

[`Components`](Components.md).[`securitySchemes`](Components.md#securityschemes)
