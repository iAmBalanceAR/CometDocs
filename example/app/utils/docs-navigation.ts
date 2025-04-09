import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NavItem, SectionConfig, ParsedMarkdownMeta } from '../types/navigation';

const DOCS_DIR = path.join(process.cwd(), 'docs', 'en');

function parseMarkdownFile(filePath: string): ParsedMarkdownMeta {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Pre-process the content to fix common YAML formatting issues
    const fixedContent = content.replace(/^(\w+):(\d+)\s*$/gm, '$1: $2');
    const { data, content: markdownContent } = matter(fixedContent);
    
    const firstHeaderMatch = markdownContent.match(/^#\s+(.+)$/m) || markdownContent.match(/^##\s+(.+)$/m);
    
    return {
      title: data.title?.trim(),
      position: typeof data.position === 'number' ? data.position : parseInt(String(data.position).trim(), 10) || 999,
      firstHeader: firstHeaderMatch?.[1]?.trim()
    };
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error);
    return {
      position: 999
    };
  }
}

function readSectionConfig(folderPath: string): SectionConfig | null {
  try {
    const configPath = path.join(folderPath, 'section.json');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch {
    return null;
  }
}

export function buildNavigation(basePath: string = DOCS_DIR, relativePath: string = ''): NavItem[] {
  const currentPath = path.join(basePath, relativePath);
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });
  const navItems: NavItem[] = [];

  for (const entry of entries) {
    const entryPath = path.join(relativePath, entry.name);
    const fullPath = path.join(basePath, entryPath);

    if (entry.isDirectory()) {
      const sectionConfig = readSectionConfig(fullPath);
      if (sectionConfig) {
        const children = buildNavigation(basePath, entryPath);
        navItems.push({
          title: sectionConfig.title,
          position: sectionConfig.position,
          path: entryPath,
          children: children.sort((a, b) => a.position - b.position),
          isFolder: true
        });
      }
    } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const meta = parseMarkdownFile(fullPath);
      const title = meta.title || meta.firstHeader || entry.name.replace('.md', '');
      navItems.push({
        title,
        position: meta.position || 999,
        path: entryPath.replace('.md', ''),
        children: []
      });
    }
  }

  return navItems.sort((a, b) => a.position - b.position);
} 