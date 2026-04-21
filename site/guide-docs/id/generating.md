---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Membuat Routes dan OAS

Referensi API Relevant: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md), [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md), [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md), dan [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md).

## Menggunakan CLI

### Perintah Dasar

```bash
# generate OAS
tsoa spec

# generate routes
tsoa routes

# discover config files beneath the current directory
tsoa discover

# discover config files beneath a path or glob
tsoa discover "packages/*"
```

### Opsi

#### OpenAPI Spesifikasi (OAS) generasi

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### Pembuatan rute

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### Penemuan konfigurasi

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` pencarian di bawah path yang diberikan, atau di bawah direktori kerja saat ini ketika tidak ada argumen yang disediakan.
- Masukan Glob didukung, sehingga perintah seperti `tsoa discover "packages/*"` atau `tsoa spec --discover "services/*"` akan memperluas akar yang cocok pertama.
- Discovery mengenali file config konvensional ini:
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`, `routes`, dan `spec-and-routes` dapat menyebar di semua konfigurasi yang ditemukan:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

Anda dapat menemukan Referensi untuk tsoa berkas konfigurasi [here](./reference/tsoa-next/interfaces/Config.md)

Untuk informasi pada objek konfigurasi (`tsoa.json`), Anda mungkin juga tertarik:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## Programtic

Impor pembuatan program APIs dari `tsoa-next/cli`. Akar `tsoa-next` titik masuk adalah waktu berjalan - saja dan harus digunakan untuk dekorator dan pembantu waktu berjalan.

```typescript
import { generateRoutes, generateSpec, generateSpecAndRoutes, ExtendedRoutesConfig, ExtendedSpecConfig } from 'tsoa-next/cli'

;(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    specVersion: 3,
    outputDirectory: './api/dist',
    controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
  }

  const routeOptions: ExtendedRoutesConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    routesDir: './api',
  }

  await generateSpec(specOptions)

  await generateRoutes(routeOptions)

  // Or generate both outputs from one shared metadata pass:
  await generateSpecAndRoutes({
    configuration: {
      entryFile: './api/server.ts',
      controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
      spec: {
        outputDirectory: './api/dist',
        specVersion: 3.1,
      },
      routes: {
        routesDir: './api',
      },
    },
  })
})()
```

* * Catatan: * * Jika Anda menggunakan tsoa Secara program, harap sadar bahwa tsoametode dapat (dalam keadaan langka) perubahan dalam rilis kecil dan patch. Tetapi jika Anda menggunakan tsoa dalam berkas .ts, maka TypeScript akan membantu Anda bermigrasi untuk perubahan apapun. Kami menyimpan hak ini untuk mengubah apa yang pada dasarnya metode internal kita sehingga kita dapat terus memberikan nilai bertahap kepada pengguna mayoritas (kita CLI pengguna). The CLI Namun hanya akan menerima perubahan saat rilis besar.
