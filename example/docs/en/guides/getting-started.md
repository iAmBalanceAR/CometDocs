---
title: Getting Started
position: 2
synopsis: Learn how to get started with CometDocs, a lightweight documentation system for Next.js applications.
---

CometDocs is a lightweight, zero-config documentation system for Next.js applications. It allows you to write your documentation in Markdown or MDX and automatically generates a beautiful documentation site with modern features like full-text search, dark mode, and responsive design.

## Prerequisites

Before installing CometDocs, ensure you have:
- Next.js 14 or higher
- Node.js 18.17 or higher
- npm, yarn, or pnpm (we recommend pnpm for faster installations)

## Installation

To install CometDocs, run the following command in your Next.js project:

```bash
npm install cometdocs
# or
yarn add cometdocs
# or
pnpm add cometdocs
```

## Quick Start

1. Create a docs directory in your project root:
```bash
mkdir -p docs/en
```

2. Create your first documentation file:
```bash
touch docs/en/getting-started.md
```

3. Add some content to your markdown file:
```md
---
title: Welcome
description: Welcome to your documentation
---

# Welcome to Your Docs

This is your first documentation page.
```

4. Create a new route for your documentation using the App Router:

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

5. Start your development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000/docs` to see your documentation site in action!

## Key Features

- 📝 **Markdown & MDX Support**: Write in Markdown or MDX with full component support
- 🎨 **Beautiful UI**: Modern, responsive design with dark mode support
- 🔍 **Full-Text Search**: Built-in search functionality
- 📱 **Mobile-First**: Fully responsive design that works on all devices
- ⚡ **Fast**: Static generation for optimal performance
- 🎯 **Zero Config**: Works out of the box with sensible defaults
- 🔧 **Customizable**: Extensive theming and configuration options
- 🌍 **i18n Ready**: Built-in internationalization support

## Project Structure

CometDocs follows a simple directory structure:

```
your-project/
├── docs/
│   ├── en/
│   │   ├── getting-started.md
│   │   └── guides/
│   │       ├── installation.md
│   │       └── configuration.md
│   └── fr/  # Other languages
├── app/
│   └── docs/
│       └── [[...slug]]/
│           └── page.tsx
└── cometdocs.config.js  # Optional configuration
```

## Next Steps

- [Configuration](/docs/guides/configuration) - Learn how to customize CometDocs
- [Writing Documentation](/docs/guides/writing) - Best practices for writing docs
- [Deployment](/docs/guides/deployment) - Deploy your documentation site
- [Advanced Features](/docs/guides/advanced) - Explore advanced features

## Need Help?

- Check our [FAQ](/docs/faq) for common questions
- Join our [Discord Community](https://discord.gg/cometdocs)
- Report issues on [GitHub](https://github.com/cometdocs/cometdocs)
