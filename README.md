# Password Generator

A browser-only HTML/CSS/JavaScript tool using `crypto.getRandomValues()` with rejection sampling for character selection. Choose length and character sets, exclude look-alike characters, copy the result, or generate and download a batch.

Live app: https://giridharreddy-dev.github.io/password-generator/

The current password and batch stay in tab memory. They are not sent to a server or saved in localStorage. Downloaded password files are sensitive. The length/category indicator is approximate and is not an audited strength score.

Each selected character set is represented at least once. Generation is bounded to 8–128 characters. Browser Web Crypto is required; there is no Math.random fallback.

## Run locally

Serve this folder through a local HTTP server, for example `python -m http.server 5186 --bind 127.0.0.1`, then open its printed address. Opening the file directly may block JavaScript modules.

## Checks

```powershell
node --test tests/password.test.mjs
```

The existing GitHub Pages configuration publishes the main branch automatically. This update repairs the previous mismatch between the advanced HTML interface and a script targeting different element IDs. The interface now presents the implemented features.
