import { CometDocsConfig } from '../types/config';

/**
 * Interface for document metadata
 */
export interface DocMetadata {
  title: string;
  description?: string;
  slug: string;
  locale: string;
  path: string;
  date?: string;
  author?: string;
}

/**
 * Interface for a document
 */
export interface Doc {
  metadata: DocMetadata;
  content: string;
  toc?: TableOfContents;
}

/**
 * Interface for a table of contents item
 */
export interface TocItem {
  title: string;
  id: string;
  level: number;
  children?: TocItem[];
}

/**
 * Interface for a table of contents
 */
export interface TableOfContents {
  items: TocItem[];
}

/**
 * Get a document by slug
 * @param slug The document slug
 * @param config The CometDocs configuration
 * @param locale The locale to use
 * @returns The document or null if not found
 */
export async function getDocBySlug(
  slug: string,
  config: CometDocsConfig,
  locale?: string
): Promise<Doc | null> {
  // This is a client-side stub
  // The actual implementation is in server-docs.ts to avoid
  // Node.js specific code in the browser
  console.warn('getDocBySlug should be imported from server-docs.ts in server components');
  return null;
}

/**
 * Get all documents
 * @param config The CometDocs configuration
 * @param locale The locale to use
 * @returns An array of documents
 */
export async function getAllDocs(
  config: CometDocsConfig,
  locale?: string
): Promise<Doc[]> {
  // This is a client-side stub
  // The actual implementation is in server-docs.ts to avoid
  // Node.js specific code in the browser
  console.warn('getAllDocs should be imported from server-docs.ts in server components');
  return [];
}

/**
 * Generate a table of contents from markdown content
 * @param content Markdown content
 * @returns Table of contents
 */
export function generateTableOfContents(content: string): TableOfContents {
  // Simple implementation - in a real app, this would parse headings from markdown
  return {
    items: [
      {
        title: 'Introduction',
        id: 'introduction',
        level: 2,
        children: [],
      },
    ],
  };
}

/**
 * Mock implementation for client components
 * In a real implementation, this would be a server component or API endpoint
 */
export async function loadDocBySlug(
  slug: string,
  config: CometDocsConfig
): Promise<Doc | null> {
  // This is a mock implementation for client components
  // In a real app, this would fetch data from an API endpoint
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data based on the slug
  const formattedSlug = slug.replace(/^\/+|\/+$/g, '');
  
  if (formattedSlug === 'getting-started') {
    return {
      metadata: {
        title: 'Getting Started with CometDocs',
        description: 'Learn how to set up and use CometDocs in your Next.js project',
        slug: formattedSlug,
        locale: config.content.defaultLocale,
        path: `${config.advanced.basePath}/${formattedSlug}`,
        date: '2023-07-15',
        author: 'CometDocs Team',
      },
      content: `
## Getting Started with CometDocs

CometDocs is a lightweight, zero-config documentation system for Next.js applications. It allows you to write your documentation in Markdown or MDX and automatically generates a beautiful documentation site.

## Installation

To install CometDocs, run the following command in your Next.js project:

\`\`\`bash
npm install cometdocs
# or
yarn add cometdocs
# or
pnpm add cometdocs
\`\`\`

## Basic Usage

Once installed, you can create a new page in your Next.js app to display your documentation.

## Creating Documentation

By default, CometDocs looks for Markdown or MDX files in the \`docs\` directory at the root of your project. You can organize your documentation by locale.

Each Markdown file should include frontmatter with at least a title:

\`\`\`md
---
title: Getting Started
description: Learn how to get started with CometDocs
---

# Getting Started

Your content here...
\`\`\`

## Configuration

You can customize CometDocs by creating a \`cometdocs.config.js\` file at the root of your project.

## Next Steps

- [Configuration](/docs/guides/configuration) - Learn how to customize CometDocs
- [Theming](/docs/guides/theming) - Customize the look and feel of your documentation
- [Advanced Usage](/docs/guides/advanced) - Explore advanced features and customization options
      `,
    };
  } else if (formattedSlug === 'guides/installation') {
    return {
      metadata: {
        title: 'Installation Guide',
        description: 'How to install and set up CometDocs',
        slug: formattedSlug,
        locale: config.content.defaultLocale,
        path: `${config.advanced.basePath}/${formattedSlug}`,
      },
      content: `
## Installation Guide

CometDocs can be installed using your favorite package manager:

\`\`\`bash
npm install cometdocs
# or
yarn add cometdocs
# or
pnpm add cometdocs
\`\`\`

## Requirements

- Next.js 13 or later
- React 18 or later

## Setting Up

After installation, you need to create a docs directory in your project root:

\`\`\`bash
mkdir -p docs/en
\`\`\`

Then, create your first documentation file:

\`\`\`bash
touch docs/en/getting-started.md
\`\`\`

## Next Steps

Once you have installed CometDocs, you can:

1. Configure it to match your project's needs
2. Create your documentation content
3. Customize the appearance to match your brand
      `,
    };
  } else if (formattedSlug === 'guides/configuration') {
    return {
      metadata: {
        title: 'Configuration Guide',
        description: 'How to configure CometDocs for your project',
        slug: formattedSlug,
        locale: config.content.defaultLocale,
        path: `${config.advanced.basePath}/${formattedSlug}`,
      },
      content: `
## Configuration Guide

CometDocs can be configured using a \`cometdocs.config.js\` file in your project root.

\`\`\`js
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
\`\`\`

## Configuration Options

### Content Configuration

- \`dir\`: The directory where your documentation files are stored
- \`defaultLocale\`: The default locale for your documentation

### Theme Configuration

- \`colors\`: Custom colors for your documentation
- \`layout\`: The layout style ('sidebar', 'full', etc.)
- \`darkMode\`: Dark mode configuration ('system', 'light', 'dark', 'toggle')

### Navigation Configuration

- \`auto\`: Whether to automatically generate navigation from your file structure
- \`items\`: Custom navigation items

### Advanced Configuration

- \`basePath\`: The base path for your documentation
- \`search\`: Search configuration
- \`codeHighlighting\`: Whether to enable code highlighting
      `,
    };
  } else {
    // Return null for unknown slugs
    return null;
  }
}

/**
 * Extract a value from frontmatter
 * @param frontmatter Frontmatter string
 * @param key Key to extract
 * @returns Extracted value or undefined
 */
function extractFrontmatterValue(frontmatter: string, key: string): string | undefined {
  const match = new RegExp(`${key}:\\s*(.+)`, 'i').exec(frontmatter);
  return match ? match[1].trim() : undefined;
} 