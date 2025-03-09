---
title: Installation
description: Learn how to install and set up CometDocs in your Next.js project
date: 2023-07-15
author: CometDocs Team
---

## Installation

This guide will walk you through the process of installing and setting up CometDocs in your Next.js project.

## Prerequisites

Before you begin, make sure you have:

- A Next.js project (version 13.4.0 or higher)
- Node.js (version 16 or higher)
- npm, yarn, or pnpm

## Installing CometDocs

To install CometDocs, run one of the following commands in your project directory:

```bash
# Using npm
npm install cometdocs

# Using yarn
yarn add cometdocs

# Using pnpm
pnpm add cometdocs
```

## Setting Up Documentation Files

CometDocs looks for Markdown or MDX files in the `docs` directory at the root of your project. Create this directory if it doesn't exist:

```bash
mkdir -p docs/en
```

Then, create your first documentation file:

```bash
touch docs/en/getting-started.md
```

Open the file in your editor and add some content:

```md
---
title: Getting Started
description: Learn how to get started with CometDocs
---

# Getting Started

Welcome to CometDocs! This is your first documentation page.

## Introduction

CometDocs is a lightweight, zero-config documentation system for Next.js applications.

## Features

- Markdown and MDX support
- Automatic navigation
- Code highlighting
- Search functionality
- Customizable themes
```

## Creating a Documentation Page

Next, you need to create a page in your Next.js app to display your documentation. Create a new file at `pages/docs/[slug].tsx`:

```tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { CometDocs } from 'cometdocs';

interface DocsPageProps {
  slug: string;
}

export default function DocsPage({ slug }: DocsPageProps) {
  return <CometDocs slug={slug} />;
}

export const getStaticProps: GetStaticProps<DocsPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  return {
    props: {
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real implementation, this would fetch all available docs
  // For now, we'll just return a few example paths
  const paths = [
    { params: { slug: 'getting-started' } },
  ];
  
  return {
    paths,
    fallback: 'blocking',
  };
};
```

## Configuration (Optional)

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

## Running Your Documentation Site

Start your Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then, navigate to `http://localhost:3000/docs/getting-started` in your browser to see your documentation site in action.

## Next Steps

Now that you have CometDocs installed and running, you can:

- [Configure CometDocs](/docs/guides/configuration) to customize its behavior
- [Add more documentation pages](/docs/guides/writing) to build out your documentation
- [Customize the theme](/docs/guides/theming) to match your brand 