---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / File

# الوجه: الملف

محددة في: [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

اعتراض يحتوي على البيانات الوصفية للملف والحصول على المعلومات

## الممتلكات

### buffer

```ts
buffer: Buffer;
```

محددة في: [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` (بوفر) يحتوي على الملف بأكمله

***

### destination

```ts
destination: string;
```

محددة في: [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` فقط: الدليل الذي تم تحميله على هذا الملف.

***

### ¶ ¶ ¶

```ts
encoding: string;
```

محددة في: [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

قيمة `Content-Transfer-Encoding` رئيس هذا الملف

#### Deprecated

منذ تموز/يوليه 2015

#### See

RFC 7578, Section 4.7

***

### fieldname

```ts
fieldname: string;
```

محددة في: [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

اسم مجال الاستمارة المرتبط بهذا الملف

***

### filename

```ts
filename: string;
```

محددة في: [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` فقط: اسم هذا الملف `destination`.

***

### mimetype

```ts
mimetype: string;
```

محددة في: [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

قيمة `Content-Type` رئيس هذا الملف

***

### originalname

```ts
originalname: string;
```

محددة في: [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

اسم الملف على حاسوب المحمل

***

### path

```ts
path: string;
```

محددة في: [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` فقط: الطريق الكامل للملف المحمل.

***

### size

```ts
size: number;
```

محددة في: [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

حجم الملف

***

### stream

```ts
stream: Readable;
```

محددة في: [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

تيار قابل للقراءة من هذا الملف متاح فقط `_handleFile`
نداء من أجل العرف `StorageEngine`S.
