import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
          target: 'https://wealthm-ai-api.waiker.ai',
          changeOrigin: true,
        },
        '/iapi': {
          target: env.VITE_IAPI_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/iapi/, ''),
        },
        '/oapi': {
          target: env.VITE_OAPI_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/oapi/, ''),
        },
      },
    },
    css: {
      devSourcemap: true,
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});
