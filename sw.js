// Isi file sw.js yang sudah diperbarui

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png' 
];

self.addEventListener('install', event => {
    // Memberitahu Service Worker untuk langsung aktif setelah selesai install,
    // tidak perlu menunggu.
    self.skipWaiting(); 

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // ... (kode fetch tidak perlu diubah) ...
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});