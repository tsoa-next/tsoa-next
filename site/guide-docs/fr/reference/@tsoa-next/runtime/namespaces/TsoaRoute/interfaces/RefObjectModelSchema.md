---
lastUpdated: 2026-04-20T21:59:41.326Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModelSchema

# Interface: RefObjectModelSchema

Définie dans : [packages/runtime/src/routeGeneration/tsoa-route.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L36)

Schéma d'exécution pour les modèles d'objets référencés par des itinéraires générés.

## Propriétés

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Définie dans : [packages/runtime/src/routeGeneration/tsoa-route.ts:39](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L39)

***

### dataType

```ts
dataType: "refObject";
```

Définie dans : [packages/runtime/src/routeGeneration/tsoa-route.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L37)

***

### properties

```ts
properties: object;
```

Définie dans : [packages/runtime/src/routeGeneration/tsoa-route.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L38)

#### Index Signature

```ts
[name: string]: PropertySchema
```
