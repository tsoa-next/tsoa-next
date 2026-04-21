---
title: PSD
lang: id-ID
lastUpdated: 2026-04-17T20:53:42.040Z
---

# PSD

## Bisa Saya menggunakan OpenAPI 3 atau 3.1 bukan OpenAPI 2 (sebelumnya Swagger)?

Ya. Set `spec.specVersion` ke `3` atau `3.1` di `tsoa.json` file. Lihat lebih banyak pilihan konfigurasi dalam [`Config`](./reference/tsoa-next/interfaces/Config.md) Referensi API.

## Bagaimana cara menggunakan tsoa dengan koa, hapi, atau frameworks lainnya?

Mengatur properti middleware di Anda tsoa kepercayaan. Keluar dari kotak, ekspres, hapi dan koa didukung.
Anda juga dapat menyediakan templat ubahan, untuk informasi lebih lanjut, silakan periksa [the guide](./templates.md)

## Bagaimana memastikan tidak ada properti tambahan yang masuk pada waktu-jalan

Secara default, OpenAPI memungkinkan model untuk memiliki [`additionalProperties`](https://swagger.io/docs/specification/data-models/dictionaries/). Jika Anda ingin memastikan saat runtime bahwa data hanya memiliki properti yang didefinisikan dalam model Anda, set `noImplicitAdditionalProperties` pilihan dalam [`Config`](./reference/tsoa-next/interfaces/Config.md) untuk baik `"silently-remove-extras"` atau `"throw-on-extras"`.
Kavaleri:

- Tipe berikut akan selalu memungkinkan sifat tambahan karena sifat cara kerja mereka:
  - The `any` jenis
  - Jenis indeks (yang secara eksplisit memungkinkan properti tambahan) seperti `export interface IStringToStringDictionary { [key: string] : string }`- Jika Anda menggunakan tsoa untuk layanan yang ada yang memiliki konsumen...
  - Anda harus menginformasikan konsumen Anda sebelum pengaturan `noImplicitAdditionalProperties` ke `"throw-on-extras"` karena akan menjadi perubahan yang melanggar (karena fakta bahwa permintaan badan yang sebelumnya bekerja akan mendapatkan kesalahan).
- Apapun itu, `"noImplicitAdditionalProperties" : "silently-remove-extras"` adalah pilihan yang bagus untuk kedua warisan DAN baru APIs (sejak ini mencerminkan perilaku C # serializers dan serialiser JSON populer lainnya).

## Berurusan dengan nama model duplikat

Jika Anda memiliki beberapa model dengan nama yang sama, Anda mungkin mendapatkan kesalahan yang menunjukkan bahwa ada beberapa model yang cocok. Jika Anda ingin menunjuk sebuah kelas / antarmuka sebagai versi model 'canonical', tambahkan elemen jsdoc menandainya seperti itu:

```ts
/**
 * @tsoaModel
 */
export interface MyModel {
  ...
}
```

## Bagaimana saya bisa mendapatkan yang paling dari OAS saya?

Sekarang Anda memiliki OpenAPI Spesifikasi (OAS) (swagger.json), Anda dapat menggunakan semua jenis alat luar biasa yang menghasilkan dokumentasi, klien SDK, dan lebih [here](http://openapi.tools).

## Bagaimana mengesampingkan batas untuk memvalidasi array besar (dengan lebih dari 20 elemen)

Secara default [Express](https://github.com/expressjs/express) gunakan [qs](https://github.com/ljharb/qs) sebagai parser internal, dan yang memiliki batas baku untuk validasi 20 elemen dalam array
untuk membatalkan ini Anda harus menambahkan konfigurasi berikut ke konfigurasi ekspres Anda:

```ts
const app = express()

app.set('query parser', function (str) {
  return qs.parse(str, { arrayLimit: Infinity })
})

app.use(bodyParser.json())
app.use(Router())
```

Harap dicatat bahwa Anda harus menempatkan di atas Middleware lainnya.
