if ('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('js/service-worker.js').then(function(registration) {
            console.log('[EReporter - ServiceWorker] registration successful with scope: ', registration.scope);
        }, function(error){
            console.log('[EReporter - ServiceWorker] registration failed: ', error);
        });
    });
}
