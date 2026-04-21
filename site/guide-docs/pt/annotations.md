---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# Esquema JSON / tsoa anotações de palavras-chave

Debaixo do capô, OpenAPI depende fortemente do JSON Schema Draft 00 para todas as especificações do modelo de dados.
JSON Esquema O Rascunho 00 define tipos de dados que não são implementados TypeScript.
Um grande exemplo são números inteiros.
Se quisermos comunicar que um número deve ser um inteiro,
tsoa especificará isso na OEA e validará os pedidos recebidos contra isso.

::: warning
Como sempre, _\$ref_ restrições se aplicam
:::

Em geral, o JSDoc a notação é muito semelhante de cada vez:

```
@<keyword> <argument>* <rejectionMessage>?
```

Exemplos:

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
Para parâmetros, utilizar `@<keyword> <paramName> <argument>* <rejectionMessage>?` sintaxe na sua JSDoc (semelhante a [descriptions](#parameter-descriptions) ou [examples](#parameter-examples))
:::

## Lista de palavras- chave suportadas (com argumentos)

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### Genérico

- `@default`- `@format`

::: danger
Os formatos geralmente não serão validados, exceto para `format: date(time)`, que será gerado automaticamente para o tipo TS `Date`.
:::

### Data

- `@isDateTime <errMsg>` para configurar mensagens de erro personalizadas
- `@isDate <errMsg>` para configurar mensagens de erro personalizadas
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### Numérico

- `@isInt <errMsg>` **tsoa especial** uma vez que TS não sabe inteiro como um tipo
- `@isFloat <errMsg>` **tsoa especial** desde TS não sabe flutuar como um tipo
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

Para as especificações geradas, Swagger 2.0 e OpenAPI 3.0 emite booleano `exclusiveMinimum` / `exclusiveMaximum` modificadores ao lado `minimum` / `maximum`, enquanto OpenAPI 3.1 emite números `exclusiveMinimum` / `exclusiveMaximum` valores directamente.

### String

- `@isString <errMsg>` para configurar mensagens de erro personalizadas
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### Array

- `@isArray <errMsg>` para configurar mensagens de erro personalizadas
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### Booleano

- `@isBoolean <errMsg>` para configurar mensagens de erro personalizadas
