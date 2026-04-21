---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / IocContainer

# Antar muka: IocContainer

Didefinisikan dalam: [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

Kontainer minimal yang digunakan untuk mengatasi masalah pengendali.

## Metode

### get()

#### Panggil Tandatangan

```ts
get<T>(controller): T;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### Parameter Tipe

###### T

`T`

##### Parameter

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Kembali

`T`

#### Panggil Tandatangan

```ts
get<T>(controller): Promise<T>;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### Parameter Tipe

###### T

`T`

##### Parameter

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Kembali

`Promise`\<`T`\>
