---
lastUpdated: 2026-04-20T21:59:41.348Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / OAuth2AccessCodeSecurity

# Interface : OAuth2AccessCodeSécurité

Définie dans : [packages/runtime/src/swagger/swagger.ts:542](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L542)

## Prolongation

- `BaseOAuthSecurity`

## Propriétés

### authorizationUrl

```ts
authorizationUrl: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L546)

***

### description?

```ts
optional description?: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:479](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L479)

#### Hérité de

```ts
BaseOAuthSecurity.description
```

***

### flow

```ts
flow: "accessCode";
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:544](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L544)

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

### tokenUrl

```ts
tokenUrl: string;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L545)

***

### type

```ts
type: "oauth2";
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:543](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L543)
