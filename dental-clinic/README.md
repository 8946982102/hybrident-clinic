# HybriDent — Static Dental Website

## Included
- Separate pages: `index.html`, `about.html`, `services.html`, `gallery.html`, `pricing.html`, `contact.html`
- Shared stylesheet: `assets/css/main.css`
- Shared JavaScript: `assets/js/main.js`
- Local dental logo/icon SVGs
- Local hero teeth illustration: `assets/images/teeth-hero.svg`
- Local image fallback: `assets/images/dental-fallback.svg`

## Chat Assistant
The website uses a **keyless local dental assistant**. It does not ask visitors for a Gemini API key, does not store API keys, and makes no Gemini API requests from the browser. It provides instant answers for common clinic questions such as services, pricing, timings, appointments, emergency care, insurance, location, and team.

## Image reliability
Remote Unsplash images remain as the original visual sources. Every `<img>` has a client-side error fallback, and inline background images are also protected with the local dental fallback so a failed remote request does not leave an empty image area.

## Hosting
Works as a normal static site on GitHub Pages, Hostinger, Netlify, Vercel static hosting, or any standard web server.
