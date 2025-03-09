---
title: Configuration
description: Learn how to configure CometDocs for your project
date: 2023-07-16
author: CometDocs Team
---

## Configuration

CometDocs is designed to work with minimal configuration, but it offers many options to customize its behavior to suit your needs.

## Configuration File

The easiest way to configure CometDocs is to create a `cometdocs.config.js` file at the root of your project:

```js
// cometdocs.config.js
module.exports = {
  content: {
    dir: './docs',
    defaultLocale: 'en',
  },
  theme: {
    colors: {
      primary: '#3490dc',
      secondary: '#718096',
      accent: '#f6ad55',
    },
    layout: 'sidebar',
    darkMode: 'system',
  },
  navigation: {
    auto: true,
    items: [
      {
        title: 'Getting Started',
        path: '/docs/getting-started',
      },
      // Add more navigation items here
    ],
  },
  advanced: {
    basePath: '/docs',
    search: {
      enabled: true,
      type: 'local',
    },
    codeHighlighting: true,
  },
};
```

## Configuration Options

### Content Configuration

The `content` section configures where your documentation files are located and the default locale:

```js
content: {
  // The directory where your documentation files are located
  dir: './docs',
  
  // The default locale to use when no locale is specified
  defaultLocale: 'en',
}
```

### Theme Configuration

The `theme` section allows you to customize the appearance of your documentation site:

```js
theme: {
  // Whether to inherit the theme from your Next.js app
  inherit: true,
  
  // Custom colors
  colors: {
    primary: '#3490dc',
    secondary: '#718096',
    accent: '#f6ad55',
  },
  
  // Layout type: 'sidebar', 'full', or 'minimal'
  layout: 'sidebar',
  
  // Dark mode: 'system', 'dark', 'light', or 'toggle'
  darkMode: 'system',
}
```

### Navigation Configuration

The `navigation` section configures the navigation menu:

```js
navigation: {
  // Whether to automatically generate navigation from your documentation files
  auto: true,
  
  // Custom navigation items
  items: [
    {
      title: 'Getting Started',
      path: '/docs/getting-started',
    },
    {
      title: 'Guides',
      path: '/docs/guides',
      children: [
        {
          title: 'Installation',
          path: '/docs/guides/installation',
        },
        {
          title: 'Configuration',
          path: '/docs/guides/configuration',
        },
      ],
    },
  ],
}
```

### Advanced Configuration

The `advanced` section provides additional configuration options:

```js
advanced: {
  // The base path for your documentation
  basePath: '/docs',
  
  // Search configuration
  search: {
    // Whether to enable search
    enabled: true,
    
    // Search type: 'local' or 'algolia'
    type: 'local',
    
    // Algolia configuration (only used if type is 'algolia')
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
    },
  },
  
  // Whether to enable code highlighting
  codeHighlighting: true,
}
```

## Inline Configuration

You can also configure CometDocs directly in your component:

```tsx
import { CometDocs, CometDocsConfig } from 'cometdocs';

const config: CometDocsConfig = {
  // Your configuration here
};

export default function DocsPage({ slug }) {
  return <CometDocs slug={slug} config={config} />;
}
```

This is useful if you want to have different configurations for different parts of your documentation.

## Custom Components

You can customize the components used by CometDocs by passing them in the `components` prop:

```tsx
import { CometDocs } from 'cometdocs';
import CustomLayout from '../components/CustomLayout';

export default function DocsPage({ slug }) {
  return (
    <CometDocs
      slug={slug}
      components={{
        Layout: CustomLayout,
      }}
    />
  );
}
```

This allows you to completely customize the appearance and behavior of your documentation site. 