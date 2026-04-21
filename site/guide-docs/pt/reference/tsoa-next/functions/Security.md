---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Security

# Função: Security ()

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

Definido em: [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

Declara o requisito de segurança para um controlador ou ação.

## Parâmetros

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

O nome do sistema de segurança, ou um objeto obrigatório de segurança completo.

### scopes?

`string`[]

Âmbitos de aplicação do regime quando `name` é uma corda.

## Retorna

`ClassDecorator` & `MethodDecorator`
