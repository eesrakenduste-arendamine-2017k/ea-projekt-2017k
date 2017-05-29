// service worker
var CACHE_NAME = 'tetris_game';
var urlsToCache = [
  "/~karojyrg/ea-projekt-2017k/tetris.html",
  "/~karojyrg/ea-projekt-2017k/index.html",
  "/~karojyrg/ea-projekt-2017k/",
  "/~karojyrg/ea-projekt-2017k/js/tetris.js",
  "/~karojyrg/ea-projekt-2017k/css/style.css",
  "/~karojyrg/ea-projekt-2017k/css/style.css",
  "/~karojyrg/ea-projekt-2017k/css/loader.css",
];

self.addEventListener('install', function(event)){
  //Perform install steps

  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache)){
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {

    if (event.request.method !== 'GET') { return; }
    event.respondWith(
        caches
        .match(event.request)
        .then(function(cached) {
            var networked = fetch(event.request)
            .then(fetchedFromNetwork, unableToResolve)
            .catch(unableToResolve);
            return cached || networked;

            function fetchedFromNetwork(response) {
                var cacheCopy = response.clone();
                caches
                .open(version + 'pages')
                .then(function add(cache) {
                    cache.put(event.request, cacheCopy);
                })
                .then(function() {
                    console.log('WORKER: fetch response stored in cache.', event.request.url);
                });

                return response;
            }

            function unableToResolve () {
                return new Response('<h1>Service Unavailable</h1>', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/html'
                    })
                });
            }
        })
    );
});


// notifications in service worker
self.addEventListener('push', function(event) {

    console.log(event.data.json());
    var title = 'Notifications';
    var options = {
        body: 'Yay it works! ' + event.data.json().content
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
