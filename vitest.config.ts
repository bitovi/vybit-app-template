import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@model': path.resolve(__dirname, './model'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './mock-app/src/test-setup.ts',
    css: true,
  },
});
