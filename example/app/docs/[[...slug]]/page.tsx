import { getDocContent } from '@/app/utils/docs';
import ClientPage from './client-page';
import { Metadata } from 'next';
import { buildNavigation } from '@/app/utils/docs-navigation';

// Custom configuration
const config = {
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
    auto: false,
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

// Helper function to safely get the slug string
function getSlugString(slug?: string[]): string {
  if (!slug || slug.length === 0) {
    return 'guides/getting-started';
  }
  
  // If the slug is "getting-started", redirect to "guides/getting-started"
  if (slug.length === 1 && slug[0] === 'getting-started') {
    return 'guides/getting-started';
  }
  
  return slug.join('/');
}

// Define the props type to match what Next.js expects
type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function DocsPage({ params }: { params: { slug?: string[] } }) {
  try {
    // Get the slug string using the helper function
    const slugString = getSlugString(params?.slug);
    
    // Get the document content
    const docContent = await getDocContent(slugString);
    
    // Build the navigation items (now synchronous)
    const navigationItems = buildNavigation();
    
    return (
      <ClientPage 
        slug={slugString} 
        initialContent={docContent?.content || ''} 
        initialTitle={docContent?.title || ''} 
        tableOfContents={docContent?.tableOfContents || []}
        frontmatter={docContent?.frontmatter}
        config={{
          navigation: {
            items: navigationItems
          }
        }} 
      />
    );
  } catch (error) {
    console.error('Error in DocsPage:', error);
    return <div>Error loading documentation</div>;
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  // Await the params Promise
  const params = await props.params;
  const slugString = getSlugString(params.slug);
  
  // Extract the last part of the slug for the title
  const parts = slugString.split('/');
  const lastPart = parts[parts.length - 1];
  const displaySlug = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  
  return {
    title: `${displaySlug} | CometDocs`,
    description: 'Documentation powered by CometDocs',
  };
} 