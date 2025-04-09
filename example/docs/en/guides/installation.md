---
title: Installation
synopsis: Learn how to install and set up CometDocs in your Next.js project
date: 2024-03-10
author: CometDocs Team
position: 2
---

This guide will walk you through the process of installing and setting up CometDocs in your Next.js project. We'll cover everything from basic installation to advanced configuration options.

## System Requirements

CometDocs requires:

- **Next.js**: Version 14.0.0 or higher
- **Node.js**: Version 18.17.0 or higher (required by Next.js)
- **Package Manager**: npm, yarn, or pnpm (we recommend pnpm)
- **React**: Version 18.0.0 or higher

## Creating a New Project

If you're starting from scratch, create a new Next.js project with App Router:

```bash
# Using pnpm (recommended)
pnpm create next-app my-docs --typescript --tailwind --app --src-dir

# Using npm
npx create-next-app my-docs --typescript --tailwind --app --src-dir

# Using yarn
yarn create next-app my-docs --typescript --tailwind --app --src-dir
```

## Installing CometDocs

### 1. Install the Package

```bash
# Using pnpm (recommended)
pnpm add cometdocs

# Using npm
npm install cometdocs

# Using yarn
yarn add cometdocs
```

### 2. Create Required Directories

Create the documentation directory structure:

```bash
# Create docs directory with language subdirectory
mkdir -p docs/en

# Create guides directory for organized documentation
mkdir -p docs/en/guides
```

### 3. Set Up the Documentation Route

Create a new directory for the documentation route:

```bash
# Create the dynamic route directory
mkdir -p app/docs/[[...slug]]
```

Create the page component:

```tsx
// app/docs/[[...slug]]/page.tsx
import { CometDocs } from 'cometdocs';

interface DocsPageProps {
  params: {
    slug: string[];
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const slug = params?.slug?.join('/') || 'index';
  
  return <CometDocs slug={slug} />;
}

// Generate static pages at build time
export async function generateStaticParams() {
  // CometDocs will automatically discover all your documentation pages
  return [];
}
```

### 4. Create Your First Documentation File

Create an index file for your documentation:

```bash
touch docs/en/index.md
```

Add content to the file:

```md
---
title: Welcome
description: Welcome to your documentation
---

# Welcome to Your Documentation

This is the landing page for your documentation. Start adding content here!
```

## Optional: Configuration

Create a configuration file to customize CometDocs:

```bash
touch cometdocs.config.js
```

Add basic configuration:

```js
// cometdocs.config.js
/** @type {import('cometdocs').Config} */
module.exports = {
  // Project information
  project: {
    name: 'Your Project',
    description: 'Your project description',
    // URL where your documentation will be hosted
    url: 'https://docs.yourproject.com',
  },

  // Content configuration
  content: {
    // Root directory for documentation files
    dir: './docs',
    // Default language
    defaultLocale: 'en',
    // Supported languages
    locales: ['en'],
  },

  // Theme configuration
  theme: {
    // Use your app's color scheme
    inherit: true,
    // Dark mode configuration
    darkMode: 'system', // 'system' | 'dark' | 'light' | 'toggle'
  },

  // Search configuration
  search: {
    enabled: true,
    type: 'local', // 'local' | 'algolia'
  },
};
```

## Verifying the Installation

1. Start your development server:
```bash
pnpm dev
```

2. Visit `http://localhost:3000/docs` in your browser.

3. You should see your documentation site with:
   - The welcome page you created
   - Navigation sidebar
   - Search functionality
   - Dark mode toggle

## Common Issues

### Next.js Version Mismatch

If you see errors about incompatible React versions:

```bash
# Check your Next.js version
pnpm list next

# Update Next.js if needed
pnpm up next@latest
```

### TypeScript Errors

If you encounter TypeScript errors:

1. Update your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

2. Run TypeScript check:
```bash
pnpm tsc --noEmit
```

## Next Steps

Now that you have CometDocs installed:

1. [Configure CometDocs](/docs/guides/configuration) - Customize the behavior and appearance
2. [Write Documentation](/docs/guides/writing) - Learn best practices for documentation
3. [Add Search](/docs/guides/search) - Set up and customize search functionality
4. [Deploy](/docs/guides/deployment) - Deploy your documentation site

## Getting Help

- [Join our Discord](https://discord.gg/cometdocs) for community support
- [GitHub Issues](https://github.com/cometdocs/cometdocs/issues) for bug reports
- [API Reference](/docs/api) for detailed API documentation 