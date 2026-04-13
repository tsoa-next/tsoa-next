import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const siteName = 'tsoa-next'
const siteDescription =
  'Build OpenAPI-compliant REST APIs with TypeScript and Node.js using tsoa-next, with generated routes, schemas, and runtime validation.'
const defaultSiteUrl = 'https://tsoa-next.dev'
const siteUrl = stripTrailingSlash(process.env.SITE_URL || defaultSiteUrl)
const siteHomeUrl = new URL('/', siteUrl).toString()
const repositoryUrl = 'https://github.com/tsoa-next/tsoa-next'
const playgroundUrl = 'https://github.com/tsoa-next/playground'
const npmPackageUrl = 'https://www.npmjs.com/package/tsoa-next'
const socialImageUrl = new URL('/tsoa-next-social.png', siteHomeUrl).toString()
const logoUrl = new URL('/tsoa-next-logo-590.png', siteHomeUrl).toString()
const apiReferenceUrl = new URL(process.env.API_REFERENCE_URL || '/reference/', siteHomeUrl).toString()
const referenceLinkPattern = /^(?:\.\.\/|\/)?reference\/(.*)$/
const pageDescriptionCache = new Map<string, string>()
const pageDescriptions: Record<string, string> = {
  'annotations.md':
    'Use JSON Schema and tsoa keyword annotations to express constraints that TypeScript alone cannot capture in generated OpenAPI schemas.',
  'authentication.md':
    'Configure authentication and security definitions in tsoa-next so generated OpenAPI output and runtime middleware stay in sync.',
  'custom-middlewares.md':
    'Apply custom Express, Koa, or Hapi middleware to tsoa-next endpoints with the @Middlewares decorator and understand request flow.',
  'custom-validation.md':
    'Extend tsoa-next runtime validation with class-validator and custom middleware when the built-in validator is not enough.',
  'decorators.md':
    'Review the core tsoa-next decorators for security, tags, operation metadata, request handling, and OpenAPI customization.',
  'descriptions.md':
    'Use JSDoc descriptions in tsoa-next to improve generated OpenAPI docs for endpoints, parameters, models, and schema properties.',
  'di.md':
    'Configure dependency injection for tsoa-next controllers with an IoC module and integrate common DI containers into route generation.',
  'error-handling.md':
    'Handle validation and server errors in a tsoa-next Express app with consistent responses and typed OpenAPI error documentation.',
  'examples.md':
    'Add practical examples to your tsoa-next OpenAPI output with JSDoc metadata and see where full runnable example apps live.',
  'external-validators.md':
    'Use the @Validate decorator with zod, joi, yup, superstruct, and io-ts while keeping TypeScript-based OpenAPI generation.',
  'faq.md':
    'Find quick answers about OpenAPI versions, supported frameworks, additional properties, duplicate models, and other common tsoa-next questions.',
  'file-upload.md':
    'Handle multipart file uploads in tsoa-next with UploadedFile, UploadedFiles, and FormField decorators in Express and other runtimes.',
  'generating.md':
    'Generate OpenAPI specs and route files with tsoa-next from the CLI or programmatically, including discovery and configuration options.',
  'getting-started.md':
    'Set up a new tsoa-next project with Express, TypeScript, generated routes, and OpenAPI output in a minimal getting started workflow.',
  'index.md':
    'tsoa-next helps you build OpenAPI-compliant REST APIs with TypeScript and Node.js from one source of truth, with generated routes, specs, and validation.',
  'introduction.md':
    'Learn what tsoa-next is, how it continues tsoa, and why TypeScript types, generated OpenAPI specs, and runtime validation stay aligned.',
  'live-reloading.md':
    'Add live reloading to a tsoa-next development setup with nodemon, ts-node, and automatic spec and route regeneration.',
  'path-mapping.md':
    'Use TypeScript path mapping with tsoa-next by reading tsconfig paths or overriding compiler options in your tsoa configuration.',
  'routes.md':
    'Learn how tsoa-next discovers controllers and generates routes, whether you prefer glob-based discovery or explicit controller imports.',
  'templates.md':
    'Override the default route template when you need framework-specific behavior or advanced custom route generation in tsoa-next.',
  'upgrading.md':
    'Review the key features, fixes, and breaking changes when upgrading from historical tsoa releases to newer behavior.',
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, '')
}

