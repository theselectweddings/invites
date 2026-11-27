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
    var count = opts.count || (window.innerWidth < 600 ? 55 : 95);
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

  /* =================== EVENT EMBLEMS (fine-line drawings) =================== */
  var ICONS = {
    mandap: '<path d="M8 57h48M11 53h42"/><path d="M15 53V29M49 53V29M21 53V31M43 53V31"/>' +
      '<path d="M12 29h40"/><path d="M14 29c0-10 9-16 18-19 9 3 18 9 18 19"/><path d="M20 29c0-7 5-11 12-14 7 3 12 7 12 14"/>' +
      '<path d="M32 10V5"/><circle cx="32" cy="3.6" r="1.4"/><path d="M12 29q2.5 4 5 0q2.5 4 5 0q2.5 4 5 0q2.5 4 5 0q2.5 4 5 0q2.5 4 5 0q2.5 4 5 0q2.5 4 5 0"/>' +
      '<path d="M15 36q17 9 34 0"/><circle cx="21" cy="38.6" r=".9"/><circle cx="27" cy="40.2" r=".9"/><circle cx="32" cy="40.6" r=".9"/><circle cx="37" cy="40.2" r=".9"/><circle cx="43" cy="38.6" r=".9"/>' +
      '<path d="M27 53v-3h10v3"/><path d="M32 49.5c-2.6-2-2.4-5 0-7.4 2.4 2.4 2.6 5.4 0 7.4z"/>',
    mehndi: '<path d="M25 59V44L17.5 33.5c-1.6-2.4 1.4-5 3.6-3L27 37V14c0-2.7 4-2.7 4 0v17V11c0-2.7 4-2.7 4 0v20V13c0-2.7 4-2.7 4 0v19V18c0-2.7 4-2.7 4 0v24c0 8-3 12-5 17"/>' +
      '<circle cx="34.5" cy="45" r="5"/><circle cx="34.5" cy="45" r="1.8"/>' +
      '<path d="M29.5 45h-2M41.5 45h-2M34.5 40v-2M34.5 52v-2M31 41.5l-1.4-1.4M39.4 49.9 38 48.5M38 41.5l1.4-1.4M29.6 49.9l1.4-1.4"/>' +
      '<circle cx="29" cy="16" r=".9"/><circle cx="33" cy="13" r=".9"/><circle cx="37" cy="15" r=".9"/><circle cx="41" cy="20" r=".9"/>' +
      '<path d="M28 22h2M28 26h2M32 20h2M32 24h2M36 21h2M36 25h2M40 25h2M40 29h2"/><path d="M25 55h13"/>',
    haldi: '<path d="M10 36h44"/><path d="M12 36c0 11 9 18 20 18s20-7 20-18"/><path d="M24 54l-2 4h20l-2-4"/>' +
      '<path d="M18 43q14 6 28 0"/><circle cx="23" cy="47" r=".9"/><circle cx="32" cy="49" r=".9"/><circle cx="41" cy="47" r=".9"/>' +
      '<path d="M17 36c3-3 8-4 15-4s12 1 15 4"/>' +
      '<g><circle cx="24" cy="22" r="3"/><path d="M24 14.5a2.4 2.4 0 0 1 2.6 2.6 2.4 2.4 0 0 1 3.4 1.4 2.4 2.4 0 0 1 .4 3.5 2.4 2.4 0 0 1-.4 3.5 2.4 2.4 0 0 1-3.4 1.4A2.4 2.4 0 0 1 24 29.5a2.4 2.4 0 0 1-2.6-2.6 2.4 2.4 0 0 1-3.4-1.4 2.4 2.4 0 0 1-.4-3.5 2.4 2.4 0 0 1 .4-3.5 2.4 2.4 0 0 1 3.4-1.4A2.4 2.4 0 0 1 24 14.5z"/></g>' +
      '<g><circle cx="40" cy="18" r="2.4"/><path d="M40 12a2 2 0 0 1 2.1 2.1 2 2 0 0 1 2.8 1.2 2 2 0 0 1 .3 2.7 2 2 0 0 1-.3 2.7 2 2 0 0 1-2.8 1.2A2 2 0 0 1 40 24a2 2 0 0 1-2.1-2.1 2 2 0 0 1-2.8-1.2 2 2 0 0 1-.3-2.7 2 2 0 0 1 .3-2.7 2 2 0 0 1 2.8-1.2A2 2 0 0 1 40 12z"/></g>' +
      '<path d="M30 30c2-4 6-6 10-5-2 4-6 6-10 5z"/>',
    rings: '<circle cx="25" cy="40" r="12"/><circle cx="25" cy="40" r="9.5"/><circle cx="39" cy="40" r="12"/><circle cx="39" cy="40" r="9.5"/>' +
      '<path d="M33.5 27.5l2.5-4h6l2.5 4-5.5 6z"/><path d="M33.5 27.5h11M38 23.5l1 4 1-4M39 27.5v6"/>' +
      '<path d="M50 16v5M47.5 18.5h5M14 20v4M12 22h4"/>',
    dhol: '<ellipse cx="17" cy="37" rx="5" ry="12"/><path d="M17 25h30M17 49h30"/><path d="M47 25a5 12 0 0 1 0 24"/>' +
      '<path d="M20 26l5 22 5-22 5 22 5-22 5 22"/><path d="M17 25C22 12 42 12 47 25"/>' +
      '<path d="M8 20l6 6M56 20l-6 6"/><circle cx="7" cy="19" r="1.4"/><circle cx="57" cy="19" r="1.4"/>' +
      '<path d="M53 8v8.5"/><circle cx="51" cy="17" r="2"/><path d="M53 8l4 1.5"/>',
    cocktail: '<path d="M14 18h16l-8 14z"/><path d="M22 32v14M17 46h10"/><path d="M34 22h16l-8 14z"/><path d="M42 36v12M37 48h10"/>' +
      '<path d="M28 14l2.5-4M32 13l4-3M24.5 12l-1-4"/><circle cx="18" cy="21" r=".9"/><circle cx="46" cy="25" r=".9"/>',
    diya: '<path d="M12 40c4 8 12 12 20 12s16-4 20-12z"/><path d="M12 40h40"/><path d="M48 40c3-1 6-3 7-6"/>' +
      '<path d="M32 38c-4-3-4-9 0-14 4 5 4 11 0 14z"/><path d="M32 35c-1.5-1.4-1.5-3.6 0-5.4 1.5 1.8 1.5 4 0 5.4z"/>' +
      '<path d="M24 56h16"/><path d="M20 20l2 2M44 20l-2 2M32 14v3"/>',
    dinner: '<circle cx="32" cy="36" r="15"/><circle cx="32" cy="36" r="10"/><path d="M10 24v8a3 3 0 0 0 6 0v-8M13 24v28"/><path d="M54 24c-3 0-5 4-5 10h5v18"/>',
    marigold: '<circle cx="32" cy="30" r="5"/><path d="M32 16a4 4 0 0 1 4.2 4.2 4 4 0 0 1 5.6 2.4 4 4 0 0 1 .6 5.6 4 4 0 0 1-.6 5.6 4 4 0 0 1-5.6 2.4A4 4 0 0 1 32 40.4a4 4 0 0 1-4.2-4.2 4 4 0 0 1-5.6-2.4 4 4 0 0 1-.6-5.6 4 4 0 0 1 .6-5.6 4 4 0 0 1 5.6-2.4A4 4 0 0 1 32 16z"/>' +
      '<path d="M32 41v16M32 50c-4-1-7-4-8-8 4 0 7 3 8 8zM32 47c4-1 7-4 8-8-4 0-7 3-8 8z"/>'
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
    key = key || 'marigold';
    return '<svg viewBox="0 0 64 64" xmlns="' + NS + '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[key] + '</svg>';
  }

  window.SELECT_FX = { waxSeal: waxSeal, petalShower: petalShower, eventIcon: eventIcon, icons: Object.keys(ICONS) };
})();
