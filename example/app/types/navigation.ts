export interface SectionConfig {
  title: string;
  position: number;
  collapsed?: boolean;
}

export interface NavItem {
  title: string;
  position: number;
  path: string;
  children?: NavItem[];
  isFolder?: boolean;
}

export interface ParsedMarkdownMeta {
  title?: string;
  position?: number;
  firstHeader?: string;
} 