import { precacheAndRoute } from 'workbox-precaching';

// Precache all assets generated by your build process
precacheAndRoute(self.__WB_MANIFEST);

// Optional: Add additional runtime caching rules if needed
self.addEventListener('fetch', (event) => {
  // Add custom cache strategies here if needed
});