---
lastUpdated: 2026-04-20T21:59:41.348Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / OAuth2ImplicitSecurity

# Interfaz: OAuth2ImplicitSecurity

Definido en: [packages/runtime/src/swagger/swagger.ts:523](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L523)

## Extensión

- `BaseOAuthSecurity`

## Propiedades

### authorizationUrl

```ts
authorizationUrl: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:527](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L527)

***

### description?

```ts
optional description?: string;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:525](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L525)

#### Anulaciones

```ts
BaseOAuthSecurity.description
```

***

### flow

```ts
flow: "implicit";
```

Definido en: [packages/runtime/src/swagger/swagger.ts:526](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L526)

***

### scopes?

```ts
optional scopes?: OAuthScope;
```

Definido en: [packages/runtime/src/swagger/swagger.ts:489](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L489)

#### Inhered from

```ts
BaseOAuthSecurity.scopes
```

***

### type

```ts
type: "oauth2";
```

Definido en: [packages/runtime/src/swagger/swagger.ts:524](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L524)
