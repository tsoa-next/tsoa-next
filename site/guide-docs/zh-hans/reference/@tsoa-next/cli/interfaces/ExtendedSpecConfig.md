---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedSpecConfig

# 接口:扩展SpecCfig

定义如下: [cli/src/api.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L387)

正常的 spec- 生成配置返回 [validateSpecConfig](../functions/validateSpecConfig.md)。 。 。 。

## 扩展

- `SpecConfig`

## 属性

### basePath?

```ts
optional basePath?: string;
```

定义如下: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

基础 API 路径; 例如“ v1” 以 https://myapi.com/v1

#### 继承自

```ts
SpecConfig.basePath
```

***

### contact?

```ts
optional contact?: object;
```

定义如下: [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

已公布的API的联系方式.

#### email?

```ts
optional email?: string;
```

联系人/组织的电子邮件地址。

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

联系人/组织的识别名称。

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

URL指向联系信息.

##### Default

```ts
npm package author url
```

#### 继承自

```ts
SpecConfig.contact
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

定义如下: [cli/src/api.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L390)

***

### description?

```ts
optional description?: string;
```

定义如下: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

API 描述; 默认为 npm 软件包描述

#### 继承自

```ts
SpecConfig.description
```

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

定义如下: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

是否控制 `basePath` 前缀为 `/` 编译时 OpenAPI 3个服务器 URL.

仅可用光谱版3或3.1.

#### 继承自

```ts
SpecConfig.disableBasePathPrefixSlash
```

***

### entryFile

```ts
entryFile: string;
```

定义如下: [cli/src/api.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L388)

***

### host?

```ts
optional host?: string;
```

定义如下: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

API 主机名 Swagger 例如,2项产出 `localhost:3000`。 。 。 。

#### 继承自

```ts
SpecConfig.host
```

***

### license?

```ts
optional license?: string;
```

定义如下: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

API 许可证; 默认为 npm 软件包许可证当存在时

#### 继承自

```ts
SpecConfig.license
```

***

### name?

```ts
optional name?: string;
```

定义如下: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

API 名称; 默认为 npm 软件包名称

#### 继承自

```ts
SpecConfig.name
```

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

定义如下: [cli/src/api.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L389)

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

定义如下: [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

生成操作 ID 的模板字符串 。
这应该是一个有效的握手栏模板, 并已提供
内容如下:
  - '控制器 名称' - 控制器类的字符串名称 。
  - "方法" - 特苏亚. 方法对象.

#### Default

```ts
'{{titleCase method.name}}'
```

#### 继承自

```ts
SpecConfig.operationIdTemplate
```

***

### outputDirectory

```ts
outputDirectory: string;
```

定义如下: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

生成的光谱文件应当写入的目录 。

#### 继承自

```ts
SpecConfig.outputDirectory
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

定义如下: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

对整个API应用默认的担保.
能够被压倒 `@Security(...)` 或者说 `@NoSecurity()` 控制器或方法上的装饰器。

#### 继承自

```ts
SpecConfig.rootSecurity
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

定义如下: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

支持的协议 Swagger 2个产出。

#### 继承自

```ts
SpecConfig.schemes
```

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

定义如下: [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

为规格申报了安全计划。

#### 索引签名

```ts
[name: string]: SecuritySchemes
```

#### 继承自

```ts
SpecConfig.securityDefinitions
```

***

### servers?

```ts
optional servers?: string[];
```

定义如下: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

服务器 URL OpenAPI 3个产出。

仅可用光谱版3或3.1.

#### 继承自

```ts
SpecConfig.servers
```

***

### spec?

```ts
optional spec?: unknown;
```

定义如下: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

对象合并为生成的 spec 。
产生的属性总是优先于这里提供的值.

#### 继承自

```ts
SpecConfig.spec
```

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

定义如下: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

斯瓦克的底名 。 json还是swagger。 雅姆尔。

@ 默认 : “ swagger ”

#### 继承自

```ts
SpecConfig.specFileBaseName
```

***

### specMerging?

```ts
optional specMerging?: "immediate" | "recursive" | "deepmerge";
```

定义如下: [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

如何控制 `spec` 合并到生成的文档中。
可能的数值 :
 - “ 立即” 仅覆盖顶级元素 。
 - “ recursive” 使用 `merge`。 。 。 。
 - “ 深度” 进行深度合并 `ts-deepmerge`,包括数组。

#### Default

```ts
'immediate'
```

#### 继承自

```ts
SpecConfig.specMerging
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

定义如下: [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

主要 OpenAPI 要生成的版本; 未指定时默认为版本 2
可能的数值 :
 - 2: 生成 OpenAPI 版本 2. 联合国
 - 3: 生成 OpenAPI 版本 3个
 - 3.1: 生成 OpenAPI 3.1版本。

#### 继承自

```ts
SpecConfig.specVersion
```

***

### tags?

```ts
optional tags?: Tag[];
```

定义如下: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

生成规格的顶级标签元数据 。

#### 继承自

```ts
SpecConfig.tags
```

***

### termsOfService?

```ts
optional termsOfService?: string;
```

定义如下: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

链接到描述服务条款的页面.
必须是 URL 格式 。

#### 继承自

```ts
SpecConfig.termsOfService
```

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

定义如下: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

将标题添加到内置响应和请求-body对象计划来改进客户端生成.

#### 继承自

```ts
SpecConfig.useTitleTagsForInlineObjects
```

***

### version?

```ts
optional version?: string;
```

定义如下: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

API版本编号;默认为包版本.

#### 继承自

```ts
SpecConfig.version
```

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

定义如下: [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

启用 x- enum- varname 支持

#### Default

```ts
false
```

#### 继承自

```ts
SpecConfig.xEnumVarnames
```

***

### yaml?

```ts
optional yaml?: boolean;
```

定义如下: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

将生成的光谱写为 YAML 而不是 JSON 。

#### 继承自

```ts
SpecConfig.yaml
```
