---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / File

# Interfaz: Archivo

Definido en: [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

Objeto que contiene metadatos de archivos e información de acceso.

## Propiedades

### buffer

```ts
buffer: Buffer;
```

Definido en: [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` sólo: Un amortiguador que contiene todo el archivo.

***

### destination

```ts
destination: string;
```

Definido en: [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` sólo: Directorio al que se ha subido este archivo.

***

### ~ Encoding ~

```ts
encoding: string;
```

Definido en: [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

Valor del `Content-Transfer-Encoding` encabezado para este archivo.

#### Deprecated

desde julio de 2015

#### See

RFC 7578, Sección 4.7

***

### fieldname

```ts
fieldname: string;
```

Definido en: [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

Nombre del campo de formulario asociado con este archivo.

***

### filename

```ts
filename: string;
```

Definido en: [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` Sólo: Nombre de este archivo dentro `destination`.

***

### mimetype

```ts
mimetype: string;
```

Definido en: [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

Valor del `Content-Type` encabezado para este archivo.

***

### originalname

```ts
originalname: string;
```

Definido en: [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

Nombre del archivo en la computadora del cargador.

***

### path

```ts
path: string;
```

Definido en: [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` sólo: Camino completo al archivo subido.

***

### size

```ts
size: number;
```

Definido en: [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

Tamaño del archivo en bytes.

***

### stream

```ts
stream: Readable;
```

Definido en: [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

Un flujo legible de este archivo. Sólo disponible para `_handleFile`
callback para encargo `StorageEngine`s.
