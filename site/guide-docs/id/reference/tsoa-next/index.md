---
lastUpdated: 2026-04-20T23:51:24.334Z
---
[tsoa-next](../packages.md) / tsoa-next

<!-- This file is generated from README.template.MD by `npm run sync:readmes`. Do not edit directly. -->

<div align="center">
  <a href="https://tsoa-next.dev/" target="_blank" rel="noreferrer">
    <h1>
      <span style="display: inline-flex; align-items: center; gap: 0.35em; white-space: nowrap;">
        <img src="../_media/tsoa-next-logo-590-1.png" alt="tsoa-next logo" height="40" style="height: 1em; width: auto;" />
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

## Namespace

- [Swagger](namespaces/Swagger/index.md)
- [Tsoa](namespaces/Tsoa/index.md)
- [TsoaRoute](namespaces/TsoaRoute/index.md)

## Classes

- [Controller](classes/Controller.md)
- [ExpressTemplateService](classes/ExpressTemplateService.md)
- [HapiTemplateService](classes/HapiTemplateService.md)
- [KoaTemplateService](classes/KoaTemplateService.md)
- [TemplateService](classes/TemplateService.md)
- [ValidateError](classes/ValidateError.md)
- [ValidationService](classes/ValidationService.md)

## Antarmuka

- [AdditionalProps](interfaces/AdditionalProps.md)
- [ArrayValidator](interfaces/ArrayValidator.md)
- [BooleanValidator](interfaces/BooleanValidator.md)
- [Config](interfaces/Config.md)
- [DateTimeValidator](interfaces/DateTimeValidator.md)
- [DateValidator](interfaces/DateValidator.md)
- [EmbeddedSpecGeneratorArtifacts](interfaces/EmbeddedSpecGeneratorArtifacts.md)
- [Exception](interfaces/Exception.md)
- [FieldErrors](interfaces/FieldErrors.md)
- [File](interfaces/File.md)
- [FloatValidator](interfaces/FloatValidator.md)
- [IntegerValidator](interfaces/IntegerValidator.md)
- [IocContainer](interfaces/IocContainer.md)
- [ParameterValidationMetadata](interfaces/ParameterValidationMetadata.md)
- [ResolvedSpecResponse](interfaces/ResolvedSpecResponse.md)
- [RoutesConfig](interfaces/RoutesConfig.md)
- [RuntimeSchemaAdapter](interfaces/RuntimeSchemaAdapter.md)
- [RuntimeSpecConfigSnapshot](interfaces/RuntimeSpecConfigSnapshot.md)
- [SpecCacheContext](interfaces/SpecCacheContext.md)
- [SpecCacheHandler](interfaces/SpecCacheHandler.md)
- [SpecConfig](interfaces/SpecConfig.md)
- [SpecGenerator](interfaces/SpecGenerator.md)
- [SpecPathDefinition](interfaces/SpecPathDefinition.md)
- [SpecPathOptions](interfaces/SpecPathOptions.md)
- [SpecRequestContext](interfaces/SpecRequestContext.md)
- [StringValidator](interfaces/StringValidator.md)

## Tipe Alias

- [BuiltinSpecPathTarget](type-aliases/BuiltinSpecPathTarget.md)
- [~~DeprecatedOptionForAdditionalPropertiesHandling~~](type-aliases/DeprecatedOptionForAdditionalPropertiesHandling.md)
- [ExtensionType](type-aliases/ExtensionType.md)
- [HttpStatusCodeLiteral](type-aliases/HttpStatusCodeLiteral.md)
- [HttpStatusCodeStringLiteral](type-aliases/HttpStatusCodeStringLiteral.md)
- [IocContainerFactory](type-aliases/IocContainerFactory.md)
- [Newable](type-aliases/Newable.md)
- [OtherValidOpenApiHttpStatusCode](type-aliases/OtherValidOpenApiHttpStatusCode.md)
- [RuntimeSchemaAdapterResult](type-aliases/RuntimeSchemaAdapterResult.md)
- [ServedSpec](type-aliases/ServedSpec.md)
- [ServiceIdentifier](type-aliases/ServiceIdentifier.md)
- [SpecDocumentFormat](type-aliases/SpecDocumentFormat.md)
- [SpecPathCache](type-aliases/SpecPathCache.md)
- [SpecPathGate](type-aliases/SpecPathGate.md)
- [SpecPathGateHandler](type-aliases/SpecPathGateHandler.md)
- [SpecPathTarget](type-aliases/SpecPathTarget.md)
- [SpecResponseHandler](type-aliases/SpecResponseHandler.md)
- [SpecResponseValue](type-aliases/SpecResponseValue.md)
- [SpecRuntime](type-aliases/SpecRuntime.md)
- [TsoaResponse](type-aliases/TsoaResponse.md)
- [Validator](type-aliases/Validator.md)

## Fungsi

- [assertNever](functions/assertNever.md)
- [Body](functions/Body.md)
- [BodyProp](functions/BodyProp.md)
- [Consumes](functions/Consumes.md)
- [createEmbeddedSpecGenerator](functions/createEmbeddedSpecGenerator.md)
- [createOpenApiSpecGenerator](functions/createOpenApiSpecGenerator.md)
- [Delete](functions/Delete.md)
- [Deprecated](functions/Deprecated.md)
- [describeSpecPath](functions/describeSpecPath.md)
- [Example](functions/Example.md)
- [Extension](functions/Extension.md)
- [fetchMiddlewares](functions/fetchMiddlewares.md)
- [fetchSpecPaths](functions/fetchSpecPaths.md)
- [FormField](functions/FormField.md)
- [Get](functions/Get.md)
- [getParameterExternalValidatorMetadata](functions/getParameterExternalValidatorMetadata.md)
- [Head](functions/Head.md)
- [Header](functions/Header.md)
- [Hidden](functions/Hidden.md)
- [Inject](functions/Inject.md)
- [isDefaultForAdditionalPropertiesAllowed](functions/isDefaultForAdditionalPropertiesAllowed.md)
- [Middlewares](functions/Middlewares.md)
- [normalisePath](functions/normalisePath.md)
- [NoSecurity](functions/NoSecurity.md)
- [OperationId](functions/OperationId.md)
- [Options](functions/Options.md)
- [Patch](functions/Patch.md)
- [Path](functions/Path.md)
- [Post](functions/Post.md)
- [Produces](functions/Produces.md)
- [Put](functions/Put.md)
- [Queries](functions/Queries.md)
- [Query](functions/Query.md)
- [Request](functions/Request.md)
- [RequestProp](functions/RequestProp.md)
- [Res](functions/Res.md)
- [resolveSpecPathResponse](functions/resolveSpecPathResponse.md)
- [Response](functions/Response.md)
- [Route](functions/Route.md)
- [Security](functions/Security.md)
- [SpecPath](functions/SpecPath.md)
- [SuccessResponse](functions/SuccessResponse.md)
- [Tags](functions/Tags.md)
- [UploadedFile](functions/UploadedFile.md)
- [UploadedFiles](functions/UploadedFiles.md)
- [Validate](functions/Validate.md)
- [validateExternalSchema](functions/validateExternalSchema.md)
- [ValidateParam](functions/ValidateParam.md)
