---
lastUpdated: 2026-04-20T21:59:41.369Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedRoutesConfig

# Interface : ExtendedRoutesConfig

Définie dans : [cli/src/api.ts:416](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L416)

Config de génération de route normalisée retourné par [validateRoutesConfig](../functions/validateRoutesConfig.md).

## Prolongation

- `RoutesConfig`

## Propriétés

### authenticationModule?

```ts
optional authenticationModule?: string;
```

Définie dans : [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

Chemin du module d'authentification utilisé par les routes générées.

#### Hérité de

```ts
RoutesConfig.authenticationModule
```

***

### basePath?

```ts
optional basePath?: string;
```

Définie dans : [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

Le chemin de l'API de base; par exemple le '/v1' dans https://myapi.com/v1

#### Hérité de

```ts
RoutesConfig.basePath
```

***

### bodyCoercion

```ts
bodyCoercion: boolean;
```

Définie dans : [cli/src/api.ts:419](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L419)

Indique s'il faut forcer implicitement les paramètres du corps dans un type accepté.

#### Default

```ts
true
```

#### Dépassements

```ts
RoutesConfig.bodyCoercion
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Définie dans : [cli/src/api.ts:420](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L420)

***

### entryFile

```ts
entryFile: string;
```

Définie dans : [cli/src/api.ts:417](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L417)

***

### esm?

```ts
optional esm?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

Une fois activé, l'utilisation d'importations de route générées `.js` extensions pour sortie ESM.

#### Default

```ts
false
```

#### Hérité de

```ts
RoutesConfig.esm
```

***

### iocModule?

```ts
optional iocModule?: string;
```

Définie dans : [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

Chemin du module IoC, par exemple `./inversify/ioc`.

#### Hérité de

```ts
RoutesConfig.iocModule
```

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

Définie dans : [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

Fournisseur de Middleware.

#### Hérité de

```ts
RoutesConfig.middleware
```

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

Définie dans : [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

Personnalisé Handlebars chemin de gabarit utilisé au lieu du modèle intergiciel intégré.

#### Hérité de

```ts
RoutesConfig.middlewareTemplate
```

***

### multerOpts?

```ts
optional multerOpts?: Options;
```

Définie dans : [cli/src/api.ts:421](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L421)

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Définie dans : [cli/src/api.ts:418](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L418)

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

Passe l'écriture du fichier de route lorsque le contenu généré correspond au fichier existant.

#### Hérité de

```ts
RoutesConfig.noWriteIfUnchanged
```

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

Lorsque activé, les importations de routes générées conservent `.ts` extensions à l'appui TypeScript 5.7 `rewriteRelativeImportExtensions`.

#### Default

```ts
false
```

#### Hérité de

```ts
RoutesConfig.rewriteRelativeImportExtensions
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

Définie dans : [cli/src/api.ts:422](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L422)

***

### routeGenerator?

```ts
optional routeGenerator?: 
  | string
  | ((metadata, options) => AbstractRouteGenerator<ExtendedRoutesConfig>);
```

Définie dans : [cli/src/api.ts:424](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L424)

***

### routesDir

```ts
routesDir: string;
```

Définie dans : [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

Répertoire où les fichiers de route générés sont écrits.

#### Hérité de

```ts
RoutesConfig.routesDir
```

***

### routesFileName?

```ts
optional routesFileName?: string;
```

Définie dans : [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

Nom de fichier pour le module de route généré.

#### Hérité de

```ts
RoutesConfig.routesFileName
```

***

### runtimeSpecConfig?

```ts
optional runtimeSpecConfig?: RuntimeSpecConfigSnapshot;
```

Définie dans : [cli/src/api.ts:423](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L423)
