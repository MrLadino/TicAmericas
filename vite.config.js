import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/TicAmericas/', // Nombre exacto del repositorio sin acentos
});
