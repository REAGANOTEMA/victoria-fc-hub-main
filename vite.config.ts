import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // allows "@/firebase", "@/pages", etc.
    },
  },
  server: {
    port: 5173,         // default Vite port
    strictPort: true,   // fail if port is taken
    open: true,         // opens browser automatically
    hmr: { overlay: true }, // show errors in browser overlay
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
  },
  define: {
    "process.env": process.env, // so import.meta.env works with Firebase keys
  },
});