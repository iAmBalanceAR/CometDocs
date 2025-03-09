import { CometDocsConfig } from '../types/config';

/**
 * Default configuration for CometDocs
 */
export const defaultConfig: CometDocsConfig = {
  content: {
    dir: './docs',
    defaultLocale: 'en',
  },
  theme: {
    inherit: true,
    colors: {
      primary: '#3490dc',
      secondary: '#718096',
      accent: '#f6ad55',
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

/**
 * Deep merge utility for configuration objects
 */
function deepMerge<T extends Record<string, any>>(target: T, source?: Partial<T>): T {
  if (!source) return { ...target };
  
  const result = { ...target } as T;
  
  Object.keys(source).forEach((key) => {
    const k = key as keyof typeof source;
    const sourceValue = source[k];
    const targetValue = target[k as keyof T];
    
    if (
      sourceValue && 
      targetValue && 
      typeof sourceValue === 'object' && 
      typeof targetValue === 'object' &&
      !Array.isArray(sourceValue) &&
      !Array.isArray(targetValue)
    ) {
      result[k as keyof T] = deepMerge(
        targetValue as Record<string, any>, 
        sourceValue as Record<string, any>
      ) as any;
    } else if (sourceValue !== undefined) {
      result[k as keyof T] = sourceValue as any;
    }
  });
  
  return result;
}

/**
 * Get the CometDocs configuration
 * @param customConfig Optional custom configuration to override the default config
 * @returns The merged configuration
 */
export function getCometDocsConfig(customConfig?: Partial<CometDocsConfig>): CometDocsConfig {
  return deepMerge(defaultConfig, customConfig);
}

// Note: Server-side configuration loading is handled in a separate file
// to avoid TypeScript errors related to Node.js modules in browser environments 