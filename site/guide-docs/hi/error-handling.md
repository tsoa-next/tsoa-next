---
title: त्रुटि हैंडलिंग
lang: hi-IN
lastUpdated: 2026-04-20T00:28:55.924Z
---

# त्रुटि हैंडलिंग

::: warning संगतता नोट
यह गाइड लक्ष्य [express](https://expressjs.com) और मान `tsoa-next`वर्तमान समर्थन नीति: Node.js 22 या नया।
हम पिछले LTS, वर्तमान LTS, और Node CI में आगे
जुड़े सेटअप गाइड में उदाहरण शामिल हैं `npm`, `pnpm`, और `yarn` वेरिएंट जहां कमांड भिन्न होता है।
यह गाइड आपको अपनाती है [getting started guide](./getting-started) या एक समान सेटअप है।
:::

प्रासंगिक एपीआई संदर्भ: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md), और [`Controller`](./reference/tsoa-next/classes/Controller.md)।

जैसा कि आपने सभी चरणों का पालन करने के बाद देखा होगा [getting started guide](./getting-started), हमारा सर्वर अमान्य मापदंडों की अनुमति नहीं देता है, लेकिन जवाब अभी तक बहुत आदर्श नहीं है।

![Current Error Response](/docs-images/errors-server.png)

ग्राहक के लिए, यह इस तरह कुछ दिखता है:

![Client Error Response](/docs-images/errors-client.png)

## त्रुटि हैंडलिंग की स्थापना

### सम्पर्क करने का विवरण

आइए पहले यह सुनिश्चित करते हैं कि जब भी क्लाइंट एक सत्यापन त्रुटि को ट्रिगर करता है, तो स्टैक ट्रेस को प्रिंट करने के बजाय, इसके बजाय हम एक ठीक से स्वरूपित जेसन प्रतिक्रिया दिखाते हैं।

हमारे अंत में `app.ts`कॉल करने के बाद `RegisterRoutes(app)`, हम एक वैश्विक एक्सप्रेस त्रुटि हैंडलर जोड़ देंगे:

```ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa-next'
// ...

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
```

अब, वही अनुरोध इस तरह जवाब देगा:

![Client Error with handler](/docs-images/errors-json-client.png)

इसके अतिरिक्त, हमारा कंसोल दिखाई देगा:

![Server Error with handler](/docs-images/errors-json-server.png)

### लापता मार्गों को संभालने

लापता यूआरएल को अधिक सुंदर ढंग से संभालने के लिए, हम एक "कैच-ऑल" मार्ग हैंडलर जोड़ सकते हैं:

```ts
// app.ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'

// ...

RegisterRoutes(app)

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(
// ...
```

## त्रुटि प्रतिक्रिया प्रकार निर्दिष्ट करने के लिए OpenAPI

यदि आप दस्तावेज़ीकरण समापन बिंदु की जांच करते हैं, तो आप देखेंगे कि हमारे पास अभी तक हमारी त्रुटि के लिए कोई दस्तावेज नहीं है।
चूंकि TypeScript फेंकने की त्रुटियों की जांच नहीं करता है, tsoa हम इन मामलों में भेजे जा रहे प्रतिक्रिया के प्रकार को पूरा नहीं कर सकते।

::: warning
उपयोग `@Response` सजावटकर्ता द्वारा निर्यात `tsoa-next`नहीं Express' `Response` प्रकार।
झूठ बोलना tsoa-next आयात ठीक है, लेकिन अभी भी इसे हल करने की आवश्यकता है tsoa-next सजावट।
:::

हालांकि, हमारे पास आपके लिए मैन्युअल रूप से इन रिटर्न को निर्दिष्ट करने का तरीका है:

```ts
import { Body, Controller, Post, Route, Response, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

interface ValidateErrorJSON {
  message: string
  details: { [name: string]: unknown }
}

@Route('users')
export class UsersController extends Controller {
  // more code here

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

इस तरह से हमारे डॉक्टर्स कुछ दिखाना चाहिए:

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI '2xx' जैसे मिलान स्टेटस कोड की अनुमति देता है या 'डिफ़ॉल्ट' का उपयोग करके सभी कोडों से मेल खाता है। tsoa यह समर्थन करेगा:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## टाइपचेक वैकल्पिक प्रतिक्रियाओं

हाल के संस्करणों में tsoa, हमारे पास अपने कार्य में एक फ्रेमवर्क-एग्नोस्टिक उत्तरदाता फ़ंक्शन को इंजेक्ट करने का विकल्प है जिसे हम एक प्रतिक्रिया तैयार करने के लिए बुला सकते हैं जो हमारे नियंत्रक विधि / स्टेटस कोड और हेडर के रिटर्न प्रकार का अनुपालन नहीं करता है (जो सफलता की प्रतिक्रिया के लिए उपयोग किया जाता है)।
यह एक त्रुटि प्रतिक्रिया के साथ जवाब देने के लिए विशेष रूप से उपयोगी है, जिसमें फेंकने वाली त्रुटियों से जुड़े प्रकार के गलतफहमियों के जोखिम के बिना।
एक / अधिक उत्तरदाताओं को इंजेक्ट करने के लिए, हम उपयोग कर सकते हैं `@Res()` सजावट:

```ts
import { Route, Controller, Get, Query, Res, TsoaResponse } from 'tsoa-next'

@Route('/greeting')
export class GreetingsController extends Controller {
  /**
   * @param notFoundResponse The responder function for a not found response
   */
  @Get('/')
  public async greet(@Query() name?: string, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): Promise<string> {
    if (!name) {
      return notFoundResponse(404, { reason: 'We don\'t know you yet. Please provide a name' })
    }

    return `Hello, ${name}`
  }
}
```
