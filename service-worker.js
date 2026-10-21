const CACHE='gia-pha-pwa-v1';
const ASSETS=['./','./index.html','./config.js','./manifest.json','./icon-120.png','./icon-152.png','./icon-167.png','./icon-180.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./icon-1024.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 // Cache only the static GitHub Pages shell. Never intercept the Apps Script iframe.
 if(url.origin!==self.location.origin||req.method!=='GET')return;
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy));return resp;})));
});
