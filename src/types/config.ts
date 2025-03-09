/**
 * CometDocs configuration
 */
export interface CometDocsConfig {
  /**
   * Content configuration
   */
  content: {
    /**
     * Directory where documentation files are stored
     * @default './docs'
     */
    dir: string;
    
    /**
     * Default locale for documentation
     * @default 'en'
     */
    defaultLocale: string;
  };
  
  /**
   * Theme configuration
   */
  theme: {
    /**
     * Whether to inherit theme from the parent Next.js app
     * @default true
     */
    inherit: boolean;
    
    /**
     * Custom colors for the documentation
     */
    colors?: {
      /**
       * Primary color
       * @default '#3490dc'
       */
      primary?: string;
      
      /**
       * Secondary color
       * @default '#718096'
       */
      secondary?: string;
      
      /**
       * Accent color
       * @default '#f6ad55'
       */
      accent?: string;
    };
    
    /**
     * Layout type
     * @default 'sidebar'
     */
    layout?: 'sidebar' | 'full' | 'minimal';
    
    /**
     * Dark mode configuration
     * @default 'system'
     */
    darkMode?: 'system' | 'light' | 'dark' | 'toggle';
  };
  
  /**
   * Navigation configuration
   */
  navigation: {
    /**
     * Whether to automatically generate navigation from file structure
     * @default true
     */
    auto: boolean;
    
    /**
     * Custom navigation items
     */
    items?: NavigationItem[];
  };
  
  /**
   * Advanced options
   */
  advanced: {
    /**
     * Base path for documentation
     * @default '/docs'
     */
    basePath: string;
    
    /**
     * Search configuration
     */
    search: {
      /**
       * Whether search is enabled
       * @default true
       */
      enabled: boolean;
      
      /**
       * Search type
       * @default 'local'
       */
      type: 'local' | 'algolia';
      
      /**
       * Algolia configuration (only used if type is 'algolia')
       */
      algolia?: {
        appId: string;
        apiKey: string;
        indexName: string;
      };
    };
    
    /**
     * Whether to enable code highlighting
     * @default true
     */
    codeHighlighting: boolean;
  };
}

/**
 * Navigation item
 */
export interface NavigationItem {
  /**
   * Title of the navigation item
   */
  title: string;
  
  /**
   * Path to the page
   */
  path?: string;
  
  /**
   * Children of the navigation item
   */
  children?: NavigationItem[];

  /**
   * Position for sorting (lower numbers appear first)
   */
  position?: number;

  /**
   * Whether the section is collapsed by default
   */
  collapsed?: boolean;
} 