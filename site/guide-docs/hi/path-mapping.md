---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### पथ मानचित्रण

प्रति [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) नीचे [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> कभी-कभी मॉड्यूल सीधे आधार यूआरएल के तहत स्थित नहीं होते हैं। उदाहरण के लिए, एक मॉड्यूल "jquery" के लिए आयात को रनटाइम में "node_modules"jquery \dist \jquery.slim.min.js" में अनुवाद किया जाएगा। लोडर रन-टाइम पर फ़ाइलों के लिए मॉड्यूल नामों को मैप करने के लिए एक मैपिंग कॉन्फ़िगरेशन का उपयोग करते हैं, आवश्यकता Js प्रलेखन और SystemJS प्रलेखन देखें।
>> The TypeScript संगीतकार tsconfig.json फ़ाइलों में "पैथ" संपत्ति का उपयोग करके इस तरह के मैपिंग की घोषणा का समर्थन करता है। यहां jQuery के लिए "पैथ" संपत्ति को निर्दिष्ट करने का एक उदाहरण है।

```js
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
    }
  }
}
```

यदि आपके पास ऐसी परियोजना है जो इस कार्यक्षमता का उपयोग करती है, तो आप आंतरिक जनरेटर को या तो कॉन्फ़िगर कर सकते हैं:

- अवकाश `tsoa-next` एक से compiler विकल्प पढ़ा `tsconfig.json`- विशिष्ट मूल्यों को ओवरराइड करना `compilerOptions` अपने `tsoa` विन्यास

`tsconfig.json` एक इनपुट स्रोत है, अंतिम अधिकार नहीं है। उपस्थिति है:

1. TypeScript आंतरिक डिफ़ॉल्ट
2. हल करना `tsconfig.json`3. स्पष्ट `compilerOptions` में `tsoa` विन्यास

अगर `tsconfig` omitted है, `tsoa-next` देखना `tsconfig.json` लोड से शुरू `tsoa` निर्देशिका को कॉन्फ़िगर करें। अगर `tsconfig` प्रदान की जाती है, यह उस कॉन्फ़िगरेशन फ़ाइल के सापेक्ष हल हो जाता है।

```js
{
  "tsconfig": "./tsconfig.json",
  "spec": {
    ...
  },
  "routes": {
    ...
  },
  "compilerOptions": {
    "baseUrl": "./path/to/base/url",
    "paths": {
      "exampleLib": ["./path/to/example/lib"]
    }
  }
}
```

जब आप भरोसा नहीं करना चाहते हैं तो आप सीधे कम्पाइलर विकल्प भी प्रदान कर सकते हैं `tsconfig.json`।

```js
{
  "spec": {
    ...
  },
  "routes": {
    ...
  },
   "compilerOptions": {
        "baseUrl": "./path/to/base/url",
        "paths": {
            "exampleLib": "./path/to/example/lib"
        }
    }
}
```
