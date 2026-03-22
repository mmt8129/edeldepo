const CACHE_NAME = 'depo-cache-v1';
const urlsToCache = [
  '/edeldepo/',
  '/edeldepo/index.html',
  '/edeldepo/veri.html',
  '/edeldepo/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
