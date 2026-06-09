// Önbellek versiyonunu güncellemelerde artırın (örn: v2, v3)
const CACHE_NAME = 'e-ogrenci-app-cache-v1';

// Çevrimdışı çalışabilmesi için önbelleğe alınacak kaynaklar
const urlsToCache = [
  './',
  './index.html',
  './log.jpg',
  './manifest.json'
];

// Kurulum Aşaması: Belirtilen dosyaları önbelleğe al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Önbellek başarıyla açıldı.');
        return cache.addAll(urlsToCache);
      })
  );
});

// Yakalama Aşaması: Ağa gitmeden önce önbelleği kontrol et
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Önbellekte varsa onu döndür, yoksa ağdan çek
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Temizlik Aşaması: Eski önbellekleri sil (opsiyonel ancak profesyoneldir)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
