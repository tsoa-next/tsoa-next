import { existsSync, readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'

import {
  buildGuideSidebar,
  buildLocaleRelativePath,
  buildThemeConfig,
  getLocaleSearchTranslations,
  getSearchLocaleOptions,
  localeByKey,
  localeDefinitions,
  localizeRoute,
  localizeTypedocSidebar,
  parseLocaleRelativePath,
} from './i18n.mjs'

const siteName = 'tsoa-next'
const siteDescription = 'Build OpenAPI-compliant REST APIs with TypeScript and Node.js using tsoa-next, with generated routes, schemas, and runtime validation.'
const defaultSiteUrl = 'https://tsoa-next.dev'
const siteUrl = stripTrailingSlash(process.env.SITE_URL || defaultSiteUrl)
const siteHomeUrl = new URL('/', siteUrl).toString()
const repositoryUrl = 'https://github.com/tsoa-next/tsoa-next'
const docsEditBranch = process.env.DOCS_EDIT_BRANCH || 'main'
const docsEditLinkPattern = `${repositoryUrl}/edit/${docsEditBranch}/site/guide-docs/:path`
const playgroundUrl = 'https://github.com/tsoa-next/playground'
const npmPackageUrl = 'https://www.npmjs.com/package/tsoa-next'
const githubIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fill="currentColor" d="M8 1.3a6.665 6.665 0 0 1 5.413 10.56 6.677 6.677 0 0 1-3.288 2.432c-.333.067-.458-.142-.458-.316 0-.226.008-.942.008-1.834 0-.625-.208-1.025-.45-1.233 1.483-.167 3.042-.734 3.042-3.292a2.58 2.58 0 0 0-.684-1.792c.067-.166.3-.85-.066-1.766 0 0-.559-.184-1.834.683a6.186 6.186 0 0 0-1.666-.225c-.567 0-1.134.075-1.667.225-1.275-.858-1.833-.683-1.833-.683-.367.916-.134 1.6-.067 1.766a2.594 2.594 0 0 0-.683 1.792c0 2.55 1.55 3.125 3.033 3.292-.192.166-.367.458-.425.891-.383.175-1.342.459-1.942-.55-.125-.2-.5-.691-1.025-.683-.558.008-.225.317.009.442.283.158.608.75.683.941.133.376.567 1.092 2.242.784 0 .558.008 1.083.008 1.242 0 .174-.125.374-.458.316a6.662 6.662 0 0 1-4.559-6.325A6.665 6.665 0 0 1 8 1.3Z"/>
  </svg>
`.trim()
const npmIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="none" fill-rule="evenodd">
      <rect width="24" height="24" fill="#D40001"/>
      <path fill="#FFF" d="M16.7179487,7.92840493 L12.2051282,7.92840493 L12.2051282,20.2494172 L4,20.2494172 L4,3 L12.2051282,3 L20,3 L20,7.92840493 L20,20.2494172 L16.7179487,20.2494172 L16.7179487,7.92840493 Z"/>
    </g>
  </svg>
`.trim()
const socialImageUrl = new URL('/tsoa-next-social.png', siteHomeUrl).toString()
const logoUrl = new URL('/tsoa-next-logo-590.png', siteHomeUrl).toString()
const siteOrigin = new URL(siteHomeUrl).origin
const apiReferenceTarget = resolveReferenceTarget(process.env.API_REFERENCE_URL || '/reference/')
const apiReferenceBaseUrl = apiReferenceTarget.baseUrl
const apiReferenceLink = apiReferenceTarget.linkHref
const hasExternalApiReference = /^https?:\/\//i.test(apiReferenceLink)
const typedocSidebarPath = join(process.cwd(), 'site/guide-docs/reference/typedoc-sidebar.json')
const referenceLinkPattern = /^(?:\.{1,2}\/|\/)?reference\/(.*)$/
const pageDescriptionCache = new Map<string, string>()
const pageDescriptions: Record<string, string> = {
  'annotations.md': 'Use JSON Schema and tsoa keyword annotations to express constraints that TypeScript alone cannot capture in generated OpenAPI schemas.',
  'authentication.md': 'Configure authentication and security definitions in tsoa-next so generated OpenAPI output and runtime middleware stay in sync.',
  'custom-middlewares.md': 'Apply custom Express, Koa, or Hapi middleware to tsoa-next endpoints with the @Middlewares decorator and understand request flow.',
  'custom-validation.md': 'Extend tsoa-next runtime validation with class-validator and custom middleware when the built-in validator is not enough.',
  'decorators.md': 'Review the core tsoa-next decorators for security, tags, operation metadata, request handling, and OpenAPI customization.',
  'descriptions.md': 'Use JSDoc descriptions in tsoa-next to improve generated OpenAPI docs for endpoints, parameters, models, and schema properties.',
  'di.md': 'Configure dependency injection for tsoa-next controllers with an IoC module and integrate common DI containers into route generation.',
  'error-handling.md': 'Handle validation and server errors in a tsoa-next Express app with consistent responses and typed OpenAPI error documentation.',
  'examples.md': 'Add practical examples to your tsoa-next OpenAPI output with JSDoc metadata and see where full runnable example apps live.',
  'external-validators.md': 'Use the @Validate decorator with zod, joi, yup, superstruct, and io-ts while keeping TypeScript-based OpenAPI generation.',
  'faq.md': 'Find quick answers about OpenAPI versions, supported frameworks, additional properties, duplicate models, and other common tsoa-next questions.',
  'file-upload.md': 'Handle multipart file uploads in tsoa-next with UploadedFile, UploadedFiles, and FormField decorators in Express and other runtimes.',
  'generating.md': 'Generate OpenAPI specs and route files with tsoa-next from the CLI or programmatically, including discovery and configuration options.',
  'getting-started.md': 'Set up a new tsoa-next project with Express, TypeScript, generated routes, and OpenAPI output in a minimal getting started workflow.',
  'index.md': 'tsoa-next helps you build OpenAPI-compliant REST APIs with TypeScript and Node.js from one source of truth, with generated routes, specs, and validation.',
  'introduction.md': 'Learn what tsoa-next is, how it continues tsoa, and why TypeScript types, generated OpenAPI specs, and runtime validation stay aligned.',
  'live-reloading.md': 'Add live reloading to a tsoa-next development setup with nodemon, ts-node, and automatic spec and route regeneration.',
  'path-mapping.md': 'Use TypeScript path mapping with tsoa-next by reading tsconfig paths or overriding compiler options in your tsoa configuration.',
  'routes.md': 'Learn how tsoa-next discovers controllers and generates routes, whether you prefer glob-based discovery or explicit controller imports.',
  'templates.md': 'Override the default route template when you need framework-specific behavior or advanced custom route generation in tsoa-next.',
  'upgrading.md': 'Review the key features, fixes, and breaking changes when upgrading from historical tsoa releases to newer behavior.',
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, '')
}

