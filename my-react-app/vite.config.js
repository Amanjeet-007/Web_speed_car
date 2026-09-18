import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ya '0.0.0.0' likh sakte hain
    port: 5173, // (optional) agar aap port fix rakhna chahte hain
  },
})