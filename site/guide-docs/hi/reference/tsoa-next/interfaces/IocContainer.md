---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / IocContainer

# इंटरफ़ेस: IocContainer

में परिभाषित: [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

मिनिमल रनटाइम कंटेनर अनुबंध नियंत्रक उदाहरणों को हल करने के लिए इस्तेमाल किया।

## विधि

### get()

#### कॉल हस्ताक्षर

```ts
get<T>(controller): T;
```

में परिभाषित: [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### प्रकार पैरामीटर

###### T

`T`

##### पैरामीटर

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### रिटर्न

`T`

#### कॉल हस्ताक्षर

```ts
get<T>(controller): Promise<T>;
```

में परिभाषित: [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### प्रकार पैरामीटर

###### T

`T`

##### पैरामीटर

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### रिटर्न

`Promise`\<`T`\>
