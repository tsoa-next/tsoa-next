---
lastUpdated: 2026-04-20T21:59:41.315Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / OAuth2AccessCodeSecurity

# Интерфейс: OAuth2AccessCodeSecurity

Определено в: [packages/runtime/src/swagger/swagger.ts:542](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L542)

## расширять

- `BaseOAuthSecurity`

## Свойства

### authorizationUrl

```ts
authorizationUrl: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L546)

***

### description?

```ts
optional description?: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:479](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L479)

#### Унаследованный от

```ts
BaseOAuthSecurity.description
```

***

### flow

```ts
flow: "accessCode";
```

Определено в: [packages/runtime/src/swagger/swagger.ts:544](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L544)

***

### scopes?

```ts
optional scopes?: OAuthScope;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:489](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L489)

#### Унаследованный от

```ts
BaseOAuthSecurity.scopes
```

***

### tokenUrl

```ts
tokenUrl: string;
```

Определено в: [packages/runtime/src/swagger/swagger.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L545)

***

### type

```ts
type: "oauth2";
```

Определено в: [packages/runtime/src/swagger/swagger.ts:543](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L543)
