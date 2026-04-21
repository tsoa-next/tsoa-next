import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'

import matter from 'gray-matter'

import { generatedLocaleKeys, localeByKey, localizeRoute } from '../site/guide-docs/.vitepress/i18n.mjs'

const docsRoot = join(process.cwd(), 'site/guide-docs')
const cachePath = join(process.cwd(), 'scripts/.cache/docs-i18n-cache.json')
const cacheVersion = 'v3-link-labels'
const sourceIgnoreDirs = new Set(['.vitepress', 'assets', 'public', ...generatedLocaleKeys])
const sourceIgnoreFiles = new Set(['typedoc-sidebar.json'])
const sourceMarkdownExtensions = new Set(['.md'])
const saveCacheEvery = 50
const libreTranslateEndpoints = ['https://translate.libregalaxy.org/translate', 'https://translate.fedilab.app/translate']
const nonTranslatableTermsPattern = /\b(?:tsoa-next|tsoa|TypeScript|OpenAPI|Node(?:\.js)?|Express|Koa|Hapi|JSDoc|SwaggerUI|Swagger|Redoc|RapiDoc|Rapidoc|Handlebars|UUID|npm|CLI|Spectral)\b/g
let nextLibreTranslateEndpointIndex = 0
const requestedLocaleKeys = process.env.LOCALES
  ? process.env.LOCALES.split(',')
      .map(locale => locale.trim())
      .filter(Boolean)
  : generatedLocaleKeys
const requestedSourceFiles = process.env.FILES
  ? process.env.FILES.split(',')
      .map(file => file.trim())
      .filter(Boolean)
  : null

