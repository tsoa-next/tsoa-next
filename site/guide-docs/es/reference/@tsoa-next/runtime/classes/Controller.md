---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Controller

# Clase: Controlador

Definido en: [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

Clase de controlador de base que permite que las acciones superen el código de estado y los encabezados eventuales.

## Constructores

### Constructor

```ts
new Controller(): Controller;
```

#### Devoluciones

`Controller`

## Métodos

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

Definido en: [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

Devuelve un valor de encabezado de respuesta previamente asignado.

#### Parámetros

##### name

`string`

#### Devoluciones

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

Definido en: [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

Devuelve todos los encabezados de respuesta asignados en la instancia del controlador.

#### Devoluciones

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

Definido en: [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

Devuelve el código de estado HTTP establecido a través [setStatus](#setstatus), si hay.

#### Devoluciones

`number` \| `undefined`

***

### setHeader()

Almacena un valor de encabezado de respuesta que el manejador de ruta generado debe emitir.

#### Call Signature

```ts
setHeader<H>(name, value?): void;
```

Definido en: [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### Parámetros tipo

###### H

`H` *extiene* clave de `OutgoingHttpHeaders`

##### Parámetros

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### Devoluciones

`void`

#### Call Signature

```ts
setHeader(name, value?): void;
```

Definido en: [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### Parámetros

###### name

`string`

###### value?

`string` \| `string`[]

##### Devoluciones

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

Definido en: [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

Establece el código de estado HTTP que el manejador de ruta generado debe devolver.

#### Parámetros

##### statusCode

`number`

#### Devoluciones

`void`
