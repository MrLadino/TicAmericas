// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '',  // Si no estás usando basename
  build: {
    outDir: 'dist',
  },
});