const exactTranslations = {
  ar: {
    'Project Lineage': 'نشأة المشروع',
    Goal: 'الهدف',
    Philosophy: 'الفلسفة',
    'Feature List': 'قائمة الميزات',
    'Getting Started': 'البدء',
    'Package Surface': 'واجهة الحزمة',
    Examples: 'أمثلة',
    'Help wanted': 'نحتاج إلى المساعدة',
    'Contributing code': 'المساهمة في الكود',
    Documentation: 'الوثائق',
    'API Reference': 'مرجع API',
    'Getting started': 'البدء',
    'Getting started guide': 'دليل البدء',
    guides: 'الأدلة',
    'playground repository': 'مستودع playground',
    'the tests': 'الاختبارات',
    'Contributing Guide': 'دليل المساهمة',
    'Check out the [guides](https://tsoa-next.dev/)': 'اطّلع على [الأدلة](https://tsoa-next.dev/)',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      'استخدم [مستودع playground](https://github.com/tsoa-next/playground) المرافق للحصول على تطبيقات أمثلة قابلة للتشغيل وسيناريوهات تركّز على الخادم.',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      'اطّلع على أمثلة المتحكمات في [الاختبارات](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      'اطّلع على أمثلة النماذج في [الاختبارات](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      'للمساهمة (عبر طلب سحب PR)، يرجى الاطلاع أولاً على [دليل المساهمة](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)',
  },
  bn: {
    'Project Lineage': 'প্রকল্পের উৎস',
    Goal: 'লক্ষ্য',
    Philosophy: 'দর্শন',
    'Feature List': 'বৈশিষ্ট্যের তালিকা',
    'Getting Started': 'শুরু করা',
    'Package Surface': 'প্যাকেজ API',
    Examples: 'উদাহরণ',
    'Help wanted': 'সাহায্য প্রয়োজন',
    'Contributing code': 'কোডে অবদান রাখা',
    Documentation: 'ডকুমেন্টেশন',
    'API Reference': 'API রেফারেন্স',
    'Getting started': 'শুরু করা',
    'Getting started guide': 'শুরু করার নির্দেশিকা',
    guides: 'গাইডসমূহ',
    'playground repository': 'playground রিপোজিটরি',
    'the tests': 'টেস্টসমূহ',
    'Contributing Guide': 'অবদান নির্দেশিকা',
    'Check out the [guides](https://tsoa-next.dev/)': '[গাইডসমূহ](https://tsoa-next.dev/) দেখে নিন',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      'চালানো যায় এমন উদাহরণ অ্যাপ এবং সার্ভার-কেন্দ্রিক পরিস্থিতির জন্য সহায়ক [playground রিপোজিটরি](https://github.com/tsoa-next/playground) ব্যবহার করুন।',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      'উদাহরণ কন্ট্রোলার [টেস্টসমূহ](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers) এ দেখুন',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      'উদাহরণ মডেল [টেস্টসমূহ](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts) এ দেখুন',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      'অবদান রাখতে (PR-এর মাধ্যমে), আগে [অবদান নির্দেশিকা](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md) দেখুন',
  },
  es: {
    'Project Lineage': 'Origen del proyecto',
    Goal: 'Objetivo',
    Philosophy: 'Filosofía',
    'Feature List': 'Lista de características',
    'Getting Started': 'Primeros pasos',
    'Package Surface': 'API del paquete',
    Examples: 'Ejemplos',
    'Help wanted': 'Se busca ayuda',
    'Contributing code': 'Contribuir código',
    Documentation: 'Documentación',
    'API Reference': 'Referencia de API',
    'Getting started': 'Primeros pasos',
    'Getting started guide': 'Guía de inicio',
    guides: 'guías',
    'playground repository': 'repositorio de playground',
    'the tests': 'las pruebas',
    'Contributing Guide': 'Guía de contribución',
    'Check out the [guides](https://tsoa-next.dev/)': 'Echa un vistazo a las [guías](https://tsoa-next.dev/)',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      'Usa el [repositorio de playground](https://github.com/tsoa-next/playground) complementario para aplicaciones de ejemplo ejecutables y escenarios centrados en el servidor.',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      'Consulta controladores de ejemplo en [las pruebas](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      'Consulta modelos de ejemplo en [las pruebas](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      'Para contribuir (mediante un PR), consulta primero la [Guía de contribución](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)',
  },
  fr: {
    'Project Lineage': 'Origines du projet',
    Goal: 'Objectif',
    Philosophy: 'Philosophie',
    'Feature List': 'Liste des fonctionnalités',
    'Getting Started': 'Prise en main',
    'Package Surface': 'API du package',
    Examples: 'Exemples',
    'Help wanted': 'Aide recherchée',
    'Contributing code': 'Contribuer au code',
    Documentation: 'Documentation',
    'API Reference': 'Référence d’API',
    'Getting started': 'Prise en main',
    'Getting started guide': 'Guide de démarrage',
    guides: 'guides',
    'playground repository': 'dépôt playground',
    'the tests': 'les tests',
    'Contributing Guide': 'Guide de contribution',
    'Check out the [guides](https://tsoa-next.dev/)': 'Consultez les [guides](https://tsoa-next.dev/)',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      'Utilisez le [dépôt playground](https://github.com/tsoa-next/playground) compagnon pour des applications d\'exemple exécutables et des scénarios orientés serveur.',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      'Consultez des contrôleurs d\'exemple dans [les tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      'Consultez des modèles d\'exemple dans [les tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      'Pour contribuer (via une PR), consultez d\'abord le [Guide de contribution](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)',
  },
  hi: {
    'Project Lineage': 'परियोजना की पृष्ठभूमि',
    Goal: 'लक्ष्य',
    Philosophy: 'दर्शन',
    'Feature List': 'सुविधाओं की सूची',
    'Getting Started': 'शुरुआत करें',
    'Package Surface': 'पैकेज API',
    Examples: 'उदाहरण',
    'Help wanted': 'मदद चाहिए',
    'Contributing code': 'कोड में योगदान',
    Documentation: 'दस्तावेज़',
    'API Reference': 'API संदर्भ',
    'Getting started': 'शुरुआत करें',
    'Getting started guide': 'शुरुआत करने की मार्गदर्शिका',
    guides: 'मार्गदर्शिकाएँ',
    'playground repository': 'playground रिपॉज़िटरी',
    'the tests': 'परीक्षण',
    'Contributing Guide': 'योगदान मार्गदर्शिका',
    'Check out the [guides](https://tsoa-next.dev/)': '[मार्गदर्शिकाएँ](https://tsoa-next.dev/) देखें',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      'चलाने योग्य उदाहरण ऐप्स और सर्वर-केंद्रित परिदृश्यों के लिए सहायक [playground रिपॉज़िटरी](https://github.com/tsoa-next/playground) का उपयोग करें।',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      'उदाहरण नियंत्रक [परीक्षण](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers) में देखें',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      'उदाहरण मॉडल [परीक्षण](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts) में देखें',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      'योगदान करने के लिए (PR के माध्यम से), पहले [योगदान मार्गदर्शिका](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md) देखें',
  },
  id: {
    'Project Lineage': 'Asal-usul proyek',
    Goal: 'Tujuan',
    Philosophy: 'Filosofi',
    'Feature List': 'Daftar fitur',
    'Getting Started': 'Memulai',
    'Package Surface': 'API paket',
    Examples: 'Contoh',
    'Help wanted': 'Bantuan dibutuhkan',
    'Contributing code': 'Berkontribusi pada kode',
    Documentation: 'Dokumentasi',
    'API Reference': 'Referensi API',
    'Getting started': 'Memulai',
    'Getting started guide': 'Panduan memulai',
    guides: 'panduan',
    'playground repository': 'repositori playground',
    'the tests': 'pengujian',
    'Contributing Guide': 'Panduan kontribusi',
    'Check out the [guides](https://tsoa-next.dev/)': 'Lihat [panduan](https://tsoa-next.dev/)',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      'Gunakan [repositori playground](https://github.com/tsoa-next/playground) pendamping untuk aplikasi contoh yang dapat dijalankan dan skenario yang berfokus pada server.',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      'Lihat contoh controller di [pengujian](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      'Lihat contoh model di [pengujian](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      'Untuk berkontribusi (melalui PR), lihat terlebih dahulu [Panduan kontribusi](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)',
  },
  pt: {
    'Project Lineage': 'Histórico do projeto',
    Goal: 'Objetivo',
    Philosophy: 'Filosofia',
    'Feature List': 'Lista de recursos',
    'Getting Started': 'Primeiros passos',
    'Package Surface': 'API do pacote',
    Examples: 'Exemplos',
    'Help wanted': 'Ajuda necessária',
    'Contributing code': 'Contribuindo com código',
    Documentation: 'Documentação',
    'API Reference': 'Referência da API',
    'Getting started': 'Primeiros passos',
    'Getting started guide': 'Guia de primeiros passos',
    guides: 'guias',
    'playground repository': 'repositório playground',
    'the tests': 'os testes',
    'Contributing Guide': 'Guia de contribuição',
    'Check out the [guides](https://tsoa-next.dev/)': 'Confira os [guias](https://tsoa-next.dev/)',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      'Use o [repositório playground](https://github.com/tsoa-next/playground) complementar para aplicações de exemplo executáveis e cenários voltados ao servidor.',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      'Veja controladores de exemplo nos [testes](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      'Veja modelos de exemplo nos [testes](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      'Para contribuir (por meio de um PR), consulte primeiro o [Guia de contribuição](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)',
  },
  ru: {
    'Project Lineage': 'История проекта',
    Goal: 'Цель',
    Philosophy: 'Философия',
    'Feature List': 'Список возможностей',
    'Getting Started': 'Быстрый старт',
    'Package Surface': 'Состав пакета',
    Examples: 'Примеры',
    'Help wanted': 'Нужна помощь',
    'Contributing code': 'Вклад в код',
    Documentation: 'Документация',
    'API Reference': 'Справочник API',
    'Getting started': 'Быстрый старт',
    'Getting started guide': 'Руководство по быстрому старту',
    guides: 'руководства',
    'playground repository': 'репозиторий playground',
    'the tests': 'тесты',
    'Contributing Guide': 'Руководство по участию',
    'Check out the [guides](https://tsoa-next.dev/)': 'Ознакомьтесь с [руководствами](https://tsoa-next.dev/)',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      'Используйте вспомогательный [репозиторий playground](https://github.com/tsoa-next/playground) для запускаемых примеров приложений и серверных сценариев.',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      'Смотрите примеры контроллеров в [тестах](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      'Смотрите примеры моделей в [тестах](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      'Чтобы внести вклад (через PR), сначала прочитайте [Руководство по участию](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)',
  },
  'zh-hans': {
    'Project Lineage': '项目沿革',
    Goal: '目标',
    Philosophy: '理念',
    'Feature List': '功能列表',
    'Getting Started': '快速开始',
    'Package Surface': '包导出',
    Examples: '示例',
    'Help wanted': '需要帮助',
    'Contributing code': '贡献代码',
    Documentation: '文档',
    'API Reference': 'API 参考',
    'Getting started': '快速开始',
    'Getting started guide': '入门指南',
    guides: '指南',
    'playground repository': 'playground 仓库',
    'the tests': '测试',
    'Contributing Guide': '贡献指南',
    'Check out the [guides](https://tsoa-next.dev/)': '查看[指南](https://tsoa-next.dev/)',
    'Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.':
      '使用配套的 [playground 仓库](https://github.com/tsoa-next/playground) 获取可运行的示例应用和面向服务器的场景。',
    'See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)':
      '在[测试](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)中查看示例控制器',
    'See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)':
      '在[测试](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)中查看示例模型',
    'To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)':
      '如需贡献代码（通过 PR），请先阅读[贡献指南](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)',
  },
}

let cache = {}
let cacheMissesSinceSave = 0
const sourceLastUpdatedCache = new Map()

function getTranslationTarget(localeKey) {
  if (localeKey === 'zh-hans') {
    return 'zh'
  }

  return localeByKey[localeKey].lang.split('-')[0]
}

async function loadCache() {
  try {
    cache = JSON.parse(await readFile(cachePath, 'utf8'))
  } catch {
    cache = {}
  }
}

async function saveCache() {
  await mkdir(dirname(cachePath), { recursive: true })
  await writeFile(cachePath, JSON.stringify(cache), 'utf8')
  cacheMissesSinceSave = 0
}

function isExternalHref(href) {
  return /^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('#')
}

function rewriteHrefForLocale(href, localeKey, relativePath) {
  if (localeKey === 'root' || !href || isExternalHref(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href
  }

  if (href === './llms.txt') {
    return '/llms.txt'
  }

  if (href.startsWith('/docs-images/')) {
    return href
  }

  if (href.startsWith('/')) {
    return localizeRoute(localeKey, href)
  }

  if (!relativePath.startsWith('reference/') && href.startsWith('../reference')) {
    return href.replace(/^\.\.\//, './')
  }

  return href
}

function rewriteLinkTarget(target, localeKey, relativePath) {
  const match = target.match(/^(\S+)([\s\S]*)$/)
  if (!match) {
    return target
  }

  const [, href, suffix] = match
  return `${rewriteHrefForLocale(href, localeKey, relativePath)}${suffix}`
}

function shouldTranslateText(text) {
  return /[A-Za-z]/.test(text)
}

function getExactTranslation(localeKey, text) {
  return exactTranslations[localeKey]?.[text]
}

function consumeMarkdownLink(text, startIndex) {
  if (text[startIndex] !== '[') {
    return -1
  }

  const labelEndIndex = text.indexOf(']', startIndex + 1)
  if (labelEndIndex <= startIndex + 1 || text[labelEndIndex + 1] !== '(') {
    return -1
  }

  const targetEndIndex = text.indexOf(')', labelEndIndex + 2)
  if (targetEndIndex <= labelEndIndex + 2) {
    return -1
  }

  return targetEndIndex + 1
}

function isReferenceBreadcrumbLine(line) {
  const trimmedLine = line.trim()
  if (!trimmedLine.startsWith('[')) {
    return false
  }

  let index = consumeMarkdownLink(trimmedLine, 0)
  if (index === -1) {
    return false
  }

  let foundSeparator = false

  while (index < trimmedLine.length) {
    while (trimmedLine[index] === ' ') {
      index += 1
    }

    if (trimmedLine[index] !== '/') {
      return false
    }

    foundSeparator = true
    index += 1

    while (trimmedLine[index] === ' ') {
      index += 1
    }

    if (index >= trimmedLine.length) {
      return false
    }

    if (trimmedLine[index] !== '[') {
      return true
    }

    index = consumeMarkdownLink(trimmedLine, index)
    if (index === -1) {
      return false
    }
  }

  return foundSeparator
}

async function requestLibreTranslate(texts, localeKey) {
  const target = getTranslationTarget(localeKey)
  let lastError
  const endpointOrder = libreTranslateEndpoints.map((_endpoint, offset) => libreTranslateEndpoints[(nextLibreTranslateEndpointIndex + offset) % libreTranslateEndpoints.length])
  nextLibreTranslateEndpointIndex = (nextLibreTranslateEndpointIndex + 1) % libreTranslateEndpoints.length

  for (const endpoint of endpointOrder) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: texts,
            source: 'en',
            target,
            format: 'html',
          }),
        })

        if (!response.ok) {
          const errorBody = await response.text()
          throw new Error(`LibreTranslate ${response.status} from ${endpoint}: ${errorBody}`)
        }

        const payload = await response.json()
        const translatedTexts = Array.isArray(payload.translatedText) ? payload.translatedText : [payload.translatedText]

        await new Promise(resolve => setTimeout(resolve, 6000))
        return translatedTexts
      } catch (error) {
        lastError = error
        const waitMs = String(error).includes(' 429 ') ? 65000 : 1000 * (attempt + 1)
        await new Promise(resolve => setTimeout(resolve, waitMs))
      }
    }
  }

  throw lastError
}

