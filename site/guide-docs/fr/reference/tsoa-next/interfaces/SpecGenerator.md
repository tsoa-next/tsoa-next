---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecGenerator

# Interface : SpecGenerator

Définie dans : [packages/runtime/src/decorators/specPath.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L24)

Décrit le contrat d'exécution nécessaire pour reconstruire OpenAPI document sur demande.

## Méthodes

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L25)

#### Retourne

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L26)

#### Paramètres

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### Retourne

`Promise`\<`string`\>
