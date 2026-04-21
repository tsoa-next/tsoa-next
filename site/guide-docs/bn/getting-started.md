---
title: শুরু করা
lang: bn-BD
lastUpdated: 2026-04-17T20:53:42.041Z
---

# আরম্ভ করা হচ্ছে

** আমরা কি বলবো:

[[toc]]

রিলেভেন্ট API উল্লেখ করেছে: [`Controller`](./reference/tsoa-next/classes/Controller.md)'%s' [`@Route`](./reference/tsoa-next/functions/Route.md)'%s' [`@Get`](./reference/tsoa-next/functions/Get.md)'%s' [`@Path`](./reference/tsoa-next/functions/Path.md)'%s' [`@Query`](./reference/tsoa-next/functions/Query.md)'%s' [`@Post`](./reference/tsoa-next/functions/Post.md)'%s' [`@Body`](./reference/tsoa-next/functions/Body.md)এবং [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md). .

::: warning বিকল্প... (_O)
এই গাইডের লক্ষ্য [express](https://expressjs.com) এবং অনুমান `tsoa-next`বর্তমান সমর্থন নীতি: Node.js ২২ বা নতুন।
আমরা পূর্ববর্তী এলটিএস, বর্তমান এলটিএস এবং এর সমর্থন পরীক্ষা Node CI তে পরবর্তী বনাম
নীচে উদাহরণ `npm`'%s' `pnpm`এবং `yarn` যেখানে কমান্ডটা আলাদা।
:::

## প্রজেক্ট আরম্ভ করা হচ্ছে

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

নির্মাণ করুন `package.json` এবং `tsconfig.json` আপনার ব্যবহৃত প্যাকেজের ব্যবস্থাপক সহ:

::: code-group

```shell [npm]
npm init -y
npm exec tsc -- --init
```

```shell [pnpm]
pnpm init
pnpm exec tsc --init
```

```shell [yarn]
yarn init -y
yarn exec tsc --init
```

:::

অ্যাপ্লিকেশন ইনস্টল ও ইনস্টল করুন TypeScript আপনার পছন্দের প্যাকেজ ম্যানেজারের নির্ভরতা:

::: code-group

```shell [npm]
npm i tsoa-next express
npm i -D typescript @types/node @types/express
```

```shell [pnpm]
pnpm add tsoa-next express
pnpm add -D typescript @types/node @types/express
```

```shell [yarn]
yarn add tsoa-next express
yarn add -D typescript @types/node @types/express
```

:::

থেকে প্রাপ্ত রুট ইম্পোর্ট করুন `tsoa-next`আপনার অ্যাপ্লিকেশন ইনস্টল করা হয় নি এমন প্যাকেজগুলি কন্ট্রোলার দ্বারা ব্যবহৃত হয় `RegisterRoutes` ফাইল
আপনি এই প্যাকেজও পাবেন [npm](https://www.npmjs.com/package/tsoa-next). .

## কনফিগার ব্যবস্থা tsoa & ধরন

```js
// tsoa.json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*Controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build"
  }
}
```

দেখা যাক আমরা কি বলছি tsoa এখানে:
প্রথমত, আমরা উল্লেখ করব যে আমাদের আবেদনের কোন বিন্দুকে কোথায় রাখা হবে।
খুব সম্ভবত, এই ফাইলটি ডাকা হবে `index.ts` অথবা `app.ts`. . আমরা এই ফাইল এক সেকেন্ডের মধ্যে নির্মাণ করবো।

এরপর, শীর্ষ স্তর `controllerPathGlobs` সেটিং tsoa যেখানে এটা কন্ট্রোলারকে খুঁজতে পারে যাতে আমরা ওদের আমদানি করতে না পারি।

এরপর, আমরা বলবো tsoa অতিরিক্ত সম্পত্তি পরীক্ষা করার ক্ষেত্রে কত কঠোর পরিমাণ সম্পত্তি TypeScript শব্দ অথবা অতিরিক্ত টাইপ করার জন্য চিহ্নিত বৈশিষ্ট্য OpenAPI ( ১ করি.
আমরা অতিরিক্ত বৈশিষ্ট্যের ক্ষেত্রে "ignore"। OpenAPI ডিফল্ট কর্ম বাতিল করার সময়, তাদেরকে পুনরায় সঞ্চালনের যোগ্য হিসাবে চিহ্নিত করুন ("qu-location'র মধ্যে একটি ত্রুটি দেখা দিয়েছে) অথবা ক্লায়েন্টের সাথে পুনরায় লেখার প্রচেষ্টা করুন।
পরে, আউটপুট ডিরেক্টরি নির্দিষ্ট করা হবে OpenAPI নির্ধারিত (OAS) এবং আমাদের `routes.ts` ফাইল, আমরা পরে কথা বলব।

আমরা সেট করেছি `specVersion` চিহ্নিত স্থানে চলুন `3` তাই tsoa একটি নতুন কাজ তৈরি করুন OpenAPI v3 নির্ধারিত.
এছাড়াও আপনি ব্যবহার করতে পারেন `3.1` যখন তুমি চাও OpenAPI ৩.১ আউটপুট.

সম্ভাব্য কনফিগারেশনের সম্পূর্ণ তালিকা প্রদর্শন করে দেখো [API রেফারেন্স](./reference/tsoa-next/interfaces/Config.md)

::: tip
ডিফল্ট টি কনফিগ এই সহায়িকার জন্য কাজ করবে, একটি উন্নত tconfig কনফিগারেশন । জেসন এ রকম কিছু দেখতে চাইঃ
::: details

```jsonc
{
  "compilerOptions": {
    /* Basic Options */
    "incremental": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "build",

    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Additional Checks */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Module Resolution Options */
    "moduleResolution": "node",
    "baseUrl": ".",
    "esModuleInterop": true,

    /* Experimental Options */
    "experimentalDecorators": true,
    // emitDecoratorMetadata is not needed by tsoa-next itself

    /* Advanced Options */
    "forceConsistentCasingInFileNames": true,
  },
}
```

:::

## আমাদের প্রথম মডেল গ্রহণ

যদি আপনার কাছে থাকে OpenAPI অনুরূপরূপে, আপনি ব্যবহার করতে পারেন OpenAPI আপনার মডেল বা ইন্টারফেস তৈরি করতে টুল।
না হলে, চলো একটা সংজ্ঞায়িত করি `User` ইন্টারফেস `src/users/user.ts`. .

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

আমাদের কন্ট্রোলারকে চিহ্নিত করার আগে, এটা একটা ভালো চিন্তা যেটা আমাদের মডেলদের সাথে যোগাযোগ করে... ...আর আমাদের মডেলদের সাথে যোগাযোগ করে...

```ts
// src/users/usersService.ts
import { User } from './user'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      status: 'Happy',
      phoneNumbers: [],
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: 'Happy',
      ...userCreationParams,
    }
  }
}
```

## একজন সহজ নিয়ন্ত্রণ গ্রহণ করা

```typescript {15,17,19,20,25,26,28}
// src/users/usersController.ts
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

একটু পেছনে গিয়ে কথা বলি এখানে কি হচ্ছে।
যেমনটা আপনি আশা করতে পারেন, আমরা একটি নির্দিষ্ট করা হয় `/users/` ব্যবহার পদ্ধতি [`@Route()`](./reference/tsoa-next/functions/Route.md) আমাদের কন্ট্রোল ক্লাস দেখাশোনার জন্য.

এছাড়াও আমরা ২টি পদ্ধতি সংজ্ঞায়িত করেছি: `getUser` এবং `createUser`. .
এটা [`@Get()`](./reference/tsoa-next/functions/Get.md) বেস রুটের সমন্বয়সাধন `/users/` বলবে tsoa আগত সকল অনুরোধের জন্য এই পদ্ধতির অনুরোধ জানানো হবে (_t) `/users/{{userId}}`কোথায় (_H) Id_} টেমপ্লেট একটি টেমপ্লেট।

::: tip ওপেন- পি- পি- জি ফিক্সিং পাথপ প্রোগ্রামName
শিথিল রাউটিং tsoa ঘনিষ্ঠ আয়না OpenAPIপূর্বতন কারণে পাথতটে।
পাথ্টিং পাথের ব্যবহার উল্লেখ করে, সংরক্ষিত ব্রেসলেটের (এইচ.ডি.এফ.) দ্বারা চিহ্নিত একটি URL পাথের একটি অংশ হিসেবে চিহ্নিত করা হয়।
:::

ঘোড়দৌড়ের নিচে, এটা যেন সাজানো `app.get('users/:userId')`. .
যখন প্রকাশ করা হয়, আপনি কি regex-র রাস্তা ব্যবহার করতে পারবেন, তখন আমরা রাস্তা ভাগ করে ফেলতে চাই।
আপনি did_name ব্যবহার করে সংখ্যা%s ব্যবহার করার চেষ্টা করছেন (_d) [`@Path()`](./reference/tsoa-next/functions/Path.md) গঠনশীল `userId` টাইপ সংখ্যা tsoa se_ sected
একইভাবে, যদি আপনি একটি নির্দিষ্ট বিন্যাসের সঙ্গে একটি আয়াতসমূহ গ্রহণ করতে চান, তবে JSON স্কীমা পাদটীকা ব্যবহার করে আপনি তা করতে পারেন। আপনি যে সম্পর্কে আরও শিখতে পারেন [here](#what-s-next). .

tsoa-next সমর্থিত পাথ, অনুসন্ধান, হেডার এবং দেহ নকশার তালিকা সমর্থন করে। [`@FormField()`](./reference/tsoa-next/functions/FormField.md)'%s' [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)এবং [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)এবং সে মনে করবে যে , বিদায়ের ক ্ ষণ এসে গেছে । [`@Request()`](./reference/tsoa-next/functions/Request.md) এবং [`@Res()`](./reference/tsoa-next/functions/Res.md). .

::: tip
পরামিতির পরামিতির মান যদি http://placesers- এ সমান, আপনি হয়ত যুক্তি বাদ দিতে পারেন, অন্যথায় আপনি একটি আর্গুমেন্ট পাঠাতে পারেন:

```ts
@Query('my-query') myQuery: string;
```

:::

সব স্থাপত্যবিদের সম্পূর্ণ তালিকা পাওয়া যাবে [here](./decorators). .

::: warning গুহা
সর্বদা একটি নাম ব্যবহার করা হবে (মাউস)`export class C`যাতে রয়েছে সুপ ্ রতিষ ্ ঠিত গ ্ রন ্ থসমূহ । tsoa সঠিকভাবে নিতে হলে
ডিফল্ট এক্সপোর্ট`export default class C`সমর্থিত নয়।
:::

## সার্ভার থেকে ফোল্ডার তৈরি করা হচ্ছে

এখন তৈরি কর `app.ts` এবং `server.ts` এই ফোল্ডারে আমাদের উৎস ডিরেক্টরীতে ফাইল সংরক্ষণ করো:

```ts
// src/app.ts
import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from '../build/routes'

export const app = express()

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
)
app.use(json())

RegisterRoutes(app)
```

```ts
// src/server.ts
import { app } from './app'

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## ফাইল নির্মিত হয়েছে

এই মুহূর্তে আপনি হয়ত লক্ষ্য করেছেন TypeScript খুঁজে পাওয়া যায়নি `RegisterRoutes` ইম্পোর্ট করা হচ্ছে `build/routes`. .
কারণ আমরা কিছু বলিনি tsoa রুট এবং ফাইল নির্মাণ করুন OpenAPI নমুনা এখনও আছে।
এখন সেটা করা যাক:

```shell
mkdir -p build # Create the build directory if it doesn't exist
```

::: code-group

```shell [npm]
npm exec tsoa -- spec-and-routes
```

```shell [pnpm]
pnpm exec tsoa spec-and-routes
```

```shell [yarn]
yarn exec tsoa spec-and-routes
```

:::

আপনার নির্মিত ফাইল বার্ন করা উচিত ও আপনি সম্পাদন করতে পারেন TypeScript এবং আপনার সার্ভার আরম্ভ করুন:

::: code-group

```shell [npm]
npm exec tsc -- --outDir build --experimentalDecorators
```

```shell [pnpm]
pnpm exec tsc --outDir build --experimentalDecorators
```

```shell [yarn]
yarn exec tsc --outDir build --experimentalDecorators
```

:::

```shell
node build/src/server.js
```

::: tip

এই স্ক্রিপ্টগুলি আপনার হাতে যোগ করতে পারেন `package.json` এই বিন্দুতে:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## এরপর কি?

- ব্যবহারকারী দ্বারা `tsc` এবং `tsoa routes` উন্নয়ন তেমন সুবিধাজনক নয়।
- [ অধ্যয়ন প্রশ্নাবলি] OpenAPI একটি আপ-প্রসারন সহকারে কাজ করার সময় আমাদের প্রতিক্রিয়াসূচক লুপ ব্যবহার করা হবে SwaggerUI উন্নয়নের সময়।

আমরা এটা ব্যবহার করে উন্নতি করতে পারি [live reloading](./live-reloading). .

- সঠিক ব্যবহার করে সঠিক ত্রুটি সংশোধন করার জন্য আমাদের প্রতিক্রিয়া [error handling](./error-handling)- ব্যবহার করা হচ্ছে [Descriptions](./descriptions)'%s' [উদাহরণ](./examples) এবং [Annotations](./annotations) উন্নত এবং ভাল নথিপত্রের জন্য
