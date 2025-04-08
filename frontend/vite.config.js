import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure the output directory is "dist"
    chunkSizeWarningLimit: 2000, // Adjust chunk size limit for large bundles
  },
  server: {
  },
});
