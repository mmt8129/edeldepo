const CACHE_NAME = 'depo-raf-v1';
const urlsToCache = [
  '/edeldepo/',
  '/edeldepo/index.html',
  '/edeldepo/veri.html',
  '/edeldepo/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache açıldı');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache hatası:', err))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => new Response('Ağ hatası', { status: 404 }))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
  console.log('Service Worker aktif');
});
