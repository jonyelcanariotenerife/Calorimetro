// Calorímetro - Service Worker
// Cachea el shell propio (HTML/manifest/iconos). Los CDNs (React, Tailwind,
// FontAwesome, Google Fonts) los cachea el navegador por su cuenta tras la
// primera carga. Las llamadas a Gemini siempre van a la red.

const CACHE_NAME = 'calorimetro-v1';
const SHELL_FILES = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Nunca cachear Gemini: siempre red.
    if (url.hostname.includes('generativelanguage.googleapis.com')) {
        event.respondWith(fetch(event.request));
        return;
    }

    // Shell propio: cache-first con actualización en segundo plano.
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                return cached || fetch(event.request).then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                    return response;
                }).catch(() => cached);
            })
        );
    }
    // Recursos de CDN (React/Tailwind/FontAwesome/Fonts): dejar pasar a red/caché del navegador.
});
