import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';



const organizationName = "fino-dev"
const projectName = "fino-docs"
const branch = "main"
const repoUrl = `https://github.com/${organizationName}/${projectName}`
const organizationUrl = `https://github.com/${organizationName}`

const config: Config = {
  title: 'fino',
  tagline: 'Financial data analysis tools',
  favicon: 'img/favicon.ico',
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },
  url: 'https://your-docusaurus-site.example.com', // TODO: production url of your site here
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: organizationName,
  projectName: projectName,
  onBrokenLinks: 'throw',
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      'ja',
    ],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `${repoUrl}/edit/${branch}/`,
          include: ['**/*.{md,mdx}', '**/_*.{md,mdx}'],
          exclude: [
              '**/*.test.{js,jsx,ts,tsx}',
              '**/__tests__/**'
          ]
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: `${repoUrl}/edit/${branch}/blog`,
          include: ['**/*.{md,mdx}', '**/_*.{md,mdx}'],
          exclude: [
              '**/*.test.{js,jsx,ts,tsx}',
              '**/__tests__/**'
          ],
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo-fino.jpg',
    metadata: [{ name: 'twitter:card', content: 'summary' }],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true
  },
    navbar: {

      logo: {
        alt: 'Fino Logo',
        src: 'img/logo-fino.svg',
        srcDark: 'img/logo-fino.svg',
        className: 'fino-navbar-logo-class',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started',
          position: 'left',
          label: 'Getting Started',
        },
        {
          type: 'doc',
          docId: "docs",
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: "contribute",
          position: 'left',
          label: 'Contribute',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: organizationUrl,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Docs',
              to: '/docs',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github',
              href: organizationUrl,
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Contribute',
              to: '/docs/contribute',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fino, with akidoki.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap'
  ],
  scripts: [
      'https://unpkg.com/mermaid@8.5.1/dist/mermaid.min.js',
      'https://buttons.github.io/buttons.js',
      '/js/ribbons.js',
      '/js/flowchart.js'
  ]
};

export default config;
