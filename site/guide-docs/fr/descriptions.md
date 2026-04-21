---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# Désignation des marchandises

Alors tsoa peut extraire beaucoup d'informations de votre TypeScript Tapez des annotations, qui ne peuvent nous amener qu'à documenter notre code.
Afin de rester fidèle à nos efforts pour éviter la duplication de code, tsoa Utilisations JSDoc des annotations basées chaque fois que nous voulons décrire des informations qui ne font pas partie du système de type.

::: tip
tsoa ne vérifie pas si vous fournissez des descriptions.

Nous vous recommandons d'utiliser un linter
(nous aimons [Spectral](https://stoplight.io/open-source/spectral)) pour s'assurer que vos spécifications ne sont pas juste correctes,
mais aussi contenir des descriptions et corriger [examples](./examples).
:::

Un bon exemple pour cela sont les descriptions. Vous conviendrez très probablement que les descriptions des paramètres dans le texte ou le balisage sont très utiles pour les consommateurs ont une meilleure idée d'un point d'extrémité de l'API grâce à une brève description dans le cadre d'une documentation rendue.
Mais les développeurs comme vous bénéficient également de JSDoc, qui est souvent affiché directement dans votre éditeur lorsque vous survolez une méthode que vous ne connaissez peut-être pas.
Spoiler: tsoa rend ces deux choses possibles.

## Description des points d'extrémité

L'une des descriptions les plus utiles est la description des méthodes ou, dans la terminologie HTTP, la description des paramètres.

```ts {3-6}
@Route("users")
export class UsersController extends Controller {
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

En survolant le nom de la méthode, nous pouvons déjà voir le résultat dans notre éditeur :

![Method description](/docs-images/jsdoc-method.png)

Mais ce n'est que la moitié du bénéfice :

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

L'OEA reflète également ce changement, tout comme la documentation produite à partir de cette spécification!

## Description des paramètres

Mais pourquoi s'arrêter là ? [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html), voyons ça en action:

```ts {6,7}
@Route("users")
export class UsersController extends Controller {
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

## Description des modèles

Nous pouvons aussi rendre des descriptions au niveau du modèle (les modèles sont des interfaces ou des classes ou des alias de type):

```ts {1-6}
/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 */
export interface User {
  id: number;
  email: string;
  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

::: tip
Avec l'introduction de Type Aliases dans tsoa 3, vous pouvez utiliser ceci comme un modèle très puissant.
Supposons une seconde que notre API gère Utilisateurs identifiés par UUID.
Habituellement, les uuids sont envoyés comme des cordes, cependant, idéalement, nous voulons nous assurer que nous disons uuid quand nous voulons uuids.
Cela dit, dupliquer la description partout dans le code est beaucoup d'effort, voyons comment nous pouvons faire mieux:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>Nous pouvons réutiliser cela dans notre Utilisateur</summary>

```ts
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 */
export interface User {
  id: UUID;
  email: string;
  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

</details>

Maintenant, on définit `UUID` comme alias de type réutilisable.
Les éditeurs modernes afficheront bien le texte d'information lorsque nous survolerons les références

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa traduirea cela en un composant réutilisable qui peut être référencé chaque fois que vous utilisez ce type d'alias:

<details><summary>OpenAPI Spécifications</summary>

```yaml
components:
  schemas:
    UUID:
      type: string
      description: "Stringified UUIDv4.\nSee [RFC 4112](https://tools.ietf.org/html/rfc4122)"
      pattern: "[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}"
    User:
      description: "User objects allow you to associate actions performed in the system with the user that performed them.\nThe User object contains common information across every user in the system regardless of status and role."
      properties:
        id:
          $ref: "#/components/schemas/UUID"
```

</details>

Ce qui ressemblera à ça une fois rendu :

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## Description des biens

::: warning
Vous pouvez vous attendre à voir une description `id` Si vous en avez une.
Cependant, puisqu'il sera transformé en une référence à la UUID schéma, la description doit être ignorée,
depuis toutes les propriétés qui sont placées à côté de _\$ref_ (OpenAPIle mécanisme de liaison avec le UUID schéma) doit être ignoré.

Pour plus d'informations, consultez les parties pertinentes de la [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) et [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {8,9,10}
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 */
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email: string;

  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

## Résumés

tsoa utilise des descriptions courtes fournies par l'intermédiaire JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) et l'utilisera comme résumé dans la OpenAPI docteur:

```ts {5}
  /**
   * A very long, verbose, wordy, long-winded, tedious, verbacious, tautological,
   * profuse, expansive, enthusiastic, redundant, flowery, eloquent, articulate,
   * loquacious, garrulous, chatty, extended, babbling description.
   * @summary A concise summary.
   */
  @Get('SummaryMethod')
  public async summaryMethod(): Promise<TestModel> {
    return new ModelService().getModel();
  }
```
