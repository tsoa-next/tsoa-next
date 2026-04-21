---
lastUpdated: 2026-04-20T23:51:24.440Z
---
<!-- This file is generated from README.template.MD by `npm run sync:readmes`. Do not edit directly. -->

<div align="center">
  <a href="https://tsoa-next.dev/" target="_blank" rel="noreferrer">
    <h1>
      <span style="display: inline-flex; align-items: center; gap: 0.35em; white-space: nowrap;">
        <img src="./_media/tsoa-next-logo-590.png" alt="tsoa-next logo" height="40" style="height: 1em; width: auto;" />
        <span>tsoa-next</span>
      </span>
    </h1>
  </a>
Diumumkan begitu

OpenAPI-compliant REST APIs menggunakan TypeScript dan Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## Asal-usul proyek

`tsoa-next` melanjutkan aslinya [`tsoa`](https://github.com/lukeautry/tsoa) proyek.
Repositori asli dan kontributornya mendirikan stabil TypeScript-pertama dan OpenAPI-fondasi pertama pekerjaan ini membangun pada.
Dimana catatan rilis sejarah atau referensi migrasi masih menunjuk hulu, mereka disimpan sengaja untuk provenance.

## Tujuan

- TypeScript controller dan model sebagai satu sumber kebenaran untuk API Anda
- Sebuah valid OpenAPI (sebelumnya Swagger) 2.0, 3.0, atau 3.1 spec dihasilkan dari pengontrol dan model anda, termasuk:
  - Path (mis. GET / users)
  - Definisi berdasarkan TypeScript antarmuka (model)
  - Properti parameter / model ditandai sebagai dibutuhkan atau opsional berdasarkan TypeScript (mis. My Property?: string adalah opsional dalam OpenAPI spesifikasi)
  - jsDoc didukung untuk deskripsi objek (sebagian besar metadata lain dapat digunakan dari TypeScript tipe)
- Routes dihasilkan untuk middleware pilihan
  - Express, Hapi, dan Koa saat ini didukung, Middleware lain dapat didukung menggunakan template handlebars sederhana
  - Permintaan pembayaran validate

## Filosofi

- Rely on TypeScript tipe anotasi untuk menghasilkan metadata API bila memungkinkan
- Jika tipe gangguan biasa bukan cara yang tepat untuk mengekspresikan metadata, gunakan dekorator
- Gunakan jsdoc untuk metadata teks murni (misalnya deskripsi titik akhir)
- Minimalkan boilerplate
- Model paling diwakili oleh antarmuka (struktur data murni), tetapi juga dapat diwakili oleh kelas
- Validasi runtime dari tsoa-next harus berperilaku sedekat mungkin untuk spesifikasi yang dihasilkan OpenAPI Skema menjelaskan. Perbedaan apapun dalam logika validasi diklarifikasi dengan peringatan log selama generasi OpenAPI Spesifikasi (OAS) dan / atau rute.
  - Harap dicatat bahwa dengan memungkinkan OpenAPI 3,0 atau 3.1 Anda meminimalkan kemungkinan validasi logika divergen karena bentuk skema baru lebih ekspresif daripada OpenAPI 2.0.

## Daftar fitur

- Hasilkan OpenAPI 2.0, 3.0, atau 3.1 dokumen langsung dari Anda TypeScript controller, model, dan JSDoc komentar.
- Perlakukan TypeScript controller dan model sebagai sumber kebenaran untuk jalur, parameter, skema, contoh, tag, dan metadata keamanan.
- Hasilkan framework- spesifik penangan rute untuk Express, Koa, dan Hapi, Atau memasok Anda sendiri Handlebars templat untuk kustom runtimes.
- Validate meminta masukan pada waktu-jalan dengan paksaan yang dapat diubah dan penanganan additional- properti yang tetap selaras dengan skema yang dihasilkan.
- Tampilkan titik akhir spec lokal dengan `@SpecPath(...)` tanpa membaca berkas spesifikasi yang dihasilkan dari disk lokal pada waktu permintaan.
- Servis built-in `json`, `yaml`, `swagger`, `redoc`, dan `rapidoc` target spesifikasi, dengan paket UI docs dimuat lazily sebagai peer opsional ketika tersedia.
- Lampirkan banyak `@SpecPath(...)` dekorator untuk pengontrol yang sama selama jalan mereka diselesaikan yang unik.
- Cache built-in atau spec gubahan respon dengan `'none'`, in- proses `'memory'`, atau penanganan cache gubahan yang dapat dibaca dari string atau stream.
- Kembali baik `string` atau `Readable` tanggapan dari gubahan `@SpecPath(...)` penangan untuk dokumentasi Bespoken atau integrations hilir.
- Gunakan `@Validate(...)` untuk menghapus validasi waktu jalan untuk mendukung perpustakaan skema eksternal seperti `zod`, `joi`, `yup`, `superstruct`, atau `io-ts`.
- Menggubah terjemahan validasi dan gagal memformat melalui konteks validasi opsional yang diterima oleh dihasilkan `RegisterRoutes(...)` Fungsi.
- Dukung pengait otentikasi, injeksi ketergantungan, ketik responden alternatif, berkas upload, middleware custom, dan validasi gubahan mengalir.
- Gunakan `tsoa` CLI untuk spesifikasi dan pembuatan rute, atau panggilan aplikasi APIs dari `tsoa-next/cli`.
- Target modern Node.js rilis dengan kebijakan dukungan diverifikasi dalam CI di LTS sebelumnya, LTS saat ini, dan Node Selanjutnya.

## Memulai

- Permintaan:
  - Node.js 22 atau lebih baru
  - npm 10 atau lebih baru
  - Kami memverifikasi dukungan di LTS sebelumnya, LTS saat ini, dan Node vNext dalam CI
- [Dokumentasi](https://tsoa-next.dev/)
- [Referensi API](https://tsoa-next.dev/reference/)
- [Panduan memulai](https://tsoa-next.dev/getting-started)

## API paket

- Impor dekorator, pembantu waktu-jalan, dan dukungan rute yang dihasilkan dari `tsoa-next`
- Impor pembuatan program APIs dari `tsoa-next/cli`
- Gunakan `tsoa` binari untuk CLI perintah generasi

## Contoh

Lihat [panduan](https://tsoa-next.dev/)

Gunakan [repositori playground](https://github.com/tsoa-next/playground) pendamping untuk aplikasi contoh yang dapat dijalankan dan skenario yang berfokus pada server.

Lihat contoh controller di [pengujian](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)

Lihat contoh model di [pengujian](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)

## Bantuan dibutuhkan

### Berkontribusi pada kode

Untuk berkontribusi (melalui PR), lihat terlebih dahulu [Panduan kontribusi](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)
