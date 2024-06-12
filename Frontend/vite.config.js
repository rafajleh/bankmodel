import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    host: '182.163.122.135',
    port: 3001
  },
  plugins: [svgr(), react()],
});
