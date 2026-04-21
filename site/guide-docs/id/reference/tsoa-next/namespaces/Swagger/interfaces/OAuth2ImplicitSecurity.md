---
lastUpdated: 2026-04-20T21:59:41.348Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / OAuth2ImplicitSecurity

# Antar muka: Keamanan OOtorisasi

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:523](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L523)

## Extending

- `BaseOAuthSecurity`

## Properti

### authorizationUrl

```ts
authorizationUrl: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:527](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L527)

***

### description?

```ts
optional description?: string;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:525](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L525)

#### Timpa

```ts
BaseOAuthSecurity.description
```

***

### flow

```ts
flow: "implicit";
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:526](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L526)

***

### scopes?

```ts
optional scopes?: OAuthScope;
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:489](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L489)

#### Diwarisi dari

```ts
BaseOAuthSecurity.scopes
```

***

### type

```ts
type: "oauth2";
```

Didefinisikan dalam: [packages/runtime/src/swagger/swagger.ts:524](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L524)
