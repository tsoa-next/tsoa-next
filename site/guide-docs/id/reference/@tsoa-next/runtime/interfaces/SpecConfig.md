---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecConfig

# Antar muka: SpekConfig

Didefinisikan dalam: [packages/runtime/src/config.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L79)

OpenAPI pengaturan generasi.

## Properti

### basePath?

```ts
optional basePath?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

Path API dasar; mis. 'v1' di https://myapi.com/v1

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

***

### description?

```ts
optional description?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

Deskripsi API; baku ke npm deskripsi paket

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

Mengendalikan apakah `basePath` adalah prefixed dengan `/` ketika menulis OpenAPI 3 URL server.

Hanya tersedia dengan spesifikasi versi 3 atau 3.1.

***

### host?

```ts
optional host?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

Nama host API bagi Swagger 2 keluaran, misalnya `localhost:3000`.

***

### license?

```ts
optional license?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

Lisensi API; baku ke npm lisensi paket ketika ada

***

### name?

```ts
optional name?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

Nama API; baku ke npm nama paket

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

***

### outputDirectory

```ts
outputDirectory: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

Direktori dimana berkas spesifikasi yang dihasilkan mesti ditulis.

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

Applies a default security to the whole API.
Dapat ditimpa dengan `@Security(...)` atau `@NoSecurity()` dekorator pada controller atau metode.

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

Protokol yang didukung untuk Swagger 2 keluaran.

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

***

### servers?

```ts
optional servers?: string[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

URL server untuk OpenAPI 3 keluaran.

Hanya tersedia dengan spesifikasi versi 3 atau 3.1.

***

### spec?

```ts
optional spec?: unknown;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

Objek bergabung ke spesifikasi yang dihasilkan.
Properti yang dihasilkan selalu didahulukan daripada nilai yang tersedia di sini.

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

Base- nama kesombongan. json atau kesombongan. Ya.

@ default: "swagger"

***

### specMerging?

```ts
optional specMerging?: "recursive" | "immediate" | "deepmerge";
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

***

### tags?

```ts
optional tags?: Tag[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

Metadata tag level atas untuk spesifikasi yang dihasilkan.

***

### termsOfService?

```ts
optional termsOfService?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

Hubungkan ke halaman yang menggambarkan persyaratan layanan.
Harus dalam format URL.

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

Tambahkan judul untuk respon inline dan permintaan skema objek tubuh untuk meningkatkan generasi klien.

***

### version?

```ts
optional version?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

Nomor versi API; baku ke versi paket.

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

***

### yaml?

```ts
optional yaml?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

Menulis spesifikasi yang dihasilkan sebagai YAML bukan JSON.
