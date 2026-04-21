---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Controller

# Класс: Контроллер

Определено в: [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

Класс базового контроллера, который позволяет действиям переопределять возможный код состояния и заголовки.

## конструкторы

### Конструктор

```ts
new Controller(): Controller;
```

#### Возвращение

`Controller`

## Методы

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

Определено в: [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

Возвращает ранее назначенное значение заголовка ответа.

#### Параметры

##### name

`string`

#### Возвращение

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

Определено в: [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

Возвращает все заголовки ответов, назначенные на экземпляр контроллера.

#### Возвращение

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

Определено в: [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

Возвращает код состояния HTTP, установленный [setStatus](#setstatus)Если есть.

#### Возвращение

`number` \| `undefined`

***

### setHeader()

#### Вызов подписи

```ts
setHeader<H>(name, value?): void;
```

Определено в: [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### Параметры типа

###### H

`H` *расширяет* ключ `OutgoingHttpHeaders`

##### Параметры

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### Возвращение

`void`

#### Вызов подписи

```ts
setHeader(name, value?): void;
```

Определено в: [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### Параметры

###### name

`string`

###### value?

`string` \| `string`[]

##### Возвращение

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

Определено в: [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

Устанавливает код состояния HTTP, который должен вернуться сгенерированный обработчик маршрута.

#### Параметры

##### statusCode

`number`

#### Возвращение

`void`
