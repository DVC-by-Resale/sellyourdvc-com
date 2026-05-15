/**
 * sellyourdvc.com — landing page JS
 * Form validation + GA4 events + scroll reveal + sticky-CTA visibility.
 */

(function () {
  'use strict';

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Theme switcher — preview design variations.
     Persists user pick to localStorage; default theme is B (no class). */
  const themeSwitcher = document.getElementById('theme-switcher');
  if (themeSwitcher) {
    const toggleBtn = document.getElementById('theme-switcher-toggle');
    const optionsMenu = document.getElementById('theme-switcher-options');
    const currentLabel = document.getElementById('theme-switcher-current');
    const themeButtons = optionsMenu.querySelectorAll('[data-theme]');
    const VALID_THEMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const STORAGE_KEY = 'sellyourdvc-theme';

    const applyTheme = function (theme) {
      if (VALID_THEMES.indexOf(theme) === -1) theme = 'b';
      VALID_THEMES.forEach(function (t) {
        document.body.classList.remove('theme-' + t);
      });
      if (theme !== 'b') document.body.classList.add('theme-' + theme);
      currentLabel.textContent = theme.toUpperCase();
      themeButtons.forEach(function (btn) {
        const isActive = btn.dataset.theme === theme;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    };

    const setMenuOpen = function (open) {
      optionsMenu.hidden = !open;
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      themeSwitcher.setAttribute('data-open', open ? 'true' : 'false');
    };

    let savedTheme = 'b';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) savedTheme = stored;
    } catch (e) {}
    applyTheme(savedTheme);

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenuOpen(optionsMenu.hidden);
    });

    themeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.dataset.theme);
        setMenuOpen(false);
      });
    });

    document.addEventListener('click', function (e) {
      if (!themeSwitcher.contains(e.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenuOpen(false);
    });
  }

  /* Scroll-to-top button */
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    const SCROLL_THRESHOLD = 500;
    const toggleScrollBtn = function () {
      if (window.scrollY > SCROLL_THRESHOLD) {
        scrollBtn.classList.add('is-visible');
      } else {
        scrollBtn.classList.remove('is-visible');
      }
    };
    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleScrollBtn();
  }

  /* Sticky mobile CTA — appears after the hero is mostly scrolled past,
     hides when the form section enters view (form is visible, no need for sticky) */
  const stickyCta = document.getElementById('sticky-cta');
  if (stickyCta && 'IntersectionObserver' in window) {
    const hero = document.querySelector('.hero');
    const formSection = document.getElementById('form');
    let heroOut = false;
    let formIn = false;
    const update = function () {
      if (heroOut && !formIn) {
        stickyCta.classList.add('is-visible');
        stickyCta.setAttribute('aria-hidden', 'false');
      } else {
        stickyCta.classList.remove('is-visible');
        stickyCta.setAttribute('aria-hidden', 'true');
      }
    };
    if (hero) {
      const heroObserver = new IntersectionObserver(function (entries) {
        heroOut = !entries[0].isIntersecting;
        update();
      }, { threshold: 0, rootMargin: '-60% 0px 0px 0px' });
      heroObserver.observe(hero);
    }
    if (formSection) {
      const formObserver = new IntersectionObserver(function (entries) {
        formIn = entries[0].isIntersecting;
        update();
      }, { threshold: 0.1 });
      formObserver.observe(formSection);
    }
  }

  /* Scroll reveal — auto-tag major sections with .reveal,
     IntersectionObserver adds .is-visible when entering viewport */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll(
      '.promise-process .container > *, ' +
      '.testimonials .container > *, ' +
      '.form-section .container > *, ' +
      '.faq .container > *, ' +
      '.about .container > *, ' +
      '.contact-strip .container > *'
    );
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* GA4 event firing for phone/email click links (delegated) */
  document.addEventListener('click', function (e) {
    const target = e.target.closest('[data-event]');
    if (!target) return;
    const eventName = target.dataset.event;
    const location = target.dataset.location || 'unknown';
    if (typeof gtag === 'function') {
      gtag('event', eventName, { location: location });
    }
  });

  /* Form submission */
  const form = document.getElementById('seller-form');
  if (!form) return;

  /* Old Key West deed-expiration conditional field —
     OKW is the only resort with two possible deed expiration years (2042 or 2057),
     so reveal the year selector only when OKW is chosen, otherwise keep it hidden
     and disabled so it never submits a stray value. */
  const resortSelect = document.getElementById('resort');
  const okwRow = document.getElementById('okw-expiration-row');
  const okwSelect = document.getElementById('okw_expiration');
  if (resortSelect && okwRow && okwSelect) {
    const toggleOkwField = function () {
      const isOkw = resortSelect.value === 'Old Key West';
      okwRow.hidden = !isOkw;
      okwSelect.disabled = !isOkw;
      okwSelect.required = isOkw;
      if (!isOkw) okwSelect.value = '';
    };
    resortSelect.addEventListener('change', toggleOkwField);
    toggleOkwField();
  }

  form.addEventListener('submit', function (e) {
    if (!form.checkValidity()) return;

    if (typeof grecaptcha !== 'undefined') {
      const response = grecaptcha.getResponse();
      if (!response) {
        e.preventDefault();
        alert('Please confirm you are not a robot before submitting.');
        return;
      }
    }

    if (typeof gtag === 'function') {
      gtag('event', 'form_submit', {
        form_id: 'seller-form',
        page_location: window.location.href
      });
    }
  });
})();
