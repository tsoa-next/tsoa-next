---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ExpressTemplateService

# 类: 快取服务

定义如下: [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L37)

Express- 具体执行生成的路由模板服务合同。

## 扩展

- [`TemplateService`](TemplateService.md)\<`ExpressApiHandlerParameters`, `ExpressValidationArgsParameters`, `ExpressReturnHandlerParameters`\>

## 构造器

### 构造器

```ts
new ExpressTemplateService(models, config): ExpressTemplateService;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### 参数

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### 回返

`ExpressTemplateService`

#### 继承自

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## 属性

### config

```ts
protected readonly config: AdditionalProps;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

#### 继承自

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

#### 继承自

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

定义如下: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### 继承自

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## 方法

### apiHandler()

```ts
apiHandler(params): Promise<void>;
```

定义如下: [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L38)

为活动的运行时间启动控制器动作 。

#### 参数

##### params

`ExpressApiHandlerParameters`

#### 回返

`Promise`\<`void`\>

#### 覆盖

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

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

#### 继承自

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

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

#### 继承自

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

定义如下: [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L56)

验证并规范从请求中提取的路由参数。

#### 参数

##### params

`ExpressValidationArgsParameters`

#### 回返

`unknown`[]

#### 覆盖

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

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

#### 继承自

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

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

#### 继承自

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

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

#### 继承自

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

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

#### 继承自

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

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

#### 继承自

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): void;
```

定义如下: [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:126](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L126)

写入控制器返回活动运行时间 。

#### 参数

##### params

`ExpressReturnHandlerParameters`

#### 回返

`void`

#### 覆盖

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
