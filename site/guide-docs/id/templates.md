---
lastUpdated: 2026-03-29T19:17:04.856Z
---
# Timpa template rute

Jika Anda ingin fungsionalitas yang tsoa tidak menyediakan, maka satu yang kuat (tapi pendekatan berpotensi mahal) adalah untuk menyediakan tsoa dengan templat handlebars gubahan yang digunakan ketika membuat berkas rutinitas.

::: danger
Menggunakan template kustom berarti bahwa Anda akan memiliki waktu yang lebih sulit bermigrasi ke versi baru tsoa karena template Anda berinteraksi dengan tsoa Para pekerja. Jadi, untuk mendapatkan fitur terbaru dan terbaik dari tsoa, silakan gunakan salah satu dari template yang disediakan dengan memilih yang Anda pilih `"middleware"` (yaitu "koa", atau "hapi") dan dengan membuang `"middlewareTemplate"`.
:::

Oke, tapi mengapa Anda ingin menimpa template rute? _

- Apakah Anda menggunakan kerangka server yang belum kita dukung? Jika demikian, maka [please open an issue first](https://github.com/tsoa-next/tsoa-next/issues). Kemungkinan bahwa kita akan mencoba untuk menerima template kustom Anda sebagai salah satu pilihan standar baru. Jika kita tidak dapat mendukung kerangka kerja baru, maka kita akan merekomendasikan template rute gubahan.
- Apakah Anda memiliki persyaratan yang sangat spesifik? Apakah Anda sudah membuka masalah dan memiliki tsoa Komandan memilih untuk tidak mendukung fitur ini? Kemudian templat kustom mungkin memecahkan kebutuhan Anda yang terbaik.

Templat rute dihasilkan dari contoh handlebar yang telah ditentukan sebelumnya. Anda dapat menimpa dan menentukan templat Anda sendiri untuk dipakai
dengan mendefinisikan dalam Anda tsoa.json konfigurasi. Jalur rute dihasilkan berdasarkan pada tipe perantara yang telah didefinisikan.

```js
{
  "entryFile": "...",
  "spec": {
    ...
  },
  "routes": {
    "routesDir": "...",
    "middleware": "express",
    "middlewareTemplate": "custom-template.ts",
    ...
  }
}
```
