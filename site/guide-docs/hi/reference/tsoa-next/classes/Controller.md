---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Controller

# कक्षा: नियंत्रक

में परिभाषित: [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

बेस कंट्रोलर क्लास जो इवेंटल स्टेटस कोड और हेडर को ओवरराइड करने की अनुमति देता है।

## कंस्ट्रक्टर

### रचनाकार

```ts
new Controller(): Controller;
```

#### रिटर्न

`Controller`

## विधि

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

में परिभाषित: [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

एक पूर्व निर्धारित प्रतिक्रिया शीर्षलेख मान लौटाता है।

#### पैरामीटर

##### name

`string`

#### रिटर्न

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

में परिभाषित: [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

नियंत्रक उदाहरण पर निर्दिष्ट सभी प्रतिक्रिया शीर्षलेखों को वापस करता है।

#### रिटर्न

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

में परिभाषित: [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

HTTP के माध्यम से सेट स्टेटस कोड वापस करता है [setStatus](#setstatus)यदि कोई हो

#### रिटर्न

`number` \| `undefined`

***

### setHeader()

#### कॉल हस्ताक्षर

```ts
setHeader<H>(name, value?): void;
```

में परिभाषित: [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### प्रकार पैरामीटर

###### H

`H` * विस्तार * keyof `OutgoingHttpHeaders`

##### पैरामीटर

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### रिटर्न

`void`

#### कॉल हस्ताक्षर

```ts
setHeader(name, value?): void;
```

में परिभाषित: [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### पैरामीटर

###### name

`string`

###### value?

`string` \| `string`[]

##### रिटर्न

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

में परिभाषित: [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

सेट करता है कि उत्पन्न रूट हैंडलर को वापस करना चाहिए।

#### पैरामीटर

##### statusCode

`number`

#### रिटर्न

`void`
