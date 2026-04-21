---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / IocContainer

# Интерфейс: IocContainer

Определено в: [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

Минимальный контракт на контейнер для выполнения, используемый для разрешения случаев контроллера.

## Методы

### get()

#### Вызов подписи

```ts
get<T>(controller): T;
```

Определено в: [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### Параметры типа

###### T

`T`

##### Параметры

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Возвращение

`T`

#### Вызов подписи

```ts
get<T>(controller): Promise<T>;
```

Определено в: [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### Параметры типа

###### T

`T`

##### Параметры

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### Возвращение

`Promise`\<`T`\>
