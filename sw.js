const CACHE_NAME = 'ogrenci-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'log.jpg'
];

// Kurulum ve önbelleğe alma
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Çevrimdışı çalışabilme desteği
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
