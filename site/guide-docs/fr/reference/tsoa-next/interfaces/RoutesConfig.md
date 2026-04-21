---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RoutesConfig

# Interface : RoutesConfig

Définie dans : [packages/runtime/src/config.ts:235](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L235)

## Propriétés

### authenticationModule?

```ts
optional authenticationModule?: string;
```

Définie dans : [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

Chemin du module d'authentification utilisé par les routes générées.

***

### basePath?

```ts
optional basePath?: string;
```

Définie dans : [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

Le chemin de l'API de base; par exemple le '/v1' dans https://myapi.com/v1

***

### bodyCoercion?

```ts
optional bodyCoercion?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L288)

Indique s'il faut forcer implicitement les paramètres du corps dans un type accepté.

#### Default

```ts
true
```

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

***

### iocModule?

```ts
optional iocModule?: string;
```

Définie dans : [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

Chemin du module IoC, par exemple `./inversify/ioc`.

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

Définie dans : [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

Fournisseur de Middleware.

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

Définie dans : [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

Personnalisé Handlebars chemin de gabarit utilisé au lieu du modèle intergiciel intégré.

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

Définie dans : [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

Passe l'écriture du fichier de route lorsque le contenu généré correspond au fichier existant.

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

***

### routesDir

```ts
routesDir: string;
```

Définie dans : [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

Répertoire où les fichiers de route générés sont écrits.

***

### routesFileName?

```ts
optional routesFileName?: string;
```

Définie dans : [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

Nom de fichier pour le module de route généré.
