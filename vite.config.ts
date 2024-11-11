import { defineConfig } from 'vite';
import deno from '@deno/vite-plugin';
import react from '@vitejs/plugin-react';
import { join } from 'jsr:@std/path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), react()],
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
});
