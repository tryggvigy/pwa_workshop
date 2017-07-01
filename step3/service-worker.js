importScripts('../node_modules/sw-toolbox/sw-toolbox.js')

var version = '5';
var dataCacheName = 'weatherData-v' + version;
var cacheName = 'weatherPWA-v' + version;
toolbox.options.cache.name = cacheName;
toolbox.router.default = toolbox.cacheFirst;
var filesToCache = [
  './',
  './index.html',
  './scripts/app.js',
  './images/icons/icon-256x256.png'
];
toolbox.precache(filesToCache);

toolbox.router.get('/data/(.*)', toolbox.networkFirst, {
  cache: {
    name: dataCacheName
    maxEntries: 3,
    maxAgeSeconds: 60
  }
});

// You will use this later to set up push notifications
// self.addEventListener('push', function(e) {
//   console.log('[ServiceWorker] Received push event');
// });
