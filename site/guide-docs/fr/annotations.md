---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# Schéma JSON / tsoa annotations de mots clés

Sous le capot, OpenAPI s'appuie fortement sur JSON Schema Draft 00 pour toutes les spécifications du modèle de données.
JSON Schema Draft 00 définit les types de données qui ne sont pas implémentés dans TypeScript.
Un bon exemple sont entiers.
Si nous voulons communiquer qu'un nombre doit être entier,
tsoa précisera cela dans l'OEA et validera les demandes reçues.

::: warning
Comme toujours, les restrictions _\$ref_ s'appliquent
:::

En général, JSDoc la notation est très similaire à chaque fois:

```
@<keyword> <argument>* <rejectionMessage>?
```

Exemples:

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
Pour les paramètres, utilisez le `@<keyword> <paramName> <argument>* <rejectionMessage>?` syntaxe dans votre JSDoc (semblable à [descriptions](#parameter-descriptions) ou [examples](#parameter-examples))
:::

## Liste des mots clés supportés (avec arguments)

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### Générique

- `@default`- `@format`

::: danger
Les formats ne seront généralement pas validés, sauf pour `format: date(time)`, qui sera généré automatiquement pour le type TS `Date`.
:::

### Date

- `@isDateTime <errMsg>` pour définir des messages d'erreur personnalisés
- `@isDate <errMsg>` pour définir des messages d'erreur personnalisés
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### Numérique

- `@isInt <errMsg>` **tsoa special** puisque TS ne connaît pas l'entier comme un type
- `@isFloat <errMsg>` **tsoa spécial** puisque TS ne sait pas flotter comme un type
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

Pour les spécifications générées, Swagger 2.0 et OpenAPI 3.0 émettre du booléen `exclusiveMinimum` / `exclusiveMaximum` modificateurs `minimum` / `maximum`, pendant OpenAPI 3.1 émet des émissions numériques `exclusiveMinimum` / `exclusiveMaximum` valeurs directement.

### Chaîne

- `@isString <errMsg>` pour définir des messages d'erreur personnalisés
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### Tableau

- `@isArray <errMsg>` pour définir des messages d'erreur personnalisés
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### Booléen

- `@isBoolean <errMsg>` pour définir des messages d'erreur personnalisés
