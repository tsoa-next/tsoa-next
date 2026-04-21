---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecConfig

# Interface : SpecConfig

Définie dans : [packages/runtime/src/config.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L79)

OpenAPI paramètres de génération.

## Propriétés

### basePath?

```ts
optional basePath?: string;
```

Définie dans : [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

Le chemin de l'API de base; par exemple le 'v1' dans https://myapi.com/v1

***

### contact?

```ts
optional contact?: object;
```

Définie dans : [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

Coordonnées pour l'API publiée.

#### email?

```ts
optional email?: string;
```

L'adresse électronique de la personne-ressource/organisation.

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

Le nom de la personne-ressource ou de l'organisation.

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

URL pointant vers les coordonnées.

##### Default

```ts
npm package author url
```

***

### description?

```ts
optional description?: string;
```

Définie dans : [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

Description de l'API; par défaut à npm description du colis

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

Contrôle `basePath` est préfixé avec `/` lors de la composition OpenAPI 3 URLs du serveur.

Disponible uniquement avec les versions 3 ou 3.1.

***

### host?

```ts
optional host?: string;
```

Définie dans : [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

Nom de l'hôte API pour Swagger 2 sortie, par exemple `localhost:3000`.

***

### license?

```ts
optional license?: string;
```

Définie dans : [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

Licence API; par défaut npm licence de paquet quand présent

***

### name?

```ts
optional name?: string;
```

Définie dans : [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

Nom de l'API; par défaut npm nom du colis

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

Définie dans : [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

Chaîne de modèles pour générer des ids d'opération.
Ceci devrait être un modèle de guidon valide et est fourni
dans le contexte suivant:
  - 'contrôleur Nom' - Nom de chaîne de la classe de contrôleur.
  - "méthode" - Tsoa. Objet de méthode.

#### Default

```ts
'{{titleCase method.name}}'
```

***

### outputDirectory

```ts
outputDirectory: string;
```

Définie dans : [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

Répertoire où le fichier spec généré doit être écrit.

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

Définie dans : [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

Applique une sécurité par défaut à toute l'API.
Peut être dépassé avec `@Security(...)` ou `@NoSecurity()` décorateurs sur contrôleurs ou méthodes.

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Définie dans : [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

Protocoles soutenus pour Swagger Produit 2.

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

Définie dans : [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

Systèmes de sécurité déclarés pour la spécification.

#### Index Signature

```ts
[name: string]: SecuritySchemes
```

***

### servers?

```ts
optional servers?: string[];
```

Définie dans : [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

URLs du serveur pour OpenAPI Produit 3.

Disponible uniquement avec les versions 3 ou 3.1.

***

### spec?

```ts
optional spec?: unknown;
```

Définie dans : [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

Objet fusionné dans la spécification générée.
Les propriétés générées ont toujours priorité sur les valeurs fournies ici.

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

Définie dans : [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

Nom de base de la pelle. Json ou swagger. Oui.

@default: "swagger"

***

### specMerging?

```ts
optional specMerging?: "recursive" | "immediate" | "deepmerge";
```

Définie dans : [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

Contrôle comment `spec` est fusionné dans le document généré.
Valeurs possibles:
 - 'immédiate' remplace seulement les éléments de haut niveau.
 - 'récursive' effectue une fusion profonde en utilisant `merge`.
 - 'deepmerge' effectue une fusion profonde en utilisant `ts-deepmerge`, y compris les tableaux.

#### Default

```ts
'immediate'
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

Définie dans : [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

Majeur OpenAPI version à générer; par défaut vers la version 2 lorsque non spécifiée
Valeurs possibles:
 - 2 : génère OpenAPI version 2.
 - 3 : génère OpenAPI version 3.
 - 3.1: génère OpenAPI version 3.1.

***

### tags?

```ts
optional tags?: Tag[];
```

Définie dans : [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

métadonnées d'étiquettes de haut niveau pour la spécification générée.

***

### termsOfService?

```ts
optional termsOfService?: string;
```

Définie dans : [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

Lien vers la page qui décrit les conditions de service.
Doit être au format URL.

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

Ajoute des titres à la réponse en ligne et aux schémas d'objets du corps des requêtes pour améliorer la génération de clients.

***

### version?

```ts
optional version?: string;
```

Définie dans : [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

Numéro de version de l'API; par défaut pour la version du paquet.

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

Activer le support x-enum-varnames

#### Default

```ts
false
```

***

### yaml?

```ts
optional yaml?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

Écrit la spécification générée comme YAML au lieu de JSON.