function chunkTexts(texts, maxItems = 50, maxChars = 20000) {
  const chunks = []
  let currentChunk = []
  let currentChars = 0

  for (const text of texts) {
    const nextChars = currentChars + text.length

    if (currentChunk.length > 0 && (currentChunk.length >= maxItems || nextChars > maxChars)) {
      chunks.push(currentChunk)
      currentChunk = []
      currentChars = 0
    }

    currentChunk.push(text)
    currentChars += text.length
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }

  return chunks
}

async function translateTexts(texts, localeKey) {
  const target = getTranslationTarget(localeKey)
  const results = [...texts]
  const uncachedTexts = []
  const uncachedIndicesByText = new Map()

  for (const [index, text] of texts.entries()) {
    if (!text || !shouldTranslateText(text)) {
      continue
    }

    const exactTranslation = getExactTranslation(localeKey, text)
    if (exactTranslation) {
      results[index] = exactTranslation
      continue
    }

    const cacheKey = `${cacheVersion}::${target}::${text}`
    if (cache[cacheKey]) {
      results[index] = cache[cacheKey]
      continue
    }

    if (!uncachedIndicesByText.has(text)) {
      uncachedTexts.push(text)
      uncachedIndicesByText.set(text, [])
    }

    uncachedIndicesByText.get(text).push(index)
  }

  if (uncachedTexts.length === 0) {
    return results
  }

  for (const chunk of chunkTexts(uncachedTexts)) {
    const translatedChunk = await requestLibreTranslate(chunk, localeKey)

    for (const [chunkIndex, translatedText] of translatedChunk.entries()) {
      const sourceText = chunk[chunkIndex]
      const cacheKey = `${cacheVersion}::${target}::${sourceText}`
      cache[cacheKey] = translatedText
      for (const resultIndex of uncachedIndicesByText.get(sourceText) ?? []) {
        results[resultIndex] = translatedText
      }
      cacheMissesSinceSave += 1
    }
  }

  if (cacheMissesSinceSave >= saveCacheEvery) {
    await saveCache()
  }

  return results
}

