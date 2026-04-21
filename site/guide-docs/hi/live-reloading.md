---
title: लाइव रीलोडिंग
lang: hi-IN
lastUpdated: 2026-04-20T00:28:55.919Z
---

# लाइव रीलोडिंग

::: warning संगतता नोट
यह गाइड लक्ष्य [express](https://expressjs.com) और मान `tsoa-next`वर्तमान समर्थन नीति: Node.js 22 या नया।
हम पिछले LTS, वर्तमान LTS, और Node CI में आगे
नीचे दिए गए उदाहरणों में शामिल हैं `npm`, `pnpm`, और `yarn` वेरिएंट जहां कमांड भिन्न होता है।
हम मानते हैं कि आपका सेटअप एक के समान है जिसके लिए सिफारिश की जाती है [getting started](/hi/getting-started)
:::

प्रासंगिक एपीआई संदर्भ: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md), [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md), और [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)।

::: tip
हम उपयोग करेंगे [nodemon](https://nodemon.io/) और [ts-node](https://github.com/TypeStrong/ts-node) लाइव रीलोडिंग के लिए, लेकिन कोई भी उपकरण जो हमें रिलोडिंग प्रक्रिया में हुक करने की अनुमति देता है। विकल्प हो सकता है, यानी का संयोजन हो सकता है `tsc -w` और ट्रिगर `tsoa spec-and-routes` उपयोग [`onchange`](https://www.npmjs.com/package/onchange)।
:::

**हम किस बारे में बात करेंगे:*

[[toc]]

## रीलोडिंग कोड

### Nodemon और ts-node स्थापित करना

::: code-group

```bash [npm]
npm i -D nodemon ts-node concurrently
```

```bash [pnpm]
pnpm add -D nodemon ts-node concurrently
```

```bash [yarn]
yarn add -D nodemon ts-node concurrently
```

:::

### एक nodemon विन्यास बनाना

अब, चलो एक बनाते हैं `nodemon.json` हमारी परियोजना के मूल फ़ोल्डर के अंदर जो इस तरह दिखता है:

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### एक dev स्क्रिप्ट जोड़ना

आइए अपने पैकेज मैनेजर के साथ स्वचालित रूप से इस सेटअप को शुरू करते हैं `dev` लिपि`npm run dev`, `pnpm dev`या `yarn dev`जबकि हम उस पर हैं, जोड़ें `build` और `start` हमारे आदेश `package.json`:

```diff
{
  "name": "starter",
  "version": "0.0.1",
+ "scripts": {
+   "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
+   "build": "tsoa spec-and-routes && tsc",
+   "start": "node build/src/server.js"
+ },
  "dependencies": {
  // ...
}
```

## हमारे डेवलपर अनुभव को सुपरचार्ज करना `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) एक नियंत्रक को पढ़ने के बिना लाइव स्पेक या डॉक्स एंडपॉइंट को उजागर करने देता है `swagger.json` या `openapi.yaml` अनुरोध समय पर डिस्क से।
यह विकास कार्यप्रवाह के लिए एक अच्छा फिट बनाता है जहां आप चाहते हैं कि उत्पन्न प्रलेखन उसी नियंत्रक मेटाडाटा के साथ सिंक में रहने के लिए पहले से ही अपने मार्गों का उपयोग करें।

### एक docs UI सहकर्मी की स्थापना

क्या आप उपयोग करना चाहते हैं?

- Express: `npm i swagger-ui-express` / `pnpm add swagger-ui-express` / `yarn add swagger-ui-express`- Koa: `npm i swagger-ui-koa` / `pnpm add swagger-ui-koa` / `yarn add swagger-ui-koa`- Hapi: `npm i hapi-swagger` / `pnpm add hapi-swagger` / `yarn add hapi-swagger`- Redoc: `npm i redoc` / `pnpm add redoc` / `yarn add redoc`- RapiDoc: `npm i rapidoc` / `pnpm add rapidoc` / `yarn add rapidoc`

### एक नियंत्रक-स्किप्ड डॉक्स एंडपॉइंट को उजागर करना

एक या अधिक संलग्न करें `@SpecPath(...)` एक मौजूदा नियंत्रक के लिए सजावट:

```ts
import { Controller, Get, Route, SpecPath } from 'tsoa-next'

@Route('users')
@SpecPath()
@SpecPath('openapi.yaml', { target: 'yaml' })
@SpecPath('docs', { target: 'swagger' })
export class UsersController extends Controller {
  @Get()
  public list(): string[] {
    return []
  }
}
```

यह आपको देता है:

- `GET /users/spec` JSON के लिए
- `GET /users/openapi.yaml` YAML के लिए
- `GET /users/docs` के लिए Swagger यूआई

चूंकि डॉक्स एंडपॉइंट एक ही रनटाइम मेटाडाटा से आपके मार्ग के रूप में उत्पन्न होता है, इसलिए यह वर्तमान रहता है क्योंकि आप नियंत्रकों को संपादित करते हैं और फिर से रन करते हैं `tsoa spec-and-routes`।

### प्रलेखन का निरीक्षण करना

अब जब हम नेविगेट करते हैं <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">स्थानीयहोस्ट:3000 / उपयोगकर्ता / डॉक्टर</a>, हमें अपने एपीआई का वर्तमान प्रतिबिंब देखना चाहिए।

![SwaggerUI](/docs-images/SwaggerUI.png)

### अनुरोध भेजना Swagger यूआई

हम एंडपॉइंट्स का चयन कर सकते हैं, "Try it out" बटन पर क्लिक करें और फॉर्म भरकर कुछ डेटा जमा कर सकते हैं।
जब हम "Execute" हिट करते हैं, तो अनुरोध हमारे सर्वर पर भेजा जाएगा और जवाब फॉर्म के नीचे प्रदर्शित किया जाएगा।

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### अन्य अंतर्निहित लक्ष्य

यदि आप एक अलग यूआई पसंद करते हैं, तो परिवर्तन करें `target` विकल्प:

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

यदि आपको पूरी तरह से कस्टम प्रतिक्रिया की आवश्यकता है, तो एक हैंडलर को पास करें `target` इसके बजाय। आप भी जोड़ सकते हैं `cache` और `gate` उसी विकल्प वस्तु में।
