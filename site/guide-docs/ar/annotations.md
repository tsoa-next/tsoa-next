---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# JSON Schema / tsoa شروح كلمة رئيسية

تحت الغطاء OpenAPI ويعتمد اعتماداً كبيراً على مشروع &quot; جون شيما &quot; (JON Schema) لجميع مواصفات نماذج البيانات.
JSON يحدد مشروع &quot; شيما &quot; (Schema Draft 00) أنواع البيانات التي لا تنفذ في TypeScript.
مثال عظيم هو البثور
إذا كنا نريد أن نبلغ أن عددا يجب أن يكون ثلاجة،
tsoa وسيحدد ذلك في منظمة الدول الأمريكية ويصدق على الطلبات الواردة ضد ذلك.

::: warning
كما هو الحال دائماً
:::

بشكل عام JSDoc ويتشابه الإشعار في كل مرة:

```
@<keyword> <argument>* <rejectionMessage>?
```

أمثلة:

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
بالنسبة للبارامترات، استخدام `@<keyword> <paramName> <argument>* <rejectionMessage>?` (سينتاكس) JSDoc (يضحك) [descriptions](#parameter-descriptions) أو [examples](#parameter-examples))
:::

## List of supported keywords (with arguments)

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### الوراثة

- `@default`- `@format`

::: danger
Formats will generally not be validated, except for `format: date(time)`التي ستتولد تلقائياً من نوع TS `Date`.
:::

### التاريخ

- `@isDateTime <errMsg>` وضع رسائل خاطئة
- `@isDate <errMsg>` وضع رسائل خاطئة
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### العدد

- `@isInt <errMsg>` ♪tsoa خاص** بما أن TS لا تعرف النبتر كنوع
- `@isFloat <errMsg>` ♪tsoa خاص** بما أن TS لا تعرف العوامة كنوع
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

للمواصفات المتولدة Swagger 2.0 OpenAPI 3.0 emit boolean `exclusiveMinimum` / `exclusiveMaximum` معوّلات إلى جانب `minimum` / `maximum`بينما OpenAPI 3.1 emmeric `exclusiveMinimum` / `exclusiveMaximum` قيم مباشرة

### String

- `@isString <errMsg>` وضع رسائل خاطئة
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### Array

- `@isArray <errMsg>` وضع رسائل خاطئة
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### Polean

- `@isBoolean <errMsg>` وضع رسائل خاطئة
