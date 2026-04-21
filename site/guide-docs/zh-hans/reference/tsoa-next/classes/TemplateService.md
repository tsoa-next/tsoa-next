---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / TemplateService

# 摘要类:模板服务\<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters\>

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L9)

共享生成路由所使用的运行时间特定模板服务的基类.

## 由

- [`ExpressTemplateService`](ExpressTemplateService.md)
- [`HapiTemplateService`](HapiTemplateService.md)
- [`KoaTemplateService`](KoaTemplateService.md)

## 类型参数

### ApiHandlerParameters

`ApiHandlerParameters`

### ValidationArgsParameters

`ValidationArgsParameters`

### ReturnHandlerParameters

`ReturnHandlerParameters`

## 构造器

### 构造器

```ts
new TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>(models, config): TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### 参数

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### 回返

`TemplateService`\<`ApiHandlerParameters`, `ValidationArgsParameters`, `ReturnHandlerParameters`\>

## 属性

### config

```ts
protected readonly config: AdditionalProps;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

***

### models

```ts
protected readonly models: Models;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

***

### validationService

```ts
protected validationService: ValidationService;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

## 方法

### apiHandler()

```ts
abstract apiHandler(params): Promise<unknown>;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L20)

为活动的运行时间启动控制器动作 。

#### 参数

##### params

`ApiHandlerParameters`

#### 回返

`Promise`\<`unknown`\>

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### 参数

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### 回返

`Promise`\<`unknown`\>

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### 参数

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### 回返

`unknown`

***

### getValidatedArgs()

```ts
abstract getValidatedArgs(params): unknown[];
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L23)

验证并规范从请求中提取的路由参数。

#### 参数

##### params

`ValidationArgsParameters`

#### 回返

`unknown`[]

***

### isController()

```ts
protected isController(object): object is Controller;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### 参数

##### object

`object` \| [`Controller`](Controller.md)

#### 回返

`object is Controller`

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### 参数

##### value

`unknown`

#### 回返

`value is Record<string, unknown>`

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### 参数

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### 回返

`unknown`

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### 参数

##### headers

`Record`\<`string`, `unknown`\>

#### 回返

`boolean`

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### 参数

##### headers

`Record`\<`string`, `unknown`\>

#### 回返

`boolean`

***

### returnHandler()

```ts
abstract protected returnHandler(params): unknown;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L26)

写入控制器返回活动运行时间 。

#### 参数

##### params

`ReturnHandlerParameters`

#### 回返

`unknown`
