---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# JSON स्कीमा / tsoa कीवर्ड एनोटेशन

हुड के नीचे OpenAPI सभी डेटा मॉडल विनिर्देशों के लिए JSON स्कीमा ड्राफ्ट 00 पर भारी निर्भर करता है।
JSON स्कीमा 00 ड्राफ्ट उन डेटा प्रकारों को परिभाषित करता है जिन्हें कार्यान्वित नहीं किया जाता है TypeScript।
एक महान उदाहरण पूर्णांक हैं।
यदि हम यह बताना चाहते हैं कि संख्या एक पूर्णांक होना चाहिए, तो संख्या एक पूर्णांक होना चाहिए।
tsoa इसे ओएएस में निर्दिष्ट करेगा और इसके खिलाफ आने वाले अनुरोधों को मान्य करेगा।

::: warning
हमेशा के रूप में, _ \$ref_ प्रतिबंध लागू
:::

सामान्य तौर पर, JSDoc प्रत्येक बार नोटेशन बहुत समान है:

```
@<keyword> <argument>* <rejectionMessage>?
```

उदाहरण:

```typescript {3,4,8,12}
interface CustomerDto {
    /**
     * @isInt we would kindly ask you to provide a number here
     * @minimum 18 minimum age is 18
     */
    age: number;
    /**
     * @minItems 1 at least 1 category is required
     */
    tags: string[];
    /**
     * @pattern ^(.+)@(.+)$ please provide correct email
     */
    email: string;
}
```

::: tip
मापदंडों के लिए, उपयोग करें `@<keyword> <paramName> <argument>* <rejectionMessage>?` अपने में वाक्यविन्यास JSDoc (similar to) [descriptions](#parameter-descriptions) या [examples](#parameter-examples))
:::

## समर्थित कीवर्ड की सूची (विवरण के साथ)

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### सामान्य

- `@default`- `@format`

::: danger
प्रारूपों को आम तौर पर मान्य नहीं किया जाएगा, इसके अलावा `format: date(time)`, जो स्वचालित रूप से टीएस प्रकार के लिए उत्पन्न किया जाएगा `Date`।
:::

### तारीख

- `@isDateTime <errMsg>` कस्टम त्रुटि संदेश सेट करने के लिए
- `@isDate <errMsg>` कस्टम त्रुटि संदेश सेट करने के लिए
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### न्यूमेरिक

- `@isInt <errMsg>` **tsoa विशेष* चूंकि टीएस एक प्रकार के रूप में पूर्णांक को नहीं जानता है
- `@isFloat <errMsg>` **tsoa विशेष* क्योंकि टीएस एक प्रकार के रूप में फ्लोट नहीं जानता
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

उत्पन्न चश्मे के लिए, Swagger 2.0 और 2.0 OpenAPI 3.0 उत्तोलन `exclusiveMinimum` / `exclusiveMaximum` संशोधक `minimum` / `maximum`जबकि OpenAPI 3.1 संख्यात्मक उत्सर्जन करता है `exclusiveMinimum` / `exclusiveMaximum` सीधे मूल्य

### स्ट्रिंग

- `@isString <errMsg>` कस्टम त्रुटि संदेश सेट करने के लिए
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### ऐरे

- `@isArray <errMsg>` कस्टम त्रुटि संदेश सेट करने के लिए
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### बोओलेन

- `@isBoolean <errMsg>` कस्टम त्रुटि संदेश सेट करने के लिए
