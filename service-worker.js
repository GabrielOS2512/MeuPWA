// SW Version
const version = '1.0';

// Static Cache - App Shell
const appAssets = [
    '/index.html',
    '/tela2.html',
    '/tela3.html',
    '/css/bootstrap.css',
    '/js/bootstrap.js',
    '/js/calc.js',
    '/calculadora.html'
];

// SW Install
self.addEventListener( 'install', e => {
    e.waitUntil(
        caches.open( `static-${version}` )
            .then( cache => cache.addAll(appAssets) )
            .catch(reason => console.error(reason))
    );
});

// SW Activate
self.addEventListener( 'activate', e => {

    // Clean static cache
    let cleaned = caches.keys().then( keys => {
        keys.forEach( key => {
            if ( key !== `static-${version}` && key.match('static-') ) {
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(cleaned);
});

// Network with Cache Fallback
const fallbackCache = (req) => {

    // Try Network
    return fetch(req).then( networkRes => {

        // Check res is OK, else go to cache
        if( !networkRes.ok ) throw 'Fetch Error';

        // Update cache
        caches.open( `static-${version}` )
            .then( cache => cache.put( req, networkRes ) );

        // Return Clone of Network Response
        return networkRes.clone();
    })

    // Try cache
    .catch( err => caches.match(req) );
};

self.addEventListener('fetch', e => {

    // App shell
    if( e.request.url.match(location.origin) ) {
        e.respondWith( fallbackCache(e.request) );
      }
});

console.log("Rodou");
