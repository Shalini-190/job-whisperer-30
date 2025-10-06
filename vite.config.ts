import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "./", // ✅ Important for Render static hosting
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()], // ✅ Removed lovable-tagger for Render compatibility
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

