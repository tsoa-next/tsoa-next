---
lastUpdated: 2026-04-20T21:59:41.314Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecRequestContext

# Interfaz: SpecRequestContext

Definido en: [packages/runtime/src/decorators/specPath.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L41)

Contexto aplicado a la medida [SpecPath](../functions/SpecPath.md) manipuladores.

## Extensión

- [`SpecCacheContext`](SpecCacheContext.md)

## Propiedades

### cacheKey

```ts
cacheKey: string;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L31)

#### Inhered from

[`SpecCacheContext`](SpecCacheContext.md).[`cacheKey`](SpecCacheContext.md#cachekey)

***

### controllerClass

```ts
controllerClass: object;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L32)

#### Inhered from

[`SpecCacheContext`](SpecCacheContext.md).[`controllerClass`](SpecCacheContext.md#controllerclass)

***

### format?

```ts
optional format?: SpecDocumentFormat | "html";
```

Definido en: [packages/runtime/src/decorators/specPath.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L37)

#### Inhered from

[`SpecCacheContext`](SpecCacheContext.md).[`format`](SpecCacheContext.md#format)

***

### fullPath

```ts
fullPath: string;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L33)

#### Inhered from

[`SpecCacheContext`](SpecCacheContext.md).[`fullPath`](SpecCacheContext.md#fullpath)

***

### path

```ts
path: string;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L34)

#### Inhered from

[`SpecCacheContext`](SpecCacheContext.md).[`path`](SpecCacheContext.md#path)

***

### request?

```ts
optional request?: unknown;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:42](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L42)

***

### response?

```ts
optional response?: unknown;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:43](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L43)

***

### runtime

```ts
runtime: SpecRuntime;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L35)

#### Inhered from

[`SpecCacheContext`](SpecCacheContext.md).[`runtime`](SpecCacheContext.md#runtime)

***

### target

```ts
target: 
  | BuiltinSpecPathTarget
  | "custom";
```

Definido en: [packages/runtime/src/decorators/specPath.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L36)

#### Inhered from

[`SpecCacheContext`](SpecCacheContext.md).[`target`](SpecCacheContext.md#target)

## Métodos

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L44)

#### Devoluciones

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L45)

#### Parámetros

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### Devoluciones

`Promise`\<`string`\>
