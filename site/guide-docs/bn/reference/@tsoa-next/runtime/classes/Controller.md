---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Controller

# শ্রেণী: Control

নির্ধারিত মান: [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

অবস্থাসূচক কোড ও হেডারগুলি অনুসরণ করতে ব্যবহৃত হয়।

## কনস্ট্রাক্টর

### কনস্ট্রাক্টর

```ts
new Controller(): Controller;
```

#### প্রাপ্ত মান

`Controller`

## পদ্ধতি

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

পূর্বে নির্ধারিত হেডারের মান প্রেরিত হবে।

#### পরামিতি

##### name

`string`

#### প্রাপ্ত মান

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

নিয়ন্ত্রণ ব্যবস্থা রূপে চিহ্নিত সকল প্রত্যুত্তর প্রাপ্ত হয়েছে।

#### প্রাপ্ত মান

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

HTTP অবস্থা দ্বারা নির্ধারিত কোড উৎপন্ন করে [setStatus](#setstatus)যদি কোন.

#### প্রাপ্ত মান

`number` \| `undefined`

***

### setHeader()

পুনরুদ্ধারের জন্য একটি প্রত্যুত্তরের মান । উল্লিখিত রাস্তা থেকে পুনরুদ্ধার করা উচিত ।

#### কল স্বাক্ষর

```ts
setHeader<H>(name, value?): void;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### পরামিতির পরামিতি

###### H

`H` * XML getends *কি `OutgoingHttpHeaders`

##### পরামিতি

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### প্রাপ্ত মান

`void`

#### কল স্বাক্ষর

```ts
setHeader(name, value?): void;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### পরামিতি

###### name

`string`

###### value?

`string` \| `string`[]

##### প্রাপ্ত মান

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

HTTP স্ট্যাটাস কোড নির্ধারণ করে যে, নির্মিত রুট হ্যান্ডলার সঠিক কিনা ।

#### পরামিতি

##### statusCode

`number`

#### প্রাপ্ত মান

`void`
