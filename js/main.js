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
