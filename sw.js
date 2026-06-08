/* Service Worker — IEC 61850 Interactivo (PWA) */
var CACHE='iec61850-v1';
var ASSETS=['./','index.html','manifest.webmanifest',
  'icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).catch(function(){}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){if(k!==CACHE)return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  // cache-first (la app es estática y offline-first)
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit)return hit;
      return fetch(e.request).then(function(res){
        var copy=res.clone();
        caches.open(CACHE).then(function(c){try{c.put(e.request,copy);}catch(_){}});
        return res;
      }).catch(function(){ return caches.match('index.html'); });
    })
  );
});
