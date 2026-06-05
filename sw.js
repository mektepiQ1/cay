const CACHE_NAME = 'ogrenci-app-cache-v1';
const urlsToCache = [
  'index.html',
  'log.jpg',
  'manifest.json'
];

// Kurulum adımı ve dosyaların önbelleğe alınması
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// İsteklerin yönetilmesi
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
