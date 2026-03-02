import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // allows Render dev server
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // absolute imports like "@/firebase"
    },
  },
  build: {
    outDir: "build", // important for Render hosting
    rollupOptions: {
      output: {
        manualChunks(id) {
          // optional: separate big libraries for faster loading
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000, // increases chunk warning limit (optional)
  },
  css: {
    preprocessorOptions: {
      // if you use SCSS or other preprocessors
    },
  },
}));