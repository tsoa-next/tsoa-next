---
title: FAQ
lang: fr-FR
lastUpdated: 2026-04-17T20:53:42.040Z
---

# FAQ

## Peut J'utilise OpenAPI 3 ou 3.1 au lieu de OpenAPI 2 (anciennement Swagger) ?

Oui. Jeu `spec.specVersion` à `3` ou `3.1` dans votre `tsoa.json` fichier. Voir plus d'options de configuration dans le [`Config`](./reference/tsoa-next/interfaces/Config.md) Référence API.

## Comment puis-je utiliser tsoa avec koa, hapi, ou d'autres cadres ?

Définir la propriété du middleware dans votre tsoa Config. Hors de la boîte, express, hapi et koa sont supportés.
Vous pouvez également fournir un modèle personnalisé, pour plus d'informations, s'il vous plaît vérifier [the guide](./templates.md)

## Comment s'assurer qu'aucune propriété supplémentaire n'intervient à l'exécution

Par défaut, OpenAPI permet aux modèles d'avoir [`additionalProperties`](https://swagger.io/docs/specification/data-models/dictionaries/). Si vous souhaitez vous assurer à l'exécution que les données n'ont que les propriétés définies dans vos modèles, définissez le `noImplicitAdditionalProperties` option dans [`Config`](./reference/tsoa-next/interfaces/Config.md) soit `"silently-remove-extras"` ou `"throw-on-extras"`.
Caveats:

- Les types suivants permettent toujours des propriétés supplémentaires en raison de la nature de leur fonctionnement :
  - Les `any` Type
  - Un type indexé (qui permet explicitement des propriétés supplémentaires) comme `export interface IStringToStringDictionary { [key: string] : string }`- Si vous utilisez tsoa pour un service existant qui a des consommateurs...
  - vous devrez informer vos consommateurs avant de définir `noImplicitAdditionalProperties` à `"throw-on-extras"` puisqu'il s'agirait d'un changement radical (en raison du fait que les organismes de demande qui travaillaient auparavant obtiendraient maintenant une erreur).
- Peu importe, `"noImplicitAdditionalProperties" : "silently-remove-extras"` est un excellent choix à la fois pour l'héritage ET les nouvelles API (puisque cela reflète le comportement des serializers C# et d'autres serializers JSON populaires).

## Traitement des noms de modèles en double

Si vous avez plusieurs modèles avec le même nom, vous pouvez obtenir des erreurs indiquant qu'il y a plusieurs modèles correspondants. Si vous souhaitez désigner une classe/interface comme étant la version « canonique » d'un modèle, ajoutez un élément jsdoc qui le marque comme tel :

```ts
/**
 * @tsoaModel
 */
export interface MyModel {
  ...
}
```

## Comment puis-je tirer le meilleur parti de mon OEA?

Maintenant que vous avez un OpenAPI Spécification (OAS) (swagger.json), vous pouvez utiliser toutes sortes d'outils étonnants qui génèrent la documentation, SDK clients, et plus [here](http://openapi.tools).

## Comment supprimer la limite pour valider les grands tableaux (avec plus de 20 éléments)

Par défaut [Express](https://github.com/expressjs/express) Utilisations [qs](https://github.com/ljharb/qs) comme analyseur interne, et sa limitation par défaut pour valider 20 éléments dans le tableau
Pour passer outre cela, vous devez ajouter la configuration suivante à votre configuration express :

```ts
const app = express()

app.set('query parser', function (str) {
  return qs.parse(str, { arrayLimit: Infinity })
})

app.use(bodyParser.json())
app.use(Router())
```

Veuillez noter que vous devez le placer sur d'autres intergiciels.
