/**
 * sellyourdvc.com — landing page JS
 * Form validation + GA4 conversion event firing.
 */

(function () {
  'use strict';

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    const SCROLL_THRESHOLD = 400;
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

  // GA4 event firing for phone/email click links (delegated)
  document.addEventListener('click', function (e) {
    const target = e.target.closest('[data-event]');
    if (!target) return;
    const eventName = target.dataset.event;
    const location = target.dataset.location || 'unknown';
    if (typeof gtag === 'function') {
      gtag('event', eventName, { location: location });
    }
  });

  // Form submission: client validation, recaptcha check, GA4 event, then native submit
  const form = document.getElementById('seller-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    if (!form.checkValidity()) {
      return;
    }

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
