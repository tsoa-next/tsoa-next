---
lastUpdated: 2026-04-20T21:59:41.352Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Spec2

# Interface: Spec2

محددة في: [packages/runtime/src/swagger/swagger.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L18)

## التذييلات

- [`Spec`](Spec.md)

## الممتلكات

### basePath?

```ts
optional basePath?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L21)

***

### consumes?

```ts
optional consumes?: string[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L23)

***

### definitions?

```ts
optional definitions?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L26)

#### مؤشر التوقيع

```ts
[name: string]: Schema2
```

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Inherited from

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### host?

```ts
optional host?: string;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L20)

***

### info

```ts
info: Info;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Inherited from

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### parameters?

```ts
optional parameters?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L27)

#### مؤشر التوقيع

```ts
[name: string]: Parameter2
```

***

### paths

```ts
paths: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L25)

#### مؤشر التوقيع

```ts
[name: string]: Path
```

***

### produces?

```ts
optional produces?: string[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L24)

***

### responses?

```ts
optional responses?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L28)

#### مؤشر التوقيع

```ts
[name: string]: Response
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L22)

***

### security?

```ts
optional security?: Security[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L29)

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

محددة في: [packages/runtime/src/swagger/swagger.ts:30](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L30)

#### مؤشر التوقيع

```ts
[name: string]: SecuritySchemes
```

***

### swagger

```ts
swagger: "2.0";
```

محددة في: [packages/runtime/src/swagger/swagger.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L19)

***

### tags?

```ts
optional tags?: Tag[];
```

محددة في: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Inherited from

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
