---
title: FAQ
lang: pt-BR
lastUpdated: 2026-04-17T20:53:42.040Z
---

# FAQ

## Can Eu uso OpenAPI 3 ou 3.1 em vez de OpenAPI 2 (anteriormente Swagger)?

Sim. Definir `spec.specVersion` para `3` ou `3.1` na sua `tsoa.json` Arquivo. Veja mais opções de configuração no [`Config`](./reference/tsoa-next/interfaces/Config.md) Referência da API.

## Como utilizar tsoa com koa, hapi, ou outras estruturas?

Definir a propriedade middleware em seu tsoa configuração. Fora da caixa, expresso, hapi e koa são suportados.
Você também pode fornecer um modelo personalizado, para mais informações, por favor confira [the guide](./templates.md)

## Como garantir que não há propriedades adicionais em tempo de execução

Por padrão, OpenAPI permite que os modelos tenham [`additionalProperties`](https://swagger.io/docs/specification/data-models/dictionaries/). Se você quiser garantir, em tempo de execução, que os dados têm apenas as propriedades definidas em seus modelos, defina o `noImplicitAdditionalProperties` opção em [`Config`](./reference/tsoa-next/interfaces/Config.md) para qualquer um dos dois `"silently-remove-extras"` ou `"throw-on-extras"`.
Caveatas:

- Os seguintes tipos sempre permitirão propriedades adicionais devido à natureza da forma como funcionam:
  - A `any` tipo
  - Um tipo indexado (que explicitamente permite propriedades adicionais) como `export interface IStringToStringDictionary { [key: string] : string }`- Se estiver a utilizar tsoa para um serviço existente que tem consumidores...
  - você precisará informar seus consumidores antes de definir `noImplicitAdditionalProperties` para `"throw-on-extras"` uma vez que seria uma mudança de ruptura (devido ao fato de que os corpos de solicitação que antes funcionavam agora teriam um erro).
- Mesmo assim, `"noImplicitAdditionalProperties" : "silently-remove-extras"` é uma ótima escolha para ambos legados e novas APIs (já que isso reflete o comportamento de serializadores C# e outros serializadores JSON populares).

## Lidando com nomes de modelos duplicados

Se você tem vários modelos com o mesmo nome, você pode obter erros indicando que existem vários modelos correspondentes. Se você quiser designar uma classe/interface como a versão 'canônica' de um modelo, adicione um elemento jsdoc marcando-o como tal:

```ts
/**
 * @tsoaModel
 */
export interface MyModel {
  ...
}
```

## Como posso tirar o máximo da minha OEA?

Agora que você tem um OpenAPI Especificação (OAS) (swagger.json), você pode usar todos os tipos de ferramentas incríveis que geram documentação, SDKs cliente, e mais [here](http://openapi.tools).

## Como substituir o limite para validar grandes arrays (com mais de 20 elementos)

Por omissão [Express](https://github.com/expressjs/express) utilizações [qs](https://github.com/ljharb/qs) como analisador internamente, e sua limitação padrão para validar 20 elementos no array
para sobrepor isto você deve adicionar a seguinte configuração à sua configuração expressa:

```ts
const app = express()

app.set('query parser', function (str) {
  return qs.parse(str, { arrayLimit: Infinity })
})

app.use(bodyParser.json())
app.use(Router())
```

Por favor, note que você deve colocá-lo em cima de outro middleware.
