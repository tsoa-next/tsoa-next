---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Mise à niveau tsoa 2,5

[Jump to the breaking changes](#breaking-changes)

> Note historique: les liens de la demande de tirage dans ce guide indiquent intentionnellement: [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa), où ces changements ont initialement atterri.

## Nouvelles fonctionnalités

### Soutien aux alias de type

Cette version est fournie avec le support approprié pour les définitions d'alias de type.

Ils peuvent varier à partir de scénarios simples

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

à des scénarios plus complexes comme les syndicats et les intersections d'alias

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

ou même des alias génériques de type:

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

Veuillez noter que cela signifie que tsoa ne génère pas seulement la spécification (OpenAPI v3 et Swagger2\*), mais validera également l'entrée par rapport aux types y compris les annotations de jsDoc.

\* Il peut y avoir certains scénarios où nous ne pouvons pas générer Swagger 2 de votre TypeScript, tsoa vous informera de tout problème que nous connaissons.

### Prise en charge des types de cartes

> TypeScript 2.1 ont introduit des types de cartes, un ajout puissant au système de type. Essentiellement, les types mappés vous permettent de créer de nouveaux types à partir de ceux existants en mapping sur les types de propriétés. Chaque propriété du type existant est transformée selon une règle que vous spécifiez. Les propriétés transformées composent alors le nouveau type.
> - Marius Schulz, https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa fonctionne maintenant avec le vérificateur de type ts pour résoudre les types mapés. Nous allons essayer activement de soutenir tous les cas, mais la suite de test pour l'instant couvre seulement les types dactylographiés utilitaires avec, comme:

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Soutien aux types conditionnels

Depuis la version 2.8, TypeScript prend en charge les types conditionnels. La syntaxe est très proche de l'opérateur ternaire et permet l'expression de 2 (ou plus) différents types basés sur une condition. Voir [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) pour plus de détails.

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa fonctionne maintenant avec le vérificateur de type ts pour résoudre les types conditionnels. Nous allons essayer activement de soutenir la plupart des cas, mais la suite de test pour le moment couvre uniquement les types d'utilité dactylographiés avec, comme:

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### Soutien aux combinaisons et aux types d'utilité

La combinaison des types cartographiés et conditionnels permet des types d'utilité puissants comme le `Omit` Type.

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Appui `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) ([Eywek](https://github.com/Eywek))

### Enumes: voir [\#594](https://github.com/lukeautry/tsoa/pull/594) pour le Spec et [\#599](https://github.com/lukeautry/tsoa/pull/599) et [\#593](https://github.com/lukeautry/tsoa/pull/593)

### Mot-clé Null : Voir [\#601](https://github.com/lukeautry/tsoa/pull/601)

### Possibilité d'utiliser un délimiteur de côlon au lieu de bracelets en chemin [\#602](https://github.com/lukeautry/tsoa/pull/602)([itamarco](https://github.com/itamarco))

### Ajout du support @exemple pour les paramètres / propriétés [\#616](https://github.com/lukeautry/tsoa/pull/616) ([jfrconley](https://github.com/jfrconley))

### exploit : ignorer les méthodes de classe [\#643](https://github.com/lukeautry/tsoa/pull/643) ([Eywek](https://github.com/Eywek))

### feat: manier les membres enum [\#656](https://github.com/lukeautry/tsoa/pull/656) ([Eywek](https://github.com/Eywek))

### Type de poignée indexé [\#636](https://github.com/lukeautry/tsoa/pull/636) ([Eywek](https://github.com/Eywek))

### poignée `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) ([Eywek](https://github.com/Eywek))

### `@format` soutien aux alias de type [\#620](https://github.com/lukeautry/tsoa/pull/620) ([jfrconley](https://github.com/jfrconley))

## Corrections des bogues

- correctement propager le nom du champ dans valider Modèle [@fantapop](https://github.com/fantapop)

- Aliasé vide Api Types de réponse document 200 réponse au lieu de 204 [\#629](https://github.com/lukeautry/tsoa/pull/629) ([WoH](https://github.com/WoH))

- Valider Erreur doit prolonger Erreur [\#661](https://github.com/lukeautry/tsoa/pull/661) ([aldenquimby](https://github.com/aldenquimby))

- Mettre à niveau koa-router vers @koa/router, corriger les erreurs de type [\#646](https://github.com/lukeautry/tsoa/pull/646) ([michaelbeaumont](https://github.com/michaelbeaumont))
- Supprimer le type d'objet [\#642](https://github.com/lukeautry/tsoa/pull/642) ([dimitor115](https://github.com/dimitor115))
- Correction de l'ajout de propriétés statiques à la définition du modèle [\#639](https://github.com/lukeautry/tsoa/pull/639) ([dimitor115](https://github.com/dimitor115))

## Briser les changements

### Null vs. indéfini

Sauf si vous déclarez un type à accepter `null`, nous ne marquerons plus vos propriétés optionnelles comme `nullable: true` ou `x-nullable: true`.
Ceci s'applique à la validation ainsi, ainsi lors de l'envoi `null` au lieu d'envoyer `undefined` / aucune propriété sur un objet n'était bonne, maintenant ce n'est plus.
Envoi `undefined` au lieu de, i.e. `string | null` est également rejeté par la validation.

### Nom

Afin de prendre en charge les alias de type et d'éviter les conflits de noms, les noms des schémas/définitions des composants générés peuvent avoir changé (les interfaces génériques sont principalement affectées).
Si vous comptez sur les noms de composants générés à partir tsoaC'est une rupture.

Parce que tsoa pris en charge certains alias de type dans le passé et maintenant généré des définitions différemment, cela peut briser votre code.
Si vous vous êtes appuyé sur tsoa ne supportant pas les alias de type correctement pour éviter les problèmes, cela peut briser votre code.
Procéder avec prudence et signaler les problèmes.

### Améliorer la validation des objets imbriqués

Voir [\#574](https://github.com/lukeautry/tsoa/pull/574) et [\#575](https://github.com/lukeautry/tsoa/pull/575).
Ceux-ci ne doivent pas briser les changements, mais comme il affecte la validation, mieux vaut sûr que désolé.

### Modifier le comportement par défaut lorsqu'aucun hôte n'est défini :

Définissez explicitement votre hôte au cas où vous voudriez avoir des urls absolus. C'est une rupture pour ceux qui utilisaient OpenAPI 3, mais il apporte en fait tsoa en parité avec la façon dont nous traitions `host` biens immobiliers Swagger 2. Précédemment OpenAPI 3 utilisateurs ont dû passer `null` que nous avons tous senti étrange. Omission actuelle `host` causera tsoa de supposer que l'url doit être relatif.

### Supprimer .. dans le champErreurs

Lors de la détection de propriétés supplémentaires illégales (si vous utilisez tsoa réglage `additionalProperties: 'throw-on-extras'`), la clé de l'erreur contiendrait un point supplémentaire.

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

Ceci est maintenant fixé et la clé est `TestModel.additionalProp`.

### Utiliser Spec au lieu de Swagger (`tsoa swagger` est toujours disponible pour le moment, mais sera finalement supprimé) [\#664](https://github.com/lukeautry/tsoa/pull/664) ([WoH](https://github.com/WoH))

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoaOui.

```js
{
  "swagger": {}
}
```

devient

```js
{
  "spec": {}
}
```

- Déplacer la configuration partagée au niveau supérieur [\#628](https://github.com/lukeautry/tsoa/pull/628) ([WoH](https://github.com/WoH))

Au lieu de dupliquer la configuration et de gérer beaucoup de cas de bord, la nouvelle configuration est beaucoup plus simple.
Paramètres de configuration, qui impactent les routes et les spécifications sont maintenant situés au niveau supérieur de l'objet de configuration.

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

Cela signifie que si vos paramètres sont différents (par exemple le fichier d'entrée), vous devrez appeler le `generateRoutes()` et `generateSpec()` toi-même.
Notez que ces méthodes ont maintenant une configuration plus simple aswell:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

EntryFile et noImpliciteAdditionnel Les propriétés peuvent maintenant être définies sur le swagger/routes Config.

De plus, les paramètres booléens de noImplicitAdditionalProperties ont été supprimés : #503
Les paramètres valides sont maintenant : `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`, tout le reste revient à `'ignore'`.

**Pour référence, voir l'interface TS de la configuration complète [here](./reference/tsoa-next/interfaces/Config.md)**

### TypeScript Les syndicats sont désormais mis en œuvre en tant que `anyOf` dans OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
