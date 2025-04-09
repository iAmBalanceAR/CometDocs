import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface DocContent {
  title: string;
  content: string;
  frontmatter: any;
  tableOfContents: Array<{ id: string; text: string; level: number }>;
}

function extractTableOfContents(content: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const tokens = marked.lexer(content);
  
  tokens.forEach(token => {
    if (token.type === 'heading') {
      const text = token.text;
      const level = token.depth;
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headings.push({ id, text, level });
    }
  });
  
  return headings;
}

export async function getDocContent(slug: string): Promise<DocContent | null> {
  try {
    // Convert slug to file path
    const filePath = path.join(process.cwd(), 'docs/en', `${slug.replace(/\//g, path.sep)}.md`);
    console.log('Attempting to read file:', filePath);
    
    // Read the markdown file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(fileContent);
    
    // Extract table of contents
    const tableOfContents = extractTableOfContents(content);
    
    // Add IDs to headings in the content
    let processedContent = content;
    tableOfContents.forEach(({ text, id }) => {
      const regex = new RegExp(`^(#+)\\s*${text}\\s*$`, 'gm');
      processedContent = processedContent.replace(regex, `$1 ${text}\n<a id="${id}"></a>`);
    });
    
    // Render markdown to HTML synchronously
    const renderedContent = marked.parse(processedContent, { async: false }) as string;
    
    return {
      title: frontmatter.title || '',
      content: renderedContent,
      frontmatter,
      tableOfContents
    };
  } catch (error) {
    console.error(`Error reading doc file for slug ${slug}:`, error);
    return null;
  }
}

export async function getAllDocs(): Promise<string[]> {
  const docsDir = path.join(process.cwd(), 'docs/en');
  const slugs: string[] = [];

  function traverse(dir: string, base: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(base, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Remove .md extension and convert path separators to forward slashes
        const slug = relativePath.slice(0, -3).replace(/\\/g, '/');
        slugs.push(slug);
      }
    }
  }

  try {
    traverse(docsDir);
    return slugs;
  } catch (error) {
    console.error('Error getting all docs:', error);
    return [];
  }
} 