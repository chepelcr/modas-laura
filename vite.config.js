import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
const pages = [
  "index.html",
  "historia/index.html",
  "archivo/index.html",
  "privacidad/index.html",
  "404.html",
  "en/index.html",
  "en/history/index.html",
  "en/archive/index.html",
  "en/privacy/index.html",
  "en/404.html",
];
export default defineConfig(({ isSsrBuild }) => ({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: isSsrBuild
      ? { output: { entryFileNames: "entry-server.js" } }
      : {
          input: Object.fromEntries(pages.map((page) => [page, resolve(page)])),
        },
  },
}));
