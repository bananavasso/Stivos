self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('VASILIKI STAVROU mai22068').then(function(cache) {
            return cache.addAll([
                '/VasilikiStavrou.html',
                '/VasilikiStavrou.css',
                '/uomTrack.js',
                '/install.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith( caches.match(event.request).then(function (response) {
        return response || caches.match('/VasilikiStavrou.html');
        }) 
    );
});