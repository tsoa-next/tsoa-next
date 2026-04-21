---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# Skema JSON / tsoa anotasi kata kunci

Di bawah tenda, OpenAPI sangat bergantung pada JSON Schema Draft 00 untuk semua spesifikasi model data.
JSON Skema Draft 00 mendefinisikan tipe data yang tidak diimplementasikan dalam TypeScript.
Contoh yang bagus adalah bilangan bulat.
Jika kita ingin berkomunikasi bahwa sebuah angka harus berupa bilangan bulat,
tsoa akan menentukan ini dalam OAS dan validasi permintaan masuk terhadap itu.

::: warning
Seperti biasa, _\ $ref _ pembatasan berlaku
:::

Secara umum, JSDoc notasi sangat mirip setiap kali:

```
@<keyword> <argument>* <rejectionMessage>?
```

Contoh:

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
Untuk parameter, gunakan `@<keyword> <paramName> <argument>* <rejectionMessage>?` sintaks dalam Anda JSDoc (Mirip dengan [descriptions](#parameter-descriptions) atau [examples](#parameter-examples))
:::

## Daftar kata kunci yang didukung (dengan argumen)

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### Generik

- `@default`- `@format`

::: danger
Format umumnya tidak akan divalidasi, kecuali `format: date(time)`, yang secara otomatis akan dihasilkan untuk tipe TS `Date`.
:::

### Tanggal

- `@isDateTime <errMsg>` untuk menata pesan galat gubahan
- `@isDate <errMsg>` untuk menata pesan galat gubahan
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### Numerik

- `@isInt <errMsg>` * *tsoa spesial * * sejak TS tidak tahu integer sebagai sebuah tipe
- `@isFloat <errMsg>` * *tsoa khusus * * sejak TS tidak tahu float sebagai tipe
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

Untuk spesifikasi yang dihasilkan, Swagger 2.0 dan OpenAPI 3.0 emisi boolean `exclusiveMinimum` / `exclusiveMaximum` pemodifikasi bersama `minimum` / `maximum`, sementara OpenAPI 3.1 memancarkan numerik `exclusiveMinimum` / `exclusiveMaximum` nilai secara langsung.

### String

- `@isString <errMsg>` untuk menata pesan galat gubahan
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### Array

- `@isArray <errMsg>` untuk menata pesan galat gubahan
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### Boolean

- `@isBoolean <errMsg>` untuk menata pesan galat gubahan
