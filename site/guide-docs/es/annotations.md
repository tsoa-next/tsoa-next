---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# JSON Schema / tsoa palabras clave anotaciones

Bajo la capucha, OpenAPI depende en gran medida de JSON Schema Draft 00 para todas las especificaciones del modelo de datos.
JSON Schema Draft 00 define tipos de datos que no se implementan en TypeScript.
Un gran ejemplo son números enteros.
Si queremos comunicar que un número debe ser un entero,
tsoa especifique esto en la OEA y valide las solicitudes entrantes contra eso.

::: warning
Como siempre, _\$ref_ restricciones aplican
:::

En general, JSDoc notación es muy similar cada vez:

```
@<keyword> <argument>* <rejectionMessage>?
```

Ejemplos:

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
Para parámetros, utilice el `@<keyword> <paramName> <argument>* <rejectionMessage>?` sintaxis en tu JSDoc (similar a [descriptions](#parameter-descriptions) o [examples](#parameter-examples))
:::

## Lista de palabras clave apoyadas (con argumentos)

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### Genérico

- `@default`- `@format`

::: danger
Los formatos generalmente no serán validados, excepto para `format: date(time)`, que se generará automáticamente para el tipo TS `Date`.
:::

### Fecha

- `@isDateTime <errMsg>` para establecer mensajes de error personalizados
- `@isDate <errMsg>` para establecer mensajes de error personalizados
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### Numeric

- `@isInt <errMsg>` #tsoa especial** ya que el TS no conoce el entero como un tipo
- `@isFloat <errMsg>` #tsoa especial** ya que el TS no sabe flotar como un tipo
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

Para las especificaciones generadas, Swagger 2.0 y OpenAPI 3.0 emite booleano `exclusiveMinimum` / `exclusiveMaximum` modificadores junto `minimum` / `maximum`, mientras OpenAPI 3.1 emite numérico `exclusiveMinimum` / `exclusiveMaximum` valores directamente.

### String

- `@isString <errMsg>` para establecer mensajes de error personalizados
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### Array

- `@isArray <errMsg>` para establecer mensajes de error personalizados
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### Boolean

- `@isBoolean <errMsg>` para establecer mensajes de error personalizados
