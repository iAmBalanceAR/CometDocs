'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  slug: string;
}

export function Breadcrumbs({ slug }: BreadcrumbsProps) {
  const parts = slug.split('/');
  const breadcrumbs = parts.map((part, index) => {
    const path = parts.slice(0, index + 1).join('/');
    const displayName = part.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      name: displayName,
      path: `/docs/${path}`,
      isLast: index === parts.length - 1
    };
  });

  return (
    <nav className="ml-[-24px] ">
      <ol className=" bg-[#1E2030] pr-[22px]  rounded-md w-fit border-[1px] border-gray-200 dark:border-gray-700 pt-1 pl-[22px] flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {index > 0 && (
              <span className="text-gray-400 dark:text-gray-600">/</span>
            )}
            <li>
              {crumb.isLast ? (
                <span className="text-gray-900 dark:text-gray-100">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
} 