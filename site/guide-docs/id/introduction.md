---
lastUpdated: 2026-03-29T16:47:44.960Z
---
# Perkenalan

`tsoa-next` adalah kelanjutan dari asli [`tsoa`](https://github.com/lukeautry/tsoa) proyek, bangunan pada pondasi stabil didirikan di sana oleh Luke Autry dan kontributor.
Ini adalah kerangka kerja dengan terintegrasi OpenAPI kompiler untuk dibangun Node.js aplikasi sisi server- menggunakan TypeScript.
Hal ini dapat menargetkan ekspres, hapi, koa dan frameworks lebih pada waktu berjalan.
`tsoa-next` aplikasi type- aman secara baku dan menangani validasi runtime mulus.

(sedang mereka itu) diikat pada tiang-tiang yang panjang. `tsoa` biasanya mengacu ke CLI perintah dan arsitektur yang mendasarinya `tsoa-next` terus.

## Gol

- TypeScript controller dan model sebagai satu sumber kebenaran untuk API Anda
- Sebuah valid OpenAPI (sebelumnya Swagger) spec (2.0 atau 3.0) dihasilkan dari pengontrol dan model anda, termasuk:
  - Path (mis. GET / Pengguna)
  - Definisi berdasarkan TypeScript antarmuka (model)
  - Properti parameter / model ditandai sebagai dibutuhkan atau opsional berdasarkan TypeScript (mis. My Property?: string adalah opsional dalam OpenAPI spesifikasi)
  - jsDoc didukung untuk deskripsi objek (sebagian besar metadata lain dapat digunakan dari TypeScript tipe)
- Routes dihasilkan untuk middleware pilihan
  - Express, Hapi, dan Koa saat ini didukung, Middleware lain dapat didukung menggunakan template handlebars sederhana
  - Validasi runtime tanpa warna

## Filsafat

- Rely on TypeScript tipe anotasi untuk menghasilkan metadata API bila memungkinkan
- Jika tipe gangguan biasa bukan cara yang tepat untuk mengekspresikan metadata, gunakan dekorator
- Gunakan jsdoc untuk metadata teks murni (misalnya deskripsi titik akhir)
- Minimalkan boilerplate
- Model paling diwakili oleh antarmuka (struktur data murni), tetapi juga dapat diwakili oleh kelas
- Validasi runtime dari `tsoa-next` harus berperilaku sedekat mungkin untuk spesifikasi yang dihasilkan OpenAPI 2 / 3 skema menjelaskan. Perbedaan apapun dalam logika validasi diklarifikasi dengan peringatan log selama generasi OpenAPI Spesifikasi (OAS) dan / atau rute.
  - Harap dicatat bahwa dengan memungkinkan OpenAPI 3 Anda meminimalkan kemungkinan validasi logika divergen sejak OpenAPI 3 memiliki lebih ekspresif sintaks skema.
