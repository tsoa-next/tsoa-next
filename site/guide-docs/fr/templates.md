---
lastUpdated: 2026-03-29T19:17:04.856Z
---
# Modèle d'itinéraire supérieur

Si vous voulez la fonctionnalité que tsoa ne fournit pas, alors une approche puissante (mais potentiellement coûteuse) est de fournir tsoa avec un modèle de guidon personnalisé à utiliser lors de la génération du fichier routes.ts.

::: danger
Utilisation d'un modèle personnalisé signifie que vous aurez un temps plus difficile migrer vers de nouvelles versions de tsoa puisque votre modèle interagit avec le tsoa internes. Donc, pour obtenir les dernières et les meilleures fonctionnalités de tsoa, s'il vous plaît utiliser un des modèles fournis en sélectionnant votre choix `"middleware"` (c'est-à-dire "koa", "express", ou "hapi") et en omettant `"middlewareTemplate"`.
:::

_Ok, mais pourquoi voudrais-tu surcharger le modèle de route ? _

- Utilisez-vous un cadre serveur que nous ne soutenons pas encore ? Si oui, alors [please open an issue first](https://github.com/tsoa-next/tsoa-next/issues). Il est probable que nous allons essayer d'accepter votre modèle personnalisé comme l'une des nouvelles options standard. Si nous ne pouvons pas supporter le nouveau cadre, alors nous recommandons un modèle de route personnalisé.
- Avez-vous une exigence très spécifique? Avez-vous déjà ouvert un problème et avez tsoa les responsables ont choisi de ne pas soutenir cette fonctionnalité? Ensuite, un modèle personnalisé peut résoudre vos besoins le mieux.

Les modèles de route sont générés à partir de modèles de guidon prédéfinis. Vous pouvez outrepasser et définir votre propre modèle à utiliser
en le définissant dans votre tsoaConfiguration .json. Les chemins de route sont générés en fonction du type d'intergiciel que vous avez défini.

```js
{
  "entryFile": "...",
  "spec": {
    ...
  },
  "routes": {
    "routesDir": "...",
    "middleware": "express",
    "middlewareTemplate": "custom-template.ts",
    ...
  }
}
```
