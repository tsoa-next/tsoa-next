const guideSidebarSpec = [
  {
    items: [{ page: 'introduction', link: '/introduction' }],
  },
  {
    section: 'guides',
    items: [
      { page: 'gettingStarted', link: '/getting-started' },
      { page: 'generating', link: '/generating' },
      { page: 'liveReloading', link: '/live-reloading' },
      { page: 'errorHandling', link: '/error-handling' },
      { page: 'descriptions', link: '/descriptions' },
      { page: 'examples', link: '/examples' },
      { page: 'annotations', link: '/annotations' },
      { page: 'customMiddlewares', link: '/custom-middlewares' },
      { page: 'customValidation', link: '/custom-validation' },
      { page: 'externalValidators', link: '/external-validators' },
      { page: 'dependencyInjection', link: '/di' },
      { page: 'authentication', link: '/authentication' },
      { page: 'decorators', link: '/decorators' },
    ],
  },
  {
    items: [{ page: 'faq', link: '/faq' }],
  },
  {
    section: 'advancedGuides',
    items: [
      { page: 'fileUpload', link: '/file-upload' },
      { page: 'pathMapping', link: '/path-mapping' },
      { page: 'templates', link: '/templates' },
      { page: 'routes', link: '/routes' },
      { page: 'upgrading', link: '/upgrading' },
    ],
  },
]

const defaultNotFoundQuote = "But if you don't change your direction, and if you keep looking, you may end up where you are heading."

