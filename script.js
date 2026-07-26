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

/* ---------- Selector de idioma ES / EN (Weglot) ---------- */
function setSiteLanguage(lang) {
  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
  if (typeof Weglot !== 'undefined' && Weglot.switchTo) {
    Weglot.switchTo(lang);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.lang-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () { setSiteLanguage(btn.getAttribute('data-lang')); });
  });
  if (typeof Weglot !== 'undefined' && Weglot.on) {
    Weglot.on('languageChanged', function (newLang) {
      document.querySelectorAll('.lang-switch button').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === newLang);
      });
    });
  }
});

/* ---------- Detalle de servicio (overlay compartido: Home + Servicios) ---------- */
var SERVICE_DATA = {
  identidad: {
    icon: '<svg viewBox="0 0 24 24"><path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" stroke-linejoin="round"/></svg>',
    title: 'Identidad visual',
    desc: 'Logotipo, paleta, tipografía y manual de marca completo: el sistema visual que hace que te reconozcan a la primera.',
    ideal: 'Negocios nuevos, o marcas que quieren renovar su imagen desde cero.'
  },
  digital: {
    icon: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4" stroke-linecap="round"/></svg>',
    title: 'Diseño digital',
    desc: 'Piezas para redes, web y presentaciones, pensadas para tu audiencia y para cómo se consume contenido hoy.',
    ideal: 'Marcas activas en redes que necesitan contenido constante y coherente.'
  },
  impreso: {
    icon: '<svg viewBox="0 0 24 24"><path d="M6 9V3h12v6M6 18H4a1 1 0 01-1-1v-6a1 1 0 011-1h16a1 1 0 011 1v6a1 1 0 01-1 1h-2M6 14h12v7H6z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    title: 'Material impreso',
    desc: 'Tarjetas, folletos, empaques y señalética: diseño que se sostiene igual de bien en papel que en pantalla.',
    ideal: 'Negocios con presencia física — tiendas, oficinas, eventos.'
  },
  editorial: {
    icon: '<svg viewBox="0 0 24 24"><path d="M12 6c-2-1.5-5-2-8-1v13c3-1 6-.5 8 1 2-1.5 5-2 8-1V5c-3-1-6-.5-8 1zM12 6v13" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    title: 'Diseño editorial',
    desc: 'Revistas, catálogos, libros y reportes maquetados con una jerarquía clara y una lectura cómoda.',
    ideal: 'Empresas que publican catálogos, revistas o reportes con regularidad.'
  },
  community: {
    icon: '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    title: 'Community manager',
    desc: 'Calendario de contenido, diseño de publicaciones y gestión de tus redes para que tu marca hable todos los días.',
    ideal: 'Marcas que quieren delegar sus redes sin perder coherencia visual.'
  },
  branding: {
    icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15 9l-4 2-2 4 4-2 2-4z" stroke-linejoin="round"/></svg>',
    title: 'Branding & estrategia',
    desc: 'Diagnóstico de marca y plan de acción: hacia dónde va tu marca y cómo se ve cada paso del camino.',
    ideal: 'Marcas ya establecidas que sienten que su imagen ya no las representa.'
  }
};

function openServiceDetail(key) {
  var data = SERVICE_DATA[key];
  var overlay = document.getElementById('svcOverlay');
  if (!data || !overlay) return;
  overlay.querySelector('.s-icon').innerHTML = data.icon;
  overlay.querySelector('.svc-panel-title').textContent = data.title;
  overlay.querySelector('.svc-panel-desc').textContent = data.desc;
  overlay.querySelector('.svc-panel-ideal').textContent = data.ideal;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeServiceDetail() {
  var overlay = document.getElementById('svcOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-service]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openServiceDetail(el.getAttribute('data-service'));
    });
  });
  var overlay = document.getElementById('svcOverlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeServiceDetail();
    });
    var closeBtn = overlay.querySelector('.svc-panel-close');
    if (closeBtn) closeBtn.addEventListener('click', closeServiceDetail);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeServiceDetail();
  });
});
