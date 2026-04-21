---
lastUpdated: 2026-04-20T21:59:41.317Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Spec2

# इंटरफ़ेस: Spec2

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L18)

## विस्तार

- [`Spec`](Spec.md)

## गुण

### basePath?

```ts
optional basePath?: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L21)

***

### consumes?

```ts
optional consumes?: string[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L23)

***

### definitions?

```ts
optional definitions?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L26)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: Schema2
```

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### से विरासत

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### host?

```ts
optional host?: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L20)

***

### info

```ts
info: Info;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### से विरासत

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### parameters?

```ts
optional parameters?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L27)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: Parameter2
```

***

### paths

```ts
paths: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L25)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: Path
```

***

### produces?

```ts
optional produces?: string[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L24)

***

### responses?

```ts
optional responses?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L28)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: Response
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L22)

***

### security?

```ts
optional security?: Security[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L29)

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:30](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L30)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: SecuritySchemes
```

***

### swagger

```ts
swagger: "2.0";
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L19)

***

### tags?

```ts
optional tags?: Tag[];
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### से विरासत

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
