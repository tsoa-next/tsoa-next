---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / IocContainer

# Interface: IocContainer

Définie dans : [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

Contrat de conteneur d'exécution minimal utilisé pour résoudre les instances du contrôleur.

## Méthodes

### get()

#### Signature d'appel

```ts
get<T>(controller): T;
```

Définie dans : [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### Paramètres de type

###### T

`T`

##### Paramètres

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Retourne

`T`

#### Signature d'appel

```ts
get<T>(controller): Promise<T>;
```

Définie dans : [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### Paramètres de type

###### T

`T`

##### Paramètres

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Retourne

`Promise`\<`T`\>
