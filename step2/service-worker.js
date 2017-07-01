var log = console.log.bind(console);
var err = console.error.bind(console);
var version = '1';
var cacheName = 'weatherPWA-v' + version;
var dataCacheName = 'weatherData-v' + version;
var appShellFilesToCache = [
  './',
  './index.html',
  './scripts/app.js',
  './styles/inline.css',
  './images/icons/icon-256x256.png',
  './images/ic_notifications_white_24px.svg'
];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => {
      console.log('Service Worker Registered')
    })
}

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching App Shell');
      return cache.addAll(appShellFilesToCache);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch', e.request.url);
  // Match requests for data and handle them separately
  // The cache-first version
  self.addEventListener('fetch', (e) => {
    console.log('[ServiceWorker] Fetch', e.request.url);
    // Match requests for data and handle them separately
    // read-through cache strategy
    if (e.request.url.indexOf('data/') != -1) {
      e.respondWith(
        caches.match(e.request.clone()).then((response) => {
          return response || fetch(e.request.clone()).then((r2) => {
            return caches.open(dataCacheName).then((cache) => {
              console.log('[ServiceWorker] Fetched & Cached', e.request.url);
              cache.put(e.request.url, r2.clone());
              return  r2.clone();
            });
          });
        })
      );
    } else {
      // resources cace, cache-first strategy
      e.respondWith(
        caches.match(e.request).then((response) => {
          return response || fetch(e.request);
        })
      );
    }
  });

});
