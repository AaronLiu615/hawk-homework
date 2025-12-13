import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use an environment override when set (CI), otherwise use root for local dev
  base: process.env.VITE_BASE_URL || '/',
  plugins: [react()],
})
