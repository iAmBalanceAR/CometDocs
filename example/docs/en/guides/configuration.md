---
title: Configuration
synopsis: Learn how to configure CometDocs for your project
date: 2024-03-10
author: CometDocs Team
position: 3
---

CometDocs is designed to work with minimal configuration, but offers extensive customization options to match your needs. This guide covers all available configuration options and best practices.

## Configuration File

Create a `cometdocs.config.js` file in your project root:

```js
// cometdocs.config.js
/** @type {import('cometdocs').Config} */
module.exports = {
  project: {
    name: 'Your Project',
    description: 'Project description',
    url: 'https://docs.yourproject.com',
    // Optional: GitHub repository information
    github: {
      repo: 'username/repo',
      branch: 'main',
      editUrl: true, // Enable "Edit this page" links
    },
  },

  content: {
    dir: './docs',
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
    // Optional: Configure markdown parsing
    markdown: {
      remarkPlugins: [],
      rehypePlugins: [],
      // Enable GitHub Flavored Markdown
      gfm: true,
    },
  },

  theme: {
    // Use your app's existing theme
    inherit: true,
    // Or specify custom colors
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ... other shades
        900: '#0c4a6e',
      },
      // ... other color scales
    },
    // Dark mode configuration
    darkMode: 'system', // 'system' | 'dark' | 'light' | 'toggle'
    // Layout configuration
    layout: {
      // Navigation width
      sidebarWidth: 280,
      // Maximum content width
      maxWidth: 1200,
      // Header height
      headerHeight: 64,
    },
  },

  navigation: {
    // Auto-generate navigation from file structure
    auto: true,
    // Or specify custom navigation
    items: [
      {
        title: 'Getting Started',
        items: [
          {
            title: 'Introduction',
            href: '/docs',
          },
          {
            title: 'Installation',
            href: '/docs/installation',
          },
        ],
      },
      // ... more sections
    ],
  },

  search: {
    enabled: true,
    type: 'local', // 'local' | 'algolia'
    // Algolia configuration (if type is 'algolia')
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
    },
    // Local search configuration
    local: {
      // Index configuration
      indexing: {
        // Exclude patterns
        exclude: ['**/private/**'],
        // Include patterns
        include: ['**/*.md', '**/*.mdx'],
      },
    },
  },

  seo: {
    // Default meta tags
    defaultTitle: 'Your Documentation',
    titleTemplate: '%s - Your Project',
    description: 'Your project documentation',
    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://docs.yourproject.com',
      siteName: 'Your Project Docs',
    },
    // Twitter
    twitter: {
      handle: '@yourhandle',
      site: '@yoursite',
      cardType: 'summary_large_image',
    },
  },

  analytics: {
    // Google Analytics
    ga: {
      measurementId: 'G-XXXXXXXXXX',
    },
    // Or custom analytics
    custom: (event) => {
      // Your custom analytics code
    },
  },
};
```

## Configuration Options Explained

### Project Configuration

The `project` section defines basic information about your documentation site:

```js
project: {
  name: 'Your Project',
  description: 'Project description',
  url: 'https://docs.yourproject.com',
  github: {
    repo: 'username/repo',
    branch: 'main',
    editUrl: true,
  },
}
```

- `name`: Project name displayed in the header
- `description`: Used in meta tags and SEO
- `url`: Production URL of your documentation
- `github`: Configuration for GitHub integration

### Content Configuration

The `content` section controls how your documentation is processed:

```js
content: {
  dir: './docs',
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    gfm: true,
  },
}
```

- `dir`: Root directory for documentation files
- `defaultLocale`: Default language
- `locales`: Supported languages
- `markdown`: Markdown processing options

### Theme Configuration

The `theme` section controls the appearance:

```js
theme: {
  inherit: true,
  colors: {
    primary: {
      50: '#f0f9ff',
      // ... other shades
    },
  },
  darkMode: 'system',
  layout: {
    sidebarWidth: 280,
    maxWidth: 1200,
    headerHeight: 64,
  },
}
```

- `inherit`: Use your app's existing theme
- `colors`: Custom color palette
- `darkMode`: Dark mode behavior
- `layout`: Layout dimensions

### Navigation Configuration

The `navigation` section controls the sidebar navigation:

```js
navigation: {
  auto: true,
  items: [
    {
      title: 'Section',
      items: [
        {
          title: 'Page',
          href: '/path',
        },
      ],
    },
  ],
}
```

- `auto`: Auto-generate from file structure
- `items`: Manual navigation structure

### Search Configuration

The `search` section configures search functionality:

```js
search: {
  enabled: true,
  type: 'local',
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'YOUR_INDEX_NAME',
  },
  local: {
    indexing: {
      exclude: ['**/private/**'],
      include: ['**/*.md', '**/*.mdx'],
    },
  },
}
```

- `type`: Search provider ('local' or 'algolia')
- `algolia`: Algolia search configuration
- `local`: Local search configuration

### SEO Configuration

The `seo` section controls meta tags and SEO:

```js
seo: {
  defaultTitle: 'Your Documentation',
  titleTemplate: '%s - Your Project',
  description: 'Your project documentation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.yourproject.com',
    siteName: 'Your Project Docs',
  },
  twitter: {
    handle: '@yourhandle',
    site: '@yoursite',
    cardType: 'summary_large_image',
  },
}
```

### Analytics Configuration

The `analytics` section configures analytics:

```js
analytics: {
  ga: {
    measurementId: 'G-XXXXXXXXXX',
  },
  custom: (event) => {
    // Custom analytics code
  },
}
```

## Environment Variables

Some configuration can be set via environment variables:

```env
# .env.local
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_search_api_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

## TypeScript Support

For TypeScript users, you can import the configuration type:

```ts
// cometdocs.config.ts
import { defineConfig } from 'cometdocs';

export default defineConfig({
  // Your configuration here
});
```

## Best Practices

1. **Version Control**:
   - Commit `cometdocs.config.js` to version control
   - Use `.env.local` for sensitive values

2. **Performance**:
   - Enable auto-navigation for small sites
   - Use manual navigation for large sites
   - Configure search indexing patterns

3. **SEO**:
   - Set comprehensive meta tags
   - Configure OpenGraph and Twitter cards
   - Use descriptive titles and descriptions

4. **Analytics**:
   - Start with Google Analytics
   - Add custom analytics as needed
   - Track important user interactions

## Next Steps

- [Writing Guide](/docs/guides/writing) - Learn how to write effective documentation
- [Deployment](/docs/guides/deployment) - Deploy your documentation site
- [Advanced Features](/docs/guides/advanced) - Explore advanced features 