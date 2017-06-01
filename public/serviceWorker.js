// service worker
//https://stackoverflow.com/questions/42333355/serviceworker-not-working-offline

var CACHE_NAME = 'MatrixCalulator';
/*
var urlsToCache = [
    "/~mattbleh/2.%20Semester/ea-projekt-2017k/public/projekt.js",
    "/~mattbleh/2.%20Semester/ea-projekt-2017k/public/index.html",
    "/~mattbleh/2.%20Semester/ea-projekt-2017k/public/game.html",
    "/~mattbleh/2.%20Semester/ea-projekt-2017k/public/calculator.html",
	"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/index.css",
	"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/projekt.css",
	"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/",
	"http://cdnjs.cloudflare.com/ajax/libs/mathjs/3.13.2/math.min.js",
	"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
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
*/

self.addEventListener('install', function(event) {
	console.log('Service Worker Install...');
	// pre cache a load of stuff:
	event.waitUntil(
		caches.open(CACHE_NAME.prefetch)
		.then(function(cache) {
			return cache.addAll([
				"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/",
				"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/projekt.js",
				"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/index.html",
				"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/game.html",
				"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/calculator.html",
				"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/index.css",
				"/~mattbleh/2.%20Semester/ea-projekt-2017k/public/projekt.css",
				"http://cdnjs.cloudflare.com/ajax/libs/mathjs/3.13.2/math.min.js",
				"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"
			])
			.then(function(){
				console.log('Caches added');
			})
			.catch(function(error){
				console.error('Error on installing');
				console.error(error);
			});
		})
	)
});

self.addEventListener('activate', function(event) {
	console.log('Service Worker Activate...');
	// Delete all caches that aren't named in CACHE_NAME.
	var expectedCacheNames = Object.keys(CACHE_NAME).map(function(key) {
		return CACHE_NAME[key];
	});

	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					/*
					if (expectedCacheNames.indexOf(cacheName) === -1) {
						// If this cache name isn't present in the array of "expected" cache names, then delete it.
						console.log('Deleting out of date cache:', cacheName);
						return caches.delete(cacheName);
					}
					*/
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log('Service Worker Fetch...');
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			if(event.request.url.indexOf('facebook') > -1){
				return fetch(event.request);
			}
			if(response){
				console.log('Serve from cache', response);
				return response;
			}
			return fetch(event.request);
		})
		.catch(function(error){
			console.error('Error on fetching');
			console.error(error);
		})
	);
});