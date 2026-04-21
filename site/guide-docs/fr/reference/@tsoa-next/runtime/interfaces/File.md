---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / File

# Interface : Fichier

Définie dans : [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

Objet contenant des métadonnées de fichiers et accès à l'information.

## Propriétés

### buffer

```ts
buffer: Buffer;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` Seulement : Un tampon contenant le fichier entier.

***

### destination

```ts
destination: string;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` Uniquement : Répertoire dans lequel ce fichier a été téléchargé.

***

### Encodage

```ts
encoding: string;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

Valeur `Content-Transfer-Encoding` en-tête pour ce fichier.

#### Deprecated

depuis juillet 2015

#### See

RFC 7578, section 4.7

***

### fieldname

```ts
fieldname: string;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

Nom du champ de formulaire associé à ce fichier.

***

### filename

```ts
filename: string;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` Seulement: Nom de ce fichier `destination`.

***

### mimetype

```ts
mimetype: string;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

Valeur `Content-Type` en-tête pour ce fichier.

***

### originalname

```ts
originalname: string;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

Nom du fichier sur l'ordinateur du téléchargeur.

***

### path

```ts
path: string;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` Seulement : chemin complet vers le fichier téléchargé.

***

### size

```ts
size: number;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

Taille du fichier en octets.

***

### stream

```ts
stream: Readable;
```

Définie dans : [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

Un flux lisible de ce fichier. Seuls les `_handleFile`
callback personnalisé `StorageEngine`Par.
