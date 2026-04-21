---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# JSON স্কীমা / tsoa কি-ওয়ার্ড

মুখর নিচে, OpenAPI JSON স্কীমার এই সকল তথ্য মুছে ফেলা হবে।
JSON স্কীমার মধ্যে অন্তর্ভুক্ত না করা স্কিমার প্রকৃতি সম্পর্কে তথ্য নির্ণয় করা হয় TypeScript. .
একটি ভাল উদাহরণ পূর্ণসংখ্যা।
আমরা যদি যোগাযোগ করতে চাই যে সংখ্যা অবশ্যই পূর্ণসংখ্যা হতে হবে,
tsoa এটি OAS এবং এর বিরুদ্ধে আসা অনুরোধের মধ্যে উল্লেখ করবে।

::: warning
সর্বদা, অর্থাৎ, গুরুত্বের মাত্রা হ্রাস করা হবে (_o)
:::

সাধারণভাবে, JSDoc একই সময়ে একই রকম কথা বলা হয়:

```
@<keyword> <argument>* <rejectionMessage>?
```

উদাহরণ:

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
পরামিতির জন্য প্রয়োগ করা হবে `@<keyword> <paramName> <argument>* <rejectionMessage>?` আপনার মধ্যে ভুল বানান লিখুন JSDoc (মাঝখানে) [descriptions](#parameter-descriptions) অথবা [examples](#parameter-examples)আপনি কি মনে করতে পারেন?
:::

## কী-এর তালিকা বৈধ নয়

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### সাধারণ

- `@default`- `@format`

::: danger
সাধারণত বিন্যাস প্রযোজ্য হবে না কিন্তু বিন্যাস ছাড়া `format: date(time)`তথায় থাকবে আনতনয়না হুরগণ , `Date`. .
:::

### তারিখ

- `@isDateTime <errMsg>` স্বনির্ধারিত হেডারের জন্য ত্রুটি
- `@isDate <errMsg>` স্বনির্ধারিত হেডারের জন্য ত্রুটি
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### সংখ্যাতাত্ত্বিক

- `@isInt <errMsg>` **tsoa TS টাইপ রূপে পূর্ণসংখ্যা পরিচিত নয়
- `@isFloat <errMsg>` **tsoa TS টাইপ হিসেবে সাঁতার জানে না
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

প্রমাণের জন্য, Swagger ২.০ OpenAPI ৩. ০ ধ্বংস বুলিয়ান `exclusiveMinimum` / `exclusiveMaximum` এর সহ `minimum` / `maximum`এবং OpenAPI ৩.১ থেকে উৎপন্ন সংখ্যার পরিমাণ `exclusiveMinimum` / `exclusiveMaximum` সরাসরি।

### স্ট্রিং

- `@isString <errMsg>` স্বনির্ধারিত হেডারের জন্য ত্রুটি
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### অ্যারে

- `@isArray <errMsg>` স্বনির্ধারিত হেডারের জন্য ত্রুটি
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### বুলিয়ান

- `@isBoolean <errMsg>` স্বনির্ধারিত হেডারের জন্য ত্রুটি
