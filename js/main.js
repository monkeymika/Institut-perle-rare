/* ============================================
   PERLE RARE — JavaScript principal
   ============================================ */

// ===== LOADER (injecté immédiatement, fonctionne sur toutes les pages) =====
(function () {
  const pearls = [
    { s: 24, b: 14, l:  7, dur: 2.2, d: 0    },
    { s: 14, b:  6, l: 26, dur: 2.8, d: 0.4  },
    { s:  9, b: 28, l: 17, dur: 2.1, d: 0.8  },
    { s: 30, b:  2, l: 44, dur: 3.0, d: 0.15 },
    { s: 11, b: 20, l: 56, dur: 2.5, d: 1.0  },
    { s: 18, b:  8, l: 65, dur: 2.3, d: 0.6  },
    { s:  8, b: 34, l: 38, dur: 1.9, d: 0.3  },
    { s: 17, b: 22, l: 73, dur: 2.6, d: 0.7  },
    { s: 10, b: 40, l: 31, dur: 2.4, d: 0.9  },
    { s: 21, b: 12, l: 35, dur: 2.7, d: 0.5  },
    { s: 12, b:  1, l: 59, dur: 2.0, d: 1.2  },
    { s:  6, b: 46, l: 50, dur: 1.8, d: 0.2  },
    { s: 15, b: 18, l: 12, dur: 2.9, d: 1.1  },
    { s:  7, b: 32, l: 80, dur: 2.2, d: 0.65 },
  ];

  const pearlsHTML = pearls.map(p =>
    `<span class="pearl" style="width:${p.s}px;height:${p.s}px;bottom:${p.b}%;left:${p.l}%;--dur:${p.dur}s;--delay:${p.d}s;"></span>`
  ).join('');

  const loaderEl = document.createElement('div');
  loaderEl.id = 'loader';
  loaderEl.className = 'loader';
  loaderEl.innerHTML = `
    <div class="loader__inner">
      <svg class="loader__svg-text" viewBox="0 0 304 304" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <path id="lpath" d="M 152,152 m -132,0 a 132,132 0 1,1 264,0 a 132,132 0 1,1 -264,0"/>
        </defs>
        <text font-family="'Jost',sans-serif" font-size="10.5" fill="rgba(154,122,94,0.58)" letter-spacing="2.8">
          <textPath href="#lpath">Soins esthétiques à Saint&#x2011;Dizier &nbsp;✦&nbsp; Soins esthétiques à Saint&#x2011;Dizier &nbsp;✦&nbsp;</textPath>
        </text>
      </svg>
      <div class="loader__ring"></div>
      <div class="loader__logo">
        <span class="loader__brand">Institut</span>
        <span class="loader__title">Perle Rare</span>
        <span class="loader__by">By Laura</span>
      </div>
      <div class="loader__pearls">${pearlsHTML}</div>
    </div>
  `;

  function inject() { document.body.prepend(loaderEl); }
  if (document.body) { inject(); }
  else { document.addEventListener('DOMContentLoaded', inject); }

  function hide() {
    loaderEl.classList.add('loader--hidden');
    setTimeout(() => { if (loaderEl.parentNode) loaderEl.remove(); }, 800);
  }

  if (document.readyState === 'complete') {
    setTimeout(hide, 700);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 600));
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // ===== HEADER SCROLL =====
  const header = document.getElementById('header');

  const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  // ===== MENU HAMBURGER =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Fermer en cliquant en dehors du contenu
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Sous-menu mobile toggle
  const subToggles = document.querySelectorAll('.mobile-sub-toggle');
  subToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = toggle.nextElementSibling;
      if (!sub) return;
      const isVisible = sub.style.display === 'block';
      sub.style.display = isVisible ? 'none' : 'block';
      toggle.classList.toggle('open', !isVisible);
    });
  });

  // Fermer menu mobile sur lien (sauf toggle)
  const mobileLinks = document.querySelectorAll('.mobile-menu__sub-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback : tout révéler immédiatement
    revealEls.forEach(el => el.classList.add('revealed'));
  }


  // ===== FORMULAIRE CONTACT =====
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      // Simulation d'envoi (à remplacer par un vrai backend ou Formspree)
      await new Promise(resolve => setTimeout(resolve, 1200));

      btn.textContent = 'Message envoyé ✓';
      btn.style.background = '#5a8a6a';
      btn.style.borderColor = '#5a8a6a';

      setTimeout(() => {
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 4000);
    });
  }


  // ===== NAV ACTIVE STATE =====
  const navLinks = document.querySelectorAll('.nav__link');
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkFile = href.split('/').pop();

    if (
      linkFile === currentFile ||
      (currentFile === '' && linkFile === 'index.html') ||
      (currentFile !== 'index.html' && href !== 'index.html' && currentFile.includes(linkFile.replace('.html', '')))
    ) {
      link.classList.add('active');
    }
  });


  // ===== FLOATING PEARLS + PARALLAX =====
  (function initPearls() {
    const pool = [
      [{ s:44, t:10, l: 3, dur:14, d:0,   o:0.60, spd:0.70 }, { s:20, t:62, l:91, dur:11, d:3,   o:0.50, spd:0.50 }, { s:28, t:80, l:18, dur:16, d:6,   o:0.44, spd:0.65 }, { s:14, t:35, l:55, dur: 9, d:2,   o:0.42, spd:0.40 }, { s:24, t:70, l:40, dur:13, d:8,   o:0.46, spd:0.55 }, { s:10, t:20, l:72, dur:10, d:1,   o:0.38, spd:0.80 }, { s:18, t:50, l:25, dur:12, d:5,   o:0.42, spd:0.45 }],
      [{ s:26, t:16, l:94, dur:13, d:2,   o:0.54, spd:0.60 }, { s:16, t:74, l: 7, dur:10, d:4,   o:0.46, spd:0.48 }, { s:36, t:44, l:82, dur:15, d:1,   o:0.50, spd:0.72 }, { s:12, t:25, l:35, dur: 8, d:5,   o:0.40, spd:0.42 }, { s:20, t:58, l:60, dur:12, d:0,   o:0.44, spd:0.58 }, { s:30, t: 5, l:50, dur:14, d:7,   o:0.48, spd:0.85 }, { s:10, t:88, l:20, dur: 9, d:3,   o:0.36, spd:0.38 }],
      [{ s:22, t:12, l:13, dur:12, d:1,   o:0.52, spd:0.55 }, { s:32, t:66, l:86, dur:14, d:5,   o:0.46, spd:0.68 }, { s:14, t:48, l:50, dur: 9, d:7,   o:0.42, spd:0.44 }, { s:18, t:82, l:30, dur:11, d:3,   o:0.44, spd:0.52 }, { s:30, t:30, l:72, dur:15, d:9,   o:0.48, spd:0.75 }, { s:12, t:55, l: 5, dur:13, d:2,   o:0.38, spd:0.90 }, { s:24, t: 8, l:60, dur:16, d:6,   o:0.50, spd:0.62 }],
      [{ s:18, t:26, l:46, dur:11, d:0.5, o:0.48, spd:0.50 }, { s:38, t:60, l: 5, dur:15, d:2.5, o:0.56, spd:0.78 }, { s:16, t: 7, l:74, dur:10, d:5,   o:0.44, spd:0.46 }, { s:24, t:45, l:28, dur:13, d:7,   o:0.46, spd:0.60 }, { s:12, t:78, l:65, dur: 8, d:4,   o:0.40, spd:0.42 }, { s:20, t:15, l:88, dur:12, d:1,   o:0.44, spd:0.70 }, { s:10, t:70, l:38, dur:10, d:8,   o:0.36, spd:0.85 }],
      [{ s:28, t:53, l:97, dur:13, d:3.5, o:0.50, spd:0.65 }, { s:14, t:84, l:36, dur: 8, d:1,   o:0.42, spd:0.48 }, { s:24, t:20, l:64, dur:14, d:4,   o:0.48, spd:0.72 }, { s:34, t: 6, l:22, dur:16, d:6,   o:0.52, spd:0.88 }, { s:16, t:68, l:48, dur:10, d:2,   o:0.42, spd:0.55 }, { s:10, t:38, l:80, dur:11, d:9,   o:0.38, spd:0.40 }, { s:22, t:92, l:10, dur:15, d:0,   o:0.44, spd:0.60 }],
      [{ s:40, t: 7, l:84, dur:16, d:2,   o:0.54, spd:0.75 }, { s:18, t:72, l:22, dur:11, d:6,   o:0.46, spd:0.50 }, { s:22, t:42, l:56, dur:12, d:0,   o:0.48, spd:0.68 }, { s:12, t:58, l:10, dur: 9, d:3,   o:0.40, spd:0.42 }, { s:26, t:88, l:75, dur:14, d:8,   o:0.44, spd:0.58 }, { s:16, t:22, l:40, dur:13, d:5,   o:0.50, spd:0.82 }, { s:10, t:65, l:95, dur:10, d:1,   o:0.36, spd:0.46 }],
    ];

    // Couche fixe globale : au-dessus des fonds de sections (z-index:1),
    // en-dessous du contenu (section > .container a z-index:2)
    const layer = document.createElement('div');
    layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;overflow:visible;z-index:1;';
    document.body.prepend(layer);

    const wrappers = [];
    let idx = 0;

    document.querySelectorAll('section:not(.page-hero)').forEach(section => {
      const pearlSet = pool[idx % pool.length];
      idx++;

      pearlSet.forEach(p => {
        const wrap = document.createElement('div');
        wrap.style.cssText = `position:absolute;width:${p.s}px;height:${p.s}px;left:${p.l}%;will-change:top;`;
        wrap._spd = p.spd;
        wrap._t   = p.t;
        wrap._section = section;

        const span = document.createElement('span');
        span.className = 'pearl-float';
        span.style.cssText = `width:100%;height:100%;position:absolute;inset:0;--dur:${p.dur}s;--delay:${p.d}s;--opacity:${p.o};`;

        wrap.appendChild(span);
        layer.appendChild(wrap);
        wrappers.push(wrap);
      });
    });

    // Tick : recalcule la position viewport de chaque perle + parallaxe
    let rafId = null;
    function tick() {
      wrappers.forEach(wrap => {
        const section = wrap._section;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
        const parallaxOffset = progress * rect.height * wrap._spd;
        const top = rect.top + (wrap._t / 100) * rect.height - parallaxOffset;
        wrap.style.top = top + 'px';
      });
      rafId = null;
    }

    window.addEventListener('scroll', () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }, { passive: true });

    requestAnimationFrame(tick);
  })();

  // ===== CTA PINNED REVEAL =====
  (function initCtaReveal() {
    const wrapper = document.querySelector('.cta-pin-wrapper');
    const section = document.querySelector('.cta-section');
    const inner   = document.querySelector('.cta-inner');
    if (!wrapper || !section || !inner) return;

    let rafId = null;
    function tick() {
      const rect     = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;                          // px défilés dans le wrapper
      const total    = wrapper.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      // clip-path : circle(0%) → circle(150%) sur tout le scroll
      const radius = 150 * easeOutCubic(progress);
      section.style.clipPath = `circle(${radius.toFixed(2)}% at 50% 50%)`;

      // Contenu : fade-in après 60% de progression
      const contentP = Math.max(0, Math.min(1, (progress - 0.6) / 0.25));
      inner.style.opacity   = contentP;
      inner.style.transform = `scale(${0.96 + 0.04 * contentP})`;

      rafId = null;
    }

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    window.addEventListener('scroll', () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }, { passive: true });

    requestAnimationFrame(tick);
  })();

  // ===== SMOOTH SCROLL pour ancres =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
