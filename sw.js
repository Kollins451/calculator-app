const CACHE_NAME = "kollins-calculator-v2";

const FILES_TO_CACHE = [
  "/calculator-app/",
  "/calculator-app/index.html",
  "/calculator-app/style.css",
  "/calculator-app/script.js",
  "/calculator-app/manifest.json",
  "/calculator-app/icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
