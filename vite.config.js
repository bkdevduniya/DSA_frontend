
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: true, // allows external access (e.g., via loca.lt)
  //   port: 5173, // or whatever port you're using
  //   strictPort: true, // fail if port is taken
  //   cors: true, // enable CORS
  //   origin: 'https://5g67brzk-5173.inc1.devtunnels.ms', // optional: sets origin
  //   hmr: {
  //     host: '5g67brzk-5173.inc1.devtunnels.ms',
  //   },
  // },
})
