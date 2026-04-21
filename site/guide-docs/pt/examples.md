---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Exemplos

Referência da API relevante: [`@Example`](./reference/tsoa-next/functions/Example.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md), e [`Controller`](./reference/tsoa-next/classes/Controller.md).

## Aplicações de exemplo executáveis

Para aplicativos de amostra de ponta a ponta e configurações específicas de framework, use o companheiro [tsoa-next/playground](https://github.com/tsoa-next/playground) repositório.
Esse acordo é a casa dedicada para correr `tsoa-next` cenários em várias integrações de servidor como exemplos são adicionados lá.

Este guia centra-se em OpenAPI exemplos e JSDoc exemplo de metadados dentro de uma base de códigos.
Alcançar para o repo playground quando você quer um aplicativo completo você pode clonar, instalar e executar.

Estudo após estudo mostra que exemplos são uma parte crucial da aprendizagem de novas APIs ([1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf), [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/), [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf)).
Embora certos problemas, como descompassos tipo podem ser evitados, inferindo exemplos do Esquema JSON (como os exemplos SwaggerUI automaticamente gera\*), é muitas vezes muito mais intuitivo se nós mesmos fornecermos certos exemplos.

\* O que também é limitado, ou seja, padrões serão ignorados, e apenas enviar a string "string" toda vez é um pouco subótima se essa string realmente carrega significado.

::: tip
tsoa não verifique (ainda) a sua JSDoc exemplos.
Exemplos incorretos não irão quebrar sua compilação, porque OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20).
Você também pode querer apenas demonstrar tsoa's validation :smirk:

Recomendamos usar um linter
Nós amamos [Spectral](https://stoplight.io/open-source/spectral)) para garantir que as suas especificações não são apenas corretas,
mas também conter [descriptions](./descriptions) e exemplos correctos.
:::

::: warning
OpenAPI 2 só permite um exemplo por modelo/propriedade/parâmetro.
Se definir mais de um exemplo em OpenAPI 2, tsoa aplicará apenas o primeiro como valor.
OpenAPI 3 exemplos são agora apoiados!
:::

## Exemplos de resposta

A fim de fornecer uma resposta exemplo, tsoa oferece uma [`@Example()`](./reference/tsoa-next/functions/Example.md) Decorador.

::: tip
Fornecendo o tipo que você está escrevendo o exemplo para como um tipo de argumento `T` para

```ts
@Example<T>(example: T)
```

não é necessário, mas pode ajudá-lo a pegar bugs.
:::

Este decorador é usado para especificar uma resposta para a resposta padrão,
mas você pode adicionar exemplos para outras respostas ([`@Response()`](./reference/tsoa-next/functions/Response.md), utilizado para respostas adicionais, frequentemente causadas por [errors](./error-handling#specifying-error-response-types-for-openapi) fornecendo-os como o terceiro argumento também.

### Resposta padrão

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

### Respostas adicionais

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

## Exemplos de parâmetros

::: warning
Você pode esperar ver um exemplo para uma referência de tipo (para um alias tipo, interface ou uma classe) se você definir um.
No entanto, uma vez que ele será transformado em uma referência (_\$ref_) ao esquema, o exemplo deve ser ignorado,
desde que quaisquer propriedades que são colocadas ao lado de _\$ref_ (OpenAPIO mecanismo de ligação ao esquema UserCreationParams) deve ser ignorado.

Para mais informações, confira as partes relevantes do [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) e [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## Exemplos de modelos

::: warning
Ambos OpenAPI 2 e 3 suporta apenas um exemplo no modelo.
Se você usar mais de um exemplo, ele só irá aplicar o primeiro.
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
Qualquer exemplo com objeto ou array deve estar em formato JSON correto.
Caso contrário, tsoa irá lançar erro ao gerar o OAS.
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

## Exemplos de propriedades

::: warning
Você pode esperar ver um exemplo para o `id` Se você definir um.
No entanto, uma vez que será transformado em uma referência ao UUID esquema, o exemplo deve ser ignorado,
desde que quaisquer propriedades que são colocadas ao lado de _\$ref_ (OpenAPIO mecanismo de ligação à UUID esquema) deve ser ignorado.

Para mais informações, confira as partes relevantes do [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) e [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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
