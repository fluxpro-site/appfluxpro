const CACHE_NAME = 'fluxpro-system-v5'; // Versão do cache
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. Instalação: Baixa os arquivos para o cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Ativação: Limpa caches antigos se você atualizar a versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// 3. Interceptação: Serve os arquivos offline quando não tem internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      // Se achou no cache, retorna do cache (Offline)
      // Se não, tenta buscar na internet (Online)
      return response || fetch(event.request);
    })
  );
});
