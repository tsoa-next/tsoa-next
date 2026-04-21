---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / IocContainer

# Interfaz: IocContainer

Definido en: [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

Contrato de contenedores de tiempo mínimo utilizado para resolver los casos de controlador.

## Métodos

### get()

#### Call Signature

```ts
get<T>(controller): T;
```

Definido en: [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### Parámetros tipo

###### T

`T`

##### Parámetros

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Devoluciones

`T`

#### Call Signature

```ts
get<T>(controller): Promise<T>;
```

Definido en: [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### Parámetros tipo

###### T

`T`

##### Parámetros

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Devoluciones

`Promise`\<`T`\>
