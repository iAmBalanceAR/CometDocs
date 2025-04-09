'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '../types/navigation';
import { cn } from '../utils/cn';

interface NavTreeProps {
  items: NavItem[];
  level?: number;
  defaultExpanded?: boolean;
}

function NavTree({ items, level = 0, defaultExpanded = false }: NavTreeProps) {
  const pathname = usePathname();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Expand folders by default if specified
    if (defaultExpanded) {
      setExpandedFolders(new Set(items.filter(item => item.isFolder).map(item => item.path)));
    }
  }, [items, defaultExpanded]);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  // Debug log the current pathname
  console.log('Current pathname:', pathname);

  return (
    <div className="">
    <ul className={cn(
      "space-y-0.5",
      level > 0 && "ml-4"
    )}>
      {items.map((item) => {
        const isExpanded = expandedFolders.has(item.path);
        const itemPath = `/docs/${item.path}`;
        const isActive = pathname === itemPath;
        const hasChildren = item.children && item.children.length > 0;

        // Debug log each item's path and active state
        console.log('Item path:', itemPath, 'Active:', isActive);

        return (
          <li key={item.path}>
            {item.isFolder ? (
              <div className="">
                <button
                  onClick={() => toggleFolder(item.path)}
                  className={cn(
                    "flex items-center w-full py-1 text-lg font-mono",
                    isActive
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100",
                    "transition-colors duration-200 group"
                  )}
                >
                  <span className="mt-4 mr-1 text-[14px] opacity-70">
                    {hasChildren && (isExpanded ? '▼' : '▶')}
                  </span>
                  <span className="mt-4 font-medium">{item.title}</span>
                </button>
                {isExpanded && item.children && (
                  <NavTree items={item.children} level={level + 1} defaultExpanded={false} />
                )}
              </div>
            ) : (
              <Link
                href={itemPath}
                className={cn(
                  "block py-1 text-[13px] transition-all duration-200 pl-0",
                  isActive 
                    ? "text-gray-900 dark:text-gray-100 -translate-y-0.5 font-medium" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:-translate-y-0.5",
                  level === 0 && "font-medium"
                )}
              >
                <span className="inline-flex items-center">
                  {level === 0 ? (
                    <svg className="w-3 h-3 mr-1 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 mr-1 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {item.title}
                </span>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
    </div>
  );
}

export function DocsNavigation({ items }: { items: NavItem[] }) {
  return (
    <nav className="py-8 px-4 w-full">
      <NavTree items={items} defaultExpanded={true} />
    </nav>
  );
} 