---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# समीकरण उत्पन्न मार्ग

प्रासंगिक एपीआई संदर्भ: [`Config`](./reference/tsoa-next/interfaces/Config.md) और [`@Route`](./reference/tsoa-next/functions/Route.md)।

आपको बताने के लिए दो विकल्प हैं tsoa जहां यह नियंत्रकों को ढूंढ सकता है कि यह ऑटो-जनरेट करने के लिए उपयोग करेगा `routes.ts` फ़ाइल

## स्वचालित नियंत्रक खोज का उपयोग करना

आप बता सकते हैं `tsoa-next` एक या अधिक प्रदान करके स्वचालित नियंत्रक खोज का उपयोग करना [minimatch globs](http://www.globtester.com/) शीर्ष स्तर में `controllerPathGlobs` अपने क्षेत्र [`Config`](./reference/tsoa-next/interfaces/Config.md) फ़ाइल (उदाहरण के लिए) `tsoa.json`).

विपक्ष:

- नए डेवलपर्स को यह जानने के बिना एक नियंत्रक जोड़ा जा सकता है कि कैसे tsoa नियंत्रकों के लिए "क्रॉल"। जब तक उनके नियंत्रक को आपके द्वारा प्रदान किए जाने वाले ग्लोब द्वारा पकड़ा जाता है, तब तक नियंत्रक को जोड़ा जाएगा। OpenAPI प्रलेखन और स्वतः उत्पन्न करने के लिए `routes.ts` फ़ाइल

प्रमाणन:

- यह वैकल्पिक स्पष्ट-आयात दृष्टिकोण की तुलना में थोड़ा धीमा हो सकता है क्योंकि tsoa कॉन्फ़िगर किए गए ग्लोब को विस्तारित और लोड करने की आवश्यकता है।

जैसा कि आप नीचे दिए गए नियंत्रकों के ग्लोब पैटर्न से देख सकते हैं, आप विभिन्न पैटर्नों के कई ग्लोब प्रदान कर सकते हैं:

```js
{
  "entryFile": "...",
  "controllerPathGlobs": [
    "./dir-with-controllers/*",
    "./recursive-dir/**/*",
    "./custom-filerecursive-dir/**/*.controller.ts"
  ],
  "routes": {
    "routesDir": "...",
    "middleware": "..."
  }
}
```

## मैन्युअल रूप से कहना tsoa एप्लिकेशन प्रविष्टि फ़ाइल में उपयोग करने के लिए कौन से नियंत्रक

यदि आप परेशान हैं `controllerPathGlobs`, tsoa एप्लिकेशन प्रविष्टि फ़ाइल को क्रॉल कर सकते हैं और नियंत्रक आयात का पालन कर सकते हैं, जिनके पास है `@Route` सजावट।

विपक्ष:

- रूट जनरेशन आमतौर पर तेजी से हो सकता है क्योंकि tsoa ग्लॉब के विस्तार के बजाय अपने स्पष्ट आयात का अनुसरण करता है।

प्रमाणन:

- आपकी टीम पर नए डेवलपर्स एक नियंत्रक जोड़ सकते हैं और यह नहीं समझ सकते कि नए नियंत्रक रूटर या क्यों उजागर नहीं किया गया था OpenAPI उत्पादन। यदि वह आपके लिए एक समस्या है, तो पसंद करें `controllerPathGlobs`।

```typescript
import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { RegisterRoutes } from './routes'

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './users/usersController'
// ########################################################################

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

app.listen(3000)
```
