---
lastUpdated: 2026-03-29T16:47:44.960Z
---
# Présentation

`tsoa-next` est la suite de l'original [`tsoa`](https://github.com/lukeautry/tsoa) projet, en s'appuyant sur la fondation stable établie là par Luke Autry et contributeurs.
C'est un cadre avec une OpenAPI compilateur à construire Node.js applications côté serveur utilisant TypeScript.
Il peut cibler express, hapi, koa et plus de cadres à l'exécution.
`tsoa-next` Les applications sont sans danger par défaut et gèrent la validation d'exécution de manière transparente.

Dans les guides ci-dessous, `tsoa` se réfère généralement à la CLI commande et architecture sous-jacente qui `tsoa-next` continue.

## Objectif

- TypeScript contrôleurs et modèles comme source unique de vérité pour votre API
- A valable OpenAPI (anciennement Swagger) spec (2.0 ou 3.0) est généré à partir de vos contrôleurs et modèles, y compris:
  - Voies (p. ex.
  - Définitions fondées sur TypeScript interfaces (modèles)
  - Paramètres/propriétés du modèle marqués comme requis ou facultatifs sur la base TypeScript (par exemple, ma propriété?) chaîne est optionnelle dans la OpenAPI spec)
  - jsDoc supporté pour les descriptions d'objets (la plupart des autres métadonnées peuvent être déduites de TypeScript types)
- Les itinéraires sont générés pour les intergiciels de choix
  - Express, Hapiet Koa actuellement pris en charge, d'autres middleware peuvent être pris en charge en utilisant un modèle de guidon simple
  - Validation d'exécution sans soudure

## Philosophie

- Répondez TypeScript saisir des annotations pour générer des métadonnées API si possible
- Si les annotations de type régulier ne sont pas un moyen approprié d'exprimer les métadonnées, utilisez des décorateurs
- Utilisez jsdoc pour les métadonnées en texte pur (par exemple, descriptions des paramètres)
- Minimiser la plaque de chaudière
- Les modèles sont mieux représentés par des interfaces (structures de données pures), mais peuvent aussi être représentés par des classes
- Validation du temps d'exécution `tsoa-next` devrait se comporter aussi étroitement que possible avec les spécifications que les produits OpenAPI 2/3 schéma décrit. Toute différence dans la logique de validation est clarifiée par des avertissements de journalisation pendant la génération de la OpenAPI Spécification (OEA) et/ou itinéraires.
  - Veuillez noter qu'en permettant OpenAPI 3 vous minimisez les chances d'une logique de validation divergente depuis OpenAPI 3 a une syntaxe de schéma plus expressive.
