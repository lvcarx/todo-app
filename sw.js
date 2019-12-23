const cachedFiles = [
    '/',
    '/index.html',
    'js/app.js',
    'js/settings.js',
    'js/userInformation.js',
    'data/userInformation.json',
    'img/profile.jpg',
    'css/style.css',
    'css/theme.css',
    'img/new/close.svg',
    'img/new/close2.svg',
    'img/new/edit.svg',
    'img/new/edit2.svg',
    'img/new/favorite.svg',
    'img/new/favorite2.svg',
    'img/new/handle.svg',
    'img/new/handle2.svg',
    'img/new/logoDark.svg',
    'img/new/logoLight.svg',
    'img/new/settings.svg',
    'img/new/settings2.svg',
    'img/new/dark/close-dark.svg',
    'img/new/dark/edit-dark.svg',
    'img/new/dark/favorite-dark.svg',
    'img/new/dark/handle-dark.svg',
    'img/new/dark/settings-dark.svg',
    'manifest.json'
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


