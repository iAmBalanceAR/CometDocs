import React, { ReactNode } from 'react';
import { CometDocsConfig } from './config';
import { DocMetadata } from '../utils/docs';

/**
 * Props for the CometDocs component
 */
export interface CometDocsProps {
  /**
   * The slug of the current page
   * @example 'getting-started' or 'guides/installation'
   */
  slug?: string | string[];
  
  /**
   * Optional custom configuration to override the default config
   */
  config?: Partial<CometDocsConfig>;
  
  /**
   * Optional custom components to override the default components
   */
  components?: {
    Layout?: React.ComponentType<{ children: ReactNode; metadata?: DocMetadata }>;
    Sidebar?: React.ComponentType;
    TOC?: React.ComponentType;
    Pagination?: React.ComponentType;
    Search?: React.ComponentType;
  };
} 