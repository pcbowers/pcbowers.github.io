var CACHE_NAME = 'ereporter-chache-v-100';
var filesToCache = [
    'index.html',
    'js/app.js',
	'images/icons/android-chrome-192x192.png',
	'images/icons/android-chrome-512x512.png',
	'images/icons/apple-touch-icon.png',
	'images/icons/browserconfig.xml',
	'images/icons/favicon-16x16.png',
	'images/icons/favicon-32x32.png',
	'images/icons/favicon.ico',
	'images/icons/icon-72x72.png',
	'images/icons/icon-96x96.png',
	'images/icons/icon-128x128.png',
	'images/icons/icon-144x144.png',
	'images/icons/icon-152x152.png',
	'images/icons/icon-192x192.png',
	'images/icons/icon-384x384.png',
	'images/icons/icon-512x512.png',
	'images/icons/mstile-150x150.png',
	'images/icons/safari-pinned-tab.svg'
];

self.addEventListener('install', function(e){
	console.log('[EReporter - ServiceWorker] Install event fired.');
	e.waitUntil(
		caches.open(CACHE_NAME).then(function(cache){
			console.log('[EReporter - ServiceWorker] Caching app shell...');
			return cache.addAll(filesToCache);
            /*.then(function(){
				self.skipWaiting();
			}); */
		})
	);
});

self.addEventListener('activate', function(e){
	console.log('[EReporter - ServiceWorker] Activate event fired.');
	e.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all(keyList.map(function(key){
				if (key !== CACHE_NAME){
					console.log('[EReporter - ServiceWorker] Removing old cache...', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(e){
	console.log('[EReporter - ServiceWorker] Fetch event fired.', e.request.url);
	e.respondWith(
		caches.match(e.request).then(function(response){
			if(response){
				console.log('[ErReporter - ServiceWorker] Retrieving from cache...');
				return response;
			}

			console.log('[EReporter - ServiceWorker] Retrieving from URL...');
			return fetch(e.request).catch(function(e){
				console.log('[EReporter - ServiceWorker] Fetch request failed!');
			});
		})
	);
});
