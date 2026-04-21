---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidateParam

# Fonction: ValiderParam()

## Signature d'appel

```ts
function ValidateParam<TValue>(options): TValue;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L90)

Valide une valeur d'exécution par rapport à la valeur générée tsoa métadonnées du schéma de route.

### Paramètres de type

#### TValue

`TValue`

### Paramètres

#### options

`ValidateParamOptions`\<`TValue`\>

### Retourne

`TValue`

## Signature d'appel

```ts
function ValidateParam<TValue>(...args): TValue;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:94](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L94)

### Paramètres de type

#### TValue

`TValue`

### Paramètres

#### args

...`ValidateParamTupleArgs`\<`TValue`\>

### Retourne

`TValue`

### Deprecated

Utilisez plutôt la surcharge objet.