async function translateText(text, localeKey) {
  const [translatedText] = await translateTexts([text], localeKey)
  return translatedText
}

async function translateDirectiveLine(line, localeKey) {
  const match = line.match(/^(\s*:::\s*\S+)(?:\s+(.*))?$/)
  if (!match || !match[2]) {
    return line
  }

  return `${match[1]} ${await translateText(match[2], localeKey)}`
}

function protectMarkdownTokens(text, localeKey, relativePath) {
  const placeholders = new Map()
  let nextPlaceholderIndex = 0
  const isReferenceDoc = relativePath.startsWith('reference/')

  const store = value => {
    const token = `<vp-token-${nextPlaceholderIndex}></vp-token-${nextPlaceholderIndex}>`
    nextPlaceholderIndex += 1
    placeholders.set(token, value)
    return token
  }

  let protectedText = text

  if (isReferenceDoc) {
    protectedText = protectedText.replace(/\\?<[^>\n]+>/g, match => store(match))
  }
  if (!isReferenceDoc) {
    protectedText = protectedText.replace(/<[^>]+>/g, match => store(match))
  }
  protectedText = protectedText.replace(/^(#{1,6})(\s+)/gm, (_match, marker, whitespace) => `${store(marker)}${whitespace}`)
  protectedText = protectedText.replace(/^(\s*[-*+])(\s+)/gm, (_match, marker, whitespace) => `${store(marker)}${whitespace}`)
  protectedText = protectedText.replace(/^(\s*\d+\.)(\s+)/gm, (_match, marker, whitespace) => `${store(marker)}${whitespace}`)
  protectedText = protectedText.replace(/^(\s*>)(\s+)/gm, (_match, marker, whitespace) => `${store(marker)}${whitespace}`)
  protectedText = protectedText.replace(/`[^`\n]+`/g, match => store(match))
  protectedText = protectedText.replace(/(!?)\[([^\]]*)\]\(([^)]+)\)/g, (_match, marker, label, target) => {
    return store(`${marker}[${label}](${rewriteLinkTarget(target, localeKey, relativePath)})`)
  })
  protectedText = protectedText.replace(/https?:\/\/[^\s<>()]+/g, match => store(match))
  protectedText = protectedText.replace(nonTranslatableTermsPattern, match => store(match))

  return {
    placeholders,
    text: protectedText,
  }
}

function restoreMarkdownTokens(text, placeholders) {
  let restoredText = text
  for (const [token, value] of [...placeholders.entries()].reverse()) {
    restoredText = restoredText.split(token).join(value)
  }

  return restoredText
}

function localizeMarkdownLinkLabels(text, localeKey) {
  return text.replace(/(!?)\[([^\]]+)\]\(([^)]+)\)/g, (match, marker, label, target) => {
    const translatedLabel = getExactTranslation(localeKey, label.trim())

    if (!translatedLabel) {
      return match
    }

    return `${marker}[${translatedLabel}](${target})`
  })
}

function stripPlaceholderTokens(text) {
  return text.replace(/<vp-token-\d+><\/vp-token-\d+>/g, '')
}

function prepareMarkdownBlock(block, localeKey, relativePath) {
  if (!shouldTranslateText(block)) {
    return {
      block,
      placeholders: new Map(),
      text: block,
      translate: false,
    }
  }

  const { placeholders, text } = protectMarkdownTokens(block, localeKey, relativePath)
  return {
    block,
    placeholders,
    text,
    translate: true,
  }
}

function prepareReferenceLine(line, localeKey, relativePath) {
  const exactTranslation = getExactTranslation(localeKey, line)
  if (exactTranslation) {
    return {
      line,
      exactTranslation,
      placeholders: new Map(),
      text: line,
      translate: false,
    }
  }

  const { placeholders, text } = protectMarkdownTokens(line, localeKey, relativePath)
  const candidateText = stripPlaceholderTokens(text)

  return {
    line,
    placeholders,
    text,
    translate: shouldTranslateText(candidateText),
  }
}

const referenceHeadingTerms = new Set([
  'Abstract Class',
  'Abstract Function',
  'Call Signature',
  'Class',
  'Constructor',
  'Constructors',
  'Default value',
  'Enumeration',
  'Enumerations',
  'Examples',
  'Extends',
  'Extended by',
  'Function',
  'Functions',
  'Interface',
  'Interfaces',
  'Method',
  'Methods',
  'Namespace',
  'Namespaces',
  'Overrides',
  'Parameter',
  'Parameters',
  'Properties',
  'Property',
  'Returns',
  'Type Alias',
  'Type Aliases',
  'Type Parameters',
  'Variable',
  'Variables',
])

const referenceSymbolHeadingKinds = [...referenceHeadingTerms].sort((left, right) => right.length - left.length).join('|')
const referenceSymbolHeadingPattern = new RegExp(`^(?:${referenceSymbolHeadingKinds}):\\s+[A-Za-z_$][A-Za-z0-9_$]*(?:\\(\\))?$`)

function normalizeReferenceSymbolHeading(text) {
  return text
    .trim()
    .replace(/^~~(.+)~~$/, '$1')
    .replace(/^`(.+)`$/, '$1')
}

function isLikelyReferenceSymbolHeading(text) {
  const trimmed = normalizeReferenceSymbolHeading(text)

  if (!trimmed || referenceHeadingTerms.has(trimmed)) {
    return false
  }

  return referenceSymbolHeadingPattern.test(trimmed) || /^[A-Za-z_$][A-Za-z0-9_$]*(?:[<][^>\n]+[>])?(?:\(\))?\??$/.test(trimmed)
}

function isReferenceSourceLocationLine(line) {
  return line.trim().startsWith('Defined in: ')
}

function collectPreparedText(texts, prepared) {
  if (prepared.translate) {
    texts.push(prepared.text)
  }
}

function collectDirectiveText(line, texts) {
  const match = line.match(/^(\s*:::\s*\S+)(?:\s+(.*))?$/)
  if (match?.[2] && shouldTranslateText(match[2])) {
    texts.push(match[2])
  }
}

function collectFrontmatterTextsFromValue(value, keyPath, localeKey, relativePath, texts) {
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      collectFrontmatterTextsFromValue(item, [...keyPath, String(index)], localeKey, relativePath, texts)
    }
    return
  }

  if (value && typeof value === 'object') {
    for (const [childKey, childValue] of Object.entries(value)) {
      collectFrontmatterTextsFromValue(childValue, [...keyPath, childKey], localeKey, relativePath, texts)
    }
    return
  }

  if (typeof value !== 'string') {
    return
  }

  const currentKey = keyPath[keyPath.length - 1]

  if (currentKey === 'layout' || currentKey === 'rel' || currentKey === 'target' || currentKey === 'lang' || currentKey === 'dir' || currentKey === 'link') {
    return
  }

  if (value === 'tsoa-next' || !shouldTranslateText(value)) {
    return
  }

  texts.push(value)
}

function collectFrontmatterTexts(data, localeKey, relativePath, texts) {
  for (const [key, value] of Object.entries(data)) {
    collectFrontmatterTextsFromValue(value, [key], localeKey, relativePath, texts)
  }
}

function collectMarkdownTexts(content, localeKey, relativePath, texts) {
  if (relativePath.startsWith('reference/')) {
    collectReferenceMarkdownTexts(content, localeKey, relativePath, texts)
    return
  }

  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const translatableBuffer = []
  let inFence = false
  let fenceMarker = ''

  const flushTranslatableBuffer = () => {
    if (translatableBuffer.length === 0) {
      return
    }

    collectPreparedText(texts, prepareMarkdownBlock(translatableBuffer.join('\n'), localeKey, relativePath))
    translatableBuffer.length = 0
  }

  for (const line of lines) {
    const trimmed = line.trim()
    const fenceMatch = trimmed.match(/^(```|~~~)/)

    if (inFence) {
      if (fenceMatch && fenceMatch[1] === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }

      continue
    }

    if (fenceMatch) {
      flushTranslatableBuffer()
      inFence = true
      fenceMarker = fenceMatch[1]
      continue
    }

    if (trimmed === '' || trimmed === '[[toc]]') {
      flushTranslatableBuffer()
      continue
    }

    if (trimmed.startsWith(':::')) {
      flushTranslatableBuffer()
      collectDirectiveText(line, texts)
      continue
    }

    if (trimmed.startsWith('<!--')) {
      flushTranslatableBuffer()
      continue
    }

    translatableBuffer.push(line)
  }

  flushTranslatableBuffer()
}

