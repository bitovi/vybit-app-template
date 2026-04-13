import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: ["VITE_", "CODESPACE_", "GITHUB_CODESPACES_"],
  server: {
    proxy: {
      "/overlay.js": {
        target: "http://127.0.0.1:3333",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            proxyRes.headers["content-type"] = "application/javascript";
          });
        },
      },
    },
  },
  resolve: {
    alias: {
      "@model": path.resolve(__dirname, "../model"),
    },
  },
});
