import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig(({ isSsrBuild }) => ({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: isSsrBuild
      ? { output: { entryFileNames: "entry-server.js" } }
      : {
          input: {
            home: resolve("index.html"),
            history: resolve("historia/index.html"),
            archive: resolve("archivo/index.html"),
            privacy: resolve("privacidad/index.html"),
            notfound: resolve("404.html"),
          },
        },
  },
}));
