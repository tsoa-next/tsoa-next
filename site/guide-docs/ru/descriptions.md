---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# Описание

Хотя tsoa Вы можете извлечь много информации из своего TypeScript Введите аннотации, которые могут привести нас к документированию нашего кода.
Чтобы оставаться верными нашим усилиям по предотвращению дублирования кода, tsoa использование JSDoc аннотации, когда мы хотим описать информацию, которая не является частью системы типов.

::: tip
tsoa Не проверяйте, предоставляете ли вы описания.

Рекомендуем использовать Linter
Мы любим [Spectral](https://stoplight.io/open-source/spectral)) для обеспечения того, чтобы ваши спецификации были не только правильными,
Но также содержат описания и правильные [examples](./examples).
:::

Отличным примером для этого являются описания. Вы, скорее всего, согласитесь с тем, что описания конечных точек в тексте или разметке очень полезны для потребителей, чтобы лучше понять конечную точку API через краткое описание как часть отрисованной документации.
Но такие разработчики, как вы, также выигрывают. JSDocЭто часто отображается непосредственно в вашем редакторе при наведении курсора на метод, с которым вы, возможно, не знакомы.
Спойлер: tsoa Обе эти вещи становятся возможными.

## Описания конечных точек

Одним из наиболее полезных видов описаний являются описания методов или, в терминологии HTTP, описания конечных точек.

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

Зависнув над названием метода, мы уже видим результат в нашем редакторе:

![Method description](/docs-images/jsdoc-method.png)

Но это только половина пользы:

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

ОАГ также отражает эти изменения, а также документацию, представленную в этой спецификации!

## Описание параметров

Но зачем останавливаться на этом? [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html)Давайте посмотрим на это в действии:

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

## Типовые описания

Мы также можем отображать описания на уровне модели (модели - это интерфейсы, классы или псевдонимы типов):

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
С введением типовых алиаз в tsoa 3, вы можете использовать это как очень мощный шаблон.
Предположим на секунду, что наш API обрабатывает Пользователи, идентифицированные UUID.
Обычно uuids отправляются в виде строк, однако в идеале мы хотим убедиться, что говорим uuid, когда хотим uuids.
Тем не менее, дублирование описания по всему коду - это много усилий, давайте посмотрим, как мы можем сделать лучше:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>Мы можем повторно использовать это для нашего пользователя.</summary>

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

Теперь мы определяем `UUID` как псевдоним многоразового типа.
Современные редакторы будут красиво отображать информационный текст, когда мы зависаем над ссылками.

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa Переведет это на многоразовый компонент, на который можно ссылаться каждый раз, когда вы используете псевдоним этого типа:

<details><summary>OpenAPI Специфика</summary>

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

Который будет выглядеть так, когда будет представлен:

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## Описание имущества

::: warning
Вы можете увидеть описание для `id` Если вы установите один.
Однако, поскольку он будет преобразован в ссылку на UUID схема, описание должно быть проигнорировано,
Свойства, расположенные рядом с _\$ref_ ()OpenAPIМеханизм связи с UUID Схему) следует игнорировать.

Для получения дополнительной информации, проверьте соответствующие части [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) и [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## резюме

tsoa использует краткие описания, предоставленные через JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) аннотация и будет использовать его в качестве резюме в OpenAPI Док:

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
