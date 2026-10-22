// Retire worker. Kahya's web app once lived on this origin and later on
// app.kahya.bihesap.co; browsers that still run its service worker keep
// serving the old app. Serving this worker at the same path replaces it: it
// clears the old caches, unregisters itself and reloads open tabs. The proxy
// (coolify-proxy /traefik/dynamic/kahya-domain-move.yaml) also serves this file
// as app.kahya.bihesap.co/sw.js, where the reload lands on the redirect to
// kahyaapp.bihesap.co.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await Promise.all((await caches.keys()).map((key) => caches.delete(key)));
      await self.registration.unregister();
      const tabs = await self.clients.matchAll({ type: "window" });
      await Promise.all(tabs.map((tab) => tab.navigate(tab.url)));
    })(),
  );
});
