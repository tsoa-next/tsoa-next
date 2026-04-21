---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / IocContainer

# Interface: IocContainer

Definido em: [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

Contrato mínimo de container em tempo de execução usado para resolver instâncias do controlador.

## Métodos

### get()

#### Assinatura da chamada

```ts
get<T>(controller): T;
```

Definido em: [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### Parâmetros do tipo

###### T

`T`

##### Parâmetros

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Retorna

`T`

#### Assinatura da chamada

```ts
get<T>(controller): Promise<T>;
```

Definido em: [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### Parâmetros do tipo

###### T

`T`

##### Parâmetros

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Retorna

`Promise`\<`T`\>