function normalizeBasePath(value: string) {
  const trimmed = value.trim()
  if (trimmed === '' || trimmed === '/') {
    return '/'
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`
}

function resolveReferenceTarget(value: string) {
  const trimmed = value.trim()

  if (/^https?:\/\//i.test(trimmed)) {
    const parsedUrl = new URL(trimmed)
    const basePath = normalizeBasePath(parsedUrl.pathname)
    const baseUrl = new URL(basePath, `${parsedUrl.origin}/`).toString()

    return {
      basePath,
      baseUrl,
      linkHref: baseUrl,
    }
  }

  const basePath = normalizeBasePath(trimmed)

  return {
    basePath,
    baseUrl: new URL(basePath, siteHomeUrl).toString(),
    linkHref: basePath,
  }
}

function rewriteReferenceLink(href: string) {
  if (!hasExternalApiReference) {
    return
  }

  const match = href.match(referenceLinkPattern)
  if (!match) {
    return
  }

  const rewrittenUrl = new URL(match[1], apiReferenceBaseUrl)

  if (rewrittenUrl.origin === siteOrigin) {
    return `${rewrittenUrl.pathname}${rewrittenUrl.search}${rewrittenUrl.hash}`
  }

  return rewrittenUrl.toString()
}

function getTypedocSidebar(): DefaultTheme.SidebarItem[] {
  if (!existsSync(typedocSidebarPath)) {
    return []
  }

  try {
    return JSON.parse(readFileSync(typedocSidebarPath, 'utf8')) as DefaultTheme.SidebarItem[]
  } catch {
    return []
  }
}

const logo = {
  src: '/tsoa-next-logo-590.png',
  alt: 'tsoa-next logo',
}

const socialLinks = [
  { icon: { svg: githubIconSvg }, link: repositoryUrl, ariaLabel: 'GitHub' },
  { icon: { svg: npmIconSvg }, link: npmPackageUrl, ariaLabel: 'npm' },
]

const typedocSidebar = getTypedocSidebar()
const generatedLocalePrefixes = localeDefinitions.filter(locale => locale.key !== 'root').map(locale => `${locale.key}/`)
const llmsIgnorePatterns = ['reference/**', ...localeDefinitions.filter(locale => locale.key !== 'root').map(locale => `${locale.key}/**`)]
const localeThemeConfigs = Object.fromEntries(
  localeDefinitions.map(locale => {
    const guideSidebar = buildGuideSidebar(locale.key)
    const localizedTypedocSidebar = localizeTypedocSidebar(typedocSidebar, locale.key)

    return [locale.key, buildThemeConfig(locale.key, guideSidebar, localizedTypedocSidebar, apiReferenceLink, socialLinks, logo, docsEditLinkPattern)]
  }),
)

const docsLocales = Object.fromEntries(
  localeDefinitions.map(locale => [
    locale.key,
    {
      label: locale.label,
      lang: locale.lang,
      dir: locale.dir,
      title: siteName,
      description: siteDescription,
      link: locale.routePrefix,
      themeConfig: localeThemeConfigs[locale.key],
    },
  ]),
)

function normalizePagePath(relativePath: string) {
  if (!relativePath) {
    return '/'
  }

  const path = relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')

  if (path === '') {
    return '/'
  }

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

    if (paragraph.length < 60 || paragraph.startsWith('What we will talk about') || paragraph.startsWith('Jump to the breaking changes')) {
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

    if (line === '' || line === '[[toc]]' || line.startsWith('#') || line.startsWith(':::') || line.startsWith('![') || line.startsWith('>') || /^[*-]\s/.test(line)) {
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
  const { baseRelativePath } = parseLocaleRelativePath(relativePath)

  if (baseRelativePath === 'index.md') {
    return 'CollectionPage'
  }

  return 'TechArticle'
}

function createStructuredData(relativePath: string, title: string, description: string) {
  const { localeKey, baseRelativePath } = parseLocaleRelativePath(relativePath)
  const locale = localeByKey[localeKey]
  const canonicalUrl = getCanonicalUrl(relativePath)
  const localeHomeUrl = new URL(localizeRoute(localeKey, '/'), siteHomeUrl).toString()
  const websiteId = `${localeHomeUrl}#website`
  const isHomePage = baseRelativePath === 'index.md'

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
      '@id': websiteId,
      name: siteName,
      url: localeHomeUrl,
      description: siteDescription,
      publisher: {
        '@id': `${siteHomeUrl}#organization`,
      },
      inLanguage: locale.lang,
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
        '@id': websiteId,
      },
      about: {
        '@id': `${siteHomeUrl}#software`,
      },
      image: socialImageUrl,
      inLanguage: locale.lang,
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
          name: locale.breadcrumbHome,
          item: localeHomeUrl,
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

export default defineConfig({
  title: siteName,
  description: siteDescription,
  base: process.env.BASE_URL || '/',
  lastUpdated: true,
  locales: docsLocales,
  ignoreDeadLinks: [/reference\//],
  markdown: {
    config(md) {
      groupIconMdPlugin(md)

      const defaultLinkOpen = md.renderer.rules.link_open ?? ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

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
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'application-name', content: siteName }],
    ['meta', { name: 'theme-color', content: '#0f1342' }],
  ],
  vite: {
    plugins: [
      llmstxt({
        domain: siteUrl,
        sidebar: { '/': buildGuideSidebar('root') },
        ignoreFilesPerOutput: {
          llmsTxt: llmsIgnorePatterns,
          llmsFullTxt: llmsIgnorePatterns,
          pages: llmsIgnorePatterns,
        },
      }),
      groupIconVitePlugin(),
      GitChangelog({
        repoURL: repositoryUrl,
        include: ['site/guide-docs/*.md', '!node_modules'],
      }),
      GitChangelogMarkdownSection({
        exclude: (id, { helpers }) => helpers.idEquals('index.md') || helpers.idStartsWith('reference/') || generatedLocalePrefixes.some(prefix => id.startsWith(prefix)),
      }),
    ],
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

    const { localeKey, baseRelativePath } = parseLocaleRelativePath(pageData.relativePath)
    const description =
      (localeKey === 'root' ? pageDescriptions[baseRelativePath] : undefined) ?? (await getPageDescription(pageData.relativePath, pageData.filePath, ctx.siteConfig.srcDir)) ?? siteDescription

    return {
      description,
    }
  },
  transformHead({ pageData }) {
    const isNotFound = Boolean(pageData.isNotFound)
    const { localeKey, baseRelativePath } = parseLocaleRelativePath(pageData.relativePath)
    const locale = localeByKey[localeKey]
    const isHomePage = baseRelativePath === 'index.md'
    const canonicalUrl = getCanonicalUrl(pageData.relativePath)
    const pageTitle = isHomePage ? siteName : `${pageData.title} | ${siteName}`
    const description = pageData.description || siteDescription
    const jsonLd = createStructuredData(pageData.relativePath, pageTitle, description)

    const head = [
      ['meta', { name: 'robots', content: isNotFound ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' }],
      ['meta', { name: 'googlebot', content: isNotFound ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' }],
      ['meta', { property: 'og:site_name', content: siteName }],
      ['meta', { property: 'og:locale', content: locale.ogLocale }],
      ['meta', { property: 'og:type', content: isHomePage ? 'website' : 'article' }],
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

      for (const alternateLocale of localeDefinitions) {
        const alternatePath = buildLocaleRelativePath(alternateLocale.key, baseRelativePath)
        const alternateUrl = getCanonicalUrl(alternatePath)

        head.unshift([
          'link',
          {
            rel: 'alternate',
            hreflang: alternateLocale.lang,
            href: alternateUrl,
          },
        ])
      }

      head.unshift([
        'link',
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: getCanonicalUrl(baseRelativePath),
        },
      ])
    }

    return head
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        translations: getLocaleSearchTranslations('root'),
        locales: getSearchLocaleOptions(),
      },
    },
  },
})
