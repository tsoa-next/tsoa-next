---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# Схема Джонсона tsoa Ключевые слова Annotations

Под капотом, OpenAPI JSON Schema Draft 00 используется для всех спецификаций модели данных.
Джон Проект схемы 00 определяет типы данных, которые не TypeScript.
Отличным примером являются целые числа.
Если мы хотим сообщить, что число должно быть целым числом,
tsoa будет указывать это в ОАГ и подтверждать поступающие запросы против этого.

::: warning
Как всегда, применяются ограничения _\$ref_
:::

В целом, JSDoc Примечания очень похожи каждый раз:

```
@<keyword> <argument>* <rejectionMessage>?
```

Примеры:

```typescript {3,4,8,12}
interface CustomerDto {
    /**
     * @isInt we would kindly ask you to provide a number here
     * @minimum 18 minimum age is 18
     */
    age: number;
    /**
     * @minItems 1 at least 1 category is required
     */
    tags: string[];
    /**
     * @pattern ^(.+)@(.+)$ please provide correct email
     */
    email: string;
}
```

::: tip
Для параметров используйте `@<keyword> <paramName> <argument>* <rejectionMessage>?` Синтаксис в вашем JSDoc (похожий на [descriptions](#parameter-descriptions) или [examples](#parameter-examples))
:::

## Список поддерживаемых ключевых слов (с аргументами)

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### общий

- `@default`- `@format`

::: danger
Форматы, как правило, не проверяются, за исключением `format: date(time)`, который будет автоматически генерироваться для типа TS `Date`.
:::

### Дата

- `@isDateTime <errMsg>` Настройка пользовательских сообщений об ошибках
- `@isDate <errMsg>` Настройка пользовательских сообщений об ошибках
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### числовой

- `@isInt <errMsg>` **tsoa Специальный **, поскольку TS не знает целое число как тип
- `@isFloat <errMsg>` **tsoa Специальный **, поскольку TS не знает поплавка как типа
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

Для генерируемых спецификаций, Swagger 2.0 и OpenAPI 3.0 излучает булевый `exclusiveMinimum` / `exclusiveMaximum` Модификаторы рядом `minimum` / `maximum`Пока OpenAPI 3.1 излучает числовой `exclusiveMinimum` / `exclusiveMaximum` ценностей непосредственно.

### Струна

- `@isString <errMsg>` Настройка пользовательских сообщений об ошибках
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### массив

- `@isArray <errMsg>` Настройка пользовательских сообщений об ошибках
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### булевый

- `@isBoolean <errMsg>` Настройка пользовательских сообщений об ошибках
