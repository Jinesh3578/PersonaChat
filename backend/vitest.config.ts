import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    include: ['src/**/*.test.ts'],
    hookTimeout: 120000,
  },
});
