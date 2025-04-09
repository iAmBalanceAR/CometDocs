# CometDocs

A lightweight, zero-config documentation system for Next.js applications.

## Features

- 📝 **Markdown & MDX Support**: Write your documentation in Markdown or MDX
- 🔄 **Zero Config**: Works out of the box with sensible defaults
- 🎨 **Customizable**: Easily customize the appearance and behavior
- 🔍 **Search**: Built-in search functionality
- 🌙 **Dark Mode**: Support for light and dark modes
- 🧩 **Code Highlighting**: Syntax highlighting for code blocks
- 🌐 **Internationalization**: Support for multiple languages
- 📱 **Responsive**: Looks great on all devices

## Installation

```bash
npm install @iambalance/cometdocs
# or
yarn add @iambalance/cometdocs
# or
pnpm add @iambalance/cometdocs
```

## Setup

1. Create a `docs` directory in your project root:
```bash
mkdir -p docs/en
```

2. Add the required dependencies to your Next.js project:
```bash
# If you haven't already installed these
pnpm add next@latest react@latest react-dom@latest
```

3. Create your first documentation file:
```bash
# Create a getting started page
echo "---
title: Getting Started
---

# Getting Started

Welcome to your documentation!" > docs/en/getting-started.md
```

4. Create a page to display your documentation:
```tsx
// app/docs/[...slug]/page.tsx
import { CometDocs } from '@iambalance/cometdocs';

export default function DocsPage({ params }: { params: { slug: string[] } }) {
  return <CometDocs slug={params.slug.join('/')} />;
}
```

5. Import the styles in your root layout:
```tsx
// app/layout.tsx
import '@iambalance/cometdocs/styles.css';
```

6. Start your Next.js development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

7. Visit `http://localhost:3000/docs/getting-started` to see your documentation.

## Configuration

You can customize CometDocs by creating a `cometdocs.config.js` file in your project root:

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

## Documentation Structure

CometDocs looks for Markdown or MDX files in the `docs` directory. You can organize your documentation by locale:

```
docs/
  en/
    getting-started.md
    guides/
      installation.md
      configuration.md
  fr/
    getting-started.md
    guides/
      installation.md
      configuration.md
```

## API Reference

### `<CometDocs />` Component

```tsx
import { CometDocs } from '@iambalance/cometdocs';

<CometDocs
  slug="getting-started"
  config={{
    // Optional custom configuration
  }}
  components={{
    // Optional custom components
    Layout: CustomLayout,
  }}
/>
```

#### Props

- `slug` (string, required): The slug of the document to display
- `config` (object, optional): Custom configuration to override the default config
- `components` (object, optional): Custom components to override the default components

## License

MIT © [CometDocs Team](https://github.com/iAmBalanceAR/CometDocs)
