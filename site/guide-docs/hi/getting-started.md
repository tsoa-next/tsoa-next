---
title: शुरुआत करें
lang: hi-IN
lastUpdated: 2026-04-17T20:53:42.041Z
---

# शुरू करना

**हम किस बारे में बात करेंगे:*

[[toc]]

प्रासंगिक एपीआई संदर्भ: [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), [`@Get`](./reference/tsoa-next/functions/Get.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Post`](./reference/tsoa-next/functions/Post.md), [`@Body`](./reference/tsoa-next/functions/Body.md), और [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md)।

::: warning संगतता नोट
यह गाइड लक्ष्य [express](https://expressjs.com) और मान `tsoa-next`वर्तमान समर्थन नीति: Node.js 22 या नया।
हम पिछले LTS, वर्तमान LTS, और Node CI में आगे
नीचे दिए गए उदाहरणों में शामिल हैं `npm`, `pnpm`, और `yarn` वेरिएंट जहां कमांड भिन्न होता है।
:::

## हमारी परियोजना शुरू करना

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

बनाना `package.json` और `tsconfig.json` अपनी पसंद के पैकेज मैनेजर के साथ:

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

ऐप इंस्टॉल करें और TypeScript अपनी पसंद के पैकेज मैनेजर के साथ निर्भरता:

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

उत्पन्न मार्गों से आयात `tsoa-next`इसलिए आपके अनुप्रयोग इंस्टॉल पैकेज नियंत्रकों और उत्पन्न द्वारा उपयोग किए जाने वाले पैकेज भी हैं `RegisterRoutes` फ़ाइलें
आप पर प्रकाशित पैकेज भी पा सकते हैं [npm](https://www.npmjs.com/package/tsoa-next)।

## कॉन्फ़िगर करना tsoa टाइपस्क्रिप्ट

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

चलो हम क्या कह रहे हैं पर एक नज़र डालते हैं tsoa यहाँ:
सबसे पहले, हम निर्दिष्ट करते हैं कि हमारे आवेदन के लिए प्रवेश बिंदु कहाँ होगा।
सबसे अधिक संभावना, इस फाइल को बुलाया जाएगा `index.ts` या `app.ts`। हम इस फाइल को एक सेकंड में बना देंगे।

बाद में, शीर्ष स्तर `controllerPathGlobs` सेटिंग बताती है tsoa जहां यह नियंत्रकों के लिए देख सकता है इसलिए हमें मैन्युअल रूप से उन्हें आयात करने की आवश्यकता नहीं है।

अगला, हम बताते हैं tsoa कैसे सख्त अतिरिक्त संपत्ति की जाँच (का उपयोग करने के लिए) TypeScript अवधि) या अतिरिक्त संपत्ति की जांच (उपयोग करने के लिए) OpenAPI शब्दावली होना चाहिए।
हम "ignore" अतिरिक्त गुण ("ignore") चुन सकते हैं OpenAPI डिफ़ॉल्ट रूप से, उन्हें सत्यापन के दौरान हटा दें ("silently-remove-extras"), या क्लाइंट ("throw-on-extras") में एक त्रुटि को वापस फेंक दें।
इसके बाद हमने आउटपुट डायरेक्टरी को आउट करने के लिए सेट किया OpenAPI विनिर्देश (ओएएस) और हमारे `routes.ts` फ़ाइल, जिसे हम बाद में बात करेंगे।

हमने सेट किया `specVersion` to `3` इसलिए tsoa उत्पन्न करेगा OpenAPI v3 विनिर्देशन।
आप भी उपयोग कर सकते हैं `3.1` जब आप चाहते हैं OpenAPI 3.1 आउटपुट।

सभी संभावित विन्यास की पूरी सूची के लिए, एक नज़र डालें [API संदर्भ](./reference/tsoa-next/interfaces/Config.md)

::: tip
जबकि डिफ़ॉल्ट ts विन्यास इस गाइड के लिए काम करेंगे, एक बेहतर tsconfig. जेसन इस तरह कुछ दिखाई देगा:
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

## हमारे पहले मॉडल को परिभाषित करना

अगर आपके पास पहले से ही है OpenAPI विशिष्टता, आप मौजूदा उपयोग कर सकते हैं OpenAPI अपने मॉडल या इंटरफेस उत्पन्न करने के लिए टूलींग।
अन्यथा, चलो एक को परिभाषित करते हैं `User` में अंतरफलक `src/users/user.ts`।

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

इससे पहले कि हम अपने नियंत्रक को परिभाषित करना शुरू करते हैं, यह आमतौर पर एक ऐसी सेवा बनाने का एक अच्छा विचार है जो नियंत्रक परत में उस तर्क को दिखाने के बजाय हमारे मॉडल के साथ बातचीत को संभालती है।

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

## एक साधारण नियंत्रक को परिभाषित करना

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

चलो एक कदम वापस लेते हैं और यहां क्या चल रहा है इसके बारे में बात करते हैं।
जैसा कि आप पहले से ही बता सकते हैं, हम एक को परिभाषित कर रहे हैं `/users/` मार्ग का उपयोग करना [`@Route()`](./reference/tsoa-next/functions/Route.md) हमारे नियंत्रक वर्ग के ऊपर सजावट।

इसके अतिरिक्त, हम 2 तरीकों को परिभाषित करते हैं: `getUser` और `createUser`।
The [`@Get()`](./reference/tsoa-next/functions/Get.md) हमारे आधार मार्ग के साथ संयोजन में सजावट `/users/` बताएगा tsoa प्रत्येक के लिए इस विधि को लागू करने के लिए _GET_ अनुरोध करने के लिए `/users/{{userId}}`, where _{user Id}_ एक टेम्पलेट है।

::: tip OpenAPI पथ Templating
में रूटिंग tsoa बारीकी से दर्पण OpenAPI'योग्यता कारणों के लिए पथ templating'।
पाथ टेम्पलेटिंग टेम्पलेट अभिव्यक्तियों के उपयोग को संदर्भित करता है, जिसे कर्ली ब्रेसेस ({}) द्वारा सीमित किया जाता है, ताकि पथ मापदंडों का उपयोग करके बदलने योग्य यूआरएल पथ के एक खंड को चिह्नित किया जा सके।
:::

हुड के तहत, यह निश्चित करना होगा `app.get('users/:userId')`।
जबकि एक्सप्रेस आपको रेगेक्स-ish मार्ग परिभाषाओं का उपयोग करने की अनुमति देता है, हम रूटिंग और सत्यापन को स्पष्ट रूप से विभाजित करना पसंद करते हैं।
क्योंकि आप के लिए पूछ रहे हैं _id_ to be a _number_ by use [`@Path()`](./reference/tsoa-next/functions/Path.md) एक साथ सजावट `userId` प्रकार संख्या tsoa I.e. a _string_ here.
इसी तरह, यदि आप एक निश्चित पैटर्न के साथ एक _स्ट्रिंग_ को स्वीकार करना चाहते हैं, तो आप JSON स्कीमा एनोटेशन का उपयोग कर सकते हैं। आप इसके बारे में अधिक जान सकते हैं [here](#what-s-next)।

tsoa-next सामान्य पथ, क्वेरी, हेडर और बॉडी डेकोरेटरों का समर्थन करता है, और मल्टीपार्ट फॉर्म-डाटा डेकोरेटरों जैसे कि मल्टीपार्ट फॉर्म-डाटा डेकोरेटरों का भी समर्थन करता है। [`@FormField()`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md), और [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md), साथ ही रनटाइम-केवल इंजेक्शन मापदंडों जैसे कि [`@Request()`](./reference/tsoa-next/functions/Request.md) और [`@Res()`](./reference/tsoa-next/functions/Res.md)।

::: tip
यदि पैरामीटर का नाम एचटीटीपी संदेश पैरामीटर के बराबर है, तो आप सजावटकारों के लिए तर्क को छोड़ सकते हैं, अन्यथा आप एक तर्क प्रदान कर सकते हैं:

```ts
@Query('my-query') myQuery: string;
```

:::

सभी सजावटकर्ताओं की पूरी सूची पाई जा सकती है [here](./decorators)।

::: warning कब्रिस्तान
हमेशा एक नामित निर्यात का उपयोग करें`export class C`आदेश में नियंत्रक वर्ग पर tsoa इसे सही ढंग से लेने के लिए।
डिफ़ॉल्ट निर्यात`export default class C`वर्तमान में समर्थित नहीं हैं।
:::

## हमारे एक्सप्रेस सर्वर बनाना

अब बनाना `app.ts` और A `server.ts` इस तरह हमारे स्रोत निर्देशिका में फ़ाइल:

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

## उत्पन्न फ़ाइलों का निर्माण

इस बिंदु पर आपको देखा जा सकता है कि TypeScript नहीं मिलेगा `RegisterRoutes` से आयात `build/routes`।
इसलिए क्योंकि हम नहीं पूछते tsoa रूट फ़ाइल उत्पन्न करना और OpenAPI अभी तक कल्पना करो।
अब करते हैं:

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

अब आपकी उत्पन्न फ़ाइलों को बनाया जाना चाहिए और आप संकलन कर सकते हैं TypeScript और अपने सर्वर शुरू:

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

आप इन लिपियों को अपने पास जोड़ सकते हैं `package.json` इस बिंदु पर:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## अगला क्या है?

- मैन्युअल रूप से चालान करना `tsc` और `tsoa routes` विकास में बहुत सुविधाजनक नहीं है।
- हमारा पहला निरीक्षण OpenAPI विनिर्देशन और सुपरचार्जिंग हमारे फीडबैक पाश एक अप-टू-डेट संस्करण की सेवा करके SwaggerUI विकास के दौरान।

हम इसे बेहतर कर सकते हैं [live reloading](./live-reloading)।

- उचित उपयोग करके सत्यापन त्रुटियों के लिए हमारी प्रतिक्रिया में सुधार [error handling](./error-handling)- उपयोग [Descriptions](./descriptions), [उदाहरण](./examples) और [Annotations](./annotations) उन्नत सत्यापन और बेहतर प्रलेखन के लिए
