---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# Descripción

Mientras tanto tsoa puede extraer mucha información de su TypeScript tipo de anotaciones, que sólo puede llegar hasta ahora en términos de documentar nuestro código.
Para mantenerse fieles a nuestros esfuerzos por evitar la duplicación de códigos, tsoa usos JSDoc anotaciones basadas cuando queremos describir información que no es parte del sistema de tipo.

::: tip
tsoa no verifica si proporciona descripciones.

Recomendamos usar un linter
(nos encanta) [Spectral](https://stoplight.io/open-source/spectral)) para asegurar que sus especificaciones no son sólo correctas,
pero también contienen descripciones y correctas [examples](./examples).
:::

Un gran ejemplo para esto son descripciones. Lo más probable es que estés de acuerdo en que las descripciones de puntos finales, ya sea en texto o marcado, son muy útiles para que los consumidores tengan un mejor sentido de API Endpoint a través de una breve descripción como parte de una documentación renderizada.
Pero los desarrolladores como usted también se benefician de JSDoc, que a menudo se muestra directamente en su editor al pasar por encima de un método que puede no estar familiarizado con.
Spoiler: tsoa hace ambas cosas posibles.

## Descripciones de punto final

Una de las descripciones más útiles son las descripciones de los métodos, o, en la terminología HTTP, las descripciones de puntos finales.

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

Al pasar por encima del nombre del método, ya podemos ver el resultado en nuestro editor:

![Method description](/docs-images/jsdoc-method.png)

Pero esa es la mitad del beneficio:

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

La OEA también refleja este cambio, y también la documentación que se entrega de esa especificaciones!

## Descripciones de parámetros

¿Pero por qué parar ahí? [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html), veamos eso en acción:

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

## Descripción del modelo

También podemos hacer descripciones a nivel de modelo (los modelos son interfaces o clases o alias tipo):

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
Con la introducción del tipo Aliases en tsoa 3, puedes usar esto como un patrón muy poderoso.
Supongamos por un segundo que nuestra API maneja Usuarios identificados por un UUID.
Por lo general, los uuids son enviados como cuerdas, sin embargo, idealmente, queremos asegurarnos de decir uuid cuando queremos uuids.
Dicho esto, duplicar la descripción en todo el código es mucho esfuerzo, veamos cómo podemos hacerlo mejor:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>Podemos reutilizarlo en nuestro Usuario</summary>

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

Ahora, definimos `UUID` como un alias de tipo reutilizable.
Los editores modernos mostrarán bien el texto de la información cuando navegamos por referencias

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa traducirá esto a un componente reutilizable que puede ser referenciado cada vez que utilice ese tipo de alias:

<details><summary>OpenAPI Específico</summary>

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

Lo que parecerá así cuando se haga:

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## Descripción de la propiedad

::: warning
Usted puede esperar ver una descripción para el `id` Si fijas uno.
Sin embargo, ya que se transformará a una referencia a la UUID schema, la descripción debe ser ignorada,
desde las propiedades que se colocan al lado de _\$ref_ (Asuntos)OpenAPI's mecanismo para vincular con el UUID schema) debe ser ignorado.

Para obtener más información, consulte las partes relevantes de la [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) y [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## Resúmenes

tsoa utiliza descripciones cortas proporcionadas a través de JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) anotación y lo utilizará como el resumen en el OpenAPI doc:

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
