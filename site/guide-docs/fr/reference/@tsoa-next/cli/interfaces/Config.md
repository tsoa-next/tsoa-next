---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / Config

# Interface : Config

Définie dans : [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

Racine tsoa-next la configuration consommée par CLI et les générateurs de programmes.

## Propriétés

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

Définie dans : [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript CompilationOptions à utiliser pendant la génération.
Ceux-ci sont fusionnés sur les options de compilateur résolues à partir de tsconfig.

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Définie dans : [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

Un tableau de path globs qui pointent vers vos contrôleurs de route que vous aimeriez avoir tsoa inclure.

***

### defaultNumberType?

```ts
optional defaultNumberType?: "double" | "float" | "integer" | "long";
```

Définie dans : [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI type de numéro à utiliser pour TypeScript `number` quand aucune annotation plus étroite n'est présente.

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

Définie dans : [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

Le point d'entrée de votre API

***

### ignore?

```ts
optional ignore?: string[];
```

Définie dans : [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

Annuaires à ignorer pendant TypeScript Analyse des métadonnées

***

### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

```ts
optional multerOpts?: Options;
```

Définie dans : [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

Legacy multer options transmises dans le middleware généré.
Les `storage` option n'est pas supportée.

#### Example

```ts
{
     *   "dest": "/tmp"
     * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

Depuis v6.4.0, `RegisterRoutes` peut recevoir `multerOptions` directement.
 Cette option de niveau de configuration sera supprimée dans une version ultérieure.
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Définie dans : [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

Modes qui vous permettent d'empêcher les données d'entrée de entrer dans votre API. Ceci documentera votre décision dans le swagger. yaml et il va activer la validation de la propriété excédentaire (à l'exécution) dans vos itinéraires.

***

### routes

```ts
routes: RoutesConfig;
```

Définie dans : [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

Configuration de génération de route.

***

### spec

```ts
spec: SpecConfig;
```

Définie dans : [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI configuration de génération.

***

### tsconfig?

```ts
optional tsconfig?: string;
```

Définie dans : [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

Chemin vers un fichier tsconfig utilisé comme source d'entrée pour les options de compilateur pendant la génération.
Si elle est omise, tsoa-next va chercher tsconfig.json à partir du chargé tsoa répertoire de configuration.
Compilateur expliciteOptions dans tsoa-next config a toujours priorité sur les valeurs tsconfig.
