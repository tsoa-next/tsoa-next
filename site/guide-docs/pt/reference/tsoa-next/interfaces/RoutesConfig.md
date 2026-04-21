---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RoutesConfig

# Interface: RotasConfig

Definido em: [packages/runtime/src/config.ts:235](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L235)

## Propriedades

### authenticationModule?

```ts
optional authenticationModule?: string;
```

Definido em: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

Caminho do módulo de autenticação usado pelas rotas geradas.

***

### basePath?

```ts
optional basePath?: string;
```

Definido em: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

Localização da API de base; por exemplo, o '/v1' em https://myapi.com/v1

***

### bodyCoercion?

```ts
optional bodyCoercion?: boolean;
```

Definido em: [packages/runtime/src/config.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L288)

Se coagir implicitamente os parâmetros do corpo em um tipo aceito.

#### Default

```ts
true
```

***

### esm?

```ts
optional esm?: boolean;
```

Definido em: [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

Quando habilitado, o uso de importação de rotas geradas `.js` extensões para a saída ESM.

#### Default

```ts
false
```

***

### iocModule?

```ts
optional iocModule?: string;
```

Definido em: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

Caminho do módulo IoC, por exemplo `./inversify/ioc`.

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

Definido em: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

Fornecedor de Middleware.

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

Definido em: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

Personalizado Handlebars caminho do modelo usado em vez do modelo de middleware incorporado.

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

Definido em: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

Salta a gravação do ficheiro de rota quando o conteúdo gerado corresponde ao ficheiro existente.

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

Definido em: [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

Quando habilitado, as importações de rota geradas mantêm `.ts` extensões ao suporte TypeScript 5.7 `rewriteRelativeImportExtensions`.

#### Default

```ts
false
```

***

### routesDir

```ts
routesDir: string;
```

Definido em: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

Diretório onde os arquivos de rota gerados são escritos.

***

### routesFileName?

```ts
optional routesFileName?: string;
```

Definido em: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

Nome do ficheiro para o módulo de rota gerado.
