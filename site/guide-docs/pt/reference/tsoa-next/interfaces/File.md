---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / File

# Interface: Ficheiro

Definido em: [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

Objeto contendo metadados de arquivo e informações de acesso.

## Propriedades

### buffer

```ts
buffer: Buffer;
```

Definido em: [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` somente: Um buffer contendo o arquivo inteiro.

***

### destination

```ts
destination: string;
```

Definido em: [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` somente: Diretório para o qual este arquivo foi enviado.

***

### Codificação

```ts
encoding: string;
```

Definido em: [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

Valor da `Content-Transfer-Encoding` cabeçalho para este arquivo.

#### Deprecated

desde julho 2015

#### See

RFC 7578, secção 4.7

***

### fieldname

```ts
fieldname: string;
```

Definido em: [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

Nome do campo de formulário associado a este arquivo.

***

### filename

```ts
filename: string;
```

Definido em: [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` Apenas: Nome deste arquivo dentro `destination`.

***

### mimetype

```ts
mimetype: string;
```

Definido em: [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

Valor da `Content-Type` cabeçalho para este arquivo.

***

### originalname

```ts
originalname: string;
```

Definido em: [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

Nome do ficheiro no computador do carregador.

***

### path

```ts
path: string;
```

Definido em: [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` somente: Caminho completo para o arquivo carregado.

***

### size

```ts
size: number;
```

Definido em: [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

Tamanho do arquivo em bytes.

***

### stream

```ts
stream: Readable;
```

Definido em: [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

Um fluxo legível deste arquivo. Apenas disponível para `_handleFile`
callback para personalizado `StorageEngine`s.
