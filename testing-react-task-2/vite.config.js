import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    environment:"jsdom",
    setupFiles:"./src/setupTest.js",
    globals:true
  },
    alias: {
      // Set '@/' to point to the 'src' directory
      '@': path.resolve(__dirname, 'src'),    },
})
