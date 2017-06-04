var CACHE_NAME = 'wordgame-cache';
var urlsToCache = [
  '/',
  '../css/style.css',
  '../css/wordsearch.css',
  '../index.php',
  'wordsearch.js',
  'utility.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // ресурс есть в кеше
        if (response) {
          return response;
        }

        /* Важно: клонируем запрос. Запрос - это поток, может быть обработан только раз. Если мы хотим использовать объект request несколько раз, его нужно клонировать */
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // проверяем, что получен корректный ответ
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            /* ВАЖНО: Клонируем ответ. Объект response также является потоком. */
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});