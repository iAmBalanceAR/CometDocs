'use client';

import React from 'react';
import { DocMetadata } from '../utils/docs';

interface LayoutProps {
  children: React.ReactNode;
  metadata?: DocMetadata;
}

/**
 * Default layout component for CometDocs
 */
export const Layout: React.FC<LayoutProps> = ({ children, metadata }) => {
  return (
    <div className="cometdocs-container">
      <header className="cometdocs-header">
        <div className="cometdocs-header-content">
          <h1 className="cometdocs-title">CometDocs</h1>
        </div>
      </header>
      
      <div className="cometdocs-layout">
        <aside className="cometdocs-sidebar">
          <nav className="cometdocs-nav">
            <ul className="cometdocs-nav-list">
              <li className="cometdocs-nav-item">
                <a href="/docs/getting-started" className="cometdocs-nav-link">
                  Getting Started
                </a>
              </li>
              <li className="cometdocs-nav-item">
                <span className="cometdocs-nav-group">Guides</span>
                <ul className="cometdocs-nav-sublist">
                  <li className="cometdocs-nav-item">
                    <a href="/docs/guides/installation" className="cometdocs-nav-link">
                      Installation
                    </a>
                  </li>
                  <li className="cometdocs-nav-item">
                    <a href="/docs/guides/configuration" className="cometdocs-nav-link">
                      Configuration
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="cometdocs-main">
          <div className="cometdocs-content">
            {metadata?.title && (
              <h1 className="cometdocs-page-title">{metadata.title}</h1>
            )}
            {children}
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
};

export default Layout; 