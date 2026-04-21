---
lastUpdated: 2026-04-20T21:59:41.343Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Config

# 接口:配置

定义如下: [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

根号 tsoa-next 配置 CLI 方案发电机。

## 属性

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

定义如下: [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript 生成时使用的编译选项 。
这些由 tsconfig 解析的编译器选项合并 。

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

定义如下: [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

指向您想要的路由控制器的一连串路径表 tsoa 内容包括:

***

### defaultNumberType?

```ts
optional defaultNumberType?: "long" | "integer" | "double" | "float";
```

定义如下: [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI 要使用的编号类型 TypeScript `number` 当没有较窄的注释时。

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

定义如下: [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

您 API 的切入点

***

### ignore?

```ts
optional ignore?: string[];
```

定义如下: [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

要忽略的目录 TypeScript 元数据扫描

***

### {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}嗯...

```ts
optional multerOpts?: Options;
```

定义如下: [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

遗留的 multer 选项传输到生成的中间软件中 。
这个 `storage` 不支持选项。

#### Example

```ts
{
     *   "dest": "/tmp"
     * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

从v6.4.0起, `RegisterRoutes` 能够接收 `multerOptions` 直接说
 此配置级别选项将在未来发行时被删除 。
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

定义如下: [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

用于防止输入数据输入您的 API 模式。 这会记录你的决定 Yaml 将会在您的路线上启动超额财产验证(运行时) 。

***

### routes

```ts
routes: RoutesConfig;
```

定义如下: [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

路由生成配置.

***

### spec

```ts
spec: SpecConfig;
```

定义如下: [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI 生成配置。

***

### tsconfig?

```ts
optional tsconfig?: string;
```

定义如下: [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

在生成过程中用作编译器选项输入源的 tsconfig 文件路径 。
如果省略,则 tsoa-next 将从装入的 tsconfig.json 开始搜索 。 tsoa 配置目录 。
明确的编译器选项 tsoa-next 配置仍然优先于 tsconfig 值 。
