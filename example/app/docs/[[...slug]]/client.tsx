'use client';

import React from 'react';
import { CometDocs, CometDocsConfig } from 'cometdocs';

interface DocsClientProps {
  slug: string;
  config: CometDocsConfig;
}

export default function DocsClient({ slug, config }: DocsClientProps) {
  return <CometDocs slug={slug} config={config} />;
} 