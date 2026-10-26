/* GIA PHẢ HỌ NGUYỄN - Service Worker V37 */
const CACHE = 'gia-pha-ho-nguyen-v37-push-path-fix';

const ASSETS = [
  './',
  './index.html',
  './config.js',
  './manifest.json',
  './OneSignalSDKWorker.js',
  './OneSignalSDKUpdaterWorker.js',
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
      .then(async cache => {
        await Promise.all(
          ASSETS.map(async asset => {
            try {
              const response = await fetch(asset, {
                cache: 'no-cache'
              });

              if (response.ok) {
                await cache.put(asset, response);
              }
            } catch (error) {
              // Bỏ qua tài nguyên chưa tải được.
            }
          })
        );
        await self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key =>
            key.startsWith('gia-pha-ho-nguyen-') &&
            key !== CACHE
          )
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  // Luôn kiểm tra phiên bản mới của trang ứng dụng.
  if (
    request.mode === 'navigate' ||
    url.pathname.endsWith('/index.html')
  ) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE).then(cache => {
              cache.put(request, copy);
            });
          }

          return response;
        })
        .catch(() =>
          caches.match(request)
            .then(cached =>
              cached || caches.match('./index.html')
            )
        )
    );

    return;
  }

  // Tài nguyên khác: ưu tiên cache, thiếu thì tải từ mạng.
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();

          caches.open(CACHE).then(cache => {
            cache.put(request, copy);
          });
        }

        return response;
      });
    })
  );
});
