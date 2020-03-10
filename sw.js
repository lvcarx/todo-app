
 const cachedFiles = [
    '/',
    '/index.html',
    'js/app.js',
    'js/settings.js',
    'css/style.css',
    'css/theme.css',
    'img/close2.svg',
    'img/edit2.svg',
    'img/favorite2.svg',
    'img/handle2.svg',
    'img/logoDark2.svg',
    'img/logoLight2.svg',
    'img/settings2.svg',
    'img/dark/close-dark.svg',
    'img/dark/edit-dark.svg',
    'img/dark/favorite-dark.svg',
    'img/dark/handle-dark.svg',
    'img/dark/settings-dark.svg',
    'img/noads.svg',
    'img/noWifi2.svg',
    'img/noWifi2.svg',
    'img/plus-icon.svg',
    'img/plus.svg',
    'img/trash-white.svg',
    'img/warning.svg',
    'manifest.json',
    
];

 self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cachedFiles);
        })
    );
  })


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
*/

