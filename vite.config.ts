import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "", // ensures HashRouter works on static hosting
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  plugins: [react()],
  build: {
    outDir: "build",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  define: { "process.env": {} },
});