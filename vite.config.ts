import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/voyage/',
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nom de ton app',
      short_name: 'Nom court',
      start_url: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#00d1b2',
      icons: [
        {
          src: 'icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ]
    }
  })]
})
