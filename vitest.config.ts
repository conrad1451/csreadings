import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react"; // Import the React plugin

export default defineConfig({
  plugins: [react()], // Add the React plugin to handle JSX/TSX
  test: {
    globals: true, // Makes testing utilities like `screen`, `render`, `describe`, `it`, `expect` globally available without explicit imports in each test file.
    environment: "jsdom", // Simulates a browser-like DOM environment for your React components. Essential for testing React.
    setupFiles: "./setupTests.ts", // Specifies the path to your setup file. Vitest will run this file before each test suite.
    // You can add more test options here, e.g.:
    // include: ['src/**/*.test.tsx'], // Specify which files Vitest should consider as tests
    // exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'], // Files/folders to exclude from testing
    // coverage: {
    //   provider: 'v8', // or 'istanbul'
    //   reporter: ['text', 'json', 'html'],
    // },
  },
});
