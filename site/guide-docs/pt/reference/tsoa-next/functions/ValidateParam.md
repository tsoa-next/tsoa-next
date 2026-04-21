---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / ValidateParam

# Função: ValidateParam ()

## Assinatura da chamada

```ts
function ValidateParam<TValue>(options): TValue;
```

Definido em: [packages/runtime/src/routeGeneration/templateHelpers.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L90)

Valida um valor de tempo de execução contra o gerado tsoa metadados do esquema de rota.

### Parâmetros do tipo

#### TValue

`TValue`

### Parâmetros

#### options

`ValidateParamOptions`\<`TValue`\>

### Retorna

`TValue`

## Assinatura da chamada

```ts
function ValidateParam<TValue>(...args): TValue;
```

Definido em: [packages/runtime/src/routeGeneration/templateHelpers.ts:94](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L94)

### Parâmetros do tipo

#### TValue

`TValue`

### Parâmetros

#### args

...`ValidateParamTupleArgs`\<`TValue`\>

### Retorna

`TValue`

### Deprecated

Use a sobrecarga do objeto em vez disso.
