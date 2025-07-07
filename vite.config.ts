import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 7005,
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      port: 5173,
      overlay: true,
    },
    proxy: {
      '/p1': {
        // target: 'http://10.40.12.128:15014',
        target: 'https://wealthm-ai-api.waiker.ai',
        changeOrigin: true,
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
