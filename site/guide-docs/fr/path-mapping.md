---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### Cartographie des chemins

Pour [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) sous [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> Parfois, les modules ne sont pas directement situés sous baseUrl. Par exemple, une importation dans un module "jquery" serait traduite à l'exécution vers "node_modules\jquery\dist\jquery.slim.min.js". Les chargeurs utilisent une configuration de mappage pour cartographier les noms de modules vers les fichiers au moment de l'exécution, voir la documentation RequireJs et la documentation SystemJS.
>> Les TypeScript compilateur prend en charge la déclaration de ces mappages en utilisant la propriété "paths" dans les fichiers tsconfig.json. Voici un exemple pour spécifier la propriété "paths" pour jquery.

```js
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
    }
  }
}
```

Si vous avez un projet qui utilise cette fonctionnalité, vous pouvez configurer les générateurs internes soit par :

- laissant `tsoa-next` lire les options du compilateur à partir d'un `tsconfig.json`- sur des valeurs spécifiques avec `compilerOptions` dans votre `tsoa` config

`tsconfig.json` est une source d'entrée, et non l'autorité finale. La priorité est:

1. TypeScript par défaut interne
2. résolu `tsconfig.json`3. explicite `compilerOptions` dans `tsoa` config

Si `tsconfig` est omis, `tsoa-next` recherche `tsconfig.json` à partir du chargement `tsoa` répertoire de configuration. Si `tsconfig` est fourni, il est résolu par rapport à ce fichier de configuration.

```js
{
  "tsconfig": "./tsconfig.json",
  "spec": {
    ...
  },
  "routes": {
    ...
  },
  "compilerOptions": {
    "baseUrl": "./path/to/base/url",
    "paths": {
      "exampleLib": ["./path/to/example/lib"]
    }
  }
}
```

Vous pouvez également continuer à fournir des options de compilation directement lorsque vous ne voulez pas compter sur `tsconfig.json`.

```js
{
  "spec": {
    ...
  },
  "routes": {
    ...
  },
   "compilerOptions": {
        "baseUrl": "./path/to/base/url",
        "paths": {
            "exampleLib": "./path/to/example/lib"
        }
    }
}
```
