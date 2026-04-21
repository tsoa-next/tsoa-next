---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecGenerator

# Interface: SpecGenerator

Definido em: [packages/runtime/src/decorators/specPath.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L24)

Descreve o contrato em tempo de execução necessário para reconstruir um OpenAPI Documento a pedido.

## Métodos

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L25)

#### Retorna

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L26)

#### Parâmetros

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### Retorna

`Promise`\<`string`\>
