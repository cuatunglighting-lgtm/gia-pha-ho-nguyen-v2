/* GIA PHA HO NGUYEN - PWA service worker V38
 * Network-first for app shell; remove previous PWA caches including v35/v36.
 * OneSignal has a separate worker under /onesignal/.
 */
'use strict';
const CACHE_NAME = 'gia-pha-pwa-v38-network-first';
const OLD_CACHE_PREFIXES = ['gia-pha-pwa-', 'gia-pha-ho-nguyen-'];
const STATIC_ASSETS = [
  './', './index.html', './config.js', './manifest.json',
  './icon-120.png', './icon-152.png', './icon-167.png', './icon-180.png',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './icon-1024.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(STATIC_ASSETS.map(async path => {
      try {
        const response = await fetch(path, { cache: 'no-cache' });
        if (response && response.ok) await cache.put(path, response);
      } catch (_) { /* offline or optional asset; do not fail installation */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME && OLD_CACHE_PREFIXES.some(prefix => key.startsWith(prefix))).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isAppShell = request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/config.js') || url.pathname.endsWith('/manifest.json');
  const isOneSignalWorker = /\/onesignal\/OneSignalSDK(?:Updater)?Worker\.js$/i.test(url.pathname) || /\/OneSignalSDK(?:Updater)?Worker\.js$/i.test(url.pathname);

  // Never cache OneSignal worker scripts: always fetch the current published file.
  if (isOneSignalWorker) {
    event.respondWith(fetch(request, { cache: 'no-cache' }));
    return;
  }

  if (isAppShell) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: 'no-cache' });
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;
        throw error;
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
