---
lastUpdated: 2026-04-20T21:59:41.315Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / OAuth2ImplicitSecurity

# ইন্টারফেস: OABA2x নিরাপত্তা

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:523](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L523)

## সফল

- `BaseOAuthSecurity`

## বৈশিষ্ট্য

### authorizationUrl

```ts
authorizationUrl: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:527](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L527)

***

### description?

```ts
optional description?: string;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:525](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L525)

#### উপেক্ষা করা হবে

```ts
BaseOAuthSecurity.description
```

***

### flow

```ts
flow: "implicit";
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:526](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L526)

***

### scopes?

```ts
optional scopes?: OAuthScope;
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:489](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L489)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
BaseOAuthSecurity.scopes
```

***

### type

```ts
type: "oauth2";
```

নির্ধারিত মান: [packages/runtime/src/swagger/swagger.ts:524](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L524)
