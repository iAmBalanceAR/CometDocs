'use client';

import React, { useState } from 'react';
import { DocMetadata } from '../utils/docs';
import { NavigationItem } from '../types/config';

interface LayoutProps {
  children: React.ReactNode;
  metadata?: DocMetadata;
  navigation?: NavigationItem[];
  currentPath?: string;
}

/**
 * Render a navigation item
 */
const NavigationItemComponent: React.FC<{
  item: NavigationItem;
  currentPath?: string;
  level?: number;
}> = ({ item, currentPath, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(!item.collapsed);
  const isActive = currentPath === item.path;
  const hasChildren = item.children && item.children.length > 0;
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <li className={`cometdocs-nav-item ${level > 0 ? 'cometdocs-nav-item-child' : ''}`}>
      {hasChildren ? (
        <>
          <button 
            className={`cometdocs-nav-group ${isOpen ? 'cometdocs-nav-group-open' : ''}`}
            onClick={toggleOpen}
            aria-expanded={isOpen}
          >
            {item.title}
            <span className="cometdocs-nav-group-icon">{isOpen ? '▼' : '▶'}</span>
          </button>
          {isOpen && (
            <ul className="cometdocs-nav-sublist">
              {item.children?.map((child, index) => (
                <NavigationItemComponent 
                  key={`${child.title}-${index}`} 
                  item={child} 
                  currentPath={currentPath}
                  level={level + 1}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <a 
          href={item.path} 
          className={`cometdocs-nav-link ${isActive ? 'cometdocs-nav-link-active' : ''}`}
        >
          {item.title}
        </a>
      )}
    </li>
  );
};

/**
 * Default layout component for CometDocs
 */
export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  metadata,
  navigation = [],
  currentPath,
}) => {
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
              {navigation.length > 0 ? (
                navigation.map((item, index) => (
                  <NavigationItemComponent 
                    key={`${item.title}-${index}`} 
                    item={item} 
                    currentPath={currentPath}
                  />
                ))
              ) : (
                <>
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
                </>
              )}
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