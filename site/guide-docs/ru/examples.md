---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Примеры

Соответствующая ссылка API: [`@Example`](./reference/tsoa-next/functions/Example.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md)и [`Controller`](./reference/tsoa-next/classes/Controller.md).

## Запускаемые примеры приложений

Для сквозных образцов приложений и специфичных для фреймворка настроек используйте компаньона [tsoa-next/playground](https://github.com/tsoa-next/playground) хранилище.
Этот репо - выделенный дом для бега `tsoa-next` Сценарии нескольких серверных интеграций в качестве примеров добавлены.

Это руководство фокусируется на OpenAPI примеры и JSDoc Пример метаданных внутри кодовой базы.
Достигните репо игровой площадки, когда вам нужно полное приложение, которое вы можете клонировать, устанавливать и запускать.

Исследование за исследованием показывает, что примеры являются важной частью изучения новых API.[1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf), [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/), [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf)).
Хотя некоторые проблемы, такие как несоответствия типов, можно избежать, выведя примеры из Схемы JSON (например, примеры). SwaggerUI Это часто намного более интуитивно понятно, если мы сами предоставляем определенные примеры.

* Что также ограничено, т.е. шаблоны будут игнорироваться, и просто отправка строки «струна» каждый раз несколько неоптимальна, если эта строка действительно несет смысл.

::: tip
tsoa Не проверяет (пока) JSDoc Примеры.
Неправильные примеры не сломают вашу компиляцию. OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20).
Вы также можете просто продемонстрировать tsoaОригинальное название: Smirk:

Рекомендуем использовать Linter
Мы любим [Spectral](https://stoplight.io/open-source/spectral)) для обеспечения того, чтобы ваши спецификации были не только правильными,
Но также содержат [descriptions](./descriptions) И правильные примеры.
:::

::: warning
OpenAPI 2 допускает только один пример на модель/свойство/параметр.
Если вы определили более одного примера OpenAPI 2, tsoa Применяется только первое значение.
OpenAPI Сейчас поддерживаются 3 примера!
:::

## Примеры ответов

Чтобы дать примерный ответ, tsoa предлагает [`@Example()`](./reference/tsoa-next/functions/Example.md) Декоратор.

::: tip
Предоставляя тип, для которого вы пишете пример, в качестве аргумента типа `T` то

```ts
@Example<T>(example: T)
```

Это не обязательно, но может помочь вам поймать жуков.
:::

Этот декоратор используется для указания ответа по умолчанию,
Но вы можете добавить примеры для других ответов.[`@Response()`](./reference/tsoa-next/functions/Response.md)используется для получения дополнительных ответов, часто вызванных [errors](./error-handling#specifying-error-response-types-for-openapi) И в качестве третьего аргумента.

### Ответ по умолчанию

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

### Дополнительные ответы

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

## Примеры параметров

::: warning
Вы можете ожидать увидеть пример для ссылки типа (на псевдоним типа, интерфейс или класс), если вы установите его.
Однако, поскольку он будет преобразован в ссылку на схему, пример должен быть проигнорирован.
Свойства, расположенные рядом с _\$ref_ ()OpenAPIМеханизм ссылки на схему UserCreationParams должен быть проигнорирован.

Для получения дополнительной информации, проверьте соответствующие части [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) и [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## Примеры моделей

::: warning
Оба OpenAPI 2 и 3 поддерживают только один пример в модели.
Если вы используете более одного примера, он будет применяться только к первому.
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
Любой пример с объектом или массивом должен быть в правильном JSON-формате.
В противном случае tsoa Ошибка возникает при генерации ОАС.
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

## Примеры собственности

::: warning
Вы можете увидеть пример для `id` Если вы установите один.
Однако, поскольку он будет преобразован в ссылку на UUID схема, пример должен быть проигнорирован;
Свойства, расположенные рядом с _\$ref_ ()OpenAPIМеханизм связи с UUID Схему) следует игнорировать.

Для получения дополнительной информации, проверьте соответствующие части [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) и [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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
