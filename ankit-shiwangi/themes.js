/* The Select · theme packs. Same page, different graphics.
   Each pack sets: default colour palette, wax colour, opening-card print, growing side border,
   background pattern, ornament between rules and the petal shower.
   Packs: lotus (lives in flourish.js) · palace · beach · hillside · arabian
   Loaded after flourish.js and before app.js; you should not need to edit this file. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', GID = 0;
  function rnd(s) { var x = Math.sin(s * 999.7) * 10000; return x - Math.floor(x); }
  function f(n) { return (+n).toFixed(1); }
  function stops(a) { return a.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : '') + '/>'; }).join(''); }
  function lin(id, a, horiz) { return '<linearGradient id="' + id + '" x1="0" y1="' + (horiz ? 0 : 1) + '" x2="' + (horiz ? 1 : 0) + '" y2="0">' + stops(a) + '</linearGradient>'; }
  function rad(id, a, cx, cy, r) { return '<radialGradient id="' + id + '" cx="' + (cx || '50%') + '" cy="' + (cy || '50%') + '" r="' + (r || '60%') + '">' + stops(a) + '</radialGradient>'; }
  function at(x, y, r, inner) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')' + (r ? ' rotate(' + f(r) + ')' : '') + '">' + inner + '</g>'; }

  /* =================== LEAVES (all drawn pointing up from 0,0) =================== */
  function leafPath(L, W, c) {
    c = c || 0;
    return 'M0 0C' + f(W) + ' ' + f(-L * .22) + ' ' + f(W * .92 + c) + ' ' + f(-L * .72) + ' ' + f(c) + ' ' + f(-L) +
      'C' + f(-W * .9 + c) + ' ' + f(-L * .74) + ' ' + f(-W) + ' ' + f(-L * .24) + ' 0 0Z';
  }
  function leaf(g, L, W, fill, rib, c) {
    c = c || 0;
    var p = leafPath(L, W, c), v = '';
    for (var k = 1; k < 5; k++) {
      var t = k / 5, y = -L * t, x = c * t * t;
      v += 'M' + f(x) + ' ' + f(y) + 'Q' + f(x + W * .45) + ' ' + f(y - L * .06) + ' ' + f(x + W * .72) + ' ' + f(y - L * .17) +
        'M' + f(x) + ' ' + f(y) + 'Q' + f(x - W * .45) + ' ' + f(y - L * .06) + ' ' + f(x - W * .72) + ' ' + f(y - L * .17);
    }
    return '<path d="' + p + '" fill="url(#' + g + fill + ')"/>' +
      '<path d="M0 0Q' + f(c * .4) + ' ' + f(-L * .5) + ' ' + f(c) + ' ' + f(-L * .96) + '" stroke="' + rib + '" stroke-opacity=".75" stroke-width="1" fill="none"/>' +
      '<path d="' + v + '" stroke="' + rib + '" stroke-opacity=".35" stroke-width=".6" fill="none"/>' +
      '<path d="' + p + '" fill="url(#' + g + 'sheen)"/>';
  }
  function leafTrio(g, s, fill, rib) { // rose leaves: one leaflet + two side leaflets
    return '<path d="M0 0V' + f(-22 * s) + '" stroke="' + rib + '" stroke-width="1.2"/>' +
      at(0, -10 * s, -48, leaf(g, 16 * s, 6.5 * s, fill, rib, 1)) + at(0, -10 * s, 48, leaf(g, 16 * s, 6.5 * s, fill, rib, -1)) +
      at(0, -20 * s, 0, leaf(g, 22 * s, 8.5 * s, fill, rib, 1.5));
  }
  function twig(g, s, fill, rib, n) { // round eucalyptus-style leaves in pairs along a twig
    n = n || 4;
    var out = '<path d="M0 0Q' + f(3 * s) + ' ' + f(-n * 9 * s) + ' ' + f(1 * s) + ' ' + f(-n * 11 * s) + '" stroke="' + rib + '" stroke-width="1.1" fill="none"/>';
    for (var i = 0; i < n; i++) {
      var y = -(i + .5) * 11 * s, sz = s * (1 - i * .08), side = i % 2 ? 1 : -1;
      out += at(1.5 * s, y, side * 78, leaf(g, 12 * sz, 10 * sz, fill, rib, 0));
    }
    return out + at(1 * s, -n * 11 * s, 0, leaf(g, 11 * s, 9 * s, fill, rib, 0));
  }
  function monstera(g, L) {
    var W = L * .5, out = '';
    var p = 'M0 0C' + f(W * 1.15) + ' ' + f(-L * .02) + ' ' + f(W * 1.22) + ' ' + f(-L * .78) + ' ' + f(W * .1) + ' ' + f(-L) +
      'C' + f(-W * 1.2) + ' ' + f(-L * .8) + ' ' + f(-W * 1.15) + ' ' + f(-L * .02) + ' 0 0Z';
    out += '<path d="' + p + '" fill="url(#' + g + 'mo)"/><path d="' + p + '" fill="url(#' + g + 'sheen)"/>';
    var slits = '', veins = '';
    for (var k = 1; k <= 4; k++) {
      var t = .1 + k * .18, y = -L * t, edge = W * 1.02 * Math.pow(Math.sin(Math.PI * Math.min(.96, t + .02)), .75);
      [1, -1].forEach(function (s) {
        slits += 'M' + f(s * (edge + 2)) + ' ' + f(y - 3) + 'L' + f(s * edge * .42) + ' ' + f(y + L * .03);
        veins += 'M0 ' + f(y + L * .06) + 'Q' + f(s * edge * .3) + ' ' + f(y + L * .02) + ' ' + f(s * edge * .85) + ' ' + f(y - L * .05);
        if (k % 2) slits += 'M' + f(s * edge * .28) + ' ' + f(y - L * .07) + 'l' + f(s * 1.5) + ' -1';
      });
    }
    out += '<path d="' + veins + '" stroke="#24502F" stroke-opacity=".4" stroke-width=".9" fill="none"/>';
    out += '<path d="' + slits + '" stroke="var(--paper,#F5F1E8)" stroke-width="' + f(L * .055) + '" stroke-linecap="round" fill="none"/>';
    out += '<path d="M0 0Q2 ' + f(-L * .5) + ' ' + f(W * .1) + ' ' + f(-L * .97) + '" stroke="#2C5A33" stroke-width="1.4" fill="none"/>';
    return out;
  }
  function frond(g, L, bend) { // palm frond: curved rachis with leaflets
    var cx = bend * L * .35, cy = -L * .55, ex = bend * L * .62, ey = -L * .92, out = '';
    function pt(t) { var u = 1 - t; return [u * u * 0 + 2 * u * t * cx + t * t * ex, 2 * u * t * cy + t * t * ey]; }
    for (var i = 2; i <= 22; i++) {
      var t = i / 23, a = pt(t), b = pt(Math.min(1, t + .02));
      var ang = Math.atan2(b[0] - a[0], -(b[1] - a[1])) * 180 / Math.PI, len = L * .36 * (1 - t * .62) + 4;
      out += at(a[0], a[1], ang - 58 - t * 10, leaf(g, len, 3.2, 'pl', '#2F5A2A', 1.5)) + at(a[0], a[1], ang + 58 + t * 10, leaf(g, len, 3.2, 'pl', '#2F5A2A', -1.5));
    }
    return out + '<path d="M0 0Q' + f(cx) + ' ' + f(cy) + ' ' + f(ex) + ' ' + f(ey) + '" stroke="#5A7A3A" stroke-width="2" fill="none" stroke-linecap="round"/>';
  }

  /* =================== FLOWERS (centred on 0,0) =================== */
  function unfurl(r0, inner) { return '<g class="lg-pt" style="--r:0deg;--r0:' + r0 + 'deg">' + inner + '</g>'; }
  function rose(g, r, v) { // v: colour set suffix
    function pet(L, W) { return 'M0 0C' + f(W * .9) + ' ' + f(-L * .08) + ' ' + f(W * 1.08) + ' ' + f(-L * .88) + ' 0 ' + f(-L) + 'C' + f(-W * 1.08) + ' ' + f(-L * .88) + ' ' + f(-W * .9) + ' ' + f(-L * .08) + ' 0 0Z'; }
    function ring(n, L, W, off, fill, r0) {
      var s = '';
      for (var i = 0; i < n; i++) s += '<path transform="rotate(' + f(off + i * 360 / n) + ')" d="' + pet(L, W) + '" fill="url(#' + g + fill + v + ')" stroke="url(#' + g + 're' + v + ')" stroke-width=".9"/>';
      return unfurl(r0, s);
    }
    var core = '<circle r="' + f(r * .3) + '" fill="url(#' + g + 'ri' + v + ')"/>' +
      '<path d="M' + f(-r * .22) + ' ' + f(r * .02) + 'A' + f(r * .2) + ' ' + f(r * .18) + ' 0 1 1 ' + f(r * .14) + ' ' + f(r * .14) +
      'M' + f(-r * .1) + ' ' + f(-r * .04) + 'A' + f(r * .1) + ' ' + f(r * .09) + ' 0 1 1 ' + f(r * .07) + ' ' + f(r * .06) + '" stroke="url(#' + g + 're' + v + ')" stroke-width="1.1" fill="none"/>';
    return '<ellipse cx="2" cy="4" rx="' + f(r * 1.02) + '" ry="' + f(r * .96) + '" fill="#3A1F1F" opacity=".12"/>' +
      ring(5, r, r * .62, 8, 'ro', -36) + ring(5, r * .76, r * .5, 44, 'rm', -54) + ring(4, r * .54, r * .42, 18, 'rm', -72) + core;
  }
  function roseBud(g, s, v, sep) {
    return '<path d="M0 0C' + f(6 * s) + ' ' + f(-4 * s) + ' ' + f(8 * s) + ' ' + f(-14 * s) + ' 0 ' + f(-22 * s) + 'C' + f(-8 * s) + ' ' + f(-14 * s) + ' ' + f(-6 * s) + ' ' + f(-4 * s) + ' 0 0Z" fill="url(#' + g + 'ro' + v + ')"/>' +
      '<path d="M0 ' + f(-21 * s) + 'C' + f(3 * s) + ' ' + f(-15 * s) + ' ' + f(2 * s) + ' ' + f(-8 * s) + ' ' + f(-2 * s) + ' ' + f(-3 * s) + '" stroke="url(#' + g + 're' + v + ')" stroke-width=".9" fill="none"/>' +
      '<path d="M0 0C' + f(-7 * s) + ' ' + f(-2 * s) + ' ' + f(-9 * s) + ' ' + f(-8 * s) + ' ' + f(-8 * s) + ' ' + f(-12 * s) + 'C' + f(-4 * s) + ' ' + f(-8 * s) + ' ' + f(-2 * s) + ' ' + f(-4 * s) + ' 0 0ZM0 0C' + f(7 * s) + ' ' + f(-2 * s) + ' ' + f(9 * s) + ' ' + f(-8 * s) + ' ' + f(8 * s) + ' ' + f(-12 * s) + 'C' + f(4 * s) + ' ' + f(-8 * s) + ' ' + f(2 * s) + ' ' + f(-4 * s) + ' 0 0Z" fill="' + sep + '"/>';
  }
  function ruffle(r, n, seed) {
    var d = '';
    for (var i = 0; i < n; i++) {
      var a1 = i / n * Math.PI * 2, a2 = (i + 1) / n * Math.PI * 2, am = (a1 + a2) / 2, k = .78 + rnd(seed + i) * .1, o = 1.02 + rnd(seed + i * 3) * .1;
      d += (i ? 'L' : 'M') + f(Math.cos(a1) * r * k) + ' ' + f(Math.sin(a1) * r * k) + 'Q' + f(Math.cos(am) * r * o) + ' ' + f(Math.sin(am) * r * o) + ' ' + f(Math.cos(a2) * r * k) + ' ' + f(Math.sin(a2) * r * k);
    }
    return d + 'Z';
  }
  function marigold(g, r, v) {
    var out = '<ellipse cx="2" cy="4" rx="' + f(r) + '" ry="' + f(r * .95) + '" fill="#5A2A05" opacity=".14"/>';
    [[1, 18, 'm1'], [.8, 16, 'm2'], [.6, 14, 'm3'], [.4, 11, 'm4']].forEach(function (L, i) {
      var p = ruffle(r * L[0], L[1], i * 7 + r);
      out += unfurl(-30 - i * 18, '<path d="' + p + '" fill="url(#' + g + L[2] + v + ')" stroke="#B44D05" stroke-opacity=".35" stroke-width=".7"/>');
    });
    var dots = '';
    for (var k = 0; k < 9; k++) { var a = k / 9 * Math.PI * 2; dots += '<circle cx="' + f(Math.cos(a) * r * .12) + '" cy="' + f(Math.sin(a) * r * .12) + '" r="' + f(r * .05) + '"/>'; }
    return out + '<g fill="#9A4204" opacity=".65">' + dots + '</g>';
  }
  function jasmine(g, s) { // small white star flowers with buds
    function bloom(x, y, k) {
      var p = '';
      for (var i = 0; i < 5; i++) p += '<ellipse cx="0" cy="' + f(-4.6 * k) + '" rx="' + f(2.4 * k) + '" ry="' + f(4.6 * k) + '" transform="rotate(' + (i * 72 + 10) + ')"/>';
      return at(x, y, 0, '<g fill="url(#' + g + 'ja)" stroke="#D8CDB5" stroke-width=".4">' + p + '</g><circle r="' + f(1.2 * k) + '" fill="#E7C45A"/>');
    }
    return '<path d="M0 0L' + f(-6 * s) + ' ' + f(-12 * s) + 'M0 0L' + f(7 * s) + ' ' + f(-10 * s) + 'M0 0V' + f(-16 * s) + '" stroke="#5E7A3A" stroke-width=".9"/>' +
      bloom(-6 * s, -12 * s, s) + bloom(7 * s, -10 * s, s * .9) + at(0, -16 * s, 0, '<ellipse cy="' + f(-4 * s) + '" rx="' + f(1.8 * s) + '" ry="' + f(4.5 * s) + '" fill="#FFFDF6" stroke="#E2C9C9" stroke-width=".4"/>');
  }
  function frang(g, r, v) {
    var s = '';
    var fp = 'M0 0C' + f(r * .5) + ' ' + f(-r * .05) + ' ' + f(r * .8) + ' ' + f(-r * .68) + ' ' + f(r * .3) + ' ' + f(-r * .98) +
      'C' + f(-r * .05) + ' ' + f(-r * 1.15) + ' ' + f(-r * .44) + ' ' + f(-r * .85) + ' ' + f(-r * .18) + ' ' + f(-r * .42) + 'C' + f(-r * .09) + ' ' + f(-r * .24) + ' ' + f(-r * .03) + ' ' + f(-r * .08) + ' 0 0Z';
    for (var i = 0; i < 5; i++) s += '<path transform="rotate(' + (i * 72) + ')" d="' + fp + '" fill="url(#' + g + 'fr' + v + ')" stroke="#DCCDB0" stroke-width=".6"/>';
    return '<ellipse cx="2" cy="3" rx="' + f(r * .95) + '" ry="' + f(r * .9) + '" fill="#4A3A10" opacity=".1"/>' + unfurl(-70, s) + '<circle r="' + f(r * .1) + '" fill="#E9A42A"/>';
  }
  function frangCluster(g, s, v) {
    return '<path d="M0 0L-10 -14M0 0L12 -10M0 0L2 -20" stroke="#6E8B4B" stroke-width="1.3" transform="scale(' + s + ')"/>' +
      at(-10 * s, -14 * s, 20, frang(g, 15 * s, v)) + at(12 * s, -10 * s, -15, frang(g, 13 * s, v === '' ? 'p' : '')) + at(2 * s, -22 * s, 50, frang(g, 16 * s, v));
  }
  function wild(g, s, col) { // small five-petal wildflowers (hillside)
    function b(x, y, k) {
      var p = '';
      for (var i = 0; i < 5; i++) p += '<ellipse cx="0" cy="' + f(-3.6 * k) + '" rx="' + f(2.6 * k) + '" ry="' + f(3.8 * k) + '" transform="rotate(' + (i * 72) + ')"/>';
      return at(x, y, 0, '<g fill="' + col + '" opacity=".95">' + p + '</g><circle r="' + f(1.3 * k) + '" fill="#E8C24F"/>');
    }
    return '<path d="M0 0Q-2 ' + f(-8 * s) + ' ' + f(-7 * s) + ' ' + f(-14 * s) + 'M0 0Q3 ' + f(-9 * s) + ' ' + f(6 * s) + ' ' + f(-18 * s) + '" stroke="#6E8048" stroke-width=".9" fill="none"/>' +
      b(-7 * s, -14 * s, s) + b(6 * s, -18 * s, s * .85) + b(0, -6 * s, s * .7);
  }

  /* =================== GROWING CLIMBER (same animation classes as the lotus) =================== */
  // H = height of the column in drawing units (width 190 units)
  function climber(side, H, T) {
    H = Math.max(420, Math.round(H || 1000));
    var g = 'tp' + (++GID);
    var defs = '<defs>' + lin(g + 'sheen', [[0, '#fff', .22], [.5, '#fff', 0], [1, '#000', .08]], true) + T.defs(g) + '</defs>';
    var vd = +(2.6 + H / 1300).toFixed(2), top = 70;
    function vx(y) { var t = (H - y); return 58 + 22 * Math.sin(t / 165 + .5) + 7 * Math.sin(t / 61); }
    var d = 'M' + f(vx(H)) + ' ' + H, d2 = 'M' + f(vx(H) - 16) + ' ' + H;
    for (var y = H - 10; y >= top; y -= 10) d += 'L' + f(vx(y)) + ' ' + y;
    for (var y2 = H - 10; y2 >= H * .3; y2 -= 10) d2 += 'L' + f(46 + 16 * Math.sin((H - y2) / 120 + 2.4)) + ' ' + y2;
    var vine = '<path class="lg-stem" pathLength="1" style="--d:.15s;--dur:' + (vd * .8).toFixed(2) + 's" d="' + d2 + '" stroke="url(#' + g + 'v)" stroke-width="1.7" fill="none" stroke-linecap="round" opacity=".8"/>' +
      '<path class="lg-stem" pathLength="1" style="--d:.1s;--dur:' + vd + 's" d="' + d + '" stroke="url(#' + g + 'v)" stroke-width="' + (T.vineW || 3.2) + '" fill="none" stroke-linecap="round"/>';
    var leaves = '', flowers = '';
    function piece(x, yy, delay, kind, ang, len, seed, onVine) {
      var r1 = rnd(seed), r2 = rnd(seed + 5);
      var tip = T.tip(g, kind, r1, r2), tx = Math.sin(ang * Math.PI / 180) * len, ty = -Math.cos(ang * Math.PI / 180) * len;
      var stem = onVine ? '' : '<path class="lg-stem" pathLength="1" style="--d:' + delay.toFixed(2) + 's;--dur:.6s" d="M0 0Q' + f(tx * .2) + ' ' + f(ty * .7) + ' ' + f(tx) + ' ' + f(ty) + '" stroke="url(#' + g + 'v)" stroke-width="' + (tip.flower ? 1.8 : 1.5) + '" fill="none" stroke-linecap="round"/>';
      var rot = tip.flower ? (r1 - .5) * 30 : ang + (r2 - .5) * 16;
      var html = '<g transform="translate(' + f(x) + ' ' + f(yy) + ')"><g class="lg-plant" style="--d:' + delay.toFixed(2) + 's;--sw:' + (4.5 + r2 * 3).toFixed(1) + 's;--a:' + (onVine ? 1.2 : 2.4) + 'deg">' + stem +
        '<g transform="translate(' + f(tx) + ' ' + f(ty) + ') rotate(' + f(rot) + ')"><g class="' + (tip.flower ? 'lg-flower' : 'lg-leaf') + '" style="--d:' + (delay + .45).toFixed(2) + 's">' + tip.svg + '</g></g></g></g>';
      if (tip.flower) flowers += html; else leaves += html;
    }
    var n = Math.max(8, Math.round(H / 64));
    for (var i = 0; i < n; i++) {
      var frac = (i + .5) / n, yy = H - 40 - frac * (H - top - 90), x = vx(yy), dir = i % 2 ? 1 : -1, r1 = rnd(i + 3), r2 = rnd(i + 11);
      var delay = .1 + vd * (.04 + frac * .9), kind = T.seq[i % T.seq.length];
      piece(x, yy, delay, kind, dir * (40 + r2 * 32), 20 + r1 * 22, i + 1, false);
      piece(x, yy + 14, delay - .1, T.vineLeaf, -dir * (50 + r1 * 20), 2, i + 40, true); // leaf straight on the vine
    }
    (T.base || []).forEach(function (b, k) { piece(b[0], H - 4, .05 + k * .1, b[1], b[2], 2, k + 90, true); });
    piece(vx(top), top + 10, .1 + vd, T.crown, 0, 4, 77, true);
    return '<svg class="lg lg--' + side + '" viewBox="-30 0 190 ' + H + '" preserveAspectRatio="xMinYMax meet" xmlns="' + NS + '" aria-hidden="true">' + defs +
      '<g' + (side === 'r' ? ' transform="translate(130 0) scale(-1 1)"' : '') + '>' + vine + leaves + flowers + '</g></svg>';
  }

  /* =================== THE PACKS =================== */
  var GREEN = [[0, '#3E6A2C'], [.55, '#6E9A45'], [1, '#9DBF6A']];
  var ROSE_SETS = {
    b: { o: [[0, '#E58FA3'], [.6, '#F5C2CD'], [1, '#FDE7EB']], m: [[0, '#D9728C'], [.7, '#F0AEBD'], [1, '#FAD6DD']], i: [[0, '#F4B7C4'], [1, '#C9577A']], e: '#C76C84' },
    w: { o: [[0, '#E6D7C2'], [.6, '#F8F1E6'], [1, '#FFFFFF']], m: [[0, '#DCC9AE'], [.7, '#F3EADC'], [1, '#FFFDF9']], i: [[0, '#F6EEE2'], [1, '#CDB896']], e: '#C8B391' },
    k: { o: [[0, '#E9A8AC'], [.6, '#F8D9D4'], [1, '#FFF3EF']], m: [[0, '#DE8E98'], [.7, '#F3C4C4'], [1, '#FDE8E4']], i: [[0, '#F7CFCB'], [1, '#C66D7B']], e: '#CF8790' }
  };
  function roseDefs(g, v) {
    var s = ROSE_SETS[v];
    return lin(g + 'ro' + v, s.o) + lin(g + 'rm' + v, s.m) + rad(g + 'ri' + v, s.i, '45%', '40%', '70%') +
      '<linearGradient id="' + g + 're' + v + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + s.e + '" stop-opacity=".25"/><stop offset="1" stop-color="' + s.e + '" stop-opacity=".7"/></linearGradient>';
  }
  var GARDEN = {
    palace: {
      vineW: 3.4, vineLeaf: 'mango', crown: 'marigoldBig',
      seq: ['mango', 'marigold', 'mango', 'jasmine', 'marigoldY', 'mango', 'marigold', 'bud'],
      base: [[10, 'mango', -50], [70, 'mango', 40], [40, 'marigoldBig', 0]],
      defs: function (g) {
        var m = function (v, a) { return a.map(function (s, i) { return rad(g + 'm' + (i + 1) + v, s, '50%', '50%', '55%'); }).join(''); };
        return lin(g + 'v', [[0, '#4C6A2A'], [1, '#6F8F3E']], true) + lin(g + 'lf', [[0, '#2F5A24'], [.6, '#4F7F34'], [1, '#7FA653']]) +
          m('', [[[0, '#C9560A'], [.7, '#F08A10'], [1, '#FFB530']], [[0, '#D7650B'], [1, '#F9A322']], [[0, '#C45208'], [1, '#FBB33A']], [[0, '#B94A06'], [1, '#F59A1A']]]) +
          m('y', [[[0, '#E09A0E'], [.7, '#F9C226'], [1, '#FFDC5C']], [[0, '#E6A312'], [1, '#FFD13E']], [[0, '#D88E0A'], [1, '#FFD650']], [[0, '#C9800A'], [1, '#F7BE26']]]) +
          lin(g + 'ja', [[0, '#F3EDE0'], [1, '#FFFFFF']]) + lin(g + 'bud', [[0, '#C9560A'], [1, '#F7A21B']]);
      },
      tip: function (g, k, r1, r2) {
        if (k === 'mango') return { svg: leaf(g, 34 + r1 * 10, 7.5 + r2 * 2, 'lf', '#24461B', (r2 - .5) * 6) };
        if (k === 'marigold') return { flower: 1, svg: marigold(g, 15 + r1 * 4, '') };
        if (k === 'marigoldY') return { flower: 1, svg: marigold(g, 14 + r1 * 3, 'y') };
        if (k === 'marigoldBig') return { flower: 1, svg: marigold(g, 21, r1 > .5 ? 'y' : '') };
        if (k === 'jasmine') return { flower: 1, svg: jasmine(g, 1.4 + r1 * .3) };
        return { flower: 1, svg: '<circle r="7" fill="url(#' + g + 'bud)"/><path d="M-6 3Q0 9 6 3" stroke="#4C6A2A" stroke-width="2" fill="none"/>' };
      }
    },
    beach: {
      vineW: 3, vineLeaf: 'monSmall', crown: 'frangBig',
      seq: ['monstera', 'frang', 'monSmall', 'frond', 'frangP', 'monstera', 'frang', 'monSmall'],
      base: [[10, 'frondBig', -40], [60, 'frondBig', 35], [30, 'monstera', -8]],
      defs: function (g) {
        return lin(g + 'v', [[0, '#5E7E3E'], [1, '#7FA055']], true) + rad(g + 'mo', [[0, '#5F9A4E'], [.6, '#3D7A3C'], [1, '#235A2C']], '40%', '60%', '75%') +
          lin(g + 'pl', [[0, '#3C7038'], [.6, '#5E9446'], [1, '#8DBA62']]) +
          rad(g + 'fr', [[0, '#F4B930'], [.28, '#FCE7A2'], [.55, '#FFFCF1'], [1, '#FFFFFF']], '35%', '100%', '110%') +
          rad(g + 'frp', [[0, '#F2A93A'], [.3, '#FBD2A8'], [.6, '#F7C2D2'], [1, '#EC8FAE']], '35%', '100%', '110%');
      },
      tip: function (g, k, r1, r2) {
        if (k === 'monstera') return { svg: monstera(g, 44 + r1 * 12) };
        if (k === 'monSmall') return { svg: monstera(g, 26 + r1 * 8) };
        if (k === 'frond') return { svg: frond(g, 52 + r1 * 14, r2 > .5 ? 1 : -1) };
        if (k === 'frondBig') return { svg: frond(g, 110, r2 > .5 ? 1 : -1) };
        if (k === 'frangP') return { flower: 1, svg: frangCluster(g, .95 + r1 * .2, 'p') };
        if (k === 'frangBig') return { flower: 1, svg: frangCluster(g, 1.35, '') };
        return { flower: 1, svg: frangCluster(g, 1 + r1 * .2, '') };
      }
    },
    hillside: {
      vineW: 2.8, vineLeaf: 'trio', crown: 'roseBig',
      seq: ['trio', 'rose', 'wild', 'bud', 'trio', 'roseK', 'trio', 'wildW', 'rose', 'bud'],
      base: [[8, 'trio', -45], [64, 'trio', 45], [36, 'roseBig', 0]],
      defs: function (g) {
        return lin(g + 'v', [[0, '#6B5A3A'], [.5, '#7E8A4C'], [1, '#5F6E39']], true) + lin(g + 'lf', [[0, '#3F5E2E'], [.6, '#5E8040'], [1, '#89A766']]) +
          roseDefs(g, 'b') + roseDefs(g, 'k');
      },
      tip: function (g, k, r1, r2) {
        if (k === 'trio') return { svg: leafTrio(g, 1 + r1 * .35, 'lf', '#2E4A22') };
        if (k === 'rose') return { flower: 1, svg: rose(g, 15 + r1 * 4, 'b') };
        if (k === 'roseK') return { flower: 1, svg: rose(g, 14 + r1 * 3, 'k') };
        if (k === 'roseBig') return { flower: 1, svg: rose(g, 22, 'b') };
        if (k === 'wild') return { flower: 1, svg: wild(g, 1.3, '#C9B6E0') };
        if (k === 'wildW') return { flower: 1, svg: wild(g, 1.3, '#FFFDF7') };
        return { flower: 1, svg: roseBud(g, 1 + r1 * .2, 'b', '#4F6E33') };
      }
    },
    arabian: {
      vineW: 2.6, vineLeaf: 'twigS', crown: 'roseBig',
      seq: ['twig', 'rose', 'twigS', 'pearl', 'twig', 'roseK', 'twigS', 'bud'],
      base: [[10, 'twig', -45], [66, 'twig', 45], [38, 'roseBig', 0]],
      defs: function (g) {
        return lin(g + 'v', [[0, '#9C7A42'], [.5, '#D8BC7E'], [1, '#A8884F']], true) + lin(g + 'au', [[0, '#A5824A'], [.5, '#D9BE84'], [1, '#F2E2B6']]) +
          lin(g + 'sg', [[0, '#8C9A88'], [1, '#C9D2C2']]) + roseDefs(g, 'w') + roseDefs(g, 'k') +
          rad(g + 'pe', [[0, '#FFFFFF'], [.6, '#F3ECE0'], [1, '#CDBB9C']], '35%', '30%', '70%');
      },
      tip: function (g, k, r1, r2) {
        if (k === 'twig') return { svg: twig(g, 1.15 + r1 * .3, r2 > .4 ? 'au' : 'sg', '#8E6E3A', 4) };
        if (k === 'twigS') return { svg: twig(g, .9, r1 > .5 ? 'au' : 'sg', '#8E6E3A', 3) };
        if (k === 'rose') return { flower: 1, svg: rose(g, 15 + r1 * 4, 'w') };
        if (k === 'roseK') return { flower: 1, svg: rose(g, 13 + r1 * 3, 'k') };
        if (k === 'roseBig') return { flower: 1, svg: rose(g, 22, 'w') };
        if (k === 'pearl') return { flower: 1, svg: '<path d="M0 0L-7 -10M0 0L6 -13M0 0L1 -18" stroke="#B0915A" stroke-width=".9"/><circle cx="-7" cy="-10" r="3.4" fill="url(#' + g + 'pe)"/><circle cx="6" cy="-13" r="3" fill="url(#' + g + 'pe)"/><circle cx="1" cy="-18" r="3.8" fill="url(#' + g + 'pe)"/>' };
        return { flower: 1, svg: roseBud(g, 1 + r1 * .2, 'w', '#9DA58C') };
      }
    }
  };

  /* ---------- opening-card prints and background patterns (line art tiles) ---------- */
  function tile(name, ink, op) {
    op = op == null ? .55 : op;
    var w = 100, h = 100, body = '';
    var S = 'fill="none" stroke="' + ink + '" stroke-opacity="' + op + '" stroke-width="1.1" stroke-linecap="round"';
    function Sx(k) { return S.replace('stroke-opacity="' + op + '"', 'stroke-opacity="' + (op * k).toFixed(2) + '"'); }
    var F = 'fill="' + ink + '" fill-opacity="' + op + '"';
    function buti(x, y, k) { // small four-petal flower
      var p = '';
      for (var i = 0; i < 4; i++) p += '<ellipse cx="0" cy="' + f(-4 * k) + '" rx="' + f(2.2 * k) + '" ry="' + f(4 * k) + '" transform="rotate(' + (i * 90 + 45) + ')"/>';
      return at(x, y, 0, '<g ' + S + '>' + p + '</g><circle r="' + f(1.2 * k) + '" ' + F + '/>');
    }
    if (name === 'palace') { // Mughal ogee lattice with buti
      w = 90; h = 110;
      body = '<path d="M0 0C0 30 45 25 45 55C45 85 90 80 90 110M90 0C90 30 45 25 45 55C45 85 0 80 0 110" ' + S + '/>' +
        '<path d="M0 6C2 30 40 28 41 55M90 6C88 30 50 28 49 55M41 55C40 82 2 80 0 104M49 55C50 82 88 80 90 104" ' + Sx(.5) + '/>' +
        buti(45, 0, 1.3) + buti(45, 110, 1.3) + buti(0, 55, 1.3) + buti(90, 55, 1.3) + buti(45, 55, .7) +
        '<path d="M22 55c0-5 3-8 6-9M68 55c0-5-3-8-6-9" ' + S + '/>';
    } else if (name === 'beach') { // monstera + frangipani outlines
      w = 150; h = 150;
      var mon = 'M0 0C22 0 24 -36 2 -50C-20 -36 -22 0 0 0Z';
      body = at(40, 70, -28, '<path d="' + mon + '" ' + S + '/><path d="M0 0V-48M0 -12l12 -6M0 -24l14 -6M0 -36l10 -5M0 -12l-12 -6M0 -24l-14 -6M0 -36l-10 -5" ' + S + '/>') +
        at(112, 118, 0, [0, 72, 144, 216, 288].map(function (a) { return '<path transform="rotate(' + a + ')" d="M0 0C5 0 8 -7 3 -10C0 -11 -4 -9 -2 -4Z" ' + S + '/>'; }).join('') + '<circle r="1.4" ' + F + '/>') +
        at(118, 34, 30, '<path d="M0 0Q4 -20 0 -40" ' + S + '/>' + [8, 16, 24, 32].map(function (y) { return '<path d="M1 -' + y + 'l9 -6M1 -' + y + 'l-9 -6" ' + S + '/>'; }).join('')) +
        '<circle cx="80" cy="20" r="1.3" ' + F + '/><circle cx="20" cy="130" r="1.3" ' + F + '/><circle cx="74" cy="132" r="1" ' + F + '/>';
    } else if (name === 'hillside') { // botanical sprigs
      w = 120; h = 120;
      var spr = '<path d="M0 0Q4 -18 0 -34" ' + S + '/><path d="M1 -10C8 -12 12 -18 10 -22C4 -20 1 -15 1 -10ZM1 -20C-6 -22 -10 -28 -8 -32C-2 -30 1 -25 1 -20Z" ' + S + '/>' +
        '<path d="M0 -34C3 -36 4 -40 0 -44C-4 -40 -3 -36 0 -34Z" ' + S + '/>';
      body = at(30, 52, -12, spr) + at(92, 112, 14, spr) + buti(88, 34, .9) + buti(26, 100, .8) + '<circle cx="60" cy="72" r="1.2" ' + F + '/><circle cx="6" cy="6" r="1" ' + F + '/>';
    } else if (name === 'arabian') { // eight-point star lattice
      w = 64; h = 64;
      var star = '';
      for (var k = 0; k < 16; k++) { var a = k / 16 * Math.PI * 2, rr = k % 2 ? 6.5 : 13; star += (k ? 'L' : 'M') + f(32 + Math.sin(a) * rr) + ' ' + f(32 - Math.cos(a) * rr); }
      body = '<path d="' + star + 'Z" ' + S + '/><circle cx="32" cy="32" r="3" ' + S + '/>' +
        '<path d="M32 0V19M32 45V64M0 32H19M45 32H64M0 0L22.8 22.8M41.2 41.2L64 64M64 0L41.2 22.8M22.8 41.2L0 64" ' + Sx(.6) + '/>' +
        '<path d="M0 -5L5 0 0 5 -5 0Z" ' + S + ' transform="translate(0 0)"/><path d="M64 -5L69 0 64 5 59 0Z" ' + S + '/><path d="M0 59L5 64 0 69 -5 64Z" ' + S + '/><path d="M64 59L69 64 64 69 59 64Z" ' + S + '/>';
    } else return '';
    var svg = '<svg xmlns="' + NS + '" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' + body + '</svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }

  /* ---------- ornament between rules (viewBox 0 0 40 24) ---------- */
  function starPath(cx, cy, R, r, n) { var d = ''; for (var k = 0; k < n * 2; k++) { var a = k / (n * 2) * Math.PI * 2, q = k % 2 ? r : R; d += (k ? 'L' : 'M') + f(cx + Math.sin(a) * q) + ' ' + f(cy - Math.cos(a) * q); } return d + 'Z'; }
  var ORN = {
    palace: '<path fill="currentColor" d="M20 2.5c5.2 0 8.2 4.3 7.2 9.1-1 4.9-5.9 9-11.2 9 3-1.8 4.2-5 2.2-7.1-2.7-2.3-6.3-.2-6.1 2.9C10 10.2 13.9 2.5 20 2.5Z"/><circle cx="20.5" cy="9.5" r="1.6" fill="#fff" fill-opacity=".5"/><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="34" cy="12" r="1.5" fill="currentColor"/>',
    beach: '<g fill="currentColor" transform="translate(20 12)">' + [0, 72, 144, 216, 288].map(function (a) { return '<path transform="rotate(' + a + ')" d="M0 0C3.6 0 6 -5 2.4 -9.4C0 -10.4 -3.2 -8.4 -1.6 -3.6Z"/>'; }).join('') + '</g><circle cx="20" cy="12" r="1.4" fill="#fff" fill-opacity=".7"/><circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="35" cy="12" r="1.3" fill="currentColor"/>',
    hillside: '<path fill="currentColor" d="M20 3.5c3.2 2.2 4.1 5.4 2.1 8.2-1.1 1.2-3.1 1.2-4.2 0-2-2.8-1.1-6 2.1-8.2ZM20 13.5c-4-3-9-3.2-12.6-1.2 4 2.4 8.5 2.6 12.6 1.2Zm0 0c4-3 9-3.2 12.6-1.2-4 2.4-8.5 2.6-12.6 1.2Z"/><path d="M20 12v9" stroke="currentColor" stroke-width="1.2"/>',
    arabian: '<path fill="currentColor" d="' + starPath(20, 12, 10, 5.4, 8) + '"/><circle cx="20" cy="12" r="2.4" fill="#fff" fill-opacity=".6"/><path fill="currentColor" d="M5 9.5 7.5 12 5 14.5 2.5 12ZM35 9.5 37.5 12 35 14.5 32.5 12Z"/>'
  };

  /* ---------- petal showers ---------- */
  var FRANG = '<svg viewBox="-12 -12 24 24" aria-hidden="true"><defs><radialGradient id="pg{i}" cx="0" cy="0" r="11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{c}"/><stop offset=".38" stop-color="{b}"/><stop offset="1" stop-color="{a}"/></radialGradient></defs>' +
    [0, 72, 144, 216, 288].map(function (a) { return '<path transform="rotate(' + a + ')" d="M0 0C5.4 -.5 8.6 -7.4 3.3 -10.6C-.5 -12.4 -4.6 -9.2 -1.9 -4.4Z" fill="url(#pg{i})" stroke="#E2D3B5" stroke-width=".4"/>'; }).join('') + '</svg>';
  var PETALS = {
    palace: { colors: [['#FFC23A', '#F59A12', '#C9620A'], ['#FFB020', '#F08A0C', '#B9550A'], ['#FFD95A', '#F7B21E', '#D58410'], ['#FF9F1C', '#E8740B', '#A84A08']] },
    beach: { shape: FRANG, colors: [['#FFFFFF', '#FFF6D8', '#F4B930'], ['#FFF4F8', '#F9C9D7', '#F2A93A'], ['#FFFFFF', '#FFF1C9', '#EFA92A']], size: 8 },
    hillside: { colors: [['#FBD7DE', '#F2A7B8', '#D9738D'], ['#FDE4E8', '#F5B9C6', '#E08AA0'], ['#F7C6CF', '#EC98AB', '#C9637E']] },
    arabian: { colors: [['#FFFFFF', '#F8F1E7', '#E4D5BE'], ['#FFFDF8', '#F6EBDD', '#DCC8AA'], ['#FDF4F2', '#F5DCD8', '#DDB5AE']] }
  };

  var PACKS = {
    lotus:    { label: 'Lotus Garden',     palette: 'lotus',          wax: '#9E2F4E', door: 'lotus',    paper: '#FFFFFF' },
    palace:   { label: 'Royal Palace',     palette: 'royal',          wax: '#7E2230', door: 'palace',   paper: '#FFF1E0', doorInk: '#8A2B33', patInk: '#7E2230' },
    beach:    { label: 'Beach & Tropical', palette: 'ocean',          wax: '#2E6070', door: 'beach',    paper: '#F7FBF8', doorInk: '#3F6E6A', patInk: '#2E6070' },
    hillside: { label: 'Hillside Garden',  palette: 'sageChampagne',  wax: '#A35E6B', door: 'hillside', paper: '#FAFBF1', doorInk: '#6E7A52', patInk: '#6E7A5C' },
    arabian:  { label: 'Arabian Luxe',     palette: 'champagnePearl', wax: '#9C7F57', door: 'arabian',  paper: '#FFFDF8', doorInk: '#A6874F', patInk: '#9C7F57' }
  };

  window.SELECT_THEMES = {
    packs: PACKS,
    garden: function (pack, side, H) { return GARDEN[pack] ? climber(side, H, GARDEN[pack]) : ''; },
    hasGarden: function (pack) { return !!GARDEN[pack]; },
    tile: tile,
    hasTile: function (name) { return name === 'palace' || name === 'beach' || name === 'hillside' || name === 'arabian'; },
    ornament: function (pack) { return ORN[pack] || ''; },
    petals: function (pack) { return PETALS[pack] || {}; }
  };
})();
