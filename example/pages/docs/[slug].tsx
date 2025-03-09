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
    items: [
      {
        title: 'Getting Started',
        path: '/docs/getting-started',
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

interface DocsPageProps {
  slug: string;
}

export default function DocsPage({ slug }: DocsPageProps) {
  return <CometDocs slug={slug} config={config} />;
}

export const getStaticProps: GetStaticProps<DocsPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  return {
    props: {
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real implementation, this would fetch all available docs
  // For now, we'll just return a few example paths
  const paths = [
    { params: { slug: 'getting-started' } },
    { params: { slug: 'guides' } },
    { params: { slug: 'guides/installation' } },
    { params: { slug: 'guides/configuration' } },
  ];
  
  return {
    paths,
    fallback: 'blocking',
  };
}; 