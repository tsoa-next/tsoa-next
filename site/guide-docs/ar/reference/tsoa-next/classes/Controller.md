---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Controller

# الرتبة: المراقب المالي

محددة في: [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

درجة المتحكمين في القاعدة التي تجعل الإجراءات تلغي قانون الوضع النهائي والرؤساء

## Constructors

### المؤسسة

```ts
new Controller(): Controller;
```

#### العودة

`Controller`

## الطرائق

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

محددة في: [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

يُعيدُ a مُعَدَّل سابقاً قيمة رئيسِ الاستجابة.

#### البارامترات

##### name

`string`

#### العودة

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

محددة في: [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

يُعيدُ كُلّ رؤسَاءَ الاستجابةِ كُلّفَ على مركزِ المراقبِ.

#### العودة

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

محددة في: [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

Res the HTTP status code set through [setStatus](#setstatus)إن وجدت

#### العودة

`number` \| `undefined`

***

### setHeader()

#### التوقيع

```ts
setHeader<H>(name, value?): void;
```

محددة في: [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### البارامترات النوعية

###### H

`H` * التذييلات* `OutgoingHttpHeaders`

##### البارامترات

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### العودة

`void`

#### التوقيع

```ts
setHeader(name, value?): void;
```

محددة في: [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### البارامترات

###### name

`string`

###### value?

`string` \| `string`[]

##### العودة

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

محددة في: [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

يُحدد قانون مركز شركة HTTP الذي يجب أن يعود مُعالج الطرق المولد.

#### البارامترات

##### statusCode

`number`

#### العودة

`void`
