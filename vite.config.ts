/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true, // Enables global test functions (describe, it, expect)
    environment: "jsdom", // Mimics the browser environment for React components
    setupFiles: "./src/setupTests.ts", // Runs before tests to set up configurations
    coverage: {
      provider: "v8", // Use V8 for test coverage
      reporter: ["text", "json", "html"], // Generates different formats of coverage reports
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/vite-env.d.ts",
        "src/App.tsx",
        "src/main.tsx",
        "src/routes.tsx",
      ],
    },
    exclude: ["node_modules", "dist"], // Exclude unnecessary files
  },
});
