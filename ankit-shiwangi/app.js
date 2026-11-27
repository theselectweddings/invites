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
    rose:      { label: 'Rose & Blush', paper: '#FCEFEA', paper2: '#F5DCD6', gold: '#A35E6B', line: '#D9AFA6', sage: '#8F8A6A', ink: '#5A3A40', muted: '#8E7177', btnInk: '#FFF4F1' },
    ocean:     { label: 'Ocean & Sand', paper: '#F5F1E8', paper2: '#E4E9E4', gold: '#2E6070', line: '#C2A66E', sage: '#6F8C88', ink: '#2C3D42', muted: '#6B7A7D', btnInk: '#F4F0E4' },
    navyBlush:     { label: 'Navy & Blush', paper: '#FBF5F2', paper2: '#EDD2CA', gold: '#1E3145', line: '#D7ADA8', sage: '#C98F89', ink: '#1E3145', muted: '#6B6F7D', btnInk: '#FBF5F2' },
    sageChampagne: { label: 'Sage & Champagne', paper: '#FAF6EE', paper2: '#ECDEC8', gold: '#6E7A5C', line: '#CFD0BC', sage: '#9DA78D', ink: '#3D4234', muted: '#7A7D6E', btnInk: '#FAF6EE' },
    dustyBlue:     { label: 'Dusty Blue & Ivory', paper: '#FAF7F1', paper2: '#E4DBCF', gold: '#4F6A80', line: '#C5D0D8', sage: '#8399AB', ink: '#2E3A45', muted: '#6F7A84', btnInk: '#FAF7F1' },
    burgundyGold:  { label: 'Burgundy & Gold', paper: '#FBF6EE', paper2: '#F0E2CC', gold: '#6E1F27', line: '#E2C387', sage: '#B08A3E', ink: '#3A1518', muted: '#7E5F5A', btnInk: '#FBF6EE' },
    terracotta:    { label: 'Terracotta & Cream', paper: '#FCF7F0', paper2: '#F4E6D0', gold: '#A9623A', line: '#E0B48F', sage: '#D4966B', ink: '#4A2E1F', muted: '#8A6E5C', btnInk: '#FCF7F0' },
    emerald:       { label: 'Emerald & Gold', paper: '#FAF6EE', paper2: '#EFE2CC', gold: '#365642', line: '#DFC084', sage: '#6C886D', ink: '#26362B', muted: '#6B7566', btnInk: '#FAF6EE' },
    lavenderSage:  { label: 'Lavender & Sage', paper: '#FBF7F2', paper2: '#F4E7D3', gold: '#7A6A8A', line: '#D3C6D4', sage: '#9FA98A', ink: '#3E3548', muted: '#7E7684', btnInk: '#FBF7F2' },
    mocha:         { label: 'Mocha & Cream', paper: '#FBF7F0', paper2: '#F3E5CF', gold: '#7E6650', line: '#CDB499', sage: '#9A8066', ink: '#3E3126', muted: '#85735F', btnInk: '#FBF7F0' },
    butterBlue:    { label: 'Butter Yellow & Blue', paper: '#FFFBF2', paper2: '#F9E6B5', gold: '#5E7895', line: '#F2D98E', sage: '#A0B1C2', ink: '#2F3D4C', muted: '#6D7A88', btnInk: '#FFFBF2' },
    blackWhite:    { label: 'Black & White', paper: '#FBFAF8', paper2: '#EFEDE9', gold: '#111111', line: '#CFCCC6', sage: '#3E3E3E', ink: '#111111', muted: '#6E6C69', btnInk: '#FBFAF8' },
    peachCoral:    { label: 'Peach & Coral', paper: '#FFF8F3', paper2: '#F5DCCA', gold: '#CF7656', line: '#EDB8AA', sage: '#E7AA88', ink: '#4A3029', muted: '#8E7068', btnInk: '#FFF8F3' },
    mauveTaupe:    { label: 'Mauve & Taupe', paper: '#FAF6F3', paper2: '#EADFD6', gold: '#956876', line: '#CAACAE', sage: '#B7AA9E', ink: '#43353A', muted: '#85777A', btnInk: '#FAF6F3' },
    forestRust:    { label: 'Forest Green & Rust', paper: '#FAF6EF', paper2: '#E9DAC4', gold: '#4F5E48', line: '#DEC8AC', sage: '#A15F33', ink: '#2E3729', muted: '#75705F', btnInk: '#FAF6EF' },
    cherryBlush:   { label: 'Cherry Red & Blush', paper: '#FDF7F4', paper2: '#EFDCD1', gold: '#962F2F', line: '#EDCEC5', sage: '#C46A62', ink: '#3E1F1F', muted: '#87696A', btnInk: '#FDF7F4' },
    champagnePearl:{ label: 'Champagne & Pearl', paper: '#FCFAF6', paper2: '#EDE6DB', gold: '#9C7F57', line: '#E0CBAF', sage: '#C9B08C', ink: '#4A3F33', muted: '#857A6C', btnInk: '#FCFAF6' }
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
  var tintSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  tintSvg.setAttribute('width', '0'); tintSvg.setAttribute('height', '0'); tintSvg.style.position = 'absolute';
  tintSvg.innerHTML = '<filter id="artTint" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="m"><feFuncR type="table"/><feFuncG type="table"/><feFuncB type="table"/></feComponentTransfer><feComposite in="m" in2="SourceGraphic" operator="arithmetic" k2=".75" k3=".25"/></filter>';
  document.body.appendChild(tintSvg);
  function hexRGB(h) { var n = parseInt(h.slice(1), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
  function tintFromPalette(p) {
    var stops = [p.ink, p.gold, p.line, '#FFFDFA'].map(hexRGB);
    ['R', 'G', 'B'].forEach(function (c, i) { tintSvg.querySelector('feFunc' + c).setAttribute('tableValues', stops.map(function (s) { return s[i].toFixed(3); }).join(' ')); });
  }
  function applyPalette() {
    var p = PALETTES[pal], r = document.documentElement.style;
    tintFromPalette(p);
    ['paper', 'paper2', 'gold', 'line', 'sage', 'ink', 'muted'].forEach(function (k) { r.setProperty('--' + k, p[k]); });
    r.setProperty('--btn-ink', p.btnInk);
  }
  applyPalette();
  var ICON_COLOURS = { ink: ['Ink', 'var(--ink)'], theme: ['Theme colour', 'var(--gold)'], gold: ['Gold', '#B08A3E'], sage: ['Sage', '#6F8A4A'], rose: ['Rose', '#C2456A'] };
  function applyIconColour(k) { var c = ICON_COLOURS[k] ? ICON_COLOURS[k][1] : (k || 'var(--ink)'); document.documentElement.style.setProperty('--icon', c); }
  var iconCol = (W.theme || {}).iconColor || 'ink';
  var artCol = (W.theme || {}).artColor || 'theme';
  function applyArtColour(k) { document.documentElement.classList.toggle('art-original', k === 'original'); }
  applyArtColour(artCol);
  applyIconColour(iconCol);

  /* ---------- artwork ---------- */
  var art = W.art || {};
  var decorPath = art.floralPath || (art.decor === 'sage' ? 'images/floral-' : 'images/lotus-');
  var lotusGarden = art.florals !== false && art.decor !== 'sage' && window.SELECT_FX;
  if (lotusGarden) {
    document.documentElement.classList.add('decor-lotus');
    var gd = document.createElement('div'); gd.className = 'garden'; document.body.appendChild(gd);
    var lastH = 0;
    var buildGarden = function () {
      var wpx = parseFloat(getComputedStyle(gd).getPropertyValue('--lgw')) || 0;
      var probe = document.createElement('div'); probe.style.cssText = 'position:fixed;width:var(--lgw);height:0'; document.body.appendChild(probe);
      wpx = probe.getBoundingClientRect().width || 160; probe.remove();
      var H = Math.round(190 * (window.innerHeight + 4) / wpx);
      if (Math.abs(H - lastH) < 40) return; lastH = H;
      gd.innerHTML = window.SELECT_FX.garden('l', H) + window.SELECT_FX.garden('r', H);
    };
    buildGarden();
    var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(buildGarden, 250); });
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
  /* handmade paper texture for the gatefold, drawn once */
  (function () {
    var cv = document.createElement('canvas'); cv.width = cv.height = 512; var x = cv.getContext('2d');
    x.fillStyle = '#F2E9DC'; x.fillRect(0, 0, 512, 512);
    var img = x.getImageData(0, 0, 512, 512), d = img.data;
    for (var i = 0; i < d.length; i += 4) { var n = (Math.random() - .5) * 14; d[i] += n; d[i + 1] += n; d[i + 2] += n * .9; }
    x.putImageData(img, 0, 0);
    for (var k = 0; k < 420; k++) {
      var px = Math.random() * 512, py = Math.random() * 512, len = 4 + Math.random() * 16, ang = Math.random() * Math.PI * 2;
      x.strokeStyle = Math.random() < .55 ? 'rgba(150,120,85,' + (.15 + Math.random() * .25) + ')' : 'rgba(255,255,250,' + (.4 + Math.random() * .4) + ')';
      x.lineWidth = .5 + Math.random() * .7; x.beginPath(); x.moveTo(px, py);
      x.quadraticCurveTo(px + Math.cos(ang + 1) * len * .5, py + Math.sin(ang + 1) * len * .5, px + Math.cos(ang) * len, py + Math.sin(ang) * len); x.stroke();
    }
    for (var s = 0; s < 260; s++) { x.fillStyle = 'rgba(120,95,65,' + (.18 + Math.random() * .3) + ')'; x.beginPath(); x.arc(Math.random() * 512, Math.random() * 512, .4 + Math.random() * 1.1, 0, 7); x.fill(); }
    var r = document.documentElement.style;
    r.setProperty('--paper-tex', 'url(' + cv.toDataURL('image/png') + ')');
    // opening card print: "lotus" (default), "plain" (no print) or "sage" (sage florals)
    var dp = (W.art && W.art.doorPrint) || 'lotus';
    var pre = dp === 'plain' ? '' : dp === 'sage' ? 'images/door-sage-' : dp === 'lotus' ? 'images/door-lotus-' : dp;
    r.setProperty('--door-l', pre ? 'url("' + pre + 'l.png")' : 'none');
    r.setProperty('--door-r', pre ? 'url("' + pre + 'r.png")' : 'none');
  })();
  var FX = window.SELECT_FX;
  var sealImg = (W.theme || {}).sealImage;
  if (sealImg) { var si = el('img', 'seal__img'); si.src = sealImg; si.alt = ''; $('#sealArt').appendChild(si); }
  else if (FX) $('#sealArt').innerHTML = FX.waxSeal(W.couple.monogram || '', (W.theme || {}).wax);
  $('#seal').addEventListener('click', function () {
    if (opening.classList.contains('open')) return;
    if (FX && W.petals !== false) setTimeout(function () { FX.petalShower(); }, reduce ? 0 : 1100);
    var gdn = document.querySelector('.garden'); if (gdn) setTimeout(function () { gdn.classList.add('grow'); }, reduce ? 0 : 1600);
    opening.classList.add('open');
    document.body.classList.remove('locked');
    if (W.music) { mbtn.hidden = false; var p = audio.play(); if (p && p.catch) p.catch(function () { mbtn.classList.add('off'); }); }
    setTimeout(function () { opening.classList.add('gone'); }, reduce ? 0 : 2900);
  });
  var song = (W.music === undefined || W.music === '' || W.music === 'default') ? 'images/music.mp3' : (W.music === 'none' ? '' : W.music);
  W.music = song;
  if (song) audio.src = song;
  mbtn.addEventListener('click', function () {
    if (audio.paused) { audio.play().catch(function () {}); mbtn.classList.remove('off'); mbtn.setAttribute('aria-label', 'Pause music'); }
    else { audio.pause(); mbtn.classList.add('off'); mbtn.setAttribute('aria-label', 'Play music'); }
  });


  /* ---------- scratch card: reveal the date ---------- */
  (function () {
    var box = $('#scratch'), cv = $('#scratchCanvas'), dateBox = $('#scratchDate');
    var rv = (W.dates && W.dates.reveal) || [];
    if (!rv.length || show.reveal === false) { $('#reveal').hidden = true; return; }
    rv.forEach(function (t, i) { dateBox.appendChild(i === 1 ? el('strong', '', t) : el('span', '', t)); });
    var ctx = cv.getContext('2d'), drawing = false, done = false, last = null;
    var foil = (W.theme && W.theme.foil) || ['#F3DC9A', '#C99A3E', '#E9C979', '#A87A2C'];
    function paint() {
      if (done) return;
      var w = box.clientWidth, h = box.clientHeight, d = window.devicePixelRatio || 1;
      if (!w) return;
      cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      var g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, foil[0]); g.addColorStop(.35, foil[1]); g.addColorStop(.6, foil[2]); g.addColorStop(1, foil[3]);
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      var sh = ctx.createLinearGradient(0, h, w, 0);
      sh.addColorStop(.3, 'rgba(255,255,255,0)'); sh.addColorStop(.5, 'rgba(255,250,230,.45)'); sh.addColorStop(.7, 'rgba(255,255,255,0)');
      ctx.fillStyle = sh; ctx.fillRect(0, 0, w, h);
      for (var k = 0; k < 1400; k++) { ctx.fillStyle = 'rgba(255,255,255,' + (Math.random() * .16) + ')'; ctx.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4); }
      ctx.strokeStyle = 'rgba(255,248,225,.75)'; ctx.lineWidth = 1; ctx.strokeRect(9, 9, w - 18, h - 18);
      ctx.fillStyle = 'rgba(255,252,240,.97)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = '400 46px "Pinyon Script", cursive'; ctx.fillText(W.couple.monogram || '', w / 2, h / 2 - 10);
      ctx.font = '500 11px "Cormorant Garamond", serif';
      var label = 'SCRATCH TO REVEAL'; ctx.letterSpacing = '3px'; ctx.fillText(label, w / 2, h / 2 + 34);
    }
    function pos(e) { var b = cv.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; }
    function scratch(p) {
      ctx.globalCompositeOperation = 'destination-out'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 44;
      ctx.beginPath(); ctx.moveTo((last || p).x, (last || p).y); ctx.lineTo(p.x, p.y); ctx.stroke(); last = p;
    }
    function check() {
      var data = ctx.getImageData(0, 0, cv.width, cv.height).data, clear = 0, n = 0;
      for (var j = 3; j < data.length; j += 64) { n++; if (data[j] < 128) clear++; }
      if (clear / n > .5) finish();
    }
    function finish() {
      if (done) return; done = true; box.classList.add('done');
      if (reduce) return;
      var cols = [PALETTES[pal].gold, foil[1], '#E5698E', foil[0]];
      for (var i = 0; i < 28; i++) {
        var s = el('i', 'spark'); s.style.background = cols[i % 4]; box.appendChild(s);
        (function (s) {
          requestAnimationFrame(function () { requestAnimationFrame(function () {
            var an = Math.random() * Math.PI * 2, ds = 70 + Math.random() * 110;
            s.style.transform = 'translate(' + Math.cos(an) * ds + 'px,' + Math.sin(an) * ds + 'px) scale(' + (.4 + Math.random()) + ')'; s.style.opacity = '0';
          }); });
          setTimeout(function () { s.remove(); }, 1400);
        })(s);
      }
    }
    cv.addEventListener('pointerdown', function (e) { if (done) return; drawing = true; last = null; try { cv.setPointerCapture(e.pointerId); } catch (x) {} scratch(pos(e)); });
    cv.addEventListener('pointermove', function (e) { if (drawing) scratch(pos(e)); });
    cv.addEventListener('pointerup', function () { if (drawing) { drawing = false; check(); } });
    cv.addEventListener('pointercancel', function () { drawing = false; });
    cv.tabIndex = 0;
    cv.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finish(); } });
    var ro = new ResizeObserver(paint); ro.observe(box);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(paint);
  })();

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
      var artSrc = FX && art.events !== false ? FX.eventArt(ev) : '';
      if (artSrc) { var ai = el('img', 'ev__art'); ai.src = artSrc; ai.alt = ''; e.appendChild(ai); }
      else if (FX) { var ic = el('div', 'ev__icon'); ic.innerHTML = FX.eventIcon(ev); e.appendChild(ic); }
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


  /* ---------- wardrobe planner ----------
     One illustration, dressed in the colours of the featured event (the wedding by default);
     every other event shows its colour palette. */
  (function () {
    var list = W.wardrobe || [];
    if (!list.length || show.wardrobe === false || !FX || !FX.dressUp) { $('#wardrobe').hidden = true; return; }
    var dir = (art.wardrobePath || 'images/');
    var featured = list.findIndex(function (w) { return w.feature; }); if (featured < 0) featured = list.length - 1;
    var pals = list.map(function (w) { return (w.palette || []).slice(0, 5); });
    var wrap = $('#wardList'); wrap.classList.add('ward--v2');
    var figCard = el('div', 'wfeature'), figBox = el('div', 'wcard__img'), cvs = el('canvas'); cvs.setAttribute('role', 'img');
    figBox.appendChild(cvs);
    var figTitle = el('div', 'wfeature__txt');
    figCard.appendChild(figBox); figCard.appendChild(figTitle);
    var rows = el('div', 'wpals');
    wrap.appendChild(figCard); wrap.appendChild(rows);
    function outfitsFor(p) { return { lehenga: p[0], gown: p[1] || p[0], sherwani: p[2] || p[0], blazer: p[3] || p[1] || p[0] }; }
    function swatchList(p) {
      var ul = el('ul', 'wcard__sw');
      p.forEach(function (c) { if (!c) return; var li = el('li'), dot = el('i'); dot.style.background = FX.hexOf(c); li.appendChild(dot); li.appendChild(document.createTextNode(c.charAt(0) === '#' ? c.toUpperCase() : c)); ul.appendChild(li); });
      return ul;
    }
    var tm;
    function drawFeature() {
      var wd = list[featured];
      figTitle.innerHTML = '';
      figTitle.appendChild(el('p', 'wcard__event', [wd.event, wd.when].filter(Boolean).join(' · ')));
      if (wd.theme) figTitle.appendChild(el('h3', 'wcard__theme', wd.theme));
      figTitle.appendChild(swatchList(pals[featured]));
      if (wd.note) figTitle.appendChild(el('p', 'wcard__note', wd.note));
      cvs.setAttribute('aria-label', 'Outfit inspiration for ' + (wd.event || 'the wedding'));
      clearTimeout(tm); figBox.classList.add('busy');
      tm = setTimeout(function () {
        FX.dressUp(dir, outfitsFor(pals[featured])).then(function (d) { cvs.width = d.width; cvs.height = d.height; cvs.getContext('2d').putImageData(d, 0, 0); figBox.classList.remove('busy'); }).catch(function () { figBox.classList.remove('busy'); });
      }, 60);
    }
    function drawRows() {
      rows.innerHTML = '';
      list.forEach(function (wd, idx) {
        if (idx === featured && !W.preview) return;
        var r = el('div', 'wpal' + (idx === featured ? ' wpal--feat' : ''));
        r.appendChild(el('p', 'wcard__event', [wd.event, wd.when].filter(Boolean).join(' · ')));
        if (wd.theme) r.appendChild(el('h3', 'wcard__theme', wd.theme));
        var big = el('div', 'wpal__dots');
        pals[idx].forEach(function (c) { if (!c) return; var d = el('span'); d.style.background = FX.hexOf(c); d.title = c; big.appendChild(d); });
        r.appendChild(big);
        r.appendChild(swatchList(pals[idx]));
        if (wd.note) r.appendChild(el('p', 'wcard__note', wd.note));
        if (W.preview) r.appendChild(editor(idx));
        rows.appendChild(r);
      });
    }
    function editor(idx) {
      var ed = el('div', 'wcard__edit');
      ed.appendChild(el('p', 'wcard__edit-h', 'Colour palette (preview only)'));
      for (var k = 0; k < 4; k++) (function (k) {
        var row = el('label', 'wrow'); row.appendChild(el('span', '', 'Colour ' + (k + 1)));
        var sel = el('select'), none = el('option', '', k ? '—' : 'Choose'); none.value = ''; sel.appendChild(none);
        Object.keys(FX.WARDROBE_COLOURS).forEach(function (n) { var op = el('option', '', n); op.value = n; sel.appendChild(op); });
        var custom = el('option', '', 'Custom colour'); custom.value = '#custom'; sel.appendChild(custom);
        var pick = el('input'); pick.type = 'color'; pick.value = '#C2185B';
        var cur = pals[idx][k] || '';
        if (cur.charAt(0) === '#') { sel.value = '#custom'; pick.value = cur; } else sel.value = cur;
        pick.hidden = sel.value !== '#custom';
        function set(v) { pals[idx][k] = v; pals[idx] = pals[idx].filter(function (x, i) { return x || i < k; }); update(idx); }
        sel.addEventListener('change', function () { pick.hidden = sel.value !== '#custom'; set(sel.value === '#custom' ? pick.value : sel.value); });
        pick.addEventListener('change', function () { set(pick.value); });
        row.appendChild(sel); row.appendChild(pick); ed.appendChild(row);
      })(k);
      var feat = el('label', 'wfeat'), rb = el('input'); rb.type = 'radio'; rb.name = 'wfeat'; rb.checked = idx === featured;
      rb.addEventListener('change', function () { featured = idx; drawFeature(); drawRows(); });
      feat.appendChild(rb); feat.appendChild(document.createTextNode(' Dress the models in this palette')); ed.appendChild(feat);
      var copy = el('button', 'wcopy', 'Copy these choices'); copy.type = 'button';
      copy.addEventListener('click', function () {
        var txt = list.map(function (w, i) { return (w.event || 'Event') + ': ' + (pals[i].filter(Boolean).join(', ') || '—') + (i === featured ? ' (models)' : ''); }).join(' | ');
        try { navigator.clipboard.writeText(txt).then(function () { copy.textContent = 'Copied — paste it to Claude'; setTimeout(function () { copy.textContent = 'Copy these choices'; }, 2500); }, function () { copy.textContent = txt; }); } catch (x) { copy.textContent = txt; }
      });
      ed.appendChild(copy);
      return ed;
    }
    function update(idx) {
      if (idx === featured) drawFeature();
      var rowsEls = rows.children, pos = 0;
      for (var i = 0; i < list.length; i++) { if (i === featured && !W.preview) continue; if (i === idx) break; pos++; }
      var r = rowsEls[pos]; if (!r) return;
      var big = r.querySelector('.wpal__dots'); big.innerHTML = '';
      pals[idx].forEach(function (c) { if (!c) return; var d = el('span'); d.style.background = FX.hexOf(c); d.title = c; big.appendChild(d); });
      var old = r.querySelector('.wcard__sw'); old.replaceWith(swatchList(pals[idx]));
    }
    drawFeature(); drawRows();
  })();

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
  [['top', 'Our wedding'], ['events', 'Events'], ['wardrobe', 'Wardrobe'], ['venue', 'Venue'], ['gallery', 'Gallery'], ['rsvp', 'RSVP']].forEach(function (n) {
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
    [['theme', 'Match the theme'], ['original', 'Original colours']].forEach(function (o) {
      var b = el('button', '', o[1]); b.type = 'button'; b.setAttribute('aria-pressed', String(o[0] === artCol));
      b.addEventListener('click', function () { artCol = o[0]; $$('#artList button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); applyArtColour(o[0]); });
      $('#artList').appendChild(b);
    });
    Object.keys(ICON_COLOURS).forEach(function (k) {
      var b = el('button'); b.type = 'button';
      var dot = el('span', 'studio__dot'); dot.style.background = ICON_COLOURS[k][1]; b.appendChild(dot); b.appendChild(document.createTextNode(ICON_COLOURS[k][0]));
      b.setAttribute('aria-pressed', String(k === iconCol));
      b.addEventListener('click', function () { iconCol = k; $$('#iconList button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); applyIconColour(k); });
      $('#iconList').appendChild(b);
    });
  }

  /* ---------- gentle scroll-in ---------- */
  $$('.sec').forEach(function (n) { n.classList.add('rise'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .08 });
    $$('.rise').forEach(function (n) { io.observe(n); });
  } else { $$('.rise').forEach(function (n) { n.classList.add('in'); }); }
})();
