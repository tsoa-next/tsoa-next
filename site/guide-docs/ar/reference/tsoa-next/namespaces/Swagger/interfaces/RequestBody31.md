---
lastUpdated: 2026-04-20T21:59:41.350Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / RequestBody31

# Interface: RequestBody31

محددة في: [packages/runtime/src/swagger/swagger.ts:282](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L282)

## Indexable

```ts
[ext: `x-${string}`]: unknown
```

## الممتلكات

### $ref?

```ts
optional $ref?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:286](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L286)

***

### content

```ts
content: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:283](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L283)

#### مؤشر التوقيع

```ts
[requestMediaType: string]: MediaType31
```

***

### description?

```ts
optional description?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:284](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L284)

***

### examples?

```ts
optional examples?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L288)

#### مؤشر التوقيع

```ts
[media: string]: string | Example3
```

***

### required?

```ts
optional required?: boolean;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:285](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L285)

***

### summary?

```ts
optional summary?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:287](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L287)
