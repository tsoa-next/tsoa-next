---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RoutesConfig

# Interface: RoutesConfig

محددة في: [packages/runtime/src/config.ts:235](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L235)

## الممتلكات

### authenticationModule?

```ts
optional authenticationModule?: string;
```

محددة في: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

طريق وحدة التوثيق التي تستخدمها الطرق المتولدة.

***

### basePath?

```ts
optional basePath?: string;
```

محددة في: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

"مسار الـ "بـاس أي إس أي" "مثل الـ "إف 1 https://myapi.com/v1

***

### bodyCoercion?

```ts
optional bodyCoercion?: boolean;
```

محددة في: [packages/runtime/src/config.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L288)

ما إذا كان يجبر ضمناً بارامترات الجسم إلى نوع مقبول

#### Default

```ts
true
```

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

***

### iocModule?

```ts
optional iocModule?: string;
```

محددة في: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

IoC module path, for example `./inversify/ioc`.

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

محددة في: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

مُقدّم مُقدّم للبرمجة.

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

محددة في: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

العرف Handlebars ممر نموذجي يستخدم بدلاً من نموذج البرمجيات المتوسطة

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

محددة في: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

يكتبون ملف الطريق عندما يطابق المحتوى المولد الملف الحالي

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

***

### routesDir

```ts
routesDir: string;
```

محددة في: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

دليل أين توجد ملفات للطرق

***

### routesFileName?

```ts
optional routesFileName?: string;
```

محددة في: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

اسم ملف لنموذج الطريق المولد
