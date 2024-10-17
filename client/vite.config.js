import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',   // No hash for asset files
        chunkFileNames: 'assets/[name].js',         // No hash for chunk files
        entryFileNames: 'assets/[name].js',         // No hash for entry files
      },
    },
  },
  base: './',  // This ensures relative paths
});
