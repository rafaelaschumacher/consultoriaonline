/* =========================================================================
   Rafaela Schumacher — comportamentos da página
   ========================================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Ano no rodapé ---------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Tema claro / escuro ---------- */
  var themeToggle = $('#themeToggle');
  if (themeToggle) {
    var syncLabel = function () {
      var escuro = root.dataset.theme === 'dark';
      themeToggle.setAttribute('aria-label', escuro ? 'Ativar tema claro' : 'Ativar tema escuro');
    };
    syncLabel();
    themeToggle.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('tema', root.dataset.theme); } catch (e) { /* ignora */ }
      syncLabel();
    });
  }

  /* ---------- Menu mobile ---------- */
  var menuToggle = $('#menuToggle');
  var nav = $('#nav');
  var scrim = $('#navScrim');

  if (menuToggle && nav) {
    var setMenu = function (abrir) {
      nav.classList.toggle('is-open', abrir);
      menuToggle.classList.toggle('is-open', abrir);
      document.body.classList.toggle('nav-open', abrir);
      menuToggle.setAttribute('aria-expanded', String(abrir));
      menuToggle.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
      if (scrim) scrim.hidden = !abrir;
      if (abrir) {
        var primeiro = nav.querySelector('a');
        if (primeiro) primeiro.focus();
      }
    };

    menuToggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });

    if (scrim) scrim.addEventListener('click', function () { setMenu(false); });

    $$('a', nav).forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    // Esc fecha; Tab fica preso dentro do menu enquanto ele estiver aberto.
    document.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (e.key === 'Escape') { setMenu(false); menuToggle.focus(); return; }
      if (e.key !== 'Tab') return;
      var foco = $$('a, button', nav);
      if (!foco.length) return;
      var primeiro = foco[0], ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
    });

    // Volta ao estado normal ao passar para o layout de desktop.
    matchMedia('(min-width: 1181px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- FAQ ---------- */
  $$('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var aberto = btn.getAttribute('aria-expanded') === 'true';

      $$('.faq__question').forEach(function (outro) {
        outro.setAttribute('aria-expanded', 'false');
        outro.closest('.faq__item').classList.remove('is-open');
      });

      if (!aberto) {
        btn.setAttribute('aria-expanded', 'true');
        item.classList.add('is-open');
      }
    });
  });

  /* ---------- Lightbox dos depoimentos ---------- */
  var lightbox = $('#lightbox');
  var lightboxImg = $('#lightboxImg');
  var lightboxClose = $('#lightboxClose');

  if (lightbox && lightboxImg && typeof lightbox.showModal === 'function') {
    var ultimoBotao = null;

    $$('[data-lightbox]').forEach(function (btn) {
      var img = btn.querySelector('img');
      if (!img) return;
      btn.addEventListener('click', function () {
        ultimoBotao = btn;
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt;
        lightbox.showModal();
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', function () { lightbox.close(); });

    // Clique fora da imagem fecha.
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener('close', function () {
      lightboxImg.src = '';
      if (ultimoBotao) { ultimoBotao.focus(); ultimoBotao = null; }
    });
  }

  /* ---------- Header com sombra ao rolar ---------- */
  var header = $('#header');
  var whatsapp = $('#whatsappFloat');
  var ticking = false;

  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Esconde o botão do WhatsApp sobre o rodapé ---------- */
  var footer = $('.footer');
  if (whatsapp && footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      whatsapp.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { rootMargin: '0px 0px -40% 0px' }).observe(footer);
  }

  /* ---------- Revelação ao rolar ---------- */
  var reveals = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Link ativo na navegação ---------- */
  var links = $$('.nav__link[href^="#"]');
  var secoes = links
    .map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (secoes.length && 'IntersectionObserver' in window) {
    var marcar = function (id) {
      links.forEach(function (l) {
        l.classList.toggle('is-active', l.getAttribute('href') === '#' + id);
      });
    };
    var spy = new IntersectionObserver(function (entries) {
      var visiveis = entries.filter(function (e) { return e.isIntersecting; });
      if (!visiveis.length) return;
      visiveis.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      marcar(visiveis[0].target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(function (s) { spy.observe(s); });
  }

})();
