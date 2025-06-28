const CACHE_NAME = 'hima-sia-cache-v1';
const urlsToCache = [
  'index.html',
  'detail.html',
  'bootstrap.min.css',
  'bootstrap.bundle.min.js',
  'backweb.jpeg',
  'logo_hima_sia.png',
  'ketua.jpeg',
  'wakil.jpeg',
  'administrasi.jpeg',
  'akademik.jpeg',
  'networking.jpeg',
  'dpo.jpeg',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
