---
lastUpdated: 2026-04-20T21:59:41.369Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedRoutesConfig

# Interface: ExtendedRoutesConfig

محددة في: [cli/src/api.ts:416](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L416)

التشويش المطّرد [validateRoutesConfig](../functions/validateRoutesConfig.md).

## التذييلات

- `RoutesConfig`

## الممتلكات

### authenticationModule?

```ts
optional authenticationModule?: string;
```

محددة في: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

طريق وحدة التوثيق التي تستخدمها الطرق المتولدة.

#### Inherited from

```ts
RoutesConfig.authenticationModule
```

***

### basePath?

```ts
optional basePath?: string;
```

محددة في: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

"مسار الـ "بـاس أي إس أي" "مثل الـ "إف 1 https://myapi.com/v1

#### Inherited from

```ts
RoutesConfig.basePath
```

***

### bodyCoercion

```ts
bodyCoercion: boolean;
```

محددة في: [cli/src/api.ts:419](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L419)

ما إذا كان يجبر ضمناً بارامترات الجسم إلى نوع مقبول

#### Default

```ts
true
```

#### تجاوزات

```ts
RoutesConfig.bodyCoercion
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

محددة في: [cli/src/api.ts:420](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L420)

***

### entryFile

```ts
entryFile: string;
```

محددة في: [cli/src/api.ts:417](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L417)

***

### esm?

```ts
optional esm?: boolean;
```

محددة في: [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

عند التمكين، تولد الواردات من الطرق `.js` تمديدات لنواتج الإدارة السليمة بيئياً.

#### Default

```ts
false
```

#### Inherited from

```ts
RoutesConfig.esm
```

***

### iocModule?

```ts
optional iocModule?: string;
```

محددة في: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

IoC module path, for example `./inversify/ioc`.

#### Inherited from

```ts
RoutesConfig.iocModule
```

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

محددة في: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

مُقدّم مُقدّم للبرمجة.

#### Inherited from

```ts
RoutesConfig.middleware
```

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

محددة في: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

العرف Handlebars ممر نموذجي يستخدم بدلاً من نموذج البرمجيات المتوسطة

#### Inherited from

```ts
RoutesConfig.middlewareTemplate
```

***

### multerOpts?

```ts
optional multerOpts?: Options;
```

محددة في: [cli/src/api.ts:421](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L421)

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

محددة في: [cli/src/api.ts:418](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L418)

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

محددة في: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

يكتبون ملف الطريق عندما يطابق المحتوى المولد الملف الحالي

#### Inherited from

```ts
RoutesConfig.noWriteIfUnchanged
```

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

محددة في: [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

عند التمكين، تولد الواردات من الطرق `.ts` تمديدات الدعم TypeScript 5.7 `rewriteRelativeImportExtensions`.

#### Default

```ts
false
```

#### Inherited from

```ts
RoutesConfig.rewriteRelativeImportExtensions
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

محددة في: [cli/src/api.ts:422](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L422)

***

### routeGenerator?

```ts
optional routeGenerator?: 
  | string
  | ((metadata, options) => AbstractRouteGenerator<ExtendedRoutesConfig>);
```

محددة في: [cli/src/api.ts:424](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L424)

***

### routesDir

```ts
routesDir: string;
```

محددة في: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

دليل أين توجد ملفات للطرق

#### Inherited from

```ts
RoutesConfig.routesDir
```

***

### routesFileName?

```ts
optional routesFileName?: string;
```

محددة في: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

اسم ملف لنموذج الطريق المولد

#### Inherited from

```ts
RoutesConfig.routesFileName
```

***

### runtimeSpecConfig?

```ts
optional runtimeSpecConfig?: RuntimeSpecConfigSnapshot;
```

محددة في: [cli/src/api.ts:423](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L423)
