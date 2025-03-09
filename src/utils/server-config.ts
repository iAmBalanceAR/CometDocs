import { CometDocsConfig } from '../types/config';
import { getCometDocsConfig } from './config';

/**
 * Load configuration from file (server-side only)
 * This function should be called only in Node.js environment
 */
export async function loadConfigFromFile(): Promise<CometDocsConfig> {
  try {
    // Using dynamic imports for Node.js modules
    const path = await import('path');
    const fs = await import('fs');
    
    const configPath = path.join(process.cwd(), 'cometdocs.config.js');
    
    if (fs.existsSync(configPath)) {
      // For ESM compatibility
      const configModule = await import(configPath);
      const fileConfig = configModule.default || configModule;
      
      // Merge with default config
      return getCometDocsConfig(fileConfig);
    }
    
    // Return default config if no file exists
    return getCometDocsConfig();
  } catch (error) {
    console.warn('Failed to load cometdocs.config.js:', error);
    // Return default config on error
    return getCometDocsConfig();
  }
} 