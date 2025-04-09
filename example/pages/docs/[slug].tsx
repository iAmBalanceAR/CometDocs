import { GetStaticPaths, GetStaticProps } from 'next';
import { CometDocs, CometDocsConfig } from '../../..';

// Custom configuration
const config: CometDocsConfig = {
  content: {
    dir: './docs',
    defaultLocale: 'en',
  },
  theme: {
    inherit: true,
    colors: {
      primary: '#6366f1', // Indigo
      secondary: '#8b5cf6', // Violet
      accent: '#ec4899', // Pink
    },
    layout: 'sidebar',
    darkMode: 'system',
  },
  navigation: {
    auto: true,
    items: [],
  },
  advanced: {
    basePath: '/docs',
    search: {
      enabled: true,
      type: 'local',
      algolia: {
        appId: '',
        apiKey: '',
        indexName: '',
      },
    },
    codeHighlighting: true,
  },
};

interface DocsPageProps {
  slug: string;
  navigation: any[]; // Add navigation to props
}

export default function DocsPage({ slug, navigation }: DocsPageProps) {
  console.log('DocsPage rendering with navigation:', navigation);
  console.log('Navigation length:', navigation?.length || 0);
  
  // Create a copy of the config with the dynamic navigation
  const pageConfig = {
    ...config,
    navigation: {
      auto: false, // Disable auto navigation to ensure we use the provided items
      items: navigation || [], // Use the dynamically generated navigation
    },
  };
  
  console.log('Page config navigation:', pageConfig.navigation);
  
  return <CometDocs slug={slug} config={pageConfig} />;
}

// Function to ensure a value is serializable for getStaticProps
const ensureSerializable = (obj: any): any => {
  if (obj === undefined || obj === null) {
    return null;
  }
  
  if (typeof obj === 'function' || typeof obj === 'symbol' || typeof obj === 'bigint') {
    return null;
  }
  
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map(ensureSerializable);
    }
    
    const result: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = ensureSerializable(obj[key]);
      }
    }
    return result;
  }
  
  return obj;
};