function collectReferenceMarkdownTexts(content, localeKey, relativePath, texts) {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  let inFence = false
  let fenceMarker = ''

  for (const line of lines) {
    const trimmed = line.trim()
    const fenceMatch = trimmed.match(/^(```|~~~)/)

    if (inFence) {
      if (fenceMatch && fenceMatch[1] === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }

      continue
    }

    if (fenceMatch) {
      inFence = true
      fenceMarker = fenceMatch[1]
      continue
    }

    if (trimmed === '' || trimmed === '[[toc]]' || trimmed.startsWith('<!--') || isReferenceBreadcrumbLine(line) || isReferenceSourceLocationLine(line)) {
      continue
    }

    if (trimmed.startsWith(':::')) {
      collectDirectiveText(line, texts)
      continue
    }

    const structuredLineMatch = line.match(/^(#{1,6}\s+)(.*)$/) ?? line.match(/^(\s*[-*+]\s+)(.*)$/) ?? line.match(/^(\s*\d+\.\s+)(.*)$/) ?? line.match(/^(\s*>\s+)(.*)$/)

    if (structuredLineMatch) {
      const prepared = prepareReferenceLine(structuredLineMatch[2], localeKey, relativePath)

      if (isLikelyReferenceSymbolHeading(structuredLineMatch[2])) {
        continue
      }

      collectPreparedText(texts, prepared)
      continue
    }

    collectPreparedText(texts, prepareReferenceLine(line, localeKey, relativePath))
  }
}

async function translateFrontmatterValue(value, keyPath, localeKey, relativePath) {
  if (Array.isArray(value)) {
    return Promise.all(value.map((item, index) => translateFrontmatterValue(item, [...keyPath, String(index)], localeKey, relativePath)))
  }

  if (value && typeof value === 'object') {
    const translatedObject = {}

    for (const [childKey, childValue] of Object.entries(value)) {
      translatedObject[childKey] = await translateFrontmatterValue(childValue, [...keyPath, childKey], localeKey, relativePath)
    }

    return translatedObject
  }

  if (typeof value !== 'string') {
    return value
  }

  const currentKey = keyPath[keyPath.length - 1]

  if (currentKey === 'layout' || currentKey === 'rel' || currentKey === 'target') {
    return value
  }

  if (currentKey === 'lang') {
    return localeByKey[localeKey].lang
  }

  if (currentKey === 'dir') {
    return localeByKey[localeKey].dir
  }

  if (currentKey === 'link') {
    return rewriteHrefForLocale(value, localeKey, relativePath)
  }

  if (value === 'tsoa-next') {
    return value
  }

  return translateText(value, localeKey)
}

async function translateFrontmatter(data, localeKey, relativePath) {
  const translatedData = {}

  for (const [key, value] of Object.entries(data)) {
    translatedData[key] = await translateFrontmatterValue(value, [key], localeKey, relativePath)
  }

  if ('lang' in translatedData) {
    translatedData.lang = localeByKey[localeKey].lang
  }

  return translatedData
}

async function translateMarkdown(content, localeKey, relativePath) {
  if (relativePath.startsWith('reference/')) {
    return translateReferenceMarkdown(content, localeKey, relativePath)
  }

  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const pieces = []
  const translatableBuffer = []
  let inFence = false
  let fenceMarker = ''

  const flushTranslatableBuffer = () => {
    if (translatableBuffer.length === 0) {
      return
    }

    pieces.push({
      kind: 'translate',
      value: translatableBuffer.join('\n'),
    })
    translatableBuffer.length = 0
  }

  for (const line of lines) {
    const trimmed = line.trim()
    const fenceMatch = trimmed.match(/^(```|~~~)/)

    if (inFence) {
      pieces.push({ kind: 'raw', value: line })

      if (fenceMatch && fenceMatch[1] === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }

      continue
    }

    if (fenceMatch) {
      flushTranslatableBuffer()
      inFence = true
      fenceMarker = fenceMatch[1]
      pieces.push({ kind: 'raw', value: line })
      continue
    }

    if (trimmed === '' || trimmed === '[[toc]]') {
      flushTranslatableBuffer()
      pieces.push({ kind: 'raw', value: line })
      continue
    }

    if (trimmed.startsWith(':::')) {
      flushTranslatableBuffer()
      pieces.push({ kind: 'raw', value: await translateDirectiveLine(line, localeKey) })
      continue
    }

    if (trimmed.startsWith('<!--')) {
      flushTranslatableBuffer()
      pieces.push({ kind: 'raw', value: line })
      continue
    }

    translatableBuffer.push(line)
  }

  flushTranslatableBuffer()

  const preparedPieces = pieces.map(piece => {
    if (piece.kind !== 'translate') {
      return piece
    }

    return {
      ...piece,
      prepared: prepareMarkdownBlock(piece.value, localeKey, relativePath),
    }
  })

  const textsToTranslate = preparedPieces.filter(piece => piece.kind === 'translate' && piece.prepared.translate).map(piece => piece.prepared.text)

  const translatedTexts = await translateTexts(textsToTranslate, localeKey)
  let translatedIndex = 0

  const output = preparedPieces.map(piece => {
    if (piece.kind !== 'translate') {
      return piece.value
    }

    if (!piece.prepared.translate) {
      return piece.value
    }

    const restored = restoreMarkdownTokens(translatedTexts[translatedIndex], piece.prepared.placeholders)
    translatedIndex += 1
    return restored
  })

  return localizeMarkdownLinkLabels(output.join('\n'), localeKey)
}

