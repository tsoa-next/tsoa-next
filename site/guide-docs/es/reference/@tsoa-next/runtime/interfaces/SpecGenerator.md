---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecGenerator

# Interfaz: SpecGenerator

Definido en: [packages/runtime/src/decorators/specPath.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L24)

Describe el contrato de tiempo de ejecución necesario para reconstruir un OpenAPI documento bajo demanda.

## Métodos

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L25)

#### Devoluciones

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L26)

#### Parámetros

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### Devoluciones

`Promise`\<`string`\>
