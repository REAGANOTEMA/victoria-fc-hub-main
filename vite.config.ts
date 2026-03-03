import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// ✅ Import componentTagger only if you use it in development
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",           // LAN + Render dev server access
    port: 8080,
    hmr: { overlay: true }, // show compile/runtime errors in browser
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(), // only in dev
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // allows "@/firebase" imports
    },
  },
  build: {
    outDir: "build",        // ✅ Render expects this folder
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor"; // split vendors
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  define: {
    "process.env": {}, // makes Firebase env variables work in Vite
  },
}));