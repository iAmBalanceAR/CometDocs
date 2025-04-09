import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { NavigationItem } from '../../../src/types/config';

interface SectionMetadata {
  title: string;
  position?: number;
  collapsed?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get configuration from request or use defaults
    const { locale = 'en', basePath = '/docs' } = req.query;
    console.log('API: Building navigation for locale:', locale, 'basePath:', basePath);

    // Build the path to the documents directory
    const docsDir = path.join(
      process.cwd(),
      'example/docs/en',
      locale as string
    );
    console.log('API: Docs directory:', docsDir);

    // Check if the directory exists
    try {
      await fs.access(docsDir);
    } catch (error) {
      // Directory doesn't exist
      console.error(`Docs directory not found: ${docsDir}`);
      return res.status(404).json({ error: 'Docs directory not found' });
    }

    // Get the root directory path for relative path calculations
    const rootDir = path.join(process.cwd(), 'example/docs/en');

    // Build navigation tree
    const navigation = await buildNavigationTree(
      docsDir, 
      basePath as string, 
      rootDir, 
      locale as string
    );
    console.log('API: Navigation built:', JSON.stringify(navigation, null, 2));

    // Return the navigation structure
    return res.status(200).json(navigation);
  } catch (error) {
    console.error('Error building navigation:', error);
    return res.status(500).json({ error: 'Failed to build navigation' });
  }
}

/**
 * Build a navigation tree from a directory
 */
async function buildNavigationTree(
  dir: string,
  basePath: string,
  rootDir: string,
  locale: string
): Promise<NavigationItem[]> {
  // Get all files and directories
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  // Array to store navigation items
  const items: NavigationItem[] = [];
  
  // Process directories first to get section metadata
  const directories = entries.filter(entry => entry.isDirectory());
  
  for (const directory of directories) {
    const dirPath = path.join(dir, directory.name);
    
    // Calculate the URL path relative to the locale directory
    const relativePath = path.relative(rootDir, dirPath).replace(/\\/g, '/');
    // Remove the locale part from the path if it exists
    const urlPath = relativePath.startsWith(locale) 
      ? relativePath.substring(locale.length + 1) // +1 for the slash
      : relativePath;
    
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
    const children = await buildNavigationTree(dirPath, basePath, rootDir, locale);
    
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
    entry => !entry.isDirectory() && 
    (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) &&
    entry.name !== 'index.md' && 
    entry.name !== 'index.mdx'
  );
  
  for (const file of markdownFiles) {
    const filePath = path.join(dir, file.name);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    const slug = file.name.replace(/\.(md|mdx)$/, '');
    
    // Calculate the URL path relative to the locale directory
    const relativePath = path.relative(rootDir, dir).replace(/\\/g, '/');
    // Remove the locale part from the path if it exists
    const urlPath = relativePath.startsWith(locale) 
      ? relativePath.substring(locale.length + 1) // +1 for the slash
      : relativePath;
    
    items.push({
      title: data.title || slug,
      path: `${basePath}/${urlPath ? `${urlPath}/` : ''}${slug}`,
      position: data.position,
    });
  }
  
  // Check for index files
  const indexFiles = entries.filter(
    entry => !entry.isDirectory() && 
    (entry.name === 'index.md' || entry.name === 'index.mdx')
  );
  
  if (indexFiles.length > 0) {
    const indexFile = indexFiles[0];
    const filePath = path.join(dir, indexFile.name);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    // Calculate the URL path relative to the locale directory
    const relativePath = path.relative(rootDir, dir).replace(/\\/g, '/');
    // Remove the locale part from the path if it exists
    const urlPath = relativePath.startsWith(locale) 
      ? relativePath.substring(locale.length + 1) // +1 for the slash
      : relativePath;
    
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