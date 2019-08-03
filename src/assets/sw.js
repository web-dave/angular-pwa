const js = [
  'runtime-es2015.858f8dd898b75fe86926.js',
  'polyfills-es2015.27661dfa98f6332c27dc.js',
  'runtime-es5.741402d1d47331ce975c.js',
  'polyfills-es5.7f43b971448d2fb49202.js',
  'main-es2015.6bae1169bb52f4112e80.js',
  'main-es5.b62b5440d395c020986c.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open('angular-pwa')
      .then(cache =>
        cache.addAll([
          '/',
          'index.html',
          'styles.8f4b1c9adb936fefc585.css',
          ...js
        ])
      )
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => console.log('activate', e));
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
