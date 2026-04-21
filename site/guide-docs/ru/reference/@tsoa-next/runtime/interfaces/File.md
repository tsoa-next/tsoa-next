---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / File

# Интерфейс: файл

Определено в: [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

Объект, содержащий метаданные файлов и информацию доступа.

## Свойства

### buffer

```ts
buffer: Buffer;
```

Определено в: [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` Только буфер, содержащий весь файл.

***

### destination

```ts
destination: string;
```

Определено в: [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` Только: каталог, в который был загружен этот файл.

***

### ~~кодирование~~

```ts
encoding: string;
```

Определено в: [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

ценность `Content-Transfer-Encoding` Заголовок для этого файла.

#### Deprecated

с июля 2015 года

#### See

RFC 7578, раздел 4.7

***

### fieldname

```ts
fieldname: string;
```

Определено в: [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

Название поля формы, связанного с этим файлом.

***

### filename

```ts
filename: string;
```

Определено в: [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` Только: Название этого файла внутри `destination`.

***

### mimetype

```ts
mimetype: string;
```

Определено в: [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

ценность `Content-Type` Заголовок для этого файла.

***

### originalname

```ts
originalname: string;
```

Определено в: [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

Имя файла на компьютере загрузчика.

***

### path

```ts
path: string;
```

Определено в: [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` Только: Полный путь к загруженному файлу.

***

### size

```ts
size: number;
```

Определено в: [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

Размер файла в байтах.

***

### stream

```ts
stream: Readable;
```

Определено в: [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

Удобочитаемый поток этого файла. Доступны только для `_handleFile`
Обратный звонок на заказ `StorageEngine`С.
