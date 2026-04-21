---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Res

# समारोह: Res()

```ts
function Res(): ParameterDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/response.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L38)

एक लाइब्रेरी-एग्नोस्टिक उत्तरदाता फ़ंक्शन को इंजेक्ट करें जिसका उपयोग टाइप-चेक (आमतौर पर त्रुटि-) प्रतिक्रियाओं के निर्माण के लिए किया जा सकता है।

के रूप में पैरामीटर annotate `TsoaResponse<Status, Data, Headers>` इसलिए tsoa दस्तावेजी प्रतिक्रिया को पूरा कर सकते हैं।

## रिटर्न

`ParameterDecorator`
