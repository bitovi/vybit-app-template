import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: ["VITE_", "CODESPACE_", "GITHUB_CODESPACES_"],
  resolve: {
    alias: {
      "@model": path.resolve(__dirname, "../model"),
    },
  },
});
