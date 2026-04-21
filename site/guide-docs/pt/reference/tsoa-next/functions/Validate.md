---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Validate

# Função: Validate ()

```ts
function Validate(...args): ParameterDecorator;
```

Definido em: [packages/runtime/src/decorators/validate.ts:141](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/validate.ts#L141)

Anexa metadados de validação de esquema externo a um parâmetro do controlador.

Formulários suportados são `@Validate(schema)`, `@Validate(kind, schema)`, e `@Validate({ kind, schema })`.

## Parâmetros

### args

...`unknown`[]

## Retorna

`ParameterDecorator`
