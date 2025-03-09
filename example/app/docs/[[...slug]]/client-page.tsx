'use client';

import React, { useState, useEffect } from 'react';

interface ClientPageProps {
  slug: string;
  config: any; // Using any to avoid dependency on CometDocs types
}

export default function ClientPage({ slug, config }: ClientPageProps) {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // For debugging
  console.log("Current slug:", slug);

  useEffect(() => {
    // Simple function to load mock content based on slug
    async function loadContent() {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Return mock data based on the slug
        if (slug === 'getting-started' || slug === 'guides/getting-started') {
          setTitle('Getting Started with CometDocs');
          setContent(`
<h2>Getting Started with CometDocs</h2>
<p>CometDocs is a lightweight, zero-config documentation system for Next.js applications. It allows you to write your documentation in Markdown or MDX and automatically generates a beautiful documentation site.</p>

<h2>Installation</h2>
<p>To install CometDocs, run the following command in your Next.js project:</p>
<pre><code>npm install cometdocs
# or
yarn add cometdocs
# or
pnpm add cometdocs</code></pre>

<h2>Basic Usage</h2>
<p>Once installed, you can create a new page in your Next.js app to display your documentation.</p>

<h2>Creating Documentation</h2>
<p>By default, CometDocs looks for Markdown or MDX files in the <code>docs</code> directory at the root of your project. You can organize your documentation by locale.</p>
<p>Each Markdown file should include frontmatter with at least a title:</p>

<pre><code>---
title: Getting Started
description: Learn how to get started with CometDocs
---

# Getting Started

Your content here...
</code></pre>

<h2>Configuration</h2>
<p>You can customize CometDocs by creating a <code>cometdocs.config.js</code> file at the root of your project.</p>

<h2>Next Steps</h2>
<ul>
  <li><a href="/docs/guides/configuration">Configuration</a> - Learn how to customize CometDocs</li>
  <li><a href="/docs/guides/installation">Installation</a> - Detailed installation instructions</li>
</ul>
          `);
        } else if (slug === 'guides/installation') {
          setTitle('Installation Guide');
          setContent(`
<h2>Installation Guide</h2>
<p>CometDocs can be installed using your favorite package manager:</p>
<pre><code>npm install cometdocs
# or
yarn add cometdocs
# or
pnpm add cometdocs</code></pre>

<h2>Requirements</h2>
<ul>
  <li>Next.js 13 or later</li>
  <li>React 18 or later</li>
</ul>

<h2>Setting Up</h2>
<p>After installation, you need to create a docs directory in your project root:</p>
<pre><code>mkdir -p docs/en</code></pre>
<p>Then, create your first documentation file:</p>
<pre><code>touch docs/en/getting-started.md</code></pre>

<h2>Next Steps</h2>
<p>Once you have installed CometDocs, you can:</p>
<ol>
  <li>Configure it to match your project's needs</li>
  <li>Create your documentation content</li>
  <li>Customize the appearance to match your brand</li>
</ol>
          `);
        } else if (slug === 'guides/configuration') {
          setTitle('Configuration Guide');
          setContent(`
<h2>Configuration Guide</h2>
<p>CometDocs can be configured using a <code>cometdocs.config.js</code> file in your project root.</p>
<pre><code>// cometdocs.config.js
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
};</code></pre>

<h2>Configuration Options</h2>
<h3>Content Configuration</h3>
<ul>
  <li><code>dir</code>: The directory where your documentation files are stored</li>
  <li><code>defaultLocale</code>: The default locale for your documentation</li>
</ul>

<h3>Theme Configuration</h3>
<ul>
  <li><code>colors</code>: Custom colors for your documentation</li>
  <li><code>layout</code>: The layout style ('sidebar', 'full', etc.)</li>
  <li><code>darkMode</code>: Dark mode configuration ('system', 'light', 'dark', 'toggle')</li>
</ul>

<h3>Navigation Configuration</h3>
<ul>
  <li><code>auto</code>: Whether to automatically generate navigation from your file structure</li>
  <li><code>items</code>: Custom navigation items</li>
</ul>

<h3>Advanced Configuration</h3>
<ul>
  <li><code>basePath</code>: The base path for your documentation</li>
  <li><code>search</code>: Search configuration</li>
  <li><code>codeHighlighting</code>: Whether to enable code highlighting</li>
</ul>
          `);
        } else {
          // If no match, default to getting-started
          if (slug === '') {
            return loadContent(); // Retry with default
          }
          setError(`Document not found: ${slug}`);
          setTitle('');
          setContent('');
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setError(`Error loading content: ${err instanceof Error ? err.message : String(err)}`);
        setTitle('');
        setContent('');
      } finally {
        setLoading(false);
      }
    }
    
    loadContent();
  }, [slug]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="cometdocs-container">
      <header className="cometdocs-header">
        <div className="cometdocs-header-content">
          <div className="cometdocs-logo-container">
            <div className="cometdocs-logo"></div>
            <h1 className="cometdocs-title">CometDocs</h1>
          </div>
          <div className="cometdocs-header-right">
            <button 
              className="cometdocs-mobile-menu-button" 
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>
      
      <div className="cometdocs-layout">
        <aside className={`cometdocs-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="cometdocs-nav-section">
            <div className="cometdocs-nav-section-title">Getting Started</div>
            <nav className="cometdocs-nav">
              <ul className="cometdocs-nav-list">
                <li className="cometdocs-nav-item">
                  <a 
                    href="/docs/guides/getting-started" 
                    className={`cometdocs-nav-link ${slug === 'getting-started' || slug === 'guides/getting-started' ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Introduction
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="cometdocs-nav-section">
            <div className="cometdocs-nav-section-title">Guides</div>
            <nav className="cometdocs-nav">
              <ul className="cometdocs-nav-list">
                <li className="cometdocs-nav-item">
                  <a 
                    href="/docs/guides/installation" 
                    className={`cometdocs-nav-link ${slug === 'guides/installation' ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Installation
                  </a>
                </li>
                <li className="cometdocs-nav-item">
                  <a 
                    href="/docs/guides/configuration" 
                    className={`cometdocs-nav-link ${slug === 'guides/configuration' ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Configuration
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        
        <main className="cometdocs-main">
          <div className="cometdocs-content-container">
            <div className="cometdocs-content">
              {loading ? (
                <div className="cometdocs-loading">Loading documentation...</div>
              ) : error ? (
                <div className="cometdocs-error">
                  <h2>Error</h2>
                  <p>{error}</p>
                </div>
              ) : (
                <>
                  {title && <h1 className="cometdocs-page-title">{title}</h1>}
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <div className="cometdocs-footer">
        <div className="cometdocs-footer-content">
          <p>Powered by CometDocs - Documentation that doesn't make you extinct.</p>
        </div>
      </div>
    </div>
  );
} 