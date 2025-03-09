import ClientPage from './client-page';

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
    auto: true,
    items: [
      {
        title: 'Getting Started',
        path: '/docs/guides/getting-started',
      },
      {
        title: 'Guides',
        path: '/docs/guides',
        children: [
          {
            title: 'Installation',
            path: '/docs/guides/installation',
          },
          {
            title: 'Configuration',
            path: '/docs/guides/configuration',
          },
        ],
      },
    ],
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

export default async function DocsPage({ params }: { params: { slug?: string[] } }) {
  // Get the slug string safely
  const slugParams = await params;
  const slugString = getSlugString(slugParams.slug);
  
  return <ClientPage slug={slugString} config={config} />;
}

export async function generateMetadata({ params }: { params: { slug?: string[] } }) {
  // Get the slug string safely
  const slugParams = await params;
  const slugString = getSlugString(slugParams.slug);
  
  // Extract the last part of the slug for the title
  const parts = slugString.split('/');
  const lastPart = parts[parts.length - 1];
  const displaySlug = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  
  return {
    title: `${displaySlug} | CometDocs`,
    description: 'Documentation powered by CometDocs',
  };
} 