export const localeMessages = {
  root: {
    label: 'English',
    lang: 'en-US',
    ogLocale: 'en_US',
    dir: 'ltr',
    breadcrumbHome: 'Home',
    nav: {
      home: 'Home',
      guides: 'Guides',
      apiReference: 'API Reference',
      playground: 'Playground',
    },
    sections: {
      guides: 'Guides',
      advancedGuides: 'Advanced Guides',
    },
    pages: {
      introduction: 'Introduction',
      gettingStarted: 'Getting Started',
      generating: 'Generating',
      liveReloading: 'Live reloading',
      errorHandling: 'Error handling',
      descriptions: 'Descriptions',
      examples: 'Examples',
      annotations: 'Annotations',
      customMiddlewares: 'Custom Middlewares',
      customValidation: 'Custom Validation',
      externalValidators: 'External Validators',
      dependencyInjection: 'Dependency Injection',
      authentication: 'Authentication',
      decorators: 'Decorators',
      faq: 'FAQ',
      fileUpload: 'File upload',
      pathMapping: 'Path mapping',
      templates: 'Templates',
      routes: 'Routes',
      upgrading: 'Upgrading',
    },
    referenceGroups: {
      Classes: 'Classes',
      Enumerations: 'Enumerations',
      Functions: 'Functions',
      Interfaces: 'Interfaces',
      Namespaces: 'Namespaces',
      TypeAliases: 'Type Aliases',
      Variables: 'Variables',
    },
    footer: {
      message: 'TypeScript-first OpenAPI generation, route generation, and runtime validation.',
      copyright: 'Released under the MIT License.',
    },
    theme: {
      outlineLabel: 'On this page',
      darkModeSwitchLabel: 'Appearance',
      lightModeSwitchTitle: 'Switch to light theme',
      darkModeSwitchTitle: 'Switch to dark theme',
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Return to top',
      langMenuLabel: 'Change language',
      skipToContentLabel: 'Skip to content',
      lastUpdatedText: 'Last updated',
      editLinkText: 'Suggest edits to this page',
      docFooterPrev: 'Previous page',
      docFooterNext: 'Next page',
      notFound: {
        title: 'PAGE NOT FOUND',
        quote: defaultNotFoundQuote,
        linkLabel: 'go to home',
        linkText: 'Take me home',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'Search',
        buttonAriaLabel: 'Search',
      },
      modal: {
        displayDetails: 'Display detailed list',
        resetButtonTitle: 'Reset search',
        backButtonTitle: 'Close search',
        noResultsText: 'No results found',
        footer: {
          selectText: 'Select',
          selectKeyAriaLabel: 'enter',
          navigateText: 'Navigate',
          navigateUpKeyAriaLabel: 'up arrow',
          navigateDownKeyAriaLabel: 'down arrow',
          closeText: 'Close',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  'zh-hans': {
    label: '简体中文',
    lang: 'zh-CN',
    ogLocale: 'zh_CN',
    dir: 'ltr',
    breadcrumbHome: '主页',
    nav: {
      home: '主页',
      guides: '指南',
      apiReference: 'API 参考',
      playground: '演练场',
    },
    sections: {
      guides: '指南',
      advancedGuides: '高级指南',
    },
    pages: {
      introduction: '简介',
      gettingStarted: '快速开始',
      generating: '生成',
      liveReloading: '实时重载',
      errorHandling: '错误处理',
      descriptions: '描述',
      examples: '示例',
      annotations: '注解',
      customMiddlewares: '自定义中间件',
      customValidation: '自定义验证',
      externalValidators: '外部验证器',
      dependencyInjection: '依赖注入',
      authentication: '身份验证',
      decorators: '装饰器',
      faq: '常见问题',
      fileUpload: '文件上传',
      pathMapping: '路径映射',
      templates: '模板',
      routes: '路由',
      upgrading: '升级',
    },
    referenceGroups: {
      Classes: '类',
      Enumerations: '枚举',
      Functions: '函数',
      Interfaces: '接口',
      Namespaces: '命名空间',
      TypeAliases: '类型别名',
      Variables: '变量',
    },
    footer: {
      message: '以 TypeScript 为先的 OpenAPI 生成、路由生成与运行时验证。',
      copyright: '基于 MIT 许可证发布。',
    },
    theme: {
      outlineLabel: '本页内容',
      darkModeSwitchLabel: '外观',
      lightModeSwitchTitle: '切换到浅色主题',
      darkModeSwitchTitle: '切换到深色主题',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '返回顶部',
      langMenuLabel: '切换语言',
      skipToContentLabel: '跳到内容',
      lastUpdatedText: '最后更新',
      editLinkText: '建议修改此页',
      docFooterPrev: '上一页',
      docFooterNext: '下一页',
      notFound: {
        title: '页面未找到',
        quote: '如果你不改变方向，并继续寻找，最终也许会到达你正前往的地方。',
        linkLabel: '返回主页',
        linkText: '带我回主页',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索',
      },
      modal: {
        displayDetails: '显示详细列表',
        resetButtonTitle: '重置搜索',
        backButtonTitle: '关闭搜索',
        noResultsText: '没有找到结果',
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: '回车',
          navigateText: '导航',
          navigateUpKeyAriaLabel: '上箭头',
          navigateDownKeyAriaLabel: '下箭头',
          closeText: '关闭',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  hi: {
    label: 'हिन्दी',
    lang: 'hi-IN',
    ogLocale: 'hi_IN',
    dir: 'ltr',
    breadcrumbHome: 'मुखपृष्ठ',
    nav: {
      home: 'मुखपृष्ठ',
      guides: 'मार्गदर्शिकाएं',
      apiReference: 'API संदर्भ',
      playground: 'प्लেগ्राउंड',
    },
    sections: {
      guides: 'मार्गदर्शिकाएं',
      advancedGuides: 'उन्नत मार्गदर्शिकाएं',
    },
    pages: {
      introduction: 'परिचय',
      gettingStarted: 'शुरुआत',
      generating: 'जनरेशन',
      liveReloading: 'लाइव रीलोडिंग',
      errorHandling: 'त्रुटि प्रबंधन',
      descriptions: 'विवरण',
      examples: 'उदाहरण',
      annotations: 'एनोटेशन',
      customMiddlewares: 'कस्टम मिडलवेयर',
      customValidation: 'कस्टम वैलिडेशन',
      externalValidators: 'बाहरी वैलिडेटर',
      dependencyInjection: 'डिपेंडेंसी इंजेक्शन',
      authentication: 'प्रमाणीकरण',
      decorators: 'डेकोरेटर',
      faq: 'सामान्य प्रश्न',
      fileUpload: 'फ़ाइल अपलोड',
      pathMapping: 'पाथ मैपिंग',
      templates: 'टेम्पलेट्स',
      routes: 'रूट्स',
      upgrading: 'अपग्रेड करना',
    },
    referenceGroups: {
      Classes: 'क्लासेस',
      Enumerations: 'एनम्स',
      Functions: 'फंक्शन्स',
      Interfaces: 'इंटरफेस',
      Namespaces: 'नेमस्पेस',
      TypeAliases: 'टाइप एलियस',
      Variables: 'वेरिएबल्स',
    },
    footer: {
      message: 'TypeScript-प्रथम OpenAPI जनरेशन, रूट जनरेशन और रनटाइम वैलिडेशन।',
      copyright: 'MIT लाइसेंस के अंतर्गत जारी।',
    },
    theme: {
      outlineLabel: 'इस पेज पर',
      darkModeSwitchLabel: 'दिखावट',
      lightModeSwitchTitle: 'लाइट थीम पर जाएं',
      darkModeSwitchTitle: 'डार्क थीम पर जाएं',
      sidebarMenuLabel: 'मेनू',
      returnToTopLabel: 'ऊपर लौटें',
      langMenuLabel: 'भाषा बदलें',
      skipToContentLabel: 'सामग्री पर जाएं',
      lastUpdatedText: 'अंतिम अपडेट',
      editLinkText: 'इस पेज पर संपादन सुझाएँ',
      docFooterPrev: 'पिछला पेज',
      docFooterNext: 'अगला पेज',
      notFound: {
        title: 'पेज नहीं मिला',
        quote: 'यदि आप दिशा नहीं बदलते और तलाश जारी रखते हैं, तो संभव है कि आप वहीं पहुंचें जहां जा रहे हैं।',
        linkLabel: 'मुखपृष्ठ पर जाएं',
        linkText: 'मुझे मुखपृष्ठ पर ले चलें',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'खोजें',
        buttonAriaLabel: 'खोजें',
      },
      modal: {
        displayDetails: 'विस्तृत सूची दिखाएं',
        resetButtonTitle: 'खोज रीसेट करें',
        backButtonTitle: 'खोज बंद करें',
        noResultsText: 'कोई परिणाम नहीं मिला',
        footer: {
          selectText: 'चुनें',
          selectKeyAriaLabel: 'एंटर',
          navigateText: 'नेविगेट करें',
          navigateUpKeyAriaLabel: 'ऊपर तीर',
          navigateDownKeyAriaLabel: 'नीचे तीर',
          closeText: 'बंद करें',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  es: {
    label: 'Español',
    lang: 'es-ES',
    ogLocale: 'es_ES',
    dir: 'ltr',
    breadcrumbHome: 'Inicio',
    nav: {
      home: 'Inicio',
      guides: 'Guías',
      apiReference: 'Referencia de API',
      playground: 'Playground',
    },
    sections: {
      guides: 'Guías',
      advancedGuides: 'Guías avanzadas',
    },
    pages: {
      introduction: 'Introducción',
      gettingStarted: 'Primeros pasos',
      generating: 'Generación',
      liveReloading: 'Recarga en vivo',
      errorHandling: 'Manejo de errores',
      descriptions: 'Descripciones',
      examples: 'Ejemplos',
      annotations: 'Anotaciones',
      customMiddlewares: 'Middlewares personalizados',
      customValidation: 'Validación personalizada',
      externalValidators: 'Validadores externos',
      dependencyInjection: 'Inyección de dependencias',
      authentication: 'Autenticación',
      decorators: 'Decoradores',
      faq: 'Preguntas frecuentes',
      fileUpload: 'Carga de archivos',
      pathMapping: 'Mapeo de rutas',
      templates: 'Plantillas',
      routes: 'Rutas',
      upgrading: 'Actualización',
    },
    referenceGroups: {
      Classes: 'Clases',
      Enumerations: 'Enumeraciones',
      Functions: 'Funciones',
      Interfaces: 'Interfaces',
      Namespaces: 'Espacios de nombres',
      TypeAliases: 'Alias de tipo',
      Variables: 'Variables',
    },
    footer: {
      message: 'Generación de OpenAPI, generación de rutas y validación en tiempo de ejecución con prioridad en TypeScript.',
      copyright: 'Publicado bajo la licencia MIT.',
    },
    theme: {
      outlineLabel: 'En esta página',
      darkModeSwitchLabel: 'Apariencia',
      lightModeSwitchTitle: 'Cambiar al tema claro',
      darkModeSwitchTitle: 'Cambiar al tema oscuro',
      sidebarMenuLabel: 'Menú',
      returnToTopLabel: 'Volver arriba',
      langMenuLabel: 'Cambiar idioma',
      skipToContentLabel: 'Saltar al contenido',
      lastUpdatedText: 'Última actualización',
      editLinkText: 'Sugerir cambios en esta página',
      docFooterPrev: 'Página anterior',
      docFooterNext: 'Página siguiente',
      notFound: {
        title: 'PÁGINA NO ENCONTRADA',
        quote: 'Pero si no cambias de dirección y sigues buscando, puede que termines donde te diriges.',
        linkLabel: 'ir al inicio',
        linkText: 'Llévame al inicio',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'Buscar',
        buttonAriaLabel: 'Buscar',
      },
      modal: {
        displayDetails: 'Mostrar lista detallada',
        resetButtonTitle: 'Restablecer búsqueda',
        backButtonTitle: 'Cerrar búsqueda',
        noResultsText: 'No se encontraron resultados',
        footer: {
          selectText: 'Seleccionar',
          selectKeyAriaLabel: 'enter',
          navigateText: 'Navegar',
          navigateUpKeyAriaLabel: 'flecha arriba',
          navigateDownKeyAriaLabel: 'flecha abajo',
          closeText: 'Cerrar',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  ar: {
    label: 'العربية',
    lang: 'ar',
    ogLocale: 'ar_AR',
    dir: 'rtl',
    breadcrumbHome: 'الرئيسية',
    nav: {
      home: 'الرئيسية',
      guides: 'الأدلة',
      apiReference: 'مرجع API',
      playground: 'ساحة التجربة',
    },
    sections: {
      guides: 'الأدلة',
      advancedGuides: 'الأدلة المتقدمة',
    },
    pages: {
      introduction: 'مقدمة',
      gettingStarted: 'البدء',
      generating: 'التوليد',
      liveReloading: 'إعادة التحميل الحي',
      errorHandling: 'معالجة الأخطاء',
      descriptions: 'الأوصاف',
      examples: 'أمثلة',
      annotations: 'التعليقات التوضيحية',
      customMiddlewares: 'البرمجيات الوسيطة المخصصة',
      customValidation: 'التحقق المخصص',
      externalValidators: 'أدوات التحقق الخارجية',
      dependencyInjection: 'حقن التبعيات',
      authentication: 'المصادقة',
      decorators: 'المزخرفات',
      faq: 'الأسئلة الشائعة',
      fileUpload: 'رفع الملفات',
      pathMapping: 'تعيين المسارات',
      templates: 'القوالب',
      routes: 'المسارات',
      upgrading: 'الترقية',
    },
    referenceGroups: {
      Classes: 'الفئات',
      Enumerations: 'التعدادات',
      Functions: 'الدوال',
      Interfaces: 'الواجهات',
      Namespaces: 'مساحات الأسماء',
      TypeAliases: 'الأسماء المستعارة للأنواع',
      Variables: 'المتغيرات',
    },
    footer: {
      message: 'توليد OpenAPI وتوليد المسارات والتحقق وقت التشغيل مع اعتماد TypeScript أولاً.',
      copyright: 'منشور تحت رخصة MIT.',
    },
    theme: {
      outlineLabel: 'في هذه الصفحة',
      darkModeSwitchLabel: 'المظهر',
      lightModeSwitchTitle: 'التبديل إلى النمط الفاتح',
      darkModeSwitchTitle: 'التبديل إلى النمط الداكن',
      sidebarMenuLabel: 'القائمة',
      returnToTopLabel: 'العودة إلى الأعلى',
      langMenuLabel: 'تغيير اللغة',
      skipToContentLabel: 'تخطي إلى المحتوى',
      lastUpdatedText: 'آخر تحديث',
      editLinkText: 'اقترح تعديلات على هذه الصفحة',
      docFooterPrev: 'الصفحة السابقة',
      docFooterNext: 'الصفحة التالية',
      notFound: {
        title: 'الصفحة غير موجودة',
        quote: 'إذا لم تغيّر اتجاهك وواصلت البحث، فقد تصل في النهاية إلى المكان الذي تتجه إليه.',
        linkLabel: 'الذهاب إلى الرئيسية',
        linkText: 'أعدني إلى الرئيسية',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'بحث',
        buttonAriaLabel: 'بحث',
      },
      modal: {
        displayDetails: 'عرض القائمة التفصيلية',
        resetButtonTitle: 'إعادة تعيين البحث',
        backButtonTitle: 'إغلاق البحث',
        noResultsText: 'لا توجد نتائج',
        footer: {
          selectText: 'اختيار',
          selectKeyAriaLabel: 'إدخال',
          navigateText: 'تنقل',
          navigateUpKeyAriaLabel: 'سهم لأعلى',
          navigateDownKeyAriaLabel: 'سهم لأسفل',
          closeText: 'إغلاق',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  fr: {
    label: 'Français',
    lang: 'fr-FR',
    ogLocale: 'fr_FR',
    dir: 'ltr',
    breadcrumbHome: 'Accueil',
    nav: {
      home: 'Accueil',
      guides: 'Guides',
      apiReference: "Référence de l'API",
      playground: 'Playground',
    },
    sections: {
      guides: 'Guides',
      advancedGuides: 'Guides avancés',
    },
    pages: {
      introduction: 'Introduction',
      gettingStarted: 'Prise en main',
      generating: 'Génération',
      liveReloading: 'Rechargement en direct',
      errorHandling: 'Gestion des erreurs',
      descriptions: 'Descriptions',
      examples: 'Exemples',
      annotations: 'Annotations',
      customMiddlewares: 'Middlewares personnalisés',
      customValidation: 'Validation personnalisée',
      externalValidators: 'Validateurs externes',
      dependencyInjection: 'Injection de dépendances',
      authentication: 'Authentification',
      decorators: 'Décorateurs',
      faq: 'FAQ',
      fileUpload: 'Téléversement de fichiers',
      pathMapping: 'Mappage des chemins',
      templates: 'Modèles',
      routes: 'Routes',
      upgrading: 'Mise à niveau',
    },
    referenceGroups: {
      Classes: 'Classes',
      Enumerations: 'Énumérations',
      Functions: 'Fonctions',
      Interfaces: 'Interfaces',
      Namespaces: 'Espaces de noms',
      TypeAliases: 'Alias de type',
      Variables: 'Variables',
    },
    footer: {
      message: 'Génération OpenAPI, génération de routes et validation à l’exécution orientées TypeScript.',
      copyright: 'Publié sous licence MIT.',
    },
    theme: {
      outlineLabel: 'Sur cette page',
      darkModeSwitchLabel: 'Apparence',
      lightModeSwitchTitle: 'Passer au thème clair',
      darkModeSwitchTitle: 'Passer au thème sombre',
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Retour en haut',
      langMenuLabel: 'Changer de langue',
      skipToContentLabel: 'Aller au contenu',
      lastUpdatedText: 'Dernière mise à jour',
      editLinkText: 'Suggérer des modifications pour cette page',
      docFooterPrev: 'Page précédente',
      docFooterNext: 'Page suivante',
      notFound: {
        title: 'PAGE INTROUVABLE',
        quote: 'Mais si vous ne changez pas de direction et continuez à chercher, vous pourriez finir là où vous vous dirigez.',
        linkLabel: "aller à l'accueil",
        linkText: "Ramenez-moi à l'accueil",
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'Rechercher',
        buttonAriaLabel: 'Rechercher',
      },
      modal: {
        displayDetails: 'Afficher la liste détaillée',
        resetButtonTitle: 'Réinitialiser la recherche',
        backButtonTitle: 'Fermer la recherche',
        noResultsText: 'Aucun résultat',
        footer: {
          selectText: 'Sélectionner',
          selectKeyAriaLabel: 'entrée',
          navigateText: 'Naviguer',
          navigateUpKeyAriaLabel: 'flèche haut',
          navigateDownKeyAriaLabel: 'flèche bas',
          closeText: 'Fermer',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  bn: {
    label: 'বাংলা',
    lang: 'bn-BD',
    ogLocale: 'bn_BD',
    dir: 'ltr',
    breadcrumbHome: 'হোম',
    nav: {
      home: 'হোম',
      guides: 'নির্দেশিকা',
      apiReference: 'API রেফারেন্স',
      playground: 'প্লেগ্রাউন্ড',
    },
    sections: {
      guides: 'নির্দেশিকা',
      advancedGuides: 'উন্নত নির্দেশিকা',
    },
    pages: {
      introduction: 'ভূমিকা',
      gettingStarted: 'শুরু করা',
      generating: 'জেনারেশন',
      liveReloading: 'লাইভ রিলোডিং',
      errorHandling: 'ত্রুটি ব্যবস্থাপনা',
      descriptions: 'বিবরণ',
      examples: 'উদাহরণ',
      annotations: 'অ্যানোটেশন',
      customMiddlewares: 'কাস্টম মিডলওয়্যার',
      customValidation: 'কাস্টম ভ্যালিডেশন',
      externalValidators: 'বাহ্যিক ভ্যালিডেটর',
      dependencyInjection: 'ডিপেনডেন্সি ইনজেকশন',
      authentication: 'অথেনটিকেশন',
      decorators: 'ডেকোরেটর',
      faq: 'জিজ্ঞাসিত প্রশ্ন',
      fileUpload: 'ফাইল আপলোড',
      pathMapping: 'পাথ ম্যাপিং',
      templates: 'টেমপ্লেট',
      routes: 'রুট',
      upgrading: 'আপগ্রেড',
    },
    referenceGroups: {
      Classes: 'ক্লাস',
      Enumerations: 'এনাম',
      Functions: 'ফাংশন',
      Interfaces: 'ইন্টারফেস',
      Namespaces: 'নেমস্পেস',
      TypeAliases: 'টাইপ অ্যালিয়াস',
      Variables: 'ভেরিয়েবল',
    },
    footer: {
      message: 'TypeScript-প্রথম OpenAPI জেনারেশন, রুট জেনারেশন এবং রানটাইম ভ্যালিডেশন।',
      copyright: 'MIT লাইসেন্সের অধীনে প্রকাশিত।',
    },
    theme: {
      outlineLabel: 'এই পৃষ্ঠায়',
      darkModeSwitchLabel: 'চেহারা',
      lightModeSwitchTitle: 'লাইট থিমে বদলান',
      darkModeSwitchTitle: 'ডার্ক থিমে বদলান',
      sidebarMenuLabel: 'মেনু',
      returnToTopLabel: 'উপরে ফিরুন',
      langMenuLabel: 'ভাষা বদলান',
      skipToContentLabel: 'বিষয়ে যান',
      lastUpdatedText: 'সর্বশেষ হালনাগাদ',
      editLinkText: 'এই পৃষ্ঠায় সম্পাদনার প্রস্তাব দিন',
      docFooterPrev: 'আগের পৃষ্ঠা',
      docFooterNext: 'পরের পৃষ্ঠা',
      notFound: {
        title: 'পৃষ্ঠা পাওয়া যায়নি',
        quote: 'আপনি যদি দিক না বদলান এবং খুঁজতে থাকেন, তাহলে শেষ পর্যন্ত হয়তো সেখানেই পৌঁছাবেন যেখানে যাচ্ছেন।',
        linkLabel: 'হোমে যান',
        linkText: 'আমাকে হোমে নিয়ে যান',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'খুঁজুন',
        buttonAriaLabel: 'খুঁজুন',
      },
      modal: {
        displayDetails: 'বিস্তারিত তালিকা দেখান',
        resetButtonTitle: 'সার্চ রিসেট করুন',
        backButtonTitle: 'সার্চ বন্ধ করুন',
        noResultsText: 'কোনও ফল পাওয়া যায়নি',
        footer: {
          selectText: 'নির্বাচন',
          selectKeyAriaLabel: 'এন্টার',
          navigateText: 'নেভিগেট',
          navigateUpKeyAriaLabel: 'উপরের তীর',
          navigateDownKeyAriaLabel: 'নিচের তীর',
          closeText: 'বন্ধ',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  pt: {
    label: 'Português',
    lang: 'pt-BR',
    ogLocale: 'pt_BR',
    dir: 'ltr',
    breadcrumbHome: 'Início',
    nav: {
      home: 'Início',
      guides: 'Guias',
      apiReference: 'Referência da API',
      playground: 'Playground',
    },
    sections: {
      guides: 'Guias',
      advancedGuides: 'Guias avançados',
    },
    pages: {
      introduction: 'Introdução',
      gettingStarted: 'Primeiros passos',
      generating: 'Geração',
      liveReloading: 'Recarga ao vivo',
      errorHandling: 'Tratamento de erros',
      descriptions: 'Descrições',
      examples: 'Exemplos',
      annotations: 'Anotações',
      customMiddlewares: 'Middlewares personalizados',
      customValidation: 'Validação personalizada',
      externalValidators: 'Validadores externos',
      dependencyInjection: 'Injeção de dependências',
      authentication: 'Autenticação',
      decorators: 'Decoradores',
      faq: 'Perguntas frequentes',
      fileUpload: 'Upload de arquivos',
      pathMapping: 'Mapeamento de caminhos',
      templates: 'Templates',
      routes: 'Rotas',
      upgrading: 'Atualização',
    },
    referenceGroups: {
      Classes: 'Classes',
      Enumerations: 'Enumerações',
      Functions: 'Funções',
      Interfaces: 'Interfaces',
      Namespaces: 'Namespaces',
      TypeAliases: 'Aliases de tipo',
      Variables: 'Variáveis',
    },
    footer: {
      message: 'Geração de OpenAPI, geração de rotas e validação em tempo de execução com foco em TypeScript.',
      copyright: 'Publicado sob a licença MIT.',
    },
    theme: {
      outlineLabel: 'Nesta página',
      darkModeSwitchLabel: 'Aparência',
      lightModeSwitchTitle: 'Alternar para o tema claro',
      darkModeSwitchTitle: 'Alternar para o tema escuro',
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Voltar ao topo',
      langMenuLabel: 'Mudar idioma',
      skipToContentLabel: 'Ir para o conteúdo',
      lastUpdatedText: 'Última atualização',
      editLinkText: 'Sugerir edições nesta página',
      docFooterPrev: 'Página anterior',
      docFooterNext: 'Próxima página',
      notFound: {
        title: 'PÁGINA NÃO ENCONTRADA',
        quote: 'Mas se você não mudar de direção e continuar procurando, talvez termine onde está indo.',
        linkLabel: 'ir para o início',
        linkText: 'Leve-me para o início',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'Pesquisar',
        buttonAriaLabel: 'Pesquisar',
      },
      modal: {
        displayDetails: 'Exibir lista detalhada',
        resetButtonTitle: 'Redefinir pesquisa',
        backButtonTitle: 'Fechar pesquisa',
        noResultsText: 'Nenhum resultado encontrado',
        footer: {
          selectText: 'Selecionar',
          selectKeyAriaLabel: 'enter',
          navigateText: 'Navegar',
          navigateUpKeyAriaLabel: 'seta para cima',
          navigateDownKeyAriaLabel: 'seta para baixo',
          closeText: 'Fechar',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  ru: {
    label: 'Русский',
    lang: 'ru-RU',
    ogLocale: 'ru_RU',
    dir: 'ltr',
    breadcrumbHome: 'Главная',
    nav: {
      home: 'Главная',
      guides: 'Руководства',
      apiReference: 'Справочник API',
      playground: 'Песочница',
    },
    sections: {
      guides: 'Руководства',
      advancedGuides: 'Продвинутые руководства',
    },
    pages: {
      introduction: 'Введение',
      gettingStarted: 'Начало работы',
      generating: 'Генерация',
      liveReloading: 'Горячая перезагрузка',
      errorHandling: 'Обработка ошибок',
      descriptions: 'Описания',
      examples: 'Примеры',
      annotations: 'Аннотации',
      customMiddlewares: 'Пользовательские middleware',
      customValidation: 'Пользовательская валидация',
      externalValidators: 'Внешние валидаторы',
      dependencyInjection: 'Внедрение зависимостей',
      authentication: 'Аутентификация',
      decorators: 'Декораторы',
      faq: 'Вопросы и ответы',
      fileUpload: 'Загрузка файлов',
      pathMapping: 'Сопоставление путей',
      templates: 'Шаблоны',
      routes: 'Маршруты',
      upgrading: 'Обновление',
    },
    referenceGroups: {
      Classes: 'Классы',
      Enumerations: 'Перечисления',
      Functions: 'Функции',
      Interfaces: 'Интерфейсы',
      Namespaces: 'Пространства имен',
      TypeAliases: 'Псевдонимы типов',
      Variables: 'Переменные',
    },
    footer: {
      message: 'Генерация OpenAPI, генерация маршрутов и валидация во время выполнения с упором на TypeScript.',
      copyright: 'Опубликовано по лицензии MIT.',
    },
    theme: {
      outlineLabel: 'На этой странице',
      darkModeSwitchLabel: 'Оформление',
      lightModeSwitchTitle: 'Переключить на светлую тему',
      darkModeSwitchTitle: 'Переключить на темную тему',
      sidebarMenuLabel: 'Меню',
      returnToTopLabel: 'Наверх',
      langMenuLabel: 'Сменить язык',
      skipToContentLabel: 'Перейти к содержимому',
      lastUpdatedText: 'Последнее обновление',
      editLinkText: 'Предложить правки для этой страницы',
      docFooterPrev: 'Предыдущая страница',
      docFooterNext: 'Следующая страница',
      notFound: {
        title: 'СТРАНИЦА НЕ НАЙДЕНА',
        quote: 'Но если не менять направление и продолжать искать, можно оказаться именно там, куда вы идете.',
        linkLabel: 'перейти на главную',
        linkText: 'Вернуть меня на главную',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'Поиск',
        buttonAriaLabel: 'Поиск',
      },
      modal: {
        displayDetails: 'Показать подробный список',
        resetButtonTitle: 'Сбросить поиск',
        backButtonTitle: 'Закрыть поиск',
        noResultsText: 'Ничего не найдено',
        footer: {
          selectText: 'Выбрать',
          selectKeyAriaLabel: 'enter',
          navigateText: 'Навигация',
          navigateUpKeyAriaLabel: 'стрелка вверх',
          navigateDownKeyAriaLabel: 'стрелка вниз',
          closeText: 'Закрыть',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
  id: {
    label: 'Bahasa Indonesia',
    lang: 'id-ID',
    ogLocale: 'id_ID',
    dir: 'ltr',
    breadcrumbHome: 'Beranda',
    nav: {
      home: 'Beranda',
      guides: 'Panduan',
      apiReference: 'Referensi API',
      playground: 'Playground',
    },
    sections: {
      guides: 'Panduan',
      advancedGuides: 'Panduan lanjutan',
    },
    pages: {
      introduction: 'Pengantar',
      gettingStarted: 'Memulai',
      generating: 'Pembuatan',
      liveReloading: 'Pemuatan ulang langsung',
      errorHandling: 'Penanganan error',
      descriptions: 'Deskripsi',
      examples: 'Contoh',
      annotations: 'Anotasi',
      customMiddlewares: 'Middleware kustom',
      customValidation: 'Validasi kustom',
      externalValidators: 'Validator eksternal',
      dependencyInjection: 'Injeksi dependensi',
      authentication: 'Autentikasi',
      decorators: 'Dekorator',
      faq: 'FAQ',
      fileUpload: 'Unggah berkas',
      pathMapping: 'Pemetaan path',
      templates: 'Templat',
      routes: 'Rute',
      upgrading: 'Pembaruan',
    },
    referenceGroups: {
      Classes: 'Kelas',
      Enumerations: 'Enumerasi',
      Functions: 'Fungsi',
      Interfaces: 'Antarmuka',
      Namespaces: 'Namespace',
      TypeAliases: 'Alias tipe',
      Variables: 'Variabel',
    },
    footer: {
      message: 'Pembuatan OpenAPI, pembuatan rute, dan validasi runtime yang mengutamakan TypeScript.',
      copyright: 'Diterbitkan di bawah lisensi MIT.',
    },
    theme: {
      outlineLabel: 'Di halaman ini',
      darkModeSwitchLabel: 'Tampilan',
      lightModeSwitchTitle: 'Beralih ke tema terang',
      darkModeSwitchTitle: 'Beralih ke tema gelap',
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Kembali ke atas',
      langMenuLabel: 'Ganti bahasa',
      skipToContentLabel: 'Lewati ke konten',
      lastUpdatedText: 'Terakhir diperbarui',
      editLinkText: 'Sarankan suntingan untuk halaman ini',
      docFooterPrev: 'Halaman sebelumnya',
      docFooterNext: 'Halaman berikutnya',
      notFound: {
        title: 'HALAMAN TIDAK DITEMUKAN',
        quote: 'Namun jika Anda tidak mengubah arah dan terus mencari, Anda mungkin akan berakhir di tempat yang memang sedang Anda tuju.',
        linkLabel: 'pergi ke beranda',
        linkText: 'Bawa saya ke beranda',
        code: '404',
      },
    },
    search: {
      button: {
        buttonText: 'Cari',
        buttonAriaLabel: 'Cari',
      },
      modal: {
        displayDetails: 'Tampilkan daftar rinci',
        resetButtonTitle: 'Atur ulang pencarian',
        backButtonTitle: 'Tutup pencarian',
        noResultsText: 'Tidak ada hasil',
        footer: {
          selectText: 'Pilih',
          selectKeyAriaLabel: 'enter',
          navigateText: 'Navigasi',
          navigateUpKeyAriaLabel: 'panah atas',
          navigateDownKeyAriaLabel: 'panah bawah',
          closeText: 'Tutup',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
}

export const localeDefinitions = Object.entries(localeMessages).map(([key, messages]) => ({
  key,
  routePrefix: key === 'root' ? '/' : `/${key}/`,
  ...messages,
}))

export const localeByKey = Object.fromEntries(localeDefinitions.map(locale => [locale.key, locale]))
export const generatedLocaleKeys = localeDefinitions.filter(locale => locale.key !== 'root').map(locale => locale.key)

function isExternalUrl(value) {
  return /^(?:[a-z]+:)?\/\//i.test(value)
}

export function localizeRoute(localeKey, route) {
  if (!route || isExternalUrl(route) || route.startsWith('#')) {
    return route
  }

  if (!route.startsWith('/')) {
    return route
  }

  if (localeKey === 'root') {
    return route
  }

  if (route === '/') {
    return `/${localeKey}/`
  }

  return `/${localeKey}${route}`
}

export function localizeApiReferenceLink(localeKey, linkHref) {
  if (!linkHref || isExternalUrl(linkHref)) {
    return linkHref
  }

  return localizeRoute(localeKey, linkHref)
}

function getPageText(localeKey, pageKey) {
  return localeByKey[localeKey].pages[pageKey]
}

function getSectionText(localeKey, sectionKey) {
  return localeByKey[localeKey].sections[sectionKey]
}

export function buildGuideSidebar(localeKey) {
  return guideSidebarSpec.map(section => {
    const items = section.items.map(item => ({
      text: getPageText(localeKey, item.page),
      link: localizeRoute(localeKey, item.link),
    }))

    if (!section.section) {
      return { items }
    }

    return {
      text: getSectionText(localeKey, section.section),
      items,
    }
  })
}

export function localizeReferenceGroup(localeKey, text) {
  const normalizedKey = text.replace(/\s+/g, '')
  return localeByKey[localeKey].referenceGroups[normalizedKey] ?? text
}

export function localizeTypedocSidebar(items, localeKey) {
  return items.map(item => {
    const localizedItem = {
      ...item,
      text: localizeReferenceGroup(localeKey, item.text),
    }

    if (typeof item.link === 'string') {
      localizedItem.link = localizeRoute(localeKey, item.link)
    }

    if (Array.isArray(item.items)) {
      localizedItem.items = localizeTypedocSidebar(item.items, localeKey)
    }

    return localizedItem
  })
}

export function buildThemeConfig(localeKey, guideSidebar, typedocSidebar, apiReferenceLink, socialLinks, logo, editLinkPattern) {
  const locale = localeByKey[localeKey]

  return {
    logo,
    footer: locale.footer,
    outline: {
      label: locale.theme.outlineLabel,
    },
    lastUpdated: {
      text: locale.theme.lastUpdatedText,
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
        forceLocale: true,
      },
    },
    editLink: {
      pattern: editLinkPattern,
      text: locale.theme.editLinkText,
    },
    docFooter: {
      prev: locale.theme.docFooterPrev,
      next: locale.theme.docFooterNext,
    },
    darkModeSwitchLabel: locale.theme.darkModeSwitchLabel,
    lightModeSwitchTitle: locale.theme.lightModeSwitchTitle,
    darkModeSwitchTitle: locale.theme.darkModeSwitchTitle,
    sidebarMenuLabel: locale.theme.sidebarMenuLabel,
    returnToTopLabel: locale.theme.returnToTopLabel,
    langMenuLabel: locale.theme.langMenuLabel,
    skipToContentLabel: locale.theme.skipToContentLabel,
    notFound: locale.theme.notFound,
    nav: [
      {
        text: locale.nav.home,
        link: localizeRoute(localeKey, '/'),
      },
      {
        text: locale.nav.guides,
        link: localizeRoute(localeKey, '/introduction'),
      },
      {
        text: locale.nav.apiReference,
        link: localizeApiReferenceLink(localeKey, apiReferenceLink),
        noIcon: true,
        target: '_self',
      },
      {
        text: locale.nav.playground,
        link: 'https://github.com/tsoa-next/playground',
      },
    ],
    socialLinks,
    sidebar: {
      [localizeRoute(localeKey, '/reference/')]: typedocSidebar,
      [locale.routePrefix]: guideSidebar,
    },
  }
}

export function getLocaleSearchTranslations(localeKey) {
  return localeByKey[localeKey].search
}

export function getSearchLocaleOptions() {
  return Object.fromEntries(
    generatedLocaleKeys.map(localeKey => [
      localeKey,
      {
        translations: getLocaleSearchTranslations(localeKey),
      },
    ]),
  )
}

export function parseLocaleRelativePath(relativePath) {
  const normalizedPath = relativePath.replace(/\\/g, '/')

  for (const localeKey of generatedLocaleKeys) {
    if (normalizedPath === `${localeKey}/index.md`) {
      return {
        localeKey,
        baseRelativePath: 'index.md',
      }
    }

    if (normalizedPath.startsWith(`${localeKey}/`)) {
      return {
        localeKey,
        baseRelativePath: normalizedPath.slice(localeKey.length + 1),
      }
    }
  }

  return {
    localeKey: 'root',
    baseRelativePath: normalizedPath,
  }
}

export function buildLocaleRelativePath(localeKey, baseRelativePath) {
  if (localeKey === 'root') {
    return baseRelativePath
  }

  return `${localeKey}/${baseRelativePath}`
}
