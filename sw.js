/* Service Worker — IEC 61850 Interactivo (PWA) v3 */
var CACHE='iec61850-v3';
var ASSETS=['./','index.html','manifest.webmanifest'];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){
    return Promise.all(ASSETS.map(function(u){return c.add(u).catch(function(err){console.warn('SW no cachea',u,err);});}))
      .then(function(){ return fetch('index.html',{cache:'reload'}).then(function(r){return c.put('index.html',r.clone()).then(function(){return c.put('./',r);});}).catch(function(){}); });
  }));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var req=e.request; if(req.method!=='GET')return;
  if(req.mode==='navigate'){ e.respondWith(fetch(req).catch(function(){return caches.match('index.html').then(function(h){return h||caches.match('./');});})); return; }
  e.respondWith(caches.match(req).then(function(hit){ if(hit)return hit;
    return fetch(req).then(function(res){var copy=res.clone();caches.open(CACHE).then(function(c){try{c.put(req,copy);}catch(_){}});return res;}).catch(function(){return caches.match('index.html');}); }));
});
