const CACHE_NAME = 'zentrianlge-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // 'css/button.css',   // add your css file(s)
  // 'css/index.css',   // add your css file(s)
  // 'css/myfont.ttf',   // add your css file(s)
  // 'css/page.css',   // add your css file(s)
  // 'css/zen.css',   // add your css file(s)
  // 'js/element.js',      // add your js file(s)
  // 'js/handle.js',      // add your js file(s)
  // 'js/index.js',      // add your js file(s)
  // 'js/solutions.js',      // add your js file(s)
  // 'js/stages.js',      // add your js file(s)
  // add more assets as needed
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
