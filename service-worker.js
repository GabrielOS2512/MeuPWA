// Versão do SW 'Para testes'
const version = '1.1';

// Cache Estatico - App Shell, o que será armazenado na cache
const appAssets = [
    'index.html',
    'tela2.html',
    'tela3.html',
    'css/bootstrap.css',
    'js/indexeddb.js',
    'js/selectdb.js',
    'js/bootstrap.js',
    'js/calc.js',
    'js/local.js',
    'calculadora.html',
    'localizacao.html',
    'favicon.ico',
    'main.js'
];

// SW Install
self.addEventListener( 'install', e => {
    e.waitUntil(
        caches.open( `static-${version}` )
            .then( cache => cache.addAll(appAssets) )
    );
});

// SW Ativar
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

// Estratégia Usada - Rede com auxilio da Cache
const fallbackCache = (req) => {

    // Tentar pela Rede 1o
    return fetch(req).then( networkRes => {

        // Checar se a resposta foi ok, se não tenta a cache
        if( !networkRes.ok ) throw 'Fetch Error';

        // Atualiza a cache
        caches.open( `static-${version}` )
            .then( cache => cache.put( req, networkRes ) );

        // Retornar o clone da resposta da rede
        return networkRes.clone();
    })

    // Tentar pela cache
    .catch( err => caches.match(req) );
};

//SW Fetch
self.addEventListener('fetch', e => {

    // App shell
    if( e.request.url.match(location.origin) ) {
        e.respondWith( fallbackCache(e.request) );
      }
});

console.log("Rodou");
