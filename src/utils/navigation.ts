import { NavigationItem } from '../types/config';
import { CometDocsConfig } from '../types/config';

/**
 * Interface for section metadata from JSON files
 */
export interface SectionMetadata {
  title: string;
  position?: number;
  collapsed?: boolean;
}

/**
 * Get navigation structure from the docs directory
 * @param config The CometDocs configuration
 * @param locale The locale to use
 * @returns Navigation structure
 */
export async function getNavigation(
  config: CometDocsConfig,
  locale?: string
): Promise<NavigationItem[]> {
  try {
    // Using dynamic imports for Node.js modules
    const path = await import('path');
    const fs = await import('fs/promises');
    const matter = await import('gray-matter');
    
    // Determine the locale to use
    const docLocale = locale || config.content.defaultLocale;
    
    // Build the path to the documents directory
    const docsDir = path.join(
      process.cwd(),
      config.content.dir,
      docLocale
    );
    
    // Check if the directory exists
    try {
      await fs.access(docsDir);
    } catch (error) {
      // Directory doesn't exist
      console.error(`Docs directory not found: ${docsDir}`);
      return [];
    }
    
    // Recursively scan the directory and build navigation
    return await buildNavigationTree(docsDir, config.advanced.basePath, fs, path, matter);
  } catch (error) {
    console.error('Error building navigation:', error);
    return [];
  }
}

/**
 * Build a navigation tree from a directory
 * @param dir Directory to scan
 * @param basePath Base path for URLs
 * @param fs File system module
 * @param path Path module
 * @param matter Gray matter module
 * @returns Navigation items
 */
async function buildNavigationTree(
  dir: string,
  basePath: string,
  fs: any,
  path: any,
  matter: any
): Promise<NavigationItem[]> {
  // Get all files and directories
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  // Array to store navigation items
  const items: NavigationItem[] = [];
  
  // Process directories first to get section metadata
  const directories = entries.filter((entry: any) => entry.isDirectory());
  
  for (const directory of directories) {
    const dirPath = path.join(dir, directory.name);
    const relativePath = path.relative(process.cwd(), dirPath).replace(/\\/g, '/');
    const urlPath = relativePath.replace(/^[^/]+\//, ''); // Remove the first directory (docs)
    
    // Check for section metadata in .json file
    let sectionMetadata: SectionMetadata | null = null;
    try {
      const metadataPath = path.join(dirPath, 'section.json');
      await fs.access(metadataPath);
      const metadataContent = await fs.readFile(metadataPath, 'utf8');
      sectionMetadata = JSON.parse(metadataContent);
    } catch (error) {
      // No metadata file or invalid JSON
    }
    
    // Build children navigation
    const children = await buildNavigationTree(dirPath, basePath, fs, path, matter);
    
    // Add to navigation if there are children or metadata
    if (children.length > 0 || sectionMetadata) {
      items.push({
        title: sectionMetadata?.title || directory.name,
        path: `${basePath}/${urlPath}`,
        children,
        position: sectionMetadata?.position,
        collapsed: sectionMetadata?.collapsed,
      });
    }
  }
  
  // Process markdown files
  const markdownFiles = entries.filter(
    (entry: any) => !entry.isDirectory() && 
    (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) &&
    entry.name !== 'index.md' && 
    entry.name !== 'index.mdx'
  );
  
  for (const file of markdownFiles) {
    const filePath = path.join(dir, file.name);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data } = matter.default(fileContent);
    
    const slug = file.name.replace(/\.(md|mdx)$/, '');
    const relativePath = path.relative(process.cwd(), dir).replace(/\\/g, '/');
    const urlPath = relativePath.replace(/^[^/]+\//, ''); // Remove the first directory (docs)
    
    items.push({
      title: data.title || slug,
      path: `${basePath}/${urlPath ? `${urlPath}/` : ''}${slug}`,
      position: data.position,
    });
  }
  
  // Check for index files
  const indexFiles = entries.filter(
    (entry: any) => !entry.isDirectory() && 
    (entry.name === 'index.md' || entry.name === 'index.mdx')
  );
  
  if (indexFiles.length > 0) {
    const indexFile = indexFiles[0];
    const filePath = path.join(dir, indexFile.name);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data } = matter.default(fileContent);
    
    const relativePath = path.relative(process.cwd(), dir).replace(/\\/g, '/');
    const urlPath = relativePath.replace(/^[^/]+\//, ''); // Remove the first directory (docs)
    
    // Add index file at the beginning
    items.unshift({
      title: data.title || 'Overview',
      path: `${basePath}/${urlPath}`,
      position: data.position,
    });
  }
  
  // Sort items by position if available, then by title
  return items.sort((a, b) => {
    if (a.position !== undefined && b.position !== undefined) {
      return a.position - b.position;
    }
    if (a.position !== undefined) {
      return -1;
    }
    if (b.position !== undefined) {
      return 1;
    }
    return a.title.localeCompare(b.title);
  });
}

/**
 * Client-side stub for navigation
 * @param config The CometDocs configuration
 * @returns Navigation structure
 */
export async function loadNavigation(
  config: CometDocsConfig
): Promise<NavigationItem[]> {
  // This is a mock implementation for client components
  // In a real app, this would fetch data from an API endpoint
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return mock data or fetch from an API
  if (config.navigation.auto) {
    // In a real implementation, this would fetch from an API
    // For now, return a mock structure
    return [
      {
        title: 'Getting Started',
        path: `${config.advanced.basePath}/getting-started`,
      },
      {
        title: 'Guides',
        children: [
          {
            title: 'Installation',
            path: `${config.advanced.basePath}/guides/installation`,
          },
          {
            title: 'Configuration',
            path: `${config.advanced.basePath}/guides/configuration`,
          },
        ],
      },
    ];
  }
  
  // Return custom navigation items if auto is disabled
  return config.navigation.items || [];
} 