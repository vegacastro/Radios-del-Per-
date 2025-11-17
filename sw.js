const VERSION = 'v1.0.3';
const STATIC_CACHE = `static-${VERSION}`;
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith('static-') && k !== STATIC_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// HTML: network-first; estáticos: stale-while-revalidate
self.addEventListener('fetch', (e) => {
  const req = e.request;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(STATIC_CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  const isStatic =
    req.destination === 'style' ||
    req.destination === 'script' ||
    req.destination === 'image' ||
    req.destination === 'font';

  if (isStatic) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const fromNet = fetch(req)
          .then((res) => {
            // Solo cachear respuestas exitosas
            if (res.ok) {
              const copy = res.clone();
              caches.open(STATIC_CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch((err) => {
            // Si hay caché, usarlo; si no, retornar un error manejado
            if (cached) {
              return cached;
            }
            // Para imágenes, retornar una respuesta vacía en lugar de error
            if (req.destination === 'image') {
              return new Response('', {
                status: 404,
                statusText: 'Image not found'
              });
            }
            throw err;
          });
        return cached || fromNet;
      })
    );
  }
});