async function translateReferenceMarkdown(content, localeKey, relativePath) {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const pieces = []
  let inFence = false
  let fenceMarker = ''

  for (const line of lines) {
    const trimmed = line.trim()
    const fenceMatch = trimmed.match(/^(```|~~~)/)

    if (inFence) {
      pieces.push({ kind: 'raw', value: line })

      if (fenceMatch && fenceMatch[1] === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }

      continue
    }

    if (fenceMatch) {
      inFence = true
      fenceMarker = fenceMatch[1]
      pieces.push({ kind: 'raw', value: line })
      continue
    }

    if (trimmed === '' || trimmed === '[[toc]]') {
      pieces.push({ kind: 'raw', value: line })
      continue
    }

    if (trimmed.startsWith(':::')) {
      pieces.push({ kind: 'raw', value: await translateDirectiveLine(line, localeKey) })
      continue
    }

    if (trimmed.startsWith('<!--')) {
      pieces.push({ kind: 'raw', value: line })
      continue
    }

    if (isReferenceBreadcrumbLine(line) || isReferenceSourceLocationLine(line)) {
      pieces.push({ kind: 'raw', value: line })
      continue
    }

    const structuredLineMatch = line.match(/^(#{1,6}\s+)(.*)$/) ?? line.match(/^(\s*[-*+]\s+)(.*)$/) ?? line.match(/^(\s*\d+\.\s+)(.*)$/) ?? line.match(/^(\s*>\s+)(.*)$/)

    if (structuredLineMatch) {
      const structuredContent = structuredLineMatch[2]
      const prepared = prepareReferenceLine(structuredContent, localeKey, relativePath)

      if (isLikelyReferenceSymbolHeading(structuredContent)) {
        prepared.translate = false
      }

      pieces.push({
        kind: 'structured',
        prefix: structuredLineMatch[1],
        prepared,
      })
      continue
    }

    pieces.push({
      kind: 'line',
      prepared: prepareReferenceLine(line, localeKey, relativePath),
    })
  }

  const preparedPieces = pieces.map(piece => {
    if (piece.kind === 'raw') {
      return piece
    }

    return piece
  })

  const textsToTranslate = preparedPieces.filter(piece => piece.kind !== 'raw' && piece.prepared.translate).map(piece => piece.prepared.text)

  const translatedTexts = await translateTexts(textsToTranslate, localeKey)
  let translatedIndex = 0

  return localizeMarkdownLinkLabels(
    preparedPieces
    .map(piece => {
      if (piece.kind === 'raw') {
        return piece.value
      }

      const renderedText = piece.prepared.exactTranslation
        ? piece.prepared.exactTranslation
        : piece.prepared.translate
          ? restoreMarkdownTokens(translatedTexts[translatedIndex++], piece.prepared.placeholders)
          : piece.prepared.line

      if (piece.kind === 'structured') {
        return `${piece.prefix}${renderedText}`
      }

      return renderedText
    })
    .join('\n'),
    localeKey,
  )
}

async function translateMarkdownFile(relativePath, localeKey) {
  const sourcePath = join(docsRoot, relativePath)
  const raw = await readFile(sourcePath, 'utf8')
  const parsed = matter(raw)
  const translatedContent = await translateMarkdown(parsed.content, localeKey, relativePath)
  const sourceLastUpdated = await getSourceLastUpdated(relativePath)

  const translatedData = raw.startsWith('---\n') ? await translateFrontmatter(parsed.data, localeKey, relativePath) : {}

  if (translatedData.lastUpdated !== false) {
    translatedData.lastUpdated = sourceLastUpdated
  }

  return matter.stringify(translatedContent, translatedData)
}

async function getSourceLastUpdated(relativePath) {
  if (!sourceLastUpdatedCache.has(relativePath)) {
    const sourcePath = join(docsRoot, relativePath)
    const { mtime } = await stat(sourcePath)
    sourceLastUpdatedCache.set(relativePath, mtime)
  }

  return sourceLastUpdatedCache.get(relativePath)
}

async function warmLocaleCache(localeKey, sourceFiles) {
  const texts = []

  for (const relativePath of sourceFiles) {
    if (!sourceMarkdownExtensions.has(extname(relativePath))) {
      continue
    }

    const sourcePath = join(docsRoot, relativePath)
    const raw = await readFile(sourcePath, 'utf8')
    const parsed = matter(raw)

    collectMarkdownTexts(parsed.content, localeKey, relativePath, texts)
    if (raw.startsWith('---\n')) {
      collectFrontmatterTexts(parsed.data, localeKey, relativePath, texts)
    }
  }

  const uniqueTextCount = new Set(texts).size
  console.log(`Prewarming locale ${localeKey}: ${uniqueTextCount} unique strings`)
  await translateTexts(texts, localeKey)
}

async function ensureParentDirectory(filePath) {
  await mkdir(dirname(filePath), { recursive: true })
}

async function collectSourceFiles(dirPath = docsRoot, relativeDir = '') {
  const entries = await readdir(dirPath, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name
    const absolutePath = join(dirPath, entry.name)

    if (entry.isDirectory()) {
      if (sourceIgnoreDirs.has(entry.name) && relativeDir === '') {
        continue
      }

      files.push(...(await collectSourceFiles(absolutePath, relativePath)))
      continue
    }

    if (sourceIgnoreFiles.has(entry.name)) {
      continue
    }

    files.push(relativePath)
  }

  return files.sort()
}

async function buildLocale(localeKey, sourceFiles, { partial = false } = {}) {
  const localeRoot = join(docsRoot, localeKey)

  if (partial) {
    await mkdir(localeRoot, { recursive: true })
  } else {
    await rm(localeRoot, { recursive: true, force: true })
  }

  await warmLocaleCache(localeKey, sourceFiles)

  for (const relativePath of sourceFiles) {
    const sourcePath = join(docsRoot, relativePath)
    const targetPath = join(localeRoot, relativePath)
    const fileExtension = extname(relativePath)

    await ensureParentDirectory(targetPath)

    if (!sourceMarkdownExtensions.has(fileExtension)) {
      await cp(sourcePath, targetPath)
      continue
    }

    const translatedMarkdown = await translateMarkdownFile(relativePath, localeKey)
    await writeFile(targetPath, translatedMarkdown, 'utf8')
  }
}

async function main() {
  await loadCache()

  const allSourceFiles = await collectSourceFiles()
  const sourceFiles = requestedSourceFiles ?? allSourceFiles

  if (requestedSourceFiles) {
    const availableSourceFiles = new Set(allSourceFiles)
    const missingSourceFiles = requestedSourceFiles.filter(relativePath => !availableSourceFiles.has(relativePath))

    if (missingSourceFiles.length > 0) {
      throw new Error(`Unknown source files requested via FILES: ${missingSourceFiles.join(', ')}`)
    }
  }

  console.log(`Translating ${sourceFiles.length} source files into ${requestedLocaleKeys.length} locales`)

  for (const localeKey of requestedLocaleKeys) {
    if (!generatedLocaleKeys.includes(localeKey)) {
      throw new Error(`Unsupported locale key: ${localeKey}`)
    }

    console.log(`Generating locale: ${localeKey}`)
    await buildLocale(localeKey, sourceFiles, { partial: Boolean(requestedSourceFiles) })
    await saveCache()
  }
}

main().catch(async error => {
  try {
    await saveCache()
  } catch {}

  console.error(error)
  process.exitCode = 1
})
