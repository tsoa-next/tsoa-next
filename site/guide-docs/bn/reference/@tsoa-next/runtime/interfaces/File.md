---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / File

# ইন্টারফেস ফাইল:

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

মিটা-ডাটা ফাইল এবং তথ্য ধারণকারী ফাইলটি উপস্থিত রয়েছে।

## বৈশিষ্ট্য

### buffer

```ts
buffer: Buffer;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` শুধুমাত্র: ফাইলের মধ্যে একটি বাফার উপস্থিত রয়েছে ।

***

### destination

```ts
destination: string;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` শুধুমাত্র: ডিরেক্টরি এই ফাইলটি আপলোড করা হয়েছে ।

***

### নিদর ্ শন:

```ts
encoding: string;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

মান `Content-Transfer-Encoding` এই ফাইলগুলির জন্য হেডার

#### Deprecated

২০১৫ সাল থেকে

#### See

787, বিভাগ 47.

***

### fieldname

```ts
fieldname: string;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

এই ফাইলের সাথে যুক্ত ধরনের ক্ষেত্র।

***

### filename

```ts
filename: string;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` শুধুমাত্র: এর মধ্যে ফাইলের নাম `destination`. .

***

### mimetype

```ts
mimetype: string;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

মান `Content-Type` এই ফাইলগুলির জন্য হেডার

***

### originalname

```ts
originalname: string;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

আপলোডারের কম্পিউটারে ফাইলের নাম

***

### path

```ts
path: string;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` শুধুমাত্র: আপলোডকৃত ফাইলের সম্পূর্ণ পাথ ।

***

### size

```ts
size: number;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

ফাইলের মাপ বাইটের মাপ।

***

### stream

```ts
stream: Readable;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

এই ফাইলটির একটি পাঠযোগ্য স্ট্রিম। শুধুমাত্র উপলব্ধ রয়েছে `_handleFile`
স্বনির্বাচিত সংকলন `StorageEngine`এস.
