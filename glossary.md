can have offline search.

https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
to communicate with the application from the service worker.

# Searching
- Do basic search through cached json in indexedDB when offline,
vs doing search server side when online.

# Transpilation
- ServiceWorker can do es6 to es5 transpilation with feature detection.
So it can just don't transpile if it sees the browser has support
- Jekil md to html transpilation


Service workers can take a scope argument.

dynamic theme color
var meta = document.head.querySelector('meta[name="theme-color"]');
meta.content = '#4169E1';