export const getStaticProps: GetStaticProps<DocsPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');
  
  // Get the docs directory
  const docsDir = path.join(process.cwd(), 'docs', 'en');
  
  // Function to recursively get all markdown files
  const getAllMarkdownFiles = (dir: string): string[] => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    const markdownFiles = files
      .filter((file: any) => !file.isDirectory() && (file.name.endsWith('.md') || file.name.endsWith('.mdx')))
      .map((file: any) => path.join(dir, file.name));
    
    const directories = files.filter((file: any) => file.isDirectory());
    
    const nestedFiles = directories.flatMap((directory: any) => 
      getAllMarkdownFiles(path.join(dir, directory.name))
    );
    
    return [...markdownFiles, ...nestedFiles];
  };
  
  // Function to build navigation structure from file paths
  const buildNavigation = (markdownFiles: string[]) => {
    // Map to store sections and their children
    const sections: Record<string, any> = {};
    
    // First, process all directories to ensure they're in the navigation
    try {
      const directories = fs.readdirSync(docsDir, { withFileTypes: true })
        .filter((dirent: any) => dirent.isDirectory());
      
      // Create a section for each directory
      directories.forEach((directory: any) => {
        const dirName = directory.name;
        
        // Skip hidden directories
        if (dirName.startsWith('.')) {
          return;
        }
        
        // Try to find a section.json file for metadata
        try {
          const sectionJsonPath = path.join(docsDir, dirName, 'section.json');
          const sectionData = JSON.parse(fs.readFileSync(sectionJsonPath, 'utf8'));
          
          // Ensure position is a number or null
          const position = typeof sectionData.position === 'number' ? sectionData.position : null;
          
          sections[dirName] = {
            title: sectionData.title || dirName.charAt(0).toUpperCase() + dirName.slice(1),
            path: `/docs/${dirName}`,
            children: [],
            position,
            collapsed: sectionData.collapsed === true,
          };
        } catch (error) {
          // No section.json, use default
          sections[dirName] = {
            title: dirName.charAt(0).toUpperCase() + dirName.slice(1),
            path: `/docs/${dirName}`,
            children: [],
            position: null,
          };
        }
      });
    } catch (error) {
      console.error('Error processing directories:', error);
    }
    
    // Process each markdown file
    markdownFiles.forEach(filePath => {
      // Get the relative path from the docs/en directory
      const relativePath = path.relative(docsDir, filePath);
      
      // Remove the file extension
      const slugPath = relativePath.replace(/\.(md|mdx)$/, '');
      
      // Replace backslashes with forward slashes (for Windows)
      const normalizedPath = slugPath.replace(/\\/g, '/');
      
      // Get the file content to extract metadata
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      const title = data.title || path.basename(normalizedPath);
      
      // Ensure position is a number or null
      const position = typeof data.position === 'number' ? data.position : null;
      
      // Split the path into segments
      const segments = normalizedPath.split('/');
      
      if (segments.length === 1) {
        // Top-level item (not in a directory)
        if (normalizedPath !== 'index') { // Skip the root index file
          // Create a special "Root" section if it doesn't exist
          if (!sections['root']) {
            sections['root'] = {
              title: 'Documentation',
              path: '/docs',
              children: [],
              position: -1, // Ensure it appears first
            };
          }
          
          // Add to the root section
          sections['root'].children.push({
            title,
            path: `/docs/${normalizedPath}`,
            position,
          });
        }
      } else {
        // Item in a directory
        const sectionKey = segments[0];
        
        // Skip index files for now (we'll process them later)
        if (segments.length === 2 && segments[1] === 'index') {
          return;
        }
        
        // Create the section if it doesn't exist (shouldn't happen since we processed directories first)
        if (!sections[sectionKey]) {
          sections[sectionKey] = {
            title: sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1),
            path: `/docs/${sectionKey}`,
            children: [],
          };
        }
        
        // Add the child item
        sections[sectionKey].children.push({
          title,
          path: `/docs/${normalizedPath}`,
          position,
        });
      }
    });
    
    // Process index files to update section titles and paths
    markdownFiles.forEach(filePath => {
      const relativePath = path.relative(docsDir, filePath);
      const slugPath = relativePath.replace(/\.(md|mdx)$/, '');
      const normalizedPath = slugPath.replace(/\\/g, '/');
      
      // Only process index files
      if (normalizedPath.endsWith('/index')) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        // Get the section key
        const sectionKey = normalizedPath.split('/')[0];
        
        // Update the section title if it exists
        if (sections[sectionKey] && data.title) {
          sections[sectionKey].title = data.title;
        }
      }
    });
    
    // Sort children within each section
    Object.values(sections).forEach((section: any) => {
      if (section.children && section.children.length > 0) {
        section.children.sort((a: any, b: any) => {
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
    });
    
    // Convert the sections map to an array and sort
    const navigationItems = Object.values(sections)
      .filter((section: any) => section.children.length > 0 || section.path !== '/docs') // Remove empty sections except root
      .sort((a: any, b: any) => {
        // Special case: root section always comes first
        if (a.path === '/docs') return -1;
        if (b.path === '/docs') return 1;
        
        // Sort by position if available
        if (a.position !== undefined && b.position !== undefined) {
          return a.position - b.position;
        }
        if (a.position !== undefined) {
          return -1;
        }
        if (b.position !== undefined) {
          return 1;
        }
        
        // Otherwise sort alphabetically
        return a.title.localeCompare(b.title);
      });
    
    // Ensure all values are serializable
    return ensureSerializable(navigationItems);
  };
  
  try {
    // Get all markdown files
    const markdownFiles = getAllMarkdownFiles(docsDir);
    
    // Build navigation structure
    const navigation = buildNavigation(markdownFiles);
    
    console.log('Generated navigation:', JSON.stringify(navigation, null, 2));
    
    return {
      props: {
        slug,
        navigation: ensureSerializable(navigation),
      },
    };
  } catch (error) {
    console.error('Error generating navigation:', error);
    
    // Fallback to empty navigation if there's an error
    return {
      props: {
        slug,
        navigation: [],
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Dynamically generate paths from the file system
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  // Get the docs directory
  const docsDir = path.join(process.cwd(), 'docs', 'en');
  
  // Function to recursively get all markdown files
  const getAllMarkdownFiles = (dir: string): string[] => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    const markdownFiles = files
      .filter((file: any) => !file.isDirectory() && (file.name.endsWith('.md') || file.name.endsWith('.mdx')))
      .map((file: any) => path.join(dir, file.name));
    
    const directories = files.filter((file: any) => file.isDirectory());
    
    const nestedFiles = directories.flatMap((directory: any) => 
      getAllMarkdownFiles(path.join(dir, directory.name))
    );
    
    return [...markdownFiles, ...nestedFiles];
  };
  
  try {
    // Get all markdown files
    const markdownFiles = getAllMarkdownFiles(docsDir);
    
    // Convert file paths to slugs
    const paths = markdownFiles.map(filePath => {
      // Get the relative path from the docs/en directory
      const relativePath = path.relative(docsDir, filePath);
      
      // Remove the file extension
      const slugPath = relativePath.replace(/\.(md|mdx)$/, '');
      
      // Replace backslashes with forward slashes (for Windows)
      const normalizedPath = slugPath.replace(/\\/g, '/');
      
      // Handle index files
      const slug = normalizedPath === 'index' ? '' : normalizedPath;
      
      return { params: { slug } };
    });
    
    console.log('Generated paths:', paths);
    
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    
    // Fallback to hardcoded paths if there's an error
    return {
      paths: [
        { params: { slug: 'getting-started' } },
        { params: { slug: 'guides' } },
        { params: { slug: 'guides/installation' } },
        { params: { slug: 'guides/configuration' } },
      ],
      fallback: 'blocking',
    };
  }
}; 