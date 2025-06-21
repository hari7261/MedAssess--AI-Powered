import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {
      external: ['zwitch'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    }
  },
  optimizeDeps: {
    include: ['zwitch', 'mdast-util-to-markdown']
  },
  server: {
    port: 3000,
    open: true,
  },
});