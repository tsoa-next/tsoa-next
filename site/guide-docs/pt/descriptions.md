---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# Descrições

Enquanto tsoa pode extrair muita informação do seu TypeScript escrever anotações, que só pode nos levar até agora em termos de documentar o nosso código.
A fim de permanecer fiel aos nossos esforços para evitar duplicações de código, tsoa utilizações JSDoc anotações baseadas sempre que quisermos descrever informações que não fazem parte do sistema de tipo.

::: tip
tsoa não verifica se você fornece descrições.

Recomendamos usar um linter
Nós amamos [Spectral](https://stoplight.io/open-source/spectral)) para garantir que as suas especificações não são apenas corretas,
mas também conter descrições e correto [examples](./examples).
:::

Um grande exemplo para isso são descrições. Você provavelmente concordaria que descrições de endpoint em texto ou marcação são muito úteis para os consumidores obter uma melhor noção de uma API Endpoint através de uma descrição curta como parte de uma documentação renderizada.
Mas desenvolvedores como você também se beneficiam de JSDoc, que é frequentemente exibido diretamente em seu editor quando pairando sobre um método que você pode não estar familiarizado com.
Spoiler: tsoa torna estas duas coisas possíveis.

## Descrições do ponto final

Uma das descrições mais úteis são as descrições do método, ou, na terminologia HTTP, as descrições do endpoint.

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

Passando sobre o nome do método, já podemos ver o resultado em nosso editor:

![Method description](/docs-images/jsdoc-method.png)

Mas isso é apenas metade do benefício.

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

A OEA também reflete essa mudança, assim como a documentação renderizada a partir dessa especificação!

## Descrições dos parâmetros

Mas porquê parar por aí? [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html), vamos ver isso em ação:

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

## Descrição do modelo

Também podemos renderizar descrições no nível do modelo (modelos são interfaces ou classes ou aliases de tipo):

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
Com a introdução do tipo Aliases em tsoa 3, você pode usar isso como um padrão muito poderoso.
Vamos supor por um segundo que nossa API lida Utilizadores identificados por um UUID.
Normalmente, uuids são enviados como strings, no entanto, idealmente, queremos ter certeza de dizer uuid quando queremos uuids.
Dito isso, duplicar a descrição em todo o código é muito esforço, vamos ver como podemos fazer melhor:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>Podemos reutilizar isso em nosso Usuário</summary>

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

Agora, definimos `UUID` como apelido de tipo reutilizável.
Os editores modernos irão exibir bem o texto de informação quando passarmos por cima das referências

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa irá traduzir isso para um componente reutilizável que pode ser referenciado toda vez que você usar esse alias de tipo:

<details><summary>OpenAPI Spec</summary>

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

Que será assim quando renderizado:

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## Descrições da propriedade

::: warning
Você pode esperar ver uma descrição para o `id` Se você definir um.
No entanto, uma vez que será transformado em uma referência ao UUID esquema, a descrição deve ser ignorada,
desde que quaisquer propriedades que são colocadas ao lado de _\$ref_ (OpenAPIO mecanismo de ligação à UUID esquema) deve ser ignorado.

Para mais informações, confira as partes relevantes do [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) e [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## Resumos

tsoa utiliza descrições curtas fornecidas através da JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) anotação e vai usá-lo como o resumo no OpenAPI doc:

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
