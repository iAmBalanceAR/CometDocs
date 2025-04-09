'use client';

import React, { useEffect, useState } from 'react';

interface TableOfContentsProps {
  content: string;
  headings: Array<{ id: string; text: string; level: number }>;
  synopsis?: string;
}

export function TableOfContents({ content, headings, synopsis }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px'
      }
    );

    // Observe all section headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Update URL hash without scrolling
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <div className="w-48 pl-4 pr-2 py-8 ml-8 mt-[-16px] border-l border-gray-200 dark:border-gray-800">
      {synopsis && (
        <div className="mb-6">
          <h4 className="border border-gray-200 dark:border-gray-700 bg-[#1E2030] rounded-md pl-[6px] mb-3 pb-1 text-[16px] font-medium text-gray-500 dark:text-gray-400">
            Synopsis:
          </h4>
          <p className="width-full text-[12px] text-gray-600 dark:text-gray-500">
            {synopsis}
          </p>
        </div>
      )}
      
      <div className="sticky top-24">
      <h4 className="border border-gray-200 dark:border-gray-700 bg-[#1E2030] rounded-md pl-[6px] mb-1 pb-1 text-[16px] font-medium text-gray-500 dark:text-gray-400">
        On This Page:
      </h4>
        
        <nav className="space-y-1 width-full pt-2">
          {headings
            .filter(heading => heading.level === 2)
            .map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block text-sm py-1 transition-colors duration-200
                  ${activeId === heading.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}
                `}
              >
                {heading.text}
              </a>
            ))}
        </nav>
      </div>
    </div>
  );
} 