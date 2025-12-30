import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
        plugins: [
          "@babel/plugin-transform-export-namespace-from",
        ],
      },
    }),
    react(),
    svgr(),
  ],
});
