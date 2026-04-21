---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Exemples

Référence IPA pertinente: [`@Example`](./reference/tsoa-next/functions/Example.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md)et [`Controller`](./reference/tsoa-next/classes/Controller.md).

## Exemples d'applications exécutées

Pour des exemples d'applications de bout en bout et des configurations spécifiques au cadre, utilisez le compagnon [tsoa-next/playground](https://github.com/tsoa-next/playground) dépôt.
Cette repo est la maison dédiée à l'exécution `tsoa-next` des scénarios sur plusieurs intégrations de serveurs comme exemples y sont ajoutés.

Ce guide se concentre sur OpenAPI exemples et JSDoc exemple de métadonnées dans une base de code.
Atteindre la repo de terrain de jeu lorsque vous voulez une application complète, vous pouvez cloner, installer et exécuter.

L'étude après étude montre que les exemples sont un élément crucial de l'apprentissage des nouvelles API ([1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf), [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/), [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf)).
Alors que certains problèmes, comme les erreurs de type peuvent être évités en inférant des exemples du schéma JSON (comme les exemples SwaggerUI automatiquement génère\*), il est souvent beaucoup plus intuitif si nous fournissons certains exemples nous-mêmes.

\* Ce qui est limité aussi, c'est-à-dire que les motifs seront ignorés, et envoyer simplement la chaîne "string" à chaque fois est un peu sous-optimal si cette chaîne porte réellement le sens.

::: tip
tsoa ne (encore) pas vérifier votre JSDoc exemples.
Des exemples inexacts ne briseront pas votre compilation, car OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20).
Vous voudrez peut-être aussi démontrer tsoaLa validation :smirk:

Nous vous recommandons d'utiliser un linter
(nous aimons [Spectral](https://stoplight.io/open-source/spectral)) pour s'assurer que vos spécifications ne sont pas juste correctes,
mais aussi contenir [descriptions](./descriptions) et des exemples corrects.
:::

::: warning
OpenAPI 2 ne permet qu'un exemple par modèle/propriété/paramètre.
Si vous avez défini plusieurs exemples OpenAPI 2, tsoa appliquera seulement la première comme valeur.
OpenAPI 3 exemples sont maintenant pris en charge!
:::

## Exemples de réponses

Afin de fournir un exemple de réponse, tsoa offre une [`@Example()`](./reference/tsoa-next/functions/Example.md) Décoratrice.

::: tip
Fournir le type que vous écrivez comme argument type `T` à

```ts
@Example<T>(example: T)
```

n'est pas nécessaire, mais peut vous aider à attraper des bugs.
:::

Ce décorateur est utilisé pour spécifier une réponse par défaut,
mais vous pouvez ajouter des exemples pour d'autres réponses ([`@Response()`](./reference/tsoa-next/functions/Response.md), utilisé pour des réponses supplémentaires, souvent causées par [errors](./error-handling#specifying-error-response-types-for-openapi) en les présentant comme le troisième argument.

### Réponse par défaut

```ts {3-9}
@Route("users")
export class UsersController extends Controller {
  @Example<User>({
    id: "52907745-7672-470e-a803-a2f8feb52944",
    name: "tsoa user",
    email: "hello@tsoa.com",
    phoneNumbers: [],
    status: "Happy",
  })
  @Get("{userId}")
  public async getUser(
    @Path() userId: UUID,
    @Query() name: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

### Autres réponses

```ts {9-17}
@Route("users")
export class UsersController extends Controller {
  /**
   * Add a new user. Remember that the demo API will not persist this data.
   *
   */
  @Post()
  @SuccessResponse("201", "Created") // Custom success response
  @Response<ValidateErrorJSON>(422, "Validation Failed", {
    message: "Validation failed",
    details: {
      requestBody: {
        message: "id is an excess property and therefore not allowed",
        value: "52907745-7672-470e-a803-a2f8feb52944",
      },
    },
  })
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UsersService().create(requestBody);
    return;
  }
}
```

## Exemples de paramètres

::: warning
Vous pouvez vous attendre à voir un exemple pour une référence de type (à un alias de type, une interface ou une classe) si vous en définissez un.
Cependant, puisqu'il sera transformé en une référence (_\$ref_) au schéma, l'exemple doit être ignoré,
depuis toutes les propriétés qui sont placées à côté de _\$ref_ (OpenAPILe mécanisme de liaison avec le schéma UserCreationParams doit être ignoré.

Pour plus d'informations, consultez les parties pertinentes de la [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) et [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {4-5}
@Route("users")
export class UsersController extends Controller {
  /**
   * @example userId "52907745-7672-470e-a803-a2f8feb52944"
   * @example userId "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: UUID,
    @Query() name: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

## Exemples de modèles

::: warning
Les deux OpenAPI 2 et 3 ne prend en charge qu'un seul exemple dans le modèle.
Si vous utilisez plus d'un exemple, il n'appliquera que le premier.
:::

```ts {5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @example "52907745-7672-470e-a803-a2f8feb52944"
 */
export type UUID = string;
```

::: warning
Tout exemple avec objet ou tableau doit être au format JSON correct.
Sinon, tsoa va lancer une erreur en générant l'OEA.
:::

```ts {6-10}
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 *
 *
 * @example {
 *  "id": "52907745-7672-470e-a803-a2f8feb52944",
 *  "name": "John Doe",
 *  "phoneNumbers": []
 * }
 */
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email?: string;

  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

## Exemples de biens

::: warning
Vous pouvez vous attendre à voir un exemple pour le `id` Si vous en avez une.
Cependant, puisqu'il sera transformé en une référence à la UUID schéma, l'exemple doit être ignoré,
depuis toutes les propriétés qui sont placées à côté de _\$ref_ (OpenAPIle mécanisme de liaison avec le UUID schéma) doit être ignoré.

Pour plus d'informations, consultez les parties pertinentes de la [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) et [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {11-13}
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email?: string;

  name: string;

  /**
   * @example "Happy"
   */
  status?: "Happy" | "Sad";

  phoneNumbers: string[];
}
```
