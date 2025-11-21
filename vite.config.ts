import path from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import babel from 'vite-plugin-babel';
import { reactRouter } from '@react-router/dev/vite';

// IMPORTANT:
// All server-only plugins removed for Vercel compatibility.

export default defineConfig({
  envPrefix: 'NEXT_PUBLIC_',

  optimizeDeps: {
    include: ['fast-glob', 'lucide-react'],
    exclude: ['fsevents', 'lightningcss']
  },

  plugins: [
    reactRouter(),

    babel({
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: /node_modules/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ['styled-jsx/babel']
      }
    }),

    tsconfigPaths({
      ignoreConfigErrors: true,
      projects: [path.resolve(__dirname, 'tsconfig.json')]
    })
  ],

  resolve: {
    alias: {
      lodash: 'lodash-es',
      '@': path.resolve(__dirname, 'src')
    },
    dedupe: ['react', 'react-dom']
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true
  }
});
