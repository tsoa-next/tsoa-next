---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Ejemplos

Referencia pertinente de API: [`@Example`](./reference/tsoa-next/functions/Example.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md), y [`Controller`](./reference/tsoa-next/classes/Controller.md).

## Aplicaciones de ejemplo ejecutables

Para aplicaciones de muestra de extremo a extremo y configuraciones específicas de marco, utilice el compañero [tsoa-next/playground](https://github.com/tsoa-next/playground) repositorio.
Ese repo es el hogar dedicado para ser ejecutable `tsoa-next` escenarios a través de múltiples integraciones del servidor como ejemplos se añaden allí.

Esta guía se centra en OpenAPI ejemplos y JSDoc ejemplo metadatos dentro de una base de código.
Alcance para el repo de juegos cuando desee una aplicación completa puede clonar, instalar y ejecutar.

Estudio después del estudio muestra que los ejemplos son una parte crucial del aprendizaje de nuevas API ([1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf), [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/), [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf)).
Aunque ciertas cuestiones, como los desajustes de tipo pueden evitarse infiriendo ejemplos del esquema JSON (como los ejemplos) SwaggerUI automáticamente genera\*), a menudo es mucho más intuitivo si proporcionamos ciertos ejemplos nosotros mismos.

\* Lo cual es limitado también, es decir, patrones serán ignorados, y sólo enviar la cadena "estring" cada vez es algo suboptimal si esa cadena realmente lleva significado.

::: tip
tsoa no comprueba tu JSDoc ejemplos.
Ejemplos incorrectos no romperán su compilación, porque OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20).
También puede querer demostrar tsoa's validation :smirk:

Recomendamos usar un linter
(nos encanta) [Spectral](https://stoplight.io/open-source/spectral)) para asegurar que sus especificaciones no son sólo correctas,
pero también contienen [descriptions](./descriptions) y ejemplos correctos.
:::

::: warning
OpenAPI 2 solo permite un ejemplo por modelo/propiedad/parametro.
Si definió más de un ejemplo en OpenAPI 2, tsoa sólo aplicará primero como valor.
OpenAPI ¡Ahora se admiten 3 ejemplos!
:::

## Ejemplos de respuesta

Para dar una respuesta de ejemplo, tsoa ofertas [`@Example()`](./reference/tsoa-next/functions/Example.md) Decorador.

::: tip
Proporcionando el tipo que está escribiendo el ejemplo como un argumento tipo `T` a

```ts
@Example<T>(example: T)
```

no es necesario, pero puede ayudarte a atrapar errores.
:::

Este decorador se utiliza para especificar una respuesta para la respuesta predeterminada,
pero puede agregar ejemplos para otras respuestas ([`@Response()`](./reference/tsoa-next/functions/Response.md), utilizado para respuestas adicionales, a menudo causadas por [errors](./error-handling#specifying-error-response-types-for-openapi) proporcionándoles como el tercer argumento también.

### Respuesta por defecto

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

### Respuestas adicionales

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

## Ejemplos del parámetro

::: warning
Usted puede esperar ver un ejemplo para una referencia de tipo (a un tipo de alias, interfaz o una clase) si usted establece uno.
Sin embargo, ya que se transformará a una referencia (_\$ref_) al esquema, el ejemplo debe ser ignorado,
desde las propiedades que se colocan al lado de _\$ref_ (Asuntos)OpenAPIEs necesario ignorar el mecanismo de enlace con el esquema UserCreationParams.

Para obtener más información, consulte las partes relevantes de la [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) y [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## Ejemplos modelo

::: warning
Ambos OpenAPI 2 y 3 solo admite un solo ejemplo en el modelo.
Si usas más de un ejemplo, sólo aplicará el primero.
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
Cualquier ejemplo con objeto o array debe estar en formato JSON correcto.
De lo contrario, tsoa lanzará errores al generar OEA.
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

## Ejemplos de bienes

::: warning
Usted puede esperar ver un ejemplo para el `id` Si fijas uno.
Sin embargo, ya que se transformará a una referencia a la UUID schema, el ejemplo debe ser ignorado,
desde las propiedades que se colocan al lado de _\$ref_ (Asuntos)OpenAPI's mecanismo para vincular con el UUID schema) debe ser ignorado.

Para obtener más información, consulte las partes relevantes de la [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) y [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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