function rewriteReferenceLink(href: string) {
  const match = href.match(referenceLinkPattern)
  if (!match) {
    return
  }

  return new URL(match[1], apiReferenceUrl).toString()
}

function normalizePagePath(relativePath: string) {
  if (!relativePath) {
    return '/'
  }

  const path = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '.html')

  return path.startsWith('/') ? path : `/${path}`
}

function getCanonicalUrl(relativePath: string) {
  return new URL(normalizePagePath(relativePath), siteHomeUrl).toString()
}

function trimDescription(text: string, maxLength = 160) {
  const normalized = text.replace(/\s+/g, ' ').trim()

  if (normalized.length <= maxLength) {
    return normalized
  }

  const clipped = normalized.slice(0, maxLength + 1)
  const lastSpace = clipped.lastIndexOf(' ')
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}...`
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractMarkdownDescription(markdown: string) {
  const withoutFrontmatter = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '')
  const paragraphs: string[] = []
  const paragraphLines: string[] = []
  let inFence = false

  function flushParagraph() {
    if (paragraphLines.length === 0) {
      return
    }

    const paragraph = stripMarkdown(paragraphLines.join(' '))
    paragraphLines.length = 0

    if (
      paragraph.length < 60 ||
      paragraph.startsWith('What we will talk about') ||
      paragraph.startsWith('Jump to the breaking changes')
    ) {
      return
    }

    paragraphs.push(paragraph)
  }

  for (const rawLine of withoutFrontmatter.split('\n')) {
    const line = rawLine.trim()

    if (line.startsWith('```')) {
      inFence = !inFence
      flushParagraph()
      continue
    }

    if (inFence) {
      continue
    }

    if (
      line === '' ||
      line === '[[toc]]' ||
      line.startsWith('#') ||
      line.startsWith(':::') ||
      line.startsWith('![') ||
      line.startsWith('>') ||
      /^[*-]\s/.test(line)
    ) {
      flushParagraph()
      continue
    }

    paragraphLines.push(line)
  }

  flushParagraph()

  return paragraphs[0] ? trimDescription(paragraphs[0]) : undefined
}

async function getPageDescription(relativePath: string, filePath: string, srcDir: string) {
  if (pageDescriptions[relativePath]) {
    return pageDescriptions[relativePath]
  }

  if (!filePath) {
    return undefined
  }

  if (pageDescriptionCache.has(filePath)) {
    return pageDescriptionCache.get(filePath)
  }

  try {
    const markdown = await readFile(join(srcDir, filePath), 'utf8')
    const description = extractMarkdownDescription(markdown)
    if (description) {
      pageDescriptionCache.set(filePath, description)
    }
    return description
  } catch {
    return undefined
  }
}

function getPageSchemaType(relativePath: string) {
  if (relativePath === 'index.md') {
    return 'CollectionPage'
  }

  return 'TechArticle'
}

function createStructuredData(relativePath: string, title: string, description: string) {
  const canonicalUrl = getCanonicalUrl(relativePath)
  const isHomePage = relativePath === 'index.md'

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'Organization',
      '@id': `${siteHomeUrl}#organization`,
      name: siteName,
      url: siteHomeUrl,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
      sameAs: [repositoryUrl, playgroundUrl, npmPackageUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteHomeUrl}#website`,
      name: siteName,
      url: siteHomeUrl,
      description: siteDescription,
      publisher: {
        '@id': `${siteHomeUrl}#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${siteHomeUrl}#software`,
      name: siteName,
      url: siteHomeUrl,
      description: siteDescription,
      codeRepository: repositoryUrl,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'Node.js',
      license: 'https://opensource.org/license/mit',
      image: socialImageUrl,
      publisher: {
        '@id': `${siteHomeUrl}#organization`,
      },
    },
    {
      '@type': getPageSchemaType(relativePath),
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: {
        '@id': `${siteHomeUrl}#website`,
      },
      about: {
        '@id': `${siteHomeUrl}#software`,
      },
      image: socialImageUrl,
      inLanguage: 'en-US',
    },
  ]

  if (!isHomePage) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteHomeUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title.replace(` | ${siteName}`, ''),
          item: canonicalUrl,
        },
      ],
    })
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c')
}

