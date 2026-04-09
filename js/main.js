/* ============================================================
   Bangkok Thaimassage – main.js
   ============================================================ */

/* --- Cookie Banner & Google Maps -------------------------- */
(function () {
  var CONSENT_KEY = 'cookie_consent';
  var banner      = document.getElementById('cookie-banner');
  var btnAccept   = document.getElementById('cookie-accept');
  var btnDecline  = document.getElementById('cookie-decline');
  var mapBtn      = document.getElementById('map-load-btn');
  var mapHolder   = document.getElementById('map-placeholder');
  var mapWrap     = document.getElementById('map-container');

  var MAPS_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2575.4430919010147!2d9.924048913244391!3d49.79653697135585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a291f851905bf1%3A0xc55ee3b8694e2669!2sBangkok%20Traditionelle%20Thai%20Massage%20W%C3%BCrzburg!5e0!3m2!1sen!2sth!4v1774796872615!5m2!1sen!2sth';

  function loadMap() {
    if (!mapWrap) return;
    var iframe = document.createElement('iframe');
    iframe.src = MAPS_SRC;
    iframe.title = 'Bangkok Thaimassage Würzburg auf Google Maps';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    if (mapHolder) mapHolder.remove();
    mapWrap.appendChild(iframe);
  }

  function hideBanner() {
    if (banner) banner.classList.remove('visible');
  }

  var consent = localStorage.getItem(CONSENT_KEY);

  // Karte automatisch laden wenn Nutzer bereits akzeptiert hat
  if (consent === 'accepted') {
    loadMap();
  }

  // Banner anzeigen wenn noch keine Entscheidung getroffen
  if (!consent && banner) {
    banner.classList.add('visible');
  }

  if (btnAccept) {
    btnAccept.addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      hideBanner();
      loadMap();
    });
  }

  if (btnDecline) {
    btnDecline.addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'declined');
      hideBanner();
    });
  }

  // Laden und Einwilligung speichern
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      hideBanner();
      loadMap();
    });
  }
})();

/* --- Hamburger Menu --------------------------------------- */
(function () {
  var btn = document.querySelector('.hamburger');
  var nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on link click
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* --- Slider ----------------------------------------------- */
(function () {
  var track   = document.getElementById('sliderTrack');
  if (!track) return;

  var slides  = track.querySelectorAll('.slide');
  var dots    = document.querySelectorAll('.slider-dot');
  var prev    = document.querySelector('.slider-arrow-prev');
  var next    = document.querySelector('.slider-arrow-next');
  var total   = slides.length;
  var current = 0;
  var timer;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, 5000);
  }

  if (prev) prev.addEventListener('click', function () { goTo(current - 1); startAuto(); });
  if (next) next.addEventListener('click', function () { goTo(current + 1); startAuto(); });

  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { goTo(i); startAuto(); });
  });

  // Touch / Swipe
  var startX = 0;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); startAuto(); }
  });

  // Pause on hover
  var wrapper = track.closest('.slider-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', function () { clearInterval(timer); });
    wrapper.addEventListener('mouseleave', startAuto);
  }

  startAuto();
})();

/* --- Scroll Reveal ------------------------------------------ */
(function () {
  // Elemente automatisch mit data-reveal taggen
  var map = [
    // index.html – Intro (3-spaltig)
    ['.intro-col-img:first-child',        'left',  false],
    ['.intro-col-text',                   'up',    false],
    ['.intro-col-img:last-child',         'right', false],
    // index.html – Moment
    ['.moment-image-wrap',                'left',  false],
    ['.moment-text',                      'right', false],
    // index.html – Massage
    ['.massage-text',                     'left',  false],
    ['.massage-image-wrap',               'right', false],
    // index.html – Galerie Header
    ['.gallery-header',                   'up',    false],
    // index.html – Darum
    ['.darum-main-img',                   'left',  false],
    ['.darum-text',                       'right', false],
    ['.darum-small-img',                  'up',    true],
    // index.html – Bewertungen
    ['.bew-header',                       'up',    false],
    ['.bewertung-card',                   'up',    true],
    // index.html – Kontakt-Block
    ['.contact-info-block',               'left',  false],
    ['.contact-hours-block',              'right', false],
    // index.html – Stellenanzeige
    ['.job-section-eyebrow',              'up',    false],
    ['.job-section-title',                'up',    false],
    ['.job-ad',                           'scale', false],
    // behandlungen.html
    ['.treatment-grid',                   'up',    false],
    // preise.html
    ['.prices-intro',                     'up',    false],
    ['.price-table-wrap',                 'up',    true],
    // kontakt.html
    ['.contact-page-grid > div',          'up',    true],
  ];

  map.forEach(function (item) {
    document.querySelectorAll(item[0]).forEach(function (el, i) {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', item[1]);
        if (item[2] && i > 0) {
          el.setAttribute('data-delay', Math.min(i, 4).toString());
        }
      }
    });
  });

  // IntersectionObserver – Fallback für ältere Browser
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    io.observe(el);
  });
})()
