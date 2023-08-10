// noinspection NodeCoreCodingAssistance

import path from "path";
import {defineConfig} from "vite";

export default defineConfig({
  base: "./",
  plugins: [],
  build: {
    minify: 'terser',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "ImageFocalPointPicker",
      formats: ["es", "cjs", "umd", "iife"],
      fileName: (format) => `ImageFocalPointPicker.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
  },
});
