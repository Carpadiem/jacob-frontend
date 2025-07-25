import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  // publicDir: './public',
  server: {
    port: 3000,
  },
  appType: 'mpa',
  plugins: [
    tsconfigPaths(),
    react(),
    svgr({
      include: "**/*.svg?react",
    })
  ],
})
