var CACHE_NAME = 'todolisti-serviceworker-1';
var urlsToCache = [
  '/~paulvase/home/public_html/ea-projekt-2017k/user.class.php',
  '/~paulvase/home/public_html/ea-projekt-2017k/signup.php',
  '/~paulvase/home/public_html/ea-projekt-2017k/Helper.class.php',
  '/~paulvase/home/public_html/ea-projekt-2017k/functions.php',
  '/~paulvase/home/public_html/ea-projekt-2017k/do.svg',
  '/~paulvase/home/public_html/ea-projekt-2017k/delete.svg',
  '/~paulvase/home/public_html/ea-projekt-2017k/add.svg',
  '/~paulvase/home/public_html/ea-projekt-2017k/style.css',
  '/~paulvase/home/public_html/ea-projekt-2017k/main.js',
  '/~paulvase/home/public_html/ea-projekt-2017k/index.html',
  '/~paulvase/home/public_html/ea-projekt-2017k/',
  '/~paulvase/home/public_html/ea-projekt-2017k/config.php',
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