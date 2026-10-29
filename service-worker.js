/* GIA PHẢ HỌ NGUYỄN - cache refresh V36
   Purpose: replace the older cache-first shell so GitHub Pages can deliver the updated index.html.
   Keep OneSignal SDK worker files available at the project subpath. */
const CACHE = 'gia-pha-ho-nguyen-v57-5-context-watermark';
const ASSETS = [
  './',
  './index.html',
  './config.js',
  './assets/dong-son-watermark.png',
  './assets/dong-son-watermark-v57-5.png',
  './manifest.json',
  './OneSignalSDKWorker.js',
  './OneSignalSDKUpdaterWorker.js',
  './onesignal/OneSignalSDKWorker.js',
  './onesignal/OneSignalSDKUpdaterWorker.js',
  './icon-120.png',
  './icon-152.png',
  './icon-167.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-1024.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method !== 'GET') return;

  // Always ask the network for the HTML shell first so updated index.html is not stuck in cache.
  if (request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
