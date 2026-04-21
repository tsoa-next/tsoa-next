---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### Mapeamento de localização

Por [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) abaixo [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> Às vezes os módulos não estão localizados diretamente na baseUrl. Por exemplo, uma importação para um módulo "jquery" seria traduzida em tempo de execução para "node_modules\jquery\dist\jquery.slim.min.js". Carregadores usam uma configuração de mapeamento para mapear nomes de módulos para arquivos em tempo de execução, consulte Documentação RequireJs e documentação SystemJS.
>> A TypeScript o compilador suporta a declaração de tais mapeamentos utilizando a propriedade "paths" em arquivos tsconfig.json. Aqui está um exemplo de como especificar a propriedade "caminhos" para jquery.

```js
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
    }
  }
}
```

Se você tem um projeto que usa esta funcionalidade, você pode configurar os geradores internos por:

- deixar `tsoa-next` opções do compilador de leitura de um `tsconfig.json`- sobrepondo valores específicos com `compilerOptions` na sua `tsoa` configuração

`tsconfig.json` é uma fonte de entrada, não a autoridade final. A precedência é:

1. TypeScript por omissão interna
2. resolvido `tsconfig.json`3. explícito `compilerOptions` em `tsoa` configuração

Se `tsconfig` é omitido, `tsoa-next` procura `tsconfig.json` a partir do carregado `tsoa` diretório de configuração. Se `tsconfig` é fornecido, é resolvido em relação a esse arquivo de configuração.

```js
{
  "tsconfig": "./tsconfig.json",
  "spec": {
    ...
  },
  "routes": {
    ...
  },
  "compilerOptions": {
    "baseUrl": "./path/to/base/url",
    "paths": {
      "exampleLib": ["./path/to/example/lib"]
    }
  }
}
```

Você também pode continuar a fornecer opções de compilador diretamente quando você não quiser confiar em `tsconfig.json`.

```js
{
  "spec": {
    ...
  },
  "routes": {
    ...
  },
   "compilerOptions": {
        "baseUrl": "./path/to/base/url",
        "paths": {
            "exampleLib": "./path/to/example/lib"
        }
    }
}
```
