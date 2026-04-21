---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Controller

# Kelas: Kontrol

Didefinisikan dalam: [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

Kelas pengontrol dasar yang memungkinkan aksi menimpa kode dan header status akhirnya.

## Konstruktor

### Konstruktor

```ts
new Controller(): Controller;
```

#### Kembali

`Controller`

## Metode

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

Mengembalikan nilai header respon yang sebelumnya diberikan.

#### Parameter

##### name

`string`

#### Kembali

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

Mengembalikan semua header respon yang ditugaskan pada introler instansi.

#### Kembali

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

Mengembalikan kode status HTTP yang ditata [setStatus](#setstatus), jika ada.

#### Kembali

`number` \| `undefined`

***

### setHeader()

#### Panggil Tandatangan

```ts
setHeader<H>(name, value?): void;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### Parameter Tipe

###### H

`H` * extend * kunci `OutgoingHttpHeaders`

##### Parameter

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### Kembali

`void`

#### Panggil Tandatangan

```ts
setHeader(name, value?): void;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### Parameter

###### name

`string`

###### value?

`string` \| `string`[]

##### Kembali

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

Tata kode status HTTP yang penangan rute yang dihasilkan mesti kembali.

#### Parameter

##### statusCode

`number`

#### Kembali

`void`
