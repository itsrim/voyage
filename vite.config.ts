import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/voyage/',
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: 'voyage',
      short_name: 'voyage',
      start_url: '/voyage/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#00d1b2',
      icons: [
        {
          src: '/voyage/icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/voyage/icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/voyage/icons/apple-touch-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'apple touch icon',
        },
        {
          src: '/voyage/icons/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/voyage/index.html',  // Changed from /index.html
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/itsrim\.github\.io\/voyage\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'voyage-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    strategies: 'injectManifest',  // Add this line
    srcDir: 'src',
    filename: 'sw.js'
  })]
});
