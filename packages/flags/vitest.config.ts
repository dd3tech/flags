/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

// https://vitejs.dev/con fig/
export default defineConfig({
  plugins: [],
  test: {
    environment: "node",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
