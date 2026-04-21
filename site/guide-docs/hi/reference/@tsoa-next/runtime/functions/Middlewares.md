---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Middlewares

# समारोह: Middleware()

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

एक या अधिक रनटाइम मिडलवेयर हैंडलर को एक नियंत्रक या कार्रवाई में संलग्न करता है।

## प्रकार पैरामीटर

### T

`T` * `object` \ `CallableFunction`

## पैरामीटर

### mws

...`T`[]

मिडलवेयर फ़ंक्शन या मिडलवेयर ऑब्जेक्ट्स को स्थापित करने के लिए।

## रिटर्न

`ClassDecorator` & `MethodDecorator`
