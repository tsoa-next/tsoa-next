---
lastUpdated: 2026-03-29T16:47:44.960Z
---
# Introdução

`tsoa-next` é a continuação do original [`tsoa`](https://github.com/lukeautry/tsoa) projeto, construindo sobre a fundação estável ali estabelecida por Luke Autry e colaboradores.
É um quadro com uma integração OpenAPI compilador a compilar Node.js aplicações do lado do servidor usando TypeScript.
Ele pode direcionar expressa, hapi, koa e mais frameworks em tempo de execução.
`tsoa-next` as aplicações são seguras por padrão e lidam perfeitamente com validação em tempo de execução.

Nos guias abaixo, `tsoa` geralmente refere-se ao CLI comando e arquitetura subjacente que `tsoa-next` Continua.

## Objetivo

- TypeScript controladores e modelos como a única fonte de verdade para sua API
- Uma validade OpenAPI (anteriormente Swagger) spec (2.0 ou 3.0) é gerado a partir de seus controladores e modelos, incluindo:
  - Caminhos (por exemplo, GET /Users)
  - Definições baseadas em TypeScript interfaces (modelos)
  - Parâmetros/propriedades do modelo marcadas como necessárias ou opcionais com base em TypeScript (por exemplo, a minha propriedade? string é opcional na OpenAPI espec)
  - jsDoc suportada para descrições de objetos (a maioria dos outros metadados pode ser inferida a partir de TypeScript tipos)
- Rotas são geradas para middleware de escolha
  - Express, Hapi, e Koa atualmente suportado, outro middleware pode ser suportado usando um modelo de guidão simples
  - Validação de tempo de execução sem costura

## Filosofia

- Confiar TypeScript digitar anotações para gerar metadados da API, se possível
- Se as anotações de tipo regular não são uma maneira apropriada de expressar metadados, use decoradores
- Usar o jsdoc para metadados de texto puro (por exemplo, descrições de endpoint)
- Minimizar placa de caldeira
- Os modelos são melhor representados por interfaces (estruturas de dados puras), mas também podem ser representados por classes
- Validação em tempo de execução `tsoa-next` deve comportar-se o mais próximo possível das especificações geradas OpenAPI 2/3 esquema descreve. Quaisquer diferenças na lógica de validação são clarificadas por avisos de registo durante a geração do OpenAPI Especificações (OAS) e/ou rotas.
  - Por favor, note que habilitando OpenAPI 3 você minimiza as chances de lógica de validação divergente desde OpenAPI 3 tem uma sintaxe de esquema mais expressiva.
