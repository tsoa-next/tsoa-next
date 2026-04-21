---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Controller

# Classe: Contrôleur

Définie dans : [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

Classe de contrôleur de base qui permet aux actions de remplacer le code d'état et les en-têtes éventuels.

## Constructeurs

### Constructeur

```ts
new Controller(): Controller;
```

#### Retourne

`Controller`

## Méthodes

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

Définie dans : [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

Renvoie une valeur d'en-tête de réponse précédemment attribuée.

#### Paramètres

##### name

`string`

#### Retourne

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

Définie dans : [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

Renvoie tous les en-têtes de réponse attribués à l'instance du contrôleur.

#### Retourne

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

Définie dans : [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

Renvoie le code d'état HTTP défini par [setStatus](#setstatus), le cas échéant.

#### Retourne

`number` \| `undefined`

***

### setHeader()

Stocke une valeur d'en-tête de réponse que le gestionnaire de route généré devrait émettre.

#### Signature d'appel

```ts
setHeader<H>(name, value?): void;
```

Définie dans : [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### Paramètres de type

###### H

`H` *Extends* `OutgoingHttpHeaders`

##### Paramètres

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### Retourne

`void`

#### Signature d'appel

```ts
setHeader(name, value?): void;
```

Définie dans : [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### Paramètres

###### name

`string`

###### value?

`string` \| `string`[]

##### Retourne

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

Définie dans : [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

Définit le code d'état HTTP que le gestionnaire de route généré doit renvoyer.

#### Paramètres

##### statusCode

`number`

#### Retourne

`void`
