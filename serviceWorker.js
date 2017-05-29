// service worker
var CACHE_NAME = 'wallet-v1';
var urlsToCache = [
    "/~alariv/ea-projekt-2017k//addmoneysoundshort.mp3",
    "/~alariv/ea-projekt-2017k//app.html",
    "/~alariv/ea-projekt-2017k//app.js",
    "/~alariv/ea-projekt-2017k//get_started2.png",
    "/~alariv/ea-projekt-2017k//moneyspentsound.mp3",
    "/~alariv/ea-projekt-2017k//shortcutPic.jpg",
    "/~alariv/ea-projekt-2017k//style.css",
    "/~alariv/ea-projekt-2017k//sources/links.js",
    "/~alariv/ea-projekt-2017k//sources/links.css"


];

self.addEventListener('install', function(event) {
    // Perform install steps

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');

            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    //console.log('WORKER: fetch event in progress.');

    if (event.request.method !== 'GET') { return; }
    event.respondWith(
        caches
        .match(event.request)
        .then(function(cached) {
            var networked = fetch(event.request)
            .then(fetchedFromNetwork, unableToResolve)
            .catch(unableToResolve);
            //console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
            return cached || networked;

            function fetchedFromNetwork(response) {
                var cacheCopy = response.clone();
                //console.log('WORKER: fetch response from network.', event.request.url);
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
                //console.log('WORKER: fetch request failed in both cache and network.', event.request.url);
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

    //notificationi sees oma event
    console.log(event.data.json());
    var title = 'Notifications';
    var options = {
        body: 'Yay it works! ' + event.data.json().content
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
