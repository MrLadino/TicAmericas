import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/TicAméricas/', // Asegúrate de incluir las barras al inicio y al final
})
