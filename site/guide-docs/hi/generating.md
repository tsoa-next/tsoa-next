---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# रोउट और ओएएस उत्पन्न करना

प्रासंगिक एपीआई संदर्भ: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md), [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md), [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md), और [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md)।

## उपयोग CLI

### बेसिक कमान

```bash
# generate OAS
tsoa spec

# generate routes
tsoa routes

# discover config files beneath the current directory
tsoa discover

# discover config files beneath a path or glob
tsoa discover "packages/*"
```

### विकल्प

#### OpenAPI विशिष्टता (ओएएस) पीढ़ी

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### रूट जनरेशन

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### गोपनीयता नीति

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` प्रदान किए गए पथ के नीचे खोज, या वर्तमान कार्य निर्देशिका के नीचे जब कोई तर्क प्रदान नहीं किया जाता है।
- ग्लोब इनपुट समर्थित हैं, इसलिए कमांड जैसे `tsoa discover "packages/*"` या `tsoa spec --discover "services/*"` पहले मैचिंग जड़ों का विस्तार होगा।
- डिस्कवरी इन पारंपरिक विन्यास फ़ाइल नामों को पहचानती है:
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`, `routes`, और `spec-and-routes` सभी खोजे गए विन्यासों में प्रशंसक बन सकते हैं:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

आप के लिए संदर्भ पा सकते हैं tsoa विन्यास फ़ाइल [here](./reference/tsoa-next/interfaces/Config.md)

कॉन्फ़िगरेशन ऑब्जेक्ट के बारे में जानकारी के लिए`tsoa.json`आप भी रुचि रखते हैं:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## प्रोग्रामिंग

से प्रोग्रामेटिक पीढ़ी एपीआई आयात करें `tsoa-next/cli`। जड़ `tsoa-next` प्रवेश बिंदु रनटाइम-केवल है और इसे सजाने वालों और रनटाइम सहायकों के लिए इस्तेमाल किया जाना चाहिए।

```typescript
import { generateRoutes, generateSpec, generateSpecAndRoutes, ExtendedRoutesConfig, ExtendedSpecConfig } from 'tsoa-next/cli'

;(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    specVersion: 3,
    outputDirectory: './api/dist',
    controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
  }

  const routeOptions: ExtendedRoutesConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    routesDir: './api',
  }

  await generateSpec(specOptions)

  await generateRoutes(routeOptions)

  // Or generate both outputs from one shared metadata pass:
  await generateSpecAndRoutes({
    configuration: {
      entryFile: './api/server.ts',
      controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
      spec: {
        outputDirectory: './api/dist',
        specVersion: 3.1,
      },
      routes: {
        routesDir: './api',
      },
    },
  })
})()
```

**नोट:* यदि आप उपयोग करते हैं tsoa प्रोग्रामेटिक रूप से, कृपया ध्यान रखें कि tsoaमामूली और पैच रिलीज में 'विविधता' परिवर्तन हो सकता है। लेकिन अगर आप उपयोग कर रहे हैं tsoa एक फ़ाइल में, फिर TypeScript आप किसी भी बदलाव में मदद करेंगे। हम इसे बदलने का अधिकार सुरक्षित रखते हैं जो अनिवार्य रूप से हमारी आंतरिक विधियां हैं ताकि हम बहुमत उपयोगकर्ता को वृद्धिशील मूल्य प्रदान कर सकें (हमारे द्वारा) CLI उपयोगकर्ता). The CLI हालांकि, केवल एक प्रमुख रिलीज के दौरान ब्रेकिंग परिवर्तन प्राप्त होगा।
