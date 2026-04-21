---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / File

# इंटरफ़ेस: फ़ाइल

में परिभाषित: [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

ऑब्जेक्ट जिसमें फ़ाइल मेटाडाटा और एक्सेस जानकारी शामिल है।

## गुण

### buffer

```ts
buffer: Buffer;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` केवल: पूरी फ़ाइल युक्त एक बफर।

***

### destination

```ts
destination: string;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` केवल: निर्देशिका जिसके लिए यह फ़ाइल अपलोड की गई है।

***

### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

```ts
encoding: string;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

मूल्य `Content-Transfer-Encoding` इस फाइल के लिए हैडर।

#### Deprecated

जुलाई 2015 से

#### See

RFC 7578, धारा 4.7

***

### fieldname

```ts
fieldname: string;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

इस फाइल से जुड़े फॉर्म फ़ील्ड का नाम।

***

### filename

```ts
filename: string;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` केवल: इस फाइल का नाम `destination`।

***

### mimetype

```ts
mimetype: string;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

मूल्य `Content-Type` इस फाइल के लिए हैडर।

***

### originalname

```ts
originalname: string;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

अपलोडर के कंप्यूटर पर फ़ाइल का नाम।

***

### path

```ts
path: string;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` केवल: अपलोड की गई फ़ाइल में पूर्ण पथ।

***

### size

```ts
size: number;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

bytes में फ़ाइल का आकार।

***

### stream

```ts
stream: Readable;
```

में परिभाषित: [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

इस फ़ाइल की पठनीय धारा। केवल उपलब्ध `_handleFile`
कस्टम के लिए कॉलबैक `StorageEngine`S.
