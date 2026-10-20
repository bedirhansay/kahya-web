// The Kahya web app lived on this origin before it moved to
// app.kahya.bihesap.co. Browsers that still run its service worker keep
// serving the old app (and reload-loop on its missing chunks). Serving this
// worker at the same path replaces it: it clears the old caches, unregisters
// itself and reloads open tabs onto the marketing site.
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
