---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# समारोह: मान्यCompilerOptions ()

के लिए Compiler विकल्प को हल tsoa या तो एक पूर्ण विन्यास वस्तु या एक कच्चे से पीढ़ी `compilerOptions` नक्शा

## कॉल हस्ताक्षर

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

में परिभाषित: [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### पैरामीटर

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### रिटर्न

`CompilerOptions`

## कॉल हस्ताक्षर

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

में परिभाषित: [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### पैरामीटर

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### रिटर्न

`CompilerOptions`
