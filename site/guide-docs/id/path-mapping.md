---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### Pemetaan tapak

Per [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) di bawah [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> Kadang-kadang modul tidak langsung terletak di bawah baseUrl. Sebagai contoh, impor ke modul "jquery" akan diterjemahkan pada waktu-jalan ke "node _ module\ jquery\ dist\ jquery.slim.min.js". Loaders memakai konfigurasi pemetaan untuk memetakan nama modul ke berkas saat berjalan, lihat dokumentasi RequireJs dan dokumentasi SystemJS.
>> The TypeScript kompiler mendukung deklarasi pemetaan seperti menggunakan properti "path" dalam berkas tsconfig.json. Berikut ini adalah contoh bagaimana menentukan properti "paths" untuk jquery.

```js
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
    }
  }
}
```

Jika Anda memiliki proyek yang menggunakan fungsi ini, Anda dapat mengatur generator internal dengan baik:

- membiarkan `tsoa-next` membaca opsi kompiler dari `tsconfig.json`- overriding nilai tertentu dengan `compilerOptions` di `tsoa` konfigurasi

`tsconfig.json` adalah sumber masukan, bukan otoritas akhir. Presedensi adalah:

1. TypeScript default internal
2. diselesaikan `tsconfig.json`3. eksplisit `compilerOptions` in `tsoa` konfigurasi

Jika `tsconfig` diabaikan, `tsoa-next` looks for `tsconfig.json` dimulai dari dimuat `tsoa` direktori konfigurasi. Jika `tsconfig` disediakan, itu diselesaikan relatif ke berkas konfigurasi.

```js
{
  "tsconfig": "./tsconfig.json",
  "spec": {
    ...
  },
  "routes": {
    ...
  },
  "compilerOptions": {
    "baseUrl": "./path/to/base/url",
    "paths": {
      "exampleLib": ["./path/to/example/lib"]
    }
  }
}
```

Anda juga dapat terus menyediakan opsi kompiler secara langsung ketika Anda tidak ingin bergantung pada `tsconfig.json`.

```js
{
  "spec": {
    ...
  },
  "routes": {
    ...
  },
   "compilerOptions": {
        "baseUrl": "./path/to/base/url",
        "paths": {
            "exampleLib": "./path/to/example/lib"
        }
    }
}
```
