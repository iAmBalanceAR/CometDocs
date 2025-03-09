// Export the main component
export { default as CometDocs } from './components/CometDocs';

// Export types
export type { CometDocsProps } from './types';
export type { CometDocsConfig } from './types/config';
export type { Doc, DocMetadata, TableOfContents, TocItem } from './utils/docs';

// Export utilities
export { getCometDocsConfig, defaultConfig } from './utils/config';
export { generateTableOfContents } from './utils/docs'; 