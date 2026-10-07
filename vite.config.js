import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
const pages = [
  "en/contact/index.html",
  "contacto/index.html",
  "en/collection/index.html",
  "coleccion/index.html",
  "en/personalized-designs/index.html",
  "disenos-personalizados/index.html",
  "en/corporate-gifts/index.html",
  "regalos-corporativos/index.html",
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
  plugins: [
    react(),
    {
      name: "clean-page-paths",
      configureServer(server) {
        const routes = new Map(
          pages
            .filter((page) => page.endsWith("/index.html"))
            .map((page) => [
              `/${page.replace(/\/index\.html$/, "")}`,
              `/${page}`,
            ]),
        );
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url, "http://localhost");
          const page = routes.get(url.pathname);
          if (page) request.url = page + url.search;
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: isSsrBuild
      ? { output: { entryFileNames: "entry-server.js" } }
      : {
          input: Object.fromEntries(pages.map((page) => [page, resolve(page)])),
        },
  },
}));
