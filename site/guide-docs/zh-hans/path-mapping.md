---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### 路径映射

个人 [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) 下级 [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)数字 :

> 有时模块不直接位于基底Url下. 例如,导入模块"jquery"会在运行时被翻译为"node_modules\jquery\dist\jquery.slim.min.js". 加载者使用映射配置将模块名称映射到运行时的文件,参见RequestJs文档和SystemJS文档.
>> 这个 TypeScript 编译器支持在tsconfig.json文件中使用"路径"属性来声明这样的映射. 以下是如何为jquery指定"路径"属性的例子.

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

如果您有一个项目使用此功能,您可以通过下列方式配置内部生成器:

- 让 `tsoa-next` 从 a 读取编译器选项 `tsconfig.json`- 以 `compilerOptions` 在你身边 `tsoa` 配置

`tsconfig.json` 是输入源,而不是最终权威。 优先是:

1. TypeScript 内部默认
2. 已解决 `tsconfig.json`3. 明确 `compilerOptions` 内 `tsoa` 配置

若为 `tsconfig` 删去, `tsoa-next` 寻找 `tsconfig.json` 从装入的开始 `tsoa` 配置目录 。 若为 `tsconfig` ,则相对于该配置文件解决。

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

您也可以在不依赖时直接继续提供编译器选项 `tsconfig.json`。 。 。 。

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
