// // public/sw.js
// const CACHE_NAME = 'bizzap-v1';
// const urlsToCache = [
//   '/',
//   '/static/js/bundle.js',
//   '/static/css/main.css',
//   '/manifest.json'
// ];

// // Install event
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => cache.addAll(urlsToCache))
//   );
// });

// // Fetch event
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });

// // Activate event
// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME];
  
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// // Push notification
// self.addEventListener('push', (event) => {
//   const options = {
//     body: event.data ? event.data.text() : 'New update available!',
//     icon: '/icons/icon-192x192.png',
//     badge: '/icons/icon-192x192.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     },
//     actions: [
//       {
//         action: 'explore',
//         title: 'Open Bizzap',
//         icon: '/icons/icon-192x192.png'
//       },
//       {
//         action: 'close',
//         title: 'Close',
//         icon: '/icons/icon-192x192.png'
//       }
//     ]
//   };




// public/sw.js - Corrected Service Worker for Bizzap PWA
const CACHE_NAME = 'bizzap-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event with better error handling
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Cache resources one by one to handle failures gracefully
        return Promise.allSettled(
          urlsToCache.map(url => {
            return cache.add(url).catch(error => {
              console.log(`Failed to cache ${url}:`, error);
              return null; // Continue with other resources
            });
          })
        );
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        // Force the waiting service worker to become the active service worker
        self.skipWaiting();
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
});

// Fetch event with comprehensive error handling
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests except for same-origin
  if (url.origin !== location.origin) {
    return;
  }

  // Skip requests to known problematic services
  if (request.url.includes('via.placeholder.com') || 
      request.url.includes('placeholder.com') ||
      request.url.includes('chrome-extension://') ||
      request.url.includes('moz-extension://')) {
    return;
  }

  // Skip POST requests and other non-GET requests for caching
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a stream
            const responseToCache = response.clone();

            // Cache the response for future requests
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              })
              .catch((error) => {
                console.log('Failed to cache response:', error);
              });

            return response;
          })
          .catch((error) => {
            console.log('Fetch failed for:', request.url, error);
            
            // For HTML requests, try to return cached index.html for SPA routing
            if (request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/').then(cachedIndex => {
                if (cachedIndex) {
                  return cachedIndex;
                }
                // Return a basic offline page
                return new Response('<!DOCTYPE html><html><body><h1>Offline</h1><p>Please check your connection.</p></body></html>', {
                  headers: { 'Content-Type': 'text/html' }
                });
              });
            }
            
            // For other requests, just throw the error
            throw error;
          });
      })
      .catch((error) => {
        console.log('Cache match failed for:', request.url, error);
        return fetch(request);
      })
  );
});

// Activate event with proper cleanup
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker activated successfully');
    })
  );
});

// Push notification with error handling
self.addEventListener('push', (event) => {
  console.log('Push notification received');
  
  let notificationData = {
    title: 'Bizzap',
    body: 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png'
  };

  // Parse push data if available
  if (event.data) {
    try {
      const pushData = event.data.json();
      notificationData = { ...notificationData, ...pushData };
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: Date.now(),
      ...notificationData.data
    },
    actions: [
      {
        action: 'explore',
        title: 'Open Bizzap',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.png'
      }
    ],
    requireInteraction: false,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
      .catch(error => {
        console.log('Failed to show notification:', error);
      })
  );
});

// Notification click with better handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.action);
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // If a window is already open, focus it
        for (const client of clientList) {
          if (client.url === location.origin && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open a new window
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      }).catch(error => {
        console.log('Failed to handle notification click:', error);
      })
    );
  }
});

// Handle service worker errors
self.addEventListener('error', (event) => {
  console.log('Service Worker error:', event.error);
});

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', (event) => {
  console.log('Unhandled promise rejection in SW:', event.reason);
  event.preventDefault();
});