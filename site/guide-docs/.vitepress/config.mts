import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const defaultSiteUrl = 'https://tsoa-next.dev'
const siteUrl = process.env.SITE_URL || defaultSiteUrl
const apiReferenceUrl = new URL(process.env.API_REFERENCE_URL || '/reference/', siteUrl).toString()
const referenceLinkPattern = /^(?:\.\.\/|\/)?reference\/(.*)$/

function rewriteReferenceLink(href: string) {
  const match = href.match(referenceLinkPattern)
  if (!match) {
    return
  }

  return new URL(match[1], apiReferenceUrl).toString()
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
  title: 'tsoa-next',
  base: process.env.BASE_URL || '/',
  ignoreDeadLinks: [/reference\//],
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
  themeConfig: {
    logo: '/tsoa-next-logo-590.png',
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
        text: 'GitHub',
        link: 'https://github.com/tsoa-next/tsoa-next',
      },
    ],
    sidebar,
  },
})
