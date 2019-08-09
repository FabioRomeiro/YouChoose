let version = 5;

let files = [
  '/',
  'manifest.json',
  'assets/fonts/Chewy-Regular.ttf',
  'assets/fonts/FredokaOne-Regular.ttf',
  'assets/icons/check.svg',
  'assets/icons/eye-stroke.svg',
  'assets/icons/eye.svg',
  'assets/icons/garbage.svg',
  'assets/icons/heart.svg',
  'assets/icons/list.svg',
  'assets/icons/minus.svg',
  'assets/icons/pencil.svg',
  'assets/icons/plus.svg',
  'assets/icons/x.svg',
  'assets/images/food-border.svg',
  'assets/favicon/android-chrome-192x192.png',
  'assets/favicon/android-chrome-256x256.png',
  'assets/favicon/apple-touch-icon.png',
  'assets/favicon/browserconfig.xml',
  'assets/favicon/favicon-16x16.png',
  'assets/favicon/favicon-32x32.png',
  'assets/favicon/favicon.ico',
  'assets/favicon/mstile-150x150.png',
  'assets/favicon/safari-pinned-tab.svg',
  'assets/favicon/site.webmanifest',
  'css/styles.css',
  'js/controllers/RestaurantController.js',
  'js/DAO/index.js',
  'js/DAO/RestaurantDAO.js',
  'js/helpers/index.js',
  'js/helpers/ModeHelper.js',
  'js/helpers/decorators/domInject.js',
  'js/helpers/decorators/index.js',
  'js/helpers/decorators/logExecutionTime.js',
  'js/models/index.js',
  'js/models/Restaurant.js',
  'js/models/Restaurants.js',
  'js/services/ConnectionFactory.js',
  'js/views/index.js',
  'js/views/View.js',
  'js/views/EditorModeView.js',
  'js/views/MessengerView.js',
  'js/views/RestaurantsView.js',
  'lib/system-polyfills.js',
  'lib/system-polyfills.js.map',
  'lib/system.js',
  'lib/system.js.map',
  'js/app.js'
];

function createCacheBustedRequest(url) {
  let request = new Request(url, { cache: 'reload' });

  if ('cache' in request) {
    return request;
  }

  let bustedUrl = new URL(url, self.location.href);
  bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
  return new Request(bustedUrl);
}

self.addEventListener('install', e => {

  e.waitUntil(
    fetch(createCacheBustedRequest('/'))
      .then(response =>
        caches
          .open(`you-choose-${ version }`)
          .then(cache => cache.put('/', response)))
  );
});

self.addEventListener('activate', e => {
  
  caches
    .open(`you-choose-${ version }`)
    .then(cache => 
      cache
        .addAll(files)
        .then(() =>
          caches.delete(`you-choose-${ version - 1 }`))
        .catch(console.log)
      );
});

self.addEventListener('fetch', event => {

    event.respondWith(
      fetch(event.request)
        .catch(error => caches.match(event.request))
    );
});