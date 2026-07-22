// Loader (solo corre si existe #loader en la página, ej. index.html)
window.addEventListener('load', function () {
  var loader = document.getElementById('loader');
  if (loader) {
    setTimeout(function () {
      document.body.classList.remove('loading');
      loader.addEventListener('animationend', function () { loader.remove(); });
    }, 2600);
  }
});

// Menú móvil
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var links = document.querySelector('nav.links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Resaltar el link de la página actual
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current) { a.classList.add('active'); }
  });

  // Animaciones al hacer scroll (se aplican automáticamente a bloques comunes)
  var autoSelectors = '.section-head, .s-card, .p-card, .stat-box, .stat, .t-item, .t-card, .p-step, .about-photo, .about-text, .hero-frame-wrap, .contact-info, form, .calendar-block';
  document.querySelectorAll(autoSelectors).forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i % 6, 5) * 0.08) + 's';
  });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
});

/* ---------- Selector de idioma ES / EN (Google Translate) ---------- */
function setSiteLanguage(lang) {
  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
  localStorage.setItem('siteLang', lang);
  var combo = document.querySelector('select.goog-te-combo');
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event('change'));
  } else if (lang === 'en') {
    // El widget aún no cargó: reintenta en un momento
    setTimeout(function () { setSiteLanguage('en'); }, 400);
  }
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'es', includedLanguages: 'en,es', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
    'google_translate_element'
  );
  var saved = localStorage.getItem('siteLang');
  if (saved === 'en') { setTimeout(function () { setSiteLanguage('en'); }, 600); }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.lang-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () { setSiteLanguage(btn.getAttribute('data-lang')); });
  });
  var saved = localStorage.getItem('siteLang') || 'es';
  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-lang') === saved);
  });
});
