import fs from 'fs-extra';
import path from 'path';

async function setup() {
  try {
    // Get the installation directory (where npm install was run)
    const installDir = process.env.INIT_CWD || process.cwd();
    
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
      await fs.ensureDir(path.join(installDir, dir));
    }

    // Create the route page
    const routePage = `// app/docs/[...slug]/page.tsx
import { CometDocs } from '@iambalance/cometdocs';

export default function DocsPage({ params }: { params: { slug: string[] } }) {
  return <CometDocs slug={params.slug.join('/')} />;
}`;

    await fs.writeFile(
      path.join(installDir, 'app/docs/[...slug]/page.tsx'),
      routePage
    );

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

    await fs.writeFile(
      path.join(installDir, 'docs/en/getting-started.md'),
      sampleDoc
    );

    // Create or update layout.tsx to import styles
    const layoutPath = path.join(installDir, 'app/layout.tsx');
    let layoutContent = '';

    if (await fs.pathExists(layoutPath)) {
      // If layout exists, add the import
      const currentLayout = await fs.readFile(layoutPath, 'utf8');
      if (!currentLayout.includes('@iambalance/cometdocs/styles.css')) {
        layoutContent = `import '@iambalance/cometdocs/styles.css';\n${currentLayout}`;
        await fs.writeFile(layoutPath, layoutContent);
      }
    } else {
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
    }

    console.log('✨ CometDocs project structure has been set up successfully!');
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

setup(); 