---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# Fonction: validerCompilerOptions()

Décide des options de compilateur pour tsoa génération d'un objet de configuration complet ou d'un brut `compilerOptions` carte.

## Signature d'appel

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

Définie dans : [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### Paramètres

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### Retourne

`CompilerOptions`

## Signature d'appel

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

Définie dans : [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### Paramètres

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### Retourne

`CompilerOptions`
