/* The Select · invitation flourishes: wax seal, rose-petal shower, event emblems.
   Loaded before app.js; you should not need to edit this file. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function shade(hex, amt) { // amt -1..1 : darken / lighten
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function f(c) { return Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt); }
    return '#' + ((1 << 24) | (f(r) << 16) | (f(g) << 8) | f(b)).toString(16).slice(1);
  }

  /* =================== WAX SEAL =================== */
  function waxSeal(mono, wax) {
    wax = wax || '#8B1A1F';
    // irregular poured-wax outline
    var pts = [], N = 72, seed = 0;
    for (var i = 0; i < mono.length; i++) seed += mono.charCodeAt(i);
    for (var k = 0; k < N; k++) {
      var a = k / N * Math.PI * 2;
      var r = 66 + 2.6 * Math.sin(a * 5 + seed) + 1.8 * Math.sin(a * 9 + seed * .7) + 1.2 * Math.sin(a * 17 + seed * 1.3) + (k % 9 === 0 ? 2.5 : 0);
      pts.push([(80 + Math.cos(a) * r).toFixed(1), (80 + Math.sin(a) * r).toFixed(1)]);
    }
    var d = 'M' + pts[0].join(' ');
    for (var j = 1; j <= N; j++) {
      var p = pts[j % N], q = pts[(j + 1) % N];
      var mx = ((+p[0] + +q[0]) / 2).toFixed(1), my = ((+p[1] + +q[1]) / 2).toFixed(1);
      d += 'Q' + p[0] + ' ' + p[1] + ' ' + mx + ' ' + my;
    }
    d += 'Z';
    var lo = shade(wax, -.45), hi = shade(wax, .28), mid = shade(wax, -.18);
    var leaves = '';
    for (var l = 0; l < 24; l++) {
      var ang = l / 24 * 360;
      if (ang > 160 && ang < 200) continue; // gap at the bottom of the wreath
      leaves += '<path d="M80 34c3 3 3 7 0 9-3-2-3-6 0-9z" transform="rotate(' + ang + ' 80 80)"/>';
    }
    return '<svg viewBox="0 0 160 160" xmlns="' + NS + '" aria-hidden="true">' +
      '<defs>' +
      '<radialGradient id="wxg" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="' + hi + '"/><stop offset=".55" stop-color="' + wax + '"/><stop offset="1" stop-color="' + lo + '"/></radialGradient>' +
      '<radialGradient id="wxp" cx="62%" cy="66%" r="70%"><stop offset="0" stop-color="' + shade(wax, .08) + '"/><stop offset="1" stop-color="' + mid + '"/></radialGradient>' +
      '<filter id="wxBevel" x="-20%" y="-20%" width="140%" height="140%">' +
        '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b"/>' +
        '<feSpecularLighting in="b" surfaceScale="5" specularConstant=".75" specularExponent="22" lighting-color="#fff" result="s"><feDistantLight azimuth="225" elevation="42"/></feSpecularLighting>' +
        '<feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/>' +
        '<feColorMatrix in="n" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .16 0" result="n2"/>' +
        '<feComposite in="n2" in2="SourceAlpha" operator="in" result="n3"/>' +
        '<feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k2="1" k3=".55" result="lit"/>' +
        '<feMerge><feMergeNode in="lit"/><feMergeNode in="n3"/></feMerge>' +
      '</filter>' +
      '<filter id="wxEmboss" x="-10%" y="-10%" width="120%" height="120%">' +
        '<feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="b"/>' +
        '<feSpecularLighting in="b" surfaceScale="2.6" specularConstant="1" specularExponent="16" lighting-color="#fff" result="s"><feDistantLight azimuth="225" elevation="38"/></feSpecularLighting>' +
        '<feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>' +
        '<feOffset in="SourceAlpha" dx="1.2" dy="1.6" result="o"/><feGaussianBlur in="o" stdDeviation="1" result="ob"/>' +
        '<feFlood flood-color="' + shade(wax, -.6) + '" flood-opacity=".75"/><feComposite in2="ob" operator="in" result="sh"/>' +
        '<feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/><feMergeNode in="s2"/></feMerge>' +
      '</filter>' +
      '</defs>' +
      '<ellipse cx="84" cy="88" rx="66" ry="64" fill="rgba(40,10,10,.28)" style="filter:blur(6px)"/>' +
      '<path d="' + d + '" fill="url(#wxg)" filter="url(#wxBevel)"/>' +
      '<circle cx="80" cy="80" r="50" fill="url(#wxp)"/>' +
      '<circle cx="80" cy="80" r="50" fill="none" stroke="' + lo + '" stroke-opacity=".7" stroke-width="2.2" transform="translate(-.8 -.8)"/>' +
      '<circle cx="80" cy="80" r="50" fill="none" stroke="' + hi + '" stroke-opacity=".55" stroke-width="1.4" transform="translate(.9 .9)"/>' +
      '<g filter="url(#wxEmboss)" fill="' + shade(wax, .06) + '">' + leaves +
        '<text x="80" y="' + (mono.length > 2 ? 92 : 95) + '" text-anchor="middle" font-family="Pinyon Script, Cormorant Garamond, serif" font-size="' + (mono.length > 2 ? 36 : 46) + '" stroke="' + shade(wax, .06) + '" stroke-width=".9" letter-spacing="-1">' + mono.replace(/[<&>"]/g, '') + '</text>' +
      '</g>' +
      '</svg>';
  }

  /* =================== ROSE PETAL SHOWER =================== */
  var PETAL = '<svg viewBox="0 0 24 26" aria-hidden="true"><defs><radialGradient id="pg{i}" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="{a}"/><stop offset=".6" stop-color="{b}"/><stop offset="1" stop-color="{c}"/></radialGradient></defs>' +
    '<path d="M12 3.5C13.6 1 18 .2 20.8 3c3.4 3.5 2.6 10-1.2 15.2C17.4 21.3 14.3 24 12 25.2 9.7 24 6.6 21.3 4.4 18.2.6 13 -.2 6.5 3.2 3 6 .2 10.4 1 12 3.5Z" fill="url(#pg{i})"/>' +
    '<path d="M12 6.5c-.6 5.2-.4 11 0 16.5" stroke="{c}" stroke-opacity=".35" stroke-width=".7" fill="none"/></svg>';
  var REDS = [['#E0475A', '#B5172C', '#6E0A18'], ['#D8324A', '#A3122A', '#5E0814'], ['#EA6475', '#C21F38', '#7A0D1E'], ['#C92A3F', '#8F0F24', '#520612']];
  function petalShower(opts) {
    opts = opts || {};
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var host = document.createElement('div'); host.className = 'petal-rain';
    document.body.appendChild(host);
    var count = opts.count || (window.innerWidth < 600 ? 28 : 48);
    for (var i = 0; i < count; i++) {
      var c = REDS[i % REDS.length], fall = document.createElement('div'), spin = document.createElement('div');
      var size = 14 + Math.random() * 18;
      fall.className = 'petal-fall';
      fall.style.left = (Math.random() * 104 - 2) + 'vw';
      fall.style.width = size + 'px'; fall.style.height = (size * 1.08) + 'px';
      fall.style.animationDuration = (4.2 + Math.random() * 3.4) + 's';
      fall.style.animationDelay = (Math.random() * 2.4) + 's';
      fall.style.setProperty('--sway', (Math.random() * 160 - 80) + 'px');
      spin.className = 'petal-spin';
      spin.style.animationDuration = (1.6 + Math.random() * 2.2) + 's';
      spin.style.setProperty('--rx', (Math.random() * 2 - 1).toFixed(2));
      spin.style.setProperty('--ry', (Math.random() * 2 - 1).toFixed(2));
      spin.innerHTML = PETAL.replace(/\{i\}/g, 'x' + i).replace(/\{a\}/g, c[0]).replace(/\{b\}/g, c[1]).replace(/\{c\}/g, c[2]);
      fall.appendChild(spin); host.appendChild(fall);
    }
    setTimeout(function () { host.classList.add('done'); }, 7600);
    setTimeout(function () { host.remove(); }, 9000);
  }

  /* =================== EVENT EMBLEMS (fine ink line drawings) =================== */
  function marigold(cx, cy, r) { // ruffled flower head
    var d = '', n = 14;
    for (var i = 0; i < n; i++) {
      var a1 = i / n * Math.PI * 2, a2 = (i + 1) / n * Math.PI * 2, am = (a1 + a2) / 2;
      var x1 = cx + Math.cos(a1) * r * .72, y1 = cy + Math.sin(a1) * r * .72, x2 = cx + Math.cos(a2) * r * .72, y2 = cy + Math.sin(a2) * r * .72;
      var xm = cx + Math.cos(am) * r * 1.12, ym = cy + Math.sin(am) * r * 1.12;
      d += (i ? 'L' : 'M') + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'Q' + xm.toFixed(1) + ' ' + ym.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1);
    }
    var inner = '';
    for (var k = 0; k < 7; k++) { var a = k / 7 * Math.PI * 2; inner += 'M' + (cx + Math.cos(a) * r * .25).toFixed(1) + ' ' + (cy + Math.sin(a) * r * .25).toFixed(1) + 'L' + (cx + Math.cos(a) * r * .55).toFixed(1) + ' ' + (cy + Math.sin(a) * r * .55).toFixed(1); }
    return '<path d="' + d + 'Z"/><path d="' + inner + '" stroke-width=".7"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (r * .22).toFixed(1) + '"/>';
  }
  var ICONS = {
    mandap: '<path d="M8 93h84M13 89h74M18 85h64"/>' +
      '<path d="M23 85V45M77 85V45"/><path d="M32 85V49M68 85V49" stroke-opacity=".55"/><path d="M20 85h6M74 85h6M20 45h6M74 45h6"/>' +
      '<path d="M23 50c1 1 1 3 0 4M77 50c-1 1-1 3 0 4M23 76c1 1 1 3 0 4M77 76c-1 1-1 3 0 4" stroke-width=".7"/>' +
      '<path d="M15 45h70M17 41h66"/><path d="M24 41C24 27 36 18 50 14 64 18 76 27 76 41"/><path d="M33 41C34 31 41 25 50 22 59 25 66 31 67 41" stroke-width=".8"/>' +
      '<path d="M50 14V8M47 8h6"/><circle cx="50" cy="5.4" r="1.6"/><path d="M14 41c0-5 3-8 6-9 3 1 6 4 6 9M74 41c0-5 3-8 6-9 3 1 6 4 6 9"/><path d="M20 32v-3M80 32v-3"/>' +
      '<path d="M23 48q13.5 9 27 0q13.5 9 27 0"/>' +
      '<path d="M29 50.5v9M36.5 52.4v12M43.5 51v8M56.5 51v8M63.5 52.4v12M71 50.5v9" stroke-width=".7"/>' +
      '<circle cx="29" cy="60.6" r="1"/><circle cx="36.5" cy="65.6" r="1.2"/><circle cx="43.5" cy="60" r="1"/><circle cx="56.5" cy="60" r="1"/><circle cx="63.5" cy="65.6" r="1.2"/><circle cx="71" cy="60.6" r="1"/>' +
      '<path d="M41 85v-5h18v5M43 80l2-3h10l2 3"/><path d="M50 76.5c-3.2-2.4-3.6-6.2-.6-9.6.4 2 1.8 3 2.9 1.7 1.5 3.6.8 6.3-2.3 7.9z"/>',
    mehndi: '<g transform="translate(9 0) scale(1.2 1)">' +
      '<path d="M38 97c-.8-8-2.2-14-6-20-3.8-6-12-12.8-15-17.6-1.9-3.1 1.2-6.2 4.2-4.2L32 64.5V31c0-3.2 4.6-3.2 4.6 0v23V23c0-3.4 4.8-3.4 4.8 0v31V26c0-3.3 4.7-3.3 4.7 0v29V34c0-3.1 4.5-3.1 4.5 0v32c0 10-3.8 18-5.8 31"/>' +
      '<circle cx="42" cy="73" r="6.5" stroke-width=".8"/><circle cx="42" cy="73" r="2.6" stroke-width=".8"/>' +
      '<path d="M42 64.5v2M42 79.5v2M33.5 73h2M48.5 73h2M36 67l1.4 1.4M46.6 77.6 48 79M48 67l-1.4 1.4M37.4 77.6 36 79" stroke-width=".8"/>' +
      '<path d="M32.5 44h3.6M32.5 47h3.6M37.2 38h3.8M37.2 41h3.8M42 40h3.8M42 43h3.8M46.8 47h3.4M46.8 50h3.4" stroke-width=".7"/>' +
      '<circle cx="34.3" cy="34.5" r=".8"/><circle cx="39.1" cy="27" r=".8"/><circle cx="43.9" cy="30" r=".8"/><circle cx="48.6" cy="37.5" r=".8"/>' +
      '<path d="M24 62c2-1 4 0 4 2s-3 2.5-4 1" stroke-width=".7"/><path d="M36 87q6 2 11 0M36.6 91q6 2 10.6 0" stroke-width=".8"/></g>',
    haldi: marigold(35, 38, 10) + marigold(58, 33, 8) + marigold(73, 44, 6) +
      '<path d="M44 45c3-6 9-9 15-8-3 6-9 9-15 8zM44 45c4-1 9-4 15-8" stroke-width=".8"/>' +
      '<path d="M12 60h76"/><path d="M15 60c3 14 16 22 35 22s32-8 35-22"/><path d="M38 82l-3 7h30l-3-7"/><path d="M33 89h34"/>' +
      '<path d="M21 60c7-5 17-7 29-7s22 2 29 7"/><path d="M34 57c4-2 9-2 13 0M53 56c4-1.5 8-1 11 1" stroke-width=".7"/>' +
      '<path d="M22 67q28 10 56 0" stroke-width=".8"/><circle cx="30" cy="71" r=".9"/><circle cx="40" cy="73" r=".9"/><circle cx="50" cy="73.6" r=".9"/><circle cx="60" cy="73" r=".9"/><circle cx="70" cy="71" r=".9"/>',
    rings: '<circle cx="40" cy="60" r="18"/><circle cx="40" cy="60" r="15"/><circle cx="60" cy="64" r="16"/><circle cx="60" cy="64" r="13.2"/>' +
      '<path d="M53 44.5l3-5.5h8l3 5.5-7 8.5z"/><path d="M53 44.5h14M57 39l3 5.5 3-5.5M60 44.5V53" stroke-width=".7"/><path d="M57 48.6l-1 2.6M63 48.6l1 2.6" stroke-width=".7"/>' +
      '<path d="M76 26v8M72 30h8M24 30v5M21.5 32.5h5M84 50v4M82 52h4" stroke-width=".8"/>',
    dhol: '<ellipse cx="26" cy="56" rx="7" ry="17"/><ellipse cx="26" cy="56" rx="4.5" ry="13" stroke-width=".7"/><path d="M26 39h48M26 73h48"/><path d="M74 39a7 17 0 0 1 0 34"/>' +
      '<path d="M30 40l6 32 6-32 6 32 6-32 6 32 6-32 6 32" stroke-width=".8"/><path d="M26 39C33 22 67 22 74 39" stroke-width=".9"/>' +
      '<path d="M12 28l11 9M88 28l-11 9"/><path d="M10 26.5c-1.5-1.5 0-4 2-2.5M90 26.5c1.5-1.5 0-4-2-2.5"/>' +
      '<path d="M84 10v13"/><ellipse cx="81" cy="23.4" rx="3" ry="2.2"/><path d="M84 10l6 2.5"/><path d="M14 12v10"/><ellipse cx="11.5" cy="22.3" rx="2.6" ry="1.9"/>',
    cocktail: '<g transform="translate(23 30) rotate(14)"><path d="M0 0h24c0 10-5.5 15-12 15S0 10 0 0z"/><path d="M2.5 4.5h19" stroke-width=".7"/><path d="M12 15v20M5 35h14"/></g>' +
      '<g transform="translate(54 35.8) rotate(-14)"><path d="M0 0h24c0 10-5.5 15-12 15S0 10 0 0z"/><path d="M2.5 4.5h19" stroke-width=".7"/><path d="M12 15v20M5 35h14"/></g>' +
      '<path d="M50 22v-8M43 18l-4-5M57 18l4-5" stroke-width=".8"/><circle cx="50" cy="10.5" r="1"/>',
    diya: '<path d="M16 62c5 12 18 18 34 18s29-6 34-18z"/><path d="M14 62h72"/><path d="M80 62c5-1 8-4 10-8"/><path d="M28 70q22 8 44 0" stroke-width=".7"/>' +
      '<path d="M50 59c-6-4.5-6.5-12-.6-19.5 5.8 7.5 5.4 15 .6 19.5z"/><path d="M50 55c-2.4-2-2.6-5-.2-8.4 2.4 3.4 2.2 6.4.2 8.4z" stroke-width=".7"/>' +
      '<path d="M36 88h28M40 80l-2 8M60 80l2 8"/><path d="M30 34l3 3M70 34l-3 3M50 26v4M38 28l1.6 3.4M62 28l-1.6 3.4" stroke-width=".8"/>',
    dinner: '<ellipse cx="50" cy="54" rx="25" ry="6"/><path d="M25 54c0 12 2 24 4 31h42c2-7 4-19 4-31"/><path d="M36 60c1 8 1 17 0 25M50 60v25M64 60c-1 8-1 17 0 25" stroke-width=".7"/><path d="M29 85q21 4 42 0"/>' +
      '<path d="M41 49v-6M38 49h6M41 43c-2.6 0-3.6-3-3.6-7h7.2c0 4-1 7-3.6 7zM59 49v-6M56 49h6M59 43c-2.6 0-3.6-3-3.6-7h7.2c0 4-1 7-3.6 7z" stroke-width=".9"/>' +
      '<path d="M8 36v53M20 42v47M8 36q7-2 12 6M8 64h12M8 46l12 14M20 46 8 60"/><path d="M92 36v53M80 42v47M92 36q-7-2-12 6M80 64h12M92 46 80 60M80 46l12 14"/>',
    lotus: '<path d="M50 74C42 64 41 48 50 32c9 16 8 32 0 42z"/><path d="M50 74C38 70 30 58 30 44c10 4 18 14 20 30zM50 74c12-4 20-16 20-30-10 4-18 14-20 30z"/>' +
      '<path d="M48 74C34 76 22 70 16 60c11-3 24 1 32 14zM52 74c14 2 26-4 32-14-11-3-24 1-32 14z"/><path d="M50 40v28M40 52c4 6 7 13 9 20M60 52c-4 6-7 13-9 20" stroke-width=".6"/>' +
      '<path d="M50 74v18M38 84q12-5 24 0" stroke-width=".9"/>'
  };
  var MATCH = [
    [/wedding|phera|anand karaj|mandap|nikah|vivah|shaadi|ceremony/i, 'mandap'],
    [/mehndi|mehendi|henna/i, 'mehndi'],
    [/haldi|pithi|ubtan|tel baan/i, 'haldi'],
    [/engagement|ring|roka|sagai|mangni/i, 'rings'],
    [/sangeet|dhol|music|garba|dance/i, 'dhol'],
    [/cocktail|reception|party|after/i, 'cocktail'],
    [/puja|pooja|path|havan|ganesh|chooda|welcome/i, 'diya'],
    [/lunch|brunch|dinner|breakfast|meal/i, 'dinner']
  ];
  function eventIcon(ev) {
    var key = ev.icon && ICONS[ev.icon] ? ev.icon : null;
    for (var i = 0; !key && i < MATCH.length; i++) if (MATCH[i][0].test(ev.name || '')) key = MATCH[i][1];
    key = key || 'lotus';
    return '<svg viewBox="0 0 100 100" xmlns="' + NS + '" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[key] + '</svg>';
  }


  /* =================== LOTUS GARDEN (grows up, then sways) =================== */
  var GID = 0;
  function petalPath(w, h) { return 'M0 0C' + (-w) + ' ' + (-h * .22) + ' ' + (-w * .9) + ' ' + (-h * .78) + ' 0 ' + (-h) + 'C' + (w * .9) + ' ' + (-h * .78) + ' ' + w + ' ' + (-h * .22) + ' 0 0Z'; }
  function petal(g, r, w, h, kind, open) {
    var p = petalPath(w, h);
    var veins = '';
    for (var v = -2; v <= 2; v++) veins += 'M' + (v * w * .12).toFixed(1) + ' ' + (-h * .08).toFixed(1) + 'Q' + (v * w * .34).toFixed(1) + ' ' + (-h * .5).toFixed(1) + ' ' + (v * w * .1).toFixed(1) + ' ' + (-h * .93).toFixed(1);
    return '<g class="lg-pt" style="--r:' + r + 'deg;--r0:' + (r * open).toFixed(1) + 'deg">' +
      '<path d="' + p + '" fill="url(#' + g + (kind === 'b' ? 'pb' : 'pf') + ')"/>' +
      '<path d="' + p + '" fill="url(#' + g + 'pe)"/>' +
      '<path d="' + veins + '" fill="none" stroke="#C9466F" stroke-opacity=".16" stroke-width=".6"/>' +
      '<path d="M0 ' + (-h * .1).toFixed(1) + 'Q' + (-w * .15).toFixed(1) + ' ' + (-h * .5).toFixed(1) + ' 0 ' + (-h * .88).toFixed(1) + '" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="' + (w * .16).toFixed(1) + '" stroke-linecap="round" filter="url(#' + g + 'soft)"/>' +
      '</g>';
  }
  function flower(g, s, state) { // state: 1 open bloom, .45 half open, 0 bud
    var out = '';
    if (state === 0) {
      out += petal(g, -9, 15, 48, 'b', .3) + petal(g, 9, 15, 48, 'b', .3) + petal(g, -3, 17, 54, 'f', .3) + petal(g, 4, 16, 52, 'f', .3);
      return '<g transform="scale(' + s + ')">' + out + '</g>';
    }
    var o = state;
    [[-78, 21, 46], [78, 21, 46], [-56, 23, 54], [56, 23, 54]].forEach(function (p) { out += petal(g, p[0] * o + (1 - o) * p[0] * .35, p[1], p[2], 'b', .2); });
    [[-32, 23, 60], [32, 23, 60], [-11, 22, 64], [11, 22, 64]].forEach(function (p) { out += petal(g, p[0] * (o * .9 + .1), p[1], p[2], 'b', .2); });
    // seed pod and stamens
    var st = '';
    for (var i = 0; i < 26; i++) { var a = -Math.PI + i / 25 * Math.PI, x = Math.cos(a) * 13, y = -14 + Math.sin(a) * 4; st += 'M' + (x * .6).toFixed(1) + ' -10L' + x.toFixed(1) + ' ' + (y - 4).toFixed(1); }
    out += '<path d="' + st + '" stroke="url(#' + g + 'stm)" stroke-width="1.3" stroke-linecap="round" fill="none"/>';
    out += '<path d="M-10 -12c0-5 4-8 10-8s10 3 10 8c-3 3-17 3-20 0z" fill="url(#' + g + 'pod)"/>' +
      '<g fill="#B9C15A" opacity=".9"><circle cx="-4" cy="-16" r="1.2"/><circle cx="1" cy="-17" r="1.2"/><circle cx="5.5" cy="-15.6" r="1.1"/><circle cx="-1.5" cy="-14" r="1"/></g>';
    [[-50, 25, 40, -3], [50, 25, 40, 3], [-25, 26, 46, -2], [25, 26, 46, 2], [0, 25, 44, 0]].forEach(function (p) { out += '<g transform="translate(' + p[3] + ' 6)">' + petal(g, p[0] * o, p[1], p[2], 'f', .15) + '</g>'; });
    return '<g transform="scale(' + s + ')">' + out + '</g>';
  }
  function pad(g, rx, ry, curl, shade) {
    var e = '', N = 48;
    for (var k = 0; k <= N; k++) { var a = .14 + k / N * (Math.PI * 2 - .28), w = 1 + .045 * Math.sin(a * 7) + .03 * Math.sin(a * 13); e += (k ? 'L' : 'M') + (Math.cos(a) * rx * w).toFixed(1) + ' ' + (Math.sin(a) * ry * w).toFixed(1); }
    e += 'L0 0Z';
    var veins = '';
    for (var i = 0; i < 16; i++) { var b = .3 + i / 16 * (Math.PI * 2 - .6); veins += 'M0 0Q' + (Math.cos(b) * rx * .5 + Math.sin(b) * 2).toFixed(1) + ' ' + (Math.sin(b) * ry * .5).toFixed(1) + ' ' + (Math.cos(b) * rx * .92).toFixed(1) + ' ' + (Math.sin(b) * ry * .92).toFixed(1); }
    var c = curl ? '<path d="M' + (rx * .35).toFixed(1) + ' ' + (-ry * .95).toFixed(1) + 'C' + (rx * .9).toFixed(1) + ' ' + (-ry * 1.25).toFixed(1) + ' ' + (rx * 1.15).toFixed(1) + ' ' + (-ry * .4).toFixed(1) + ' ' + (rx * .98).toFixed(1) + ' ' + (-ry * .05).toFixed(1) + 'C' + (rx * .8).toFixed(1) + ' ' + (-ry * .55).toFixed(1) + ' ' + (rx * .6).toFixed(1) + ' ' + (-ry * .85).toFixed(1) + ' ' + (rx * .35).toFixed(1) + ' ' + (-ry * .95).toFixed(1) + 'Z" fill="url(#' + g + 'under)"/>' : '';
    return '<path d="' + e + '" fill="url(#' + g + (shade ? 'padD' : 'pad') + ')"/>' +
      '<path d="' + e + '" fill="none" stroke="#3F6A2B" stroke-opacity=".35" stroke-width=".9"/>' +
      '<path d="' + veins + '" fill="none" stroke="#EEF5C8" stroke-opacity=".45" stroke-width=".8"/>' +
      '<ellipse cx="0" cy="0" rx="' + (rx * .06).toFixed(1) + '" ry="' + (ry * .08).toFixed(1) + '" fill="#E8F0B0" opacity=".8"/>' + c;
  }
  // a plant: stem from base (0,0) up to tip, with a flower / bud / pad at the tip
  function plant(g, spec, H) {
    var tx = spec.x, ty = spec.y, cx = spec.cx === undefined ? tx * .15 : spec.cx, cy = ty * .55;
    var dur = (1.1 + Math.min(2.2, -ty / 420)).toFixed(2), tipD = (spec.d + dur * .85).toFixed(2);
    var stem = '<path class="lg-stem" pathLength="1" style="--d:' + spec.d + 's;--dur:' + dur + 's" d="M0 0Q' + cx + ' ' + cy + ' ' + tx + ' ' + ty + '" stroke="url(#' + g + 'stem)" stroke-width="' + (spec.w || 3) + '" fill="none" stroke-linecap="round"/>';
    var top;
    if (spec.pad) top = '<g transform="translate(' + tx + ' ' + ty + ') rotate(' + (spec.rot || 0) + ')"><g class="lg-leaf" style="--d:' + tipD + 's">' + pad(g, spec.pad[0], spec.pad[1], spec.curl, spec.shade) + '</g></g>';
    else top = '<g transform="translate(' + tx + ' ' + ty + ') rotate(' + (spec.rot || 0) + ')"><g class="lg-flower" style="--d:' + tipD + 's">' + flower(g, spec.s || 1, spec.state) + '</g></g>';
    return '<g transform="translate(' + spec.bx + ' ' + H + ')"><g class="lg-plant" style="--d:' + spec.d + 's;--sw:' + spec.sw + 's;--a:' + spec.a + 'deg">' + stem + top + '</g></g>';
  }
  function rnd(seed) { var x = Math.sin(seed * 999.7) * 10000; return x - Math.floor(x); }
  // H = height of the column in drawing units (width is always 190 units)
  function garden(side, H) {
    H = Math.max(420, Math.round(H || 1000));
    var g = 'lg' + (++GID);
    var defs = '<defs>' +
      '<linearGradient id="' + g + 'pf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFFBF8"/><stop offset=".35" stop-color="#FDE3E8"/><stop offset=".72" stop-color="#F4A9BD"/><stop offset="1" stop-color="#DB5F87"/></linearGradient>' +
      '<linearGradient id="' + g + 'pb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FBE5EA"/><stop offset=".45" stop-color="#F2B2C3"/><stop offset=".85" stop-color="#DE6E92"/><stop offset="1" stop-color="#C94A73"/></linearGradient>' +
      '<radialGradient id="' + g + 'pe" cx="50%" cy="60%" r="62%"><stop offset=".55" stop-color="#D9557F" stop-opacity="0"/><stop offset="1" stop-color="#C2416B" stop-opacity=".45"/></radialGradient>' +
      '<radialGradient id="' + g + 'pod" cx="50%" cy="30%" r="70%"><stop offset="0" stop-color="#F3EC9A"/><stop offset="1" stop-color="#C9B545"/></radialGradient>' +
      '<linearGradient id="' + g + 'stm" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F5D56B"/><stop offset="1" stop-color="#E9A93A"/></linearGradient>' +
      '<radialGradient id="' + g + 'pad" cx="45%" cy="40%" r="68%"><stop offset="0" stop-color="#D9E79A"/><stop offset=".5" stop-color="#A8C562"/><stop offset="1" stop-color="#6E9A3F"/></radialGradient>' +
      '<radialGradient id="' + g + 'padD" cx="45%" cy="40%" r="68%"><stop offset="0" stop-color="#B7CF74"/><stop offset=".6" stop-color="#83A84A"/><stop offset="1" stop-color="#557F33"/></radialGradient>' +
      '<linearGradient id="' + g + 'under" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E7EDB8"/><stop offset="1" stop-color="#B3C77A"/></linearGradient>' +
      '<linearGradient id="' + g + 'stem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8DAA55"/><stop offset=".5" stop-color="#A9C46C"/><stop offset="1" stop-color="#6F8F3E"/></linearGradient>' +
      '<filter id="' + g + 'soft"><feGaussianBlur stdDeviation="1.6"/></filter>' +
      '</defs>';
    // tips spread from the bottom to the very top, alternating sides of the column
    var n = Math.max(6, Math.round(H / 118)), P = [];
    var kinds = ['pad', 'bloom', 'pad', 'bud', 'pad', 'half', 'pad', 'bloom', 'bud'];
    for (var i = 0; i < n; i++) {
      var frac = (i + .6) / n, r1 = rnd(i + 1), r2 = rnd(i + 7);
      var tipY = -(H * frac * .97 + (r1 - .5) * 30), tipX = (i % 2 ? 92 : 38) + (r2 - .5) * 34;
      var bx = 6 + (i % 3) * 14 + r1 * 10, kind = kinds[i % kinds.length];
      if (i === n - 1) { kind = 'bloom'; tipY = -(H - 64); tipX = 62; }    // a full lotus crowns the top
      var spec = { bx: Math.round(bx), x: Math.round(tipX - bx), y: Math.round(tipY), d: +(.15 + frac * 2.4).toFixed(2), sw: (5 + r2 * 3).toFixed(1), a: (1.1 / (1 + frac * 2.5)).toFixed(2), w: 2.6 };
      if (kind === 'pad') { spec.pad = [42 + r2 * 16, 15 + r1 * 5]; spec.rot = (i % 2 ? -1 : 1) * (6 + r1 * 8); spec.curl = r2 > .5; spec.shade = r1 > .55; spec.w = 2.2; }
      else if (kind === 'bud') { spec.state = 0; spec.s = .62 + r1 * .1; spec.rot = (i % 2 ? 6 : -6); spec.w = 2.2; }
      else { spec.state = kind === 'half' ? .45 : 1; spec.s = (kind === 'half' ? .66 : .74) + r2 * .08; spec.rot = (i % 2 ? 5 : -5); }
      P.push(spec);
    }
    // a few big pads at the waterline
    P.unshift({ bx: 0, x: 34, y: -26, pad: [60, 20], rot: 5, shade: true, d: 0, sw: 7, a: .4, w: 2.4 },
              { bx: 60, x: 96, y: -12, pad: [70, 22], rot: -4, curl: true, d: .05, sw: 8, a: .3, w: 2.4 });
    // draw back to front: pads first, flowers last
    P.sort(function (p, q) { return (p.pad ? 0 : 1) - (q.pad ? 0 : 1); });
    var body = P.map(function (s) { return plant(g, s, H); }).join('');
    return '<svg class="lg lg--' + side + '" viewBox="-30 0 190 ' + H + '" preserveAspectRatio="xMinYMax meet" xmlns="' + NS + '" aria-hidden="true">' + defs +
      '<g' + (side === 'r' ? ' transform="translate(130 0) scale(-1 1)"' : '') + '>' + body + '</g></svg>';
  }

  /* event illustrations (images/event-*.png) chosen from the event name */
  var ART = [
    [/anand karaj|gurdwara|gurudwara|lavan/i, 'anandkaraj'],
    [/wedding|phera|baraat|mandap|vivah|shaadi|ceremony/i, 'pheras'],
    [/mehndi|mehendi|henna/i, 'mehndi'],
    [/haldi|pithi|ubtan/i, 'haldi'],
    [/after|party|cocktail|reception/i, 'afterparty'],
    [/sangeet|engagement|ring|music|dance|garba/i, 'sangeet']
  ];
  function eventArt(ev) {
    if (ev.art === 'none') return '';
    if (ev.art) return ev.art.indexOf('/') > -1 ? ev.art : 'images/event-' + ev.art + '.png';
    for (var i = 0; i < ART.length; i++) if (ART[i][0].test(ev.name || '')) return 'images/event-' + ART[i][1] + '.png';
    return '';
  }


  /* =================== WARDROBE PLANNER: recolour the outfits =================== */
  var WARDROBE_COLOURS = {
    'Ivory': '#F3EBDD', 'Champagne': '#E3CBA2', 'Gold': '#C9A24B', 'Silver': '#C8C8CC',
    'Blush': '#EDBCC0', 'Rose': '#D97A8C', 'Rani Pink': '#C2185B', 'Peach': '#F2B38F',
    'Coral': '#E36F5A', 'Marigold': '#E99A26', 'Turmeric': '#E8B829', 'Lemon': '#F3E08A',
    'Mint': '#A8D8BE', 'Pistachio': '#A9C27A', 'Emerald': '#1F6B4E', 'Bottle Green': '#1E4632',
    'Powder Blue': '#A9C4DD', 'Royal Blue': '#2547A0', 'Navy': '#1F2A4E', 'Lilac': '#C3A6D6',
    'Purple': '#5B2A7A', 'Wine': '#6E1F2E', 'Maroon': '#7A1F2B', 'Red': '#B3202F', 'Black': '#1C1C1E'
  };
  var OUTFITS = [
    ['lehenga', 'Lehenga (seated)'], ['gown', 'Gown / saree'], ['sherwani', 'Sherwani'], ['blazer', 'Blazer & turban']
  ];
  var OUTFIT_STATS = {"lehenga": {"L": 0.471, "S": 0.415}, "gown": {"L": 0.627, "S": 0.47}, "sherwani": {"L": 0.208, "S": 0.133}, "blazer": {"L": 0.48, "S": 0.383}};
  function hexOf(c) { return WARDROBE_COLOURS[c] || c; }
  function rgb2hsl(r, g, b) {
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0, d = mx - mn;
    if (d) {
      s = d / (1 - Math.abs(2 * l - 1));
      if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
      h *= 60; if (h < 0) h += 360;
    }
    return [h, s, l];
  }
  function hsl2rgb(h, s, l) {
    var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r, g, b;
    if (h < 60) { r = c; g = x; b = 0; } else if (h < 120) { r = x; g = c; b = 0; } else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; } else if (h < 300) { r = x; g = 0; b = c; } else { r = c; g = 0; b = x; }
    return [r + m, g + m, b + m];
  }
  var wardCache = null;
  function loadImg(src) { return new Promise(function (ok, no) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = no; i.src = src; }); }
  function wardrobeData(dir) {
    if (wardCache) return wardCache;
    wardCache = Promise.all([loadImg(dir + 'wardrobe-base.jpg')].concat(OUTFITS.map(function (o) { return loadImg(dir + 'wardrobe-mask-' + o[0] + '.png'); })))
      .then(function (imgs) {
        var w = imgs[0].naturalWidth, h = imgs[0].naturalHeight, cv = document.createElement('canvas'); cv.width = w; cv.height = h;
        var cx = cv.getContext('2d', { willReadFrequently: true });
        cx.drawImage(imgs[0], 0, 0); var base = cx.getImageData(0, 0, w, h);
        var masks = imgs.slice(1).map(function (m) { cx.clearRect(0, 0, w, h); cx.drawImage(m, 0, 0, w, h); return cx.getImageData(0, 0, w, h).data; });
        return { w: w, h: h, base: base, masks: masks };
      });
    return wardCache;
  }
  // colours: { lehenga: 'Maroon' | '#hex', gown: ..., sherwani: ..., blazer: ... }  -> Promise(ImageData)
  function dressUp(dir, colours) {
    return wardrobeData(dir).then(function (D) {
      var out = new ImageData(new Uint8ClampedArray(D.base.data), D.w, D.h), px = out.data, src = D.base.data;
      OUTFITS.forEach(function (o, k) {
        var col = colours && colours[o[0]]; if (!col) return;
        var hx = hexOf(col), n = parseInt(hx.slice(1), 16);
        var t = rgb2hsl((n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255), st = OUTFIT_STATS[o[0]], m = D.masks[k];
        for (var i = 0; i < px.length; i += 4) {
          var wgt = m[i] / 255; if (wgt < .02) continue;
          var o3 = rgb2hsl(src[i] / 255, src[i + 1] / 255, src[i + 2] / 255);
          var L = o3[2] <= 0 ? 0 : (t[2] <= st.L ? o3[2] * (t[2] / st.L) : o3[2] + (1 - o3[2]) * ((t[2] - st.L) / (1 - st.L)));
          var S = Math.min(1, t[1] * Math.max(.45, Math.min(1.5, o3[1] / st.S)));
          var c = hsl2rgb(t[0], S, Math.max(0, Math.min(1, L)));
          px[i] = px[i] * (1 - wgt) + c[0] * 255 * wgt; px[i + 1] = px[i + 1] * (1 - wgt) + c[1] * 255 * wgt; px[i + 2] = px[i + 2] * (1 - wgt) + c[2] * 255 * wgt;
        }
      });
      for (var j = 0; j < px.length; j += 4) { // let the white paper of the illustration fade into the page
        var mn = Math.min(px[j], px[j + 1], px[j + 2]); px[j + 3] = Math.max(0, Math.min(255, (251 - mn) * 255 / 22));
      }
      return out;
    });
  }

  window.SELECT_FX = { dressUp: dressUp, WARDROBE_COLOURS: WARDROBE_COLOURS, OUTFITS: OUTFITS, hexOf: hexOf, eventArt: eventArt, garden: garden, waxSeal: waxSeal, petalShower: petalShower, eventIcon: eventIcon, icons: Object.keys(ICONS) };
})();
