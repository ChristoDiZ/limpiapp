import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

// Cargar variables desde .env
dotenv.config()

export default defineConfig({
  plugins: [react(), tailwindcss()],
 
})
