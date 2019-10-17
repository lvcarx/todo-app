const cachedFiles = [
    '/',
    '/index.html',
    'js/app.js',
    'js/userInformation.js',
    'data/userInformation.json',
    'img/profile.jpg',
    'css/style.css'
  ];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cachedFiles);
        })
    );
  }); 

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                // console.log('Found', e.request, 'in cache');
                return response;
            }
            else {
                console.log('Could not find', e.request, 'in cache, FETCHING!');
                return fetch(e.request)
                .then(function(response) {
                    const clonedResponse = response.clone();
                    caches.open('v1').then(function(cache) {
                        cache.put(e.request, clonedResponse);
                    })
                    return response
                })
                .catch(function(err) {
                    console.log(err);
                })
            }   
        })
    );
})
