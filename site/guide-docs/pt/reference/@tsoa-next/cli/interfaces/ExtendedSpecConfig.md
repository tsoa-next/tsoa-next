---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedSpecConfig

# Interface: ExtendedSpecConfig

Definido em: [cli/src/api.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L387)

Configuração normalizada da geração de especificações devolvida por [validateSpecConfig](../functions/validateSpecConfig.md).

## Extensões

- `SpecConfig`

## Propriedades

### basePath?

```ts
optional basePath?: string;
```

Definido em: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

Localização da API de base; por exemplo, o 'v1' em https://myapi.com/v1

#### Herdadas de

```ts
SpecConfig.basePath
```

***

### contact?

```ts
optional contact?: object;
```

Definido em: [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

Informações de contato para a API publicada.

#### email?

```ts
optional email?: string;
```

O endereço de e-mail da pessoa de contato/organização.

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

O nome identificador da pessoa de contato/organização.

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

URL apontando para as informações de contato.

##### Default

```ts
npm package author url
```

#### Herdadas de

```ts
SpecConfig.contact
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Definido em: [cli/src/api.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L390)

***

### description?

```ts
optional description?: string;
```

Definido em: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

Descrição da API; por omissão npm Descrição do pacote

#### Herdadas de

```ts
SpecConfig.description
```

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

Definido em: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

Controla se `basePath` é prefixado com `/` ao compor OpenAPI 3 URLs de servidor.

Apenas disponível com as versões 3 ou 3.1.

#### Herdadas de

```ts
SpecConfig.disableBasePathPrefixSlash
```

***

### entryFile

```ts
entryFile: string;
```

Definido em: [cli/src/api.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L388)

***

### host?

```ts
optional host?: string;
```

Definido em: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

Nome da máquina API para Swagger 2 saída, por exemplo `localhost:3000`.

#### Herdadas de

```ts
SpecConfig.host
```

***

### license?

```ts
optional license?: string;
```

Definido em: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

Licença API; por omissão npm licença do pacote quando presente

#### Herdadas de

```ts
SpecConfig.license
```

***

### name?

```ts
optional name?: string;
```

Definido em: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

Nome da API; padrão para npm nome do pacote

#### Herdadas de

```ts
SpecConfig.name
```

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Definido em: [cli/src/api.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L389)

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

Definido em: [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

Texto do modelo para gerar IDs de operação.
Este deve ser um modelo de guidão válido e ser fornecido
com o seguinte contexto:
  - Controlador Nome' - Nome de texto da classe do controlador.
  - "método" - Tsoa. Objeto do método.

#### Default

```ts
'{{titleCase method.name}}'
```

#### Herdadas de

```ts
SpecConfig.operationIdTemplate
```

***

### outputDirectory

```ts
outputDirectory: string;
```

Definido em: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

Diretório onde o arquivo específico gerado deve ser escrito.

#### Herdadas de

```ts
SpecConfig.outputDirectory
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

Definido em: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

Aplica uma segurança padrão a toda a API.
Pode ser substituído com `@Security(...)` ou `@NoSecurity()` Decoradores em controladores ou métodos.

#### Herdadas de

```ts
SpecConfig.rootSecurity
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Definido em: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

Protocolos suportados para Swagger 2 saídas.

#### Herdadas de

```ts
SpecConfig.schemes
```

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

Definido em: [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

Regimes de segurança declarados para o caderno de especificações.

#### Assinatura do índice

```ts
[name: string]: SecuritySchemes
```

#### Herdadas de

```ts
SpecConfig.securityDefinitions
```

***

### servers?

```ts
optional servers?: string[];
```

Definido em: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

URLs do servidor para OpenAPI 3 saídas.

Apenas disponível com as versões 3 ou 3.1.

#### Herdadas de

```ts
SpecConfig.servers
```

***

### spec?

```ts
optional spec?: unknown;
```

Definido em: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

Objeto fundido na especificação gerada.
Propriedades geradas sempre têm precedência sobre os valores fornecidos aqui.

#### Herdadas de

```ts
SpecConfig.spec
```

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

Definido em: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

Nome de base da arrogância. Json ou atrevido. Yaml.

@default: "swagger"

#### Herdadas de

```ts
SpecConfig.specFileBaseName
```

***

### specMerging?

```ts
optional specMerging?: "immediate" | "recursive" | "deepmerge";
```

Definido em: [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

Controla como `spec` é fundido no documento gerado.
Valores possíveis:
 - "Imediatamente" substitui apenas elementos de topo.
 - 'recursivo' executa uma mescla profunda usando `merge`.
 - 'deepmerge' executa uma mesclagem profunda usando `ts-deepmerge`, incluindo matrizes.

#### Default

```ts
'immediate'
```

#### Herdadas de

```ts
SpecConfig.specMerging
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

Definido em: [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

Maior OpenAPI versão a gerar; padrão para a versão 2 quando não especificado
Valores possíveis:
 - 2: gera OpenAPI versão 2.
 - 3: gera OpenAPI versão 3.
 - 3.1: gera OpenAPI versão 3.1.

#### Herdadas de

```ts
SpecConfig.specVersion
```

***

### tags?

```ts
optional tags?: Tag[];
```

Definido em: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

Metadados de tag de nível superior para a especificação gerada.

#### Herdadas de

```ts
SpecConfig.tags
```

***

### termsOfService?

```ts
optional termsOfService?: string;
```

Definido em: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

Link para a página que descreve os termos de serviço.
Deve estar no formato URL.

#### Herdadas de

```ts
SpecConfig.termsOfService
```

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

Definido em: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

Adiciona títulos aos esquemas de resposta em linha e objeto request-body para melhorar a geração do cliente.

#### Herdadas de

```ts
SpecConfig.useTitleTagsForInlineObjects
```

***

### version?

```ts
optional version?: string;
```

Definido em: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

Número de versão da API; padrão para a versão do pacote.

#### Herdadas de

```ts
SpecConfig.version
```

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

Definido em: [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

Habilitar suporte a x-enum-varnames

#### Default

```ts
false
```

#### Herdadas de

```ts
SpecConfig.xEnumVarnames
```

***

### yaml?

```ts
optional yaml?: boolean;
```

Definido em: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

Escreve a especificação gerada como YAML em vez de JSON.

#### Herdadas de

```ts
SpecConfig.yaml
```
