---
title: Recarregamento ao vivo
lang: pt-BR
lastUpdated: 2026-04-20T00:28:55.919Z
---

# Recarregamento ao vivo

::: warning NOTA DE COMPATIBILIDADE
Objectivos deste guia [express](https://expressjs.com) e assume `tsoa-next`A actual política de apoio: Node.js 22 ou mais novo.
Verificamos o suporte através do LTS anterior, LTS atual, e Node vPróximo em IC.
Exemplos abaixo incluem `npm`, `pnpm`, e `yarn` variantes onde o comando difere.
Assumimos que a sua configuração é semelhante à recomendada para [getting started](/pt/getting-started)
:::

Referência da API relevante: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md), [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md), e [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md).

::: tip
Vamos usar [nodemon](https://nodemon.io/) e [ts-node](https://github.com/TypeStrong/ts-node) para reloading ao vivo, mas qualquer ferramenta que nos permita conectar no processo de reloading fará. As alternativas podem ser uma combinação de `tsc -w` e desencadeando `tsoa spec-and-routes` usando [`onchange`](https://www.npmjs.com/package/onchange).
:::

** Sobre o que vamos falar:

[[toc]]

## Recarregando código

### Instalando o nómon e o nó ts

::: code-group

```bash [npm]
npm i -D nodemon ts-node concurrently
```

```bash [pnpm]
pnpm add -D nodemon ts-node concurrently
```

```bash [yarn]
yarn add -D nodemon ts-node concurrently
```

:::

### Criando uma configuração do nómon

Agora, vamos criar um `nodemon.json` dentro da pasta raiz do nosso projeto que se parece com isto:

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### Adicionando um script dev

Vamos iniciar automaticamente esta configuração com o gestor de pacotes `dev` programa (`npm run dev`, `pnpm dev`, ou `yarn dev`), e, enquanto estamos nisso, adicionar `build` e `start` comandos no nosso `package.json`:

```diff
{
  "name": "starter",
  "version": "0.0.1",
+ "scripts": {
+   "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
+   "build": "tsoa spec-and-routes && tsc",
+   "start": "node build/src/server.js"
+ },
  "dependencies": {
  // ...
}
```

## Supercarregando nossa experiência de desenvolvedor com `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) permite que um controlador exponha um endpoint de especificações ou documentos vivos sem ler `swagger.json` ou `openapi.yaml` do disco no momento da solicitação.
Isso o torna um bom ajuste para fluxos de trabalho de desenvolvimento onde você quer que a documentação gerada fique em sincronia com os mesmos metadados de controller que suas rotas já usam.

### Instalando um documento UI peer

Escolha o alvo de IU docs que deseja usar:

- Express: `npm i swagger-ui-express` / `pnpm add swagger-ui-express` / `yarn add swagger-ui-express`- Koa: `npm i swagger-ui-koa` / `pnpm add swagger-ui-koa` / `yarn add swagger-ui-koa`- Hapi: `npm i hapi-swagger` / `pnpm add hapi-swagger` / `yarn add hapi-swagger`- Redoc: `npm i redoc` / `pnpm add redoc` / `yarn add redoc`- RapiDoc: `npm i rapidoc` / `pnpm add rapidoc` / `yarn add rapidoc`

### Expor um endpoint de documentos com controlo

Anexar um ou mais `@SpecPath(...)` Decoradores de um controlador existente:

```ts
import { Controller, Get, Route, SpecPath } from 'tsoa-next'

@Route('users')
@SpecPath()
@SpecPath('openapi.yaml', { target: 'yaml' })
@SpecPath('docs', { target: 'swagger' })
export class UsersController extends Controller {
  @Get()
  public list(): string[] {
    return []
  }
}
```

Isto dá-lhe:

- `GET /users/spec` para JSON
- `GET /users/openapi.yaml` para YAML
- `GET /users/docs` em vez Swagger UI

Como o endpoint docs é gerado a partir dos mesmos metadados em tempo de execução que suas rotas, ele permanece atual à medida que você edita os controladores e re-execução `tsoa spec-and-routes`.

### Inspecionando a Documentação

Agora, quando navegamos para <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">localhost:3000/usuários/docs</a>, devemos ver um reflexo atual de nossa API.

![SwaggerUI](/docs-images/SwaggerUI.png)

### Envio de pedidos através Swagger UI

Podemos selecionar endpoints, clicar no botão "Experimente-o" e enviar alguns dados preenchendo o formulário.
Quando clicarmos em "Execute", essa solicitação será enviada ao nosso servidor e a resposta será exibida abaixo do formulário.

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### Outros alvos incorporados

Se preferir uma UI diferente, mude a `target` opção:

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

Se você precisa de uma resposta totalmente personalizada, passe um manipulador `target` Em vez disso. Você também pode adicionar `cache` e `gate` nas mesmas opções objeto.
