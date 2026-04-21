---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedSpecConfig

# Antar muka: ExtendedSpecConfig

Didefinisikan dalam: [cli/src/api.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L387)

Kepercayaan dari generasi-Normalized [validateSpecConfig](../functions/validateSpecConfig.md).

## Extending

- `SpecConfig`

## Properti

### basePath?

```ts
optional basePath?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

Path API dasar; mis. 'v1' di https://myapi.com/v1

#### Diwarisi dari

```ts
SpecConfig.basePath
```

***

### contact?

```ts
optional contact?: object;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

Informasi kontak untuk API yang diterbitkan.

#### email?

```ts
optional email?: string;
```

Alamat email dari kontak orang / organisasi.

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

Nama identifikasi dari organisasi kontak.

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

URL menunjuk ke informasi kontak.

##### Default

```ts
npm package author url
```

#### Diwarisi dari

```ts
SpecConfig.contact
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Didefinisikan dalam: [cli/src/api.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L390)

***

### description?

```ts
optional description?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

Deskripsi API; baku ke npm deskripsi paket

#### Diwarisi dari

```ts
SpecConfig.description
```

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

Mengendalikan apakah `basePath` adalah prefixed dengan `/` ketika menulis OpenAPI 3 URL server.

Hanya tersedia dengan spesifikasi versi 3 atau 3.1.

#### Diwarisi dari

```ts
SpecConfig.disableBasePathPrefixSlash
```

***

### entryFile

```ts
entryFile: string;
```

Didefinisikan dalam: [cli/src/api.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L388)

***

### host?

```ts
optional host?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

Nama host API bagi Swagger 2 keluaran, misalnya `localhost:3000`.

#### Diwarisi dari

```ts
SpecConfig.host
```

***

### license?

```ts
optional license?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

Lisensi API; baku ke npm lisensi paket ketika ada

#### Diwarisi dari

```ts
SpecConfig.license
```

***

### name?

```ts
optional name?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

Nama API; baku ke npm nama paket

#### Diwarisi dari

```ts
SpecConfig.name
```

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Didefinisikan dalam: [cli/src/api.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L389)

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

String template untuk menghasilkan id operasi.
Ini harus berupa template handlebars yang valid dan disediakan
dengan konteks berikut:
  - 'Pengontrol Nama' - Nama string kelas pengendali.
  - 'Metode' - Tsoa. Metode objek.

#### Default

```ts
'{{titleCase method.name}}'
```

#### Diwarisi dari

```ts
SpecConfig.operationIdTemplate
```

***

### outputDirectory

```ts
outputDirectory: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

Direktori dimana berkas spesifikasi yang dihasilkan mesti ditulis.

#### Diwarisi dari

```ts
SpecConfig.outputDirectory
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

Applies a default security to the whole API.
Dapat ditimpa dengan `@Security(...)` atau `@NoSecurity()` dekorator pada controller atau metode.

#### Diwarisi dari

```ts
SpecConfig.rootSecurity
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

Protokol yang didukung untuk Swagger 2 keluaran.

#### Diwarisi dari

```ts
SpecConfig.schemes
```

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

Rencana keamanan dinyatakan untuk spesifikasi.

#### Tanda tangan indeks

```ts
[name: string]: SecuritySchemes
```

#### Diwarisi dari

```ts
SpecConfig.securityDefinitions
```

***

### servers?

```ts
optional servers?: string[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

URL server untuk OpenAPI 3 keluaran.

Hanya tersedia dengan spesifikasi versi 3 atau 3.1.

#### Diwarisi dari

```ts
SpecConfig.servers
```

***

### spec?

```ts
optional spec?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

Objek bergabung ke spesifikasi yang dihasilkan.
Properti yang dihasilkan selalu didahulukan daripada nilai yang tersedia di sini.

#### Diwarisi dari

```ts
SpecConfig.spec
```

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

Base- nama kesombongan. json atau kesombongan. Ya.

@ default: "swagger"

#### Diwarisi dari

```ts
SpecConfig.specFileBaseName
```

***

### specMerging?

```ts
optional specMerging?: "immediate" | "recursive" | "deepmerge";
```

Didefinisikan dalam: [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

Mengendalikan bagaimana `spec` digabung ke dalam dokumen yang dihasilkan.
Nilai yang mungkin:
 - 'Segera' menimpa hanya elemen tingkat atas.
 - 'rekursif' melakukan penggabungan dalam menggunakan `merge`.
 - 'deepmerge' melakukan penggabungan dalam menggunakan `ts-deepmerge`, termasuk array.

#### Default

```ts
'immediate'
```

#### Diwarisi dari

```ts
SpecConfig.specMerging
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

Mayor OpenAPI versi untuk menghasilkan; baku ke versi 2 ketika tidak dispesifikasikan
Nilai yang mungkin:
 - 2: menghasilkan OpenAPI versi 2.
 - 3: menghasilkan OpenAPI versi 3.
 - 3.1: menghasilkan OpenAPI versi 3.1.

#### Diwarisi dari

```ts
SpecConfig.specVersion
```

***

### tags?

```ts
optional tags?: Tag[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

Metadata tag level atas untuk spesifikasi yang dihasilkan.

#### Diwarisi dari

```ts
SpecConfig.tags
```

***

### termsOfService?

```ts
optional termsOfService?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

Hubungkan ke halaman yang menggambarkan persyaratan layanan.
Harus dalam format URL.

#### Diwarisi dari

```ts
SpecConfig.termsOfService
```

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

Tambahkan judul untuk respon inline dan permintaan skema objek tubuh untuk meningkatkan generasi klien.

#### Diwarisi dari

```ts
SpecConfig.useTitleTagsForInlineObjects
```

***

### version?

```ts
optional version?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

Nomor versi API; baku ke versi paket.

#### Diwarisi dari

```ts
SpecConfig.version
```

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

Aktifkan dukungan x-enum -varnames

#### Default

```ts
false
```

#### Diwarisi dari

```ts
SpecConfig.xEnumVarnames
```

***

### yaml?

```ts
optional yaml?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

Menulis spesifikasi yang dihasilkan sebagai YAML bukan JSON.

#### Diwarisi dari

```ts
SpecConfig.yaml
```
