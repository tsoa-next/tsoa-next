---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Atualizando de tsoa 2.5

[Jump to the breaking changes](#breaking-changes)

> Nota histórica: os links de solicitação de puxar neste guia apontam intencionalmente para [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa), onde essas mudanças originalmente pousaram.

## Novas funcionalidades

### Suporte para apelidos de tipo

Esta versão vem com suporte adequado para definições de alias de tipo.

Eles podem variar de cenários simples

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

para cenários mais complexos, como sindicatos e intersecções de pseudônimos

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

ou mesmo apelidos genéricos de tipo:

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

Por favor, note que isto significa que tsoa não gera apenas a especificação (OpenAPI v3 e Swagger2\*), mas também irá validar a entrada contra os tipos, incluindo as anotações jsDoc.

\* Pode haver certos cenários em que podemos não ser capazes de gerar Swagger 2 da sua TypeScript, tsoa registrará avisos para informá-lo sobre quaisquer problemas que estamos cientes.

### Suporte para tipos mapeados

> TypeScript 2.1 introduziram tipos mapeados, uma poderosa adição ao sistema de tipo. Em essência, os tipos mapeados permitem que você crie novos tipos dos existentes, mapeando sobre tipos de propriedades. Cada propriedade do tipo existente é transformada de acordo com uma regra que você especifica. As propriedades transformadas então compõem o novo tipo.
> \- Marius Schulz, https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa agora trabalha com o verificador de tipo ts para resolver tipos mapeados. Vamos tentar ativamente suportar todos os casos, no entanto, o conjunto de testes para agora só cobre os tipos de utilitário mapeados navios tipo script com, como:

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Suporte para tipos condicionais

A partir da versão 2.8, TypeScript suporta tipos condicionais. A sintaxe é muito próxima do operador ternário e permite a expressão de 2 (ou mais) tipos diferentes baseados em uma condição. Por favor, consulte o [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) para mais pormenores.

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa agora trabalha com o verificador de tipo ts para resolver tipos condicionais. Vamos tentar ativamente suportar a maioria dos casos, no entanto, o conjunto de testes para agora só cobre os tipos de utilitário navios tipo script com, como:

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### Suporte para combinações e tipos de utilitários

A combinação de tipos mapeados e condicionais permite tipos de utilitários poderosos como o `Omit` Tipo.

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Apoio à `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) ([Eywek](https://github.com/Eywek))

### Enumias: Ver [\#594](https://github.com/lukeautry/tsoa/pull/594) para o Spec e [\#599](https://github.com/lukeautry/tsoa/pull/599) e [\#593](https://github.com/lukeautry/tsoa/pull/593)

### Palavra- chave nula: Veja [\#601](https://github.com/lukeautry/tsoa/pull/601)

### Capacidade de usar um delimitador de cólon em vez de pulseiras no caminho [\#602](https://github.com/lukeautry/tsoa/pull/602)([itamarco](https://github.com/itamarco))

### adicionar suporte @ exemplo para parâmetros / propriedades [\#616](https://github.com/lukeautry/tsoa/pull/616) ([jfrconley](https://github.com/jfrconley))

### façanha: ignorar métodos de classe [\#643](https://github.com/lukeautry/tsoa/pull/643) ([Eywek](https://github.com/Eywek))

### façanha: manuseie os membros do enum [\#656](https://github.com/lukeautry/tsoa/pull/656) ([Eywek](https://github.com/Eywek))

### Lidar com tipos indexados [\#636](https://github.com/lukeautry/tsoa/pull/636) ([Eywek](https://github.com/Eywek))

### pega `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) ([Eywek](https://github.com/Eywek))

### `@format` suporte para apelidos de tipo [\#620](https://github.com/lukeautry/tsoa/pull/620) ([jfrconley](https://github.com/jfrconley))

## Correcções de Erros

- propagar corretamente o nome do campo em validação Modelo [@fantapop](https://github.com/fantapop)

- Vazio conhecido Api Tipos de resposta documento 200 resposta em vez de 204 [\#629](https://github.com/lukeautry/tsoa/pull/629) ([WoH](https://github.com/WoH))

- Validar Erro deve estender Erro [\#661](https://github.com/lukeautry/tsoa/pull/661) ([aldenquimby](https://github.com/aldenquimby))

- Atualizar o koa-router para @koa/router, corrigir erros de tipo [\#646](https://github.com/lukeautry/tsoa/pull/646) ([michaelbeaumont](https://github.com/michaelbeaumont))
- Remover o tipo de objeto [\#642](https://github.com/lukeautry/tsoa/pull/642) ([dimitor115](https://github.com/dimitor115))
- Corrigir a adição de propriedades estáticas à definição do modelo [\#639](https://github.com/lukeautry/tsoa/pull/639) ([dimitor115](https://github.com/dimitor115))

## Quebrar as alterações

### Null vs. indefinido

A menos que você declare um tipo a aceitar `null`, não vamos mais marcar suas propriedades opcionais como `nullable: true` ou `x-nullable: true`.
Isto aplica-se também à validação, por isso ao enviar `null` em vez de enviar `undefined` Não havia propriedades num objecto, agora já não há.
Enviando `undefined` Em vez de, i.e. `string | null` é também rejeitada pela validação.

### Nomeação

Para suportar aliases de tipo e evitar conflitos de nomes, os nomes dos esquemas/definições de componentes gerados podem ter mudado (interfaces genéricas são afetadas principalmente).
Se você confiar nos nomes dos componentes gerados de tsoaIsto é uma mudança.

Porque... tsoa suportado alguns aliases de tipo no passado e agora gerou definições de forma diferente, isso pode quebrar seu código.
Se você confiasse em tsoa não suportando aliases de tipo corretamente para evitar problemas, isso pode quebrar seu código.
Proceda com cautela e relate questões.

### Melhorar a validação de objetos aninhados

Veja [\#574](https://github.com/lukeautry/tsoa/pull/574) e [\#575](https://github.com/lukeautry/tsoa/pull/575).
Estas não devem ser quebrando mudanças, mas uma vez que afeta validação, melhor seguro do que arrependido.

### Mudar o comportamento padrão quando nenhuma máquina estiver definida:

Defina explicitamente o seu host caso queira ter urls absolutos. Esta é uma mudança para aqueles que estavam usando OpenAPI 3, mas na verdade traz tsoa em paridade com a forma como estávamos a lidar com o `host` propriedade em Swagger 2. Anteriormente OpenAPI 3 usuários tiveram que resultar em passar `null` O que todos sentimos ser estranho. Agora omitindo `host` causará tsoa Assumir que o url deve ser relativo.

### Remova .. no campoErros

Ao detectar propriedades adicionais ilegais (se você estiver usando tsoa configuração `additionalProperties: 'throw-on-extras'`), a chave sobre o erro conteria um ponto adicional.

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

Este é agora corrigido e a chave é `TestModel.additionalProp`.

### Usar o Spec em vez de Swagger (`tsoa swagger` ainda está disponível por enquanto, mas será removido eventualmente) [\#664](https://github.com/lukeautry/tsoa/pull/664) ([WoH](https://github.com/WoH))

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoa.json:

```js
{
  "swagger": {}
}
```

torna- se

```js
{
  "spec": {}
}
```

- Mover a configuração partilhada para o nível superior [\#628](https://github.com/lukeautry/tsoa/pull/628) ([WoH](https://github.com/WoH))

Em vez de duplicar a configuração e lidar com muitos casos de borda, a nova configuração é muito mais simples.
Configurações de configuração, que afetam ambas as rotas e especificações estão agora localizados no nível superior do objeto de configuração.

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

Isso significa que se suas configurações são diferentes (por exemplo, o arquivo de entrada), você terá que chamar o `generateRoutes()` e `generateSpec()` Tu mesmo.
Note que estes métodos agora têm uma configuração mais simples:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

Arquivo de entrada e sem ImplicitAdicional As propriedades podem agora ser definidas na rota/gagger Config.

Além disso, configurações booleanas para noImplicitAdditionalProperties foram removidas: #503
As configurações válidas são agora: `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`, tudo o resto cai de volta para `'ignore'`.

** Para referência, consulte a interface TS de toda a configuração [here](./reference/tsoa-next/interfaces/Config.md)**

### TypeScript As uniões são agora implementadas como `anyOf` em OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
