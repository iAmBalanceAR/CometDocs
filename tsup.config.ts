import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/scripts/setup.ts', 'src/cli.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  shims: true,
  esbuildOptions(options) {
    options.banner = {
      js: '#!/usr/bin/env node',
    };
  },
}); 