import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use an environment override when set (CI), otherwise default to
  // the GitHub Pages repository path so built assets reference the
  // correct root when deployed to `username.github.io/hawk-homework`.
  base: process.env.VITE_BASE_URL || '/hawk-homework/',
  plugins: [react()],
})
