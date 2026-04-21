---
lastUpdated: 2026-04-20T21:59:41.348Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / OAuth2ImplicitSecurity

# 接口: OAuth2 非法安全

定义如下: [packages/runtime/src/swagger/swagger.ts:523](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L523)

## 扩展

- `BaseOAuthSecurity`

## 属性

### authorizationUrl

```ts
authorizationUrl: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:527](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L527)

***

### description?

```ts
optional description?: string;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:525](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L525)

#### 覆盖

```ts
BaseOAuthSecurity.description
```

***

### flow

```ts
flow: "implicit";
```

定义如下: [packages/runtime/src/swagger/swagger.ts:526](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L526)

***

### scopes?

```ts
optional scopes?: OAuthScope;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:489](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L489)

#### 继承自

```ts
BaseOAuthSecurity.scopes
```

***

### type

```ts
type: "oauth2";
```

定义如下: [packages/runtime/src/swagger/swagger.ts:524](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L524)
