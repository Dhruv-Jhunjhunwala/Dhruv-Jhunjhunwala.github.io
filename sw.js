const C='exp-v1',F=['./','index.html','manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>{if(e.request.method!='GET'||e.request.url.includes('script.google'))return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
