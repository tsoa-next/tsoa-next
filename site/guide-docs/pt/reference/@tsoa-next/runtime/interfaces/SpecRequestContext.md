---
lastUpdated: 2026-04-20T21:59:41.314Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecRequestContext

# Interface: SpecRequestContext

Definido em: [packages/runtime/src/decorators/specPath.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L41)

Contexto com escopo de solicitação passado para personalizado [SpecPath](../functions/SpecPath.md) Comutadores.

## Extensões

- [`SpecCacheContext`](SpecCacheContext.md)

## Propriedades

### cacheKey

```ts
cacheKey: string;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L31)

#### Herdadas de

[`SpecCacheContext`](SpecCacheContext.md).[`cacheKey`](SpecCacheContext.md#cachekey)

***

### controllerClass

```ts
controllerClass: object;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L32)

#### Herdadas de

[`SpecCacheContext`](SpecCacheContext.md).[`controllerClass`](SpecCacheContext.md#controllerclass)

***

### format?

```ts
optional format?: SpecDocumentFormat | "html";
```

Definido em: [packages/runtime/src/decorators/specPath.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L37)

#### Herdadas de

[`SpecCacheContext`](SpecCacheContext.md).[`format`](SpecCacheContext.md#format)

***

### fullPath

```ts
fullPath: string;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L33)

#### Herdadas de

[`SpecCacheContext`](SpecCacheContext.md).[`fullPath`](SpecCacheContext.md#fullpath)

***

### path

```ts
path: string;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L34)

#### Herdadas de

[`SpecCacheContext`](SpecCacheContext.md).[`path`](SpecCacheContext.md#path)

***

### request?

```ts
optional request?: unknown;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:42](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L42)

***

### response?

```ts
optional response?: unknown;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:43](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L43)

***

### runtime

```ts
runtime: SpecRuntime;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L35)

#### Herdadas de

[`SpecCacheContext`](SpecCacheContext.md).[`runtime`](SpecCacheContext.md#runtime)

***

### target

```ts
target: 
  | BuiltinSpecPathTarget
  | "custom";
```

Definido em: [packages/runtime/src/decorators/specPath.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L36)

#### Herdadas de

[`SpecCacheContext`](SpecCacheContext.md).[`target`](SpecCacheContext.md#target)

## Métodos

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L44)

#### Retorna

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L45)

#### Parâmetros

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### Retorna

`Promise`\<`string`\>
