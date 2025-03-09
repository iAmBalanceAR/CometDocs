import { CometDocsConfig } from '../types/config';
import { Doc, DocMetadata, generateTableOfContents } from './docs';

/**
 * Get a document by slug
 * @param slug The document slug
 * @param config The CometDocs configuration
 * @param locale The locale to use
 * @returns The document or null if not found
 */
export async function getDocBySlug(
  slug: string,
  config: CometDocsConfig,
  locale?: string
): Promise<Doc | null> {
  try {
    // Using dynamic imports for Node.js modules
    const path = await import('path');
    const fs = await import('fs/promises');
    const matter = await import('gray-matter');
    
    // Determine the locale to use
    const docLocale = locale || config.content.defaultLocale;
    
    // Build the path to the document
    const docPath = path.join(
      process.cwd(),
      config.content.dir,
      docLocale,
      `${slug}.md`
    );
    
    // Check if the file exists
    try {
      await fs.access(docPath);
    } catch (error) {
      // Try with .mdx extension
      const mdxPath = docPath.replace(/\.md$/, '.mdx');
      try {
        await fs.access(mdxPath);
        // If we get here, the .mdx file exists
        const fileContent = await fs.readFile(mdxPath, 'utf8');
        const { data, content } = matter.default(fileContent);
        
        const metadata: DocMetadata = {
          ...data,
          slug,
          locale: docLocale,
          path: mdxPath,
        };
        
        const toc = generateTableOfContents(content);
        
        return {
          metadata,
          content,
          toc,
        };
      } catch (mdxError) {
        // Neither .md nor .mdx file exists
        return null;
      }
    }
    
    // Read the file content
    const fileContent = await fs.readFile(docPath, 'utf8');
    const { data, content } = matter.default(fileContent);
    
    const metadata: DocMetadata = {
      ...data,
      slug,
      locale: docLocale,
      path: docPath,
    };
    
    const toc = generateTableOfContents(content);
    
    return {
      metadata,
      content,
      toc,
    };
  } catch (error) {
    console.error('Error getting document by slug:', error);
    return null;
  }
}

/**
 * Get all documents
 * @param config The CometDocs configuration
 * @param locale The locale to use
 * @returns An array of documents
 */
export async function getAllDocs(
  config: CometDocsConfig,
  locale?: string
): Promise<Doc[]> {
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
      return [];
    }
    
    // Get all files in the directory
    const files = await fs.readdir(docsDir);
    
    // Filter for markdown files
    const markdownFiles = files.filter(
      (file) => file.endsWith('.md') || file.endsWith('.mdx')
    );
    
    // Read all files
    const docs = await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = path.join(docsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter.default(fileContent);
        
        const slug = file.replace(/\.(md|mdx)$/, '');
        
        const metadata: DocMetadata = {
          ...data,
          slug,
          locale: docLocale,
          path: filePath,
        };
        
        const toc = generateTableOfContents(content);
        
        return {
          metadata,
          content,
          toc,
        };
      })
    );
    
    return docs;
  } catch (error) {
    console.error('Error getting all documents:', error);
    return [];
  }
} 