---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### পাথ ম্যাপ

পার [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) নীচে [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> কখনও কখনও মডিউল সরাসরি বেসবলারের মধ্যে অবস্থিত হয় না। উদাহরণস্বরূপ, একটি মডিউলে ইম্পোর্ট করা হবে "jetza" -এ ক্লিকে অনুবাদ করা হবে। সঞ্চালনযোগ্য সময়ের মধ্যে সংরক্ষণের উদ্দেশ্যে চিহ্নিত ফাইলের নামগুলির তালিকা নির্মাণে ব্যবহৃত প্লাগ-ইন। এই তালিকায় উপস্থিত তথ্যের নথিপত্র ও সিস্টেমJS নথিপত্র দেখুন।
>> এটা TypeScript sysconfig.jon ফাইলে এই ধরনের মানচিত্রের ঘোষণা সমর্থন করে। জৈবন্দির জন্য "পুরুষ" সম্পত্তির একটি উদাহরণ এখানে দেয়া হলো।

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

এই পার্টিশনটি ব্যবহার করলে, আপনার ব্যবহৃত অভ্যন্তরীণ জেনারেটরগুলিও কনফিগার করা যাবে:

- ছেড়ে দে `tsoa-next` একটি থেকে কম্পাইলার অপশন পড়া হবে `tsconfig.json`- সুনির্দিষ্ট মান প্রয়োগ করা হয়েছে `compilerOptions` তোমার মধ্যে `tsoa` কনফিগারেশন

`tsconfig.json` এটা হচ্ছে একটি ইনপুট উৎস, চূড়ান্ত কর্তৃপক্ষ নয়। এগুলো হলো:

1. TypeScript অভ্যন্তরীণ ডিফল্ট
2. মীমাংসা `tsconfig.json`3. সুনির্দিষ্ট `compilerOptions` চিহ্নিত স্থানে `tsoa` কনফিগারেশন

যদি `tsconfig` এটা বিচ্ছিন্ন, `tsoa-next` অনুসন্ধান করা হচ্ছে `tsconfig.json` আরম্ভ থেকে লোড `tsoa` কনফিগারেশন সংরক্ষণের ডিরেক্টরি। যদি `tsconfig` প্রদান করা হয়েছে, কনফিগারেশন ফাইলের সাথে সুসংগত করা হবে।

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

আপনি যখন আপনি চান না, তখন সরাসরি কম্পাইলার অপশন সরবরাহ করতে পারেন। `tsconfig.json`. .

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
