import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: '/TicAmericas/', // Nombre exacto del repositorio sin acentos
// });

export default defineConfig({
  plugins: [react()],
  base: '/TicAmericas/',  // Nombre del repositorio
  build: {
    outDir: 'build',  // Asegúrate de que se genere en la carpeta 'build'
  },
});
