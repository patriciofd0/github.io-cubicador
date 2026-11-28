/* Service worker del Cubicador Interhaus.
   Cache-first con revalidacion en segundo plano.
   El nombre del cache incluye la version: al publicar una nueva, la anterior se descarta. */
const CACHE = 'cubicador-v07.7';
const ARCHIVOS = [
  './', './index.html', './manifest.webmanifest',
  './assets/icon-192.png', './assets/icon-512.png',
  './assets/icon-maskable-512.png', './assets/apple-touch-icon.png',
  './assets/fonts/dm-sans-400.woff2', './assets/fonts/dm-sans-500.woff2',
  './assets/fonts/dm-sans-600.woff2', './assets/fonts/dm-sans-700.woff2'
];

self.addEventListener('install', e => {
  // Sin skipWaiting: la version nueva queda en espera hasta que el usuario
  // acepte el aviso, para no recargar la app mientras se esta cubicando.
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
});

self.addEventListener('message', e => {
  if (e.data === 'SALTAR_ESPERA') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(hit => {
      const red = fetch(req).then(res => {
        if (res && res.ok) {
          const copia = res.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
        }
        return res;
      }).catch(() => hit);
      return hit || red;
    })
  );
});
