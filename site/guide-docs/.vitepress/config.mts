import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

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
  markdown: {},
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      {
        text: 'Home',
        link: process.env.SITE_ROOT || '../',
      },
      {
        text: 'Guides',
        link: '/introduction',
      },
      {
        text: 'API Reference',
        link: process.env.API_REFERENCE_URL || '../reference/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/VannaDii/tsoa-next',
      },
    ],
    sidebar,
  },
})
