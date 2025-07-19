const CACHE_NAME = 'zentrianlge-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'css/buttons.css',   
  'css/index.css',   
  'css/myfont.ttf',   
  'css/page.css',   
  'css/zen.css',   
  'js/element.js',      
  'js/handle.js',      
  'js/index.js',      
  'js/solutions.js',      
  'js/stages.js',
  'img/back.png',
  'img/background1.jpg',
  'img/background2.jpg',
  'img/blue.png',
  'img/button_bg.png',
  'img/coral.png',
  'img/cursor.png',
  'img/cursorActive.png',
  'img/dark_green.png',
  'img/easy.png',
  'img/easy_sc.png',
  'img/facebook.png',
  'img/grey.png',
  'img/hard.png',
  'img/hard_sc.png',
  'img/help.png',
  'img/hold.png',
  'img/icon_128.png',
  'img/icon_16.png',
  'img/icon_192.png',
  'img/icon_512.png',
  'img/icon_narrow.webp',
  'img/icon_wide.png',
  'img/install-app.png',
  'img/light_blue.png',
  'img/light_green.png',
  'img/lock_yellow.png',
  'img/medium.png',
  'img/medium_sc.png',
  'img/olive.png',
  'img/orange.png',
  'img/page_bg.jpg',
  'img/pink.png',
  'img/red.png',
  'img/section_bg.png',
  'img/star.png',
  'img/tweeter.png',
  'img/violet.png',
  'img/www.png',
  'img/yellow.png',
  'res/click.mp3',
  'res/loop.mp3',
  'res/succ1.mp3',
  'res/succ2.mp3',      
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
