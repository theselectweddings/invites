/* The Select · wedding invitation — builds the page from wedding.js.
   You should not need to edit this file. */
(function () {
  'use strict';
  var W = window.WEDDING;
  if (!W) { document.body.classList.remove('locked'); return; }

  /* =================== PALETTES =================== */
  var PALETTES = {
    lotus:     { label: 'Lotus Pink & Ivory', paper: '#FEF6F3', paper2: '#F9E3E4', gold: '#C2456A', line: '#E8B4C0', sage: '#8FAE5A', ink: '#2B2324', muted: '#7D6668', btnInk: '#FFF5F6' },
    champagne: { label: 'Champagne & Sage', paper: '#F8EBD8', paper2: '#F2E2C9', gold: '#A7843E', line: '#C9AE78', sage: '#7C8455', ink: '#5A4A30', muted: '#8A7A5E', btnInk: '#FFF8EC' },
    select:    { label: 'Sage & Copper (The Select)', paper: '#FBF1EA', paper2: '#F1DBD0', gold: '#B0692D', line: '#D7A57A', sage: '#8A9468', ink: '#4F4535', muted: '#84776A', btnInk: '#FFF6EF' },
    royal:     { label: 'Royal Maroon & Gold', paper: '#FBF1E6', paper2: '#F1DCCB', gold: '#7E2230', line: '#C6A263', sage: '#9C7A3C', ink: '#4A2A2A', muted: '#86685F', btnInk: '#FCEFD9' },
    emerald:   { label: 'Emerald & Gold', paper: '#F6F2E6', paper2: '#E8E6D2', gold: '#2F5E4E', line: '#BFA265', sage: '#6E7F5E', ink: '#2E3B33', muted: '#6C7666', btnInk: '#F7F1DE' },
    rose:      { label: 'Rose & Blush', paper: '#FCEFEA', paper2: '#F5DCD6', gold: '#A35E6B', line: '#D9AFA6', sage: '#8F8A6A', ink: '#5A3A40', muted: '#8E7177', btnInk: '#FFF4F1' },
    ocean:     { label: 'Ocean & Sand', paper: '#F5F1E8', paper2: '#E4E9E4', gold: '#2E6070', line: '#C2A66E', sage: '#6F8C88', ink: '#2C3D42', muted: '#6B7A7D', btnInk: '#F4F0E4' }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var show = W.show || {};
  function get(path) { return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, W); }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  // "28th February 2027" -> 28<sup>th</sup> February 2027, built safely
  function withOrdinals(node, text) {
    String(text).split(/(\d+(?:st|nd|rd|th)\b)/).forEach(function (part) {
      var m = /^(\d+)(st|nd|rd|th)$/.exec(part);
      if (m) { node.appendChild(document.createTextNode(m[1])); node.appendChild(el('sup', '', m[2])); }
      else if (part) node.appendChild(document.createTextNode(part));
    });
    return node;
  }

  var pal = PALETTES[(W.theme || {}).palette] ? W.theme.palette : 'lotus';
  function applyPalette() {
    var p = PALETTES[pal], r = document.documentElement.style;
    ['paper', 'paper2', 'gold', 'line', 'sage', 'ink', 'muted'].forEach(function (k) { r.setProperty('--' + k, p[k]); });
    r.setProperty('--btn-ink', p.btnInk);
  }
  applyPalette();

  /* ---------- artwork ---------- */
  var art = W.art || {};
  var decorPath = art.floralPath || (art.decor === 'sage' ? 'images/floral-' : 'images/lotus-');
  var lotusGarden = art.florals !== false && art.decor !== 'sage' && window.SELECT_FX;
  if (lotusGarden) {
    document.documentElement.classList.add('decor-lotus');
    var gd = document.createElement('div'); gd.className = 'garden'; gd.innerHTML = window.SELECT_FX.garden('l') + window.SELECT_FX.garden('r');
    document.body.appendChild(gd);
  }
  if (art.venue) { $('#artImg').src = art.venue; $('#artImg').alt = 'Watercolour of ' + (W.venue && W.venue.name || 'the venue'); }
  else $('#art').hidden = true;
  $$('[data-floral]').forEach(function (img) {
    if (art.florals === false) { img.remove(); return; }
    img.src = decorPath + img.getAttribute('data-floral') + '.png';
  });
  if (art.florals !== false && art.sides !== false) document.documentElement.style.setProperty('--side-floral', 'url("' + decorPath + 'side.png")');

  /* ---------- guest name from link: ?to=Sharma%20Family ---------- */
  var guest = '';
  try { guest = (new URLSearchParams(location.search).get('to') || '').slice(0, 60); } catch (e) {}
  W.guestLine = guest ? 'Dear ' + guest + ',' : '';

  /* ---------- text ---------- */
  $$('[data-k]').forEach(function (n) {
    var v = get(n.getAttribute('data-k'));
    if (typeof v === 'string' && v) { n.textContent = v; n.hidden = false; }
    else if (n.matches('.blessing,.opening__dear,.welcome,.rsvp__intro,.venue__addr,.caps--lede')) n.hidden = true;
  });
  document.title = W.couple.first + ' & ' + W.couple.second + (W.dates && W.dates.display ? ' · ' + W.dates.display : '');
  Object.keys(show).forEach(function (k) { if (show[k] === false) { var s = document.getElementById(k); if (s) s.hidden = true; } });

  /* ---------- opening ---------- */
  var opening = $('#opening'), audio = $('#music'), mbtn = $('#musicBtn');
  var FX = window.SELECT_FX;
  if (FX) $('#sealArt').innerHTML = FX.waxSeal(W.couple.monogram || '', (W.theme || {}).wax);
  $('#seal').addEventListener('click', function () {
    if (opening.classList.contains('open')) return;
    if (FX && W.petals !== false) FX.petalShower();
    var gdn = document.querySelector('.garden'); if (gdn) setTimeout(function () { gdn.classList.add('grow'); }, 500);
    opening.classList.add('open');
    document.body.classList.remove('locked');
    if (W.music) { mbtn.hidden = false; var p = audio.play(); if (p && p.catch) p.catch(function () { mbtn.classList.add('off'); }); }
    setTimeout(function () { opening.classList.add('gone'); }, reduce ? 0 : 1600);
  });
  var song = (W.music === undefined || W.music === '' || W.music === 'default') ? 'images/music.mp3' : (W.music === 'none' ? '' : W.music);
  W.music = song;
  if (song) audio.src = song;
  mbtn.addEventListener('click', function () {
    if (audio.paused) { audio.play().catch(function () {}); mbtn.classList.remove('off'); mbtn.setAttribute('aria-label', 'Pause music'); }
    else { audio.pause(); mbtn.classList.add('off'); mbtn.setAttribute('aria-label', 'Play music'); }
  });

  /* ---------- countdown ---------- */
  (function () {
    var target = new Date(W.dates.countdownTo).getTime();
    if (isNaN(target)) { $('#countdown').hidden = true; return; }
    var u = {}; $$('#count b').forEach(function (b) { u[b.getAttribute('data-u')] = b; });
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    var iv;
    function tick() {
      var t = target - Date.now();
      if (t <= 0) { $('#count').hidden = true; $('#countDone').hidden = false; clearInterval(iv); return; }
      u.d.textContent = Math.floor(t / 864e5); u.h.textContent = pad(Math.floor(t / 36e5) % 24);
      u.m.textContent = pad(Math.floor(t / 6e4) % 60); u.s.textContent = pad(Math.floor(t / 1e3) % 60);
    }
    iv = setInterval(tick, 1000); tick();
  })();

  /* ---------- families ---------- */
  var anyFam = false;
  ((W.families && W.families.sides) || []).forEach(function (side) {
    if (!side.lines || !side.lines.length) return;
    anyFam = true;
    var c = el('div', 'fam');
    c.appendChild(el('h3', '', side.heading));
    side.lines.forEach(function (l) { c.appendChild(el('p', '', l)); });
    $('#familiesGrid').appendChild(c);
  });
  if (!anyFam) $('#families').hidden = true;

  /* ---------- events ---------- */
  function gcal(ev) {
    if (!ev.start || !ev.end) return '';
    function f(s) { var d = new Date(s); return isNaN(d) ? '' : d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
    var a = f(ev.start), b = f(ev.end); if (!a || !b) return '';
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(ev.name + ' · ' + W.couple.first + ' & ' + W.couple.second) +
      '&dates=' + a + '/' + b + '&location=' + encodeURIComponent((ev.venue || W.venue.name) + ', ' + W.venue.city);
  }
  (W.days || []).forEach(function (day) {
    var col = el('div', 'day');
    col.appendChild(withOrdinals(el('p', 'day__date'), day.date));
    (day.events || []).forEach(function (ev) {
      var e = el('div', 'ev');
      if (FX) { var ic = el('div', 'ev__icon'); ic.innerHTML = FX.eventIcon(ev); e.appendChild(ic); }
      e.appendChild(el('h3', '', ev.name));
      e.appendChild(el('p', 'ev__time', ev.time));
      if (ev.venue && ev.venue !== W.venue.name) e.appendChild(el('p', 'ev__dress', ev.venue));
      if (ev.dress) e.appendChild(el('p', 'ev__dress', 'Dress code · ' + ev.dress));
      if (ev.note) e.appendChild(el('p', 'ev__note', ev.note));
      var link = gcal(ev);
      if (link) { var a = el('a', 'cal', '+ Add to calendar'); a.href = link; a.target = '_blank'; a.rel = 'noopener'; e.appendChild(el('div')).appendChild(a); }
      col.appendChild(e);
    });
    $('#dayCols').appendChild(col);
  });

  /* ---------- venue ---------- */
  var V = W.venue || {};
  (V.notes || []).forEach(function (n) { $('#venueNotes').appendChild(el('li', '', n)); });
  if (V.mapLink) $('#mapBtn').href = V.mapLink; else $('#mapBtn').hidden = true;

  /* ---------- gallery ---------- */
  var photos = V.photos || [];
  if (!photos.length) $('#gallery').hidden = true;
  else {
    var tr = $('#galTrack');
    photos.forEach(function (src, k) { var im = el('img'); im.src = src; im.alt = (V.name || 'Venue') + ' — photo ' + (k + 1); im.loading = 'lazy'; tr.appendChild(im); });
    function go(dir) { var w = tr.clientWidth, i = Math.round(tr.scrollLeft / Math.max(1, w)) + dir; i = (i + photos.length) % photos.length; tr.scrollTo({ left: i * w, behavior: reduce ? 'auto' : 'smooth' }); }
    $('#galPrev').addEventListener('click', function () { go(-1); });
    $('#galNext').addEventListener('click', function () { go(1); });
    if (photos.length < 2) { $('#galPrev').hidden = true; $('#galNext').hidden = true; }
    tr.tabIndex = 0;
    tr.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); });
  }

  /* ---------- RSVP on WhatsApp ---------- */
  (function () {
    var R = W.rsvp || {}, num = String(R.number || '').replace(/\D/g, ''), btn = $('#waBtn'), alt = $('#waAlt');
    var msg = String(R.message || 'Hello! I would like to confirm my presence for the wedding.').replace('{name}', guest || '___');
    if (num) {
      btn.href = 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);
      alt.textContent = 'Opens a WhatsApp chat with ' + (R.name || 'us') + ' · +' + num;
    } else {
      btn.removeAttribute('href'); btn.setAttribute('aria-disabled', 'true'); btn.style.opacity = '.5'; btn.style.pointerEvents = 'none';
      alt.textContent = W.preview ? 'Preview: the RSVP WhatsApp number is still to be added.' : 'RSVP details coming soon.';
    }
  })();

  /* ---------- contacts ---------- */
  (W.contacts || []).forEach(function (c) {
    var d = el('div', 'person');
    d.appendChild(el('h3', '', c.name)); d.appendChild(el('p', '', c.role || ''));
    if (c.whatsapp) { var a = el('a', 'btn', 'WhatsApp'); a.href = 'https://wa.me/' + String(c.whatsapp).replace(/\D/g, ''); a.target = '_blank'; a.rel = 'noopener'; d.appendChild(a); }
    $('#contactList').appendChild(d);
  });
  if (!(W.contacts || []).length) $('#contacts').hidden = true;

  /* ---------- top navigation (only sections that are shown) ---------- */
  [['top', 'Our wedding'], ['events', 'Events'], ['venue', 'Venue'], ['gallery', 'Gallery'], ['rsvp', 'RSVP']].forEach(function (n) {
    var s = document.getElementById(n[0]); if (!s || s.hidden) return;
    var a = el('a', '', n[1]); a.href = '#' + n[0]; $('#nav').appendChild(a);
  });

  /* ---------- preview colour switcher ---------- */
  if (W.preview) {
    var pnl = $('#studioPanel'), tg = $('#studioToggle');
    $('#studio').hidden = false;
    tg.addEventListener('click', function () { var o = pnl.hidden; pnl.hidden = !o; tg.setAttribute('aria-expanded', String(o)); });
    Object.keys(PALETTES).forEach(function (k) {
      var p = PALETTES[k], b = el('button'); b.type = 'button';
      var sw = el('span', 'studio__sw');
      [p.paper, p.gold, p.sage].forEach(function (c) { var i = el('i'); i.style.background = c; sw.appendChild(i); });
      b.appendChild(sw); b.appendChild(document.createTextNode(p.label));
      b.setAttribute('aria-pressed', String(k === pal));
      b.addEventListener('click', function () { pal = k; $$('#palList button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); applyPalette(); });
      $('#palList').appendChild(b);
    });
  }

  /* ---------- gentle scroll-in ---------- */
  $$('.sec').forEach(function (n) { n.classList.add('rise'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .08 });
    $$('.rise').forEach(function (n) { io.observe(n); });
  } else { $$('.rise').forEach(function (n) { n.classList.add('in'); }); }
})();
