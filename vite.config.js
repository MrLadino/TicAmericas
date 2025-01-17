import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/TicAmericas/",  // Esto es para GitHub Pages
  build: {
    outDir: "dist", // Salida de los archivos de build
  },
});
