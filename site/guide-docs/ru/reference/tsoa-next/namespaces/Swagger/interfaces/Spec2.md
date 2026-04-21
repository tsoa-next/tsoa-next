---
lastUpdated: 2026-04-20T21:59:41.352Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / Spec2

# Интерфейс: Spec2

Определено в: [packages/runtime/src/swagger/swagger.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L18)

## расширять

- [`Spec`](Spec.md)

## Свойства

### basePath?

```ts
optional basePath?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L21)

***

### consumes?

```ts
optional consumes?: string[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L23)

***

### definitions?

```ts
optional definitions?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L26)

#### Индексная подпись

```ts
[name: string]: Schema2
```

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### Унаследованный от

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### host?

```ts
optional host?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L20)

***

### info

```ts
info: Info;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### Унаследованный от

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### parameters?

```ts
optional parameters?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L27)

#### Индексная подпись

```ts
[name: string]: Parameter2
```

***

### paths

```ts
paths: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L25)

#### Индексная подпись

```ts
[name: string]: Path
```

***

### produces?

```ts
optional produces?: string[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L24)

***

### responses?

```ts
optional responses?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L28)

#### Индексная подпись

```ts
[name: string]: Response
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L22)

***

### security?

```ts
optional security?: Security[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L29)

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:30](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L30)

#### Индексная подпись

```ts
[name: string]: SecuritySchemes
```

***

### swagger

```ts
swagger: "2.0";
```

Определено в: [packages/runtime/src/swagger/swagger.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L19)

***

### tags?

```ts
optional tags?: Tag[];
```

Определено в: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### Унаследованный от

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
