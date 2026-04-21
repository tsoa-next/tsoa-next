---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# مسارات التوليد ومنظمة الدول الأمريكية

المرجع ذو الصلة بالطلب: [`Config`](./reference/tsoa-next/interfaces/Config.md).. [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md).. [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md).. [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md).. [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md)و [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md).

## استخدام CLI

### القيادات الأساسية

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

### الخيارات

#### OpenAPI توليد المواصفات

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### جيل الطرق

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### إكتشاف الكونج

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` وتبحث تحت المسار المقدم، أو تحت دليل العمل الحالي عندما لا يقدم أي حجة.
- مُدخلات الغليون مدعومة، لذا الأوامر مثل `tsoa discover "packages/*"` أو `tsoa spec --discover "services/*"` سيوسع الجذور المتطابقة أولاً
- ويعترف الكشف بهذه الأسماء التقليدية للملفات:
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`.. `routes`و `spec-and-routes` يُمكنُ أَنْ يَفْتحَ خارج كُلّ الإختلافاتِ المُكتشفةِ:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

يمكنك أن تجد المرجع tsoa ملف التشكيل [here](./reference/tsoa-next/interfaces/Config.md)

للحصول على معلومات عن الغرض من التشكيلة (`tsoa.json`قد تكون مهتماً أيضاً بما يلي:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## Programmatic

برامجيات الاستيراد `tsoa-next/cli`. الجذر `tsoa-next` ونقطة الدخول غير متوقفة على الدوام، وينبغي أن تُستخدَم في مُدَوِّرات الزينة ومُساعدي فترات التشغيل.

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

** ملاحظة:** إذا استخدمت tsoa من الناحية البرنامجية، يرجى أن تكون على علم بأن tsoa"الأساليب يمكن أن تتغير تحت الظروف النادرة" "في إطلاقات طفيفة" ولكن إذا كنت تستخدم tsoa في ملف (تيز) TypeScript سوف تساعدك على الهجرة إلى أي تغييرات. نحن نحتفظ بهذا الحق لتغيير ما هو أساساً أساليبنا الداخلية حتى نتمكن من الاستمرار في توفير قيمة إضافية لمستعمل الأغلبية (مستعملنا) CLI مستعملون. The CLI غير أنه لن يحصل إلا على تغييرات عاجلة خلال عملية الإفراج الرئيسية.
