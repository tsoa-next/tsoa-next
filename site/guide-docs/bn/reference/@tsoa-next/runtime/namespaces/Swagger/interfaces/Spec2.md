---
lastUpdated: 2026-04-20T21:59:41.317Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Spec2

# ইন্টারফেস: spec2

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L18)

## সফল

- [`Spec`](Spec.md)

## বৈশিষ্ট্য

### basePath?

```ts
optional basePath?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L21)

***

### consumes?

```ts
optional consumes?: string[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L23)

***

### definitions?

```ts
optional definitions?: object;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L26)

#### ইন্ডেক্স স্বাক্ষর

```ts
[name: string]: Schema2
```

***

### externalDocs?

```ts
optional externalDocs?: ExternalDocs;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L15)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`Spec`](Spec.md).[`externalDocs`](Spec.md#externaldocs)

***

### host?

```ts
optional host?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L20)

***

### info

```ts
info: Info;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L13)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`Spec`](Spec.md).[`info`](Spec.md#info)

***

### parameters?

```ts
optional parameters?: object;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L27)

#### ইন্ডেক্স স্বাক্ষর

```ts
[name: string]: Parameter2
```

***

### paths

```ts
paths: object;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L25)

#### ইন্ডেক্স স্বাক্ষর

```ts
[name: string]: Path
```

***

### produces?

```ts
optional produces?: string[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L24)

***

### responses?

```ts
optional responses?: object;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L28)

#### ইন্ডেক্স স্বাক্ষর

```ts
[name: string]: Response
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L22)

***

### security?

```ts
optional security?: Security[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L29)

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:30](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L30)

#### ইন্ডেক্স স্বাক্ষর

```ts
[name: string]: SecuritySchemes
```

***

### swagger

```ts
swagger: "2.0";
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L19)

***

### tags?

```ts
optional tags?: Tag[];
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L14)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`Spec`](Spec.md).[`tags`](Spec.md#tags)
