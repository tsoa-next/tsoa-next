---
lastUpdated: 2026-04-20T21:59:41.315Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / OAuth2ImplicitSecurity

# Interface : OAuth2Sécurité implicite

Définie dans : [packages/runtime/src/swagger/swagger.ts:523](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L523)

## Prolongation

- `BaseOAuthSecurity`

## Propriétés

### authorizationUrl

```ts
authorizationUrl: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:527](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L527)

***

### description?

```ts
optional description?: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:525](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L525)

#### Dépassements

```ts
BaseOAuthSecurity.description
```

***

### flow

```ts
flow: "implicit";
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:526](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L526)

***

### scopes?

```ts
optional scopes?: OAuthScope;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:489](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L489)

#### Hérité de

```ts
BaseOAuthSecurity.scopes
```

***

### type

```ts
type: "oauth2";
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:524](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L524)
