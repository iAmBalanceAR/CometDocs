'use client';

import React from 'react';
import { CometDocsProps } from '../types';
import { getCometDocsConfig } from '../utils/config';
import { DocMetadata, loadDocBySlug } from '../utils/docs';
import { loadNavigation } from '../utils/navigation';
import { NavigationItem } from '../types/config';
import Layout from './Layout';
import '../styles/cometdocs.css';

/**
 * CometDocs component
 * @param props Component props
 * @returns React component
 */
export const CometDocs: React.FC<CometDocsProps> = ({
  slug,
  config: customConfig,
  components: customComponents,
}) => {
  // State for document data
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [metadata, setMetadata] = React.useState<DocMetadata | null>(null);
  const [content, setContent] = React.useState<string>('');
  
  // Get the configuration - memoize to prevent infinite loops
  const config = React.useMemo(() => getCometDocsConfig(customConfig), [customConfig]);
  
  // Use navigation directly from config if available
  const [navigation, setNavigation] = React.useState<NavigationItem[]>(
    config.navigation.items && config.navigation.items.length > 0 
      ? config.navigation.items 
      : []
  );
  
  // Custom components with defaults - memoize to prevent re-renders
  const components = React.useMemo(() => ({
    Layout: customComponents?.Layout || Layout,
  }), [customComponents]);
  
  // Process the slug to handle locale and path
  const { formattedSlug, locale } = React.useMemo(() => {
    // Convert to array if it's a string
    const slugArray = Array.isArray(slug) ? slug : (slug || 'index').split('/');
    
    // Check if the first segment is a locale
    const firstSegment = slugArray[0];
    const isLocale = firstSegment === config.content.defaultLocale;
    
    // Extract locale and path
    const docLocale = isLocale ? firstSegment : config.content.defaultLocale;
    const pathSegments = isLocale ? slugArray.slice(1) : slugArray;
    
    // Join the path segments
    const path = pathSegments.join('/') || 'index';
    
    return {
      formattedSlug: path,
      locale: docLocale
    };
  }, [slug, config.content.defaultLocale]);
  
  // Current path for active navigation item
  const currentPath = React.useMemo(() => 
    `${config.advanced.basePath}/${formattedSlug}`,
    [config.advanced.basePath, formattedSlug]
  );
  
  // Load navigation data
  React.useEffect(() => {
    let isMounted = true;
    
    async function loadNavigationData() {
      if (!isMounted) return;
      
      try {
        console.log('Loading navigation with config:', config);
        console.log('Auto navigation enabled:', config.navigation.auto);
        console.log('Config items count:', config.navigation.items?.length || 0);
        
        // If we have items in the config, use those directly and ONLY those
        if (config.navigation.items && config.navigation.items.length > 0) {
          console.log('Using navigation from config ONLY:', config.navigation.items);
          setNavigation(config.navigation.items);
          return;
        }
        
        // Otherwise, load navigation from API
        const navItems = await loadNavigation(config);
        console.log('Navigation loaded from API:', navItems);
        
        if (!isMounted) return;
        
        if (navItems && navItems.length > 0) {
          console.log('Setting navigation with items:', navItems.length);
          setNavigation(navItems);
        } else {
          console.warn('No navigation items returned, using empty navigation');
          // No fallback - use empty navigation
          setNavigation([]);
        }
      } catch (err) {
        if (!isMounted) return;
        
        console.error('Error loading navigation:', err);
        // No fallback - use empty navigation
        setNavigation([]);
      }
    }
    
    loadNavigationData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [config]);
  
  // Load document data
  React.useEffect(() => {
    let isMounted = true;
    
    async function loadDocument() {
      if (!isMounted) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const doc = await loadDocBySlug(formattedSlug, config);
        
        if (!isMounted) return;
        
        if (!doc) {
          setError(`Document not found: ${formattedSlug}`);
          setMetadata(null);
          setContent('');
        } else {
          setMetadata(doc.metadata);
          setContent(doc.content);
        }
      } catch (err) {
        if (!isMounted) return;
        
        console.error('Error loading document:', err);
        setError(`Error loading document: ${err instanceof Error ? err.message : String(err)}`);
        setMetadata(null);
        setContent('');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    loadDocument();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [formattedSlug, config]);
  
  // Memoize the rendered content to prevent unnecessary re-renders
  const renderedContent = React.useMemo(() => {
    if (!metadata) return null;
    return <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />;
  }, [metadata, content]);
  
  // Show loading state
  if (loading) {
    return (
      <components.Layout 
        navigation={navigation} 
        currentPath={currentPath}
      >
        <div className="cometdocs-loading">Loading...</div>
      </components.Layout>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <components.Layout 
        navigation={navigation} 
        currentPath={currentPath}
      >
        <div className="cometdocs-error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </components.Layout>
    );
  }
  
  // Show content
  return (
    <components.Layout 
      metadata={metadata || undefined} 
      navigation={navigation} 
      currentPath={currentPath}
    >
      {renderedContent || (
        <div className="cometdocs-error">
          <h2>Document Not Found</h2>
          <p>The requested document could not be found.</p>
        </div>
      )}
    </components.Layout>
  );
};

/**
 * Simple markdown renderer
 * In a real implementation, this would use a proper markdown parser
 */
function renderMarkdown(markdown: string): string {
  // This is a very basic implementation
  // In a real app, you would use a library like marked or remark
  
  // Convert headings
  let html = markdown
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
    .replace(/^###### (.+)$/gm, '<h6>$1</h6>');
  
  // Convert paragraphs (simple)
  html = html.replace(/^(?!<h[1-6]|<ul|<ol|<li|<blockquote|<pre)(.+)$/gm, '<p>$1</p>');
  
  // Convert code blocks
  html = html.replace(/```(.+?)\n([\s\S]+?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  html = html.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Convert lists (simple)
  html = html.replace(/^\* (.+)$/gm, '<ul><li>$1</li></ul>');
  html = html.replace(/^- (.+)$/gm, '<ul><li>$1</li></ul>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<ol><li>$2</li></ol>');
  
  // Fix nested lists (very simple approach)
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  html = html.replace(/<\/ol>\s*<ol>/g, '');
  
  return html;
}

export default CometDocs;