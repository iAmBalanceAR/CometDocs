'use client';

import React, { useState } from 'react';
import { DocsNavigation } from '@/app/components/DocsNavigation';
import { TableOfContents } from '@/app/components/TableOfContents';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import { Search } from '@/app/components/Search';
import { ThemeToggle } from '@/app/components/ThemeToggle';

interface ClientPageProps {
  slug: string;
  initialContent: string;
  initialTitle: string;
  tableOfContents: Array<{ id: string; text: string; level: number }>;
  config: any;
  frontmatter?: { synopsis?: string };
}

export default function ClientPage({ 
  slug, 
  initialContent,
  initialTitle,
  tableOfContents,
  config,
  frontmatter
}: ClientPageProps) {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="cometdocs-container">
      <header className="cometdocs-header">
        <div className="cometdocs-header-content">
          <div className="flex items-center justify-between w-full">
            <div className="cometdocs-logo-container">
              <div className="cometdocs-logo"></div>
              <h1 className="cometdocs-title">CometDocs</h1>
            </div>
            <div className="flex-1 flex justify-center mx-4">
              <Search />
            </div>
            <div className="cometdocs-header-right flex items-center space-x-4">
              <ThemeToggle />
              <button 
                className="cometdocs-mobile-menu-button" 
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                {sidebarOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="cometdocs-layout">
        <aside className={`cometdocs-sidebar ${sidebarOpen ? 'open' : ''} w-[280px] flex-shrink-0`}>
          <DocsNavigation items={config.navigation.items} />
        </aside>
        
        <main className="cometdocs-main">
          <div className="flex px-4">
            <div className="cometdocs-content flex-1 pr-8">
              <Breadcrumbs slug={slug} />
              <h1 className="cometdocs-page-title">{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: content }} className="prose dark:prose-invert max-w-none" />
            </div>
            <TableOfContents 
              content={content}
              headings={tableOfContents}
              synopsis={frontmatter?.synopsis}
            />
          </div>
        </main>
      </div>
      
      <footer className="cometdocs-footer">
        <div className="cometdocs-footer-content">
          <p>Powered by CometDocs</p>
        </div>
      </footer>
    </div>
  );
} 