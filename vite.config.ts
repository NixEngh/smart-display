import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react";
import { join } from "jsr:@std/path";

export default defineConfig({
  base: "/",
  plugins: [deno(), react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  resolve: {
    alias: {
      "@": join(__dirname, "./src"),
    },
  },
});
