/* ViPrint — shared interactions */
(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  /* ---------- Active nav link (mark current page) ---------- */
  (function markActive() {
    var links = document.querySelectorAll('.nav a');
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  })();

  /* ---------- Hero slider ---------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var slides = hero.querySelectorAll('.hero-slide');
    var dotsWrap = hero.querySelector('.hero-dots');
    var idx = 0;
    var timer = null;

    // build dots
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(b);
    });
    var dots = dotsWrap.querySelectorAll('button');

    function goTo(i) {
      slides[idx].classList.remove('active');
      dots[idx].classList.remove('active');
      idx = (i + slides.length) % slides.length;
      slides[idx].classList.add('active');
      dots[idx].classList.add('active');
    }
    function next() { goTo(idx + 1); }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, 6000);
    }
    hero.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);
    restart();
  }

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(function (item) {
    var head = item.querySelector('.acc-head');
    if (!head) return;
    head.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // close siblings
      item.parentElement.querySelectorAll('.acc-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.acc-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        var body = item.querySelector('.acc-body');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
  // open first accordion item by default
  var firstAcc = document.querySelector('.acc-item');
  if (firstAcc) {
    firstAcc.classList.add('open');
    var fb = firstAcc.querySelector('.acc-body');
    if (fb) fb.style.maxHeight = fb.scrollHeight + 'px';
  }

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector('.mainbar');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ---------- Contact form (demo submit) ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('formSuccess');
      form.reset();
      if (success) {
        success.classList.add('show');
        setTimeout(function () { success.classList.remove('show'); }, 6000);
      }
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
