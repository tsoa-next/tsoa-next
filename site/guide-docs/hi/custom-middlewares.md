---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# कस्टम मिडलवेयर

The `@Middlewares` डेकोरेटर का उपयोग कस्टम मिडलवेयर को आपके एंडपॉइंट में लागू करने के लिए किया जाता है TypeScript कोड यह मिडलवेयर अंत बिंदु तक पहुंचने से पहले HTTP अनुरोधों को आने से रोकता है और आपको अतिरिक्त संचालन या संशोधन करने की अनुमति देता है। यह समर्थन प्रदान करता है Express, Koa, और Hapi मिडलवेयर।
प्रासंगिक एपीआई संदर्भ: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), और [`@Get`](./reference/tsoa-next/functions/Get.md)।

## उदाहरण

```ts
import type { NextFunction, Request, Response } from 'express'
import { Controller, Get, Middlewares, Request as TsoaRequest, Route } from 'tsoa-next'

async function customMiddleware(req: Request, _res: Response, next: NextFunction) {
  req.headers['x-middleware-hit'] = 'true'
  next()
}

@Route('examples')
export class ExampleController extends Controller {
  @Get('custom-middleware')
  @Middlewares(customMiddleware)
  public async exampleGetEndpoint(@TsoaRequest() req: Request): Promise<{ middlewareHit: boolean }> {
    return {
      middlewareHit: req.header('x-middleware-hit') === 'true',
    }
  }
}
```

## निष्पादन प्रवाह

जब HTTP के अनुरोध के साथ सजाया गया है `@Middlewares`, निष्पादन प्रवाह निम्नानुसार है:

अनुरोध पहली बार में निर्दिष्ट कस्टम मिडलवेयर फ़ंक्शन के माध्यम से जाता है `@Middlewares` सजावट।
मिडलवेयर फंक्शन के अंदर, आप अनुरोध या प्रतिक्रिया ऑब्जेक्ट पर किसी भी आवश्यक संचालन या संशोधन कर सकते हैं।

मिडलवेयर लॉजिक को पूरा करने के बाद, आपको कॉल करना होगा `next()` अगले मिडलवेयर या एंडपॉइंट के लिए अनुरोध पारित करने का कार्य।

अंत में, अनुरोध उदाहरण तक पहुंच जाता हैGetEndpoint विधि, जहां आप अनुरोध को संभाल सकते हैं और उचित प्रतिक्रिया प्रदान कर सकते हैं।

यदि एकाधिक मिडलवेयर निर्दिष्ट किए जाते हैं, तो उन्हें आदेश में निष्पादित किया जाता है ताकि उन्हें पारित किया जा सके। `@Middlewares(...)`।

## TypeScript आवश्यकता

कस्टम मिडलवेयर का उपयोग करने के लिए सजावट को सक्षम करने की आवश्यकता होती है TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` द्वारा आवश्यक नहीं है `tsoa-next` के लिए `@Middlewares(...)`।
जब आपका खुद का मिडलवेयर, डीआई कंटेनर, या सत्यापन स्टैक डिज़ाइन-टाइम मेटाडाटा पर निर्भर करता है तो केवल इसे सक्षम बनाता है।
