<div align="center">

# Bangkok Thaimassage Würzburg

**Landing page for a Thai massage studio in Würzburg, Germany**

[![Live](https://img.shields.io/badge/live-bangkok--thaimassage--wuerzburg.de-2d4a8a?style=flat-square)](https://bangkok-thaimassage-wuerzburg.de)
[![HTML5](https://img.shields.io/badge/HTML5-semantic-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-custom-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GDPR](https://img.shields.io/badge/GDPR-compliant-4CAF50?style=flat-square)](https://gdpr.eu)

<br>

![Bangkok Thaimassage Würzburg Preview](./img/hero-bg.webp)

</div>

---

## Overview

Multi-page website for Bangkok Thaimassage, a Thai massage studio in Würzburg, Germany — targeting local customers searching for Thai massage and wellness treatments. Built without any framework: pure HTML5, CSS3, and minimal Vanilla JavaScript. Hosted on Hetzner Shared Hosting.

**Industry:** Thai massage, wellness  
**Languages:** DE  
**Pages:** 7 (index, behandlungen, preise, kontakt, datenschutz, impressum, cookie-policy)  
**Contact:** Phone, WhatsApp, contact form  

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | HTML5 | Semantic elements, ARIA labels |
| Styling | CSS3 | Custom, mobile-first |
| Scripting | Vanilla JS | No libraries |
| CDN / Security | Cloudflare | DDoS protection, HTTPS, caching |
| Hosting | Hetzner Shared | Apache, `.htaccess` CSP + HSTS |

---

## Technical Details

**No framework — by design**  
Shared hosting, zero npm dependencies, sub-3-second load time on mobile. Rebuilt from WordPress to pure HTML for full control over performance and GDPR compliance.

**Contact form**  
Handled via a separate PHP backend with minimal required fields (name, email, message). GDPR-compliant: no unnecessary data collected, privacy notice inline below the form.

**GDPR compliance**
- All fonts (WOFF2) hosted locally — no Google Fonts, no external CDNs
- Google Maps with 2-click consent solution — map loads only after explicit user action, no data sent without consent
- WhatsApp link with pre-filled message — no plugin, no tracking
- Contact form: only name, email, message — data minimization per Art. 5 DSGVO
- Impressum and Datenschutzerklärung on every page in the footer (§5 DDG, Art. 13 DSGVO)

**Performance**
- All images as WebP with `loading="lazy"`
- LCP-optimized hero image (preload + priority)
- Fonts locally hosted as WOFF2
- `.htaccess` with compression and cache headers

---

## Project Structure

```
index.html            # Home page
behandlungen.html     # Treatments overview
preise.html           # Pricing
kontakt.html          # Contact page
datenschutz.html      # Privacy policy
impressum.html        # Legal notice
cookie-policy.html    # Cookie policy
css/
  style.css           # Main stylesheet
  style.min.css       # Minified version
js/
  main.js             # Scroll animations, mobile nav
fonts/                # WOFF2 — locally hosted
img/                  # WebP — optimized
.htaccess             # Apache config: CSP, HSTS, compression
deploy.sh             # SFTP deployment script
.env.example          # Environment variable template
```

---

## Local Development

```bash
# Preview on http://localhost:8080
python3 -m http.server 8080
```

No Node.js, no npm, no build step.

---

## Deployment

`deploy.sh` uploads files to Hetzner via SFTP. Credentials are stored in a gitignored `.env` file.

```bash
cp .env.example .env   # fill in SFTP credentials
bash deploy.sh         # deploy
```

---

## License

MIT — see [LICENSE](LICENSE)
