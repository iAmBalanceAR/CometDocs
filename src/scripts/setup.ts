import { join } from 'path';
import * as fs from 'fs-extra';

export async function setup() {
  try {
    // Get the installation directory (where npm install was run)
    const installDir = process.cwd();
    console.log('Setting up CometDocs in:', installDir);
    
    // Create the basic directory structure
    const directories = [
      'app',
      'app/docs',
      'app/docs/[...slug]',
      'docs',
      'docs/en',
      'docs/en/guides'
    ];

    for (const dir of directories) {
      const dirPath = join(installDir, dir);
      console.log(`Creating directory: ${dirPath}`);
      await fs.ensureDir(dirPath);
    }

    // Create the route page
    const routePage = `// app/docs/[...slug]/page.tsx
import { CometDocs } from '@iambalance/cometdocs';

export default function DocsPage({ params }: { params: { slug: string[] } }) {
  return <CometDocs slug={params.slug.join('/')} />;
}`;

    const routePagePath = join(installDir, 'app/docs/[...slug]/page.tsx');
    console.log(`Creating route page: ${routePagePath}`);
    await fs.writeFile(routePagePath, routePage);

    // Create a sample documentation file
    const sampleDoc = `---
title: Getting Started
description: Get started with CometDocs
---

# Getting Started

Welcome to your documentation! This is a sample page to help you get started with CometDocs.

## Features

- 📝 **Markdown & MDX Support**
- 🔄 **Zero Config**
- 🎨 **Customizable**
- 🔍 **Search**
- 🌙 **Dark Mode**
`;

    const sampleDocPath = join(installDir, 'docs/en/getting-started.md');
    console.log(`Creating sample doc: ${sampleDocPath}`);
    await fs.writeFile(sampleDocPath, sampleDoc);

    // Create or update layout.tsx to import styles
    const layoutPath = join(installDir, 'app/layout.tsx');
    console.log(`Checking layout file: ${layoutPath}`);
    
    let layoutContent = '';

    if (await fs.pathExists(layoutPath)) {
      console.log('Layout file exists, updating...');
      // If layout exists, add the import
      const currentLayout = await fs.readFile(layoutPath, 'utf8');
      if (!currentLayout.includes('@iambalance/cometdocs/styles.css')) {
        layoutContent = `import '@iambalance/cometdocs/styles.css';\n${currentLayout}`;
        await fs.writeFile(layoutPath, layoutContent);
        console.log('Added styles import to existing layout');
      } else {
        console.log('Styles import already exists in layout');
      }
    } else {
      console.log('Creating new layout file...');
      // Create a new layout file
      layoutContent = `import '@iambalance/cometdocs/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;
      await fs.writeFile(layoutPath, layoutContent);
      console.log('Created new layout file with styles import');
    }

    console.log('\n✨ CometDocs project structure has been set up successfully!');
    console.log('📝 Created:');
    console.log('  - app/docs/[...slug]/page.tsx (documentation route)');
    console.log('  - docs/en/getting-started.md (sample documentation)');
    console.log('  - Added required styles to app/layout.tsx');
    console.log('\n🚀 Start your development server and visit:');
    console.log('   http://localhost:3000/docs/getting-started');
  } catch (error) {
    console.error('Error setting up CometDocs:', error);
    process.exit(1);
  }
} 