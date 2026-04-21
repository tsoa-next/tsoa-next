---
lastUpdated: 2026-04-20T21:59:41.315Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / OAuth2ImplicitSecurity

# इंटरफ़ेस: OAuth2ImplicitSecurity

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:523](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L523)

## विस्तार

- `BaseOAuthSecurity`

## गुण

### authorizationUrl

```ts
authorizationUrl: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:527](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L527)

***

### description?

```ts
optional description?: string;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:525](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L525)

#### ओवरराइड

```ts
BaseOAuthSecurity.description
```

***

### flow

```ts
flow: "implicit";
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:526](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L526)

***

### scopes?

```ts
optional scopes?: OAuthScope;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:489](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L489)

#### से विरासत

```ts
BaseOAuthSecurity.scopes
```

***

### type

```ts
type: "oauth2";
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:524](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L524)
