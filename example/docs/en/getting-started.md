---
title: Getting Started with CometDocs
description: Learn how to set up and use CometDocs in your Next.js project
date: 2023-07-15
author: CometDocs Team
---

## Getting Started with CometDocs

CometDocs is a lightweight, zero-config documentation system for Next.js applications. It allows you to write your documentation in Markdown or MDX and automatically generates a beautiful documentation site.

## Installation

To install CometDocs, run the following command in your Next.js project:

```bash
npm install cometdocs
# or
yarn add cometdocs
# or
pnpm add cometdocs
```

## Basic Usage

Once installed, you can create a new page in your Next.js app to display your documentation:

```tsx
// pages/docs/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { CometDocs } from 'cometdocs';

export default function DocsPage({ slug }) {
  return <CometDocs slug={slug} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  return {
    props: {
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real implementation, this would fetch all available docs
  return {
    paths: [],
    fallback: 'blocking',
  };
};
```

## Creating Documentation

By default, CometDocs looks for Markdown or MDX files in the `docs` directory at the root of your project. You can organize your documentation by locale:

Each Markdown file should include frontmatter with at least a title:

```md
---
title: Getting Started
description: Learn how to get started with CometDocs
---

# Getting Started

Your content here...
```

## Configuration

You can customize CometDocs by creating a `cometdocs.config.js` file at the root of your project:

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

## Next Steps

- [Configuration](/docs/guides/configuration) - Learn how to customize CometDocs
- [Theming](/docs/guides/theming) - Customize the look and feel of your documentation
- [Advanced Usage](/docs/guides/advanced) - Explore advanced features and customization options
