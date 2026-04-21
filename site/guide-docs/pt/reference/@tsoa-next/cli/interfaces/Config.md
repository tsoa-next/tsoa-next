---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / Config

# Interface: Configuração

Definido em: [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

Raiz tsoa-next configuração consumida pela CLI e geradores programáticos.

## Propriedades

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

Definido em: [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript CompilerOpções a serem usadas durante a geração.
Estas são mescladas sobre opções de compilador resolvidas a partir do tsconfig.

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Definido em: [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

Um array de globs de caminho que aponta para seus controladores de rota que você gostaria de ter tsoa incluir.

***

### defaultNumberType?

```ts
optional defaultNumberType?: "double" | "float" | "integer" | "long";
```

Definido em: [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI tipo de número a utilizar para TypeScript `number` quando nenhuma anotação mais estreita está presente.

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

Definido em: [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

O ponto de entrada para sua API

***

### ignore?

```ts
optional ignore?: string[];
```

Definido em: [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

Directórios a ignorar durante TypeScript digitalização de metadados

***

### - MulterOpts?

```ts
optional multerOpts?: Options;
```

Definido em: [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

Opções de mutter legado encaminhado para middleware gerado.
A `storage` A opção não é suportada.

#### Example

```ts
{
     *   "dest": "/tmp"
     * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

Desde v6.4.0, `RegisterRoutes` pode receber `multerOptions` directamente.
 Esta opção de nível de configuração será removida em uma versão futura.
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Definido em: [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

Modos que permitem evitar que os dados de entrada entrem em sua API. Isto documentará sua decisão na arrogância. yaml e ele irá ativar a validação do excesso de propriedade (em tempo de execução) em suas rotas.

***

### routes

```ts
routes: RoutesConfig;
```

Definido em: [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

Configuração da geração de rota.

***

### spec

```ts
spec: SpecConfig;
```

Definido em: [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI configuração da geração.

***

### tsconfig?

```ts
optional tsconfig?: string;
```

Definido em: [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

Caminho para um arquivo tsconfig usado como fonte de entrada para opções de compilador durante a geração.
Se omitido, tsoa-next irá procurar o tsconfig.json a partir do carregado tsoa diretório de configuração.
Compilador explícitoOpções em tsoa-next config ainda tem precedência sobre os valores tsconfig.
