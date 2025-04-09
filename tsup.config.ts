export default {
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'next'],
  esbuildOptions(options: any) {
    options.banner = {
      js: `/**
 * CometDocs - A lightweight, zero-config documentation system for Next.js applications
 * 
 * @license MIT
 * @copyright CometDocs Team
 */`,
    };
  },
  treeshake: true,
  minify: true,
  outDir: 'dist',
  injectStyle: false,
  noExternal: ['gray-matter', 'mdx-bundler', 'rehype-autolink-headings', 'rehype-code-titles', 'rehype-prism-plus', 'rehype-slug', 'remark-gfm'],
  target: 'es2018',
  platform: 'browser',
}; 