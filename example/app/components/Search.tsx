'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Command } from 'cmdk';

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
  section?: string;
}

export function Search() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Toggle the menu when ⌘K / Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Mock search results - replace with real search implementation
  const getResults = useCallback((query: string): SearchResult[] => {
    if (!query) return [];
    
    // Mock results - replace with actual search logic
    return [
      {
        title: 'Getting Started',
        path: '/docs/guides/getting-started',
        excerpt: 'Learn how to get started with CometDocs...',
        section: 'Guides'
      },
      {
        title: 'Installation',
        path: '/docs/guides/installation',
        excerpt: 'Install CometDocs in your Next.js project...',
        section: 'Guides'
      },
      // Add more mock results
    ].filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center w-96 px-4 py-2.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-200 dark:border-gray-800 rounded-lg transition-colors duration-200 bg-gray-50 dark:bg-gray-900"
      >
        <svg
          className="w-4 h-4 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="flex-1 text-left">Search documentation...</span>
        <span className="ml-auto text-xs opacity-60">⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 p-4 pt-[20vh] bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="max-w-2xl mx-auto overflow-hidden rounded-xl shadow-2xl"
            >
              <Command
                className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                loop
              >
                <div className="flex items-center border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center flex-1 px-4">
                    <svg
                      className="w-5 h-5 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <Command.Input
                      autoFocus
                      placeholder="Search documentation..."
                      className="flex-1 px-4 py-3 text-base bg-transparent outline-none"
                      value={search}
                      onValueChange={setSearch}
                    />
                  </div>
                  <button
                    className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    ESC
                  </button>
                </div>
                <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    No results found.
                  </Command.Empty>
                  {getResults(search).map((result) => (
                    <Command.Item
                      key={result.path}
                      value={result.path}
                      onSelect={() => {
                        router.push(result.path);
                        setOpen(false);
                      }}
                      className="px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {result.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {result.section} • {result.excerpt}
                          </div>
                        </div>
                        <div className="ml-4">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-blue-600 dark:text-blue-400"
                          >
                            →
                          </motion.div>
                        </div>
                      </div>
                    </Command.Item>
                  ))}
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 