---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / File

# 接口: 文件

定义如下: [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

包含文件元数据和访问信息的对象.

## 属性

### buffer

```ts
buffer: Buffer;
```

定义如下: [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` 仅:包含全部文件的缓冲器。

***

### destination

```ts
destination: string;
```

定义如下: [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` 仅: 此文件已上传到的目录 。

***

### 编码

```ts
encoding: string;
```

定义如下: [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

数值 `Content-Transfer-Encoding` 此文件的页眉 。

#### Deprecated

2015年7月以来

#### See

RFC 7578, 第4.7节

***

### fieldname

```ts
fieldname: string;
```

定义如下: [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

与此文件相关的窗体字段名称 。

***

### filename

```ts
filename: string;
```

定义如下: [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` 仅限: 此文件的名称在 `destination`。 。 。 。

***

### mimetype

```ts
mimetype: string;
```

定义如下: [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

数值 `Content-Type` 此文件的页眉 。

***

### originalname

```ts
originalname: string;
```

定义如下: [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

上传者电脑上的文件名称 。

***

### path

```ts
path: string;
```

定义如下: [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` 仅:上传文件的完整路径。

***

### size

```ts
size: number;
```

定义如下: [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

以字节表示的文件大小 。

***

### stream

```ts
stream: Readable;
```

定义如下: [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

此文件的可读流 。 仅供 `_handleFile`
调用自定义 `StorageEngine`编号
