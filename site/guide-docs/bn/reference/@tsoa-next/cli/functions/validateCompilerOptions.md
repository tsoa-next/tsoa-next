---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# ফাংশন: বৈধ sattreamer বিকল্প

super কম্পাইল করার প্রণালী কনফিগার করুন tsoa একটি পূর্ণ কনফিগ বস্তু অথবা raw হতে উত্‍পাদন করো `compilerOptions` ম্যাপ.

## কল স্বাক্ষর

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

নির্ধারিত মান: [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### পরামিতি

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### প্রাপ্ত মান

`CompilerOptions`

## কল স্বাক্ষর

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

নির্ধারিত মান: [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### পরামিতি

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### প্রাপ্ত মান

`CompilerOptions`
