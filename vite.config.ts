// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ✅ Final Vite config for Render
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // LAN + Render dev server access
    port: 8080,
    hmr: {
      overlay: true, // show compile/runtime errors in browser
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // absolute imports like "@/firebase"
    },
  },
  build: {
    outDir: "build", // ✅ Render requires "build" folder
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
  css: {
    preprocessorOptions: {
      // SCSS or PostCSS options if needed
    },
  },
  define: {
    "process.env": {}, // makes Firebase env variables compatible in Vite
  },
}));