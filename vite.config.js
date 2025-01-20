import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "development" ? "/" : "/TicAmericas/", // Base dinámica para desarrollo y producción
  build: {
    outDir: "dist", // Directorio de salida
  },
}));
