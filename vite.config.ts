import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // allows LAN/Render dev server access
    port: 8080,
    hmr: {
      overlay: true, // show errors in browser
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // allows imports like "@/firebase"
    },
  },
  build: {
    outDir: "dist", // Render expects the publish directory to exist
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // separate big libraries for faster caching
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 2000, // optional, avoids annoying warnings
  },
  css: {
    preprocessorOptions: {
      // Add SCSS, Less, or PostCSS options if needed
    },
  },
  define: {
    "process.env": {}, // ensures env variables work with Firebase in Vite
  },
}));