const sidebar: DefaultTheme.Sidebar = [
  { items: [{ text: 'Introduction', link: '/introduction' }] },
  {
    text: 'Guides',
    items: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Generating', link: '/generating' },
      { text: 'Live reloading', link: '/live-reloading' },
      { text: 'Error handling', link: '/error-handling' },
      { text: 'Descriptions', link: '/descriptions' },
      { text: 'Examples', link: '/examples' },
      { text: 'Annotations', link: '/annotations' },
      { text: 'Custom Middlewares', link: '/custom-middlewares' },
      { text: 'Custom Validation', link: '/custom-validation' },
      { text: 'External Validators', link: '/external-validators' },
      { text: 'Dependency Injection', link: '/di' },
      { text: 'Authentication', link: '/authentication' },
      { text: 'Decorators', link: '/decorators' },
    ],
  },
  {
    items: [{ text: 'FAQ', link: '/faq' }],
  },
  {
    text: 'Advanced Guides',
    items: [
      { text: 'File upload', link: '/file-upload' },
      { text: 'Path mapping', link: '/path-mapping' },
      { text: 'Templates', link: '/templates' },
      { text: 'Routes', link: '/routes' },
      { text: 'Upgrading', link: '/upgrading' },
    ],
  },
]

export default defineConfig({
  title: siteName,
  description: siteDescription,
  base: process.env.BASE_URL || '/',
  ignoreDeadLinks: [/reference\//],
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'application-name', content: siteName }],
    ['meta', { name: 'theme-color', content: '#0f1342' }],
  ],
  markdown: {
    config(md) {
      const defaultLinkOpen =
        md.renderer.rules.link_open ??
        ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const hrefAttrIndex = tokens[idx].attrIndex('href')

        if (hrefAttrIndex >= 0) {
          const href = tokens[idx].attrs?.[hrefAttrIndex]?.[1]
          if (href) {
            const rewrittenHref = rewriteReferenceLink(href)
            if (rewrittenHref) {
              tokens[idx].attrs![hrefAttrIndex][1] = rewrittenHref
            }
          }
        }

        return defaultLinkOpen(tokens, idx, options, env, self)
      }
    },
  },
  sitemap: {
    hostname: siteHomeUrl,
    transformItems(items) {
      return items.filter(item => !item.url.endsWith('/404.html'))
    },
  },
  async transformPageData(pageData, ctx) {
    if (pageData.isNotFound) {
      return {
        description: 'The page you requested could not be found on the tsoa-next documentation site.',
      }
    }

    const description =
      pageDescriptions[pageData.relativePath] ??
      (await getPageDescription(pageData.relativePath, pageData.filePath, ctx.siteConfig.srcDir)) ??
      siteDescription

    return {
      description,
    }
  },
  transformHead({ pageData }) {
    const isNotFound = Boolean(pageData.isNotFound)
    const canonicalUrl = getCanonicalUrl(pageData.relativePath)
    const pageTitle = pageData.relativePath === 'index.md' ? siteName : `${pageData.title} | ${siteName}`
    const description = pageData.description || siteDescription
    const jsonLd = createStructuredData(pageData.relativePath, pageTitle, description)

    const head = [
      ['meta', { name: 'robots', content: isNotFound ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' }],
      ['meta', { name: 'googlebot', content: isNotFound ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' }],
      ['meta', { property: 'og:site_name', content: siteName }],
      ['meta', { property: 'og:locale', content: 'en_US' }],
      ['meta', { property: 'og:type', content: pageData.relativePath === 'index.md' ? 'website' : 'article' }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: socialImageUrl }],
      ['meta', { property: 'og:image:width', content: '1280' }],
      ['meta', { property: 'og:image:height', content: '640' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: socialImageUrl }],
      ['script', { type: 'application/ld+json' }, jsonLd],
    ] as [string, Record<string, string>, string?][]

    if (!isNotFound) {
      head.unshift(['link', { rel: 'canonical', href: canonicalUrl }])
    }

    return head
  },
  themeConfig: {
    logo: {
      src: '/tsoa-next-logo-590.png',
      alt: 'tsoa-next logo',
    },
    footer: {
      message: 'TypeScript-first OpenAPI generation, route generation, and runtime validation.',
      copyright: 'Released under the MIT License.',
    },
    search: {
      provider: 'local',
    },
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Guides',
        link: '/introduction',
      },
      {
        text: 'API Reference',
        link: apiReferenceUrl,
        noIcon: true,
        target: '_self',
      },
      {
        text: 'Playground',
        link: playgroundUrl,
      },
      {
        text: 'GitHub',
        link: repositoryUrl,
      },
    ],
    sidebar,
  },
})
