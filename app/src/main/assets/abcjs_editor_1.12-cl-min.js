(function(a) {
  var c = /[\.\/]/, b = function() {
  }, d = function(b, a) {
    return b - a;
  }, k, g, e = {n:{}}, f = function(b, a) {
    b = String(b);
    var c = g, e = Array.prototype.slice.call(arguments, 2), r = f.listeners(b), s = 0, v, B = [], q = {}, y = [], A = k;
    k = b;
    for (var D = g = 0, z = r.length;D < z;D++) {
      "zIndex" in r[D] && (B.push(r[D].zIndex), 0 > r[D].zIndex && (q[r[D].zIndex] = r[D]));
    }
    for (B.sort(d);0 > B[s];) {
      if (v = q[B[s++]], y.push(v.apply(a, e)), g) {
        return g = c, y;
      }
    }
    for (D = 0;D < z;D++) {
      if (v = r[D], "zIndex" in v) {
        if (v.zIndex == B[s]) {
          y.push(v.apply(a, e));
          if (g) {
            break;
          }
          do {
            if (s++, (v = q[B[s]]) && y.push(v.apply(a, e)), g) {
              break;
            }
          } while (v);
        } else {
          q[v.zIndex] = v;
        }
      } else {
        if (y.push(v.apply(a, e)), g) {
          break;
        }
      }
    }
    g = c;
    k = A;
    return y.length ? y : null;
  };
  f._events = e;
  f.listeners = function(b) {
    b = b.split(c);
    var a = e, d, f, g, k, v, B, q, y = [a], A = [];
    g = 0;
    for (k = b.length;g < k;g++) {
      q = [];
      v = 0;
      for (B = y.length;v < B;v++) {
        for (a = y[v].n, d = [a[b[g]], a["*"]], f = 2;f--;) {
          if (a = d[f]) {
            q.push(a), A = A.concat(a.f || []);
          }
        }
      }
      y = q;
    }
    return A;
  };
  f.on = function(a, d) {
    a = String(a);
    if ("function" != typeof d) {
      return function() {
      };
    }
    for (var f = a.split(c), g = e, k = 0, s = f.length;k < s;k++) {
      g = g.n, g = g.hasOwnProperty(f[k]) && g[f[k]] || (g[f[k]] = {n:{}});
    }
    g.f = g.f || [];
    k = 0;
    for (s = g.f.length;k < s;k++) {
      if (g.f[k] == d) {
        return b;
      }
    }
    g.f.push(d);
    return function(b) {
      +b == +b && (d.zIndex = +b);
    };
  };
  f.f = function(b) {
    var a = [].slice.call(arguments, 1);
    return function() {
      f.apply(null, [b, null].concat(a).concat([].slice.call(arguments, 0)));
    };
  };
  f.stop = function() {
    g = 1;
  };
  f.nt = function(b) {
    return b ? (new RegExp("(?:\\.|\\/|^)" + b + "(?:\\.|\\/|$)")).test(k) : k;
  };
  f.nts = function() {
    return k.split(c);
  };
  f.off = f.unbind = function(b, a) {
    if (b) {
      var d = b.split(c), g, k, s, v, B, q, y = [e];
      v = 0;
      for (B = d.length;v < B;v++) {
        for (q = 0;q < y.length;q += s.length - 2) {
          s = [q, 1];
          g = y[q].n;
          if ("*" != d[v]) {
            g[d[v]] && s.push(g[d[v]]);
          } else {
            for (k in g) {
              g.hasOwnProperty(k) && s.push(g[k]);
            }
          }
          y.splice.apply(y, s);
        }
      }
      v = 0;
      for (B = y.length;v < B;v++) {
        for (g = y[v];g.n;) {
          if (a) {
            if (g.f) {
              q = 0;
              for (d = g.f.length;q < d;q++) {
                if (g.f[q] == a) {
                  g.f.splice(q, 1);
                  break;
                }
              }
              !g.f.length && delete g.f;
            }
            for (k in g.n) {
              if (g.n.hasOwnProperty(k) && g.n[k].f) {
                s = g.n[k].f;
                q = 0;
                for (d = s.length;q < d;q++) {
                  if (s[q] == a) {
                    s.splice(q, 1);
                    break;
                  }
                }
                !s.length && delete g.n[k].f;
              }
            }
          } else {
            for (k in delete g.f, g.n) {
              g.n.hasOwnProperty(k) && g.n[k].f && delete g.n[k].f;
            }
          }
          g = g.n;
        }
      }
    } else {
      f._events = e = {n:{}};
    }
  };
  f.once = function(b, a) {
    var e = function() {
      f.unbind(b, e);
      return a.apply(this, arguments);
    };
    return f.on(b, e);
  };
  f.version = "0.4.2";
  f.toString = function() {
    return "You are running Eve 0.4.2";
  };
  "undefined" != typeof module && module.exports ? module.exports = f : "undefined" != typeof define ? define("eve", [], function() {
    return f;
  }) : a.eve = f;
})(this);
(function(a, c) {
  "function" === typeof define && define.amd ? define(["eve"], function(b) {
    return c(a, b);
  }) : c(a, a.eve);
})(this, function(a, c) {
  function b(F) {
    if (b.is(F, "function")) {
      return q ? F() : c.on("raphael.DOMload", F);
    }
    if (b.is(F, U)) {
      return b._engine.create[u](b, F.splice(0, 3 + b.is(F[0], P))).add(F);
    }
    var a = Array.prototype.slice.call(arguments, 0);
    if (b.is(a[a.length - 1], "function")) {
      var e = a.pop();
      return q ? e.call(b._engine.create[u](b, a)) : c.on("raphael.DOMload", function() {
        e.call(b._engine.create[u](b, a));
      });
    }
    return b._engine.create[u](b, arguments);
  }
  function d(b) {
    if ("function" == typeof b || Object(b) !== b) {
      return b;
    }
    var a = new b.constructor, e;
    for (e in b) {
      b.hasOwnProperty(e) && (a[e] = d(b[e]));
    }
    return a;
  }
  function k(b, a, e) {
    function c() {
      var d = Array.prototype.slice.call(arguments, 0), f = d.join("\u2400"), g = c.cache = c.cache || {}, h = c.count = c.count || [];
      if (g.hasOwnProperty(f)) {
        a: {
          for (var d = h, h = f, l = 0, m = d.length;l < m;l++) {
            if (d[l] === h) {
              d.push(d.splice(l, 1)[0]);
              break a;
            }
          }
        }
        return e ? e(g[f]) : g[f];
      }
      1E3 <= h.length && delete g[h.shift()];
      h.push(f);
      g[f] = b[u](a, d);
      return e ? e(g[f]) : g[f];
    }
    return c;
  }
  function g() {
    return this.hex;
  }
  function e(b, a) {
    for (var e = [], c = 0, d = b.length;d - 2 * !a > c;c += 2) {
      var f = [{x:+b[c - 2], y:+b[c - 1]}, {x:+b[c], y:+b[c + 1]}, {x:+b[c + 2], y:+b[c + 3]}, {x:+b[c + 4], y:+b[c + 5]}];
      a ? c ? d - 4 == c ? f[3] = {x:+b[0], y:+b[1]} : d - 2 == c && (f[2] = {x:+b[0], y:+b[1]}, f[3] = {x:+b[2], y:+b[3]}) : f[0] = {x:+b[d - 2], y:+b[d - 1]} : d - 4 == c ? f[3] = f[2] : c || (f[0] = {x:+b[c], y:+b[c + 1]});
      e.push(["C", (-f[0].x + 6 * f[1].x + f[2].x) / 6, (-f[0].y + 6 * f[1].y + f[2].y) / 6, (f[1].x + 6 * f[2].x - f[3].x) / 6, (f[1].y + 6 * f[2].y - f[3].y) / 6, f[2].x, f[2].y]);
    }
    return e;
  }
  function f(b, a, c, e, d, f, g, h, l) {
    null == l && (l = 1);
    l = (1 < l ? 1 : 0 > l ? 0 : l) / 2;
    for (var m = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], k = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], n = 0, u = 0;12 > u;u++) {
      var p = l * m[u] + l, w = p * (p * (-3 * b + 9 * c - 9 * d + 3 * g) + 6 * b - 12 * c + 6 * d) - 3 * b + 3 * c, p = p * (p * (-3 * a + 9 * e - 9 * f + 3 * h) + 6 * a - 12 * e + 6 * f) - 3 * a + 3 * e, n = n + k[u] * x.sqrt(w * w + p * p)
    }
    return l * n;
  }
  function h(b, a, c, e, d, g, h, l, m) {
    if (!(0 > m || f(b, a, c, e, d, g, h, l) < m)) {
      var k = .5, n = 1 - k, u;
      for (u = f(b, a, c, e, d, g, h, l, n);.01 < O(u - m);) {
        k /= 2, n += (u < m ? 1 : -1) * k, u = f(b, a, c, e, d, g, h, l, n);
      }
      return n;
    }
  }
  function l(F, a, c) {
    F = b._path2curve(F);
    a = b._path2curve(a);
    for (var e, d, g, h, l, m, k, n, u, p, w = c ? 0 : [], r = 0, s = F.length;r < s;r++) {
      if (u = F[r], "M" == u[0]) {
        e = l = u[1], d = m = u[2];
      } else {
        "C" == u[0] ? (u = [e, d].concat(u.slice(1)), e = u[6], d = u[7]) : (u = [e, d, e, d, l, m, l, m], e = l, d = m);
        for (var t = 0, x = a.length;t < x;t++) {
          if (p = a[t], "M" == p[0]) {
            g = k = p[1], h = n = p[2];
          } else {
            "C" == p[0] ? (p = [g, h].concat(p.slice(1)), g = p[6], h = p[7]) : (p = [g, h, g, h, k, n, k, n], g = k, h = n);
            var y;
            var v = u, q = p;
            y = c;
            var z = b.bezierBBox(v), E = b.bezierBBox(q);
            if (b.isBBoxIntersect(z, E)) {
              for (var z = f.apply(0, v), E = f.apply(0, q), z = C(~~(z / 5), 1), E = C(~~(E / 5), 1), ta = [], ua = [], Ka = {}, va = y ? 0 : [], T = 0;T < z + 1;T++) {
                var Y = b.findDotsAtSegment.apply(b, v.concat(T / z));
                ta.push({x:Y.x, y:Y.y, t:T / z});
              }
              for (T = 0;T < E + 1;T++) {
                Y = b.findDotsAtSegment.apply(b, q.concat(T / E)), ua.push({x:Y.x, y:Y.y, t:T / E});
              }
              for (T = 0;T < z;T++) {
                for (v = 0;v < E;v++) {
                  var Z = ta[T], ga = ta[T + 1], q = ua[v], Y = ua[v + 1], ja = .001 > O(ga.x - Z.x) ? "y" : "x", ka = .001 > O(Y.x - q.x) ? "y" : "x", N;
                  N = Z.x;
                  var A = Z.y, B = ga.x, D = ga.y, $ = q.x, V = q.y, L = Y.x, R = Y.y;
                  if (C(N, B) < M($, L) || M(N, B) > C($, L) || C(A, D) < M(V, R) || M(A, D) > C(V, R)) {
                    N = void 0;
                  } else {
                    var G = (N * D - A * B) * ($ - L) - (N - B) * ($ * R - V * L), J = (N * D - A * B) * (V - R) - (A - D) * ($ * R - V * L), H = (N - B) * (V - R) - (A - D) * ($ - L);
                    if (H) {
                      var G = G / H, J = J / H, H = +G.toFixed(2), I = +J.toFixed(2);
                      N = H < +M(N, B).toFixed(2) || H > +C(N, B).toFixed(2) || H < +M($, L).toFixed(2) || H > +C($, L).toFixed(2) || I < +M(A, D).toFixed(2) || I > +C(A, D).toFixed(2) || I < +M(V, R).toFixed(2) || I > +C(V, R).toFixed(2) ? void 0 : {x:G, y:J};
                    } else {
                      N = void 0;
                    }
                  }
                  N && Ka[N.x.toFixed(4)] != N.y.toFixed(4) && (Ka[N.x.toFixed(4)] = N.y.toFixed(4), Z = Z.t + O((N[ja] - Z[ja]) / (ga[ja] - Z[ja])) * (ga.t - Z.t), q = q.t + O((N[ka] - q[ka]) / (Y[ka] - q[ka])) * (Y.t - q.t), 0 <= Z && 1.001 >= Z && 0 <= q && 1.001 >= q && (y ? va++ : va.push({x:N.x, y:N.y, t1:M(Z, 1), t2:M(q, 1)})));
                }
              }
              y = va;
            } else {
              y = y ? 0 : [];
            }
            if (c) {
              w += y;
            } else {
              z = 0;
              for (E = y.length;z < E;z++) {
                y[z].segment1 = r, y[z].segment2 = t, y[z].bez1 = u, y[z].bez2 = p;
              }
              w = w.concat(y);
            }
          }
        }
      }
    }
    return w;
  }
  function n(b, a, c, e, d, f) {
    null != b ? (this.a = +b, this.b = +a, this.c = +c, this.d = +e, this.e = +d, this.f = +f) : (this.a = 1, this.c = this.b = 0, this.d = 1, this.f = this.e = 0);
  }
  function m() {
    return this.x + " " + this.y + " " + this.width + " \u00d7 " + this.height;
  }
  function r(b, a, c, e, d, f) {
    function g(b, F) {
      var a, c, e, d;
      e = b;
      for (c = 0;8 > c;c++) {
        d = ((m * e + l) * e + h) * e - b;
        if (O(d) < F) {
          return e;
        }
        a = (3 * m * e + 2 * l) * e + h;
        if (1E-6 > O(a)) {
          break;
        }
        e -= d / a;
      }
      a = 0;
      c = 1;
      e = b;
      if (e < a) {
        return a;
      }
      if (e > c) {
        return c;
      }
      for (;a < c;) {
        d = ((m * e + l) * e + h) * e;
        if (O(d - b) < F) {
          break;
        }
        b > d ? a = e : c = e;
        e = (c - a) / 2 + a;
      }
      return e;
    }
    var h = 3 * a, l = 3 * (e - a) - h, m = 1 - h - l, k = 3 * c, n = 3 * (d - c) - k, u = 1 - k - n;
    return function(b, F) {
      var a = g(b, F);
      return((u * a + n) * a + k) * a;
    }(b, 1 / (200 * f));
  }
  function s(b, a) {
    var e = [], c = {};
    this.ms = a;
    this.times = 1;
    if (b) {
      for (var d in b) {
        b.hasOwnProperty(d) && (c[I(d)] = b[d], e.push(I(d)));
      }
      e.sort(bb);
    }
    this.anim = c;
    this.top = e[e.length - 1];
    this.percents = e;
  }
  function v(F, a, e, d, f, g) {
    e = I(e);
    var h, l, m, k, u, p, w = F.ms, s = {}, t = {}, x = {};
    if (d) {
      for (p = 0, K = G.length;p < K;p++) {
        var v = G[p];
        if (v.el.id == a.id && v.anim == F) {
          v.percent != e ? (G.splice(p, 1), m = 1) : l = v;
          a.attr(v.totalOrigin);
          break;
        }
      }
    } else {
      d = +t;
    }
    p = 0;
    for (var K = F.percents.length;p < K;p++) {
      if (F.percents[p] == e || F.percents[p] > d * F.top) {
        e = F.percents[p];
        u = F.percents[p - 1] || 0;
        w = w / F.top * (e - u);
        k = F.percents[p + 1];
        h = F.anim[e];
        break;
      } else {
        d && a.attr(F.anim[F.percents[p]]);
      }
    }
    if (h) {
      if (l) {
        l.initstatus = d, l.start = new Date - l.ms * d;
      } else {
        for (var q in h) {
          if (h.hasOwnProperty(q) && (wa.hasOwnProperty(q) || a.paper.customAttributes.hasOwnProperty(q))) {
            switch(s[q] = a.attr(q), null == s[q] && (s[q] = cb[q]), t[q] = h[q], wa[q]) {
              case P:
                x[q] = (t[q] - s[q]) / w;
                break;
              case "colour":
                s[q] = b.getRGB(s[q]);
                p = b.getRGB(t[q]);
                x[q] = {r:(p.r - s[q].r) / w, g:(p.g - s[q].g) / w, b:(p.b - s[q].b) / w};
                break;
              case "path":
                p = ha(s[q], t[q]);
                v = p[1];
                s[q] = p[0];
                x[q] = [];
                p = 0;
                for (K = s[q].length;p < K;p++) {
                  x[q][p] = [0];
                  for (var z = 1, A = s[q][p].length;z < A;z++) {
                    x[q][p][z] = (v[p][z] - s[q][p][z]) / w;
                  }
                }
                break;
              case "transform":
                p = a._;
                if (K = db(p[q], t[q])) {
                  for (s[q] = K.from, t[q] = K.to, x[q] = [], x[q].real = !0, p = 0, K = s[q].length;p < K;p++) {
                    for (x[q][p] = [s[q][p][0]], z = 1, A = s[q][p].length;z < A;z++) {
                      x[q][p][z] = (t[q][p][z] - s[q][p][z]) / w;
                    }
                  }
                } else {
                  K = a.matrix || new n, p = {_:{transform:p.transform}, getBBox:function() {
                    return a.getBBox(1);
                  }}, s[q] = [K.a, K.b, K.c, K.d, K.e, K.f], La(p, t[q]), t[q] = p._.transform, x[q] = [(p.matrix.a - K.a) / w, (p.matrix.b - K.b) / w, (p.matrix.c - K.c) / w, (p.matrix.d - K.d) / w, (p.matrix.e - K.e) / w, (p.matrix.f - K.f) / w];
                }
                break;
              case "csv":
                K = E(h[q]).split(y);
                v = E(s[q]).split(y);
                if ("clip-rect" == q) {
                  for (s[q] = v, x[q] = [], p = v.length;p--;) {
                    x[q][p] = (K[p] - s[q][p]) / w;
                  }
                }
                t[q] = K;
                break;
              default:
                for (K = [].concat(h[q]), v = [].concat(s[q]), x[q] = [], p = a.paper.customAttributes[q].length;p--;) {
                  x[q][p] = ((K[p] || 0) - (v[p] || 0)) / w;
                }
              ;
            }
          }
        }
        p = h.easing;
        q = b.easing_formulas[p];
        if (!q) {
          if ((q = E(p).match(eb)) && 5 == q.length) {
            var B = q;
            q = function(b) {
              return r(b, +B[1], +B[2], +B[3], +B[4], w);
            };
          } else {
            q = fb;
          }
        }
        p = h.start || F.start || +new Date;
        v = {anim:F, percent:e, timestamp:p, start:p + (F.del || 0), status:0, initstatus:d || 0, stop:!1, ms:w, easing:q, from:s, diff:x, to:t, el:a, callback:h.callback, prev:u, next:k, repeat:g || F.times, origin:a.attr(), totalOrigin:f};
        G.push(v);
        if (d && !l && !m && (v.stop = !0, v.start = new Date - w * d, 1 == G.length)) {
          return xa();
        }
        m && (v.start = new Date - v.ms * d);
        1 == G.length && Ma(xa);
      }
      c("raphael.anim.start." + a.id, a, F);
    }
  }
  function B(b) {
    for (var a = 0;a < G.length;a++) {
      G[a].el.paper == b && G.splice(a--, 1);
    }
  }
  b.version = "2.1.2";
  b.eve = c;
  var q, y = /[, ]+/, A = {circle:1, rect:1, path:1, ellipse:1, text:1, image:1}, D = /\{(\d+)\}/g, z = {doc:document, win:a}, J = Object.prototype.hasOwnProperty.call(z.win, "Raphael"), L = z.win.Raphael, R = function() {
    this.ca = this.customAttributes = {};
  }, w, u = "apply", p = "ontouchstart" in z.win || z.win.DocumentTouch && z.doc instanceof DocumentTouch, E = String, $ = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel".split(" "), t = {mousedown:"touchstart", mousemove:"touchmove", mouseup:"touchend"}, V = E.prototype.toLowerCase, x = Math, C = x.max, M = x.min, O = x.abs, W = x.pow, S = x.PI, P = "number", U = "array", gb = Object.prototype.toString;
  b._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i;
  var hb = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, ib = {NaN:1, Infinity:1, "-Infinity":1}, eb = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, ya = x.round, I = parseFloat, ca = parseInt, Na = E.prototype.toUpperCase, cb = 
  b._availableAttrs = {"arrow-end":"none", "arrow-start":"none", blur:0, "clip-rect":"0 0 1e9 1e9", cursor:"default", cx:0, cy:0, fill:"#fff", "fill-opacity":1, font:'10px "Arial"', "font-family":'"Arial"', "font-size":"10", "font-style":"normal", "font-weight":400, gradient:0, height:0, href:"http://raphaeljs.com/", "letter-spacing":0, opacity:1, path:"M0,0", r:0, rx:0, ry:0, src:"", stroke:"#000", "stroke-dasharray":"", "stroke-linecap":"butt", "stroke-linejoin":"butt", "stroke-miterlimit":0, "stroke-opacity":1, 
  "stroke-width":1, target:"_blank", "text-anchor":"middle", title:"Raphael", transform:"", width:0, x:0, y:0}, wa = b._availableAnimAttrs = {blur:P, "clip-rect":"csv", cx:P, cy:P, fill:"colour", "fill-opacity":P, "font-size":P, height:P, opacity:P, path:"path", r:P, rx:P, ry:P, stroke:"colour", "stroke-opacity":P, "stroke-width":P, transform:"transform", width:P, x:P, y:P}, za = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, 
  jb = {hs:1, rg:1}, kb = /,?([achlmqrstvxz]),?/gi, lb = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, 
  mb = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, Oa = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig;
  b._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/;
  var ea = {}, bb = function(b, a) {
    return I(b) - I(a);
  }, nb = function() {
  }, fb = function(b) {
    return b;
  }, la = b._rectPath = function(b, a, e, c, d) {
    return d ? [["M", b + d, a], ["l", e - 2 * d, 0], ["a", d, d, 0, 0, 1, d, d], ["l", 0, c - 2 * d], ["a", d, d, 0, 0, 1, -d, d], ["l", 2 * d - e, 0], ["a", d, d, 0, 0, 1, -d, -d], ["l", 0, 2 * d - c], ["a", d, d, 0, 0, 1, d, -d], ["z"]] : [["M", b, a], ["l", e, 0], ["l", 0, c], ["l", -e, 0], ["z"]];
  }, Pa = function(b, a, e, c) {
    null == c && (c = e);
    return[["M", b, a], ["m", 0, -c], ["a", e, c, 0, 1, 1, 0, 2 * c], ["a", e, c, 0, 1, 1, 0, -2 * c], ["z"]];
  }, ma = b._getPath = {path:function(b) {
    return b.attr("path");
  }, circle:function(b) {
    b = b.attrs;
    return Pa(b.cx, b.cy, b.r);
  }, ellipse:function(b) {
    b = b.attrs;
    return Pa(b.cx, b.cy, b.rx, b.ry);
  }, rect:function(b) {
    b = b.attrs;
    return la(b.x, b.y, b.width, b.height, b.r);
  }, image:function(b) {
    b = b.attrs;
    return la(b.x, b.y, b.width, b.height);
  }, text:function(b) {
    b = b._getBBox();
    return la(b.x, b.y, b.width, b.height);
  }, set:function(b) {
    b = b._getBBox();
    return la(b.x, b.y, b.width, b.height);
  }}, Aa = b.mapPath = function(b, a) {
    if (!a) {
      return b;
    }
    var e, c, d, f, g, h, l;
    b = ha(b);
    d = 0;
    for (g = b.length;d < g;d++) {
      for (l = b[d], f = 1, h = l.length;f < h;f += 2) {
        e = a.x(l[f], l[f + 1]), c = a.y(l[f], l[f + 1]), l[f] = e, l[f + 1] = c;
      }
    }
    return b;
  };
  b._g = z;
  b.type = z.win.SVGAngle || z.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
  if ("VML" == b.type) {
    var Ba = z.doc.createElement("div"), na;
    Ba.innerHTML = '<v:shape adj="1"/>';
    na = Ba.firstChild;
    na.style.behavior = "url(#default#VML)";
    if (!na || "object" != typeof na.adj) {
      return b.type = "";
    }
    Ba = null;
  }
  b.svg = !(b.vml = "VML" == b.type);
  b._Paper = R;
  b.fn = w = R.prototype = b.prototype;
  b._id = 0;
  b._oid = 0;
  b.is = function(b, a) {
    a = V.call(a);
    return "finite" == a ? !ib.hasOwnProperty(+b) : "array" == a ? b instanceof Array : "null" == a && null === b || a == typeof b && null !== b || "object" == a && b === Object(b) || "array" == a && Array.isArray && Array.isArray(b) || gb.call(b).slice(8, -1).toLowerCase() == a;
  };
  b.angle = function(a, e, c, d, f, g) {
    return null == f ? (a -= c, e -= d, a || e ? (180 * x.atan2(-e, -a) / S + 540) % 360 : 0) : b.angle(a, e, f, g) - b.angle(c, d, f, g);
  };
  b.rad = function(b) {
    return b % 360 * S / 180;
  };
  b.deg = function(b) {
    return 180 * b / S % 360;
  };
  b.snapTo = function(a, e, c) {
    c = b.is(c, "finite") ? c : 10;
    if (b.is(a, U)) {
      for (var d = a.length;d--;) {
        if (O(a[d] - e) <= c) {
          return a[d];
        }
      }
    } else {
      a = +a;
      d = e % a;
      if (d < c) {
        return e - d;
      }
      if (d > a - c) {
        return e - d + a;
      }
    }
    return e;
  };
  b.createUUID = function(b, a) {
    return function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(b, a).toUpperCase();
    };
  }(/[xy]/g, function(b) {
    var a = 16 * x.random() | 0;
    return("x" == b ? a : a & 3 | 8).toString(16);
  });
  b.setWindow = function(a) {
    c("raphael.setWindow", b, z.win, a);
    z.win = a;
    z.doc = z.win.document;
    b._engine.initWin && b._engine.initWin(z.win);
  };
  var oa = function(a) {
    if (b.vml) {
      var e = /^\s+|\s+$/g, c;
      try {
        var d = new ActiveXObject("htmlfile");
        d.write("<body>");
        d.close();
        c = d.body;
      } catch (f) {
        c = createPopup().document.body;
      }
      var g = c.createTextRange();
      oa = k(function(b) {
        try {
          c.style.color = E(b).replace(e, "");
          var a = g.queryCommandValue("ForeColor");
          return "#" + ("000000" + ((a & 255) << 16 | a & 65280 | (a & 16711680) >>> 16).toString(16)).slice(-6);
        } catch (F) {
          return "none";
        }
      });
    } else {
      var h = z.doc.createElement("i");
      h.title = "Rapha\u00ebl Colour Picker";
      h.style.display = "none";
      z.doc.body.appendChild(h);
      oa = k(function(b) {
        h.style.color = b;
        return z.doc.defaultView.getComputedStyle(h, "").getPropertyValue("color");
      });
    }
    return oa(a);
  }, ob = function() {
    return "hsb(" + [this.h, this.s, this.b] + ")";
  }, pb = function() {
    return "hsl(" + [this.h, this.s, this.l] + ")";
  }, Qa = function() {
    return this.hex;
  }, Ra = function(a, e, c) {
    null == e && b.is(a, "object") && "r" in a && "g" in a && "b" in a && (c = a.b, e = a.g, a = a.r);
    null == e && b.is(a, "string") && (c = b.getRGB(a), a = c.r, e = c.g, c = c.b);
    if (1 < a || 1 < e || 1 < c) {
      a /= 255, e /= 255, c /= 255;
    }
    return[a, e, c];
  }, Sa = function(a, e, c, d) {
    a *= 255;
    e *= 255;
    c *= 255;
    a = {r:a, g:e, b:c, hex:b.rgb(a, e, c), toString:Qa};
    b.is(d, "finite") && (a.opacity = d);
    return a;
  };
  b.color = function(a) {
    var e;
    b.is(a, "object") && "h" in a && "s" in a && "b" in a ? (e = b.hsb2rgb(a), a.r = e.r, a.g = e.g, a.b = e.b, a.hex = e.hex) : b.is(a, "object") && "h" in a && "s" in a && "l" in a ? (e = b.hsl2rgb(a), a.r = e.r, a.g = e.g, a.b = e.b, a.hex = e.hex) : (b.is(a, "string") && (a = b.getRGB(a)), b.is(a, "object") && "r" in a && "g" in a && "b" in a ? (e = b.rgb2hsl(a), a.h = e.h, a.s = e.s, a.l = e.l, e = b.rgb2hsb(a), a.v = e.b) : (a = {hex:"none"}, a.r = a.g = a.b = a.h = a.s = a.v = a.l = -1));
    a.toString = Qa;
    return a;
  };
  b.hsb2rgb = function(b, a, e, c) {
    this.is(b, "object") && "h" in b && "s" in b && "b" in b && (e = b.b, a = b.s, b = b.h, c = b.o);
    var d, f, g;
    b = 360 * b % 360 / 60;
    g = e * a;
    a = g * (1 - O(b % 2 - 1));
    e = d = f = e - g;
    b = ~~b;
    e += [g, a, 0, 0, a, g][b];
    d += [a, g, g, a, 0, 0][b];
    f += [0, 0, a, g, g, a][b];
    return Sa(e, d, f, c);
  };
  b.hsl2rgb = function(b, a, e, c) {
    this.is(b, "object") && "h" in b && "s" in b && "l" in b && (e = b.l, a = b.s, b = b.h);
    if (1 < b || 1 < a || 1 < e) {
      b /= 360, a /= 100, e /= 100;
    }
    var d, f, g;
    b = 360 * b % 360 / 60;
    g = 2 * a * (.5 > e ? e : 1 - e);
    a = g * (1 - O(b % 2 - 1));
    e = d = f = e - g / 2;
    b = ~~b;
    e += [g, a, 0, 0, a, g][b];
    d += [a, g, g, a, 0, 0][b];
    f += [0, 0, a, g, g, a][b];
    return Sa(e, d, f, c);
  };
  b.rgb2hsb = function(b, a, e) {
    e = Ra(b, a, e);
    b = e[0];
    a = e[1];
    e = e[2];
    var c, d;
    c = C(b, a, e);
    d = c - M(b, a, e);
    b = ((0 == d ? 0 : c == b ? (a - e) / d : c == a ? (e - b) / d + 2 : (b - a) / d + 4) + 360) % 6 * 60 / 360;
    return{h:b, s:0 == d ? 0 : d / c, b:c, toString:ob};
  };
  b.rgb2hsl = function(b, a, e) {
    e = Ra(b, a, e);
    b = e[0];
    a = e[1];
    e = e[2];
    var c, d, f;
    c = C(b, a, e);
    d = M(b, a, e);
    f = c - d;
    b = ((0 == f ? 0 : c == b ? (a - e) / f : c == a ? (e - b) / f + 2 : (b - a) / f + 4) + 360) % 6 * 60 / 360;
    c = (c + d) / 2;
    return{h:b, s:0 == f ? 0 : .5 > c ? f / (2 * c) : f / (2 - 2 * c), l:c, toString:pb};
  };
  b._path2string = function() {
    return this.join(",").replace(kb, "$1");
  };
  b._preload = function(b, a) {
    var e = z.doc.createElement("img");
    e.style.cssText = "position:absolute;left:-9999em;top:-9999em";
    e.onload = function() {
      a.call(this);
      this.onload = null;
      z.doc.body.removeChild(this);
    };
    e.onerror = function() {
      z.doc.body.removeChild(this);
    };
    z.doc.body.appendChild(e);
    e.src = b;
  };
  b.getRGB = k(function(a) {
    if (!a || (a = E(a)).indexOf("-") + 1) {
      return{r:-1, g:-1, b:-1, hex:"none", error:1, toString:g};
    }
    if ("none" == a) {
      return{r:-1, g:-1, b:-1, hex:"none", toString:g};
    }
    !jb.hasOwnProperty(a.toLowerCase().substring(0, 2)) && "#" != a.charAt() && (a = oa(a));
    var e, c, d, f, h;
    if (a = a.match(hb)) {
      a[2] && (d = ca(a[2].substring(5), 16), c = ca(a[2].substring(3, 5), 16), e = ca(a[2].substring(1, 3), 16));
      a[3] && (d = ca((h = a[3].charAt(3)) + h, 16), c = ca((h = a[3].charAt(2)) + h, 16), e = ca((h = a[3].charAt(1)) + h, 16));
      a[4] && (h = a[4].split(za), e = I(h[0]), "%" == h[0].slice(-1) && (e *= 2.55), c = I(h[1]), "%" == h[1].slice(-1) && (c *= 2.55), d = I(h[2]), "%" == h[2].slice(-1) && (d *= 2.55), "rgba" == a[1].toLowerCase().slice(0, 4) && (f = I(h[3])), h[3] && "%" == h[3].slice(-1) && (f /= 100));
      if (a[5]) {
        return h = a[5].split(za), e = I(h[0]), "%" == h[0].slice(-1) && (e *= 2.55), c = I(h[1]), "%" == h[1].slice(-1) && (c *= 2.55), d = I(h[2]), "%" == h[2].slice(-1) && (d *= 2.55), "deg" != h[0].slice(-3) && "\u00b0" != h[0].slice(-1) || (e /= 360), "hsba" == a[1].toLowerCase().slice(0, 4) && (f = I(h[3])), h[3] && "%" == h[3].slice(-1) && (f /= 100), b.hsb2rgb(e, c, d, f);
      }
      if (a[6]) {
        return h = a[6].split(za), e = I(h[0]), "%" == h[0].slice(-1) && (e *= 2.55), c = I(h[1]), "%" == h[1].slice(-1) && (c *= 2.55), d = I(h[2]), "%" == h[2].slice(-1) && (d *= 2.55), "deg" != h[0].slice(-3) && "\u00b0" != h[0].slice(-1) || (e /= 360), "hsla" == a[1].toLowerCase().slice(0, 4) && (f = I(h[3])), h[3] && "%" == h[3].slice(-1) && (f /= 100), b.hsl2rgb(e, c, d, f);
      }
      a = {r:e, g:c, b:d, toString:g};
      a.hex = "#" + (16777216 | d | c << 8 | e << 16).toString(16).slice(1);
      b.is(f, "finite") && (a.opacity = f);
      return a;
    }
    return{r:-1, g:-1, b:-1, hex:"none", error:1, toString:g};
  }, b);
  b.hsb = k(function(a, e, c) {
    return b.hsb2rgb(a, e, c).hex;
  });
  b.hsl = k(function(a, e, c) {
    return b.hsl2rgb(a, e, c).hex;
  });
  b.rgb = k(function(b, a, e) {
    return "#" + (16777216 | e | a << 8 | b << 16).toString(16).slice(1);
  });
  b.getColor = function(b) {
    b = this.getColor.start = this.getColor.start || {h:0, s:1, b:b || .75};
    var a = this.hsb2rgb(b.h, b.s, b.b);
    b.h += .075;
    1 < b.h && (b.h = 0, b.s -= .2, 0 >= b.s && (this.getColor.start = {h:0, s:1, b:b.b}));
    return a.hex;
  };
  b.getColor.reset = function() {
    delete this.start;
  };
  b.parsePathString = function(a) {
    if (!a) {
      return null;
    }
    var e = da(a);
    if (e.arr) {
      return aa(e.arr);
    }
    var c = {a:7, c:6, h:1, l:2, m:2, r:4, q:4, s:4, t:2, v:1, z:0}, d = [];
    b.is(a, U) && b.is(a[0], U) && (d = aa(a));
    d.length || E(a).replace(lb, function(b, a, e) {
      var F = [];
      b = a.toLowerCase();
      e.replace(Oa, function(b, a) {
        a && F.push(+a);
      });
      "m" == b && 2 < F.length && (d.push([a].concat(F.splice(0, 2))), b = "l", a = "m" == a ? "l" : "L");
      if ("r" == b) {
        d.push([a].concat(F));
      } else {
        for (;F.length >= c[b] && (d.push([a].concat(F.splice(0, c[b]))), c[b]);) {
        }
      }
    });
    d.toString = b._path2string;
    e.arr = aa(d);
    return d;
  };
  b.parseTransformString = k(function(a) {
    if (!a) {
      return null;
    }
    var e = [];
    b.is(a, U) && b.is(a[0], U) && (e = aa(a));
    e.length || E(a).replace(mb, function(b, a, c) {
      var d = [];
      V.call(a);
      c.replace(Oa, function(b, a) {
        a && d.push(+a);
      });
      e.push([a].concat(d));
    });
    e.toString = b._path2string;
    return e;
  });
  var da = function(b) {
    var a = da.ps = da.ps || {};
    a[b] ? a[b].sleep = 100 : a[b] = {sleep:100};
    setTimeout(function() {
      for (var e in a) {
        a.hasOwnProperty(e) && e != b && (a[e].sleep--, !a[e].sleep && delete a[e]);
      }
    });
    return a[b];
  };
  b.findDotsAtSegment = function(b, a, e, c, d, f, h, g, l) {
    var m = 1 - l, k = W(m, 3), n = W(m, 2), p = l * l, u = p * l, w = k * b + 3 * n * l * e + 3 * m * l * l * d + u * h, k = k * a + 3 * n * l * c + 3 * m * l * l * f + u * g, n = b + 2 * l * (e - b) + p * (d - 2 * e + b), u = a + 2 * l * (c - a) + p * (f - 2 * c + a), s = e + 2 * l * (d - e) + p * (h - 2 * d + e), p = c + 2 * l * (f - c) + p * (g - 2 * f + c);
    b = m * b + l * e;
    a = m * a + l * c;
    d = m * d + l * h;
    f = m * f + l * g;
    g = 90 - 180 * x.atan2(n - s, u - p) / S;
    (n > s || u < p) && (g += 180);
    return{x:w, y:k, m:{x:n, y:u}, n:{x:s, y:p}, start:{x:b, y:a}, end:{x:d, y:f}, alpha:g};
  };
  b.bezierBBox = function(a, e, c, d, f, h, g, l) {
    b.is(a, "array") || (a = [a, e, c, d, f, h, g, l]);
    a = Ta.apply(null, a);
    return{x:a.min.x, y:a.min.y, x2:a.max.x, y2:a.max.y, width:a.max.x - a.min.x, height:a.max.y - a.min.y};
  };
  b.isPointInsideBBox = function(b, a, e) {
    return a >= b.x && a <= b.x2 && e >= b.y && e <= b.y2;
  };
  b.isBBoxIntersect = function(a, e) {
    var c = b.isPointInsideBBox;
    return c(e, a.x, a.y) || c(e, a.x2, a.y) || c(e, a.x, a.y2) || c(e, a.x2, a.y2) || c(a, e.x, e.y) || c(a, e.x2, e.y) || c(a, e.x, e.y2) || c(a, e.x2, e.y2) || (a.x < e.x2 && a.x > e.x || e.x < a.x2 && e.x > a.x) && (a.y < e.y2 && a.y > e.y || e.y < a.y2 && e.y > a.y);
  };
  b.pathIntersection = function(b, a) {
    return l(b, a);
  };
  b.pathIntersectionNumber = function(b, a) {
    return l(b, a, 1);
  };
  b.isPointInsidePath = function(a, e, c) {
    var d = b.pathBBox(a);
    return b.isPointInsideBBox(d, e, c) && 1 == l(a, [["M", e, c], ["H", d.x2 + 10]], 1) % 2;
  };
  b._removedFactory = function(b) {
    return function() {
      c("raphael.log", null, "Rapha\u00ebl: you are calling to method \u201c" + b + "\u201d of removed object", b);
    };
  };
  var Ca = b.pathBBox = function(b) {
    var a = da(b);
    if (a.bbox) {
      return d(a.bbox);
    }
    if (!b) {
      return{x:0, y:0, width:0, height:0, x2:0, y2:0};
    }
    b = ha(b);
    for (var e = 0, c = 0, f = [], h = [], g, l = 0, m = b.length;l < m;l++) {
      g = b[l], "M" == g[0] ? (e = g[1], c = g[2], f.push(e), h.push(c)) : (e = Ta(e, c, g[1], g[2], g[3], g[4], g[5], g[6]), f = f.concat(e.min.x, e.max.x), h = h.concat(e.min.y, e.max.y), e = g[5], c = g[6]);
    }
    b = M[u](0, f);
    g = M[u](0, h);
    f = C[u](0, f);
    h = C[u](0, h);
    l = f - b;
    m = h - g;
    h = {x:b, y:g, x2:f, y2:h, width:l, height:m, cx:b + l / 2, cy:g + m / 2};
    a.bbox = d(h);
    return h;
  }, aa = function(a) {
    a = d(a);
    a.toString = b._path2string;
    return a;
  }, qb = b._pathToRelative = function(a) {
    var e = da(a);
    if (e.rel) {
      return aa(e.rel);
    }
    b.is(a, U) && b.is(a && a[0], U) || (a = b.parsePathString(a));
    var c = [], d = 0, f = 0, h = 0, g = 0, l = 0;
    "M" == a[0][0] && (d = a[0][1], f = a[0][2], h = d, g = f, l++, c.push(["M", d, f]));
    for (var m = a.length;l < m;l++) {
      var k = c[l] = [], n = a[l];
      if (n[0] != V.call(n[0])) {
        switch(k[0] = V.call(n[0]), k[0]) {
          case "a":
            k[1] = n[1];
            k[2] = n[2];
            k[3] = n[3];
            k[4] = n[4];
            k[5] = n[5];
            k[6] = +(n[6] - d).toFixed(3);
            k[7] = +(n[7] - f).toFixed(3);
            break;
          case "v":
            k[1] = +(n[1] - f).toFixed(3);
            break;
          case "m":
            h = n[1], g = n[2];
          default:
            for (var p = 1, u = n.length;p < u;p++) {
              k[p] = +(n[p] - (p % 2 ? d : f)).toFixed(3);
            }
          ;
        }
      } else {
        for (c[l] = [], "m" == n[0] && (h = n[1] + d, g = n[2] + f), k = 0, p = n.length;k < p;k++) {
          c[l][k] = n[k];
        }
      }
      n = c[l].length;
      switch(c[l][0]) {
        case "z":
          d = h;
          f = g;
          break;
        case "h":
          d += +c[l][n - 1];
          break;
        case "v":
          f += +c[l][n - 1];
          break;
        default:
          d += +c[l][n - 2], f += +c[l][n - 1];
      }
    }
    c.toString = b._path2string;
    e.rel = aa(c);
    return c;
  }, Ua = b._pathToAbsolute = function(a) {
    var c = da(a);
    if (c.abs) {
      return aa(c.abs);
    }
    b.is(a, U) && b.is(a && a[0], U) || (a = b.parsePathString(a));
    if (!a || !a.length) {
      return[["M", 0, 0]];
    }
    var d = [], f = 0, h = 0, g = 0, l = 0, n = 0;
    "M" == a[0][0] && (f = +a[0][1], h = +a[0][2], g = f, l = h, n++, d[0] = ["M", f, h]);
    for (var m = 3 == a.length && "M" == a[0][0] && "R" == a[1][0].toUpperCase() && "Z" == a[2][0].toUpperCase(), k, p = n, u = a.length;p < u;p++) {
      d.push(n = []);
      k = a[p];
      if (k[0] != Na.call(k[0])) {
        switch(n[0] = Na.call(k[0]), n[0]) {
          case "A":
            n[1] = k[1];
            n[2] = k[2];
            n[3] = k[3];
            n[4] = k[4];
            n[5] = k[5];
            n[6] = +(k[6] + f);
            n[7] = +(k[7] + h);
            break;
          case "V":
            n[1] = +k[1] + h;
            break;
          case "H":
            n[1] = +k[1] + f;
            break;
          case "R":
            for (var w = [f, h].concat(k.slice(1)), s = 2, r = w.length;s < r;s++) {
              w[s] = +w[s] + f, w[++s] = +w[s] + h;
            }
            d.pop();
            d = d.concat(e(w, m));
            break;
          case "M":
            g = +k[1] + f, l = +k[2] + h;
          default:
            for (s = 1, r = k.length;s < r;s++) {
              n[s] = +k[s] + (s % 2 ? f : h);
            }
          ;
        }
      } else {
        if ("R" == k[0]) {
          w = [f, h].concat(k.slice(1)), d.pop(), d = d.concat(e(w, m)), n = ["R"].concat(k.slice(-2));
        } else {
          for (w = 0, s = k.length;w < s;w++) {
            n[w] = k[w];
          }
        }
      }
      switch(n[0]) {
        case "Z":
          f = g;
          h = l;
          break;
        case "H":
          f = n[1];
          break;
        case "V":
          h = n[1];
          break;
        case "M":
          g = n[n.length - 2], l = n[n.length - 1];
        default:
          f = n[n.length - 2], h = n[n.length - 1];
      }
    }
    d.toString = b._path2string;
    c.abs = aa(d);
    return d;
  }, pa = function(b, a, e, c) {
    return[b, a, e, c, e, c];
  }, Va = function(b, a, e, c, d, f) {
    var h = 1 / 3, g = 2 / 3;
    return[h * b + g * e, h * a + g * c, h * d + g * e, h * f + g * c, d, f];
  }, Wa = function(b, a, e, c, d, f, h, g, l, n) {
    var m = 120 * S / 180, p = S / 180 * (+d || 0), u = [], w, s = k(function(b, a, e) {
      var c = b * x.cos(e) - a * x.sin(e);
      b = b * x.sin(e) + a * x.cos(e);
      return{x:c, y:b};
    });
    if (n) {
      q = n[0], w = n[1], f = n[2], r = n[3];
    } else {
      w = s(b, a, -p);
      b = w.x;
      a = w.y;
      w = s(g, l, -p);
      g = w.x;
      l = w.y;
      x.cos(S / 180 * d);
      x.sin(S / 180 * d);
      w = (b - g) / 2;
      q = (a - l) / 2;
      r = w * w / (e * e) + q * q / (c * c);
      1 < r && (r = x.sqrt(r), e *= r, c *= r);
      var r = e * e, t = c * c, r = (f == h ? -1 : 1) * x.sqrt(O((r * t - r * q * q - t * w * w) / (r * q * q + t * w * w)));
      f = r * e * q / c + (b + g) / 2;
      var r = r * -c * w / e + (a + l) / 2, q = x.asin(((a - r) / c).toFixed(9));
      w = x.asin(((l - r) / c).toFixed(9));
      q = b < f ? S - q : q;
      w = g < f ? S - w : w;
      0 > q && (q = 2 * S + q);
      0 > w && (w = 2 * S + w);
      h && q > w && (q -= 2 * S);
      !h && w > q && (w -= 2 * S);
    }
    if (O(w - q) > m) {
      var u = w, t = g, y = l;
      w = q + m * (h && w > q ? 1 : -1);
      g = f + e * x.cos(w);
      l = r + c * x.sin(w);
      u = Wa(g, l, e, c, d, 0, h, t, y, [w, u, f, r]);
    }
    f = w - q;
    d = x.cos(q);
    m = x.sin(q);
    h = x.cos(w);
    w = x.sin(w);
    f = x.tan(f / 4);
    e = 4 / 3 * e * f;
    f *= 4 / 3 * c;
    c = [b, a];
    b = [b + e * m, a - f * d];
    a = [g + e * w, l - f * h];
    g = [g, l];
    b[0] = 2 * c[0] - b[0];
    b[1] = 2 * c[1] - b[1];
    if (n) {
      return[b, a, g].concat(u);
    }
    u = [b, a, g].concat(u).join().split(",");
    n = [];
    g = 0;
    for (l = u.length;g < l;g++) {
      n[g] = g % 2 ? s(u[g - 1], u[g], p).y : s(u[g], u[g + 1], p).x;
    }
    return n;
  }, qa = function(b, a, e, c, d, f, h, g, l) {
    var n = 1 - l;
    return{x:W(n, 3) * b + 3 * W(n, 2) * l * e + 3 * n * l * l * d + W(l, 3) * h, y:W(n, 3) * a + 3 * W(n, 2) * l * c + 3 * n * l * l * f + W(l, 3) * g};
  }, Ta = k(function(b, a, e, c, d, f, h, g) {
    var l = d - 2 * e + b - (h - 2 * d + e), n = 2 * (e - b) - 2 * (d - e), k = b - e, m = (-n + x.sqrt(n * n - 4 * l * k)) / 2 / l, l = (-n - x.sqrt(n * n - 4 * l * k)) / 2 / l, p = [a, g], w = [b, h];
    "1e12" < O(m) && (m = .5);
    "1e12" < O(l) && (l = .5);
    0 < m && 1 > m && (m = qa(b, a, e, c, d, f, h, g, m), w.push(m.x), p.push(m.y));
    0 < l && 1 > l && (m = qa(b, a, e, c, d, f, h, g, l), w.push(m.x), p.push(m.y));
    l = f - 2 * c + a - (g - 2 * f + c);
    n = 2 * (c - a) - 2 * (f - c);
    k = a - c;
    m = (-n + x.sqrt(n * n - 4 * l * k)) / 2 / l;
    l = (-n - x.sqrt(n * n - 4 * l * k)) / 2 / l;
    "1e12" < O(m) && (m = .5);
    "1e12" < O(l) && (l = .5);
    0 < m && 1 > m && (m = qa(b, a, e, c, d, f, h, g, m), w.push(m.x), p.push(m.y));
    0 < l && 1 > l && (m = qa(b, a, e, c, d, f, h, g, l), w.push(m.x), p.push(m.y));
    return{min:{x:M[u](0, w), y:M[u](0, p)}, max:{x:C[u](0, w), y:C[u](0, p)}};
  }), ha = b._path2curve = k(function(b, a) {
    var e = !a && da(b);
    if (!a && e.curve) {
      return aa(e.curve);
    }
    var c = Ua(b), d = a && Ua(a), f = {x:0, y:0, bx:0, by:0, X:0, Y:0, qx:null, qy:null}, h = {x:0, y:0, bx:0, by:0, X:0, Y:0, qx:null, qy:null}, g = function(b, a, e) {
      if (!b) {
        return["C", a.x, a.y, a.x, a.y, a.x, a.y];
      }
      b[0] in {T:1, Q:1} || (a.qx = a.qy = null);
      switch(b[0]) {
        case "M":
          a.X = b[1];
          a.Y = b[2];
          break;
        case "A":
          b = ["C"].concat(Wa[u](0, [a.x, a.y].concat(b.slice(1))));
          break;
        case "S":
          "C" == e || "S" == e ? (e = 2 * a.x - a.bx, a = 2 * a.y - a.by) : (e = a.x, a = a.y);
          b = ["C", e, a].concat(b.slice(1));
          break;
        case "T":
          "Q" == e || "T" == e ? (a.qx = 2 * a.x - a.qx, a.qy = 2 * a.y - a.qy) : (a.qx = a.x, a.qy = a.y);
          b = ["C"].concat(Va(a.x, a.y, a.qx, a.qy, b[1], b[2]));
          break;
        case "Q":
          a.qx = b[1];
          a.qy = b[2];
          b = ["C"].concat(Va(a.x, a.y, b[1], b[2], b[3], b[4]));
          break;
        case "L":
          b = ["C"].concat(pa(a.x, a.y, b[1], b[2]));
          break;
        case "H":
          b = ["C"].concat(pa(a.x, a.y, b[1], a.y));
          break;
        case "V":
          b = ["C"].concat(pa(a.x, a.y, a.x, b[1]));
          break;
        case "Z":
          b = ["C"].concat(pa(a.x, a.y, a.X, a.Y));
      }
      return b;
    }, l = function(a, b) {
      if (7 < a[b].length) {
        a[b].shift();
        for (var e = a[b];e.length;) {
          a.splice(b++, 0, ["C"].concat(e.splice(0, 6)));
        }
        a.splice(b, 1);
        k = C(c.length, d && d.length || 0);
      }
    }, n = function(a, b, e, f, h) {
      a && b && "M" == a[h][0] && "M" != b[h][0] && (b.splice(h, 0, ["M", f.x, f.y]), e.bx = 0, e.by = 0, e.x = a[h][1], e.y = a[h][2], k = C(c.length, d && d.length || 0));
    }, m = 0, k = C(c.length, d && d.length || 0);
    for (;m < k;m++) {
      c[m] = g(c[m], f);
      l(c, m);
      d && (d[m] = g(d[m], h));
      d && l(d, m);
      n(c, d, f, h, m);
      n(d, c, h, f, m);
      var p = c[m], w = d && d[m], s = p.length, r = d && w.length;
      f.x = p[s - 2];
      f.y = p[s - 1];
      f.bx = I(p[s - 4]) || f.x;
      f.by = I(p[s - 3]) || f.y;
      h.bx = d && (I(w[r - 4]) || h.x);
      h.by = d && (I(w[r - 3]) || h.y);
      h.x = d && w[r - 2];
      h.y = d && w[r - 1];
    }
    d || (e.curve = aa(c));
    return d ? [c, d] : c;
  }, null, aa);
  b._parseDots = k(function(a) {
    for (var e = [], c = 0, d = a.length;c < d;c++) {
      var f = {}, h = a[c].match(/^([^:]*):?([\d\.]*)/);
      f.color = b.getRGB(h[1]);
      if (f.color.error) {
        return null;
      }
      f.color = f.color.hex;
      h[2] && (f.offset = h[2] + "%");
      e.push(f);
    }
    c = 1;
    for (d = e.length - 1;c < d;c++) {
      if (!e[c].offset) {
        a = I(e[c - 1].offset || 0);
        h = 0;
        for (f = c + 1;f < d;f++) {
          if (e[f].offset) {
            h = e[f].offset;
            break;
          }
        }
        h || (h = 100, f = d);
        h = I(h);
        for (h = (h - a) / (f - c + 1);c < f;c++) {
          a += h, e[c].offset = a + "%";
        }
      }
    }
    return e;
  });
  var ra = b._tear = function(a, b) {
    a == b.top && (b.top = a.prev);
    a == b.bottom && (b.bottom = a.next);
    a.next && (a.next.prev = a.prev);
    a.prev && (a.prev.next = a.next);
  };
  b._tofront = function(a, b) {
    b.top !== a && (ra(a, b), a.next = null, a.prev = b.top, b.top.next = a, b.top = a);
  };
  b._toback = function(a, b) {
    b.bottom !== a && (ra(a, b), a.next = b.bottom, a.prev = null, b.bottom.prev = a, b.bottom = a);
  };
  b._insertafter = function(a, b, e) {
    ra(a, e);
    b == e.top && (e.top = a);
    b.next && (b.next.prev = a);
    a.next = b.next;
    a.prev = b;
    b.next = a;
  };
  b._insertbefore = function(a, b, e) {
    ra(a, e);
    b == e.bottom && (e.bottom = a);
    b.prev && (b.prev.next = a);
    a.prev = b.prev;
    b.prev = a;
    a.next = b;
  };
  var rb = b.toMatrix = function(a, b) {
    var e = Ca(a), c = {_:{transform:""}, getBBox:function() {
      return e;
    }};
    La(c, b);
    return c.matrix;
  };
  b.transformPath = function(a, b) {
    return Aa(a, rb(a, b));
  };
  var La = b._extractTransform = function(a, e) {
    if (null == e) {
      return a._.transform;
    }
    e = E(e).replace(/\.{3}|\u2026/g, a._.transform || "");
    var c = b.parseTransformString(e), d = 0, f = 0, h = 0, g = 1, l = 1, m = a._, h = new n;
    m.transform = c || [];
    if (c) {
      for (var f = 0, k = c.length;f < k;f++) {
        var p = c[f], u = p.length, w = E(p[0]).toLowerCase(), s = p[0] != w, r = s ? h.invert() : 0, q;
        "t" == w && 3 == u ? s ? (u = r.x(0, 0), w = r.y(0, 0), s = r.x(p[1], p[2]), r = r.y(p[1], p[2]), h.translate(s - u, r - w)) : h.translate(p[1], p[2]) : "r" == w ? 2 == u ? (q = q || a.getBBox(1), h.rotate(p[1], q.x + q.width / 2, q.y + q.height / 2), d += p[1]) : 4 == u && (s ? (s = r.x(p[2], p[3]), r = r.y(p[2], p[3]), h.rotate(p[1], s, r)) : h.rotate(p[1], p[2], p[3]), d += p[1]) : "s" == w ? 2 == u || 3 == u ? (q = q || a.getBBox(1), h.scale(p[1], p[u - 1], q.x + q.width / 2, q.y + q.height / 
        2), g *= p[1], l *= p[u - 1]) : 5 == u && (s ? (s = r.x(p[3], p[4]), r = r.y(p[3], p[4]), h.scale(p[1], p[2], s, r)) : h.scale(p[1], p[2], p[3], p[4]), g *= p[1], l *= p[2]) : "m" == w && 7 == u && h.add(p[1], p[2], p[3], p[4], p[5], p[6]);
        m.dirtyT = 1;
        a.matrix = h;
      }
    }
    a.matrix = h;
    m.sx = g;
    m.sy = l;
    m.deg = d;
    m.dx = f = h.e;
    m.dy = h = h.f;
    1 == g && 1 == l && !d && m.bbox ? (m.bbox.x += +f, m.bbox.y += +h) : m.dirtyT = 1;
  }, Xa = function(a) {
    var b = a[0];
    switch(b.toLowerCase()) {
      case "t":
        return[b, 0, 0];
      case "m":
        return[b, 1, 0, 0, 1, 0, 0];
      case "r":
        return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0];
      case "s":
        return 5 == a.length ? [b, 1, 1, a[3], a[4]] : 3 == a.length ? [b, 1, 1] : [b, 1];
    }
  }, db = b._equaliseTransform = function(a, e) {
    e = E(e).replace(/\.{3}|\u2026/g, a);
    a = b.parseTransformString(a) || [];
    e = b.parseTransformString(e) || [];
    for (var c = C(a.length, e.length), d = [], f = [], h = 0, g, l, n, m;h < c;h++) {
      n = a[h] || Xa(e[h]);
      m = e[h] || Xa(n);
      if (n[0] != m[0] || "r" == n[0].toLowerCase() && (n[2] != m[2] || n[3] != m[3]) || "s" == n[0].toLowerCase() && (n[3] != m[3] || n[4] != m[4])) {
        return;
      }
      d[h] = [];
      f[h] = [];
      g = 0;
      for (l = C(n.length, m.length);g < l;g++) {
        g in n && (d[h][g] = n[g]), g in m && (f[h][g] = m[g]);
      }
    }
    return{from:d, to:f};
  };
  b._getContainer = function(a, e, c, d) {
    var f;
    f = null != d || b.is(a, "object") ? a : z.doc.getElementById(a);
    if (null != f) {
      return f.tagName ? null == e ? {container:f, width:f.style.pixelWidth || f.offsetWidth, height:f.style.pixelHeight || f.offsetHeight} : {container:f, width:e, height:c} : {container:1, x:a, y:e, width:c, height:d};
    }
  };
  b.pathToRelative = qb;
  b._engine = {};
  b.path2curve = ha;
  b.matrix = function(a, b, e, c, d, f) {
    return new n(a, b, e, c, d, f);
  };
  (function(a) {
    function e(a) {
      return a[0] * a[0] + a[1] * a[1];
    }
    function c(a) {
      var b = x.sqrt(e(a));
      a[0] && (a[0] /= b);
      a[1] && (a[1] /= b);
    }
    a.add = function(a, b, e, c, d, f) {
      var h = [[], [], []], g = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]];
      b = [[a, e, d], [b, c, f], [0, 0, 1]];
      a && a instanceof n && (b = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]]);
      for (a = 0;3 > a;a++) {
        for (e = 0;3 > e;e++) {
          for (c = d = 0;3 > c;c++) {
            d += g[a][c] * b[c][e];
          }
          h[a][e] = d;
        }
      }
      this.a = h[0][0];
      this.b = h[1][0];
      this.c = h[0][1];
      this.d = h[1][1];
      this.e = h[0][2];
      this.f = h[1][2];
    };
    a.invert = function() {
      var a = this.a * this.d - this.b * this.c;
      return new n(this.d / a, -this.b / a, -this.c / a, this.a / a, (this.c * this.f - this.d * this.e) / a, (this.b * this.e - this.a * this.f) / a);
    };
    a.clone = function() {
      return new n(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    a.translate = function(a, b) {
      this.add(1, 0, 0, 1, a, b);
    };
    a.scale = function(a, b, e, c) {
      null == b && (b = a);
      (e || c) && this.add(1, 0, 0, 1, e, c);
      this.add(a, 0, 0, b, 0, 0);
      (e || c) && this.add(1, 0, 0, 1, -e, -c);
    };
    a.rotate = function(a, e, c) {
      a = b.rad(a);
      e = e || 0;
      c = c || 0;
      var d = +x.cos(a).toFixed(9);
      a = +x.sin(a).toFixed(9);
      this.add(d, a, -a, d, e, c);
      this.add(1, 0, 0, 1, -e, -c);
    };
    a.x = function(a, b) {
      return a * this.a + b * this.c + this.e;
    };
    a.y = function(a, b) {
      return a * this.b + b * this.d + this.f;
    };
    a.get = function(a) {
      return+this[E.fromCharCode(97 + a)].toFixed(4);
    };
    a.toString = function() {
      return b.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
    };
    a.toFilter = function() {
      return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
    };
    a.offset = function() {
      return[this.e.toFixed(4), this.f.toFixed(4)];
    };
    a.split = function() {
      var a = {};
      a.dx = this.e;
      a.dy = this.f;
      var d = [[this.a, this.c], [this.b, this.d]];
      a.scalex = x.sqrt(e(d[0]));
      c(d[0]);
      a.shear = d[0][0] * d[1][0] + d[0][1] * d[1][1];
      d[1] = [d[1][0] - d[0][0] * a.shear, d[1][1] - d[0][1] * a.shear];
      a.scaley = x.sqrt(e(d[1]));
      c(d[1]);
      a.shear /= a.scaley;
      var f = -d[0][1], d = d[1][1];
      0 > d ? (a.rotate = b.deg(x.acos(d)), 0 > f && (a.rotate = 360 - a.rotate)) : a.rotate = b.deg(x.asin(f));
      a.isSimple = !+a.shear.toFixed(9) && (a.scalex.toFixed(9) == a.scaley.toFixed(9) || !a.rotate);
      a.isSuperSimple = !+a.shear.toFixed(9) && a.scalex.toFixed(9) == a.scaley.toFixed(9) && !a.rotate;
      a.noRotation = !+a.shear.toFixed(9) && !a.rotate;
      return a;
    };
    a.toTransformString = function(a) {
      a = a || this.split();
      return a.isSimple ? (a.scalex = +a.scalex.toFixed(4), a.scaley = +a.scaley.toFixed(4), a.rotate = +a.rotate.toFixed(4), (a.dx || a.dy ? "t" + [a.dx, a.dy] : "") + (1 != a.scalex || 1 != a.scaley ? "s" + [a.scalex, a.scaley, 0, 0] : "") + (a.rotate ? "r" + [a.rotate, 0, 0] : "")) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
    };
  })(n.prototype);
  var sa = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
  "Apple Computer, Inc." == navigator.vendor && (sa && 4 > sa[1] || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && sa && 8 > sa[1] ? w.safari = function() {
    var a = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke:"none"});
    setTimeout(function() {
      a.remove();
    });
  } : w.safari = nb;
  for (var sb = function() {
    this.returnValue = !1;
  }, tb = function() {
    return this.originalEvent.preventDefault();
  }, ub = function() {
    this.cancelBubble = !0;
  }, vb = function() {
    return this.originalEvent.stopPropagation();
  }, Ya = function(a) {
    return{x:a.clientX + (z.doc.documentElement.scrollLeft || z.doc.body.scrollLeft), y:a.clientY + (z.doc.documentElement.scrollTop || z.doc.body.scrollTop)};
  }, wb = function() {
    if (z.doc.addEventListener) {
      return function(a, b, e, c) {
        var d = function(a) {
          var b = Ya(a);
          return e.call(c, a, b.x, b.y);
        };
        a.addEventListener(b, d, !1);
        p && t[b] && a.addEventListener(t[b], function(b) {
          for (var d = Ya(b), f = b, h = 0, g = b.targetTouches && b.targetTouches.length;h < g;h++) {
            if (b.targetTouches[h].target == a) {
              b = b.targetTouches[h];
              b.originalEvent = f;
              b.preventDefault = tb;
              b.stopPropagation = vb;
              break;
            }
          }
          return e.call(c, b, d.x, d.y);
        }, !1);
        return function() {
          a.removeEventListener(b, d, !1);
          p && t[b] && a.removeEventListener(t[b], d, !1);
          return!0;
        };
      };
    }
    if (z.doc.attachEvent) {
      return function(a, b, e, c) {
        var d = function(a) {
          a = a || z.win.event;
          var b = a.clientX + (z.doc.documentElement.scrollLeft || z.doc.body.scrollLeft), d = a.clientY + (z.doc.documentElement.scrollTop || z.doc.body.scrollTop);
          a.preventDefault = a.preventDefault || sb;
          a.stopPropagation = a.stopPropagation || ub;
          return e.call(c, a, b, d);
        };
        a.attachEvent("on" + b, d);
        return function() {
          a.detachEvent("on" + b, d);
          return!0;
        };
      };
    }
  }(), ba = [], Da = function(a) {
    for (var b = a.clientX, e = a.clientY, d = z.doc.documentElement.scrollTop || z.doc.body.scrollTop, f = z.doc.documentElement.scrollLeft || z.doc.body.scrollLeft, h, g = ba.length;g--;) {
      h = ba[g];
      if (p && a.touches) {
        for (var l = a.touches.length, n;l--;) {
          if (n = a.touches[l], n.identifier == h.el._drag.id) {
            b = n.clientX;
            e = n.clientY;
            (a.originalEvent ? a.originalEvent : a).preventDefault();
            break;
          }
        }
      } else {
        a.preventDefault();
      }
      var l = h.el.node, m = l.nextSibling, k = l.parentNode, u = l.style.display;
      z.win.opera && k.removeChild(l);
      l.style.display = "none";
      n = h.el.paper.getElementByPoint(b, e);
      l.style.display = u;
      z.win.opera && (m ? k.insertBefore(l, m) : k.appendChild(l));
      n && c("raphael.drag.over." + h.el.id, h.el, n);
      b += f;
      e += d;
      c("raphael.drag.move." + h.el.id, h.move_scope || h.el, b - h.el._drag.x, e - h.el._drag.y, b, e, a);
    }
  }, Ea = function(a) {
    b.unmousemove(Da).unmouseup(Ea);
    for (var e = ba.length, d;e--;) {
      d = ba[e], d.el._drag = {}, c("raphael.drag.end." + d.el.id, d.end_scope || d.start_scope || d.move_scope || d.el, a);
    }
    ba = [];
  }, H = b.el = {}, Za = $.length;Za--;) {
    (function(a) {
      b[a] = H[a] = function(e, c) {
        b.is(e, "function") && (this.events = this.events || [], this.events.push({name:a, f:e, unbind:wb(this.shape || this.node || z.doc, a, e, c || this)}));
        return this;
      };
      b["un" + a] = H["un" + a] = function(e) {
        for (var c = this.events || [], d = c.length;d--;) {
          c[d].name != a || !b.is(e, "undefined") && c[d].f != e || (c[d].unbind(), c.splice(d, 1), !c.length && delete this.events);
        }
        return this;
      };
    })($[Za]);
  }
  H.data = function(a, e) {
    var d = ea[this.id] = ea[this.id] || {};
    if (0 == arguments.length) {
      return d;
    }
    if (1 == arguments.length) {
      if (b.is(a, "object")) {
        for (var f in a) {
          a.hasOwnProperty(f) && this.data(f, a[f]);
        }
        return this;
      }
      c("raphael.data.get." + this.id, this, d[a], a);
      return d[a];
    }
    d[a] = e;
    c("raphael.data.set." + this.id, this, e, a);
    return this;
  };
  H.removeData = function(a) {
    null == a ? ea[this.id] = {} : ea[this.id] && delete ea[this.id][a];
    return this;
  };
  H.getData = function() {
    return d(ea[this.id] || {});
  };
  H.hover = function(a, b, e, c) {
    return this.mouseover(a, e).mouseout(b, c || e);
  };
  H.unhover = function(a, b) {
    return this.unmouseover(a).unmouseout(b);
  };
  var fa = [];
  H.drag = function(a, e, d, f, h, g) {
    function l(n) {
      (n.originalEvent || n).preventDefault();
      var m = n.clientX, k = n.clientY, u = z.doc.documentElement.scrollTop || z.doc.body.scrollTop, w = z.doc.documentElement.scrollLeft || z.doc.body.scrollLeft;
      this._drag.id = n.identifier;
      if (p && n.touches) {
        for (var s = n.touches.length, r;s--;) {
          if (r = n.touches[s], this._drag.id = r.identifier, r.identifier == this._drag.id) {
            m = r.clientX;
            k = r.clientY;
            break;
          }
        }
      }
      this._drag.x = m + w;
      this._drag.y = k + u;
      !ba.length && b.mousemove(Da).mouseup(Ea);
      ba.push({el:this, move_scope:f, start_scope:h, end_scope:g});
      e && c.on("raphael.drag.start." + this.id, e);
      a && c.on("raphael.drag.move." + this.id, a);
      d && c.on("raphael.drag.end." + this.id, d);
      c("raphael.drag.start." + this.id, h || f || this, n.clientX + w, n.clientY + u, n);
    }
    this._drag = {};
    fa.push({el:this, start:l});
    this.mousedown(l);
    return this;
  };
  H.onDragOver = function(a) {
    a ? c.on("raphael.drag.over." + this.id, a) : c.unbind("raphael.drag.over." + this.id);
  };
  H.undrag = function() {
    for (var a = fa.length;a--;) {
      fa[a].el == this && (this.unmousedown(fa[a].start), fa.splice(a, 1), c.unbind("raphael.drag.*." + this.id));
    }
    !fa.length && b.unmousemove(Da).unmouseup(Ea);
    ba = [];
  };
  w.circle = function(a, e, c) {
    a = b._engine.circle(this, a || 0, e || 0, c || 0);
    this.__set__ && this.__set__.push(a);
    return a;
  };
  w.rect = function(a, e, c, d, f) {
    a = b._engine.rect(this, a || 0, e || 0, c || 0, d || 0, f || 0);
    this.__set__ && this.__set__.push(a);
    return a;
  };
  w.ellipse = function(a, e, c, d) {
    a = b._engine.ellipse(this, a || 0, e || 0, c || 0, d || 0);
    this.__set__ && this.__set__.push(a);
    return a;
  };
  w.path = function(a) {
    a && !b.is(a, "string") && !b.is(a[0], U) && (a += "");
    var e = b._engine.path(b.format[u](b, arguments), this);
    this.__set__ && this.__set__.push(e);
    return e;
  };
  w.image = function(a, e, c, d, f) {
    a = b._engine.image(this, a || "about:blank", e || 0, c || 0, d || 0, f || 0);
    this.__set__ && this.__set__.push(a);
    return a;
  };
  w.text = function(a, e, c) {
    a = b._engine.text(this, a || 0, e || 0, E(c));
    this.__set__ && this.__set__.push(a);
    return a;
  };
  w.set = function(a) {
    !b.is(a, "array") && (a = Array.prototype.splice.call(arguments, 0, arguments.length));
    var e = new ia(a);
    this.__set__ && this.__set__.push(e);
    e.paper = this;
    e.type = "set";
    return e;
  };
  w.setStart = function(a) {
    this.__set__ = a || this.set();
  };
  w.setFinish = function(a) {
    a = this.__set__;
    delete this.__set__;
    return a;
  };
  w.setSize = function(a, e) {
    return b._engine.setSize.call(this, a, e);
  };
  w.setViewBox = function(a, e, c, d, f) {
    return b._engine.setViewBox.call(this, a, e, c, d, f);
  };
  w.top = w.bottom = null;
  w.raphael = b;
  w.getElementByPoint = function(a, b) {
    var e, c, d = this.canvas, f = z.doc.elementFromPoint(a, b);
    if (z.win.opera && "svg" == f.tagName) {
      c = d.getBoundingClientRect();
      e = d.ownerDocument;
      var h = e.body, g = e.documentElement;
      e = c.top + (z.win.pageYOffset || g.scrollTop || h.scrollTop) - (g.clientTop || h.clientTop || 0);
      c = c.left + (z.win.pageXOffset || g.scrollLeft || h.scrollLeft) - (g.clientLeft || h.clientLeft || 0);
      h = d.createSVGRect();
      h.x = a - c;
      h.y = b - e;
      h.width = h.height = 1;
      e = d.getIntersectionList(h, null);
      e.length && (f = e[e.length - 1]);
    }
    if (!f) {
      return null;
    }
    for (;f.parentNode && f != d.parentNode && !f.raphael;) {
      f = f.parentNode;
    }
    f == this.canvas.parentNode && (f = d);
    return f = f && f.raphael ? this.getById(f.raphaelid) : null;
  };
  w.getElementsByBBox = function(a) {
    var e = this.set();
    this.forEach(function(c) {
      b.isBBoxIntersect(c.getBBox(), a) && e.push(c);
    });
    return e;
  };
  w.getById = function(a) {
    for (var b = this.bottom;b;) {
      if (b.id == a) {
        return b;
      }
      b = b.next;
    }
    return null;
  };
  w.forEach = function(a, b) {
    for (var e = this.bottom;e && !1 !== a.call(b, e);) {
      e = e.next;
    }
    return this;
  };
  w.getElementsByPoint = function(a, b) {
    var e = this.set();
    this.forEach(function(c) {
      c.isPointInside(a, b) && e.push(c);
    });
    return e;
  };
  H.isPointInside = function(a, e) {
    var c = this.realPath = ma[this.type](this);
    this.attr("transform") && this.attr("transform").length && (c = b.transformPath(c, this.attr("transform")));
    return b.isPointInsidePath(c, a, e);
  };
  H.getBBox = function(a) {
    if (this.removed) {
      return{};
    }
    var b = this._;
    if (a) {
      if (b.dirty || !b.bboxwt) {
        this.realPath = ma[this.type](this), b.bboxwt = Ca(this.realPath), b.bboxwt.toString = m, b.dirty = 0;
      }
      return b.bboxwt;
    }
    if (b.dirty || b.dirtyT || !b.bbox) {
      if (b.dirty || !this.realPath) {
        b.bboxwt = 0, this.realPath = ma[this.type](this);
      }
      b.bbox = Ca(Aa(this.realPath, this.matrix));
      b.bbox.toString = m;
      b.dirty = b.dirtyT = 0;
    }
    return b.bbox;
  };
  H.clone = function() {
    if (this.removed) {
      return null;
    }
    var a = this.paper[this.type]().attr(this.attr());
    this.__set__ && this.__set__.push(a);
    return a;
  };
  H.glow = function(a) {
    if ("text" == this.type) {
      return null;
    }
    a = a || {};
    var b = (a.width || 10) + (+this.attr("stroke-width") || 1), e = a.fill || !1, c = a.opacity || .5, d = a.offsetx || 0, f = a.offsety || 0;
    a = a.color || "#000";
    for (var h = b / 2, g = this.paper, l = g.set(), n = this.realPath || ma[this.type](this), n = this.matrix ? Aa(n, this.matrix) : n, m = 1;m < h + 1;m++) {
      l.push(g.path(n).attr({stroke:a, fill:e ? a : "none", "stroke-linejoin":"round", "stroke-linecap":"round", "stroke-width":+(b / h * m).toFixed(3), opacity:+(c / h).toFixed(3)}));
    }
    return l.insertBefore(this).translate(d, f);
  };
  var Fa = function(a, e, c, d, g, l, n, m, k) {
    return null == k ? f(a, e, c, d, g, l, n, m) : b.findDotsAtSegment(a, e, c, d, g, l, n, m, h(a, e, c, d, g, l, n, m, k));
  }, Ga = function(a, e) {
    return function(c, d, f) {
      c = ha(c);
      for (var h, g, l, n, m = "", k = {}, p = 0, u = 0, w = c.length;u < w;u++) {
        l = c[u];
        if ("M" == l[0]) {
          h = +l[1], g = +l[2];
        } else {
          n = Fa(h, g, l[1], l[2], l[3], l[4], l[5], l[6]);
          if (p + n > d) {
            if (e && !k.start) {
              h = Fa(h, g, l[1], l[2], l[3], l[4], l[5], l[6], d - p);
              m += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y];
              if (f) {
                return m;
              }
              k.start = m;
              m = ["M" + h.x, h.y + "C" + h.n.x, h.n.y, h.end.x, h.end.y, l[5], l[6]].join();
              p += n;
              h = +l[5];
              g = +l[6];
              continue;
            }
            if (!a && !e) {
              return h = Fa(h, g, l[1], l[2], l[3], l[4], l[5], l[6], d - p), {x:h.x, y:h.y, alpha:h.alpha};
            }
          }
          p += n;
          h = +l[5];
          g = +l[6];
        }
        m += l.shift() + l;
      }
      k.end = m;
      h = a ? p : e ? k : b.findDotsAtSegment(h, g, l[0], l[1], l[2], l[3], l[4], l[5], 1);
      h.alpha && (h = {x:h.x, y:h.y, alpha:h.alpha});
      return h;
    };
  }, $a = Ga(1), ab = Ga(), Ha = Ga(0, 1);
  b.getTotalLength = $a;
  b.getPointAtLength = ab;
  b.getSubpath = function(a, b, e) {
    if (1E-6 > this.getTotalLength(a) - e) {
      return Ha(a, b).end;
    }
    a = Ha(a, e, 1);
    return b ? Ha(a, b).end : a;
  };
  H.getTotalLength = function() {
    var a = this.getPath();
    if (a) {
      return this.node.getTotalLength ? this.node.getTotalLength() : $a(a);
    }
  };
  H.getPointAtLength = function(a) {
    var b = this.getPath();
    if (b) {
      return ab(b, a);
    }
  };
  H.getPath = function() {
    var a, e = b._getPath[this.type];
    if ("text" != this.type && "set" != this.type) {
      return e && (a = e(this)), a;
    }
  };
  H.getSubpath = function(a, e) {
    var c = this.getPath();
    if (c) {
      return b.getSubpath(c, a, e);
    }
  };
  var X = b.easing_formulas = {linear:function(a) {
    return a;
  }, "<":function(a) {
    return W(a, 1.7);
  }, ">":function(a) {
    return W(a, .48);
  }, "<>":function(a) {
    var b = .48 - a / 1.04, e = x.sqrt(.1734 + b * b);
    a = e - b;
    a = W(O(a), 1 / 3) * (0 > a ? -1 : 1);
    b = -e - b;
    b = W(O(b), 1 / 3) * (0 > b ? -1 : 1);
    a = a + b + .5;
    return 3 * (1 - a) * a * a + a * a * a;
  }, backIn:function(a) {
    return a * a * (2.70158 * a - 1.70158);
  }, backOut:function(a) {
    a -= 1;
    return a * a * (2.70158 * a + 1.70158) + 1;
  }, elastic:function(a) {
    return a == !!a ? a : W(2, -10 * a) * x.sin(2 * (a - .075) * S / .3) + 1;
  }, bounce:function(a) {
    a < 1 / 2.75 ? a *= 7.5625 * a : a < 2 / 2.75 ? (a -= 1.5 / 2.75, a = 7.5625 * a * a + .75) : a < 2.5 / 2.75 ? (a -= 2.25 / 2.75, a = 7.5625 * a * a + .9375) : (a -= 2.625 / 2.75, a = 7.5625 * a * a + .984375);
    return a;
  }};
  X.easeIn = X["ease-in"] = X["<"];
  X.easeOut = X["ease-out"] = X[">"];
  X.easeInOut = X["ease-in-out"] = X["<>"];
  X["back-in"] = X.backIn;
  X["back-out"] = X.backOut;
  var G = [], Ma = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(a) {
    setTimeout(a, 16);
  }, xa = function() {
    for (var a = +new Date, e = 0;e < G.length;e++) {
      var d = G[e];
      if (!d.el.removed && !d.paused) {
        var f = a - d.start, h = d.ms, l = d.easing, g = d.from, n = d.diff, m = d.to, k = d.el, p = {}, u, w = {}, s;
        d.initstatus ? (f = (d.initstatus * d.anim.top - d.prev) / (d.percent - d.prev) * h, d.status = d.initstatus, delete d.initstatus, d.stop && G.splice(e--, 1)) : d.status = (d.prev + f / h * (d.percent - d.prev)) / d.anim.top;
        if (!(0 > f)) {
          if (f < h) {
            var r = l(f / h), q;
            for (q in g) {
              if (g.hasOwnProperty(q)) {
                switch(wa[q]) {
                  case P:
                    u = +g[q] + r * h * n[q];
                    break;
                  case "colour":
                    u = "rgb(" + [Ia(ya(g[q].r + r * h * n[q].r)), Ia(ya(g[q].g + r * h * n[q].g)), Ia(ya(g[q].b + r * h * n[q].b))].join() + ")";
                    break;
                  case "path":
                    u = [];
                    f = 0;
                    for (l = g[q].length;f < l;f++) {
                      u[f] = [g[q][f][0]];
                      m = 1;
                      for (w = g[q][f].length;m < w;m++) {
                        u[f][m] = +g[q][f][m] + r * h * n[q][f][m];
                      }
                      u[f] = u[f].join(" ");
                    }
                    u = u.join(" ");
                    break;
                  case "transform":
                    if (n[q].real) {
                      for (u = [], f = 0, l = g[q].length;f < l;f++) {
                        for (u[f] = [g[q][f][0]], m = 1, w = g[q][f].length;m < w;m++) {
                          u[f][m] = g[q][f][m] + r * h * n[q][f][m];
                        }
                      }
                    } else {
                      u = function(a) {
                        return+g[q][a] + r * h * n[q][a];
                      }, u = [["m", u(0), u(1), u(2), u(3), u(4), u(5)]];
                    }
                    break;
                  case "csv":
                    if ("clip-rect" == q) {
                      for (u = [], f = 4;f--;) {
                        u[f] = +g[q][f] + r * h * n[q][f];
                      }
                    }
                    break;
                  default:
                    for (l = [].concat(g[q]), u = [], f = k.paper.customAttributes[q].length;f--;) {
                      u[f] = +l[f] + r * h * n[q][f];
                    }
                  ;
                }
                p[q] = u;
              }
            }
            k.attr(p);
            (function(a, b, e) {
              setTimeout(function() {
                c("raphael.anim.frame." + a, b, e);
              });
            })(k.id, k, d.anim);
          } else {
            (function(a, e, d) {
              setTimeout(function() {
                c("raphael.anim.frame." + e.id, e, d);
                c("raphael.anim.finish." + e.id, e, d);
                b.is(a, "function") && a.call(e);
              });
            })(d.callback, k, d.anim);
            k.attr(m);
            G.splice(e--, 1);
            if (1 < d.repeat && !d.next) {
              for (s in m) {
                m.hasOwnProperty(s) && (w[s] = d.totalOrigin[s]);
              }
              d.el.attr(w);
              v(d.anim, d.el, d.anim.percents[0], null, d.totalOrigin, d.repeat - 1);
            }
            d.next && !d.stop && v(d.anim, d.el, d.next, null, d.totalOrigin, d.repeat);
          }
        }
      }
    }
    b.svg && k && k.paper && k.paper.safari();
    G.length && Ma(xa);
  }, Ia = function(a) {
    return 255 < a ? 255 : 0 > a ? 0 : a;
  };
  H.animateWith = function(a, e, c, d, f, h) {
    if (this.removed) {
      return h && h.call(this), this;
    }
    c = c instanceof s ? c : b.animation(c, d, f, h);
    v(c, this, c.percents[0], null, this.attr());
    c = 0;
    for (d = G.length;c < d;c++) {
      if (G[c].anim == e && G[c].el == a) {
        G[d - 1].start = G[c].start;
        break;
      }
    }
    return this;
  };
  H.onAnimation = function(a) {
    a ? c.on("raphael.anim.frame." + this.id, a) : c.unbind("raphael.anim.frame." + this.id);
    return this;
  };
  s.prototype.delay = function(a) {
    var b = new s(this.anim, this.ms);
    b.times = this.times;
    b.del = +a || 0;
    return b;
  };
  s.prototype.repeat = function(a) {
    var b = new s(this.anim, this.ms);
    b.del = this.del;
    b.times = x.floor(C(a, 0)) || 1;
    return b;
  };
  b.animation = function(a, e, c, d) {
    if (a instanceof s) {
      return a;
    }
    if (b.is(c, "function") || !c) {
      d = d || c || null, c = null;
    }
    a = Object(a);
    e = +e || 0;
    var f = {}, h, g;
    for (g in a) {
      a.hasOwnProperty(g) && I(g) != g && I(g) + "%" != g && (h = !0, f[g] = a[g]);
    }
    return h ? (c && (f.easing = c), d && (f.callback = d), new s({100:f}, e)) : new s(a, e);
  };
  H.animate = function(a, e, c, d) {
    if (this.removed) {
      return d && d.call(this), this;
    }
    a = a instanceof s ? a : b.animation(a, e, c, d);
    v(a, this, a.percents[0], null, this.attr());
    return this;
  };
  H.setTime = function(a, b) {
    a && null != b && this.status(a, M(b, a.ms) / a.ms);
    return this;
  };
  H.status = function(a, b) {
    var e = [], c = 0, d, f;
    if (null != b) {
      return v(a, this, -1, M(b, 1)), this;
    }
    for (d = G.length;c < d;c++) {
      if (f = G[c], f.el.id == this.id && (!a || f.anim == a)) {
        if (a) {
          return f.status;
        }
        e.push({anim:f.anim, status:f.status});
      }
    }
    return a ? 0 : e;
  };
  H.pause = function(a) {
    for (var b = 0;b < G.length;b++) {
      G[b].el.id != this.id || a && G[b].anim != a || !1 === c("raphael.anim.pause." + this.id, this, G[b].anim) || (G[b].paused = !0);
    }
    return this;
  };
  H.resume = function(a) {
    for (var b = 0;b < G.length;b++) {
      if (G[b].el.id == this.id && (!a || G[b].anim == a)) {
        var e = G[b];
        !1 !== c("raphael.anim.resume." + this.id, this, e.anim) && (delete e.paused, this.status(e.anim, e.status));
      }
    }
    return this;
  };
  H.stop = function(a) {
    for (var b = 0;b < G.length;b++) {
      G[b].el.id != this.id || a && G[b].anim != a || !1 !== c("raphael.anim.stop." + this.id, this, G[b].anim) && G.splice(b--, 1);
    }
    return this;
  };
  c.on("raphael.remove", B);
  c.on("raphael.clear", B);
  H.toString = function() {
    return "Rapha\u00ebl\u2019s object";
  };
  var ia = function(a) {
    this.items = [];
    this.length = 0;
    this.type = "set";
    if (a) {
      for (var b = 0, e = a.length;b < e;b++) {
        !a[b] || a[b].constructor != H.constructor && a[b].constructor != ia || (this[this.items.length] = this.items[this.items.length] = a[b], this.length++);
      }
    }
  }, Q = ia.prototype;
  Q.push = function() {
    for (var a, b, e = 0, c = arguments.length;e < c;e++) {
      !(a = arguments[e]) || a.constructor != H.constructor && a.constructor != ia || (b = this.items.length, this[b] = this.items[b] = a, this.length++);
    }
    return this;
  };
  Q.pop = function() {
    this.length && delete this[this.length--];
    return this.items.pop();
  };
  Q.forEach = function(a, b) {
    for (var e = 0, c = this.items.length;e < c && !1 !== a.call(b, this.items[e], e);e++) {
    }
    return this;
  };
  for (var Ja in H) {
    H.hasOwnProperty(Ja) && (Q[Ja] = function(a) {
      return function() {
        var b = arguments;
        return this.forEach(function(e) {
          e[a][u](e, b);
        });
      };
    }(Ja));
  }
  Q.attr = function(a, e) {
    if (a && b.is(a, U) && b.is(a[0], "object")) {
      for (var c = 0, d = a.length;c < d;c++) {
        this.items[c].attr(a[c]);
      }
    } else {
      for (c = 0, d = this.items.length;c < d;c++) {
        this.items[c].attr(a, e);
      }
    }
    return this;
  };
  Q.clear = function() {
    for (;this.length;) {
      this.pop();
    }
  };
  Q.splice = function(a, b, e) {
    a = 0 > a ? C(this.length + a, 0) : a;
    b = C(0, M(this.length - a, b));
    var c = [], d = [], f = [], h;
    for (h = 2;h < arguments.length;h++) {
      f.push(arguments[h]);
    }
    for (h = 0;h < b;h++) {
      d.push(this[a + h]);
    }
    for (;h < this.length - a;h++) {
      c.push(this[a + h]);
    }
    var g = f.length;
    for (h = 0;h < g + c.length;h++) {
      this.items[a + h] = this[a + h] = h < g ? f[h] : c[h - g];
    }
    for (h = this.items.length = this.length -= b - g;this[h];) {
      delete this[h++];
    }
    return new ia(d);
  };
  Q.exclude = function(a) {
    for (var b = 0, e = this.length;b < e;b++) {
      if (this[b] == a) {
        return this.splice(b, 1), !0;
      }
    }
  };
  Q.animate = function(a, e, c, d) {
    !b.is(c, "function") && c || (d = c || null);
    var f = this.items.length, h = f, g = this, l;
    if (!f) {
      return this;
    }
    d && (l = function() {
      !--f && d.call(g);
    });
    c = b.is(c, "string") ? c : l;
    e = b.animation(a, e, c, l);
    for (a = this.items[--h].animate(e);h--;) {
      this.items[h] && !this.items[h].removed && this.items[h].animateWith(a, e, e), this.items[h] && !this.items[h].removed || f--;
    }
    return this;
  };
  Q.insertAfter = function(a) {
    for (var b = this.items.length;b--;) {
      this.items[b].insertAfter(a);
    }
    return this;
  };
  Q.getBBox = function() {
    for (var a = [], b = [], e = [], c = [], d = this.items.length;d--;) {
      if (!this.items[d].removed) {
        var f = this.items[d].getBBox();
        a.push(f.x);
        b.push(f.y);
        e.push(f.x + f.width);
        c.push(f.y + f.height);
      }
    }
    a = M[u](0, a);
    b = M[u](0, b);
    e = C[u](0, e);
    c = C[u](0, c);
    return{x:a, y:b, x2:e, y2:c, width:e - a, height:c - b};
  };
  Q.clone = function(a) {
    a = this.paper.set();
    for (var b = 0, e = this.items.length;b < e;b++) {
      a.push(this.items[b].clone());
    }
    return a;
  };
  Q.toString = function() {
    return "Rapha\u00ebl\u2018s set";
  };
  Q.glow = function(a) {
    var b = this.paper.set();
    this.forEach(function(e, c) {
      var d = e.glow(a);
      null != d && d.forEach(function(a, e) {
        b.push(a);
      });
    });
    return b;
  };
  Q.isPointInside = function(a, b) {
    var e = !1;
    this.forEach(function(c) {
      if (c.isPointInside(a, b)) {
        return console.log("runned"), e = !0, !1;
      }
    });
    return e;
  };
  b.registerFont = function(a) {
    if (!a.face) {
      return a;
    }
    this.fonts = this.fonts || {};
    var b = {w:a.w, face:{}, glyphs:{}}, e = a.face["font-family"], c;
    for (c in a.face) {
      a.face.hasOwnProperty(c) && (b.face[c] = a.face[c]);
    }
    this.fonts[e] ? this.fonts[e].push(b) : this.fonts[e] = [b];
    if (!a.svg) {
      b.face["units-per-em"] = ca(a.face["units-per-em"], 10);
      for (var d in a.glyphs) {
        if (a.glyphs.hasOwnProperty(d) && (e = a.glyphs[d], b.glyphs[d] = {w:e.w, k:{}, d:e.d && "M" + e.d.replace(/[mlcxtrv]/g, function(a) {
          return{l:"L", c:"C", x:"z", t:"m", r:"l", v:"c"}[a] || "M";
        }) + "z"}, e.k)) {
          for (var f in e.k) {
            e.hasOwnProperty(f) && (b.glyphs[d].k[f] = e.k[f]);
          }
        }
      }
    }
    return a;
  };
  w.getFont = function(a, e, c, d) {
    d = d || "normal";
    c = c || "normal";
    e = +e || {normal:400, bold:700, lighter:300, bolder:800}[e] || 400;
    if (b.fonts) {
      var f = b.fonts[a];
      if (!f) {
        a = new RegExp("(^|\\s)" + a.replace(/[^\w\d\s+!~.:_-]/g, "") + "(\\s|$)", "i");
        for (var h in b.fonts) {
          if (b.fonts.hasOwnProperty(h) && a.test(h)) {
            f = b.fonts[h];
            break;
          }
        }
      }
      var g;
      if (f) {
        for (h = 0, a = f.length;h < a && (g = f[h], g.face["font-weight"] != e || g.face["font-style"] != c && g.face["font-style"] || g.face["font-stretch"] != d);h++) {
        }
      }
      return g;
    }
  };
  w.print = function(a, e, c, d, f, h, g, l) {
    h = h || "middle";
    g = C(M(g || 0, 1), -1);
    l = C(M(l || 1, 3), 1);
    c = E(c).split("");
    var n = 0, m = 0, k = "";
    b.is(d, "string") && (d = this.getFont(d));
    if (d) {
      f = (f || 16) / d.face["units-per-em"];
      var p = d.face.bbox.split(y), u = +p[0], w = p[3] - p[1], s = 0;
      h = +p[1] + ("baseline" == h ? w + +d.face.descent : w / 2);
      for (var p = 0, r = c.length;p < r;p++) {
        if ("\n" == c[p]) {
          m = t = n = 0, s += w * l;
        } else {
          var q = m && d.glyphs[c[p - 1]] || {}, t = d.glyphs[c[p]], n = n + (m ? (q.w || d.w) + (q.k && q.k[c[p]] || 0) + d.w * g : 0), m = 1
        }
        t && t.d && (k += b.transformPath(t.d, ["t", n * f, s * f, "s", f, f, u, h, "t", (a - u) / f, (e - h) / f]));
      }
    }
    return this.path(k).attr({fill:"#000", stroke:"none"});
  };
  w.add = function(a) {
    if (b.is(a, "array")) {
      for (var e = this.set(), c = 0, d = a.length, f;c < d;c++) {
        f = a[c] || {}, A.hasOwnProperty(f.type) && e.push(this[f.type]().attr(f));
      }
    }
    return e;
  };
  b.format = function(a, e) {
    var c = b.is(e, U) ? [0].concat(e) : arguments;
    a && b.is(a, "string") && c.length - 1 && (a = a.replace(D, function(a, b) {
      return null == c[++b] ? "" : c[b];
    }));
    return a || "";
  };
  b.fullfill = function() {
    var a = /\{([^\}]+)\}/g, b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, e = function(a, e, c) {
      var d = c;
      e.replace(b, function(a, b, e, c, f) {
        b = b || c;
        d && (b in d && (d = d[b]), "function" == typeof d && f && (d = d()));
      });
      return d = (null == d || d == c ? a : d) + "";
    };
    return function(b, c) {
      return String(b).replace(a, function(a, b) {
        return e(a, b, c);
      });
    };
  }();
  b.ninja = function() {
    J ? z.win.Raphael = L : delete Raphael;
    return b;
  };
  b.st = Q;
  (function(a, e, c) {
    function d() {
      /in/.test(a.readyState) ? setTimeout(d, 9) : b.eve("raphael.DOMload");
    }
    null == a.readyState && a.addEventListener && (a.addEventListener(e, c = function() {
      a.removeEventListener(e, c, !1);
      a.readyState = "complete";
    }, !1), a.readyState = "loading");
    d();
  })(document, "DOMContentLoaded");
  c.on("raphael.DOMload", function() {
    q = !0;
  });
  (function() {
    if (b.svg) {
      var a = String, e = parseFloat, c = parseInt, d = Math, f = d.max, h = d.abs, g = d.pow, l = /[, ]+/, n = b.eve, m = {block:"M5,0 0,2.5 5,5z", classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z", open:"M6,1 1,3.5 6,6", oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"}, k = {};
      b.toString = function() {
        return "Your browser supports SVG.\nYou are running Rapha\u00ebl " + this.version;
      };
      var p = function(e, c) {
        if (c) {
          "string" == typeof e && (e = p(e));
          for (var d in c) {
            c.hasOwnProperty(d) && ("xlink:" == d.substring(0, 6) ? e.setAttributeNS("http://www.w3.org/1999/xlink", d.substring(6), a(c[d])) : e.setAttribute(d, a(c[d])));
          }
        } else {
          e = b._g.doc.createElementNS("http://www.w3.org/2000/svg", e), e.style && (e.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
        }
        return e;
      }, u = function(c, l) {
        var n = "linear", m = c.id + l, k = .5, u = .5, w = c.node, s = c.paper, r = w.style, q = b._g.doc.getElementById(m);
        if (!q) {
          l = a(l).replace(b._radial_gradient, function(a, b, c) {
            n = "radial";
            b && c && (k = e(b), u = e(c), a = 2 * (.5 < u) - 1, .25 < g(k - .5, 2) + g(u - .5, 2) && (u = d.sqrt(.25 - g(k - .5, 2)) * a + .5) && .5 != u && (u = u.toFixed(5) - 1E-5 * a));
            return "";
          });
          l = l.split(/\s*\-\s*/);
          if ("linear" == n) {
            q = l.shift();
            q = -e(q);
            if (isNaN(q)) {
              return null;
            }
            var t = [0, 0, d.cos(b.rad(q)), d.sin(b.rad(q))], q = 1 / (f(h(t[2]), h(t[3])) || 1);
            t[2] *= q;
            t[3] *= q;
            0 > t[2] && (t[0] = -t[2], t[2] = 0);
            0 > t[3] && (t[1] = -t[3], t[3] = 0);
          }
          var x = b._parseDots(l);
          if (!x) {
            return null;
          }
          m = m.replace(/[\(\)\s,\xb0#]/g, "_");
          c.gradient && m != c.gradient.id && (s.defs.removeChild(c.gradient), delete c.gradient);
          if (!c.gradient) {
            for (q = p(n + "Gradient", {id:m}), c.gradient = q, p(q, "radial" == n ? {fx:k, fy:u} : {x1:t[0], y1:t[1], x2:t[2], y2:t[3], gradientTransform:c.matrix.invert()}), s.defs.appendChild(q), s = 0, t = x.length;s < t;s++) {
              q.appendChild(p("stop", {offset:x[s].offset ? x[s].offset : s ? "100%" : "0%", "stop-color":x[s].color || "#fff"}));
            }
          }
        }
        p(w, {fill:"url(#" + m + ")", opacity:1, "fill-opacity":1});
        r.fill = "";
        r.opacity = 1;
        return r.fillOpacity = 1;
      }, w = function(a) {
        var b = a.getBBox(1);
        p(a.pattern, {patternTransform:a.matrix.invert() + " translate(" + b.x + "," + b.y + ")"});
      }, s = function(e, c, d) {
        if ("path" == e.type) {
          for (var f = a(c).toLowerCase().split("-"), h = e.paper, g = d ? "end" : "start", l = e.node, n = e.attrs, u = n["stroke-width"], w = f.length, s = "classic", r, q, t = 3, x = 3, v = 5;w--;) {
            switch(f[w]) {
              case "block":
              ;
              case "classic":
              ;
              case "oval":
              ;
              case "diamond":
              ;
              case "open":
              ;
              case "none":
                s = f[w];
                break;
              case "wide":
                x = 5;
                break;
              case "narrow":
                x = 2;
                break;
              case "long":
                t = 5;
                break;
              case "short":
                t = 2;
            }
          }
          "open" == s ? (t += 2, x += 2, v += 2, r = 1, q = d ? 4 : 1, f = {fill:"none", stroke:n.stroke}) : (q = r = t / 2, f = {fill:n.stroke, stroke:"none"});
          e._.arrows ? d ? (e._.arrows.endPath && k[e._.arrows.endPath]--, e._.arrows.endMarker && k[e._.arrows.endMarker]--) : (e._.arrows.startPath && k[e._.arrows.startPath]--, e._.arrows.startMarker && k[e._.arrows.startMarker]--) : e._.arrows = {};
          if ("none" != s) {
            var w = "raphael-marker-" + s, y = "raphael-marker-" + g + s + t + x;
            b._g.doc.getElementById(w) ? k[w]++ : (h.defs.appendChild(p(p("path"), {"stroke-linecap":"round", d:m[s], id:w})), k[w] = 1);
            var z = b._g.doc.getElementById(y);
            z ? (k[y]++, t = z.getElementsByTagName("use")[0]) : (z = p(p("marker"), {id:y, markerHeight:x, markerWidth:t, orient:"auto", refX:q, refY:x / 2}), t = p(p("use"), {"xlink:href":"#" + w, transform:(d ? "rotate(180 " + t / 2 + " " + x / 2 + ") " : "") + "scale(" + t / v + "," + x / v + ")", "stroke-width":(1 / ((t / v + x / v) / 2)).toFixed(4)}), z.appendChild(t), h.defs.appendChild(z), k[y] = 1);
            p(t, f);
            h = r * ("diamond" != s && "oval" != s);
            d ? (d = e._.arrows.startdx * u || 0, u = b.getTotalLength(n.path) - h * u) : (d = h * u, u = b.getTotalLength(n.path) - (e._.arrows.enddx * u || 0));
            f = {};
            f["marker-" + g] = "url(#" + y + ")";
            if (u || d) {
              f.d = b.getSubpath(n.path, d, u);
            }
            p(l, f);
            e._.arrows[g + "Path"] = w;
            e._.arrows[g + "Marker"] = y;
            e._.arrows[g + "dx"] = h;
            e._.arrows[g + "Type"] = s;
            e._.arrows[g + "String"] = c;
          } else {
            d ? (d = e._.arrows.startdx * u || 0, u = b.getTotalLength(n.path) - d) : (d = 0, u = b.getTotalLength(n.path) - (e._.arrows.enddx * u || 0)), e._.arrows[g + "Path"] && p(l, {d:b.getSubpath(n.path, d, u)}), delete e._.arrows[g + "Path"], delete e._.arrows[g + "Marker"], delete e._.arrows[g + "dx"], delete e._.arrows[g + "Type"], delete e._.arrows[g + "String"];
          }
          for (f in k) {
            k.hasOwnProperty(f) && !k[f] && (e = b._g.doc.getElementById(f)) && e.parentNode.removeChild(e);
          }
        }
      }, r = {"":[0], none:[0], "-":[3, 1], ".":[1, 1], "-.":[3, 1, 1, 1], "-..":[3, 1, 1, 1, 1, 1], ". ":[1, 3], "- ":[4, 3], "--":[8, 3], "- .":[4, 3, 1, 3], "--.":[8, 3, 1, 3], "--..":[8, 3, 1, 3, 1, 3]}, q = function(b, e, c) {
        if (e = r[a(e).toLowerCase()]) {
          var d = b.attrs["stroke-width"] || "1";
          c = {round:d, square:d, butt:0}[b.attrs["stroke-linecap"] || c["stroke-linecap"]] || 0;
          for (var f = [], h = e.length;h--;) {
            f[h] = e[h] * d + (h % 2 ? 1 : -1) * c;
          }
          p(b.node, {"stroke-dasharray":f.join(",")});
        }
      }, t = function(e, d) {
        var g = e.node, n = e.attrs, m = g.style.visibility;
        g.style.visibility = "hidden";
        for (var k in d) {
          if (d.hasOwnProperty(k) && b._availableAttrs.hasOwnProperty(k)) {
            var r = d[k];
            n[k] = r;
            switch(k) {
              case "blur":
                e.blur(r);
                break;
              case "href":
              ;
              case "title":
                var t = p("title"), r = b._g.doc.createTextNode(r);
                t.appendChild(r);
                g.appendChild(t);
                break;
              case "target":
                var v = g.parentNode;
                "a" != v.tagName.toLowerCase() && (t = p("a"), v.insertBefore(t, g), t.appendChild(g), v = t);
                "target" == k ? v.setAttributeNS("http://www.w3.org/1999/xlink", "show", "blank" == r ? "new" : r) : v.setAttributeNS("http://www.w3.org/1999/xlink", k, r);
                break;
              case "cursor":
                g.style.cursor = r;
                break;
              case "transform":
                e.transform(r);
                break;
              case "arrow-start":
                s(e, r);
                break;
              case "arrow-end":
                s(e, r, 1);
                break;
              case "clip-rect":
                t = a(r).split(l);
                if (4 == t.length) {
                  e.clip && e.clip.parentNode.parentNode.removeChild(e.clip.parentNode);
                  var v = p("clipPath"), y = p("rect");
                  v.id = b.createUUID();
                  p(y, {x:t[0], y:t[1], width:t[2], height:t[3]});
                  v.appendChild(y);
                  e.paper.defs.appendChild(v);
                  p(g, {"clip-path":"url(#" + v.id + ")"});
                  e.clip = y;
                }
                !r && (r = g.getAttribute("clip-path")) && ((r = b._g.doc.getElementById(r.replace(/(^url\(#|\)$)/g, ""))) && r.parentNode.removeChild(r), p(g, {"clip-path":""}), delete e.clip);
                break;
              case "path":
                "path" == e.type && (p(g, {d:r ? n.path = b._pathToAbsolute(r) : "M0,0"}), e._.dirty = 1, e._.arrows && ("startString" in e._.arrows && s(e, e._.arrows.startString), "endString" in e._.arrows && s(e, e._.arrows.endString, 1)));
                break;
              case "width":
                if (g.setAttribute(k, r), e._.dirty = 1, n.fx) {
                  k = "x", r = n.x;
                } else {
                  break;
                }
              ;
              case "x":
                n.fx && (r = -n.x - (n.width || 0));
              case "rx":
                if ("rx" == k && "rect" == e.type) {
                  break;
                }
              ;
              case "cx":
                g.setAttribute(k, r);
                e.pattern && w(e);
                e._.dirty = 1;
                break;
              case "height":
                if (g.setAttribute(k, r), e._.dirty = 1, n.fy) {
                  k = "y", r = n.y;
                } else {
                  break;
                }
              ;
              case "y":
                n.fy && (r = -n.y - (n.height || 0));
              case "ry":
                if ("ry" == k && "rect" == e.type) {
                  break;
                }
              ;
              case "cy":
                g.setAttribute(k, r);
                e.pattern && w(e);
                e._.dirty = 1;
                break;
              case "r":
                "rect" == e.type ? p(g, {rx:r, ry:r}) : g.setAttribute(k, r);
                e._.dirty = 1;
                break;
              case "src":
                "image" == e.type && g.setAttributeNS("http://www.w3.org/1999/xlink", "href", r);
                break;
              case "stroke-width":
                if (1 != e._.sx || 1 != e._.sy) {
                  r /= f(h(e._.sx), h(e._.sy)) || 1;
                }
                e.paper._vbSize && (r *= e.paper._vbSize);
                g.setAttribute(k, r);
                n["stroke-dasharray"] && q(e, n["stroke-dasharray"], d);
                e._.arrows && ("startString" in e._.arrows && s(e, e._.arrows.startString), "endString" in e._.arrows && s(e, e._.arrows.endString, 1));
                break;
              case "stroke-dasharray":
                q(e, r, d);
                break;
              case "fill":
                var z = a(r).match(b._ISURL);
                if (z) {
                  var v = p("pattern"), E = p("image");
                  v.id = b.createUUID();
                  p(v, {x:0, y:0, patternUnits:"userSpaceOnUse", height:1, width:1});
                  p(E, {x:0, y:0, "xlink:href":z[1]});
                  v.appendChild(E);
                  (function(a) {
                    b._preload(z[1], function() {
                      var b = this.offsetWidth, c = this.offsetHeight;
                      p(a, {width:b, height:c});
                      p(E, {width:b, height:c});
                      e.paper.safari();
                    });
                  })(v);
                  e.paper.defs.appendChild(v);
                  p(g, {fill:"url(#" + v.id + ")"});
                  e.pattern = v;
                  e.pattern && w(e);
                  break;
                }
                t = b.getRGB(r);
                if (!t.error) {
                  delete d.gradient, delete n.gradient, !b.is(n.opacity, "undefined") && b.is(d.opacity, "undefined") && p(g, {opacity:n.opacity}), !b.is(n["fill-opacity"], "undefined") && b.is(d["fill-opacity"], "undefined") && p(g, {"fill-opacity":n["fill-opacity"]});
                } else {
                  if (("circle" == e.type || "ellipse" == e.type || "r" != a(r).charAt()) && u(e, r)) {
                    if ("opacity" in n || "fill-opacity" in n) {
                      if (t = b._g.doc.getElementById(g.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) {
                        t = t.getElementsByTagName("stop"), p(t[t.length - 1], {"stop-opacity":("opacity" in n ? n.opacity : 1) * ("fill-opacity" in n ? n["fill-opacity"] : 1)});
                      }
                    }
                    n.gradient = r;
                    n.fill = "none";
                    break;
                  }
                }
                t.hasOwnProperty("opacity") && p(g, {"fill-opacity":1 < t.opacity ? t.opacity / 100 : t.opacity});
              case "stroke":
                t = b.getRGB(r);
                g.setAttribute(k, t.hex);
                "stroke" == k && t.hasOwnProperty("opacity") && p(g, {"stroke-opacity":1 < t.opacity ? t.opacity / 100 : t.opacity});
                "stroke" == k && e._.arrows && ("startString" in e._.arrows && s(e, e._.arrows.startString), "endString" in e._.arrows && s(e, e._.arrows.endString, 1));
                break;
              case "gradient":
                "circle" != e.type && "ellipse" != e.type && "r" == a(r).charAt() || u(e, r);
                break;
              case "opacity":
                n.gradient && !n.hasOwnProperty("stroke-opacity") && p(g, {"stroke-opacity":1 < r ? r / 100 : r});
              case "fill-opacity":
                if (n.gradient) {
                  if (t = b._g.doc.getElementById(g.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) {
                    t = t.getElementsByTagName("stop"), p(t[t.length - 1], {"stop-opacity":r});
                  }
                  break;
                }
              ;
              default:
                "font-size" == k && (r = c(r, 10) + "px"), t = k.replace(/(\-.)/g, function(a) {
                  return a.substring(1).toUpperCase();
                }), g.style[t] = r, e._.dirty = 1, g.setAttribute(k, r);
            }
          }
        }
        x(e, d);
        g.style.visibility = m;
      }, x = function(e, d) {
        if ("text" == e.type && (d.hasOwnProperty("text") || d.hasOwnProperty("font") || d.hasOwnProperty("font-size") || d.hasOwnProperty("x") || d.hasOwnProperty("y"))) {
          var f = e.attrs, h = e.node, g = h.firstChild ? c(b._g.doc.defaultView.getComputedStyle(h.firstChild, "").getPropertyValue("font-size"), 10) : 10;
          if (d.hasOwnProperty("text")) {
            for (f.text = d.text;h.firstChild;) {
              h.removeChild(h.firstChild);
            }
            for (var l = a(d.text).split("\n"), n = [], m, k = 0, u = l.length;k < u;k++) {
              m = p("tspan"), k && p(m, {dy:1.2 * g, x:f.x}), m.appendChild(b._g.doc.createTextNode(l[k])), h.appendChild(m), n[k] = m;
            }
          } else {
            for (n = h.getElementsByTagName("tspan"), k = 0, u = n.length;k < u;k++) {
              k ? p(n[k], {dy:1.2 * g, x:f.x}) : p(n[0], {dy:0});
            }
          }
          p(h, {x:f.x, y:f.y});
          e._.dirty = 1;
          h = e._getBBox();
          (f = f.y - (h.y + h.height / 2)) && b.is(f, "finite") && p(n[0], {dy:f});
        }
      }, y = function(a, e) {
        this[0] = this.node = a;
        a.raphael = !0;
        this.id = b._oid++;
        a.raphaelid = this.id;
        this.matrix = b.matrix();
        this.realPath = null;
        this.paper = e;
        this.attrs = this.attrs || {};
        this._ = {transform:[], sx:1, sy:1, deg:0, dx:0, dy:0, dirty:1};
        !e.bottom && (e.bottom = this);
        (this.prev = e.top) && (e.top.next = this);
        e.top = this;
        this.next = null;
      }, v = b.el;
      y.prototype = v;
      v.constructor = y;
      b._engine.path = function(a, b) {
        var e = p("path");
        b.canvas && b.canvas.appendChild(e);
        e = new y(e, b);
        e.type = "path";
        t(e, {fill:"none", stroke:"#000", path:a});
        return e;
      };
      v.rotate = function(b, c, d) {
        if (this.removed) {
          return this;
        }
        b = a(b).split(l);
        b.length - 1 && (c = e(b[1]), d = e(b[2]));
        b = e(b[0]);
        null == d && (c = d);
        if (null == c || null == d) {
          d = this.getBBox(1), c = d.x + d.width / 2, d = d.y + d.height / 2;
        }
        this.transform(this._.transform.concat([["r", b, c, d]]));
        return this;
      };
      v.scale = function(b, c, d, f) {
        if (this.removed) {
          return this;
        }
        b = a(b).split(l);
        b.length - 1 && (c = e(b[1]), d = e(b[2]), f = e(b[3]));
        b = e(b[0]);
        null == c && (c = b);
        null == f && (d = f);
        if (null == d || null == f) {
          var h = this.getBBox(1)
        }
        d = null == d ? h.x + h.width / 2 : d;
        f = null == f ? h.y + h.height / 2 : f;
        this.transform(this._.transform.concat([["s", b, c, d, f]]));
        return this;
      };
      v.translate = function(b, c) {
        if (this.removed) {
          return this;
        }
        b = a(b).split(l);
        b.length - 1 && (c = e(b[1]));
        b = e(b[0]) || 0;
        this.transform(this._.transform.concat([["t", b, +c || 0]]));
        return this;
      };
      v.transform = function(a) {
        var e = this._;
        if (null == a) {
          return e.transform;
        }
        b._extractTransform(this, a);
        this.clip && p(this.clip, {transform:this.matrix.invert()});
        this.pattern && w(this);
        this.node && p(this.node, {transform:this.matrix});
        if (1 != e.sx || 1 != e.sy) {
          a = this.attrs.hasOwnProperty("stroke-width") ? this.attrs["stroke-width"] : 1, this.attr({"stroke-width":a});
        }
        return this;
      };
      v.hide = function() {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this;
      };
      v.show = function() {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this;
      };
      v.remove = function() {
        if (!this.removed && this.node.parentNode) {
          var a = this.paper;
          a.__set__ && a.__set__.exclude(this);
          n.unbind("raphael.*.*." + this.id);
          this.gradient && a.defs.removeChild(this.gradient);
          b._tear(this, a);
          "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
          for (var e in this) {
            this[e] = "function" == typeof this[e] ? b._removedFactory(e) : null;
          }
          this.removed = !0;
        }
      };
      v._getBBox = function() {
        if ("none" == this.node.style.display) {
          this.show();
          var a = !0;
        }
        var b = {};
        try {
          b = this.node.getBBox();
        } catch (e) {
        } finally {
          b = b || {};
        }
        a && this.hide();
        return b;
      };
      v.attr = function(a, e) {
        if (this.removed) {
          return this;
        }
        if (null == a) {
          var c = {}, d;
          for (d in this.attrs) {
            this.attrs.hasOwnProperty(d) && (c[d] = this.attrs[d]);
          }
          c.gradient && "none" == c.fill && (c.fill = c.gradient) && delete c.gradient;
          c.transform = this._.transform;
          return c;
        }
        if (null == e && b.is(a, "string")) {
          if ("fill" == a && "none" == this.attrs.fill && this.attrs.gradient) {
            return this.attrs.gradient;
          }
          if ("transform" == a) {
            return this._.transform;
          }
          d = a.split(l);
          for (var c = {}, f = 0, h = d.length;f < h;f++) {
            a = d[f], a in this.attrs ? c[a] = this.attrs[a] : b.is(this.paper.customAttributes[a], "function") ? c[a] = this.paper.customAttributes[a].def : c[a] = b._availableAttrs[a];
          }
          return h - 1 ? c : c[d[0]];
        }
        if (null == e && b.is(a, "array")) {
          c = {};
          f = 0;
          for (h = a.length;f < h;f++) {
            c[a[f]] = this.attr(a[f]);
          }
          return c;
        }
        null != e ? (c = {}, c[a] = e) : null != a && b.is(a, "object") && (c = a);
        for (f in c) {
          n("raphael.attr." + f + "." + this.id, this, c[f]);
        }
        for (f in this.paper.customAttributes) {
          if (this.paper.customAttributes.hasOwnProperty(f) && c.hasOwnProperty(f) && b.is(this.paper.customAttributes[f], "function")) {
            for (h in d = this.paper.customAttributes[f].apply(this, [].concat(c[f])), this.attrs[f] = c[f], d) {
              d.hasOwnProperty(h) && (c[h] = d[h]);
            }
          }
        }
        t(this, c);
        return this;
      };
      v.toFront = function() {
        if (this.removed) {
          return this;
        }
        "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
        var a = this.paper;
        a.top != this && b._tofront(this, a);
        return this;
      };
      v.toBack = function() {
        if (this.removed) {
          return this;
        }
        var a = this.node.parentNode;
        "a" == a.tagName.toLowerCase() ? a.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : a.firstChild != this.node && a.insertBefore(this.node, this.node.parentNode.firstChild);
        b._toback(this, this.paper);
        return this;
      };
      v.insertAfter = function(a) {
        if (this.removed) {
          return this;
        }
        var e = a.node || a[a.length - 1].node;
        e.nextSibling ? e.parentNode.insertBefore(this.node, e.nextSibling) : e.parentNode.appendChild(this.node);
        b._insertafter(this, a, this.paper);
        return this;
      };
      v.insertBefore = function(a) {
        if (this.removed) {
          return this;
        }
        var e = a.node || a[0].node;
        e.parentNode.insertBefore(this.node, e);
        b._insertbefore(this, a, this.paper);
        return this;
      };
      v.blur = function(a) {
        if (0 !== +a) {
          var e = p("filter"), c = p("feGaussianBlur");
          this.attrs.blur = a;
          e.id = b.createUUID();
          p(c, {stdDeviation:+a || 1.5});
          e.appendChild(c);
          this.paper.defs.appendChild(e);
          this._blur = e;
          p(this.node, {filter:"url(#" + e.id + ")"});
        } else {
          this._blur && (this._blur.parentNode.removeChild(this._blur), delete this._blur, delete this.attrs.blur), this.node.removeAttribute("filter");
        }
        return this;
      };
      b._engine.circle = function(a, b, e, c) {
        var d = p("circle");
        a.canvas && a.canvas.appendChild(d);
        a = new y(d, a);
        a.attrs = {cx:b, cy:e, r:c, fill:"none", stroke:"#000"};
        a.type = "circle";
        p(d, a.attrs);
        return a;
      };
      b._engine.rect = function(a, b, e, c, d, f) {
        var h = p("rect");
        a.canvas && a.canvas.appendChild(h);
        a = new y(h, a);
        a.attrs = {x:b, y:e, width:c, height:d, r:f || 0, rx:f || 0, ry:f || 0, fill:"none", stroke:"#000"};
        a.type = "rect";
        p(h, a.attrs);
        return a;
      };
      b._engine.ellipse = function(a, b, e, c, d) {
        var f = p("ellipse");
        a.canvas && a.canvas.appendChild(f);
        a = new y(f, a);
        a.attrs = {cx:b, cy:e, rx:c, ry:d, fill:"none", stroke:"#000"};
        a.type = "ellipse";
        p(f, a.attrs);
        return a;
      };
      b._engine.image = function(a, b, e, c, d, f) {
        var h = p("image");
        p(h, {x:e, y:c, width:d, height:f, preserveAspectRatio:"none"});
        h.setAttributeNS("http://www.w3.org/1999/xlink", "href", b);
        a.canvas && a.canvas.appendChild(h);
        a = new y(h, a);
        a.attrs = {x:e, y:c, width:d, height:f, src:b};
        a.type = "image";
        return a;
      };
      b._engine.text = function(a, e, c, d) {
        var f = p("text");
        a.canvas && a.canvas.appendChild(f);
        a = new y(f, a);
        a.attrs = {x:e, y:c, "text-anchor":"middle", text:d, font:b._availableAttrs.font, stroke:"none", fill:"#000"};
        a.type = "text";
        t(a, a.attrs);
        return a;
      };
      b._engine.setSize = function(a, b) {
        this.width = a || this.width;
        this.height = b || this.height;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        this._viewBox && this.setViewBox.apply(this, this._viewBox);
        return this;
      };
      b._engine.create = function() {
        var a = b._getContainer.apply(0, arguments), e = a && a.container, c = a.x, d = a.y, f = a.width, a = a.height;
        if (!e) {
          throw Error("SVG container not found.");
        }
        var h = p("svg"), g, c = c || 0, d = d || 0, f = f || 512, a = a || 342;
        p(h, {height:a, version:1.1, width:f, xmlns:"http://www.w3.org/2000/svg"});
        1 == e ? (h.style.cssText = "overflow:hidden;position:absolute;left:" + c + "px;top:" + d + "px", b._g.doc.body.appendChild(h), g = 1) : (h.style.cssText = "overflow:hidden;position:relative", e.firstChild ? e.insertBefore(h, e.firstChild) : e.appendChild(h));
        e = new b._Paper;
        e.width = f;
        e.height = a;
        e.canvas = h;
        e.clear();
        e._left = e._top = 0;
        g && (e.renderfix = function() {
        });
        e.renderfix();
        return e;
      };
      b._engine.setViewBox = function(a, b, e, c, d) {
        n("raphael.setViewBox", this, this._viewBox, [a, b, e, c, d]);
        var h = f(e / this.width, c / this.height), g = this.top, l = d ? "meet" : "xMinYMin", m;
        null == a ? (this._vbSize && (h = 1), delete this._vbSize, m = "0 0 " + this.width + " " + this.height) : (this._vbSize = h, m = a + " " + b + " " + e + " " + c);
        for (p(this.canvas, {viewBox:m, preserveAspectRatio:l});h && g;) {
          l = "stroke-width" in g.attrs ? g.attrs["stroke-width"] : 1, g.attr({"stroke-width":l}), g._.dirty = 1, g._.dirtyT = 1, g = g.prev;
        }
        this._viewBox = [a, b, e, c, !!d];
        return this;
      };
      b.prototype.renderfix = function() {
        var a = this.canvas, b = a.style, e;
        try {
          e = a.getScreenCTM() || a.createSVGMatrix();
        } catch (c) {
          e = a.createSVGMatrix();
        }
        a = -e.e % 1;
        e = -e.f % 1;
        if (a || e) {
          a && (this._left = (this._left + a) % 1, b.left = this._left + "px"), e && (this._top = (this._top + e) % 1, b.top = this._top + "px");
        }
      };
      b.prototype.clear = function() {
        b.eve("raphael.clear", this);
        for (var a = this.canvas;a.firstChild;) {
          a.removeChild(a.firstChild);
        }
        this.bottom = this.top = null;
        (this.desc = p("desc")).appendChild(b._g.doc.createTextNode("Created with Rapha\u00ebl " + b.version));
        a.appendChild(this.desc);
        a.appendChild(this.defs = p("defs"));
      };
      b.prototype.remove = function() {
        n("raphael.remove", this);
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var a in this) {
          this[a] = "function" == typeof this[a] ? b._removedFactory(a) : null;
        }
      };
      var z = b.st, E;
      for (E in v) {
        v.hasOwnProperty(E) && !z.hasOwnProperty(E) && (z[E] = function(a) {
          return function() {
            var b = arguments;
            return this.forEach(function(e) {
              e[a].apply(e, b);
            });
          };
        }(E));
      }
    }
  })();
  (function() {
    if (b.vml) {
      var a = String, e = parseFloat, c = Math, d = c.round, f = c.max, h = c.min, g = c.abs, l = /[, ]+/, n = b.eve, m = {M:"m", L:"l", C:"c", Z:"x", m:"t", l:"r", c:"v", z:"x"}, p = /([clmz]),?([^clmz]*)/gi, k = / progid:\S+Blur\([^\)]+\)/g, u = /-?[^,\s-]+/g, w = {path:1, rect:1, image:1}, r = {circle:1, ellipse:1}, s = function(e) {
        var c = /[ahqstv]/ig, f = b._pathToAbsolute;
        a(e).match(c) && (f = b._path2curve);
        c = /[clmz]/g;
        if (f == b._pathToAbsolute && !a(e).match(c)) {
          return e = a(e).replace(p, function(a, b, e) {
            var c = [], f = "m" == b.toLowerCase(), h = m[b];
            e.replace(u, function(a) {
              f && 2 == c.length && (h += c + m["m" == b ? "l" : "L"], c = []);
              c.push(d(21600 * a));
            });
            return h + c;
          });
        }
        var c = f(e), h;
        e = [];
        for (var g = 0, l = c.length;g < l;g++) {
          f = c[g];
          h = c[g][0].toLowerCase();
          "z" == h && (h = "x");
          for (var n = 1, k = f.length;n < k;n++) {
            h += d(21600 * f[n]) + (n != k - 1 ? "," : "");
          }
          e.push(h);
        }
        return e.join(" ");
      }, q = function(a, e, c) {
        var d = b.matrix();
        d.rotate(-a, .5, .5);
        return{dx:d.x(e, c), dy:d.y(e, c)};
      }, t = function(a, b, e, c, d, f) {
        var h = a._, l = a.matrix, n = h.fillpos;
        a = a.node;
        var m = a.style, p = 1, k = "", u = 21600 / b, w = 21600 / e;
        m.visibility = "hidden";
        if (b && e) {
          a.coordsize = g(u) + " " + g(w);
          m.rotation = f * (0 > b * e ? -1 : 1);
          f && (d = q(f, c, d), c = d.dx, d = d.dy);
          0 > b && (k += "x");
          0 > e && (k += " y") && (p = -1);
          m.flip = k;
          a.coordorigin = c * -u + " " + d * -w;
          if (n || h.fillsize) {
            c = (c = a.getElementsByTagName("fill")) && c[0], a.removeChild(c), n && (d = q(f, l.x(n[0], n[1]), l.y(n[0], n[1])), c.position = d.dx * p + " " + d.dy * p), h.fillsize && (c.size = h.fillsize[0] * g(b) + " " + h.fillsize[1] * g(e)), a.appendChild(c);
          }
          m.visibility = "visible";
        }
      };
      b.toString = function() {
        return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\u00ebl " + this.version;
      };
      var x = function(b, e, c) {
        e = a(e).toLowerCase().split("-");
        c = c ? "end" : "start";
        for (var d = e.length, f = "classic", h = "medium", g = "medium";d--;) {
          switch(e[d]) {
            case "block":
            ;
            case "classic":
            ;
            case "oval":
            ;
            case "diamond":
            ;
            case "open":
            ;
            case "none":
              f = e[d];
              break;
            case "wide":
            ;
            case "narrow":
              g = e[d];
              break;
            case "long":
            ;
            case "short":
              h = e[d];
          }
        }
        b = b.node.getElementsByTagName("stroke")[0];
        b[c + "arrow"] = f;
        b[c + "arrowlength"] = h;
        b[c + "arrowwidth"] = g;
      }, v = function(c, g) {
        c.attrs = c.attrs || {};
        var n = c.node, m = c.attrs, p = n.style, k = w[c.type] && (g.x != m.x || g.y != m.y || g.width != m.width || g.height != m.height || g.cx != m.cx || g.cy != m.cy || g.rx != m.rx || g.ry != m.ry || g.r != m.r), u = r[c.type] && (m.cx != g.cx || m.cy != g.cy || m.r != g.r || m.rx != g.rx || m.ry != g.ry), q;
        for (q in g) {
          g.hasOwnProperty(q) && (m[q] = g[q]);
        }
        k && (m.path = b._getPath[c.type](c), c._.dirty = 1);
        g.href && (n.href = g.href);
        g.title && (n.title = g.title);
        g.target && (n.target = g.target);
        g.cursor && (p.cursor = g.cursor);
        "blur" in g && c.blur(g.blur);
        if (g.path && "path" == c.type || k) {
          n.path = s(~a(m.path).toLowerCase().indexOf("r") ? b._pathToAbsolute(m.path) : m.path), "image" == c.type && (c._.fillpos = [m.x, m.y], c._.fillsize = [m.width, m.height], t(c, 1, 1, 0, 0, 0));
        }
        "transform" in g && c.transform(g.transform);
        u && (p = +m.cx, k = +m.cy, u = +m.rx || +m.r || 0, q = +m.ry || +m.r || 0, n.path = b.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", d(21600 * (p - u)), d(21600 * (k - q)), d(21600 * (p + u)), d(21600 * (k + q)), d(21600 * p)), c._.dirty = 1);
        "clip-rect" in g && (p = a(g["clip-rect"]).split(l), 4 == p.length && (p[2] = +p[2] + +p[0], p[3] = +p[3] + +p[1], k = n.clipRect || b._g.doc.createElement("div"), u = k.style, u.clip = b.format("rect({1}px {2}px {3}px {0}px)", p), n.clipRect || (u.position = "absolute", u.top = 0, u.left = 0, u.width = c.paper.width + "px", u.height = c.paper.height + "px", n.parentNode.insertBefore(k, n), k.appendChild(n), n.clipRect = k)), g["clip-rect"] || n.clipRect && (n.clipRect.style.clip = "auto"));
        c.textpath && (p = c.textpath.style, g.font && (p.font = g.font), g["font-family"] && (p.fontFamily = '"' + g["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, "") + '"'), g["font-size"] && (p.fontSize = g["font-size"]), g["font-weight"] && (p.fontWeight = g["font-weight"]), g["font-style"] && (p.fontStyle = g["font-style"]));
        "arrow-start" in g && x(c, g["arrow-start"]);
        "arrow-end" in g && x(c, g["arrow-end"], 1);
        if (null != g.opacity || null != g["stroke-width"] || null != g.fill || null != g.src || null != g.stroke || null != g["stroke-width"] || null != g["stroke-opacity"] || null != g["fill-opacity"] || null != g["stroke-dasharray"] || null != g["stroke-miterlimit"] || null != g["stroke-linejoin"] || null != g["stroke-linecap"]) {
          p = (p = n.getElementsByTagName("fill")) && p[0];
          !p && (p = A("fill"));
          "image" == c.type && g.src && (p.src = g.src);
          g.fill && (p.on = !0);
          if (null == p.on || "none" == g.fill || null === g.fill) {
            p.on = !1;
          }
          p.on && g.fill && ((k = a(g.fill).match(b._ISURL)) ? (p.parentNode == n && n.removeChild(p), p.rotate = !0, p.src = k[1], p.type = "tile", u = c.getBBox(1), p.position = u.x + " " + u.y, c._.fillpos = [u.x, u.y], b._preload(k[1], function() {
            c._.fillsize = [this.offsetWidth, this.offsetHeight];
          })) : (p.color = b.getRGB(g.fill).hex, p.src = "", p.type = "solid", b.getRGB(g.fill).error && (c.type in {circle:1, ellipse:1} || "r" != a(g.fill).charAt()) && y(c, g.fill, p) && (m.fill = "none", m.gradient = g.fill, p.rotate = !1)));
          if ("fill-opacity" in g || "opacity" in g) {
            u = ((+m["fill-opacity"] + 1 || 2) - 1) * ((+m.opacity + 1 || 2) - 1) * ((+b.getRGB(g.fill).o + 1 || 2) - 1), u = h(f(u, 0), 1), p.opacity = u, p.src && (p.color = "none");
          }
          n.appendChild(p);
          p = n.getElementsByTagName("stroke") && n.getElementsByTagName("stroke")[0];
          k = !1;
          !p && (k = p = A("stroke"));
          if (g.stroke && "none" != g.stroke || g["stroke-width"] || null != g["stroke-opacity"] || g["stroke-dasharray"] || g["stroke-miterlimit"] || g["stroke-linejoin"] || g["stroke-linecap"]) {
            p.on = !0;
          }
          "none" != g.stroke && null !== g.stroke && null != p.on && 0 != g.stroke && 0 != g["stroke-width"] || (p.on = !1);
          u = b.getRGB(g.stroke);
          p.on && g.stroke && (p.color = u.hex);
          u = ((+m["stroke-opacity"] + 1 || 2) - 1) * ((+m.opacity + 1 || 2) - 1) * ((+u.o + 1 || 2) - 1);
          q = .75 * (e(g["stroke-width"]) || 1);
          u = h(f(u, 0), 1);
          null == g["stroke-width"] && (q = m["stroke-width"]);
          g["stroke-width"] && (p.weight = q);
          q && 1 > q && (u *= q) && (p.weight = 1);
          p.opacity = u;
          g["stroke-linejoin"] && (p.joinstyle = g["stroke-linejoin"] || "miter");
          p.miterlimit = g["stroke-miterlimit"] || 8;
          g["stroke-linecap"] && (p.endcap = "butt" == g["stroke-linecap"] ? "flat" : "square" == g["stroke-linecap"] ? "square" : "round");
          g["stroke-dasharray"] && (u = {"-":"shortdash", ".":"shortdot", "-.":"shortdashdot", "-..":"shortdashdotdot", ". ":"dot", "- ":"dash", "--":"longdash", "- .":"dashdot", "--.":"longdashdot", "--..":"longdashdotdot"}, p.dashstyle = u.hasOwnProperty(g["stroke-dasharray"]) ? u[g["stroke-dasharray"]] : "");
          k && n.appendChild(p);
        }
        if ("text" == c.type) {
          c.paper.canvas.style.display = "";
          n = c.paper.span;
          k = m.font && m.font.match(/\d+(?:\.\d*)?(?=px)/);
          p = n.style;
          m.font && (p.font = m.font);
          m["font-family"] && (p.fontFamily = m["font-family"]);
          m["font-weight"] && (p.fontWeight = m["font-weight"]);
          m["font-style"] && (p.fontStyle = m["font-style"]);
          k = e(m["font-size"] || k && k[0]) || 10;
          p.fontSize = 100 * k + "px";
          c.textpath.string && (n.innerHTML = a(c.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
          n = n.getBoundingClientRect();
          c.W = m.w = (n.right - n.left) / 100;
          c.H = m.h = (n.bottom - n.top) / 100;
          c.X = m.x;
          c.Y = m.y + c.H / 2;
          ("x" in g || "y" in g) && (c.path.v = b.format("m{0},{1}l{2},{1}", d(21600 * m.x), d(21600 * m.y), d(21600 * m.x) + 1));
          n = "x y text font font-family font-weight font-style font-size".split(" ");
          p = 0;
          for (k = n.length;p < k;p++) {
            if (n[p] in g) {
              c._.dirty = 1;
              break;
            }
          }
          switch(m["text-anchor"]) {
            case "start":
              c.textpath.style["v-text-align"] = "left";
              c.bbx = c.W / 2;
              break;
            case "end":
              c.textpath.style["v-text-align"] = "right";
              c.bbx = -c.W / 2;
              break;
            default:
              c.textpath.style["v-text-align"] = "center", c.bbx = 0;
          }
          c.textpath.style["v-text-kern"] = !0;
        }
      }, y = function(d, f, h) {
        d.attrs = d.attrs || {};
        var g = Math.pow, l = "linear", n = ".5 .5";
        d.attrs.gradient = f;
        f = a(f).replace(b._radial_gradient, function(a, b, d) {
          l = "radial";
          b && d && (b = e(b), d = e(d), .25 < g(b - .5, 2) + g(d - .5, 2) && (d = c.sqrt(.25 - g(b - .5, 2)) * (2 * (.5 < d) - 1) + .5), n = b + " " + d);
          return "";
        });
        f = f.split(/\s*\-\s*/);
        if ("linear" == l) {
          var m = f.shift(), m = -e(m);
          if (isNaN(m)) {
            return null;
          }
        }
        f = b._parseDots(f);
        if (!f) {
          return null;
        }
        d = d.shape || d.node;
        if (f.length) {
          d.removeChild(h);
          h.on = !0;
          h.method = "none";
          h.color = f[0].color;
          h.color2 = f[f.length - 1].color;
          for (var p = [], k = 0, u = f.length;k < u;k++) {
            f[k].offset && p.push(f[k].offset + " " + f[k].color);
          }
          h.colors = p.length ? p.join() : "0% " + h.color;
          "radial" == l ? (h.type = "gradientTitle", h.focus = "100%", h.focussize = "0 0", h.focusposition = n, h.angle = 0) : (h.type = "gradient", h.angle = (270 - m) % 360);
          d.appendChild(h);
        }
        return 1;
      }, z = function(a, e) {
        this[0] = this.node = a;
        a.raphael = !0;
        this.id = b._oid++;
        a.raphaelid = this.id;
        this.Y = this.X = 0;
        this.attrs = {};
        this.paper = e;
        this.matrix = b.matrix();
        this._ = {transform:[], sx:1, sy:1, dx:0, dy:0, deg:0, dirty:1, dirtyT:1};
        !e.bottom && (e.bottom = this);
        (this.prev = e.top) && (e.top.next = this);
        e.top = this;
        this.next = null;
      }, E = b.el;
      z.prototype = E;
      E.constructor = z;
      E.transform = function(e) {
        if (null == e) {
          return this._.transform;
        }
        var c = this.paper._viewBoxShift, d = c ? "s" + [c.scale, c.scale] + "-1-1t" + [c.dx, c.dy] : "", f;
        c && (f = e = a(e).replace(/\.{3}|\u2026/g, this._.transform || ""));
        b._extractTransform(this, d + e);
        var c = this.matrix.clone(), h = this.skew;
        e = this.node;
        var d = ~a(this.attrs.fill).indexOf("-"), g = !a(this.attrs.fill).indexOf("url(");
        c.translate(1, 1);
        g || d || "image" == this.type ? (h.matrix = "1 0 0 1", h.offset = "0 0", h = c.split(), d && h.noRotation || !h.isSimple ? (e.style.filter = c.toFilter(), d = this.getBBox(), h = this.getBBox(1), c = d.x - h.x, d = d.y - h.y, e.coordorigin = -21600 * c + " " + -21600 * d, t(this, 1, 1, c, d, 0)) : (e.style.filter = "", t(this, h.scalex, h.scaley, h.dx, h.dy, h.rotate))) : (e.style.filter = "", h.matrix = a(c), h.offset = c.offset());
        f && (this._.transform = f);
        return this;
      };
      E.rotate = function(b, c, d) {
        if (this.removed) {
          return this;
        }
        if (null != b) {
          b = a(b).split(l);
          b.length - 1 && (c = e(b[1]), d = e(b[2]));
          b = e(b[0]);
          null == d && (c = d);
          if (null == c || null == d) {
            d = this.getBBox(1), c = d.x + d.width / 2, d = d.y + d.height / 2;
          }
          this._.dirtyT = 1;
          this.transform(this._.transform.concat([["r", b, c, d]]));
          return this;
        }
      };
      E.translate = function(b, c) {
        if (this.removed) {
          return this;
        }
        b = a(b).split(l);
        b.length - 1 && (c = e(b[1]));
        b = e(b[0]) || 0;
        c = +c || 0;
        this._.bbox && (this._.bbox.x += b, this._.bbox.y += c);
        this.transform(this._.transform.concat([["t", b, c]]));
        return this;
      };
      E.scale = function(b, c, d, f) {
        if (this.removed) {
          return this;
        }
        b = a(b).split(l);
        b.length - 1 && (c = e(b[1]), d = e(b[2]), f = e(b[3]), isNaN(d) && (d = null), isNaN(f) && (f = null));
        b = e(b[0]);
        null == c && (c = b);
        null == f && (d = f);
        if (null == d || null == f) {
          var h = this.getBBox(1)
        }
        d = null == d ? h.x + h.width / 2 : d;
        f = null == f ? h.y + h.height / 2 : f;
        this.transform(this._.transform.concat([["s", b, c, d, f]]));
        this._.dirtyT = 1;
        return this;
      };
      E.hide = function() {
        !this.removed && (this.node.style.display = "none");
        return this;
      };
      E.show = function() {
        !this.removed && (this.node.style.display = "");
        return this;
      };
      E._getBBox = function() {
        return this.removed ? {} : {x:this.X + (this.bbx || 0) - this.W / 2, y:this.Y - this.H, width:this.W, height:this.H};
      };
      E.remove = function() {
        if (!this.removed && this.node.parentNode) {
          this.paper.__set__ && this.paper.__set__.exclude(this);
          b.eve.unbind("raphael.*.*." + this.id);
          b._tear(this, this.paper);
          this.node.parentNode.removeChild(this.node);
          this.shape && this.shape.parentNode.removeChild(this.shape);
          for (var a in this) {
            this[a] = "function" == typeof this[a] ? b._removedFactory(a) : null;
          }
          this.removed = !0;
        }
      };
      E.attr = function(a, e) {
        if (this.removed) {
          return this;
        }
        if (null == a) {
          var c = {}, d;
          for (d in this.attrs) {
            this.attrs.hasOwnProperty(d) && (c[d] = this.attrs[d]);
          }
          c.gradient && "none" == c.fill && (c.fill = c.gradient) && delete c.gradient;
          c.transform = this._.transform;
          return c;
        }
        if (null == e && b.is(a, "string")) {
          if ("fill" == a && "none" == this.attrs.fill && this.attrs.gradient) {
            return this.attrs.gradient;
          }
          d = a.split(l);
          for (var c = {}, f = 0, h = d.length;f < h;f++) {
            a = d[f], a in this.attrs ? c[a] = this.attrs[a] : b.is(this.paper.customAttributes[a], "function") ? c[a] = this.paper.customAttributes[a].def : c[a] = b._availableAttrs[a];
          }
          return h - 1 ? c : c[d[0]];
        }
        if (this.attrs && null == e && b.is(a, "array")) {
          c = {};
          f = 0;
          for (h = a.length;f < h;f++) {
            c[a[f]] = this.attr(a[f]);
          }
          return c;
        }
        null != e && (c = {}, c[a] = e);
        null == e && b.is(a, "object") && (c = a);
        for (f in c) {
          n("raphael.attr." + f + "." + this.id, this, c[f]);
        }
        if (c) {
          for (f in this.paper.customAttributes) {
            if (this.paper.customAttributes.hasOwnProperty(f) && c.hasOwnProperty(f) && b.is(this.paper.customAttributes[f], "function")) {
              for (h in d = this.paper.customAttributes[f].apply(this, [].concat(c[f])), this.attrs[f] = c[f], d) {
                d.hasOwnProperty(h) && (c[h] = d[h]);
              }
            }
          }
          c.text && "text" == this.type && (this.textpath.string = c.text);
          v(this, c);
        }
        return this;
      };
      E.toFront = function() {
        !this.removed && this.node.parentNode.appendChild(this.node);
        this.paper && this.paper.top != this && b._tofront(this, this.paper);
        return this;
      };
      E.toBack = function() {
        if (this.removed) {
          return this;
        }
        this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), b._toback(this, this.paper));
        return this;
      };
      E.insertAfter = function(a) {
        if (this.removed) {
          return this;
        }
        a.constructor == b.st.constructor && (a = a[a.length - 1]);
        a.node.nextSibling ? a.node.parentNode.insertBefore(this.node, a.node.nextSibling) : a.node.parentNode.appendChild(this.node);
        b._insertafter(this, a, this.paper);
        return this;
      };
      E.insertBefore = function(a) {
        if (this.removed) {
          return this;
        }
        a.constructor == b.st.constructor && (a = a[0]);
        a.node.parentNode.insertBefore(this.node, a.node);
        b._insertbefore(this, a, this.paper);
        return this;
      };
      E.blur = function(a) {
        var e = this.node.runtimeStyle, c = e.filter, c = c.replace(k, "");
        0 !== +a ? (this.attrs.blur = a, e.filter = c + "  progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+a || 1.5) + ")", e.margin = b.format("-{0}px 0 0 -{0}px", d(+a || 1.5))) : (e.filter = c, e.margin = 0, delete this.attrs.blur);
        return this;
      };
      b._engine.path = function(a, b) {
        var e = A("shape");
        e.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
        e.coordsize = "21600 21600";
        e.coordorigin = b.coordorigin;
        var c = new z(e, b), d = {fill:"none", stroke:"#000"};
        a && (d.path = a);
        c.type = "path";
        c.path = [];
        c.Path = "";
        v(c, d);
        b.canvas.appendChild(e);
        d = A("skew");
        d.on = !0;
        e.appendChild(d);
        c.skew = d;
        c.transform("");
        return c;
      };
      b._engine.rect = function(a, e, c, d, f, h) {
        var g = b._rectPath(e, c, d, f, h);
        a = a.path(g);
        var l = a.attrs;
        a.X = l.x = e;
        a.Y = l.y = c;
        a.W = l.width = d;
        a.H = l.height = f;
        l.r = h;
        l.path = g;
        a.type = "rect";
        return a;
      };
      b._engine.ellipse = function(a, b, e, c, d) {
        a = a.path();
        a.X = b - c;
        a.Y = e - d;
        a.W = 2 * c;
        a.H = 2 * d;
        a.type = "ellipse";
        v(a, {cx:b, cy:e, rx:c, ry:d});
        return a;
      };
      b._engine.circle = function(a, b, e, c) {
        a = a.path();
        a.X = b - c;
        a.Y = e - c;
        a.W = a.H = 2 * c;
        a.type = "circle";
        v(a, {cx:b, cy:e, r:c});
        return a;
      };
      b._engine.image = function(a, e, c, d, f, h) {
        var g = b._rectPath(c, d, f, h);
        a = a.path(g).attr({stroke:"none"});
        var l = a.attrs, n = a.node, m = n.getElementsByTagName("fill")[0];
        l.src = e;
        a.X = l.x = c;
        a.Y = l.y = d;
        a.W = l.width = f;
        a.H = l.height = h;
        l.path = g;
        a.type = "image";
        m.parentNode == n && n.removeChild(m);
        m.rotate = !0;
        m.src = e;
        m.type = "tile";
        a._.fillpos = [c, d];
        a._.fillsize = [f, h];
        n.appendChild(m);
        t(a, 1, 1, 0, 0, 0);
        return a;
      };
      b._engine.text = function(e, c, f, h) {
        var g = A("shape"), l = A("path"), n = A("textpath");
        c = c || 0;
        f = f || 0;
        h = h || "";
        l.v = b.format("m{0},{1}l{2},{1}", d(21600 * c), d(21600 * f), d(21600 * c) + 1);
        l.textpathok = !0;
        n.string = a(h);
        n.on = !0;
        g.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
        g.coordsize = "21600 21600";
        g.coordorigin = "0 0";
        var m = new z(g, e), p = {fill:"#000", stroke:"none", font:b._availableAttrs.font, text:h};
        m.shape = g;
        m.path = l;
        m.textpath = n;
        m.type = "text";
        m.attrs.text = a(h);
        m.attrs.x = c;
        m.attrs.y = f;
        m.attrs.w = 1;
        m.attrs.h = 1;
        v(m, p);
        g.appendChild(n);
        g.appendChild(l);
        e.canvas.appendChild(g);
        e = A("skew");
        e.on = !0;
        g.appendChild(e);
        m.skew = e;
        m.transform("");
        return m;
      };
      b._engine.setSize = function(a, e) {
        var c = this.canvas.style;
        this.width = a;
        this.height = e;
        a == +a && (a += "px");
        e == +e && (e += "px");
        c.width = a;
        c.height = e;
        c.clip = "rect(0 " + a + " " + e + " 0)";
        this._viewBox && b._engine.setViewBox.apply(this, this._viewBox);
        return this;
      };
      b._engine.setViewBox = function(a, e, c, d, h) {
        b.eve("raphael.setViewBox", this, this._viewBox, [a, e, c, d, h]);
        var g = this.width, l = this.height, n = 1 / f(c / g, d / l), m, p;
        h && (m = l / d, p = g / c, c * m < g && (a -= (g - c * m) / 2 / m), d * p < l && (e -= (l - d * p) / 2 / p));
        this._viewBox = [a, e, c, d, !!h];
        this._viewBoxShift = {dx:-a, dy:-e, scale:n};
        this.forEach(function(a) {
          a.transform("...");
        });
        return this;
      };
      var A;
      b._engine.initWin = function(a) {
        var b = a.document;
        b.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
          !b.namespaces.rvml && b.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), A = function(a) {
            return b.createElement("<rvml:" + a + ' class="rvml">');
          };
        } catch (e) {
          A = function(a) {
            return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
          };
        }
      };
      b._engine.initWin(b._g.win);
      b._engine.create = function() {
        var a = b._getContainer.apply(0, arguments), e = a.container, c = a.height, d = a.width, f = a.x, a = a.y;
        if (!e) {
          throw Error("VML container not found.");
        }
        var h = new b._Paper, g = h.canvas = b._g.doc.createElement("div"), l = g.style, f = f || 0, a = a || 0, d = d || 512, c = c || 342;
        h.width = d;
        h.height = c;
        d == +d && (d += "px");
        c == +c && (c += "px");
        h.coordsize = "21600000 21600000";
        h.coordorigin = "0 0";
        h.span = b._g.doc.createElement("span");
        h.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        g.appendChild(h.span);
        l.cssText = b.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", d, c);
        1 == e ? (b._g.doc.body.appendChild(g), l.left = f + "px", l.top = a + "px", l.position = "absolute") : e.firstChild ? e.insertBefore(g, e.firstChild) : e.appendChild(g);
        h.renderfix = function() {
        };
        return h;
      };
      b.prototype.clear = function() {
        b.eve("raphael.clear", this);
        this.canvas.innerHTML = "";
        this.span = b._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null;
      };
      b.prototype.remove = function() {
        b.eve("raphael.remove", this);
        this.canvas.parentNode.removeChild(this.canvas);
        for (var a in this) {
          this[a] = "function" == typeof this[a] ? b._removedFactory(a) : null;
        }
        return!0;
      };
      var B = b.st, C;
      for (C in E) {
        E.hasOwnProperty(C) && !B.hasOwnProperty(C) && (B[C] = function(a) {
          return function() {
            var b = arguments;
            return this.forEach(function(e) {
              e[a].apply(e, b);
            });
          };
        }(C));
      }
    }
  })();
  J ? z.win.Raphael = b : Raphael = b;
  return b;
});
window.ABCJS || (window.ABCJS = {});
(function() {
  function a(a, b, d, k, g) {
    if (void 0 !== b && void 0 !== d) {
      var e = b;
      if (!e || e.propertyIsEnumerable("length") || "object" !== typeof e || "number" !== typeof e.length) {
        b = [b];
      }
      void 0 === k && (k = {});
      void 0 === g && (g = {});
      g = g.startingTune ? g.startingTune : 0;
      d = new ABCJS.TuneBook(d);
      for (var e = new window.ABCJS.parse.Parse, f = 0;f < b.length;f++) {
        var h = b[f];
        "string" === typeof h && (h = document.getElementById(h));
        if (h && (h.innerHTML = "", g < d.tunes.length)) {
          e.parse(d.tunes[g].abc, k);
          var l = e.getTune();
          a(h, l);
        }
        g++;
      }
    }
  }
  ABCJS.numberOfTunes = function(a) {
    a = a.split("\nX:").length;
    0 === a && (a = 1);
    return a;
  };
  ABCJS.TuneBook = function(a) {
    var b = this, d = "";
    a = window.ABCJS.parse.strip(a);
    a = a.split("\nX:");
    for (var k = 1;k < a.length;k++) {
      a[k] = "X:" + a[k];
    }
    var g = 0;
    b.tunes = [];
    window.ABCJS.parse.each(a, function(a) {
      b.tunes.push({abc:a, startPos:g});
      g += a.length;
    });
    1 < b.tunes.length && !window.ABCJS.parse.startsWith(b.tunes[0].abc, "X:") && (a = b.tunes.shift().abc.split("\n"), window.ABCJS.parse.each(a, function(a) {
      window.ABCJS.parse.startsWith(a, "%%") && (d += a + "\n");
    }));
    b.header = d;
    window.ABCJS.parse.each(b.tunes, function(a) {
      var b = a.abc.indexOf("\n\n");
      0 < b && (a.abc = a.abc.substring(0, b));
      a.pure = a.abc;
      a.abc = d + a.abc;
      b = a.pure.split("T:");
      1 < b.length ? (b = b[1].split("\n"), a.title = b[0].replace(/^\s+|\s+$/g, "")) : a.title = "";
      b = a.pure.substring(2, a.pure.indexOf("\n"));
      a.id = b.replace(/^\s+|\s+$/g, "");
    });
  };
  ABCJS.TuneBook.prototype.getTuneById = function(a) {
    for (var b = 0;b < this.tunes.length;b++) {
      if (this.tunes[b].id === a) {
        return this.tunes[b];
      }
    }
    return null;
  };
  ABCJS.TuneBook.prototype.getTuneByTitle = function(a) {
    for (var b = 0;b < this.tunes.length;b++) {
      if (this.tunes[b].title === a) {
        return this.tunes[b];
      }
    }
    return null;
  };
  ABCJS.renderAbc = function(c, b, d, k, g) {
    a(function(a, b) {
      var c = Raphael(a, g ? g.width ? g.width : 800 : 800, 400);
      void 0 === k && (k = {});
      (new ABCJS.write.Printer(c, k)).printABC(b);
    }, c, b, d, g);
  };
  ABCJS.renderMidi = function(c, b, d, k, g) {
    a(function(a, b) {
      void 0 === k && (k = {});
      (new ABCJS.midi.MidiWriter(a, k)).writeABC(b);
    }, c, b, d, g);
  };
})();
window.ABCJS || (window.ABCJS = {});
window.ABCJS.data || (window.ABCJS.data = {});
window.ABCJS.data.Tune = function() {
  this.reset = function() {
    this.version = "1.0.1";
    this.media = "screen";
    this.metaText = {};
    this.formatting = {};
    this.lines = [];
    this.lineNum = this.voiceNum = this.staffNum = 0;
  };
  this.cleanUp = function(a, c, b, d) {
    function k(a) {
      for (var b = [], e, c = function(a, c, d) {
        if (void 0 === b[d]) {
          for (e = 0;e < b.length;e++) {
            if (void 0 !== b[e]) {
              d = e;
              break;
            }
          }
          if (void 0 === b[d]) {
            var f = 100 * d;
            window.ABCJS.parse.each(a.endSlur, function(a) {
              f === a && --f;
            });
            b[d] = [f];
          }
        }
        for (var h, g = 0;g < c;g++) {
          h = b[d].pop(), a.endSlur.push(h);
        }
        0 === b[d].length && delete b[d];
        return h;
      }, d = function(a, e, c, d) {
        a.startSlur = [];
        void 0 === b[c] && (b[c] = []);
        for (var f = 100 * c + 1, h = 0;h < e;h++) {
          d && (window.ABCJS.parse.each(d, function(a) {
            f === a && ++f;
          }), window.ABCJS.parse.each(d, function(a) {
            f === a && ++f;
          }), window.ABCJS.parse.each(d, function(a) {
            f === a && ++f;
          })), window.ABCJS.parse.each(b[c], function(a) {
            f === a && ++f;
          }), window.ABCJS.parse.each(b[c], function(a) {
            f === a && ++f;
          }), b[c].push(f), a.startSlur.push({label:f}), f++;
        }
      }, f = 0;f < a.length;f++) {
        var h = a[f];
        if ("note" === h.el_type) {
          if (h.gracenotes) {
            for (var g = 0;g < h.gracenotes.length;g++) {
              if (h.gracenotes[g].endSlur) {
                var l = h.gracenotes[g].endSlur;
                h.gracenotes[g].endSlur = [];
                for (var n = 0;n < l;n++) {
                  c(h.gracenotes[g], 1, 20);
                }
              }
              h.gracenotes[g].startSlur && (e = h.gracenotes[g].startSlur, d(h.gracenotes[g], e, 20));
            }
          }
          h.endSlur && (e = h.endSlur, h.endSlur = [], c(h, e, 0));
          h.startSlur && (e = h.startSlur, d(h, e, 0));
          if (h.pitches) {
            g = [];
            for (l = 0;l < h.pitches.length;l++) {
              if (h.pitches[l].endSlur) {
                n = h.pitches[l].endSlur;
                h.pitches[l].endSlur = [];
                for (var k = 0;k < n;k++) {
                  var L = c(h.pitches[l], 1, l + 1);
                  g.push(L);
                }
              }
            }
            for (l = 0;l < h.pitches.length;l++) {
              h.pitches[l].startSlur && (e = h.pitches[l].startSlur, d(h.pitches[l], e, l + 1, g));
            }
            h.gracenotes && h.pitches[0].endSlur && 100 === h.pitches[0].endSlur[0] && h.pitches[0].startSlur && (h.gracenotes[0].endSlur ? h.gracenotes[0].endSlur.push(h.pitches[0].startSlur[0].label) : h.gracenotes[0].endSlur = [h.pitches[0].startSlur[0].label], 1 === h.pitches[0].endSlur.length ? delete h.pitches[0].endSlur : 100 === h.pitches[0].endSlur[0] ? h.pitches[0].endSlur.shift() : 100 === h.pitches[0].endSlur[h.pitches[0].endSlur.length - 1] && h.pitches[0].endSlur.pop(), 1 === b[1].length ? 
            delete b[1] : b[1].pop());
          }
        }
      }
    }
    this.closeLine();
    var g = !1, e, f;
    for (d = 0;d < this.lines.length;d++) {
      if (void 0 !== this.lines[d].staff) {
        var h = !1;
        for (e = 0;e < this.lines[d].staff.length;e++) {
          if (void 0 === this.lines[d].staff[e]) {
            g = !0, this.lines[d].staff[e] = null;
          } else {
            for (f = 0;f < this.lines[d].staff[e].voices.length;f++) {
              void 0 === this.lines[d].staff[e].voices[f] ? this.lines[d].staff[e].voices[f] = [] : this.containsNotes(this.lines[d].staff[e].voices[f]) && (h = !0);
            }
          }
        }
        h || (this.lines[d] = null, g = !0);
      }
    }
    g && (this.lines = window.ABCJS.parse.compact(this.lines), window.ABCJS.parse.each(this.lines, function(a) {
      a.staff && (a.staff = window.ABCJS.parse.compact(a.staff));
    }));
    if (b) {
      for (d = 0;d < this.lines.length;d++) {
        if (void 0 !== this.lines[d].staff) {
          for (e = 0;e < this.lines[d].staff.length;e++) {
            for (f = 0;f < this.lines[d].staff[e].voices.length;f++) {
              for (h = g = 0;h < this.lines[d].staff[e].voices[f].length;h++) {
                if ("bar" === this.lines[d].staff[e].voices[f][h].el_type && (g++, g >= b && h < this.lines[d].staff[e].voices[f].length - 1)) {
                  if (d === this.lines.length - 1) {
                    var l = JSON.parse(JSON.stringify(this.lines[d]));
                    this.lines.push(window.ABCJS.parse.clone(l));
                    for (l = 0;l < this.lines[d + 1].staff.length;l++) {
                      for (var n = 0;n < this.lines[d + 1].staff[l].voices.length;n++) {
                        this.lines[d + 1].staff[l].voices[n] = [];
                      }
                    }
                  }
                  l = h + 1;
                  n = this.lines[d].staff[e].voices[f].slice(l);
                  this.lines[d].staff[e].voices[f] = this.lines[d].staff[e].voices[f].slice(0, l);
                  this.lines[d + 1].staff[e].voices[f] = n.concat(this.lines[d + 1].staff[e].voices[f]);
                }
              }
            }
          }
        }
      }
    }
    if (b) {
      g = !1;
      for (d = 0;d < this.lines.length;d++) {
        if (void 0 !== this.lines[d].staff) {
          for (e = 0;e < this.lines[d].staff.length;e++) {
            b = !1;
            for (f = 0;f < this.lines[d].staff[e].voices.length;f++) {
              this.containsNotesStrict(this.lines[d].staff[e].voices[f]) && (b = !0);
            }
            b || (g = !0, this.lines[d].staff[e] = null);
          }
        }
      }
      g && window.ABCJS.parse.each(this.lines, function(a) {
        a.staff && (a.staff = window.ABCJS.parse.compact(a.staff));
      });
    }
    for (d = 0;d < this.lines.length;d++) {
      if (this.lines[d].staff) {
        for (e = 0;e < this.lines[d].staff.length;e++) {
          delete this.lines[d].staff[e].workingClef;
        }
      }
    }
    for (this.lineNum = 0;this.lineNum < this.lines.length;this.lineNum++) {
      if (this.lines[this.lineNum].staff) {
        for (this.staffNum = 0;this.staffNum < this.lines[this.lineNum].staff.length;this.staffNum++) {
          for (this.lines[this.lineNum].staff[this.staffNum].clef && window.ABCJS.parse.parseKeyVoice.fixClef(this.lines[this.lineNum].staff[this.staffNum].clef), this.voiceNum = 0;this.voiceNum < this.lines[this.lineNum].staff[this.staffNum].voices.length;this.voiceNum++) {
            for (k(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum]), b = 0;b < this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum].length;b++) {
              "clef" === this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][b].el_type && window.ABCJS.parse.parseKeyVoice.fixClef(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][b]);
            }
          }
        }
      }
    }
    this.formatting.pagewidth || (this.formatting.pagewidth = a);
    this.formatting.pageheight || (this.formatting.pageheight = c);
    delete this.staffNum;
    delete this.voiceNum;
    delete this.lineNum;
    delete this.potentialStartBeam;
    delete this.potentialEndBeam;
    delete this.vskipPending;
  };
  this.reset();
  this.getLastNote = function() {
    if (this.lines[this.lineNum] && this.lines[this.lineNum].staff && this.lines[this.lineNum].staff[this.staffNum] && this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum]) {
      for (var a = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum].length - 1;0 <= a;a--) {
        var c = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][a];
        if ("note" === c.el_type) {
          return c;
        }
      }
    }
    return null;
  };
  this.addTieToLastNote = function() {
    var a = this.getLastNote();
    return a && a.pitches && 0 < a.pitches.length ? (a.pitches[0].startTie = {}, !0) : !1;
  };
  this.getDuration = function(a) {
    return a.duration ? a.duration : 0;
  };
  this.closeLine = function() {
    this.potentialStartBeam && this.potentialEndBeam && (this.potentialStartBeam.startBeam = !0, this.potentialEndBeam.endBeam = !0);
    delete this.potentialStartBeam;
    delete this.potentialEndBeam;
  };
  this.appendElement = function(a, c, b, d) {
    var k = this;
    d.el_type = a;
    null !== c && (d.startChar = c);
    null !== b && (d.endChar = b);
    c = function() {
      void 0 !== k.potentialStartBeam && void 0 !== k.potentialEndBeam && (k.potentialStartBeam.startBeam = !0, k.potentialEndBeam.endBeam = !0);
      delete k.potentialStartBeam;
      delete k.potentialEndBeam;
    };
    "note" === a ? .25 <= k.getDuration(d) ? c() : d.force_end_beam_last && void 0 !== k.potentialStartBeam ? c() : d.end_beam && void 0 !== k.potentialStartBeam ? void 0 === d.rest ? (k.potentialStartBeam.startBeam = !0, d.endBeam = !0, delete k.potentialStartBeam, delete k.potentialEndBeam) : c() : void 0 === d.rest && (void 0 === k.potentialStartBeam ? d.end_beam || (k.potentialStartBeam = d, delete k.potentialEndBeam) : k.potentialEndBeam = d) : c();
    delete d.end_beam;
    delete d.force_end_beam_last;
    (function(a) {
      if (void 0 !== a.pitches) {
        var b = k.lines[k.lineNum].staff[k.staffNum].workingClef.verticalPos;
        window.ABCJS.parse.each(a.pitches, function(a) {
          a.verticalPos = a.pitch - b;
        });
      }
      if (void 0 !== a.gracenotes) {
        var c = k.lines[k.lineNum].staff[k.staffNum].workingClef.verticalPos;
        window.ABCJS.parse.each(a.gracenotes, function(a) {
          a.verticalPos = a.pitch - c;
        });
      }
      k.lines[k.lineNum].staff[k.staffNum].voices[k.voiceNum].push(a);
    })(d);
  };
  this.appendStartingElement = function(a, c, b, d) {
    this.closeLine();
    var k;
    "key" === a && (k = d.impliedNaturals, delete d.impliedNaturals);
    var g = window.ABCJS.parse.clone(d);
    "clef" === a && (this.lines[this.lineNum].staff[this.staffNum].workingClef = g);
    this.lines[this.lineNum].staff.length <= this.staffNum && (this.lines[this.lineNum].staff[this.staffNum] = {}, this.lines[this.lineNum].staff[this.staffNum].clef = window.ABCJS.parse.clone(this.lines[this.lineNum].staff[0].clef), this.lines[this.lineNum].staff[this.staffNum].key = window.ABCJS.parse.clone(this.lines[this.lineNum].staff[0].key), this.lines[this.lineNum].staff[this.staffNum].meter = window.ABCJS.parse.clone(this.lines[this.lineNum].staff[0].meter), this.lines[this.lineNum].staff[this.staffNum].workingClef = 
    window.ABCJS.parse.clone(this.lines[this.lineNum].staff[0].workingClef), this.lines[this.lineNum].staff[this.staffNum].voices = [[]]);
    for (var e = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum], f = 0;f < e.length;f++) {
      if ("note" === e[f].el_type || "bar" === e[f].el_type) {
        g.el_type = a;
        g.startChar = c;
        g.endChar = b;
        k && (g.accidentals = k.concat(g.accidentals));
        e.push(g);
        return;
      }
      if (e[f].el_type === a) {
        g.el_type = a;
        g.startChar = c;
        g.endChar = b;
        k && (g.accidentals = k.concat(g.accidentals));
        e[f] = g;
        return;
      }
    }
    this.lines[this.lineNum].staff[this.staffNum][a] = d;
  };
  this.getNumLines = function() {
    return this.lines.length;
  };
  this.pushLine = function(a) {
    this.vskipPending && (a.vskip = this.vskipPending, delete this.vskipPending);
    this.lines.push(a);
  };
  this.addSubtitle = function(a) {
    this.pushLine({subtitle:a});
  };
  this.addSpacing = function(a) {
    this.vskipPending = a;
  };
  this.addNewPage = function(a) {
    this.pushLine({newpage:a});
  };
  this.addSeparator = function(a, c, b) {
    this.pushLine({separator:{spaceAbove:a, spaceBelow:c, lineLength:b}});
  };
  this.addText = function(a) {
    this.pushLine({text:a});
  };
  this.addCentered = function(a) {
    this.pushLine({text:[{text:a, center:!0}]});
  };
  this.containsNotes = function(a) {
    for (var c = 0;c < a.length;c++) {
      if ("note" === a[c].el_type || "bar" === a[c].el_type) {
        return!0;
      }
    }
    return!1;
  };
  this.containsNotesStrict = function(a) {
    for (var c = 0;c < a.length;c++) {
      if ("note" === a[c].el_type && void 0 === a[c].rest) {
        return!0;
      }
    }
    return!1;
  };
  this.startNewLine = function(a) {
    var c = this;
    this.closeLine();
    var b = function(a) {
      c.lines[c.lineNum].staff[c.staffNum].voices[c.voiceNum] = [];
      c.isFirstLine(c.lineNum) ? a.name && (c.lines[c.lineNum].staff[c.staffNum].title || (c.lines[c.lineNum].staff[c.staffNum].title = []), c.lines[c.lineNum].staff[c.staffNum].title[c.voiceNum] = a.name) : a.subname && (c.lines[c.lineNum].staff[c.staffNum].title || (c.lines[c.lineNum].staff[c.staffNum].title = []), c.lines[c.lineNum].staff[c.staffNum].title[c.voiceNum] = a.subname);
      a.style && c.appendElement("style", null, null, {head:a.style});
      if (a.stem) {
        c.appendElement("stem", null, null, {direction:a.stem});
      } else {
        if (0 < c.voiceNum) {
          if (void 0 !== c.lines[c.lineNum].staff[c.staffNum].voices[0]) {
            for (var b = !1, d = 0;d < c.lines[c.lineNum].staff[c.staffNum].voices[0].length;d++) {
              "stem" === c.lines[c.lineNum].staff[c.staffNum].voices[0].el_type && (b = !0);
            }
            b || c.lines[c.lineNum].staff[c.staffNum].voices[0].splice(0, 0, {el_type:"stem", direction:"up"});
          }
          c.appendElement("stem", null, null, {direction:"down"});
        }
      }
      a.scale && c.appendElement("scale", null, null, {size:a.scale});
    }, d = function(a) {
      c.lines[c.lineNum].staff[c.staffNum] = {voices:[], clef:a.clef, key:a.key, workingClef:a.clef};
      a.vocalfont && (c.lines[c.lineNum].staff[c.staffNum].vocalfont = a.vocalfont);
      a.bracket && (c.lines[c.lineNum].staff[c.staffNum].bracket = a.bracket);
      a.brace && (c.lines[c.lineNum].staff[c.staffNum].brace = a.brace);
      a.connectBarLines && (c.lines[c.lineNum].staff[c.staffNum].connectBarLines = a.connectBarLines);
      b(a);
      a.part && c.appendElement("part", a.startChar, a.endChar, {title:a.part});
      void 0 !== a.meter && (c.lines[c.lineNum].staff[c.staffNum].meter = a.meter);
    }, k = function(a) {
      c.lines[c.lineNum] = {staff:[]};
      d(a);
    };
    void 0 === this.lines[this.lineNum] ? k(a) : void 0 === this.lines[this.lineNum].staff ? (this.lineNum++, this.startNewLine(a)) : void 0 === this.lines[this.lineNum].staff[this.staffNum] ? d(a) : void 0 === this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum] ? b(a) : this.containsNotes(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum]) && (this.lineNum++, this.startNewLine(a));
  };
  this.hasBeginMusic = function() {
    return 0 < this.lines.length;
  };
  this.isFirstLine = function(a) {
    for (a -= 1;0 <= a;a--) {
      if (void 0 !== this.lines[a].staff) {
        return!1;
      }
    }
    return!0;
  };
  this.getCurrentVoice = function() {
    return void 0 !== this.lines[this.lineNum] && void 0 !== this.lines[this.lineNum].staff[this.staffNum] && void 0 !== this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum] ? this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum] : null;
  };
  this.setCurrentVoice = function(a, c) {
    this.staffNum = a;
    this.voiceNum = c;
    for (var b = 0;b < this.lines.length;b++) {
      if (this.lines[b].staff && (void 0 === this.lines[b].staff[a] || void 0 === this.lines[b].staff[a].voices[c] || !this.containsNotes(this.lines[b].staff[a].voices[c]))) {
        this.lineNum = b;
        return;
      }
    }
    this.lineNum = b;
  };
  this.addMetaText = function(a, c) {
    this.metaText[a] = void 0 === this.metaText[a] ? c : this.metaText[a] + ("\n" + c);
  };
  this.addMetaTextArray = function(a, c) {
    void 0 === this.metaText[a] ? this.metaText[a] = [c] : this.metaText[a].push(c);
  };
  this.addMetaTextObj = function(a, c) {
    this.metaText[a] = c;
  };
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.midi || (window.ABCJS.midi = {});
(function() {
  function a(a, b) {
    for (var c in b) {
      b.hasOwnProperty(c) && a.setAttribute(c, b[c]);
    }
    return a;
  }
  function c(a, b) {
    this.javamidi = a;
    this.qtmidi = b;
  }
  function b(a) {
    this.playlist = [];
    this.timecount = this.trackcount = 0;
    this.tempo = 60;
    this.midiapi = MIDIPlugin;
    this.midiwriter = a;
    this.noteOnAndChannel = "%90";
  }
  function d() {
    this.trackstrings = "";
    this.trackcount = 0;
    this.noteOnAndChannel = "%90";
  }
  function k(a, b) {
    for (var c = a.toString(16);c.length < b;) {
      c = "0" + c;
    }
    for (var d = "", g = 0;g < c.length;g += 2) {
      d += "%", d += c.substr(g, 2);
    }
    return d;
  }
  function g(a) {
    for (var b = 0, c = [];0 !== a;) {
      c.push(a & 127), a >>= 7;
    }
    for (a = c.length - 1;0 <= a;a--) {
      var b = b << 8, d = c[a];
      0 !== a && (d |= 128);
      b |= d;
    }
    c = b.toString(16).length;
    return k(b, c + c % 2);
  }
  c.prototype.setTempo = function(a) {
    this.javamidi.setTempo(a);
    this.qtmidi.setTempo(a);
  };
  c.prototype.startTrack = function() {
    this.javamidi.startTrack();
    this.qtmidi.startTrack();
  };
  c.prototype.endTrack = function() {
    this.javamidi.endTrack();
    this.qtmidi.endTrack();
  };
  c.prototype.setInstrument = function(a) {
    this.javamidi.setInstrument(a);
    this.qtmidi.setInstrument(a);
  };
  c.prototype.startNote = function(a, b, c) {
    this.javamidi.startNote(a, b, c);
    this.qtmidi.startNote(a, b, c);
  };
  c.prototype.endNote = function(a, b) {
    this.javamidi.endNote(a, b);
    this.qtmidi.endNote(a, b);
  };
  c.prototype.addRest = function(a) {
    this.javamidi.addRest(a);
    this.qtmidi.addRest(a);
  };
  c.prototype.embed = function(a) {
    this.javamidi.embed(a);
    this.qtmidi.embed(a, !0);
  };
  b.prototype.setTempo = function(a) {
    this.tempo = a;
  };
  b.prototype.startTrack = function() {
    this.silencelength = 0;
    this.trackcount++;
    this.playlistpos = this.timecount = 0;
    this.first = !0;
    this.instrument && this.setInstrument(this.instrument);
    this.channel && this.setChannel(this.channel);
  };
  b.prototype.endTrack = function() {
  };
  b.prototype.setInstrument = function(a) {
    this.instrument = a;
    this.midiapi.setInstrument(a);
  };
  b.prototype.setChannel = function(a) {
    this.channel = a;
    this.midiapi.setChannel(a);
  };
  b.prototype.updatePos = function() {
    for (;this.playlist[this.playlistpos] && this.playlist[this.playlistpos].time < this.timecount;) {
      this.playlistpos++;
    }
  };
  b.prototype.startNote = function(a, b, c) {
    this.timecount += this.silencelength;
    this.silencelength = 0;
    this.updatePos();
    var d = this;
    this.playlist.splice(this.playlistpos, 0, {time:this.timecount, funct:function() {
      d.midiapi.playNote(a);
      d.midiwriter.notifySelect(c);
    }});
  };
  b.prototype.endNote = function(a, b) {
    this.timecount += b;
    this.updatePos();
    var c = this;
    this.playlist.splice(this.playlistpos, 0, {time:this.timecount, funct:function() {
      c.midiapi.stopNote(a);
    }});
  };
  b.prototype.addRest = function(a) {
    this.silencelength += a;
  };
  b.prototype.embed = function(b) {
    this.playlink = a(document.createElement("a"), {style:"border:1px solid black; margin:3px;"});
    this.playlink.innerHTML = "play";
    var c = this;
    this.playlink.onmousedown = function() {
      c.playing ? (this.innerHTML = "play", c.pausePlay()) : (this.innerHTML = "pause", c.startPlay());
    };
    b.appendChild(this.playlink);
    var d = a(document.createElement("a"), {style:"border:1px solid black; margin:3px;"});
    d.innerHTML = "stop";
    d.onmousedown = function() {
      c.stopPlay();
    };
    b.appendChild(d);
    this.currenttime = this.i = 0;
    this.playing = !1;
  };
  b.prototype.stopPlay = function() {
    this.currenttime = this.i = 0;
    this.pausePlay();
    this.playlink.innerHTML = "play";
  };
  b.prototype.startPlay = function() {
    this.playing = !0;
    var a = this;
    this.ticksperinterval = 120;
    this.doPlay();
    this.playinterval = window.setInterval(function() {
      a.doPlay();
    }, 6E4 / (4 * this.tempo));
  };
  b.prototype.pausePlay = function() {
    this.playing = !1;
    window.clearInterval(this.playinterval);
    this.midiapi.stopAllNotes();
  };
  b.prototype.doPlay = function() {
    for (;this.playlist[this.i] && this.playlist[this.i].time <= this.currenttime;) {
      this.playlist[this.i].funct(), this.i++;
    }
    this.playlist[this.i] ? this.currenttime += this.ticksperinterval : this.stopPlay();
  };
  d.prototype.setTempo = function(a) {
    0 === this.trackcount && (this.startTrack(), this.track += "%00%FF%51%03" + k(Math.round(6E7 / a), 6), this.endTrack());
  };
  d.prototype.startTrack = function() {
    this.track = "";
    this.silencelength = 0;
    this.trackcount++;
    this.first = !0;
    this.instrument && this.setInstrument(this.instrument);
  };
  d.prototype.endTrack = function() {
    this.track = "MTrk" + k(this.track.length / 3 + 4, 8) + this.track + "%00%FF%2F%00";
    this.trackstrings += this.track;
  };
  d.prototype.setInstrument = function(a) {
    this.track = this.track ? "%00%C0" + k(a, 2) + this.track : "%00%C0" + k(a, 2);
    this.instrument = a;
  };
  d.prototype.setChannel = function(a) {
    this.channel = a - 1;
    this.noteOnAndChannel = "%9" + this.channel.toString(16);
  };
  d.prototype.startNote = function(a, b) {
    this.track += g(this.silencelength);
    this.silencelength = 0;
    this.first && (this.first = !1, this.track += this.noteOnAndChannel);
    this.track += "%" + a.toString(16) + "%" + b;
  };
  d.prototype.endNote = function(a, b) {
    this.track += g(b);
    this.track += "%" + a.toString(16) + "%00";
  };
  d.prototype.addRest = function(a) {
    this.silencelength += a;
  };
  d.prototype.embed = function(b, c) {
    var d = "data:audio/midi,MThd%00%00%00%06%00%01" + k(this.trackcount, 4) + "%01%e0" + this.trackstrings, g = a(document.createElement("a"), {href:d});
    g.innerHTML = "download midi";
    b.insertBefore(g, b.firstChild);
    c || (d = a(document.createElement("embed"), {src:d, type:"video/quicktime", controller:"true", autoplay:"false", loop:"false", enablejavascript:"true", style:"display:block; height: 20px;"}), b.insertBefore(d, b.firstChild));
  };
  ABCJS.midi.MidiWriter = function(a, b) {
    b = b || {};
    this.parent = a;
    this.scale = [0, 2, 4, 5, 7, 9, 11];
    this.restart = {line:0, staff:0, voice:0, pos:0};
    this.visited = {};
    this.multiplier = 1;
    this.next = null;
    this.qpm = b.qpm || 180;
    this.program = b.program || 2;
    this.noteOnAndChannel = "%90";
    this.javamidi = "java" === b.type || !1;
    this.listeners = [];
    this.transpose = 0;
    this.javamidi && (MIDIPlugin = document.MIDIPlugin, setTimeout(function() {
      try {
        MIDIPlugin.openPlugin();
      } catch (b) {
        var c = document.createElement("a");
        c.href = "http://java.sun.com/products/java-media/sound/soundbanks.html";
        c.target = "_blank";
        c.appendChild(document.createTextNode("Download Soundbank"));
        a.appendChild(c);
      }
    }, 0));
  };
  ABCJS.midi.MidiWriter.prototype.addListener = function(a) {
    this.listeners.push(a);
  };
  ABCJS.midi.MidiWriter.prototype.notifySelect = function(a) {
    for (var b = 0;b < this.listeners.length;b++) {
      this.listeners[b].notifySelect(a.abselem);
    }
  };
  ABCJS.midi.MidiWriter.prototype.getMark = function() {
    return{line:this.line, staff:this.staff, voice:this.voice, pos:this.pos};
  };
  ABCJS.midi.MidiWriter.prototype.getMarkString = function(a) {
    a = a || this;
    return "line" + a.line + "staff" + a.staff + "voice" + a.voice + "pos" + a.pos;
  };
  ABCJS.midi.MidiWriter.prototype.goToMark = function(a) {
    this.line = a.line;
    this.staff = a.staff;
    this.voice = a.voice;
    this.pos = a.pos;
  };
  ABCJS.midi.MidiWriter.prototype.markVisited = function() {
    this.lastmark = this.getMarkString();
    this.visited[this.lastmark] = !0;
  };
  ABCJS.midi.MidiWriter.prototype.isVisited = function() {
    return this.visited[this.getMarkString()] ? !0 : !1;
  };
  ABCJS.midi.MidiWriter.prototype.setJumpMark = function(a) {
    this.visited[this.lastmark] = a;
  };
  ABCJS.midi.MidiWriter.prototype.getJumpMark = function() {
    return this.visited[this.getMarkString()];
  };
  ABCJS.midi.MidiWriter.prototype.getLine = function() {
    return this.abctune.lines[this.line];
  };
  ABCJS.midi.MidiWriter.prototype.getStaff = function() {
    try {
      return this.getLine().staff[this.staff];
    } catch (a) {
    }
  };
  ABCJS.midi.MidiWriter.prototype.getVoice = function() {
    return this.getStaff().voices[this.voice];
  };
  ABCJS.midi.MidiWriter.prototype.getElem = function() {
    return this.getVoice()[this.pos];
  };
  ABCJS.midi.MidiWriter.prototype.writeABC = function(a) {
    try {
      this.midi = this.javamidi ? new c(new b(this), new d) : new d;
      this.baraccidentals = [];
      this.abctune = a;
      this.baseduration = 1920;
      a.formatting.midi && a.formatting.midi.transpose && (this.transpose = a.formatting.midi.transpose);
      a.formatting.midi && a.formatting.midi.program && a.formatting.midi.program.program ? this.midi.setInstrument(a.formatting.midi.program.program) : this.midi.setInstrument(this.program);
      a.formatting.midi && a.formatting.midi.channel && this.midi.setChannel(a.formatting.midi.channel);
      if (a.metaText.tempo) {
        var f = .25;
        a.metaText.tempo.duration && (f = a.metaText.tempo.duration[0]);
        var h = 60;
        a.metaText.tempo.bpm && (h = a.metaText.tempo.bpm);
        this.qpm = h * f * 4;
      }
      this.midi.setTempo(this.qpm);
      this.staffcount = 1;
      for (this.staff = 0;this.staff < this.staffcount;this.staff++) {
        for (this.voicecount = 1, this.voice = 0;this.voice < this.voicecount;this.voice++) {
          this.midi.startTrack();
          this.restart = {line:0, staff:this.staff, voice:this.voice, pos:0};
          this.next = null;
          for (this.line = 0;this.line < a.lines.length;this.line++) {
            this.getLine().staff && this.writeABCLine();
          }
          this.midi.endTrack();
        }
      }
      this.midi.embed(this.parent);
    } catch (g) {
      this.parent.innerHTML = "Couldn't write midi: " + g;
    }
  };
  ABCJS.midi.MidiWriter.prototype.writeABCLine = function() {
    this.staffcount = this.getLine().staff.length;
    this.voicecount = this.getStaff().voices.length;
    this.setKeySignature(this.getStaff().key);
    this.writeABCVoiceLine();
  };
  ABCJS.midi.MidiWriter.prototype.writeABCVoiceLine = function() {
    for (this.pos = 0;this.pos < this.getVoice().length;) {
      if (this.writeABCElement(this.getElem()), this.next) {
        if (this.goToMark(this.next), this.next = null, !this.getLine().staff) {
          break;
        }
      } else {
        this.pos++;
      }
    }
  };
  ABCJS.midi.MidiWriter.prototype.writeABCElement = function(a) {
    switch(a.el_type) {
      case "note":
        this.writeNote(a);
        break;
      case "key":
        this.setKeySignature(a);
        break;
      case "bar":
        this.handleBar(a);
    }
  };
  ABCJS.midi.MidiWriter.prototype.writeNote = function(a) {
    a.startTriplet && (this.multiplier = 2 === a.startTriplet ? 1.5 : (a.startTriplet - 1) / a.startTriplet);
    var b = a.duration * this.baseduration * this.multiplier;
    if (a.pitches) {
      for (var c = [], d = 0;d < a.pitches.length;d++) {
        var g = a.pitches[d], m = g.pitch;
        if (g.accidental) {
          switch(g.accidental) {
            case "sharp":
              this.baraccidentals[m] = 1;
              break;
            case "flat":
              this.baraccidentals[m] = -1;
              break;
            case "natural":
              this.baraccidentals[m] = 0;
              break;
            case "dblsharp":
              this.baraccidentals[m] = 2;
              break;
            case "dblflat":
              this.baraccidentals[m] = -2;
          }
        }
        c[d] = 60 + 12 * this.extractOctave(m) + this.scale[this.extractNote(m)];
        c[d] = void 0 !== this.baraccidentals[m] ? c[d] + this.baraccidentals[m] : c[d] + this.accidentals[this.extractNote(m)];
        c[d] += this.transpose;
        this.midi.startNote(c[d], 64, a);
        g.startTie && (this.tieduration = b);
      }
      for (d = 0;d < a.pitches.length;d++) {
        g = a.pitches[d], g.startTie || (g.endTie ? this.midi.endNote(c[d], b + this.tieduration) : this.midi.endNote(c[d], b), this.tieduration = b = 0);
      }
    } else {
      a.rest && "spacer" !== a.rest.type && this.midi.addRest(b);
    }
    a.endTriplet && (this.multiplier = 1);
  };
  ABCJS.midi.MidiWriter.prototype.handleBar = function(a) {
    this.baraccidentals = [];
    var b = "bar_right_repeat" === a.type || "bar_dbl_repeat" === a.type, c = a.startEnding ? !0 : !1, d = b || c;
    a = "bar_left_repeat" === a.type || "bar_dbl_repeat" === a.type || "bar_thick_thin" === a.type || "bar_thin_thick" === a.type || "bar_thin_thin" === a.type || "bar_right_repeat" === a.type;
    var g = null;
    this.isVisited() ? g = this.getJumpMark() : ((c || b) && !0 === this.visited[this.lastmark] && this.setJumpMark(this.getMark()), d && this.markVisited(), b && (g = this.restart, this.setJumpMark(this.getMark())));
    a && (this.restart = this.getMark());
    g && this.getMarkString(g) !== this.getMarkString() && (this.next = g);
  };
  ABCJS.midi.MidiWriter.prototype.setKeySignature = function(a) {
    this.accidentals = [0, 0, 0, 0, 0, 0, 0];
    this.abctune.formatting.bagpipes && (a.accidentals = [{acc:"natural", note:"g"}, {acc:"sharp", note:"f"}, {acc:"sharp", note:"c"}]);
    a.accidentals && window.ABCJS.parse.each(a.accidentals, function(a) {
      var b = "sharp" === a.acc ? 1 : "natural" === a.acc ? 0 : -1;
      a = a.note.toLowerCase();
      a = this.extractNote(a.charCodeAt(0) - 99);
      this.accidentals[a] += b;
    }, this);
  };
  ABCJS.midi.MidiWriter.prototype.extractNote = function(a) {
    a %= 7;
    0 > a && (a += 7);
    return a;
  };
  ABCJS.midi.MidiWriter.prototype.extractOctave = function(a) {
    return Math.floor(a / 7);
  };
})();
window.ABCJS || (window.ABCJS = {});
window.ABCJS.parse || (window.ABCJS.parse = {});
window.ABCJS.parse.clone = function(a) {
  var c = {}, b;
  for (b in a) {
    a.hasOwnProperty(b) && (c[b] = a[b]);
  }
  return c;
};
window.ABCJS.parse.gsub = function(a, c, b) {
  return a.split(c).join(b);
};
window.ABCJS.parse.strip = function(a) {
  return a.replace(/^\s+/, "").replace(/\s+$/, "");
};
window.ABCJS.parse.startsWith = function(a, c) {
  return 0 === a.indexOf(c);
};
window.ABCJS.parse.endsWith = function(a, c) {
  var b = a.length - c.length;
  return 0 <= b && a.lastIndexOf(c) === b;
};
window.ABCJS.parse.each = function(a, c, b) {
  for (var d = 0, k = a.length;d < k;d++) {
    c.apply(b, [a[d], d]);
  }
};
window.ABCJS.parse.last = function(a) {
  return 0 === a.length ? null : a[a.length - 1];
};
window.ABCJS.parse.compact = function(a) {
  for (var c = [], b = 0;b < a.length;b++) {
    a[b] && c.push(a[b]);
  }
  return c;
};
window.ABCJS.parse.detect = function(a, c) {
  for (var b = 0;b < a.length;b++) {
    if (c(a[b])) {
      return!0;
    }
  }
  return!1;
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.parse || (window.ABCJS.parse = {});
window.ABCJS.parse.Parse = function() {
  function a() {
    var a = {startChar:-1, endChar:-1};
    d.partForNextLine.length && (a.part = d.partForNextLine);
    a.clef = d.currentVoice && void 0 !== d.staves[d.currentVoice.staffNum].clef ? window.ABCJS.parse.clone(d.staves[d.currentVoice.staffNum].clef) : window.ABCJS.parse.clone(d.clef);
    a.key = window.ABCJS.parse.parseKeyVoice.deepCopyKey(d.key);
    window.ABCJS.parse.parseKeyVoice.addPosToKey(a.clef, a.key);
    null !== d.meter ? (d.currentVoice ? (window.ABCJS.parse.each(d.staves, function(a) {
      a.meter = d.meter;
    }), a.meter = d.staves[d.currentVoice.staffNum].meter, d.staves[d.currentVoice.staffNum].meter = null) : a.meter = d.meter, d.meter = null) : d.currentVoice && d.staves[d.currentVoice.staffNum].meter && (a.meter = d.staves[d.currentVoice.staffNum].meter, d.staves[d.currentVoice.staffNum].meter = null);
    d.currentVoice && d.currentVoice.name && (a.name = d.currentVoice.name);
    d.vocalfont && (a.vocalfont = d.vocalfont);
    d.style && (a.style = d.style);
    if (d.currentVoice) {
      var b = d.staves[d.currentVoice.staffNum];
      b.brace && (a.brace = b.brace);
      b.bracket && (a.bracket = b.bracket);
      b.connectBarLines && (a.connectBarLines = b.connectBarLines);
      b.name && (a.name = b.name[d.currentVoice.index]);
      b.subname && (a.subname = b.subname[d.currentVoice.index]);
      d.currentVoice.stem && (a.stem = d.currentVoice.stem);
      d.currentVoice.scale && (a.scale = d.currentVoice.scale);
      d.currentVoice.style && (a.style = d.currentVoice.style);
    }
    c.startNewLine(a);
    d.partForNextLine = "";
    (void 0 === d.currentVoice || d.currentVoice.staffNum === d.staves.length - 1 && d.staves[d.currentVoice.staffNum].numVoices - 1 === d.currentVoice.index) && 0 === d.barNumbers && (d.barNumOnNextNote = d.currBarNumber);
  }
  var c = new window.ABCJS.data.Tune, b = new window.ABCJS.parse.tokenizer;
  this.getTune = function() {
    return c;
  };
  var d = {reset:function() {
    for (var a in this) {
      this.hasOwnProperty(a) && "function" !== typeof this[a] && delete this[a];
    }
    this.iChar = 0;
    this.key = {accidentals:[], root:"none", acc:"", mode:""};
    this.meter = {type:"specified", value:[{num:"4", den:"4"}]};
    this.origMeter = {type:"specified", value:[{num:"4", den:"4"}]};
    this.hasMainTitle = !1;
    this.default_length = .125;
    this.clef = {type:"treble", verticalPos:0};
    this.next_note_duration = 0;
    this.is_in_header = this.start_new_line = !0;
    this.is_in_history = !1;
    this.partForNextLine = "";
    this.havent_set_length = !0;
    this.voices = {};
    this.staves = [];
    this.macros = {};
    this.currBarNumber = 1;
    this.inPsBlock = this.inTextBlock = !1;
    this.ignoredDecorations = [];
    this.textBlock = "";
    this.inTie = this.inEnding = this.score_is_present = !1;
    this.inTieChord = {};
  }}, k = function(a) {
    a = window.ABCJS.parse.gsub(a, "\u0012", " ");
    a = window.ABCJS.parse.gsub(a, "&", "&amp;");
    a = window.ABCJS.parse.gsub(a, "<", "&lt;");
    return window.ABCJS.parse.gsub(a, ">", "&gt;");
  }, g = function(a, b, e) {
    var f = b.charAt(e);
    " " === f && (f = "SPACE");
    b = k(b.substring(0, e)) + '<span style="text-decoration:underline;font-size:1.3em;font-weight:bold;">' + f + "</span>" + k(b.substring(e + 1));
    a = "Music Line:" + c.getNumLines() + ":" + (e + 1) + ": " + a + ":  " + b;
    d.warnings || (d.warnings = []);
    d.warnings.push(a);
  }, e = new window.ABCJS.parse.ParseHeader(b, g, d, c);
  this.getWarnings = function() {
    return d.warnings;
  };
  var f = function(a, c) {
    if ('"' === a.charAt(c)) {
      var e = b.getBrackettedSubstring(a, c, 5);
      e[2] || g("Missing the closing quote while parsing the chord symbol", a, c);
      if (0 < e[0] && 0 < e[1].length && "^" === e[1].charAt(0)) {
        e[1] = e[1].substring(1), e[2] = "above";
      } else {
        if (0 < e[0] && 0 < e[1].length && "_" === e[1].charAt(0)) {
          e[1] = e[1].substring(1), e[2] = "below";
        } else {
          if (0 < e[0] && 0 < e[1].length && "<" === e[1].charAt(0)) {
            e[1] = e[1].substring(1), e[2] = "left";
          } else {
            if (0 < e[0] && 0 < e[1].length && ">" === e[1].charAt(0)) {
              e[1] = e[1].substring(1), e[2] = "right";
            } else {
              if (0 < e[0] && 0 < e[1].length && "@" === e[1].charAt(0)) {
                e[1] = e[1].substring(1);
                var d = b.getFloat(e[1]);
                0 === d.digits && g("Missing first position in absolutely positioned annotation.", a, c);
                e[1] = e[1].substring(d.digits);
                "," !== e[1][0] && g("Missing comma absolutely positioned annotation.", a, c);
                e[1] = e[1].substring(1);
                var f = b.getFloat(e[1]);
                0 === f.digits && g("Missing second position in absolutely positioned annotation.", a, c);
                e[1] = e[1].substring(f.digits);
                var h = b.skipWhiteSpace(e[1]);
                e[1] = e[1].substring(h);
                e[2] = null;
                e[3] = {x:d.value, y:f.value};
              } else {
                e[1] = e[1].replace(/([ABCDEFG])b/g, "$1\u266d"), e[1] = e[1].replace(/([ABCDEFG])#/g, "$1\u266f"), e[2] = "default";
              }
            }
          }
        }
      }
      return e;
    }
    return[0, ""];
  }, h = "trill lowermordent uppermordent mordent pralltriller accent fermata invertedfermata tenuto 0 1 2 3 4 5 + wedge open thumb snap turn roll breath shortphrase mediumphrase longphrase segno coda D.S. D.C. fine crescendo( crescendo) diminuendo( diminuendo) p pp f ff mf mp ppp pppp fff ffff sfz repeatbar repeatbar2 slide upbow downbow / // /// //// trem1 trem2 trem3 trem4 turnx invertedturn invertedturnx trill( trill) arpeggio xstem mark umarcato style=normal style=harmonic style=rhythm style=x".split(" "), 
  l = [["<", "accent"], [">", "accent"], ["tr", "trill"], ["<(", "crescendo("], ["<)", "crescendo)"], [">(", "diminuendo("], [">)", "diminuendo)"], ["plus", "+"], ["emphasis", "accent"]], n = function(a, e) {
    var c = d.macros[a.charAt(e)];
    if (void 0 !== c) {
      if ("!" === c.charAt(0) || "+" === c.charAt(0)) {
        c = c.substring(1);
      }
      if ("!" === c.charAt(c.length - 1) || "+" === c.charAt(c.length - 1)) {
        c = c.substring(0, c.length - 1);
      }
      if (window.ABCJS.parse.detect(h, function(a) {
        return c === a;
      })) {
        return[1, c];
      }
      window.ABCJS.parse.detect(d.ignoredDecorations, function(a) {
        return c === a;
      }) || g("Unknown macro: " + c, a, e);
      return[1, ""];
    }
    switch(a.charAt(e)) {
      case ".":
        return[1, "staccato"];
      case "u":
        return[1, "upbow"];
      case "v":
        return[1, "downbow"];
      case "~":
        return[1, "irishroll"];
      case "!":
      ;
      case "+":
        var f = b.getBrackettedSubstring(a, e, 5);
        0 < f[1].length && ("^" === f[1].charAt(0) || "_" === f[1].charAt(0)) && (f[1] = f[1].substring(1));
        if (window.ABCJS.parse.detect(h, function(a) {
          return f[1] === a;
        }) || window.ABCJS.parse.detect(l, function(a) {
          return f[1] === a[0] ? (f[1] = a[1], !0) : !1;
        })) {
          return f;
        }
        if ("!" === a.charAt(e) && (1 === f[0] || "!" !== a.charAt(e + f[0] - 1))) {
          return[1, null];
        }
        g("Unknown decoration: " + f[1], a, e);
        f[1] = "";
        return f;
      case "H":
        return[1, "fermata"];
      case "J":
        return[1, "slide"];
      case "L":
        return[1, "accent"];
      case "M":
        return[1, "mordent"];
      case "O":
        return[1, "coda"];
      case "P":
        return[1, "pralltriller"];
      case "R":
        return[1, "roll"];
      case "S":
        return[1, "segno"];
      case "T":
        return[1, "trill"];
    }
    return[0, 0];
  }, m = function(a, e) {
    for (var c = e;b.isWhiteSpace(a.charAt(e));) {
      e++;
    }
    return[e - c];
  }, r = function(a, e) {
    var c = b.getBarLine(a, e);
    if (0 === c.len) {
      return[0, ""];
    }
    if (c.warn) {
      return g(c.warn, a, e), [c.len, ""];
    }
    for (var d = 0;d < a.length && " " === a.charAt(e + c.len + d);d++) {
    }
    var f = c.len;
    "[" === a.charAt(e + c.len + d) && (c.len += d + 1);
    if ('"' === a.charAt(e + c.len) && "[" === a.charAt(e + c.len - 1)) {
      return f = b.getBrackettedSubstring(a, e + c.len, 5), [c.len + f[0], c.token, f[1]];
    }
    d = b.getTokenOf(a.substring(e + c.len), "1234567890-,");
    return 0 === d.len || "-" === d.token[0] ? [f, c.token] : [c.len + d.len, c.token, d.token];
  }, s = function(a, e) {
    for (var c = {}, d = e;"(" === a.charAt(e) || b.isWhiteSpace(a.charAt(e));) {
      "(" === a.charAt(e) && (e + 1 < a.length && "2" <= a.charAt(e + 1) && "9" >= a.charAt(e + 1) ? (void 0 !== c.triplet ? g("Can't nest triplets", a, e) : (c.triplet = a.charAt(e + 1) - 0, e + 2 < a.length && ":" === a.charAt(e + 2) && (e + 3 < a.length && ":" === a.charAt(e + 3) ? e + 4 < a.length && "1" <= a.charAt(e + 4) && "9" >= a.charAt(e + 4) ? (c.num_notes = a.charAt(e + 4) - 0, e += 3) : g("expected number after the two colons after the triplet to mark the duration", a, e) : e + 3 < a.length && 
      "1" <= a.charAt(e + 3) && "9" >= a.charAt(e + 3) ? e + 4 < a.length && ":" === a.charAt(e + 4) ? e + 5 < a.length && "1" <= a.charAt(e + 5) && "9" >= a.charAt(e + 5) && (c.num_notes = a.charAt(e + 5) - 0, e += 4) : (c.num_notes = c.triplet, e += 3) : g("expected number after the triplet to mark the duration", a, e))), e++) : void 0 === c.startSlur ? c.startSlur = 1 : c.startSlur++), e++;
    }
    c.consumed = e - d;
    return c;
  }, v = function(a, e) {
    if (a) {
      e = window.ABCJS.parse.strip(e);
      "-" !== e.charAt(e.length - 1) && (e += " ");
      for (var c = [], d = 0, f = !1, h = function(a) {
        var h = window.ABCJS.parse.strip(e.substring(d, a));
        d = a + 1;
        return 0 < h.length ? (f && (h = window.ABCJS.parse.gsub(h, "~", " ")), a = e.charAt(a), "_" !== a && "-" !== a && (a = " "), c.push({syllable:b.translateString(h), divider:a}), f = !1, !0) : !1;
      }, l = 0;l < e.length;l++) {
        switch(e.charAt(l)) {
          case " ":
          ;
          case "\u0012":
            h(l);
            break;
          case "-":
            !h(l) && 0 < c.length && (window.ABCJS.parse.last(c).divider = "-", c.push({skip:!0, to:"next"}));
            break;
          case "_":
            h(l);
            c.push({skip:!0, to:"slur"});
            break;
          case "*":
            h(l);
            c.push({skip:!0, to:"next"});
            break;
          case "|":
            h(l);
            c.push({skip:!0, to:"bar"});
            break;
          case "~":
            f = !0;
        }
      }
      window.ABCJS.parse.each(a, function(a) {
        if (0 !== c.length) {
          if (c[0].skip) {
            switch(c[0].to) {
              case "next":
                "note" === a.el_type && null !== a.pitches && c.shift();
                break;
              case "slur":
                "note" === a.el_type && null !== a.pitches && c.shift();
                break;
              case "bar":
                "bar" === a.el_type && c.shift();
            }
          } else {
            if ("note" === a.el_type && void 0 === a.rest) {
              var b = c.shift();
              void 0 === a.lyric ? a.lyric = [b] : a.lyric.push(b);
            }
          }
        }
      });
    } else {
      g("Can't add words before the first line of mulsic", a, 0);
    }
  }, B = function(a, e) {
    if (a) {
      e = window.ABCJS.parse.strip(e);
      "-" !== e.charAt(e.length - 1) && (e += " ");
      for (var c = [], d = 0, f = !1, h = function(a) {
        var h = window.ABCJS.parse.strip(e.substring(d, a));
        d = a + 1;
        return 0 < h.length ? (f && (h = window.ABCJS.parse.gsub(h, "~", " ")), a = e.charAt(a), "_" !== a && "-" !== a && (a = " "), c.push({syllable:b.translateString(h), divider:a}), f = !1, !0) : !1;
      }, l = 0;l < e.length;l++) {
        switch(e.charAt(l)) {
          case " ":
          ;
          case "\u0012":
            h(l);
            break;
          case "-":
            !h(l) && 0 < c.length && (window.ABCJS.parse.last(c).divider = "-", c.push({skip:!0, to:"next"}));
            break;
          case "_":
            h(l);
            c.push({skip:!0, to:"slur"});
            break;
          case "*":
            h(l);
            c.push({skip:!0, to:"next"});
            break;
          case "|":
            h(l);
            c.push({skip:!0, to:"bar"});
            break;
          case "~":
            f = !0;
        }
      }
      window.ABCJS.parse.each(a, function(a) {
        if (0 !== c.length) {
          if (c[0].skip) {
            switch(c[0].to) {
              case "next":
                "note" === a.el_type && null !== a.pitches && c.shift();
                break;
              case "slur":
                "note" === a.el_type && null !== a.pitches && c.shift();
                break;
              case "bar":
                "bar" === a.el_type && c.shift();
            }
          } else {
            if ("note" === a.el_type && void 0 === a.rest) {
              var b = c.shift();
              void 0 === a.lyric ? a.lyric = [b] : a.lyric.push(b);
            }
          }
        }
      });
    } else {
      g("Can't add symbols before the first line of mulsic", a, 0);
    }
  }, q = function(a, b) {
    switch(a.charAt(b)) {
      case ">":
        return b < a.length - 1 && ">" === a.charAt(b + 1) ? [2, 1.75, .25] : [1, 1.5, .5];
      case "<":
        return b < a.length - 1 && "<" === a.charAt(b + 1) ? [2, .25, 1.75] : [1, .5, 1.5];
    }
    return null;
  }, y = function(a) {
    void 0 !== a.duration && .25 > a.duration && (a.end_beam = !0);
    return a;
  }, A = {A:5, B:6, C:0, D:1, E:2, F:3, G:4, a:12, b:13, c:7, d:8, e:9, f:10, g:11}, D = {x:"invisible", y:"spacer", z:"rest", Z:"multimeasure"}, z = function(a, e, f, h) {
    for (var g = function(a) {
      return "octave" === a || "duration" === a || "Zduration" === a || "broken_rhythm" === a || "end_slur" === a;
    }, l = "startSlur", n = !1;;) {
      switch(a.charAt(e)) {
        case "(":
          if ("startSlur" === l) {
            void 0 === f.startSlur ? f.startSlur = 1 : f.startSlur++;
          } else {
            return g(l) ? (f.endChar = e, f) : null;
          }
          break;
        case ")":
          if (g(l)) {
            void 0 === f.endSlur ? f.endSlur = 1 : f.endSlur++;
          } else {
            return null;
          }
          break;
        case "^":
          if ("startSlur" === l) {
            f.accidental = "sharp", l = "sharp2";
          } else {
            if ("sharp2" === l) {
              f.accidental = "dblsharp", l = "pitch";
            } else {
              return g(l) ? (f.endChar = e, f) : null;
            }
          }
          break;
        case "_":
          if ("startSlur" === l) {
            f.accidental = "flat", l = "flat2";
          } else {
            if ("flat2" === l) {
              f.accidental = "dblflat", l = "pitch";
            } else {
              return g(l) ? (f.endChar = e, f) : null;
            }
          }
          break;
        case "=":
          if ("startSlur" === l) {
            f.accidental = "natural", l = "pitch";
          } else {
            return g(l) ? (f.endChar = e, f) : null;
          }
          break;
        case "A":
        ;
        case "B":
        ;
        case "C":
        ;
        case "D":
        ;
        case "E":
        ;
        case "F":
        ;
        case "G":
        ;
        case "a":
        ;
        case "b":
        ;
        case "c":
        ;
        case "d":
        ;
        case "e":
        ;
        case "f":
        ;
        case "g":
          if ("startSlur" === l || "sharp2" === l || "flat2" === l || "pitch" === l) {
            f.pitch = A[a.charAt(e)], l = "octave", h && 0 !== d.next_note_duration ? (f.duration = d.next_note_duration, d.next_note_duration = 0, n = !0) : f.duration = d.default_length;
          } else {
            return g(l) ? (f.endChar = e, f) : null;
          }
          break;
        case ",":
          if ("octave" === l) {
            f.pitch -= 7;
          } else {
            return g(l) ? (f.endChar = e, f) : null;
          }
          break;
        case "'":
          if ("octave" === l) {
            f.pitch += 7;
          } else {
            return g(l) ? (f.endChar = e, f) : null;
          }
          break;
        case "x":
        ;
        case "y":
        ;
        case "z":
        ;
        case "Z":
          if ("startSlur" === l) {
            f.rest = {type:D[a.charAt(e)]}, delete f.accidental, delete f.startSlur, delete f.startTie, delete f.endSlur, delete f.endTie, delete f.end_beam, delete f.grace_notes, "multimeasure" === f.rest.type ? (f.duration = 1, l = "Zduration") : (h && 0 !== d.next_note_duration ? (f.duration = d.next_note_duration, d.next_note_duration = 0, n = !0) : f.duration = d.default_length, l = "duration");
          } else {
            return g(l) ? (f.endChar = e, f) : null;
          }
          break;
        case "1":
        ;
        case "2":
        ;
        case "3":
        ;
        case "4":
        ;
        case "5":
        ;
        case "6":
        ;
        case "7":
        ;
        case "8":
        ;
        case "9":
        ;
        case "0":
        ;
        case "/":
          if ("octave" === l || "duration" === l) {
            e = b.getFraction(a, e);
            n || (f.duration *= e.value);
            for (f.endChar = e.index;e.index < a.length && (b.isWhiteSpace(a.charAt(e.index)) || "-" === a.charAt(e.index));) {
              "-" === a.charAt(e.index) ? f.startTie = {} : f = y(f), e.index++;
            }
            e = e.index - 1;
            l = "broken_rhythm";
          } else {
            if ("sharp2" === l) {
              f.accidental = "quartersharp", l = "pitch";
            } else {
              if ("flat2" === l) {
                f.accidental = "quarterflat", l = "pitch";
              } else {
                return "Zduration" === l ? (a = b.getNumber(a, e), f.duration = a.num, f.endChar = a.index, f) : null;
              }
            }
          }
          break;
        case "-":
          if ("startSlur" === l) {
            c.addTieToLastNote(), f.endTie = !0;
          } else {
            if ("octave" === l || "duration" === l || "end_slur" === l) {
              if (f.startTie = {}, !n && h) {
                l = "broken_rhythm";
              } else {
                return b.isWhiteSpace(a.charAt(e + 1)) && y(f), f.endChar = e + 1, f;
              }
            } else {
              return "broken_rhythm" === l ? (f.endChar = e, f) : null;
            }
          }
          break;
        case " ":
        ;
        case "\t":
          if (g(l)) {
            f.end_beam = !0;
            do {
              "-" === a.charAt(e) && (f.startTie = {}), e++;
            } while (e < a.length && (b.isWhiteSpace(a.charAt(e)) || "-" === a.charAt(e)));
            f.endChar = e;
            if (n || !h || "<" !== a.charAt(e) && ">" !== a.charAt(e)) {
              return f;
            }
            e--;
            l = "broken_rhythm";
          } else {
            return null;
          }
          break;
        case ">":
        ;
        case "<":
          if (g(l)) {
            if (h) {
              l = q(a, e), e += l[0] - 1, d.next_note_duration = l[2] * f.duration, f.duration *= l[1], l = "end_slur";
            } else {
              return f.endChar = e, f;
            }
          } else {
            return null;
          }
          break;
        default:
          return g(l) ? (f.endChar = e, f) : null;
      }
      e++;
      if (e === a.length) {
        if (g(l)) {
          return f.endChar = e, f;
        }
        break;
      }
    }
    return null;
  }, J = function(a, e) {
    if ("{" === a.charAt(e)) {
      var c = b.getBrackettedSubstring(a, e, 1, "}");
      c[2] || g("Missing the closing '}' while parsing grace note", a, e);
      ")" === a[e + c[0]] && (c[0]++, c[1] += ")");
      for (var d = [], f = 0, h = !1;f < c[1].length;) {
        var l = !1;
        "/" === c[1].charAt(f) && (l = !0, f++);
        var n = z(c[1], f, {}, !1);
        null !== n ? (l && (n.acciaccatura = !0), d.push(n), h && (n.endTie = !0, h = !1), n.startTie && (h = !0), f = n.endChar, delete n.endChar) : (" " === c[1].charAt(f) ? 0 < d.length && (d[d.length - 1].end_beam = !0) : g("Unknown character '" + c[1].charAt(f) + "' while parsing grace note", a, e), f++);
      }
      if (d.length) {
        return[c[0], d];
      }
    }
    return[0];
  }, L = function(h) {
    e.resolveTempo();
    d.is_in_header = !1;
    for (var l = 0, k = d.iChar;b.isWhiteSpace(h.charAt(l)) && l < h.length;) {
      l++;
    }
    if (l !== h.length && "%" !== h.charAt(l)) {
      var v = d.start_new_line;
      d.start_new_line = void 0 === d.continueall ? !0 : !1;
      var B = 0, t = e.letter_to_body_header(h, l);
      0 < t[0] && (l += t[0]);
      for (t = {};l < h.length;) {
        var A = l;
        if ("%" === h.charAt(l)) {
          break;
        }
        var x = e.letter_to_inline_header(h, l);
        if (0 < x[0]) {
          l += x[0];
        } else {
          v && (a(), v = !1);
          for (;;) {
            if (x = b.eatWhiteSpace(h, l), 0 < x && (l += x), 0 < l && "\u0012" === h.charAt(l - 1) && (x = e.letter_to_body_header(h, l), 0 < x[0] && (l = x[0], d.start_new_line = !1)), x = m(h, l), 0 < x[0] && (l += x[0]), x = f(h, l), 0 < x[0]) {
              t.chord || (t.chord = []);
              for (var C = b.translateString(x[1]), C = C.replace(/;/g, "\n"), D = !1, L = 0;L < t.chord.length;L++) {
                t.chord[L].position === x[2] && (D = !0, t.chord[L].name += "\n" + C);
              }
              !1 === D && (null === x[2] && x[3] ? t.chord.push({name:C, rel_position:x[3]}) : t.chord.push({name:C, position:x[2]}));
              l += x[0];
              x = b.skipWhiteSpace(h.substring(l));
              0 < x && (t.force_end_beam_last = !0);
              l += x;
            } else {
              if (x = -1 === "ABCDEFGabcdefgxyzZ[]|^_{".indexOf(h.charAt(l)) ? n(h, l) : [0], 0 < x[0]) {
                null === x[1] ? l + 1 < h.length && a() : 0 < x[1].length && (void 0 === t.decoration && (t.decoration = []), t.decoration.push(x[1])), l += x[0];
              } else {
                if (x = J(h, l), 0 < x[0]) {
                  t.gracenotes = x[1], l += x[0];
                } else {
                  break;
                }
              }
            }
          }
          x = r(h, l);
          if (0 < x[0]) {
            void 0 !== t.gracenotes && (t.rest = {type:"spacer"}, t.duration = .125, c.appendElement("note", k + l, k + l + x[0], t), d.measureNotEmpty = !0, t = {}), A = {type:x[1]}, 0 === A.type.length ? g("Unknown bar type", h, l) : (d.inEnding && "bar_thin" !== A.type && (A.endEnding = !0, d.inEnding = !1), x[2] && (A.startEnding = x[2], d.inEnding && (A.endEnding = !0), d.inEnding = !0), void 0 !== t.decoration && (A.decoration = t.decoration), void 0 !== t.chord && (A.chord = t.chord), A.startEnding && 
            void 0 === d.barFirstEndingNum ? d.barFirstEndingNum = d.currBarNumber : A.startEnding && A.endEnding && d.barFirstEndingNum ? d.currBarNumber = d.barFirstEndingNum : A.endEnding && (d.barFirstEndingNum = void 0), "bar_invisible" !== A.type && d.measureNotEmpty && (d.currBarNumber++, d.barNumbers && 0 === d.currBarNumber % d.barNumbers && (d.barNumOnNextNote = d.currBarNumber)), c.appendElement("bar", k + l, k + l + x[0], A), d.measureNotEmpty = !1, t = {}), l += x[0];
          } else {
            if ("&" === h[l]) {
              g("Overlay not yet supported", h, l), l++;
            } else {
              x = s(h, l);
              0 < x.consumed && (void 0 !== x.startSlur && (t.startSlur = x.startSlur), void 0 !== x.triplet && (0 < B ? g("Can't nest triplets", h, l) : (t.startTriplet = x.triplet, B = void 0 === x.num_notes ? x.triplet : x.num_notes)), l += x.consumed);
              if ("[" === h.charAt(l)) {
                for (l++, x = null, C = !1;!C;) {
                  if (D = z(h, l, {}, !1), null !== D) {
                    D.end_beam && (t.end_beam = !0, delete D.end_beam), void 0 === t.pitches ? (t.duration = D.duration, t.pitches = [D]) : t.pitches.push(D), delete D.duration, d.inTieChord[t.pitches.length] && (D.endTie = !0, d.inTieChord[t.pitches.length] = void 0), D.startTie && (d.inTieChord[t.pitches.length] = !0), l = D.endChar, delete D.endChar;
                  } else {
                    if (" " === h.charAt(l)) {
                      g("Spaces are not allowed in chords", h, l), l++;
                    } else {
                      if (l < h.length && "]" === h.charAt(l)) {
                        for (l++, 0 !== d.next_note_duration && (t.duration *= d.next_note_duration, d.next_note_duration = 0), d.inTie && (window.ABCJS.parse.each(t.pitches, function(a) {
                          a.endTie = !0;
                        }), d.inTie = !1), 0 < B && (B--, 0 === B && (t.endTriplet = !0)), C = !1;l < h.length && !C;) {
                          switch(h.charAt(l)) {
                            case " ":
                            ;
                            case "\t":
                              y(t);
                              break;
                            case ")":
                              void 0 === t.endSlur ? t.endSlur = 1 : t.endSlur++;
                              break;
                            case "-":
                              window.ABCJS.parse.each(t.pitches, function(a) {
                                a.startTie = {};
                              });
                              d.inTie = !0;
                              break;
                            case ">":
                            ;
                            case "<":
                              x = q(h, l);
                              l += x[0] - 1;
                              d.next_note_duration = x[2];
                              x = x[1];
                              break;
                            case "1":
                            ;
                            case "2":
                            ;
                            case "3":
                            ;
                            case "4":
                            ;
                            case "5":
                            ;
                            case "6":
                            ;
                            case "7":
                            ;
                            case "8":
                            ;
                            case "9":
                            ;
                            case "/":
                              l = b.getFraction(h, l);
                              x = l.value;
                              l = l.index;
                              "-" === h.charAt(l) || ")" === h.charAt(l) ? l-- : C = !0;
                              break;
                            default:
                              C = !0;
                          }
                          C || l++;
                        }
                      } else {
                        g("Expected ']' to end the chords", h, l);
                      }
                      void 0 !== t.pitches && (null !== x && (t.duration *= x), d.barNumOnNextNote && (t.barNumber = d.barNumOnNextNote, d.barNumOnNextNote = null), c.appendElement("note", k + l, k + l, t), d.measureNotEmpty = !0, t = {});
                      C = !0;
                    }
                  }
                }
              } else {
                if (x = {}, C = z(h, l, x, !0), void 0 !== x.endTie && (d.inTie = !0), null !== C) {
                  void 0 !== C.pitch ? (t.pitches = [{}], void 0 !== C.accidental && (t.pitches[0].accidental = C.accidental), t.pitches[0].pitch = C.pitch, void 0 !== C.endSlur && (t.pitches[0].endSlur = C.endSlur), void 0 !== C.endTie && (t.pitches[0].endTie = C.endTie), void 0 !== C.startSlur && (t.pitches[0].startSlur = C.startSlur), void 0 !== t.startSlur && (t.pitches[0].startSlur = t.startSlur), void 0 !== C.startTie && (t.pitches[0].startTie = C.startTie), void 0 !== t.startTie && (t.pitches[0].startTie = 
                  t.startTie)) : (t.rest = C.rest, void 0 !== C.endSlur && (t.endSlur = C.endSlur), void 0 !== C.endTie && (t.rest.endTie = C.endTie), void 0 !== C.startSlur && (t.startSlur = C.startSlur), void 0 !== C.startTie && (t.rest.startTie = C.startTie), void 0 !== t.startTie && (t.rest.startTie = t.startTie));
                  void 0 !== C.chord && (t.chord = C.chord);
                  void 0 !== C.duration && (t.duration = C.duration);
                  void 0 !== C.decoration && (t.decoration = C.decoration);
                  void 0 !== C.graceNotes && (t.graceNotes = C.graceNotes);
                  delete t.startSlur;
                  d.inTie && (void 0 !== t.pitches ? t.pitches[0].endTie = !0 : t.rest.endTie = !0, d.inTie = !1);
                  if (C.startTie || t.startTie) {
                    d.inTie = !0;
                  }
                  l = C.endChar;
                  0 < B && (B--, 0 === B && (t.endTriplet = !0));
                  C.end_beam && y(t);
                  d.barNumOnNextNote && (t.barNumber = d.barNumOnNextNote, d.barNumOnNextNote = null);
                  c.appendElement("note", k + A, k + l, t);
                  d.measureNotEmpty = !0;
                  t = {};
                }
              }
              l === A && (" " !== h.charAt(l) && "`" !== h.charAt(l) && g("Unknown character ignored", h, l), l++);
            }
          }
        }
      }
    }
  }, R = function(b) {
    var f = e.parseHeader(b);
    f.regular && L(f.str);
    f.newline && void 0 === d.continueall && a();
    f.words && v(c.getCurrentVoice(), b.substring(2));
    f.symbols && B(c.getCurrentVoice(), b.substring(2));
    f.recurse && R(f.str);
  };
  this.parse = function(a, f) {
    c.reset();
    f && f.print && (c.media = "print");
    d.reset();
    e.reset(b, g, d, c);
    a = window.ABCJS.parse.gsub(a, "\r\n", "\n");
    a = window.ABCJS.parse.gsub(a, "\r", "\n");
    a = (a + "\n").replace(/\n\\.*\n/g, "\n");
    a = a.replace(/\\([ \t]*)(%.*)*\n/g, function(a, b, e) {
      a = e ? "                                                                                                                                                                                                     ".substring(0, e.length) : "";
      return b + " \u0012" + a;
    });
    var h = a.split("\n");
    0 === window.ABCJS.parse.last(h).length && h.pop();
    try {
      window.ABCJS.parse.each(h, function(a) {
        if (f) {
          if (f.header_only && !1 === d.is_in_header) {
            throw "normal_abort";
          }
          if (f.stop_on_warning && d.warnings) {
            throw "normal_abort";
          }
        }
        d.is_in_history ? ":" === a.charAt(1) ? (d.is_in_history = !1, R(a)) : c.addMetaText("history", b.translateString(b.stripComment(a))) : d.inTextBlock ? window.ABCJS.parse.startsWith(a, "%%endtext") ? (c.addText(d.textBlock), d.inTextBlock = !1) : window.ABCJS.parse.startsWith(a, "%%") ? d.textBlock += " " + a.substring(2) : d.textBlock += " " + a : d.inPsBlock ? window.ABCJS.parse.startsWith(a, "%%endps") ? d.inPsBlock = !1 : d.textBlock += " " + a : R(a);
        d.iChar += a.length + 1;
      });
      var h = 792, l = 612;
      switch(d.papersize) {
        case "legal":
          h = 1008;
          l = 612;
          break;
        case "A4":
          h = 842.4, l = 597.6;
      }
      if (d.landscape) {
        var n = h, h = l, l = n
      }
      c.cleanUp(l, h, d.barsperstaff, d.staffnonote);
    } catch (m) {
      if ("normal_abort" !== m) {
        throw m;
      }
    }
  };
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.parse || (window.ABCJS.parse = {});
window.ABCJS.parse.parseDirective = {};
(function() {
  var a, c, b, d;
  window.ABCJS.parse.parseDirective.initialize = function(k, g, e, f) {
    a = k;
    c = g;
    b = e;
    d = f;
  };
  window.ABCJS.parse.parseDirective.parseFontChangeLine = function(a) {
    var c = a.split("$");
    if (1 < c.length && b.setfont) {
      for (var e = [{text:c[0]}], d = 1;d < c.length;d++) {
        "0" === c[d].charAt(0) ? e.push({text:c[d].substring(1)}) : "1" === c[d].charAt(0) && b.setfont[1] ? e.push({font:b.setfont[1], text:c[d].substring(1)}) : "2" === c[d].charAt(0) && b.setfont[2] ? e.push({font:b.setfont[2], text:c[d].substring(1)}) : "3" === c[d].charAt(0) && b.setfont[3] ? e.push({font:b.setfont[3], text:c[d].substring(1)}) : "4" === c[d].charAt(0) && b.setfont[4] ? e.push({font:b.setfont[4], text:c[d].substring(1)}) : e[e.length - 1].text += "$" + c[d];
      }
      if (1 < e.length) {
        return e;
      }
    }
    return a;
  };
  window.ABCJS.parse.parseDirective.addDirective = function(k) {
    var g = function(b, e) {
      var c = a.getMeasurement(e);
      return 0 === c.used || 0 !== e.length ? {error:'Directive "' + b + '" requires a measurement as a parameter.'} : c.value;
    }, e = function(b, e) {
      var c = a.getMeasurement(e);
      if (0 === c.used || 0 !== e.length) {
        return'Directive "' + b + '" requires a measurement as a parameter.';
      }
      d.formatting[b] = c.value;
      return null;
    }, f = function(a) {
      var b = {}, e = window.ABCJS.parse.last(a);
      "number" === e.type && (b.size = parseInt(e.token), a.pop());
      if (0 < a.length) {
        var c = "";
        window.ABCJS.parse.each(a, function(a) {
          "-" !== a.token && (0 < c.length && (c += " "), c += a.token);
        });
        b.font = c;
      }
      return b;
    }, h = function(a, b) {
      if (0 === b.length) {
        return'Directive "' + a + '" requires a font as a parameter.';
      }
      d.formatting[a] = f(b);
      return null;
    }, l = function(a, e, c, d, f) {
      if (1 !== c.length || "number" !== c[0].type) {
        return'Directive "' + e + '" requires a number as a parameter.';
      }
      c = c[0].intt;
      if (void 0 !== d && c < d) {
        return'Directive "' + e + '" requires a number greater than or equal to ' + d + " as a parameter.";
      }
      if (void 0 !== f && c > f) {
        return'Directive "' + e + '" requires a number less than or equal to ' + f + " as a parameter.";
      }
      b[a] = c;
      return null;
    }, n = function(a, e, c) {
      e = l(a, e, c, 0, 1);
      if (null !== e) {
        return e;
      }
      b[a] = 1 === b[a];
      return null;
    }, m = a.tokenize(k, 0, k.length);
    if (0 === m.length || "alpha" !== m[0].type) {
      return null;
    }
    var r = k.substring(k.indexOf(m[0].token) + m[0].token.length), r = a.stripComment(r), s = m.shift().token.toLowerCase(), v = "";
    switch(s) {
      case "bagpipes":
        d.formatting.bagpipes = !0;
        break;
      case "landscape":
        b.landscape = !0;
        break;
      case "papersize":
        b.papersize = r;
        break;
      case "slurgraces":
        d.formatting.slurgraces = !0;
        break;
      case "stretchlast":
        d.formatting.stretchlast = !0;
        break;
      case "titlecaps":
        b.titlecaps = !0;
        break;
      case "titleleft":
        d.formatting.titleleft = !0;
        break;
      case "measurebox":
        d.formatting.measurebox = !0;
        break;
      case "botmargin":
      ;
      case "botspace":
      ;
      case "composerspace":
      ;
      case "indent":
      ;
      case "leftmargin":
      ;
      case "linesep":
      ;
      case "musicspace":
      ;
      case "partsspace":
      ;
      case "pageheight":
      ;
      case "pagewidth":
      ;
      case "rightmargin":
      ;
      case "staffsep":
      ;
      case "staffwidth":
      ;
      case "subtitlespace":
      ;
      case "sysstaffsep":
      ;
      case "systemsep":
      ;
      case "textspace":
      ;
      case "titlespace":
      ;
      case "topmargin":
      ;
      case "topspace":
      ;
      case "vocalspace":
      ;
      case "wordsspace":
        return e(s, m);
      case "vskip":
        s = g(s, m);
        if (s.error) {
          return s.error;
        }
        d.addSpacing(s);
        break;
      case "scale":
        v = "";
        window.ABCJS.parse.each(m, function(a) {
          v += a.token;
        });
        m = parseFloat(v);
        if (isNaN(m) || 0 === m) {
          return'Directive "' + s + '" requires a number as a parameter.';
        }
        d.formatting.scale = m;
        break;
      case "sep":
        if (0 === m.length) {
          d.addSeparator();
        } else {
          k = a.getMeasurement(m);
          if (0 === k.used) {
            return'Directive "' + s + '" requires 3 numbers: space above, space below, length of line';
          }
          r = k.value;
          k = a.getMeasurement(m);
          if (0 === k.used) {
            return'Directive "' + s + '" requires 3 numbers: space above, space below, length of line';
          }
          g = k.value;
          k = a.getMeasurement(m);
          if (0 === k.used || 0 !== m.length) {
            return'Directive "' + s + '" requires 3 numbers: space above, space below, length of line';
          }
          d.addSeparator(r, g, k.value);
        }
        break;
      case "barsperstaff":
        v = l("barsperstaff", s, m);
        if (null !== v) {
          return v;
        }
        break;
      case "staffnonote":
        v = n("staffnonote", s, m);
        if (null !== v) {
          return v;
        }
        break;
      case "printtempo":
        v = n("printTempo", s, m);
        if (null !== v) {
          return v;
        }
        break;
      case "measurenb":
      ;
      case "barnumbers":
        v = l("barNumbers", s, m);
        if (null !== v) {
          return v;
        }
        break;
      case "begintext":
        b.inTextBlock = !0;
        break;
      case "continueall":
        b.continueall = !0;
        break;
      case "beginps":
        b.inPsBlock = !0;
        c("Postscript ignored", k, 0);
        break;
      case "deco":
        0 < r.length && b.ignoredDecorations.push(r.substring(0, r.indexOf(" ")));
        c("Decoration redefinition ignored", k, 0);
        break;
      case "text":
        s = a.translateString(r);
        d.addText(window.ABCJS.parse.parseDirective.parseFontChangeLine(s));
        break;
      case "center":
        s = a.translateString(r);
        d.addCentered(window.ABCJS.parse.parseDirective.parseFontChangeLine(s));
        break;
      case "font":
        break;
      case "setfont":
        m = a.tokenize(r, 0, r.length);
        g = !1;
        if (4 <= m.length && "-" === m[0].token && "number" === m[1].type && (k = parseInt(m[1].token), 1 <= k && 4 >= k && (b.setfont || (b.setfont = []), r = m.pop(), "number" === r.type))) {
          r = parseInt(r.token);
          g = "";
          for (e = 2;e < m.length;e++) {
            g += m[e].token;
          }
          b.setfont[k] = {font:g, size:r};
          g = !0;
        }
        if (!g) {
          return "Bad parameters: " + s;
        }
        break;
      case "gchordfont":
      ;
      case "partsfont":
      ;
      case "vocalfont":
      ;
      case "textfont":
        return 0 === m.length ? s = 'Directive "' + s + '" requires a font as a parameter.' : (b[s] = f(m), s = null), s;
      case "barlabelfont":
      ;
      case "barnumberfont":
      ;
      case "composerfont":
      ;
      case "subtitlefont":
      ;
      case "tempofont":
      ;
      case "titlefont":
      ;
      case "voicefont":
        return h(s, m);
      case "barnumfont":
        return h("barnumberfont", m);
      case "staves":
      ;
      case "score":
        b.score_is_present = !0;
        for (var r = function(a, e, c, d, f) {
          (e || 0 === b.staves.length) && b.staves.push({index:b.staves.length, numVoices:0});
          e = window.ABCJS.parse.last(b.staves);
          void 0 !== c && (e.bracket = c);
          void 0 !== d && (e.brace = d);
          f && (e.connectBarLines = "end");
          void 0 === b.voices[a] && (b.voices[a] = {staffNum:e.index, index:e.numVoices}, e.numVoices++);
        }, B = n = h = e = g = !1, q = !1, y = !1, A, D = function() {
          y = !0;
          if (A) {
            var a = "start";
            0 < A.staffNum && ("start" === b.staves[A.staffNum - 1].connectBarLines || "continue" === b.staves[A.staffNum - 1].connectBarLines) && (a = "continue");
            b.staves[A.staffNum].connectBarLines = a;
          }
        };m.length;) {
          var z = m.shift();
          switch(z.token) {
            case "(":
              g ? c("Can't nest parenthesis in %%score", k, z.start) : n = g = !0;
              break;
            case ")":
              !g || n ? c("Unexpected close parenthesis in %%score", k, z.start) : g = !1;
              break;
            case "[":
              e ? c("Can't nest brackets in %%score", k, z.start) : B = e = !0;
              break;
            case "]":
              !e || B ? c("Unexpected close bracket in %%score", k, z.start) : (e = !1, b.staves[A.staffNum].bracket = "end");
              break;
            case "{":
              h ? c("Can't nest braces in %%score", k, z.start) : q = h = !0;
              break;
            case "}":
              !h || q ? c("Unexpected close brace in %%score", k, z.start) : (h = !1, b.staves[A.staffNum].brace = "end");
              break;
            case "|":
              D();
              break;
            default:
              for (var J = "";"alpha" === z.type || "number" === z.type;) {
                if (J += z.token, z.continueId) {
                  z = m.shift();
                } else {
                  break;
                }
              }
              r(J, !g || n, B ? "start" : e ? "continue" : void 0, q ? "start" : h ? "continue" : void 0, y);
              y = q = B = n = !1;
              A = b.voices[J];
              "staves" === s && D();
          }
        }
        break;
      case "newpage":
        s = a.getInt(r);
        d.addNewPage(0 === s.digits ? -1 : s.value);
        break;
      case "abc-copyright":
      ;
      case "abc-creator":
      ;
      case "abc-version":
      ;
      case "abc-charset":
      ;
      case "abc-edited-by":
        d.addMetaText(s, r);
        break;
      case "header":
      ;
      case "footer":
        m = a.getMeat(r, 0, r.length);
        m = r.substring(m.start, m.end);
        '"' === m.charAt(0) && '"' === m.charAt(m.length - 1) && (m = m.substring(1, m.length - 2));
        m = m.split("\t");
        k = {};
        k = 1 === m.length ? {left:"", center:m[0], right:""} : 2 === m.length ? {left:m[0], center:m[1], right:""} : {left:m[0], center:m[1], right:m[2]};
        3 < m.length && c("Too many tabs in " + s + ": " + m.length + " found.", r, 0);
        d.addMetaTextObj(s, k);
        break;
      case "midi":
        k = a.tokenize(r, 0, r.length);
        0 < k.length && "=" === k[0].token && k.shift();
        if (0 === k.length) {
          c("Expected midi command", r, 0);
        } else {
          e = function(a) {
            if (0 < a.length) {
              a = a.shift();
              var b = a.token;
              "number" === a.type && (b = a.intt);
              return b;
            }
            return null;
          };
          void 0 === d.formatting[s] && (d.formatting[s] = {});
          m = k.shift().token;
          r = !0;
          if ("program" === m) {
            if (g = e(k)) {
              r = (k = e(k)) ? {channel:g, program:k} : {program:g};
            }
          } else {
            k = e(k), null !== k && (r = k);
          }
          d.formatting[s][m] = r;
        }
        break;
      case "playtempo":
      ;
      case "auquality":
      ;
      case "continuous":
      ;
      case "nobarcheck":
        d.formatting[s] = r;
        break;
      default:
        return "Unknown directive: " + s;
    }
    return null;
  };
})();
window.ABCJS || (window.ABCJS = {});
window.ABCJS.parse || (window.ABCJS.parse = {});
window.ABCJS.parse.ParseHeader = function(a, c, b, d) {
  this.reset = function(a, b, c, d) {
    window.ABCJS.parse.parseKeyVoice.initialize(a, b, c, d);
    window.ABCJS.parse.parseDirective.initialize(a, b, c, d);
  };
  this.reset(a, c, b, d);
  this.setTitle = function(c) {
    b.hasMainTitle ? d.addSubtitle(a.translateString(a.stripComment(c))) : (d.addMetaText("title", a.translateString(a.theReverser(a.stripComment(c)))), b.hasMainTitle = !0);
  };
  this.setMeter = function(d) {
    d = a.stripComment(d);
    if ("C" === d) {
      return!0 === b.havent_set_length && (b.default_length = .125), {type:"common_time"};
    }
    if ("C|" === d) {
      return!0 === b.havent_set_length && (b.default_length = .125), {type:"cut_time"};
    }
    if ("o" === d) {
      return!0 === b.havent_set_length && (b.default_length = .125), {type:"tempus_perfectum"};
    }
    if ("c" === d) {
      return!0 === b.havent_set_length && (b.default_length = .125), {type:"tempus_imperfectum"};
    }
    if ("o." === d) {
      return!0 === b.havent_set_length && (b.default_length = .125), {type:"tempus_perfectum_prolatio"};
    }
    if ("c." === d) {
      return!0 === b.havent_set_length && (b.default_length = .125), {type:"tempus_imperfectum_prolatio"};
    }
    if (0 === d.length || "none" === d.toLowerCase()) {
      !0 === b.havent_set_length && (b.default_length = .125);
    } else {
      var e = a.tokenize(d, 0, d.length);
      try {
        if (0 === e.length) {
          throw "Expected meter definition in M: line";
        }
        for (var f = {type:"specified", value:[]}, h = 0;;) {
          var l;
          var n = {value:0, num:""}, m = e.shift();
          for ("(" === m.token && (m = e.shift());;) {
            if ("number" !== m.type) {
              throw "Expected top number of meter";
            }
            n.value += parseInt(m.token);
            n.num += m.token;
            if (0 === e.length || "/" === e[0].token) {
              break;
            }
            m = e.shift();
            if (")" === m.token) {
              if (0 === e.length || "/" === e[0].token) {
                break;
              }
              throw "Unexpected paren in meter";
            }
            if ("." !== m.token && "+" !== m.token) {
              throw "Expected top number of meter";
            }
            n.num += m.token;
            if (0 === e.length) {
              throw "Expected top number of meter";
            }
            m = e.shift();
          }
          if (0 !== e.length) {
            var k = e.shift();
            if ("/" !== k.token) {
              throw "Expected slash in meter";
            }
            k = e.shift();
            if ("number" !== k.type) {
              throw "Expected bottom number of meter";
            }
            n.den = k.token;
            n.value /= parseInt(n.den);
          }
          l = n;
          var h = h + l.value, s = {num:l.num};
          void 0 !== l.den && (s.den = l.den);
          f.value.push(s);
          if (0 === e.length) {
            break;
          }
        }
        !0 === b.havent_set_length && (b.default_length = .75 > h ? .0625 : .125);
        return f;
      } catch (v) {
        c(v, d, 0);
      }
    }
    return null;
  };
  this.calcTempo = function(a) {
    var e = .25;
    b.meter && "specified" === b.meter.type ? e = 1 / parseInt(b.meter.value[0].den) : b.origMeter && "specified" === b.origMeter.type && (e = 1 / parseInt(b.origMeter.value[0].den));
    for (var c = 0;c < a.duration;c++) {
      a.duration[c] *= e;
    }
    return a;
  };
  this.resolveTempo = function() {
    b.tempo && (this.calcTempo(b.tempo), d.metaText.tempo = b.tempo, delete b.tempo);
  };
  this.addUserDefinition = function(a, e, d) {
    var h = a.indexOf("=", e);
    -1 === h ? c("Need an = in a macro definition", a, e) : (d = window.ABCJS.parse.strip(a.substring(e, h)), h = window.ABCJS.parse.strip(a.substring(h + 1)), 1 !== d.length ? c("Macro definitions can only be one character", a, e) : -1 === "HIJKLMNOPQRSTUVWXYhijklmnopqrstuvw~".indexOf(d) ? c("Macro definitions must be H-Y, h-w, or tilde", a, e) : 0 === h.length ? c("Missing macro definition", a, e) : (void 0 === b.macros && (b.macros = {}), b.macros[d] = h));
  };
  this.setDefaultLength = function(a, e, c) {
    e = window.ABCJS.parse.gsub(a.substring(e, c), " ", "").split("/");
    2 === e.length && (a = parseInt(e[0]), e = parseInt(e[1]), 0 < e && (b.default_length = a / e, b.havent_set_length = !1));
  };
  this.setTempo = function(d, e, f) {
    try {
      var h = a.tokenize(d, e, f);
      if (0 === h.length) {
        throw "Missing parameter in Q: field";
      }
      f = {};
      var l = !0, n = h.shift();
      if ("quote" === n.type && (f.preString = n.token, n = h.shift(), 0 === h.length)) {
        return{type:"immediate", tempo:f};
      }
      if ("alpha" === n.type && "C" === n.token) {
        if (0 === h.length) {
          throw "Missing tempo after C in Q: field";
        }
        n = h.shift();
        if ("punct" === n.type && "=" === n.token) {
          if (0 === h.length) {
            throw "Missing tempo after = in Q: field";
          }
          n = h.shift();
          if ("number" !== n.type) {
            throw "Expected number after = in Q: field";
          }
          f.duration = [1];
          f.bpm = parseInt(n.token);
        } else {
          if ("number" === n.type) {
            f.duration = [parseInt(n.token)];
            if (0 === h.length) {
              throw "Missing = after duration in Q: field";
            }
            n = h.shift();
            if ("punct" !== n.type || "=" !== n.token) {
              throw "Expected = after duration in Q: field";
            }
            if (0 === h.length) {
              throw "Missing tempo after = in Q: field";
            }
            n = h.shift();
            if ("number" !== n.type) {
              throw "Expected number after = in Q: field";
            }
            f.bpm = parseInt(n.token);
          } else {
            throw "Expected number or equal after C in Q: field";
          }
        }
      } else {
        if ("number" === n.type) {
          var m = parseInt(n.token);
          if (0 === h.length || "quote" === h[0].type) {
            f.duration = [1], f.bpm = m;
          } else {
            l = !1;
            n = h.shift();
            if ("punct" !== n.type && "/" !== n.token) {
              throw "Expected fraction in Q: field";
            }
            n = h.shift();
            if ("number" !== n.type) {
              throw "Expected fraction in Q: field";
            }
            var k = parseInt(n.token);
            for (f.duration = [m / k];0 < h.length && "=" !== h[0].token && "quote" !== h[0].type;) {
              n = h.shift();
              if ("number" !== n.type) {
                throw "Expected fraction in Q: field";
              }
              m = parseInt(n.token);
              n = h.shift();
              if ("punct" !== n.type && "/" !== n.token) {
                throw "Expected fraction in Q: field";
              }
              n = h.shift();
              if ("number" !== n.type) {
                throw "Expected fraction in Q: field";
              }
              k = parseInt(n.token);
              f.duration.push(m / k);
            }
            n = h.shift();
            if ("punct" !== n.type && "=" !== n.token) {
              throw "Expected = in Q: field";
            }
            n = h.shift();
            if ("number" !== n.type) {
              throw "Expected tempo in Q: field";
            }
            f.bpm = parseInt(n.token);
          }
        } else {
          throw "Unknown value in Q: field";
        }
      }
      if (0 !== h.length && (n = h.shift(), "quote" === n.type && (f.postString = n.token, h.shift()), 0 !== h.length)) {
        throw "Unexpected string at end of Q: field";
      }
      !1 === b.printTempo && (f.suppress = !0);
      return{type:l ? "delaySet" : "immediate", tempo:f};
    } catch (s) {
      return c(s, d, e), {type:"none"};
    }
  };
  this.letter_to_inline_header = function(g, e) {
    var f = a.eatWhiteSpace(g, e);
    e += f;
    if (g.length >= e + 5 && "[" === g.charAt(e) && ":" === g.charAt(e + 2)) {
      var h = g.indexOf("]", e);
      switch(g.substring(e, e + 3)) {
        case "[I:":
          var l = window.ABCJS.parse.parseDirective.addDirective(g.substring(e + 3, h));
          l && c(l, g, e);
          return[h - e + 1 + f];
        case "[M:":
          return l = this.setMeter(g.substring(e + 3, h)), d.hasBeginMusic() && l ? d.appendStartingElement("meter", -1, -1, l) : b.meter = l, [h - e + 1 + f];
        case "[K:":
          return l = window.ABCJS.parse.parseKeyVoice.parseKey(g.substring(e + 3, h)), l.foundClef && d.hasBeginMusic() && d.appendStartingElement("clef", -1, -1, b.clef), l.foundKey && d.hasBeginMusic() && d.appendStartingElement("key", -1, -1, window.ABCJS.parse.parseKeyVoice.fixKey(b.clef, b.key)), [h - e + 1 + f];
        case "[P:":
          return d.appendElement("part", -1, -1, {title:g.substring(e + 3, h)}), [h - e + 1 + f];
        case "[L:":
          return this.setDefaultLength(g, e + 3, h), [h - e + 1 + f];
        case "[Q:":
          if (0 < h) {
            return l = this.setTempo(g, e + 3, h), "delaySet" === l.type ? d.appendElement("tempo", -1, -1, this.calcTempo(l.tempo)) : "immediate" === l.type && d.appendElement("tempo", -1, -1, l.tempo), [h - e + 1 + f, g.charAt(e + 1), g.substring(e + 3, h)];
          }
          break;
        case "[V:":
          if (0 < h) {
            return window.ABCJS.parse.parseKeyVoice.parseVoice(g, e + 3, h), [h - e + 1 + f, g.charAt(e + 1), g.substring(e + 3, h)];
          }
        ;
      }
    }
    return[0];
  };
  this.letter_to_body_header = function(a, e) {
    if (a.length >= e + 3) {
      switch(a.substring(e, e + 2)) {
        case "I:":
          var f = window.ABCJS.parse.parseDirective.addDirective(a.substring(e + 2));
          f && c(f, a, e);
          return[a.length];
        case "M:":
          return f = this.setMeter(a.substring(e + 2)), d.hasBeginMusic() && f && d.appendStartingElement("meter", -1, -1, f), [a.length];
        case "K:":
          return f = window.ABCJS.parse.parseKeyVoice.parseKey(a.substring(e + 2)), f.foundClef && d.hasBeginMusic() && d.appendStartingElement("clef", -1, -1, b.clef), f.foundKey && d.hasBeginMusic() && d.appendStartingElement("key", -1, -1, window.ABCJS.parse.parseKeyVoice.fixKey(b.clef, b.key)), [a.length];
        case "P:":
          return d.hasBeginMusic() && d.appendElement("part", -1, -1, {title:a.substring(e + 2)}), [a.length];
        case "L:":
          return this.setDefaultLength(a, e + 2, a.length), [a.length];
        case "Q:":
          f = a.indexOf("\u0012", e + 2);
          -1 === f && (f = a.length);
          var h = this.setTempo(a, e + 2, f);
          "delaySet" === h.type ? d.appendElement("tempo", -1, -1, this.calcTempo(h.tempo)) : "immediate" === h.type && d.appendElement("tempo", -1, -1, h.tempo);
          return[f, a.charAt(e), window.ABCJS.parse.strip(a.substring(e + 2))];
        case "V:":
          return window.ABCJS.parse.parseKeyVoice.parseVoice(a, 2, a.length), [a.length, a.charAt(e), window.ABCJS.parse(a.substring(e + 2))];
      }
    }
    return[0];
  };
  var k = {A:"author", B:"book", C:"composer", D:"discography", F:"url", G:"group", I:"instruction", N:"notes", O:"origin", R:"rhythm", S:"source", W:"unalignedWords", Z:"transcription"};
  this.parseHeader = function(g) {
    if (window.ABCJS.parse.startsWith(g, "%%")) {
      var e = window.ABCJS.parse.parseDirective.addDirective(g.substring(2));
      e && c(e, g, 2);
      return{};
    }
    g = a.stripComment(g);
    if (0 === g.length) {
      return{};
    }
    if (2 <= g.length && ":" === g.charAt(1)) {
      e = "";
      0 <= g.indexOf("\u0012") && "w" !== g.charAt(0) && (e = g.substring(g.indexOf("\u0012") + 1), g = g.substring(0, g.indexOf("\u0012")));
      var f = k[g.charAt(0)];
      if (void 0 !== f) {
        return "unalignedWords" === f ? d.addMetaTextArray(f, window.ABCJS.parse.parseDirective.parseFontChangeLine(a.translateString(a.stripComment(g.substring(2))))) : d.addMetaText(f, a.translateString(a.stripComment(g.substring(2)))), {};
      }
      switch(g.charAt(0)) {
        case "H":
          d.addMetaText("history", a.translateString(a.stripComment(g.substring(2))));
          b.is_in_history = !0;
          break;
        case "K":
          this.resolveTempo();
          g = window.ABCJS.parse.parseKeyVoice.parseKey(g.substring(2));
          !b.is_in_header && d.hasBeginMusic() && (g.foundClef && d.appendStartingElement("clef", -1, -1, b.clef), g.foundKey && d.appendStartingElement("key", -1, -1, window.ABCJS.parse.parseKeyVoice.fixKey(b.clef, b.key)));
          b.is_in_header = !1;
          break;
        case "L":
          this.setDefaultLength(g, 2, g.length);
          break;
        case "M":
          b.origMeter = b.meter = this.setMeter(g.substring(2));
          break;
        case "P":
          b.is_in_header ? d.addMetaText("partOrder", a.translateString(a.stripComment(g.substring(2)))) : b.partForNextLine = a.translateString(a.stripComment(g.substring(2)));
          break;
        case "Q":
          g = this.setTempo(g, 2, g.length);
          "delaySet" === g.type ? b.tempo = g.tempo : "immediate" === g.type && (d.metaText.tempo = g.tempo);
          break;
        case "T":
          this.setTitle(g.substring(2));
          break;
        case "U":
          this.addUserDefinition(g, 2, g.length);
          break;
        case "V":
          window.ABCJS.parse.parseKeyVoice.parseVoice(g, 2, g.length);
          if (!b.is_in_header) {
            return{newline:!0};
          }
          break;
        case "s":
          return{symbols:!0};
        case "w":
          return{words:!0};
        case "X":
          break;
        case "E":
        ;
        case "m":
          c("Ignored header", g, 0);
          break;
        default:
          return e.length && (e = "\u0012" + e), {regular:!0, str:g + e};
      }
      return 0 < e.length ? {recurse:!0, str:e} : {};
    }
    return{regular:!0, str:g};
  };
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.parse || (window.ABCJS.parse = {});
window.ABCJS.parse.parseKeyVoice = {};
(function() {
  var a, c, b, d;
  window.ABCJS.parse.parseKeyVoice.initialize = function(e, f, g, m) {
    a = e;
    c = f;
    b = g;
    d = m;
  };
  window.ABCJS.parse.parseKeyVoice.standardKey = function(a) {
    var b = {acc:"sharp", note:"f"}, e = {acc:"sharp", note:"c"}, c = {acc:"sharp", note:"g"}, d = {acc:"sharp", note:"d"}, f = {acc:"sharp", note:"A"}, g = {acc:"sharp", note:"e"}, k = {acc:"sharp", note:"B"}, q = {acc:"flat", note:"B"}, y = {acc:"flat", note:"e"}, A = {acc:"flat", note:"A"}, D = {acc:"flat", note:"d"}, z = {acc:"flat", note:"G"}, J = {acc:"flat", note:"c"}, L = {acc:"flat", note:"F"};
    return{"C#":[b, e, c, d, f, g, k], "A#m":[b, e, c, d, f, g, k], "G#Mix":[b, e, c, d, f, g, k], "D#Dor":[b, e, c, d, f, g, k], "E#Phr":[b, e, c, d, f, g, k], "F#Lyd":[b, e, c, d, f, g, k], "B#Loc":[b, e, c, d, f, g, k], "F#":[b, e, c, d, f, g], "D#m":[b, e, c, d, f, g], "C#Mix":[b, e, c, d, f, g], "G#Dor":[b, e, c, d, f, g], "A#Phr":[b, e, c, d, f, g], BLyd:[b, e, c, d, f, g], "E#Loc":[b, e, c, d, f, g], B:[b, e, c, d, f], "G#m":[b, e, c, d, f], "F#Mix":[b, e, c, d, f], "C#Dor":[b, e, c, d, f], 
    "D#Phr":[b, e, c, d, f], ELyd:[b, e, c, d, f], "A#Loc":[b, e, c, d, f], E:[b, e, c, d], "C#m":[b, e, c, d], BMix:[b, e, c, d], "F#Dor":[b, e, c, d], "G#Phr":[b, e, c, d], ALyd:[b, e, c, d], "D#Loc":[b, e, c, d], A:[b, e, c], "F#m":[b, e, c], EMix:[b, e, c], BDor:[b, e, c], "C#Phr":[b, e, c], DLyd:[b, e, c], "G#Loc":[b, e, c], D:[b, e], Bm:[b, e], AMix:[b, e], EDor:[b, e], "F#Phr":[b, e], GLyd:[b, e], "C#Loc":[b, e], G:[b], Em:[b], DMix:[b], ADor:[b], BPhr:[b], CLyd:[b], "F#Loc":[b], C:[], Am:[], 
    GMix:[], DDor:[], EPhr:[], FLyd:[], BLoc:[], F:[q], Dm:[q], CMix:[q], GDor:[q], APhr:[q], BbLyd:[q], ELoc:[q], Bb:[q, y], Gm:[q, y], FMix:[q, y], CDor:[q, y], DPhr:[q, y], EbLyd:[q, y], ALoc:[q, y], Eb:[q, y, A], Cm:[q, y, A], BbMix:[q, y, A], FDor:[q, y, A], GPhr:[q, y, A], AbLyd:[q, y, A], DLoc:[q, y, A], Ab:[q, y, A, D], Fm:[q, y, A, D], EbMix:[q, y, A, D], BbDor:[q, y, A, D], CPhr:[q, y, A, D], DbLyd:[q, y, A, D], GLoc:[q, y, A, D], Db:[q, y, A, D, z], Bbm:[q, y, A, D, z], AbMix:[q, y, A, 
    D, z], EbDor:[q, y, A, D, z], FPhr:[q, y, A, D, z], GbLyd:[q, y, A, D, z], CLoc:[q, y, A, D, z], Gb:[q, y, A, D, z, J], Ebm:[q, y, A, D, z, J], DbMix:[q, y, A, D, z, J], AbDor:[q, y, A, D, z, J], BbPhr:[q, y, A, D, z, J], CbLyd:[q, y, A, D, z, J], FLoc:[q, y, A, D, z, J], Cb:[q, y, A, D, z, J, L], Abm:[q, y, A, D, z, J, L], GbMix:[q, y, A, D, z, J, L], DbDor:[q, y, A, D, z, J, L], EbPhr:[q, y, A, D, z, J, L], FbLyd:[q, y, A, D, z, J, L], BbLoc:[q, y, A, D, z, J, L], "A#":[q, y], "B#":[], "D#":[q, 
    y, A], "E#":[q], "G#":[q, y, A, D], Gbm:[b, e, c, d, f, g, k]}[a];
  };
  var k = {treble:{clef:"treble", pitch:4, mid:0}, "treble+8":{clef:"treble+8", pitch:4, mid:0}, "treble-8":{clef:"treble-8", pitch:4, mid:0}, treble1:{clef:"treble", pitch:2, mid:2}, treble2:{clef:"treble", pitch:4, mid:0}, treble3:{clef:"treble", pitch:6, mid:-2}, treble4:{clef:"treble", pitch:8, mid:-4}, treble5:{clef:"treble", pitch:10, mid:-6}, perc:{clef:"perc", pitch:6, mid:0}, none:{clef:"none", mid:0}, bass:{clef:"bass", pitch:8, mid:-12}, "bass+8":{clef:"bass+8", pitch:8, mid:-12}, "bass-8":{clef:"bass-8", 
  pitch:8, mid:-12}, "bass+16":{clef:"bass", pitch:8, mid:-12}, "bass-16":{clef:"bass", pitch:8, mid:-12}, bass1:{clef:"bass", pitch:2, mid:-6}, bass2:{clef:"bass", pitch:4, mid:-8}, bass3:{clef:"bass", pitch:6, mid:-10}, bass4:{clef:"bass", pitch:8, mid:-12}, bass5:{clef:"bass", pitch:10, mid:-14}, tenor:{clef:"alto", pitch:8, mid:-8}, tenor1:{clef:"alto", pitch:2, mid:-2}, tenor2:{clef:"alto", pitch:4, mid:-4}, tenor3:{clef:"alto", pitch:6, mid:-6}, tenor4:{clef:"alto", pitch:8, mid:-8}, tenor5:{clef:"alto", 
  pitch:10, mid:-10}, alto:{clef:"alto", pitch:6, mid:-6}, alto1:{clef:"alto", pitch:2, mid:-2}, alto2:{clef:"alto", pitch:4, mid:-4}, alto3:{clef:"alto", pitch:6, mid:-6}, alto4:{clef:"alto", pitch:8, mid:-8}, alto5:{clef:"alto", pitch:10, mid:-10}, "alto+8":{clef:"alto+8", pitch:6, mid:-6}, "alto-8":{clef:"alto-8", pitch:6, mid:-6}}, g = function(a, b) {
    var e = k[a];
    return(e ? e.mid : 0) + b;
  };
  window.ABCJS.parse.parseKeyVoice.fixClef = function(a) {
    var b = k[a.type];
    b && (a.clefPos = b.pitch, a.type = b.clef);
  };
  window.ABCJS.parse.parseKeyVoice.deepCopyKey = function(a) {
    var b = {accidentals:[], root:a.root, acc:a.acc, mode:a.mode};
    window.ABCJS.parse.each(a.accidentals, function(a) {
      b.accidentals.push(window.ABCJS.parse.clone(a));
    });
    return b;
  };
  var e = {A:5, B:6, C:0, D:1, E:2, F:3, G:4, a:12, b:13, c:7, d:8, e:9, f:10, g:11};
  window.ABCJS.parse.parseKeyVoice.addPosToKey = function(a, b) {
    var c = a.verticalPos;
    window.ABCJS.parse.each(b.accidentals, function(a) {
      var b = e[a.note], b = b - c;
      a.verticalPos = b;
    });
    b.impliedNaturals && window.ABCJS.parse.each(b.impliedNaturals, function(a) {
      var b = e[a.note], b = b - c;
      a.verticalPos = b;
    });
    -10 > c ? (window.ABCJS.parse.each(b.accidentals, function(a) {
      a.verticalPos -= 7;
      if (11 <= a.verticalPos || 10 === a.verticalPos && "flat" === a.acc) {
        a.verticalPos -= 7;
      }
      "A" === a.note && "sharp" === a.acc && (a.verticalPos -= 7);
      "G" !== a.note && "F" !== a.note || "flat" !== a.acc || (a.verticalPos -= 7);
    }), b.impliedNaturals && window.ABCJS.parse.each(b.impliedNaturals, function(a) {
      a.verticalPos -= 7;
      if (11 <= a.verticalPos || 10 === a.verticalPos && "flat" === a.acc) {
        a.verticalPos -= 7;
      }
      "A" === a.note && "sharp" === a.acc && (a.verticalPos -= 7);
      "G" !== a.note && "F" !== a.note || "flat" !== a.acc || (a.verticalPos -= 7);
    })) : -4 > c ? (window.ABCJS.parse.each(b.accidentals, function(a) {
      a.verticalPos -= 7;
      -8 !== c || "f" !== a.note && "g" !== a.note || "sharp" !== a.acc || (a.verticalPos -= 7);
    }), b.impliedNaturals && window.ABCJS.parse.each(b.impliedNaturals, function(a) {
      a.verticalPos -= 7;
      -8 !== c || "f" !== a.note && "g" !== a.note || "sharp" !== a.acc || (a.verticalPos -= 7);
    })) : 7 <= c && (window.ABCJS.parse.each(b.accidentals, function(a) {
      a.verticalPos += 7;
    }), b.impliedNaturals && window.ABCJS.parse.each(b.impliedNaturals, function(a) {
      a.verticalPos += 7;
    }));
  };
  window.ABCJS.parse.parseKeyVoice.fixKey = function(a, b) {
    var e = window.ABCJS.parse.clone(b);
    window.ABCJS.parse.parseKeyVoice.addPosToKey(a, e);
    return e;
  };
  var f = function(a) {
    for (var b = e[a.charAt(0)], c = 1;c < a.length;c++) {
      if ("," === a.charAt(c)) {
        b -= 7;
      } else {
        if ("," === a.charAt(c)) {
          b += 7;
        } else {
          break;
        }
      }
    }
    return{mid:b - 6, str:a.substring(c)};
  };
  window.ABCJS.parse.parseKeyVoice.parseKey = function(e) {
    0 === e.length && (e = "none");
    var d = a.tokenize(e, 0, e.length), f = {};
    switch(d[0].token) {
      case "HP":
        window.ABCJS.parse.parseDirective.addDirective("bagpipes");
        b.key = {root:"HP", accidentals:[], acc:"", mode:""};
        f.foundKey = !0;
        d.shift();
        break;
      case "Hp":
        window.ABCJS.parse.parseDirective.addDirective("bagpipes");
        b.key = {root:"Hp", accidentals:[{acc:"natural", note:"g"}, {acc:"sharp", note:"f"}, {acc:"sharp", note:"c"}], acc:"", mode:""};
        f.foundKey = !0;
        d.shift();
        break;
      case "none":
        b.key = {root:"none", accidentals:[], acc:"", mode:""};
        f.foundKey = !0;
        d.shift();
        break;
      default:
        var k = a.getKeyPitch(d[0].token);
        if (0 < k.len) {
          f.foundKey = !0;
          var r = "", s = "";
          1 < d[0].token.length ? d[0].token = d[0].token.substring(1) : d.shift();
          var v = k.token;
          if (0 < d.length) {
            var B = a.getSharpFlat(d[0].token);
            0 < B.len && (1 < d[0].token.length ? d[0].token = d[0].token.substring(1) : d.shift(), v += B.token, r = B.token);
            0 < d.length && (B = a.getMode(d[0].token), 0 < B.len && (d.shift(), v += B.token, s = B.token));
          }
          B = window.ABCJS.parse.parseKeyVoice.deepCopyKey(b.key);
          b.key = window.ABCJS.parse.parseKeyVoice.deepCopyKey({accidentals:window.ABCJS.parse.parseKeyVoice.standardKey(v)});
          b.key.root = k.token;
          b.key.acc = r;
          b.key.mode = s;
          if (B) {
            for (r = 0;r < b.key.accidentals.length;r++) {
              for (k = 0;k < B.accidentals.length;k++) {
                B.accidentals[k].note && b.key.accidentals[r].note.toLowerCase() === B.accidentals[k].note.toLowerCase() && (B.accidentals[k].note = null);
              }
            }
            for (k = 0;k < B.accidentals.length;k++) {
              B.accidentals[k].note && (b.key.impliedNaturals || (b.key.impliedNaturals = []), b.key.impliedNaturals.push({acc:"natural", note:B.accidentals[k].note}));
            }
          }
        }
      ;
    }
    if (0 === d.length) {
      return f;
    }
    "exp" === d[0].token && d.shift();
    if (0 === d.length) {
      return f;
    }
    "oct" === d[0].token && d.shift();
    if (0 === d.length) {
      return f;
    }
    k = a.getKeyAccidentals2(d);
    k.warn && c(k.warn, e, 0);
    if (k.accs) {
      f.foundKey || (f.foundKey = !0, b.key = {root:"none", acc:"", mode:"", accidentals:[]});
      r = k.accs;
      for (s = 0;s < r.length;s++) {
        "b" === r[s].note ? r[s].note = "B" : "a" === r[s].note ? r[s].note = "A" : "F" === r[s].note ? r[s].note = "f" : "E" === r[s].note ? r[s].note = "e" : "D" === r[s].note ? r[s].note = "d" : "C" === r[s].note ? r[s].note = "c" : "G" === r[s].note && "sharp" === r[s].acc ? r[s].note = "g" : "g" === r[s].note && "flat" === r[s].acc && (r[s].note = "G");
      }
      for (r = 0;r < k.accs.length;r++) {
        s = !1;
        for (v = 0;v < b.key.accidentals.length && !s;v++) {
          b.key.accidentals[v].note === k.accs[r].note && (s = !0, b.key.accidentals[v].acc = k.accs[r].acc);
        }
        if (!s && (b.key.accidentals.push(k.accs[r]), b.key.impliedNaturals)) {
          for (s = 0;s < b.key.impliedNaturals.length;s++) {
            b.key.impliedNaturals[s].note === k.accs[r].note && b.key.impliedNaturals.splice(s, 1);
          }
        }
      }
    }
    for (;0 < d.length;) {
      switch(d[0].token) {
        case "m":
        ;
        case "middle":
          d.shift();
          if (0 === d.length) {
            return c("Expected = after middle", e, 0), f;
          }
          k = d.shift();
          if ("=" !== k.token) {
            c("Expected = after middle", e, k.start);
            break;
          }
          if (0 === d.length) {
            return c("Expected parameter after middle=", e, 0), f;
          }
          k = a.getPitchFromTokens(d);
          k.warn && c(k.warn, e, 0);
          k.position && (b.clef.verticalPos = k.position - 6);
          break;
        case "transpose":
          d.shift();
          if (0 === d.length) {
            return c("Expected = after transpose", e, 0), f;
          }
          k = d.shift();
          if ("=" !== k.token) {
            c("Expected = after transpose", e, k.start);
            break;
          }
          if (0 === d.length) {
            return c("Expected parameter after transpose=", e, 0), f;
          }
          if ("number" !== d[0].type) {
            c("Expected number after transpose", e, d[0].start);
            break;
          }
          b.clef.transpose = d[0].intt;
          d.shift();
          break;
        case "stafflines":
          d.shift();
          if (0 === d.length) {
            return c("Expected = after stafflines", e, 0), f;
          }
          k = d.shift();
          if ("=" !== k.token) {
            c("Expected = after stafflines", e, k.start);
            break;
          }
          if (0 === d.length) {
            return c("Expected parameter after stafflines=", e, 0), f;
          }
          if ("number" !== d[0].type) {
            c("Expected number after stafflines", e, d[0].start);
            break;
          }
          b.clef.stafflines = d[0].intt;
          d.shift();
          break;
        case "staffscale":
          d.shift();
          if (0 === d.length) {
            return c("Expected = after staffscale", e, 0), f;
          }
          k = d.shift();
          if ("=" !== k.token) {
            c("Expected = after staffscale", e, k.start);
            break;
          }
          if (0 === d.length) {
            return c("Expected parameter after staffscale=", e, 0), f;
          }
          if ("number" !== d[0].type) {
            c("Expected number after staffscale", e, d[0].start);
            break;
          }
          b.clef.staffscale = d[0].floatt;
          d.shift();
          break;
        case "style":
          d.shift();
          if (0 === d.length) {
            return c("Expected = after style", e, 0), f;
          }
          k = d.shift();
          if ("=" !== k.token) {
            c("Expected = after style", e, k.start);
            break;
          }
          if (0 === d.length) {
            return c("Expected parameter after style=", e, 0), f;
          }
          switch(d[0].token) {
            case "normal":
            ;
            case "harmonic":
            ;
            case "rhythm":
            ;
            case "x":
              b.style = d[0].token;
              d.shift();
              break;
            default:
              c("error parsing style element: " + d[0].token, e, d[0].start);
          }
          break;
        case "clef":
          d.shift();
          if (0 === d.length) {
            return c("Expected = after clef", e, 0), f;
          }
          k = d.shift();
          if ("=" !== k.token) {
            c("Expected = after clef", e, k.start);
            break;
          }
          if (0 === d.length) {
            return c("Expected parameter after clef=", e, 0), f;
          }
        ;
        case "treble":
        ;
        case "bass":
        ;
        case "alto":
        ;
        case "tenor":
        ;
        case "perc":
          k = d.shift();
          switch(k.token) {
            case "treble":
            ;
            case "tenor":
            ;
            case "alto":
            ;
            case "bass":
            ;
            case "perc":
            ;
            case "none":
              break;
            case "C":
              k.token = "alto";
              break;
            case "F":
              k.token = "bass";
              break;
            case "G":
              k.token = "treble";
              break;
            case "c":
              k.token = "alto";
              break;
            case "f":
              k.token = "bass";
              break;
            case "g":
              k.token = "treble";
              break;
            default:
              c("Expected clef name. Found " + k.token, e, k.start);
          }
          0 < d.length && "number" === d[0].type && (k.token += d[0].token, d.shift());
          1 < d.length && ("-" === d[0].token || "+" === d[0].token) && "8" === d[1].token && (k.token += d[0].token + d[1].token, d.shift(), d.shift());
          b.clef = {type:k.token, verticalPos:g(k.token, 0)};
          f.foundClef = !0;
          break;
        default:
          c("Unknown parameter: " + d[0].token, e, d[0].start), d.shift();
      }
    }
    return f;
  };
  window.ABCJS.parse.parseKeyVoice.parseVoice = function(e, l, k) {
    l = a.getMeat(e, l, k);
    var m = l.start, r = l.end;
    l = a.getToken(e, m, r);
    if (0 === l.length) {
      c("Expected a voice id", e, m);
    } else {
      k = !1;
      void 0 === b.voices[l] && (b.voices[l] = {}, k = !0, b.score_is_present && c("Can't have an unknown V: id when the %score directive is present", e, m));
      var m = m + l.length, m = m + a.eatWhiteSpace(e, m), s = {startStaff:k};
      k = function(b) {
        var d = a.getVoiceToken(e, m, r);
        void 0 !== d.warn ? c("Expected value for " + b + " in voice: " + d.warn, e, m) : 0 === d.token.length && '"' !== e.charAt(m) ? c("Expected value for " + b + " in voice", e, m) : s[b] = d.token;
        m += d.len;
      };
      for (var v = function(d, f, g) {
        var l = a.getVoiceToken(e, m, r);
        void 0 !== l.warn ? c("Expected value for " + f + " in voice: " + l.warn, e, m) : 0 === l.token.length && '"' !== e.charAt(m) ? c("Expected value for " + f + " in voice", e, m) : ("number" === g && (l.token = parseFloat(l.token)), b.voices[d][f] = l.token);
        m += l.len;
      };m < r;) {
        var B = a.getVoiceToken(e, m, r), m = m + B.len;
        if (B.warn) {
          c("Error parsing voice: " + B.warn, e, m);
        } else {
          var q = null;
          switch(B.token) {
            case "clef":
            ;
            case "cl":
              k("clef");
              B = 0;
              void 0 !== s.clef && (s.clef = s.clef.replace(/[',]/g, ""), -1 !== s.clef.indexOf("+16") && (B += 14, s.clef = s.clef.replace("+16", "")), s.verticalPos = g(s.clef, B));
              break;
            case "treble":
            ;
            case "bass":
            ;
            case "tenor":
            ;
            case "alto":
            ;
            case "none":
            ;
            case "treble'":
            ;
            case "bass'":
            ;
            case "tenor'":
            ;
            case "alto'":
            ;
            case "none'":
            ;
            case "treble''":
            ;
            case "bass''":
            ;
            case "tenor''":
            ;
            case "alto''":
            ;
            case "none''":
            ;
            case "treble,":
            ;
            case "bass,":
            ;
            case "tenor,":
            ;
            case "alto,":
            ;
            case "none,":
            ;
            case "treble,,":
            ;
            case "bass,,":
            ;
            case "tenor,,":
            ;
            case "alto,,":
            ;
            case "none,,":
              s.clef = B.token.replace(/[',]/g, "");
              s.verticalPos = g(s.clef, 0);
              break;
            case "staves":
            ;
            case "stave":
            ;
            case "stv":
              k("staves");
              break;
            case "brace":
            ;
            case "brc":
              k("brace");
              break;
            case "bracket":
            ;
            case "brk":
              k("bracket");
              break;
            case "name":
            ;
            case "nm":
              k("name");
              break;
            case "subname":
            ;
            case "sname":
            ;
            case "snm":
              k("subname");
              break;
            case "merge":
              s.startStaff = !1;
              break;
            case "stems":
              q = a.getVoiceToken(e, m, r);
              void 0 !== q.warn ? c("Expected value for stems in voice: " + q.warn, e, m) : "up" === q.token || "down" === q.token ? b.voices[l].stem = q.token : c("Expected up or down for voice stem", e, m);
              m += q.len;
              break;
            case "up":
            ;
            case "down":
              b.voices[l].stem = B.token;
              break;
            case "middle":
            ;
            case "m":
              k("verticalPos");
              s.verticalPos = f(s.verticalPos).mid;
              break;
            case "gchords":
            ;
            case "gch":
              b.voices[l].suppressChords = !0;
              break;
            case "space":
            ;
            case "spc":
              k("spacing");
              break;
            case "scale":
              v(l, "scale", "number");
              break;
            case "transpose":
              v(l, "transpose", "number");
          }
        }
        m += a.eatWhiteSpace(e, m);
      }
      if (s.startStaff || 0 === b.staves.length) {
        b.staves.push({index:b.staves.length, meter:b.origMeter}), b.score_is_present || (b.staves[b.staves.length - 1].numVoices = 0);
      }
      if (void 0 === b.voices[l].staffNum) {
        b.voices[l].staffNum = b.staves.length - 1;
        k = 0;
        for (var y in b.voices) {
          b.voices.hasOwnProperty(y) && b.voices[y].staffNum === b.voices[l].staffNum && k++;
        }
        b.voices[l].index = k - 1;
      }
      y = b.staves[b.voices[l].staffNum];
      b.score_is_present || y.numVoices++;
      s.clef && (y.clef = {type:s.clef, verticalPos:s.verticalPos});
      s.spacing && (y.spacing_below_offset = s.spacing);
      s.verticalPos && (y.verticalPos = s.verticalPos);
      s.name && (y.name ? y.name.push(s.name) : y.name = [s.name]);
      s.subname && (y.subname ? y.subname.push(s.subname) : y.subname = [s.subname]);
      b.currentVoice = b.voices[l];
      d.setCurrentVoice(b.currentVoice.staffNum, b.currentVoice.index);
    }
  };
})();
window.ABCJS || (window.ABCJS = {});
window.ABCJS.parse || (window.ABCJS.parse = {});
window.ABCJS.parse.tokenizer = function() {
  this.skipWhiteSpace = function(a) {
    for (var b = 0;b < a.length;b++) {
      if (!this.isWhiteSpace(a.charAt(b))) {
        return b;
      }
    }
    return a.length;
  };
  this.eatWhiteSpace = function(a, b) {
    for (var c = b;c < a.length && this.isWhiteSpace(a.charAt(c));c++) {
    }
    return c - b;
  };
  this.getKeyPitch = function(a) {
    var b = this.skipWhiteSpace(a);
    if (b >= a.length) {
      return{len:0};
    }
    switch(a.charAt(b)) {
      case "A":
        return{len:b + 1, token:"A"};
      case "B":
        return{len:b + 1, token:"B"};
      case "C":
        return{len:b + 1, token:"C"};
      case "D":
        return{len:b + 1, token:"D"};
      case "E":
        return{len:b + 1, token:"E"};
      case "F":
        return{len:b + 1, token:"F"};
      case "G":
        return{len:b + 1, token:"G"};
    }
    return{len:0};
  };
  this.getSharpFlat = function(a) {
    if ("bass" === a) {
      return{len:0};
    }
    switch(a.charAt(0)) {
      case "#":
        return{len:1, token:"#"};
      case "b":
        return{len:1, token:"b"};
    }
    return{len:0};
  };
  this.getMode = function(a) {
    var b = function(a, b) {
      for (;b < a.length && ("a" <= a.charAt(b) && "z" >= a.charAt(b) || "A" <= a.charAt(b) && "Z" >= a.charAt(b));) {
        b++;
      }
      return b;
    }, c = this.skipWhiteSpace(a);
    if (c >= a.length) {
      return{len:0};
    }
    var d = a.substring(c, c + 3).toLowerCase();
    if (1 < d.length && " " === d.charAt(1) || "^" === d.charAt(1) || "_" === d.charAt(1) || "=" === d.charAt(1)) {
      d = d.charAt(0);
    }
    switch(d) {
      case "mix":
        return{len:b(a, c), token:"Mix"};
      case "dor":
        return{len:b(a, c), token:"Dor"};
      case "phr":
        return{len:b(a, c), token:"Phr"};
      case "lyd":
        return{len:b(a, c), token:"Lyd"};
      case "loc":
        return{len:b(a, c), token:"Loc"};
      case "aeo":
        return{len:b(a, c), token:"m"};
      case "maj":
        return{len:b(a, c), token:""};
      case "ion":
        return{len:b(a, c), token:""};
      case "min":
        return{len:b(a, c), token:"m"};
      case "m":
        return{len:b(a, c), token:"m"};
    }
    return{len:0};
  };
  this.getClef = function(a, b) {
    var c = this.skipWhiteSpace(a);
    if (c >= a.length) {
      return{len:0};
    }
    var d = !1, g = a.substring(c);
    window.ABCJS.parse.startsWith(g, "clef=") && (d = !0, g = g.substring(5), c += 5);
    if (0 === g.length && d) {
      return{len:c + 5, warn:"No clef specified: " + a};
    }
    var k = this.skipWhiteSpace(g);
    if (k >= g.length) {
      return{len:0};
    }
    0 < k && (c += k, g = g.substring(k));
    var r = null;
    if (window.ABCJS.parse.startsWith(g, "treble")) {
      r = "treble";
    } else {
      if (window.ABCJS.parse.startsWith(g, "bass3")) {
        r = "bass3";
      } else {
        if (window.ABCJS.parse.startsWith(g, "bass")) {
          r = "bass";
        } else {
          if (window.ABCJS.parse.startsWith(g, "tenor")) {
            r = "tenor";
          } else {
            if (window.ABCJS.parse.startsWith(g, "alto2")) {
              r = "alto2";
            } else {
              if (window.ABCJS.parse.startsWith(g, "alto1")) {
                r = "alto1";
              } else {
                if (window.ABCJS.parse.startsWith(g, "alto")) {
                  r = "alto";
                } else {
                  if (!b && d && window.ABCJS.parse.startsWith(g, "none")) {
                    r = "none";
                  } else {
                    if (window.ABCJS.parse.startsWith(g, "perc")) {
                      r = "perc";
                    } else {
                      if (!b && d && window.ABCJS.parse.startsWith(g, "C")) {
                        r = "tenor";
                      } else {
                        if (!b && d && window.ABCJS.parse.startsWith(g, "F")) {
                          r = "bass";
                        } else {
                          if (!b && d && window.ABCJS.parse.startsWith(g, "G")) {
                            r = "treble";
                          } else {
                            return{len:c + 5, warn:"Unknown clef specified: " + a};
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    g = g.substring(r.length);
    k = this.isMatch(g, "+8");
    0 < k ? r += "+8" : (k = this.isMatch(g, "-8"), 0 < k && (r += "-8"));
    return{len:c + r.length, token:r, explicit:d};
  };
  this.getBarLine = function(a, b) {
    switch(a.charAt(b)) {
      case "]":
        switch(++b, a.charAt(b)) {
          case "|":
            return{len:2, token:"bar_thick_thin"};
          case "[":
            return++b, "1" <= a.charAt(b) && "9" >= a.charAt(b) || '"' === a.charAt(b) ? {len:2, token:"bar_invisible"} : {len:1, warn:"Unknown bar symbol"};
          default:
            return{len:1, token:"bar_invisible"};
        }
      ;
      case ":":
        switch(++b, a.charAt(b)) {
          case ":":
            return{len:2, token:"bar_dbl_repeat"};
          case "|":
            switch(++b, a.charAt(b)) {
              case "]":
                switch(++b, a.charAt(b)) {
                  case "|":
                    return++b, ":" === a.charAt(b) ? {len:5, token:"bar_dbl_repeat"} : {len:3, token:"bar_right_repeat"};
                  default:
                    return{len:3, token:"bar_right_repeat"};
                }
              ;
              case "|":
                return++b, ":" === a.charAt(b) ? {len:4, token:"bar_dbl_repeat"} : {len:3, token:"bar_right_repeat"};
              default:
                return{len:2, token:"bar_right_repeat"};
            }
          ;
          default:
            return{len:1, warn:"Unknown bar symbol"};
        }
      ;
      case "[":
        if (++b, "|" === a.charAt(b)) {
          switch(++b, a.charAt(b)) {
            case ":":
              return{len:3, token:"bar_left_repeat"};
            case "]":
              return{len:3, token:"bar_invisible"};
            default:
              return{len:2, token:"bar_thick_thin"};
          }
        } else {
          if ("1" <= a.charAt(b) && "9" >= a.charAt(b) || '"' === a.charAt(b)) {
            return{len:1, token:"bar_invisible"};
          }
          break;
        }
      ;
      case "|":
        switch(++b, a.charAt(b)) {
          case "]":
            return{len:2, token:"bar_thin_thick"};
          case "|":
            return++b, ":" === a.charAt(b) ? {len:3, token:"bar_left_repeat"} : {len:2, token:"bar_thin_thin"};
          case ":":
            for (var c = 0;":" === a.charAt(b + c);) {
              c++;
            }
            return{len:1 + c, token:"bar_left_repeat"};
          default:
            return{len:1, token:"bar_thin"};
        }
      ;
    }
    return{len:0};
  };
  this.getTokenOf = function(a, b) {
    for (var c = 0;c < a.length;c++) {
      if (0 > b.indexOf(a.charAt(c))) {
        return{len:c, token:a.substring(0, c)};
      }
    }
    return{len:c, token:a};
  };
  this.getToken = function(a, b, c) {
    for (var d = b;d < c && !this.isWhiteSpace(a.charAt(d));) {
      d++;
    }
    return a.substring(b, d);
  };
  this.isMatch = function(a, b) {
    var c = this.skipWhiteSpace(a);
    return c >= a.length ? 0 : window.ABCJS.parse.startsWith(a.substring(c), b) ? c + b.length : 0;
  };
  this.getPitchFromTokens = function(a) {
    var b = {};
    b.position = {A:5, B:6, C:0, D:1, E:2, F:3, G:4, a:12, b:13, c:7, d:8, e:9, f:10, g:11}[a[0].token];
    if (void 0 === b.position) {
      return{warn:"Pitch expected. Found: " + a[0].token};
    }
    for (a.shift();a.length;) {
      switch(a[0].token) {
        case ",":
          b.position -= 7;
          a.shift();
          break;
        case "'":
          b.position += 7;
          a.shift();
          break;
        default:
          return b;
      }
    }
    return b;
  };
  this.getKeyAccidentals2 = function(a) {
    for (var b;0 < a.length;) {
      var c;
      if ("^" === a[0].token) {
        c = "sharp";
        a.shift();
        if (0 === a.length) {
          return{accs:b, warn:"Expected note name after " + c};
        }
        switch(a[0].token) {
          case "^":
            c = "dblsharp";
            a.shift();
            break;
          case "/":
            c = "quartersharp", a.shift();
        }
      } else {
        if ("=" === a[0].token) {
          c = "natural", a.shift();
        } else {
          if ("_" === a[0].token) {
            c = "flat";
            a.shift();
            if (0 === a.length) {
              return{accs:b, warn:"Expected note name after " + c};
            }
            switch(a[0].token) {
              case "_":
                c = "dblflat";
                a.shift();
                break;
              case "/":
                c = "quarterflat", a.shift();
            }
          } else {
            break;
          }
        }
      }
      if (0 === a.length) {
        return{accs:b, warn:"Expected note name after " + c};
      }
      switch(a[0].token.charAt(0)) {
        case "a":
        ;
        case "b":
        ;
        case "c":
        ;
        case "d":
        ;
        case "e":
        ;
        case "f":
        ;
        case "g":
        ;
        case "A":
        ;
        case "B":
        ;
        case "C":
        ;
        case "D":
        ;
        case "E":
        ;
        case "F":
        ;
        case "G":
          void 0 === b && (b = []);
          b.push({acc:c, note:a[0].token.charAt(0)});
          1 === a[0].token.length ? a.shift() : a[0].token = a[0].token.substring(1);
          break;
        default:
          return{accs:b, warn:"Expected note name after " + c + " Found: " + a[0].token};
      }
    }
    return{accs:b};
  };
  this.getKeyAccidental = function(a) {
    var b = {"^":"sharp", "^^":"dblsharp", "=":"natural", _:"flat", __:"dblflat", "_/":"quarterflat", "^/":"quartersharp"}, c = this.skipWhiteSpace(a);
    if (c >= a.length) {
      return{len:0};
    }
    var d = null;
    switch(a.charAt(c)) {
      case "^":
      ;
      case "_":
      ;
      case "=":
        d = a.charAt(c);
        break;
      default:
        return{len:0};
    }
    c++;
    if (c >= a.length) {
      return{len:1, warn:"Expected note name after accidental"};
    }
    switch(a.charAt(c)) {
      case "a":
      ;
      case "b":
      ;
      case "c":
      ;
      case "d":
      ;
      case "e":
      ;
      case "f":
      ;
      case "g":
      ;
      case "A":
      ;
      case "B":
      ;
      case "C":
      ;
      case "D":
      ;
      case "E":
      ;
      case "F":
      ;
      case "G":
        return{len:c + 1, token:{acc:b[d], note:a.charAt(c)}};
      case "^":
      ;
      case "_":
      ;
      case "/":
        d += a.charAt(c);
        c++;
        if (c >= a.length) {
          return{len:2, warn:"Expected note name after accidental"};
        }
        switch(a.charAt(c)) {
          case "a":
          ;
          case "b":
          ;
          case "c":
          ;
          case "d":
          ;
          case "e":
          ;
          case "f":
          ;
          case "g":
          ;
          case "A":
          ;
          case "B":
          ;
          case "C":
          ;
          case "D":
          ;
          case "E":
          ;
          case "F":
          ;
          case "G":
            return{len:c + 1, token:{acc:b[d], note:a.charAt(c)}};
          default:
            return{len:2, warn:"Expected note name after accidental"};
        }
      ;
      default:
        return{len:1, warn:"Expected note name after accidental"};
    }
  };
  this.isWhiteSpace = function(a) {
    return " " === a || "\t" === a || "\u0012" === a;
  };
  this.getMeat = function(a, b, c) {
    var d = a.indexOf("%", b);
    for (0 <= d && d < c && (c = d);b < c && (" " === a.charAt(b) || "\t" === a.charAt(b) || "\u0012" === a.charAt(b));) {
      b++;
    }
    for (;b < c && (" " === a.charAt(c - 1) || "\t" === a.charAt(c - 1) || "\u0012" === a.charAt(c - 1));) {
      c--;
    }
    return{start:b, end:c};
  };
  var a = function(a) {
    return "A" <= a && "Z" >= a || "a" <= a && "z" >= a;
  }, c = function(a) {
    return "0" <= a && "9" >= a;
  };
  this.tokenize = function(b, d, g) {
    g = this.getMeat(b, d, g);
    d = g.start;
    g = g.end;
    for (var l = [], k;d < g;) {
      if ('"' === b.charAt(d)) {
        for (k = d + 1;k < g && '"' !== b.charAt(k);) {
          k++;
        }
        l.push({type:"quote", token:b.substring(d + 1, k), start:d + 1, end:k});
        k++;
      } else {
        if (a(b.charAt(d))) {
          for (k = d + 1;k < g && a(b.charAt(k));) {
            k++;
          }
          l.push({type:"alpha", token:b.substring(d, k), continueId:c(b.charAt(k)), start:d, end:k});
        } else {
          if ("." === b.charAt(d) && c(b.charAt(k + 1))) {
            k = d + 1;
            for (var m = null;k < g && c(b.charAt(k));) {
              k++;
            }
            m = parseFloat(b.substring(d, k));
            l.push({type:"number", token:b.substring(d, k), intt:null, floatt:m, continueId:a(b.charAt(k)), start:d, end:k});
          } else {
            if (c(b.charAt(d)) || "-" === b.charAt(d) && c(b.charAt(k + 1))) {
              k = d + 1;
              for (var r = m = null;k < g && c(b.charAt(k));) {
                k++;
              }
              if ("." === b.charAt(k) && c(b.charAt(k + 1))) {
                for (k++;k < g && c(b.charAt(k));) {
                  k++;
                }
              } else {
                m = parseInt(b.substring(d, k));
              }
              r = parseFloat(b.substring(d, k));
              l.push({type:"number", token:b.substring(d, k), intt:m, floatt:r, continueId:a(b.charAt(k)), start:d, end:k});
            } else {
              " " !== b.charAt(d) && "\t" !== b.charAt(d) && l.push({type:"punct", token:b.charAt(d), start:d, end:d + 1}), k = d + 1;
            }
          }
        }
      }
      d = k;
    }
    return l;
  };
  this.getVoiceToken = function(a, b, c) {
    for (var d = b;d < c && this.isWhiteSpace(a.charAt(d)) || "=" === a.charAt(d);) {
      d++;
    }
    if ('"' === a.charAt(d)) {
      var g = a.indexOf('"', d + 1);
      return-1 === g || g >= c ? {len:1, err:"Missing close quote"} : {len:g - b + 1, token:this.translateString(a.substring(d + 1, g))};
    }
    for (g = d;g < c && !this.isWhiteSpace(a.charAt(g)) && "=" !== a.charAt(g);) {
      g++;
    }
    return{len:g - b + 1, token:a.substring(d, g)};
  };
  var b = {"`a":"\u00e0", "'a":"\u00e1", "^a":"\u00e2", "~a":"\u00e3", '"a':"\u00e4", oa:"\u00e5", "=a":"\u0101", ua:"\u0103", ";a":"\u0105", "`e":"\u00e8", "'e":"\u00e9", "^e":"\u00ea", '"e':"\u00eb", "=e":"\u0113", ue:"\u0115", ";e":"\u0119", ".e":"\u0117", "`i":"\u00ec", "'i":"\u00ed", "^i":"\u00ee", '"i':"\u00ef", "=i":"\u012b", ui:"\u012d", ";i":"\u012f", "`o":"\u00f2", "'o":"\u00f3", "^o":"\u00f4", "~o":"\u00f5", '"o':"\u00f6", "=o":"\u014d", uo:"\u014f", "/o":"\u00f8", "`u":"\u00f9", "'u":"\u00fa", 
  "^u":"\u00fb", "~u":"\u0169", '"u':"\u00fc", ou:"\u016f", "=u":"\u016b", uu:"\u016d", ";u":"\u0173", "`A":"\u00c0", "'A":"\u00c1", "^A":"\u00c2", "~A":"\u00c3", '"A':"\u00c4", oA:"\u00c5", "=A":"\u0100", uA:"\u0102", ";A":"\u0104", "`E":"\u00c8", "'E":"\u00c9", "^E":"\u00ca", '"E':"\u00cb", "=E":"\u0112", uE:"\u0114", ";E":"\u0118", ".E":"\u0116", "`I":"\u00cc", "'I":"\u00cd", "^I":"\u00ce", "~I":"\u0128", '"I':"\u00cf", "=I":"\u012a", uI:"\u012c", ";I":"\u012e", ".I":"\u0130", "`O":"\u00d2", "'O":"\u00d3", 
  "^O":"\u00d4", "~O":"\u00d5", '"O':"\u00d6", "=O":"\u014c", uO:"\u014e", "/O":"\u00d8", "`U":"\u00d9", "'U":"\u00da", "^U":"\u00db", "~U":"\u0168", '"U':"\u00dc", oU:"\u016e", "=U":"\u016a", uU:"\u016c", ";U":"\u0172", ae:"\u00e6", AE:"\u00c6", oe:"\u0153", OE:"\u0152", ss:"\u00df", "'c":"\u0107", "^c":"\u0109", uc:"\u010d", cc:"\u00e7", ".c":"\u010b", cC:"\u00c7", "'C":"\u0106", "^C":"\u0108", uC:"\u010c", ".C":"\u010a", "~n":"\u00f1", "=s":"\u0161", vs:"\u0161", vz:"\u017e"}, d = {"#":"\u266f", 
  b:"\u266d", "=":"\u266e"}, k = {201:"\u266f", 202:"\u266d", 203:"\u266e", 241:"\u00a1", 242:"\u00a2", 252:"a", 262:"2", 272:"o", 302:"\u00c2", 312:"\u00ca", 322:"\u00d2", 332:"\u00da", 342:"\u00e2", 352:"\u00ea", 362:"\u00f2", 372:"\u00fa", 243:"\u00a3", 253:"\u00ab", 263:"3", 273:"\u00bb", 303:"\u00c3", 313:"\u00cb", 323:"\u00d3", 333:"\u00db", 343:"\u00e3", 353:"\u00eb", 363:"\u00f3", 373:"\u00fb", 244:"\u00a4", 254:"\u00ac", 264:"  \u0301", 274:"1\u20444", 304:"\u00c4", 314:"\u00cc", 324:"\u00d4", 
  334:"\u00dc", 344:"\u00e4", 354:"\u00ec", 364:"\u00f4", 374:"\u00fc", 245:"\u00a5", 255:"-", 265:"\u03bc", 275:"1\u20442", 305:"\u00c5", 315:"\u00cd", 325:"\u00d5", 335:"\u00dd", 345:"\u00e5", 355:"\u00ed", 365:"\u00f5", 375:"\u00fd", 246:"\u00a6", 256:"\u00ae", 266:"\u00b6", 276:"3\u20444", 306:"\u00c6", 316:"\u00ce", 326:"\u00d6", 336:"\u00de", 346:"\u00e6", 356:"\u00ee", 366:"\u00f6", 376:"\u00fe", 247:"\u00a7", 257:" \u0304", 267:"\u00b7", 277:"\u00bf", 307:"\u00c7", 317:"\u00cf", 327:"\u00d7", 
  337:"\u00df", 347:"\u00e7", 357:"\u00ef", 367:"\u00f7", 377:"\u00ff", 250:" \u0308", 260:"\u00b0", 270:" \u0327", 300:"\u00c0", 310:"\u00c8", 320:"\u00d0", 330:"\u00d8", 340:"\u00e0", 350:"\u00e8", 360:"\u00f0", 370:"\u00f8", 251:"\u00a9", 261:"\u00b1", 271:"1", 301:"\u00c1", 311:"\u00c9", 321:"\u00d1", 331:"\u00d9", 341:"\u00e1", 351:"\u00e9", 361:"\u00f1", 371:"\u00f9"};
  this.translateString = function(a) {
    var c = a.split("\\");
    if (1 === c.length) {
      return a;
    }
    var g = null;
    window.ABCJS.parse.each(c, function(a) {
      if (null === g) {
        g = a;
      } else {
        var c = b[a.substring(0, 2)];
        void 0 !== c ? g += c + a.substring(2) : (c = k[a.substring(0, 3)], void 0 !== c ? g += c + a.substring(3) : (c = d[a.substring(0, 1)], g = void 0 !== c ? g + (c + a.substring(1)) : g + ("\\" + a)));
      }
    });
    return g;
  };
  this.getNumber = function(a, b) {
    for (var c = 0;b < a.length;) {
      switch(a.charAt(b)) {
        case "0":
          c *= 10;
          b++;
          break;
        case "1":
          c = 10 * c + 1;
          b++;
          break;
        case "2":
          c = 10 * c + 2;
          b++;
          break;
        case "3":
          c = 10 * c + 3;
          b++;
          break;
        case "4":
          c = 10 * c + 4;
          b++;
          break;
        case "5":
          c = 10 * c + 5;
          b++;
          break;
        case "6":
          c = 10 * c + 6;
          b++;
          break;
        case "7":
          c = 10 * c + 7;
          b++;
          break;
        case "8":
          c = 10 * c + 8;
          b++;
          break;
        case "9":
          c = 10 * c + 9;
          b++;
          break;
        default:
          return{num:c, index:b};
      }
    }
    return{num:c, index:b};
  };
  this.getFraction = function(a, b) {
    var c = 1, d = 1;
    if ("/" !== a.charAt(b)) {
      var g = this.getNumber(a, b), c = g.num;
      b = g.index;
    }
    if ("/" === a.charAt(b)) {
      b++;
      if ("/" === a.charAt(b)) {
        for (d = .5;"/" === a.charAt(b++);) {
          d /= 2;
        }
        return{value:c * d, index:b - 1};
      }
      var g = b, k = this.getNumber(a, b);
      0 === k.num && g === b && (k.num = 2);
      0 !== k.num && (d = k.num);
      b = k.index;
    }
    return{value:c / d, index:b};
  };
  this.theReverser = function(a) {
    return window.ABCJS.parse.endsWith(a, ", The") ? "The " + a.substring(0, a.length - 5) : window.ABCJS.parse.endsWith(a, ", A") ? "A " + a.substring(0, a.length - 3) : a;
  };
  this.stripComment = function(a) {
    var b = a.indexOf("%");
    return 0 <= b ? window.ABCJS.parse.strip(a.substring(0, b)) : window.ABCJS.parse.strip(a);
  };
  this.getInt = function(a) {
    var b = parseInt(a);
    if (isNaN(b)) {
      return{digits:0};
    }
    var c = "" + b;
    a = a.indexOf(c);
    return{value:b, digits:a + c.length};
  };
  this.getFloat = function(a) {
    var b = parseFloat(a);
    if (isNaN(b)) {
      return{digits:0};
    }
    var c = "" + b;
    a = a.indexOf(c);
    return{value:b, digits:a + c.length};
  };
  this.getMeasurement = function(a) {
    if (0 === a.length) {
      return{used:0};
    }
    var b = 1, c = "";
    if ("-" === a[0].token) {
      a.shift(), c = "-", b++;
    } else {
      if ("number" !== a[0].type) {
        return{used:0};
      }
    }
    c += a.shift().token;
    if (0 === a.length) {
      return{used:1, value:parseInt(c)};
    }
    var d = a.shift();
    if ("." === d.token) {
      b++;
      if (0 === a.length) {
        return{used:b, value:parseInt(c)};
      }
      if ("number" === a[0].type && (d = a.shift(), c = c + "." + d.token, b++, 0 === a.length)) {
        return{used:b, value:parseFloat(c)};
      }
      d = a.shift();
    }
    switch(d.token) {
      case "pt":
        return{used:b + 1, value:parseFloat(c)};
      case "cm":
        return{used:b + 1, value:parseFloat(c) / 2.54 * 72};
      case "in":
        return{used:b + 1, value:72 * parseFloat(c)};
      default:
        return a.unshift(d), {used:b, value:parseFloat(c)};
    }
  };
  var g = function(a) {
    for (;-1 !== a.indexOf("\\n");) {
      a = a.replace("\\n", "\n");
    }
    return a;
  };
  this.getBrackettedSubstring = function(a, b, c, d) {
    d = d || a.charAt(b);
    for (var k = b + 1;k < a.length && a.charAt(k) !== d;) {
      ++k;
    }
    if (a.charAt(k) === d) {
      return[k - b + 1, g(a.substring(b + 1, k)), !0];
    }
    k = b + c;
    k > a.length - 1 && (k = a.length - 1);
    return[k - b + 1, g(a.substring(b + 1, k)), !1];
  };
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.write || (window.ABCJS.write = {});
ABCJS.write.Glyphs = function() {
  var a = {"rests.whole":{d:[["M", .06, .03], ["l", .09, -.06], ["l", 5.46, 0], ["l", 5.49, 0], ["l", .09, .06], ["l", .06, .09], ["l", 0, 2.19], ["l", 0, 2.19], ["l", -.06, .09], ["l", -.09, .06], ["l", -5.49, 0], ["l", -5.46, 0], ["l", -.09, -.06], ["l", -.06, -.09], ["l", 0, -2.19], ["l", 0, -2.19], ["z"]], w:11.25, h:4.68}, "rests.half":{d:[["M", .06, -4.62], ["l", .09, -.06], ["l", 5.46, 0], ["l", 5.49, 0], ["l", .09, .06], ["l", .06, .09], ["l", 0, 2.19], ["l", 0, 2.19], ["l", -.06, .09], ["l", 
  -.09, .06], ["l", -5.49, 0], ["l", -5.46, 0], ["l", -.09, -.06], ["l", -.06, -.09], ["l", 0, -2.19], ["l", 0, -2.19], ["z"]], w:11.25, h:4.68}, "rests.quarter":{d:[["M", 1.89, -11.82], ["c", .12, -.06, .24, -.06, .36, -.03], ["c", .09, .06, 4.74, 5.58, 4.86, 5.82], ["c", .21, .39, .15, .78, -.15, 1.26], ["c", -.24, .33, -.72, .81, -1.62, 1.56], ["c", -.45, .36, -.87, .75, -.96, .84], ["c", -.93, .99, -1.14, 2.49, -.6, 3.63], ["c", .18, .39, .27, .48, 1.32, 1.68], ["c", 1.92, 2.25, 1.83, 2.16, 1.83, 
  2.34], ["c", -0, .18, -.18, .36, -.36, .39], ["c", -.15, -0, -.27, -.06, -.48, -.27], ["c", -.75, -.75, -2.46, -1.29, -3.39, -1.08], ["c", -.45, .09, -.69, .27, -.9, .69], ["c", -.12, .3, -.21, .66, -.24, 1.14], ["c", -.03, .66, .09, 1.35, .3, 2.01], ["c", .15, .42, .24, .66, .45, .96], ["c", .18, .24, .18, .33, .03, .42], ["c", -.12, .06, -.18, .03, -.45, -.3], ["c", -1.08, -1.38, -2.07, -3.36, -2.4, -4.83], ["c", -.27, -1.05, -.15, -1.77, .27, -2.07], ["c", .21, -.12, .42, -.15, .87, -.15], ["c", 
  .87, .06, 2.1, .39, 3.3, .9], ["l", .39, .18], ["l", -1.65, -1.95], ["c", -2.52, -2.97, -2.61, -3.09, -2.7, -3.27], ["c", -.09, -.24, -.12, -.48, -.03, -.75], ["c", .15, -.48, .57, -.96, 1.83, -2.01], ["c", .45, -.36, .84, -.72, .93, -.78], ["c", .69, -.75, 1.02, -1.8, .9, -2.79], ["c", -.06, -.33, -.21, -.84, -.39, -1.11], ["c", -.09, -.15, -.45, -.6, -.81, -1.05], ["c", -.36, -.42, -.69, -.81, -.72, -.87], ["c", -.09, -.18, -0, -.42, .21, -.51], ["z"]], w:7.888, h:21.435}, "rests.8th":{d:[["M", 
  1.68, -6.12], ["c", .66, -.09, 1.23, .09, 1.68, .51], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .09, .33, .18, .66, .21, .72], ["c", .12, .27, .33, .45, .6, .48], ["c", .12, 0, .18, 0, .33, -.09], ["c", .39, -.18, 1.32, -1.29, 1.68, -1.98], ["c", .09, -.21, .24, -.3, .39, -.3], ["c", .12, 0, .27, .09, .33, .18], ["c", .03, .06, -.27, 1.11, -1.86, 6.42], ["c", -1.02, 3.48, -1.89, 6.39, -1.92, 6.42], ["c", 0, .03, -.12, .12, -.24, .15], ["c", -.18, .09, -.21, .09, -.45, .09], ["c", -.24, 0, -.3, 
  0, -.48, -.06], ["c", -.09, -.06, -.21, -.12, -.21, -.15], ["c", -.06, -.03, .15, -.57, 1.68, -4.92], ["c", .96, -2.67, 1.74, -4.89, 1.71, -4.89], ["l", -.51, .15], ["c", -1.08, .36, -1.74, .48, -2.55, .48], ["c", -.66, 0, -.84, -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .33, -.45, .84, -.81, 1.38, -.9], ["z"]], w:7.534, h:13.883}, "rests.16th":{d:[["M", 3.33, -6.12], ["c", .66, -.09, 1.23, .09, 1.68, .51], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .09, .33, .18, 
  .66, .21, .72], ["c", .15, .39, .57, .57, .87, .42], ["c", .39, -.18, 1.2, -1.23, 1.62, -2.07], ["c", .06, -.15, .24, -.24, .36, -.24], ["c", .12, 0, .27, .09, .33, .18], ["c", .03, .06, -.45, 1.86, -2.67, 10.17], ["c", -1.5, 5.55, -2.73, 10.14, -2.76, 10.17], ["c", -.03, .03, -.12, .12, -.24, .15], ["c", -.18, .09, -.21, .09, -.45, .09], ["c", -.24, 0, -.3, 0, -.48, -.06], ["c", -.09, -.06, -.21, -.12, -.21, -.15], ["c", -.06, -.03, .12, -.57, 1.44, -4.92], ["c", .81, -2.67, 1.47, -4.86, 1.47, 
  -4.89], ["c", -.03, 0, -.27, .06, -.54, .15], ["c", -1.08, .36, -1.77, .48, -2.58, .48], ["c", -.66, 0, -.84, -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .72, -1.05, 2.22, -1.23, 3.06, -.42], ["c", .3, .33, .42, .6, .6, 1.38], ["c", .09, .45, .21, .78, .33, .9], ["c", .09, .09, .27, .18, .45, .21], ["c", .12, 0, .18, 0, .33, -.09], ["c", .33, -.15, 1.02, -.93, 1.41, -1.59], ["c", .12, -.21, .18, -.39, .39, -1.08], ["c", .66, -2.1, 1.17, -3.84, 1.17, -3.87], ["c", 0, 
  0, -.21, .06, -.42, .15], ["c", -.51, .15, -1.2, .33, -1.68, .42], ["c", -.33, .06, -.51, .06, -.96, .06], ["c", -.66, 0, -.84, -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .33, -.45, .84, -.81, 1.38, -.9], ["z"]], w:9.724, h:21.383}, "rests.32nd":{d:[["M", 4.23, -13.62], ["c", .66, -.09, 1.23, .09, 1.68, .51], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .09, .33, .18, .66, .21, .72], ["c", .12, .27, .33, .45, .6, .48], ["c", .12, 0, .18, 0, .27, -.06], ["c", .33, -.21, 
  .99, -1.11, 1.44, -1.98], ["c", .09, -.24, .21, -.33, .39, -.33], ["c", .12, 0, .27, .09, .33, .18], ["c", .03, .06, -.57, 2.67, -3.21, 13.89], ["c", -1.8, 7.62, -3.3, 13.89, -3.3, 13.92], ["c", -.03, .06, -.12, .12, -.24, .18], ["c", -.21, .09, -.24, .09, -.48, .09], ["c", -.24, -0, -.3, -0, -.48, -.06], ["c", -.09, -.06, -.21, -.12, -.21, -.15], ["c", -.06, -.03, .09, -.57, 1.23, -4.92], ["c", .69, -2.67, 1.26, -4.86, 1.29, -4.89], ["c", 0, -.03, -.12, -.03, -.48, .12], ["c", -1.17, .39, -2.22, 
  .57, -3, .54], ["c", -.42, -.03, -.75, -.12, -1.11, -.3], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .72, -1.05, 2.22, -1.23, 3.06, -.42], ["c", .3, .33, .42, .6, .6, 1.38], ["c", .09, .45, .21, .78, .33, .9], ["c", .12, .09, .3, .18, .48, .21], ["c", .12, -0, .18, -0, .3, -.09], ["c", .42, -.21, 1.29, -1.29, 1.56, -1.89], ["c", .03, -.12, 1.23, -4.59, 1.23, -4.65], ["c", 0, -.03, -.18, .03, -.39, .12], ["c", -.63, .18, -1.2, .36, -1.74, .45], ["c", -.39, .06, -.54, .06, -1.02, .06], 
  ["c", -.66, -0, -.84, -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .72, -1.05, 2.22, -1.23, 3.06, -.42], ["c", .3, .33, .42, .6, .6, 1.38], ["c", .09, .45, .21, .78, .33, .9], ["c", .18, .18, .51, .27, .72, .15], ["c", .3, -.12, .69, -.57, 1.08, -1.17], ["c", .42, -.6, .39, -.51, 1.05, -3.03], ["c", .33, -1.26, .6, -2.31, .6, -2.34], ["c", 0, -0, -.21, .03, -.45, .12], ["c", -.57, .18, -1.14, .33, -1.62, .42], ["c", -.33, .06, -.51, .06, -.96, .06], ["c", -.66, -0, -.84, 
  -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .33, -.45, .84, -.81, 1.38, -.9], ["z"]], w:11.373, h:28.883}, "rests.64th":{d:[["M", 5.13, -13.62], ["c", .66, -.09, 1.23, .09, 1.68, .51], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .15, .63, .21, .81, .33, .96], ["c", .18, .21, .54, .3, .75, .18], ["c", .24, -.12, .63, -.66, 1.08, -1.56], ["c", .33, -.66, .39, -.72, .6, -.72], ["c", .12, 0, .27, .09, .33, .18], ["c", .03, .06, -.69, 3.66, -3.54, 17.64], ["c", -1.95, 9.66, 
  -3.57, 17.61, -3.57, 17.64], ["c", -.03, .06, -.12, .12, -.24, .18], ["c", -.21, .09, -.24, .09, -.48, .09], ["c", -.24, 0, -.3, 0, -.48, -.06], ["c", -.09, -.06, -.21, -.12, -.21, -.15], ["c", -.06, -.03, .06, -.57, 1.05, -4.95], ["c", .6, -2.7, 1.08, -4.89, 1.08, -4.92], ["c", 0, 0, -.24, .06, -.51, .15], ["c", -.66, .24, -1.2, .36, -1.77, .48], ["c", -.42, .06, -.57, .06, -1.05, .06], ["c", -.69, 0, -.87, -.03, -1.35, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .72, -1.05, 2.22, 
  -1.23, 3.06, -.42], ["c", .3, .33, .42, .6, .6, 1.38], ["c", .09, .45, .21, .78, .33, .9], ["c", .09, .09, .27, .18, .45, .21], ["c", .21, .03, .39, -.09, .72, -.42], ["c", .45, -.45, 1.02, -1.26, 1.17, -1.65], ["c", .03, -.09, .27, -1.14, .54, -2.34], ["c", .27, -1.2, .48, -2.19, .51, -2.22], ["c", 0, -.03, -.09, -.03, -.48, .12], ["c", -1.17, .39, -2.22, .57, -3, .54], ["c", -.42, -.03, -.75, -.12, -1.11, -.3], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .36, -.54, .96, -.87, 1.65, -.93], 
  ["c", .54, -.03, 1.02, .15, 1.41, .54], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .09, .33, .18, .66, .21, .72], ["c", .15, .39, .57, .57, .9, .42], ["c", .36, -.18, 1.2, -1.26, 1.47, -1.89], ["c", .03, -.09, .3, -1.2, .57, -2.43], ["l", .51, -2.28], ["l", -.54, .18], ["c", -1.11, .36, -1.8, .48, -2.61, .48], ["c", -.66, 0, -.84, -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .36, -.54, .96, -.87, 1.65, -.93], ["c", .54, -.03, 1.02, .15, 1.41, .54], ["c", .27, .3, .39, 
  .54, .57, 1.26], ["c", .15, .63, .21, .81, .33, .96], ["c", .21, .21, .54, .3, .75, .18], ["c", .36, -.18, .93, -.93, 1.29, -1.68], ["c", .12, -.24, .18, -.48, .63, -2.55], ["l", .51, -2.31], ["c", 0, -.03, -.18, .03, -.39, .12], ["c", -1.14, .36, -2.1, .54, -2.82, .51], ["c", -.42, -.03, -.75, -.12, -1.11, -.3], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .33, -.45, .84, -.81, 1.38, -.9], ["z"]], w:12.453, h:36.383}, "rests.128th":{d:[["M", 6.03, -21.12], ["c", .66, -.09, 1.23, .09, 1.68, 
  .51], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .09, .33, .18, .66, .21, .72], ["c", .12, .27, .33, .45, .6, .48], ["c", .21, 0, .33, -.06, .54, -.36], ["c", .15, -.21, .54, -.93, .78, -1.47], ["c", .15, -.33, .18, -.39, .3, -.48], ["c", .18, -.09, .45, 0, .51, .15], ["c", .03, .09, -7.11, 42.75, -7.17, 42.84], ["c", -.03, .03, -.15, .09, -.24, .15], ["c", -.18, .06, -.24, .06, -.45, .06], ["c", -.24, -0, -.3, -0, -.48, -.06], ["c", -.09, -.06, -.21, -.12, -.21, -.15], ["c", -.06, -.03, .03, -.57, 
  .84, -4.98], ["c", .51, -2.7, .93, -4.92, .9, -4.92], ["c", 0, -0, -.15, .06, -.36, .12], ["c", -.78, .27, -1.62, .48, -2.31, .57], ["c", -.15, .03, -.54, .03, -.81, .03], ["c", -.66, -0, -.84, -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .36, -.54, .96, -.87, 1.65, -.93], ["c", .54, -.03, 1.02, .15, 1.41, .54], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .09, .33, .18, .66, .21, .72], ["c", .12, .27, .33, .45, .63, .48], ["c", .12, -0, .18, -0, .3, -.09], ["c", .42, 
  -.21, 1.14, -1.11, 1.5, -1.83], ["c", .12, -.27, .12, -.27, .54, -2.52], ["c", .24, -1.23, .42, -2.25, .39, -2.25], ["c", 0, -0, -.24, .06, -.51, .18], ["c", -1.26, .39, -2.25, .57, -3.06, .54], ["c", -.42, -.03, -.75, -.12, -1.11, -.3], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .36, -.54, .96, -.87, 1.65, -.93], ["c", .54, -.03, 1.02, .15, 1.41, .54], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .15, .63, .21, .81, .33, .96], ["c", .18, .21, .51, .3, .75, .18], ["c", .36, -.15, 1.05, 
  -.99, 1.41, -1.77], ["l", .15, -.3], ["l", .42, -2.25], ["c", .21, -1.26, .42, -2.28, .39, -2.28], ["l", -.51, .15], ["c", -1.11, .39, -1.89, .51, -2.7, .51], ["c", -.66, -0, -.84, -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .36, -.54, .96, -.87, 1.65, -.93], ["c", .54, -.03, 1.02, .15, 1.41, .54], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .15, .63, .21, .81, .33, .96], ["c", .18, .18, .48, .27, .72, .21], ["c", .33, -.12, 1.14, -1.26, 1.41, -1.95], ["c", 0, -.09, 
  .21, -1.11, .45, -2.34], ["c", .21, -1.2, .39, -2.22, .39, -2.28], ["c", .03, -.03, 0, -.03, -.45, .12], ["c", -.57, .18, -1.2, .33, -1.71, .42], ["c", -.3, .06, -.51, .06, -.93, .06], ["c", -.66, -0, -.84, -.03, -1.32, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .36, -.54, .96, -.87, 1.65, -.93], ["c", .54, -.03, 1.02, .15, 1.41, .54], ["c", .27, .3, .39, .54, .57, 1.26], ["c", .09, .33, .18, .66, .21, .72], ["c", .12, .27, .33, .45, .6, .48], ["c", .18, -0, .36, -.09, .57, -.33], 
  ["c", .33, -.36, .78, -1.14, .93, -1.56], ["c", .03, -.12, .24, -1.2, .45, -2.4], ["c", .24, -1.2, .42, -2.22, .42, -2.28], ["c", .03, -.03, 0, -.03, -.39, .09], ["c", -1.05, .36, -1.8, .48, -2.58, .48], ["c", -.63, -0, -.84, -.03, -1.29, -.27], ["c", -1.32, -.63, -1.77, -2.16, -1.02, -3.3], ["c", .33, -.45, .84, -.81, 1.38, -.9], ["z"]], w:12.992, h:43.883}, "accidentals.sharp":{d:[["M", 5.73, -11.19], ["c", .21, -.12, .54, -.03, .66, .24], ["c", .06, .12, .06, .21, .06, 2.31], ["c", 0, 1.23, 
  0, 2.22, .03, 2.22], ["c", 0, -0, .27, -.12, .6, -.24], ["c", .69, -.27, .78, -.3, .96, -.15], ["c", .21, .15, .21, .18, .21, 1.38], ["c", 0, 1.02, 0, 1.11, -.06, 1.2], ["c", -.03, .06, -.09, .12, -.12, .15], ["c", -.06, .03, -.42, .21, -.84, .36], ["l", -.75, .33], ["l", -.03, 2.43], ["c", 0, 1.32, 0, 2.43, .03, 2.43], ["c", 0, -0, .27, -.12, .6, -.24], ["c", .69, -.27, .78, -.3, .96, -.15], ["c", .21, .15, .21, .18, .21, 1.38], ["c", 0, 1.02, 0, 1.11, -.06, 1.2], ["c", -.03, .06, -.09, .12, -.12, 
  .15], ["c", -.06, .03, -.42, .21, -.84, .36], ["l", -.75, .33], ["l", -.03, 2.52], ["c", 0, 2.28, -.03, 2.55, -.06, 2.64], ["c", -.21, .36, -.72, .36, -.93, -0], ["c", -.03, -.09, -.06, -.33, -.06, -2.43], ["l", 0, -2.31], ["l", -1.29, .51], ["l", -1.26, .51], ["l", 0, 2.43], ["c", 0, 2.58, 0, 2.52, -.15, 2.67], ["c", -.06, .09, -.27, .18, -.36, .18], ["c", -.12, -0, -.33, -.09, -.39, -.18], ["c", -.15, -.15, -.15, -.09, -.15, -2.43], ["c", 0, -1.23, 0, -2.22, -.03, -2.22], ["c", 0, -0, -.27, .12, 
  -.6, .24], ["c", -.69, .27, -.78, .3, -.96, .15], ["c", -.21, -.15, -.21, -.18, -.21, -1.38], ["c", 0, -1.02, 0, -1.11, .06, -1.2], ["c", .03, -.06, .09, -.12, .12, -.15], ["c", .06, -.03, .42, -.21, .84, -.36], ["l", .78, -.33], ["l", 0, -2.43], ["c", 0, -1.32, 0, -2.43, -.03, -2.43], ["c", 0, -0, -.27, .12, -.6, .24], ["c", -.69, .27, -.78, .3, -.96, .15], ["c", -.21, -.15, -.21, -.18, -.21, -1.38], ["c", 0, -1.02, 0, -1.11, .06, -1.2], ["c", .03, -.06, .09, -.12, .12, -.15], ["c", .06, -.03, 
  .42, -.21, .84, -.36], ["l", .78, -.33], ["l", 0, -2.52], ["c", 0, -2.28, .03, -2.55, .06, -2.64], ["c", .21, -.36, .72, -.36, .93, 0], ["c", .03, .09, .06, .33, .06, 2.43], ["l", .03, 2.31], ["l", 1.26, -.51], ["l", 1.26, -.51], ["l", 0, -2.43], ["c", 0, -2.28, 0, -2.43, .06, -2.55], ["c", .06, -.12, .12, -.18, .27, -.24], ["z"], ["m", -.33, 10.65], ["l", 0, -2.43], ["l", -1.29, .51], ["l", -1.26, .51], ["l", 0, 2.46], ["l", 0, 2.43], ["l", .09, -.03], ["c", .06, -.03, .63, -.27, 1.29, -.51], 
  ["l", 1.17, -.48], ["l", 0, -2.46], ["z"]], w:8.25, h:22.462}, "accidentals.halfsharp":{d:[["M", 2.43, -10.05], ["c", .21, -.12, .54, -.03, .66, .24], ["c", .06, .12, .06, .21, .06, 2.01], ["c", 0, 1.05, 0, 1.89, .03, 1.89], ["l", .72, -.48], ["c", .69, -.48, .69, -.51, .87, -.51], ["c", .15, 0, .18, .03, .27, .09], ["c", .21, .15, .21, .18, .21, 1.41], ["c", 0, 1.11, -.03, 1.14, -.09, 1.23], ["c", -.03, .03, -.48, .39, -1.02, .75], ["l", -.99, .66], ["l", 0, 2.37], ["c", 0, 1.32, 0, 2.37, .03, 
  2.37], ["l", .72, -.48], ["c", .69, -.48, .69, -.51, .87, -.51], ["c", .15, 0, .18, .03, .27, .09], ["c", .21, .15, .21, .18, .21, 1.41], ["c", 0, 1.11, -.03, 1.14, -.09, 1.23], ["c", -.03, .03, -.48, .39, -1.02, .75], ["l", -.99, .66], ["l", 0, 2.25], ["c", 0, 1.95, 0, 2.28, -.06, 2.37], ["c", -.06, .12, -.12, .21, -.24, .27], ["c", -.27, .12, -.54, .03, -.69, -.24], ["c", -.06, -.12, -.06, -.21, -.06, -2.01], ["c", 0, -1.05, 0, -1.89, -.03, -1.89], ["l", -.72, .48], ["c", -.69, .48, -.69, .48, 
  -.87, .48], ["c", -.15, 0, -.18, 0, -.27, -.06], ["c", -.21, -.15, -.21, -.18, -.21, -1.41], ["c", 0, -1.11, .03, -1.14, .09, -1.23], ["c", .03, -.03, .48, -.39, 1.02, -.75], ["l", .99, -.66], ["l", 0, -2.37], ["c", 0, -1.32, 0, -2.37, -.03, -2.37], ["l", -.72, .48], ["c", -.69, .48, -.69, .48, -.87, .48], ["c", -.15, 0, -.18, 0, -.27, -.06], ["c", -.21, -.15, -.21, -.18, -.21, -1.41], ["c", 0, -1.11, .03, -1.14, .09, -1.23], ["c", .03, -.03, .48, -.39, 1.02, -.75], ["l", .99, -.66], ["l", 0, -2.25], 
  ["c", 0, -2.13, 0, -2.28, .06, -2.4], ["c", .06, -.12, .12, -.18, .27, -.24], ["z"]], w:5.25, h:20.174}, "accidentals.nat":{d:[["M", .204, -11.4], ["c", .24, -.06, .78, 0, .99, .15], ["c", .03, .03, .03, .48, 0, 2.61], ["c", -.03, 1.44, -.03, 2.61, -.03, 2.61], ["c", 0, .03, .75, -.09, 1.68, -.24], ["c", .96, -.18, 1.71, -.27, 1.74, -.27], ["c", .15, .03, .27, .15, .36, .3], ["l", .06, .12], ["l", .09, 8.67], ["c", .09, 6.96, .12, 8.67, .09, 8.67], ["c", -.03, .03, -.12, .06, -.21, .09], ["c", 
  -.24, .09, -.72, .09, -.96, 0], ["c", -.09, -.03, -.18, -.06, -.21, -.09], ["c", -.03, -.03, -.03, -.48, 0, -2.61], ["c", .03, -1.44, .03, -2.61, .03, -2.61], ["c", 0, -.03, -.75, .09, -1.68, .24], ["c", -.96, .18, -1.71, .27, -1.74, .27], ["c", -.15, -.03, -.27, -.15, -.36, -.3], ["l", -.06, -.15], ["l", -.09, -7.53], ["c", -.06, -4.14, -.09, -8.04, -.12, -8.67], ["l", 0, -1.11], ["l", .15, -.06], ["c", .09, -.03, .21, -.06, .27, -.09], ["z"], ["m", 3.75, 8.4], ["c", 0, -.33, 0, -.42, -.03, -.42], 
  ["c", -.12, 0, -2.79, .45, -2.79, .48], ["c", -.03, 0, -.09, 6.3, -.09, 6.33], ["c", .03, 0, 2.79, -.45, 2.82, -.48], ["c", 0, 0, .09, -4.53, .09, -5.91], ["z"]], w:5.411, h:22.8}, "accidentals.flat":{d:[["M", -.36, -14.07], ["c", .33, -.06, .87, 0, 1.08, .15], ["c", .06, .03, .06, .36, -.03, 5.25], ["c", -.06, 2.85, -.09, 5.19, -.09, 5.19], ["c", 0, .03, .12, -.03, .24, -.12], ["c", .63, -.42, 1.41, -.66, 2.19, -.72], ["c", .81, -.03, 1.47, .21, 2.04, .78], ["c", .57, .54, .87, 1.26, .93, 2.04], 
  ["c", .03, .57, -.09, 1.08, -.36, 1.62], ["c", -.42, .81, -1.02, 1.38, -2.82, 2.61], ["c", -1.14, .78, -1.44, 1.02, -1.8, 1.44], ["c", -.18, .18, -.39, .39, -.45, .42], ["c", -.27, .18, -.57, .15, -.81, -.06], ["c", -.06, -.09, -.12, -.18, -.15, -.27], ["c", -.03, -.06, -.09, -3.27, -.18, -8.34], ["c", -.09, -4.53, -.15, -8.58, -.18, -9.03], ["l", 0, -.78], ["l", .12, -.06], ["c", .06, -.03, .18, -.09, .27, -.12], ["z"], ["m", 3.18, 11.01], ["c", -.21, -.12, -.54, -.15, -.81, -.06], ["c", -.54, 
  .15, -.99, .63, -1.17, 1.26], ["c", -.06, .3, -.12, 2.88, -.06, 3.87], ["c", .03, .42, .03, .81, .06, .9], ["l", .03, .12], ["l", .45, -.39], ["c", .63, -.54, 1.26, -1.17, 1.56, -1.59], ["c", .3, -.42, .6, -.99, .72, -1.41], ["c", .18, -.69, .09, -1.47, -.18, -2.07], ["c", -.15, -.3, -.33, -.51, -.6, -.63], ["z"]], w:6.75, h:18.801}, "accidentals.halfflat":{d:[["M", 4.83, -14.07], ["c", .33, -.06, .87, 0, 1.08, .15], ["c", .06, .03, .06, .6, -.12, 9.06], ["c", -.09, 5.55, -.15, 9.06, -.18, 9.12], 
  ["c", -.03, .09, -.09, .18, -.15, .27], ["c", -.24, .21, -.54, .24, -.81, .06], ["c", -.06, -.03, -.27, -.24, -.45, -.42], ["c", -.36, -.42, -.66, -.66, -1.8, -1.44], ["c", -1.23, -.84, -1.83, -1.32, -2.25, -1.77], ["c", -.66, -.78, -.96, -1.56, -.93, -2.46], ["c", .09, -1.41, 1.11, -2.58, 2.4, -2.79], ["c", .3, -.06, .84, -.03, 1.23, .06], ["c", .54, .12, 1.08, .33, 1.53, .63], ["c", .12, .09, .24, .15, .24, .12], ["c", 0, 0, -.12, -8.37, -.18, -9.75], ["l", 0, -.66], ["l", .12, -.06], ["c", .06, 
  -.03, .18, -.09, .27, -.12], ["z"], ["m", -1.65, 10.95], ["c", -.6, -.18, -1.08, .09, -1.38, .69], ["c", -.27, .6, -.36, 1.38, -.18, 2.07], ["c", .12, .42, .42, .99, .72, 1.41], ["c", .3, .42, .93, 1.05, 1.56, 1.59], ["l", .48, .39], ["l", 0, -.12], ["c", .03, -.09, .03, -.48, .06, -.9], ["c", .03, -.57, .03, -1.08, 0, -2.22], ["c", -.03, -1.62, -.03, -1.62, -.24, -2.07], ["c", -.21, -.42, -.6, -.75, -1.02, -.84], ["z"]], w:6.728, h:18.801}, "accidentals.dblflat":{d:[["M", -.36, -14.07], ["c", 
  .33, -.06, .87, 0, 1.08, .15], ["c", .06, .03, .06, .33, -.03, 4.89], ["c", -.06, 2.67, -.09, 5.01, -.09, 5.22], ["l", 0, .36], ["l", .15, -.15], ["c", .36, -.3, .75, -.51, 1.2, -.63], ["c", .33, -.09, .96, -.09, 1.26, -.03], ["c", .27, .09, .63, .27, .87, .45], ["l", .21, .15], ["l", 0, -.27], ["c", 0, -.15, -.03, -2.43, -.09, -5.1], ["c", -.09, -4.56, -.09, -4.86, -.03, -4.89], ["c", .15, -.12, .39, -.15, .72, -.15], ["c", .3, 0, .54, .03, .69, .15], ["c", .06, .03, .06, .33, -.03, 4.95], ["c", 
  -.06, 2.7, -.09, 5.04, -.09, 5.22], ["l", .03, .3], ["l", .21, -.15], ["c", .69, -.48, 1.44, -.69, 2.28, -.69], ["c", .51, 0, .78, .03, 1.2, .21], ["c", 1.32, .63, 2.01, 2.28, 1.53, 3.69], ["c", -.21, .57, -.51, 1.02, -1.05, 1.56], ["c", -.42, .42, -.81, .72, -1.92, 1.5], ["c", -1.26, .87, -1.5, 1.08, -1.86, 1.5], ["c", -.39, .45, -.54, .54, -.81, .51], ["c", -.18, 0, -.21, 0, -.33, -.06], ["l", -.21, -.21], ["l", -.06, -.12], ["l", -.03, -.99], ["c", -.03, -.54, -.03, -1.29, -.06, -1.68], ["l", 
  0, -.69], ["l", -.21, .24], ["c", -.36, .42, -.75, .75, -1.8, 1.62], ["c", -1.02, .84, -1.2, .99, -1.44, 1.38], ["c", -.36, .51, -.54, .6, -.9, .51], ["c", -.15, -.03, -.39, -.27, -.42, -.42], ["c", -.03, -.06, -.09, -3.27, -.18, -8.34], ["c", -.09, -4.53, -.15, -8.58, -.18, -9.03], ["l", 0, -.78], ["l", .12, -.06], ["c", .06, -.03, .18, -.09, .27, -.12], ["z"], ["m", 2.52, 10.98], ["c", -.18, -.09, -.48, -.12, -.66, -.06], ["c", -.39, .15, -.69, .54, -.84, 1.14], ["c", -.06, .24, -.06, .39, -.09, 
  1.74], ["c", -.03, 1.44, 0, 2.73, .06, 3.18], ["l", .03, .15], ["l", .27, -.27], ["c", .93, -.96, 1.5, -1.95, 1.74, -3.06], ["c", .06, -.27, .06, -.39, .06, -.96], ["c", 0, -.54, 0, -.69, -.06, -.93], ["c", -.09, -.51, -.27, -.81, -.51, -.93], ["z"], ["m", 5.43, 0], ["c", -.18, -.09, -.51, -.12, -.72, -.06], ["c", -.54, .12, -.96, .63, -1.17, 1.26], ["c", -.06, .3, -.12, 2.88, -.06, 3.9], ["c", .03, .42, .03, .81, .06, .9], ["l", .03, .12], ["l", .36, -.3], ["c", .42, -.36, 1.02, -.96, 1.29, -1.29], 
  ["c", .36, -.45, .66, -.99, .81, -1.41], ["c", .42, -1.23, .15, -2.76, -.6, -3.12], ["z"]], w:11.613, h:18.804}, "accidentals.dblsharp":{d:[["M", -.186, -3.96], ["c", .06, -.03, .12, -.06, .15, -.06], ["c", .09, 0, 2.76, .27, 2.79, .3], ["c", .12, .03, .15, .12, .15, .51], ["c", .06, .96, .24, 1.59, .57, 2.1], ["c", .06, .09, .15, .21, .18, .24], ["l", .09, .06], ["l", .09, -.06], ["c", .03, -.03, .12, -.15, .18, -.24], ["c", .33, -.51, .51, -1.14, .57, -2.1], ["c", 0, -.39, .03, -.45, .12, -.51], 
  ["c", .03, 0, .66, -.09, 1.44, -.15], ["c", 1.47, -.15, 1.5, -.15, 1.56, -.03], ["c", .03, .06, 0, .42, -.09, 1.44], ["c", -.09, .72, -.15, 1.35, -.15, 1.38], ["c", 0, .03, -.03, .09, -.06, .12], ["c", -.06, .06, -.12, .09, -.51, .09], ["c", -1.08, .06, -1.8, .3, -2.28, .75], ["l", -.12, .09], ["l", .09, .09], ["c", .12, .15, .39, .33, .63, .45], ["c", .42, .18, .96, .27, 1.68, .33], ["c", .39, -0, .45, .03, .51, .09], ["c", .03, .03, .06, .09, .06, .12], ["c", 0, .03, .06, .66, .15, 1.38], ["c", 
  .09, 1.02, .12, 1.38, .09, 1.44], ["c", -.06, .12, -.09, .12, -1.56, -.03], ["c", -.78, -.06, -1.41, -.15, -1.44, -.15], ["c", -.09, -.06, -.12, -.12, -.12, -.54], ["c", -.06, -.93, -.24, -1.56, -.57, -2.07], ["c", -.06, -.09, -.15, -.21, -.18, -.24], ["l", -.09, -.06], ["l", -.09, .06], ["c", -.03, .03, -.12, .15, -.18, .24], ["c", -.33, .51, -.51, 1.14, -.57, 2.07], ["c", 0, .42, -.03, .48, -.12, .54], ["c", -.03, 0, -.66, .09, -1.44, .15], ["c", -1.47, .15, -1.5, .15, -1.56, .03], ["c", -.03, 
  -.06, 0, -.42, .09, -1.44], ["c", .09, -.72, .15, -1.35, .15, -1.38], ["c", 0, -.03, .03, -.09, .06, -.12], ["c", .06, -.06, .12, -.09, .51, -.09], ["c", .72, -.06, 1.26, -.15, 1.68, -.33], ["c", .24, -.12, .51, -.3, .63, -.45], ["l", .09, -.09], ["l", -.12, -.09], ["c", -.48, -.45, -1.2, -.69, -2.28, -.75], ["c", -.39, 0, -.45, -.03, -.51, -.09], ["c", -.03, -.03, -.06, -.09, -.06, -.12], ["c", 0, -.03, -.06, -.63, -.12, -1.38], ["c", -.09, -.72, -.15, -1.35, -.15, -1.38], ["z"]], w:7.961, h:7.977}, 
  "dots.dot":{d:[["M", 1.32, -1.68], ["c", .09, -.03, .27, -.06, .39, -.06], ["c", .96, 0, 1.74, .78, 1.74, 1.71], ["c", 0, .96, -.78, 1.74, -1.71, 1.74], ["c", -.96, 0, -1.74, -.78, -1.74, -1.71], ["c", 0, -.78, .54, -1.5, 1.32, -1.68], ["z"]], w:3.45, h:3.45}, "noteheads.dbl":{d:[["M", -.69, -4.02], ["c", .18, -.09, .36, -.09, .54, 0], ["c", .18, .09, .24, .15, .33, .3], ["c", .06, .15, .06, .18, .06, 1.41], ["l", -0, 1.23], ["l", .12, -.18], ["c", .72, -1.26, 2.64, -2.31, 4.86, -2.64], ["c", .81, 
  -.15, 1.11, -.15, 2.13, -.15], ["c", .99, 0, 1.29, 0, 2.1, .15], ["c", .75, .12, 1.38, .27, 2.04, .54], ["c", 1.35, .51, 2.34, 1.26, 2.82, 2.1], ["l", .12, .18], ["l", 0, -1.23], ["c", 0, -1.2, 0, -1.26, .06, -1.38], ["c", .09, -.18, .15, -.24, .33, -.33], ["c", .18, -.09, .36, -.09, .54, 0], ["c", .18, .09, .24, .15, .33, .3], ["l", .06, .15], ["l", 0, 3.54], ["l", 0, 3.54], ["l", -.06, .15], ["c", -.09, .18, -.15, .24, -.33, .33], ["c", -.18, .09, -.36, .09, -.54, 0], ["c", -.18, -.09, -.24, 
  -.15, -.33, -.33], ["c", -.06, -.12, -.06, -.18, -.06, -1.38], ["l", 0, -1.23], ["l", -.12, .18], ["c", -.48, .84, -1.47, 1.59, -2.82, 2.1], ["c", -.84, .33, -1.71, .54, -2.85, .66], ["c", -.45, .06, -2.16, .06, -2.61, 0], ["c", -1.14, -.12, -2.01, -.33, -2.85, -.66], ["c", -1.35, -.51, -2.34, -1.26, -2.82, -2.1], ["l", -.12, -.18], ["l", 0, 1.23], ["c", 0, 1.23, 0, 1.26, -.06, 1.38], ["c", -.09, .18, -.15, .24, -.33, .33], ["c", -.18, .09, -.36, .09, -.54, 0], ["c", -.18, -.09, -.24, -.15, -.33, 
  -.33], ["l", -.06, -.15], ["l", 0, -3.54], ["c", 0, -3.48, 0, -3.54, .06, -3.66], ["c", .09, -.18, .15, -.24, .33, -.33], ["z"], ["m", 7.71, .63], ["c", -.36, -.06, -.9, -.06, -1.14, 0], ["c", -.3, .03, -.66, .24, -.87, .42], ["c", -.6, .54, -.9, 1.62, -.75, 2.82], ["c", .12, .93, .51, 1.68, 1.11, 2.31], ["c", .75, .72, 1.83, 1.2, 2.85, 1.26], ["c", 1.05, .06, 1.83, -.54, 2.1, -1.65], ["c", .21, -.9, .12, -1.95, -.24, -2.82], ["c", -.36, -.81, -1.08, -1.53, -1.95, -1.95], ["c", -.3, -.15, -.78, 
  -.3, -1.11, -.39], ["z"]], w:16.83, h:8.145}, "noteheads.whole":{d:[["M", 6.51, -4.05], ["c", .51, -.03, 2.01, 0, 2.52, .03], ["c", 1.41, .18, 2.64, .51, 3.72, 1.08], ["c", 1.2, .63, 1.95, 1.41, 2.19, 2.31], ["c", .09, .33, .09, .9, -0, 1.23], ["c", -.24, .9, -.99, 1.68, -2.19, 2.31], ["c", -1.08, .57, -2.28, .9, -3.75, 1.08], ["c", -.66, .06, -2.31, .06, -2.97, 0], ["c", -1.47, -.18, -2.67, -.51, -3.75, -1.08], ["c", -1.2, -.63, -1.95, -1.41, -2.19, -2.31], ["c", -.09, -.33, -.09, -.9, -0, -1.23], 
  ["c", .24, -.9, .99, -1.68, 2.19, -2.31], ["c", 1.2, -.63, 2.61, -.99, 4.23, -1.11], ["z"], ["m", .57, .66], ["c", -.87, -.15, -1.53, 0, -2.04, .51], ["c", -.15, .15, -.24, .27, -.33, .48], ["c", -.24, .51, -.36, 1.08, -.33, 1.77], ["c", .03, .69, .18, 1.26, .42, 1.77], ["c", .6, 1.17, 1.74, 1.98, 3.18, 2.22], ["c", 1.11, .21, 1.95, -.15, 2.34, -.99], ["c", .24, -.51, .36, -1.08, .33, -1.8], ["c", -.06, -1.11, -.45, -2.04, -1.17, -2.76], ["c", -.63, -.63, -1.47, -1.05, -2.4, -1.2], ["z"]], w:14.985, 
  h:8.097}, "noteheads.half":{d:[["M", 7.44, -4.05], ["c", .06, -.03, .27, -.03, .48, -.03], ["c", 1.05, 0, 1.71, .24, 2.1, .81], ["c", .42, .6, .45, 1.35, .18, 2.4], ["c", -.42, 1.59, -1.14, 2.73, -2.16, 3.39], ["c", -1.41, .93, -3.18, 1.44, -5.4, 1.53], ["c", -1.17, .03, -1.89, -.21, -2.28, -.81], ["c", -.42, -.6, -.45, -1.35, -.18, -2.4], ["c", .42, -1.59, 1.14, -2.73, 2.16, -3.39], ["c", .63, -.42, 1.23, -.72, 1.98, -.96], ["c", .9, -.3, 1.65, -.42, 3.12, -.54], ["z"], ["m", 1.29, .87], ["c", 
  -.27, -.09, -.63, -.12, -.9, -.03], ["c", -.72, .24, -1.53, .69, -3.27, 1.8], ["c", -2.34, 1.5, -3.3, 2.25, -3.57, 2.79], ["c", -.36, .72, -.06, 1.5, .66, 1.77], ["c", .24, .12, .69, .09, .99, 0], ["c", .84, -.3, 1.92, -.93, 4.14, -2.37], ["c", 1.62, -1.08, 2.37, -1.71, 2.61, -2.19], ["c", .36, -.72, .06, -1.5, -.66, -1.77], ["z"]], w:10.37, h:8.132}, "noteheads.quarter":{d:[["M", 6.09, -4.05], ["c", .36, -.03, 1.2, 0, 1.53, .06], ["c", 1.17, .24, 1.89, .84, 2.16, 1.83], ["c", .06, .18, .06, .3, 
  .06, .66], ["c", 0, .45, 0, .63, -.15, 1.08], ["c", -.66, 2.04, -3.06, 3.93, -5.52, 4.38], ["c", -.54, .09, -1.44, .09, -1.83, .03], ["c", -1.23, -.27, -1.98, -.87, -2.25, -1.86], ["c", -.06, -.18, -.06, -.3, -.06, -.66], ["c", 0, -.45, 0, -.63, .15, -1.08], ["c", .24, -.78, .75, -1.53, 1.44, -2.22], ["c", 1.2, -1.2, 2.85, -2.01, 4.47, -2.22], ["z"]], w:9.81, h:8.094}, "scripts.ufermata":{d:[["M", -.75, -10.77], ["c", .12, 0, .45, -.03, .69, -.03], ["c", 2.91, -.03, 5.55, 1.53, 7.41, 4.35], ["c", 
  1.17, 1.71, 1.95, 3.72, 2.43, 6.03], ["c", .12, .51, .12, .57, .03, .69], ["c", -.12, .21, -.48, .27, -.69, .12], ["c", -.12, -.09, -.18, -.24, -.27, -.69], ["c", -.78, -3.63, -3.42, -6.54, -6.78, -7.38], ["c", -.78, -.21, -1.2, -.24, -2.07, -.24], ["c", -.63, -0, -.84, -0, -1.2, .06], ["c", -1.83, .27, -3.42, 1.08, -4.8, 2.37], ["c", -1.41, 1.35, -2.4, 3.21, -2.85, 5.19], ["c", -.09, .45, -.15, .6, -.27, .69], ["c", -.21, .15, -.57, .09, -.69, -.12], ["c", -.09, -.12, -.09, -.18, .03, -.69], ["c", 
  .33, -1.62, .78, -3, 1.47, -4.38], ["c", 1.77, -3.54, 4.44, -5.67, 7.56, -5.97], ["z"], ["m", .33, 7.47], ["c", 1.38, -.3, 2.58, .9, 2.31, 2.25], ["c", -.15, .72, -.78, 1.35, -1.47, 1.5], ["c", -1.38, .27, -2.58, -.93, -2.31, -2.31], ["c", .15, -.69, .78, -1.29, 1.47, -1.44], ["z"]], w:19.748, h:11.289}, "scripts.dfermata":{d:[["M", -9.63, -.42], ["c", .15, -.09, .36, -.06, .51, .03], ["c", .12, .09, .18, .24, .27, .66], ["c", .78, 3.66, 3.42, 6.57, 6.78, 7.41], ["c", .78, .21, 1.2, .24, 2.07, 
  .24], ["c", .63, -0, .84, -0, 1.2, -.06], ["c", 1.83, -.27, 3.42, -1.08, 4.8, -2.37], ["c", 1.41, -1.35, 2.4, -3.21, 2.85, -5.22], ["c", .09, -.42, .15, -.57, .27, -.66], ["c", .21, -.15, .57, -.09, .69, .12], ["c", .09, .12, .09, .18, -.03, .69], ["c", -.33, 1.62, -.78, 3, -1.47, 4.38], ["c", -1.92, 3.84, -4.89, 6, -8.31, 6], ["c", -3.42, 0, -6.39, -2.16, -8.31, -6], ["c", -.48, -.96, -.84, -1.92, -1.14, -2.97], ["c", -.18, -.69, -.42, -1.74, -.42, -1.92], ["c", 0, -.12, .09, -.27, .24, -.33], 
  ["z"], ["m", 9.21, 0], ["c", 1.2, -.27, 2.34, .63, 2.34, 1.86], ["c", -0, .9, -.66, 1.68, -1.5, 1.89], ["c", -1.38, .27, -2.58, -.93, -2.31, -2.31], ["c", .15, -.69, .78, -1.29, 1.47, -1.44], ["z"]], w:19.744, h:11.274}, "scripts.sforzato":{d:[["M", -6.45, -3.69], ["c", .06, -.03, .15, -.06, .18, -.06], ["c", .06, 0, 2.85, .72, 6.24, 1.59], ["l", 6.33, 1.65], ["c", .33, .06, .45, .21, .45, .51], ["c", 0, .3, -.12, .45, -.45, .51], ["l", -6.33, 1.65], ["c", -3.39, .87, -6.18, 1.59, -6.21, 1.59], 
  ["c", -.21, -0, -.48, -.24, -.51, -.45], ["c", 0, -.15, .06, -.36, .18, -.45], ["c", .09, -.06, .87, -.27, 3.84, -1.05], ["c", 2.04, -.54, 3.84, -.99, 4.02, -1.02], ["c", .15, -.06, 1.14, -.24, 2.22, -.42], ["c", 1.05, -.18, 1.92, -.36, 1.92, -.36], ["c", 0, -0, -.87, -.18, -1.92, -.36], ["c", -1.08, -.18, -2.07, -.36, -2.22, -.42], ["c", -.18, -.03, -1.98, -.48, -4.02, -1.02], ["c", -2.97, -.78, -3.75, -.99, -3.84, -1.05], ["c", -.12, -.09, -.18, -.3, -.18, -.45], ["c", .03, -.15, .15, -.3, .3, 
  -.39], ["z"]], w:13.5, h:7.5}, "scripts.staccato":{d:[["M", -.36, -1.47], ["c", .93, -.21, 1.86, .51, 1.86, 1.47], ["c", -0, .93, -.87, 1.65, -1.8, 1.47], ["c", -.54, -.12, -1.02, -.57, -1.14, -1.08], ["c", -.21, -.81, .27, -1.65, 1.08, -1.86], ["z"]], w:2.989, h:3.004}, "scripts.tenuto":{d:[["M", -4.2, -.48], ["l", .12, -.06], ["l", 4.08, 0], ["l", 4.08, 0], ["l", .12, .06], ["c", .39, .21, .39, .75, 0, .96], ["l", -.12, .06], ["l", -4.08, 0], ["l", -4.08, 0], ["l", -.12, -.06], ["c", -.39, -.21, 
  -.39, -.75, 0, -.96], ["z"]], w:8.985, h:1.08}, "scripts.umarcato":{d:[["M", -.15, -8.19], ["c", .15, -.12, .36, -.03, .45, .15], ["c", .21, .42, 3.45, 7.65, 3.45, 7.71], ["c", -0, .12, -.12, .27, -.21, .3], ["c", -.03, .03, -.51, .03, -1.14, .03], ["c", -1.05, 0, -1.08, 0, -1.17, -.06], ["c", -.09, -.06, -.24, -.36, -1.17, -2.4], ["c", -.57, -1.29, -1.05, -2.34, -1.08, -2.34], ["c", -0, -.03, -.51, 1.02, -1.08, 2.34], ["c", -.93, 2.07, -1.08, 2.34, -1.14, 2.4], ["c", -.06, .03, -.15, .06, -.18, 
  .06], ["c", -.15, 0, -.33, -.18, -.33, -.33], ["c", -0, -.06, 3.24, -7.32, 3.45, -7.71], ["c", .03, -.06, .09, -.15, .15, -.15], ["z"]], w:7.5, h:8.245}, "scripts.dmarcato":{d:[["M", -3.57, .03], ["c", .03, 0, .57, -.03, 1.17, -.03], ["c", 1.05, 0, 1.08, 0, 1.17, .06], ["c", .09, .06, .24, .36, 1.17, 2.4], ["c", .57, 1.29, 1.05, 2.34, 1.08, 2.34], ["c", 0, .03, .51, -1.02, 1.08, -2.34], ["c", .93, -2.07, 1.08, -2.34, 1.14, -2.4], ["c", .06, -.03, .15, -.06, .18, -.06], ["c", .15, 0, .33, .18, .33, 
  .33], ["c", 0, .09, -3.45, 7.74, -3.54, 7.83], ["c", -.12, .12, -.3, .12, -.42, 0], ["c", -.09, -.09, -3.54, -7.74, -3.54, -7.83], ["c", 0, -.09, .12, -.27, .18, -.3], ["z"]], w:7.5, h:8.25}, "scripts.stopped":{d:[["M", -.27, -4.08], ["c", .18, -.09, .36, -.09, .54, 0], ["c", .18, .09, .24, .15, .33, .3], ["l", .06, .15], ["l", -0, 1.5], ["l", -0, 1.47], ["l", 1.47, 0], ["l", 1.5, 0], ["l", .15, .06], ["c", .15, .09, .21, .15, .3, .33], ["c", .09, .18, .09, .36, -0, .54], ["c", -.09, .18, -.15, 
  .24, -.33, .33], ["c", -.12, .06, -.18, .06, -1.62, .06], ["l", -1.47, 0], ["l", -0, 1.47], ["l", -0, 1.47], ["l", -.06, .15], ["c", -.09, .18, -.15, .24, -.33, .33], ["c", -.18, .09, -.36, .09, -.54, 0], ["c", -.18, -.09, -.24, -.15, -.33, -.33], ["l", -.06, -.15], ["l", -0, -1.47], ["l", -0, -1.47], ["l", -1.47, 0], ["c", -1.44, 0, -1.5, 0, -1.62, -.06], ["c", -.18, -.09, -.24, -.15, -.33, -.33], ["c", -.09, -.18, -.09, -.36, -0, -.54], ["c", .09, -.18, .15, -.24, .33, -.33], ["l", .15, -.06], 
  ["l", 1.47, 0], ["l", 1.47, 0], ["l", -0, -1.47], ["c", -0, -1.44, -0, -1.5, .06, -1.62], ["c", .09, -.18, .15, -.24, .33, -.33], ["z"]], w:8.295, h:8.295}, "scripts.upbow":{d:[["M", -4.65, -15.54], ["c", .12, -.09, .36, -.06, .48, .03], ["c", .03, .03, .09, .09, .12, .15], ["c", .03, .06, .66, 2.13, 1.41, 4.62], ["c", 1.35, 4.41, 1.38, 4.56, 2.01, 6.96], ["l", .63, 2.46], ["l", .63, -2.46], ["c", .63, -2.4, .66, -2.55, 2.01, -6.96], ["c", .75, -2.49, 1.38, -4.56, 1.41, -4.62], ["c", .06, -.15, 
  .18, -.21, .36, -.24], ["c", .15, 0, .3, .06, .39, .18], ["c", .15, .21, .24, -.18, -2.1, 7.56], ["c", -1.2, 3.96, -2.22, 7.32, -2.25, 7.41], ["c", 0, .12, -.06, .27, -.09, .3], ["c", -.12, .21, -.6, .21, -.72, 0], ["c", -.03, -.03, -.09, -.18, -.09, -.3], ["c", -.03, -.09, -1.05, -3.45, -2.25, -7.41], ["c", -2.34, -7.74, -2.25, -7.35, -2.1, -7.56], ["c", .03, -.03, .09, -.09, .15, -.12], ["z"]], w:9.73, h:15.608}, "scripts.downbow":{d:[["M", -5.55, -9.93], ["l", .09, -.06], ["l", 5.46, 0], ["l", 
  5.46, 0], ["l", .09, .06], ["l", .06, .09], ["l", 0, 4.77], ["c", 0, 5.28, 0, 4.89, -.18, 5.01], ["c", -.18, .12, -.42, .06, -.54, -.12], ["c", -.06, -.09, -.06, -.18, -.06, -2.97], ["l", 0, -2.85], ["l", -4.83, 0], ["l", -4.83, 0], ["l", 0, 2.85], ["c", 0, 2.79, 0, 2.88, -.06, 2.97], ["c", -.15, .24, -.51, .24, -.66, 0], ["c", -.06, -.09, -.06, -.21, -.06, -4.89], ["l", 0, -4.77], ["z"]], w:11.22, h:9.992}, "scripts.turn":{d:[["M", -4.77, -3.9], ["c", .36, -.06, 1.05, -.06, 1.44, .03], ["c", .78, 
  .15, 1.5, .51, 2.34, 1.14], ["c", .6, .45, 1.05, .87, 2.22, 2.01], ["c", 1.11, 1.08, 1.62, 1.5, 2.22, 1.86], ["c", .6, .36, 1.32, .57, 1.92, .57], ["c", .9, -0, 1.71, -.57, 1.89, -1.35], ["c", .24, -.93, -.39, -1.89, -1.35, -2.1], ["l", -.15, -.06], ["l", -.09, .15], ["c", -.03, .09, -.15, .24, -.24, .33], ["c", -.72, .72, -2.04, .54, -2.49, -.36], ["c", -.48, -.93, .03, -1.86, 1.17, -2.19], ["c", .3, -.09, 1.02, -.09, 1.35, -0], ["c", .99, .27, 1.74, .87, 2.25, 1.83], ["c", .69, 1.41, .63, 3, 
  -.21, 4.26], ["c", -.21, .3, -.69, .81, -.99, 1.02], ["c", -.3, .21, -.84, .45, -1.17, .54], ["c", -1.23, .36, -2.49, .15, -3.72, -.6], ["c", -.75, -.48, -1.41, -1.02, -2.85, -2.46], ["c", -1.11, -1.08, -1.62, -1.5, -2.22, -1.86], ["c", -.6, -.36, -1.32, -.57, -1.92, -.57], ["c", -.9, 0, -1.71, .57, -1.89, 1.35], ["c", -.24, .93, .39, 1.89, 1.35, 2.1], ["l", .15, .06], ["l", .09, -.15], ["c", .03, -.09, .15, -.24, .24, -.33], ["c", .72, -.72, 2.04, -.54, 2.49, .36], ["c", .48, .93, -.03, 1.86, 
  -1.17, 2.19], ["c", -.3, .09, -1.02, .09, -1.35, 0], ["c", -.99, -.27, -1.74, -.87, -2.25, -1.83], ["c", -.69, -1.41, -.63, -3, .21, -4.26], ["c", .21, -.3, .69, -.81, .99, -1.02], ["c", .48, -.33, 1.11, -.57, 1.74, -.66], ["z"]], w:16.366, h:7.893}, "scripts.trill":{d:[["M", -.51, -16.02], ["c", .12, -.09, .21, -.18, .21, -.18], ["l", -.81, 4.02], ["l", -.81, 4.02], ["c", .03, 0, .51, -.27, 1.08, -.6], ["c", .6, -.3, 1.14, -.63, 1.26, -.66], ["c", 1.14, -.54, 2.31, -.6, 3.09, -.18], ["c", .27, 
  .15, .54, .36, .6, .51], ["l", .06, .12], ["l", .21, -.21], ["c", .9, -.81, 2.22, -.99, 3.12, -.42], ["c", .6, .42, .9, 1.14, .78, 2.07], ["c", -.15, 1.29, -1.05, 2.31, -1.95, 2.25], ["c", -.48, -.03, -.78, -.3, -.96, -.81], ["c", -.09, -.27, -.09, -.9, -.03, -1.2], ["c", .21, -.75, .81, -1.23, 1.59, -1.32], ["l", .24, -.03], ["l", -.09, -.12], ["c", -.51, -.66, -1.62, -.63, -2.31, .03], ["c", -.39, .42, -.3, .09, -1.23, 4.77], ["l", -.81, 4.14], ["c", -.03, 0, -.12, -.03, -.21, -.09], ["c", -.33, 
  -.15, -.54, -.18, -.99, -.18], ["c", -.42, 0, -.66, .03, -1.05, .18], ["c", -.12, .06, -.21, .09, -.21, .09], ["c", 0, -.03, .36, -1.86, .81, -4.11], ["c", .9, -4.47, .87, -4.26, .69, -4.53], ["c", -.21, -.36, -.66, -.51, -1.17, -.36], ["c", -.15, .06, -2.22, 1.14, -2.58, 1.38], ["c", -.12, .09, -.12, .09, -.21, .6], ["l", -.09, .51], ["l", .21, .24], ["c", .63, .75, 1.02, 1.47, 1.2, 2.19], ["c", .06, .27, .06, .36, .06, .81], ["c", 0, .42, 0, .54, -.06, .78], ["c", -.15, .54, -.33, .93, -.63, 
  1.35], ["c", -.18, .24, -.57, .63, -.81, .78], ["c", -.24, .15, -.63, .36, -.84, .42], ["c", -.27, .06, -.66, .06, -.87, .03], ["c", -.81, -.18, -1.32, -1.05, -1.38, -2.46], ["c", -.03, -.6, .03, -.99, .33, -2.46], ["c", .21, -1.08, .24, -1.32, .21, -1.29], ["c", -1.2, .48, -2.4, .75, -3.21, .72], ["c", -.69, -.06, -1.17, -.3, -1.41, -.72], ["c", -.39, -.75, -.12, -1.8, .66, -2.46], ["c", .24, -.18, .69, -.42, 1.02, -.51], ["c", .69, -.18, 1.53, -.15, 2.31, .09], ["c", .3, .09, .75, .3, .99, .45], 
  ["c", .12, .09, .15, .09, .15, .03], ["c", .03, -.03, .33, -1.59, .72, -3.45], ["c", .36, -1.86, .66, -3.42, .69, -3.45], ["c", 0, -.03, .03, -.03, .21, .03], ["c", .21, .06, .27, .06, .48, .06], ["c", .42, -.03, .78, -.18, 1.26, -.48], ["c", .15, -.12, .36, -.27, .48, -.39], ["z"], ["m", -5.73, 7.68], ["c", -.27, -.03, -.96, -.06, -1.2, -.03], ["c", -.81, .12, -1.35, .57, -1.5, 1.2], ["c", -.18, .66, .12, 1.14, .75, 1.29], ["c", .66, .12, 1.92, -.12, 3.18, -.66], ["l", .33, -.15], ["l", .09, -.39], 
  ["c", .06, -.21, .09, -.42, .09, -.45], ["c", 0, -.03, -.45, -.3, -.75, -.45], ["c", -.27, -.15, -.66, -.27, -.99, -.36], ["z"], ["m", 4.29, 3.63], ["c", -.24, -.39, -.51, -.75, -.51, -.69], ["c", -.06, .12, -.39, 1.92, -.45, 2.28], ["c", -.09, .54, -.12, 1.14, -.06, 1.38], ["c", .06, .42, .21, .6, .51, .57], ["c", .39, -.06, .75, -.48, .93, -1.14], ["c", .09, -.33, .09, -1.05, -0, -1.38], ["c", -.09, -.39, -.24, -.69, -.42, -1.02], ["z"]], w:17.963, h:16.49}, "scripts.segno":{d:[["M", -3.72, -11.22], 
  ["c", .78, -.09, 1.59, .03, 2.31, .42], ["c", 1.2, .6, 2.01, 1.71, 2.31, 3.09], ["c", .09, .42, .09, 1.2, .03, 1.5], ["c", -.15, .45, -.39, .81, -.66, .93], ["c", -.33, .18, -.84, .21, -1.23, .15], ["c", -.81, -.18, -1.32, -.93, -1.26, -1.89], ["c", .03, -.36, .09, -.57, .24, -.9], ["c", .15, -.33, .45, -.6, .72, -.75], ["c", .12, -.06, .18, -.09, .18, -.12], ["c", 0, -.03, -.03, -.15, -.09, -.24], ["c", -.18, -.45, -.54, -.87, -.96, -1.08], ["c", -1.11, -.57, -2.34, -.18, -2.88, .9], ["c", -.24, 
  .51, -.33, 1.11, -.24, 1.83], ["c", .27, 1.92, 1.5, 3.54, 3.93, 5.13], ["c", .48, .33, 1.26, .78, 1.29, .78], ["c", .03, 0, 1.35, -2.19, 2.94, -4.89], ["l", 2.88, -4.89], ["l", .84, 0], ["l", .87, 0], ["l", -.03, .06], ["c", -.15, .21, -6.15, 10.41, -6.15, 10.44], ["c", 0, 0, .21, .15, .48, .27], ["c", 2.61, 1.47, 4.35, 3.03, 5.13, 4.65], ["c", 1.14, 2.34, .51, 5.07, -1.44, 6.39], ["c", -.66, .42, -1.32, .63, -2.13, .69], ["c", -2.01, .09, -3.81, -1.41, -4.26, -3.54], ["c", -.09, -.42, -.09, -1.2, 
  -.03, -1.5], ["c", .15, -.45, .39, -.81, .66, -.93], ["c", .33, -.18, .84, -.21, 1.23, -.15], ["c", .81, .18, 1.32, .93, 1.26, 1.89], ["c", -.03, .36, -.09, .57, -.24, .9], ["c", -.15, .33, -.45, .6, -.72, .75], ["c", -.12, .06, -.18, .09, -.18, .12], ["c", 0, .03, .03, .15, .09, .24], ["c", .18, .45, .54, .87, .96, 1.08], ["c", 1.11, .57, 2.34, .18, 2.88, -.9], ["c", .24, -.51, .33, -1.11, .24, -1.83], ["c", -.27, -1.92, -1.5, -3.54, -3.93, -5.13], ["c", -.48, -.33, -1.26, -.78, -1.29, -.78], 
  ["c", -.03, 0, -1.35, 2.19, -2.91, 4.89], ["l", -2.88, 4.89], ["l", -.87, 0], ["l", -.87, 0], ["l", .03, -.06], ["c", .15, -.21, 6.15, -10.41, 6.15, -10.44], ["c", 0, 0, -.21, -.15, -.48, -.3], ["c", -2.61, -1.44, -4.35, -3, -5.13, -4.62], ["c", -.9, -1.89, -.72, -4.02, .48, -5.52], ["c", .69, -.84, 1.68, -1.41, 2.73, -1.53], ["z"], ["m", 8.76, 9.09], ["c", .03, -.03, .15, -.03, .27, -.03], ["c", .33, .03, .57, .18, .72, .48], ["c", .09, .18, .09, .57, 0, .75], ["c", -.09, .18, -.21, .3, -.36, 
  .39], ["c", -.15, .06, -.21, .06, -.39, .06], ["c", -.21, 0, -.27, 0, -.39, -.06], ["c", -.3, -.15, -.48, -.45, -.48, -.75], ["c", 0, -.39, .24, -.72, .63, -.84], ["z"], ["m", -10.53, 2.61], ["c", .03, -.03, .15, -.03, .27, -.03], ["c", .33, .03, .57, .18, .72, .48], ["c", .09, .18, .09, .57, 0, .75], ["c", -.09, .18, -.21, .3, -.36, .39], ["c", -.15, .06, -.21, .06, -.39, .06], ["c", -.21, 0, -.27, 0, -.39, -.06], ["c", -.3, -.15, -.48, -.45, -.48, -.75], ["c", 0, -.39, .24, -.72, .63, -.84], 
  ["z"]], w:15, h:22.504}, "scripts.coda":{d:[["M", -.21, -10.47], ["c", .18, -.12, .42, -.06, .54, .12], ["c", .06, .09, .06, .18, .06, 1.5], ["l", 0, 1.38], ["l", .18, 0], ["c", .39, .06, .96, .24, 1.38, .48], ["c", 1.68, .93, 2.82, 3.24, 3.03, 6.12], ["c", .03, .24, .03, .45, .03, .45], ["c", 0, .03, .6, .03, 1.35, .03], ["c", 1.5, 0, 1.47, 0, 1.59, .18], ["c", .09, .12, .09, .3, -0, .42], ["c", -.12, .18, -.09, .18, -1.59, .18], ["c", -.75, 0, -1.35, 0, -1.35, .03], ["c", -0, 0, -0, .21, -.03, 
  .42], ["c", -.24, 3.15, -1.53, 5.58, -3.45, 6.36], ["c", -.27, .12, -.72, .24, -.96, .27], ["l", -.18, -0], ["l", -0, 1.38], ["c", -0, 1.32, -0, 1.41, -.06, 1.5], ["c", -.15, .24, -.51, .24, -.66, -0], ["c", -.06, -.09, -.06, -.18, -.06, -1.5], ["l", -0, -1.38], ["l", -.18, -0], ["c", -.39, -.06, -.96, -.24, -1.38, -.48], ["c", -1.68, -.93, -2.82, -3.24, -3.03, -6.15], ["c", -.03, -.21, -.03, -.42, -.03, -.42], ["c", 0, -.03, -.6, -.03, -1.35, -.03], ["c", -1.5, -0, -1.47, -0, -1.59, -.18], ["c", 
  -.09, -.12, -.09, -.3, 0, -.42], ["c", .12, -.18, .09, -.18, 1.59, -.18], ["c", .75, -0, 1.35, -0, 1.35, -.03], ["c", 0, -0, 0, -.21, .03, -.45], ["c", .24, -3.12, 1.53, -5.55, 3.45, -6.33], ["c", .27, -.12, .72, -.24, .96, -.27], ["l", .18, -0], ["l", 0, -1.38], ["c", 0, -1.53, 0, -1.5, .18, -1.62], ["z"], ["m", -.18, 6.93], ["c", 0, -2.97, 0, -3.15, -.06, -3.15], ["c", -.09, 0, -.51, .15, -.66, .21], ["c", -.87, .51, -1.38, 1.62, -1.56, 3.51], ["c", -.06, .54, -.12, 1.59, -.12, 2.16], ["l", 0, 
  .42], ["l", 1.2, 0], ["l", 1.2, 0], ["l", 0, -3.15], ["z"], ["m", 1.17, -3.06], ["c", -.09, -.03, -.21, -.06, -.27, -.09], ["l", -.12, 0], ["l", 0, 3.15], ["l", 0, 3.15], ["l", 1.2, 0], ["l", 1.2, 0], ["l", 0, -.81], ["c", -.06, -2.4, -.33, -3.69, -.93, -4.59], ["c", -.27, -.39, -.66, -.69, -1.08, -.81], ["z"], ["m", -1.17, 10.14], ["l", 0, -3.15], ["l", -1.2, -0], ["l", -1.2, -0], ["l", 0, .81], ["c", .03, .96, .06, 1.47, .15, 2.13], ["c", .24, 2.04, .96, 3.12, 2.13, 3.36], ["l", .12, -0], ["l", 
  0, -3.15], ["z"], ["m", 3.18, -2.34], ["l", 0, -.81], ["l", -1.2, 0], ["l", -1.2, 0], ["l", 0, 3.15], ["l", 0, 3.15], ["l", .12, 0], ["c", 1.17, -.24, 1.89, -1.32, 2.13, -3.36], ["c", .09, -.66, .12, -1.17, .15, -2.13], ["z"]], w:16.035, h:21.062}, "scripts.comma":{d:[["M", 1.14, -4.62], ["c", .3, -.12, .69, -.03, .93, .15], ["c", .12, .12, .36, .45, .51, .78], ["c", .9, 1.77, .54, 4.05, -1.08, 6.75], ["c", -.36, .63, -.87, 1.38, -.96, 1.44], ["c", -.18, .12, -.42, .06, -.54, -.12], ["c", -.09, 
  -.18, -.09, -.3, .12, -.6], ["c", .96, -1.44, 1.44, -2.97, 1.38, -4.35], ["c", -.06, -.93, -.3, -1.68, -.78, -2.46], ["c", -.27, -.39, -.33, -.63, -.24, -.96], ["c", .09, -.27, .36, -.54, .66, -.63], ["z"]], w:3.042, h:9.237}, "scripts.roll":{d:[["M", 1.95, -6], ["c", .21, -.09, .36, -.09, .57, 0], ["c", .39, .15, .63, .39, 1.47, 1.35], ["c", .66, .75, .78, .87, 1.08, 1.05], ["c", .75, .45, 1.65, .42, 2.4, -.06], ["c", .12, -.09, .27, -.27, .54, -.6], ["c", .42, -.54, .51, -.63, .69, -.63], ["c", 
  .09, 0, .3, .12, .36, .21], ["c", .09, .12, .12, .3, .03, .42], ["c", -.06, .12, -3.15, 3.9, -3.3, 4.08], ["c", -.06, .06, -.18, .12, -.27, .18], ["c", -.27, .12, -.6, .06, -.99, -.27], ["c", -.27, -.21, -.42, -.39, -1.08, -1.14], ["c", -.63, -.72, -.81, -.9, -1.17, -1.08], ["c", -.36, -.18, -.57, -.21, -.99, -.21], ["c", -.39, 0, -.63, .03, -.93, .18], ["c", -.36, .15, -.51, .27, -.9, .81], ["c", -.24, .27, -.45, .51, -.48, .54], ["c", -.12, .09, -.27, .06, -.39, 0], ["c", -.24, -.15, -.33, -.39, 
  -.21, -.6], ["c", .09, -.12, 3.18, -3.87, 3.33, -4.02], ["c", .06, -.06, .18, -.15, .24, -.21], ["z"]], w:10.817, h:6.125}, "scripts.prall":{d:[["M", -4.38, -3.69], ["c", .06, -.03, .18, -.06, .24, -.06], ["c", .3, 0, .27, -.03, 1.89, 1.95], ["l", 1.53, 1.83], ["c", .03, -0, .57, -.84, 1.23, -1.83], ["c", 1.14, -1.68, 1.23, -1.83, 1.35, -1.89], ["c", .06, -.03, .18, -.06, .24, -.06], ["c", .3, 0, .27, -.03, 1.89, 1.95], ["l", 1.53, 1.83], ["l", .48, -.69], ["c", .51, -.78, .54, -.84, .69, -.9], 
  ["c", .42, -.18, .87, .15, .81, .6], ["c", -.03, .12, -.3, .51, -1.5, 2.37], ["c", -1.38, 2.07, -1.5, 2.22, -1.62, 2.28], ["c", -.06, .03, -.18, .06, -.24, .06], ["c", -.3, 0, -.27, .03, -1.89, -1.95], ["l", -1.53, -1.83], ["c", -.03, 0, -.57, .84, -1.23, 1.83], ["c", -1.14, 1.68, -1.23, 1.83, -1.35, 1.89], ["c", -.06, .03, -.18, .06, -.24, .06], ["c", -.3, 0, -.27, .03, -1.89, -1.95], ["l", -1.53, -1.83], ["l", -.48, .69], ["c", -.51, .78, -.54, .84, -.69, .9], ["c", -.42, .18, -.87, -.15, -.81, 
  -.6], ["c", .03, -.12, .3, -.51, 1.5, -2.37], ["c", 1.38, -2.07, 1.5, -2.22, 1.62, -2.28], ["z"]], w:15.011, h:7.5}, "scripts.mordent":{d:[["M", -.21, -4.95], ["c", .27, -.15, .63, 0, .75, .27], ["c", .06, .12, .06, .24, .06, 1.44], ["l", 0, 1.29], ["l", .57, -.84], ["c", .51, -.75, .57, -.84, .69, -.9], ["c", .06, -.03, .18, -.06, .24, -.06], ["c", .3, 0, .27, -.03, 1.89, 1.95], ["l", 1.53, 1.83], ["l", .48, -.69], ["c", .51, -.78, .54, -.84, .69, -.9], ["c", .42, -.18, .87, .15, .81, .6], ["c", 
  -.03, .12, -.3, .51, -1.5, 2.37], ["c", -1.38, 2.07, -1.5, 2.22, -1.62, 2.28], ["c", -.06, .03, -.18, .06, -.24, .06], ["c", -.3, 0, -.27, .03, -1.83, -1.89], ["c", -.81, -.99, -1.5, -1.8, -1.53, -1.86], ["c", -.06, -.03, -.06, -.03, -.12, .03], ["c", -.06, .06, -.06, .15, -.06, 2.28], ["c", -0, 1.95, -0, 2.25, -.06, 2.34], ["c", -.18, .45, -.81, .48, -1.05, .03], ["c", -.03, -.06, -.06, -.24, -.06, -1.41], ["l", -0, -1.35], ["l", -.57, .84], ["c", -.54, .78, -.6, .87, -.72, .93], ["c", -.06, .03, 
  -.18, .06, -.24, .06], ["c", -.3, 0, -.27, .03, -1.89, -1.95], ["l", -1.53, -1.83], ["l", -.48, .69], ["c", -.51, .78, -.54, .84, -.69, .9], ["c", -.42, .18, -.87, -.15, -.81, -.6], ["c", .03, -.12, .3, -.51, 1.5, -2.37], ["c", 1.38, -2.07, 1.5, -2.22, 1.62, -2.28], ["c", .06, -.03, .18, -.06, .24, -.06], ["c", .3, 0, .27, -.03, 1.89, 1.95], ["l", 1.53, 1.83], ["c", .03, -0, .06, -.06, .09, -.09], ["c", .06, -.12, .06, -.15, .06, -2.28], ["c", -0, -1.92, -0, -2.22, .06, -2.31], ["c", .06, -.15, 
  .15, -.24, .3, -.3], ["z"]], w:15.011, h:10.012}, "flags.u8th":{d:[["M", -.42, 3.75], ["l", 0, -3.75], ["l", .21, 0], ["l", .21, 0], ["l", 0, .18], ["c", 0, .3, .06, .84, .12, 1.23], ["c", .24, 1.53, .9, 3.12, 2.13, 5.16], ["l", .99, 1.59], ["c", .87, 1.44, 1.38, 2.34, 1.77, 3.09], ["c", .81, 1.68, 1.2, 3.06, 1.26, 4.53], ["c", .03, 1.53, -.21, 3.27, -.75, 5.01], ["c", -.21, .69, -.51, 1.5, -.6, 1.59], ["c", -.09, .12, -.27, .21, -.42, .21], ["c", -.15, 0, -.42, -.12, -.51, -.21], ["c", -.15, -.18, 
  -.18, -.42, -.09, -.66], ["c", .15, -.33, .45, -1.2, .57, -1.62], ["c", .42, -1.38, .6, -2.58, .6, -3.9], ["c", 0, -.66, 0, -.81, -.06, -1.11], ["c", -.39, -2.07, -1.8, -4.26, -4.59, -7.14], ["l", -.42, -.45], ["l", -.21, 0], ["l", -.21, 0], ["l", 0, -3.75], ["z"]], w:6.692, h:22.59}, "flags.u16th":{d:[["M", -.42, 7.5], ["l", 0, -7.5], ["l", .21, 0], ["l", .21, 0], ["l", 0, .39], ["c", .06, 1.08, .39, 2.19, .99, 3.39], ["c", .45, .9, .87, 1.59, 1.95, 3.12], ["c", 1.29, 1.86, 1.77, 2.64, 2.22, 3.57], 
  ["c", .45, .93, .72, 1.8, .87, 2.64], ["c", .06, .51, .06, 1.5, 0, 1.92], ["c", -.12, .6, -.3, 1.2, -.54, 1.71], ["l", -.09, .24], ["l", .18, .45], ["c", .51, 1.2, .72, 2.22, .69, 3.42], ["c", -.06, 1.53, -.39, 3.03, -.99, 4.53], ["c", -.3, .75, -.36, .81, -.57, .9], ["c", -.15, .09, -.33, .06, -.48, -0], ["c", -.18, -.09, -.27, -.18, -.33, -.33], ["c", -.09, -.18, -.06, -.3, .12, -.75], ["c", .66, -1.41, 1.02, -2.88, 1.08, -4.32], ["c", 0, -.6, -.03, -1.05, -.18, -1.59], ["c", -.3, -1.2, -.99, 
  -2.4, -2.25, -3.87], ["c", -.42, -.48, -1.53, -1.62, -2.19, -2.22], ["l", -.45, -.42], ["l", -.03, 1.11], ["l", 0, 1.11], ["l", -.21, -0], ["l", -.21, -0], ["l", 0, -7.5], ["z"], ["m", 1.65, .09], ["c", -.3, -.3, -.69, -.72, -.9, -.87], ["l", -.33, -.33], ["l", 0, .15], ["c", 0, .3, .06, .81, .15, 1.26], ["c", .27, 1.29, .87, 2.61, 2.04, 4.29], ["c", .15, .24, .6, .87, .96, 1.38], ["l", 1.08, 1.53], ["l", .42, .63], ["c", .03, 0, .12, -.36, .21, -.72], ["c", .06, -.33, .06, -1.2, 0, -1.62], ["c", 
  -.33, -1.71, -1.44, -3.48, -3.63, -5.7], ["z"]], w:6.693, h:26.337}, "flags.u32nd":{d:[["M", -.42, 11.247], ["l", 0, -11.25], ["l", .21, 0], ["l", .21, 0], ["l", 0, .36], ["c", .09, 1.68, .69, 3.27, 2.07, 5.46], ["l", .87, 1.35], ["c", 1.02, 1.62, 1.47, 2.37, 1.86, 3.18], ["c", .48, 1.02, .78, 1.92, .93, 2.88], ["c", .06, .48, .06, 1.5, 0, 1.89], ["c", -.09, .42, -.21, .87, -.36, 1.26], ["l", -.12, .3], ["l", .15, .39], ["c", .69, 1.56, .84, 2.88, .54, 4.38], ["c", -.09, .45, -.27, 1.08, -.45, 
  1.47], ["l", -.12, .24], ["l", .18, .36], ["c", .33, .72, .57, 1.56, .69, 2.34], ["c", .12, 1.02, -.06, 2.52, -.42, 3.84], ["c", -.27, .93, -.75, 2.13, -.93, 2.31], ["c", -.18, .15, -.45, .18, -.66, .09], ["c", -.18, -.09, -.27, -.18, -.33, -.33], ["c", -.09, -.18, -.06, -.3, .06, -.6], ["c", .21, -.36, .42, -.9, .57, -1.38], ["c", .51, -1.41, .69, -3.06, .48, -4.08], ["c", -.15, -.81, -.57, -1.68, -1.2, -2.55], ["c", -.72, -.99, -1.83, -2.13, -3.3, -3.33], ["l", -.48, -.42], ["l", -.03, 1.53], 
  ["l", 0, 1.56], ["l", -.21, 0], ["l", -.21, 0], ["l", 0, -11.25], ["z"], ["m", 1.26, -3.96], ["c", -.27, -.3, -.54, -.6, -.66, -.72], ["l", -.18, -.21], ["l", 0, .42], ["c", .06, .87, .24, 1.74, .66, 2.67], ["c", .36, .87, .96, 1.86, 1.92, 3.18], ["c", .21, .33, .63, .87, .87, 1.23], ["c", .27, .39, .6, .84, .75, 1.08], ["l", .27, .39], ["l", .03, -.12], ["c", .12, -.45, .15, -1.05, .09, -1.59], ["c", -.27, -1.86, -1.38, -3.78, -3.75, -6.33], ["z"], ["m", -.27, 6.09], ["c", -.27, -.21, -.48, -.42, 
  -.51, -.45], ["c", -.06, -.03, -.06, -.03, -.06, .21], ["c", 0, .9, .3, 2.04, .81, 3.09], ["c", .48, 1.02, .96, 1.77, 2.37, 3.63], ["c", .6, .78, 1.05, 1.44, 1.29, 1.77], ["c", .06, .12, .15, .21, .15, .18], ["c", .03, -.03, .18, -.57, .24, -.87], ["c", .06, -.45, .06, -1.32, -.03, -1.74], ["c", -.09, -.48, -.24, -.9, -.51, -1.44], ["c", -.66, -1.35, -1.83, -2.7, -3.75, -4.38], ["z"]], w:6.697, h:32.145}, "flags.u64th":{d:[["M", -.42, 15], ["l", 0, -15], ["l", .21, 0], ["l", .21, 0], ["l", 0, .36], 
  ["c", .06, 1.2, .39, 2.37, 1.02, 3.66], ["c", .39, .81, .84, 1.56, 1.8, 3.09], ["c", .81, 1.26, 1.05, 1.68, 1.35, 2.22], ["c", .87, 1.5, 1.35, 2.79, 1.56, 4.08], ["c", .06, .54, .06, 1.56, -.03, 2.04], ["c", -.09, .48, -.21, .99, -.36, 1.35], ["l", -.12, .27], ["l", .12, .27], ["c", .09, .15, .21, .45, .27, .66], ["c", .69, 1.89, .63, 3.66, -.18, 5.46], ["l", -.18, .39], ["l", .15, .33], ["c", .3, .66, .51, 1.44, .63, 2.1], ["c", .06, .48, .06, 1.35, 0, 1.71], ["c", -.15, .57, -.42, 1.2, -.78, 
  1.68], ["l", -.21, .27], ["l", .18, .33], ["c", .57, 1.05, .93, 2.13, 1.02, 3.18], ["c", .06, .72, 0, 1.83, -.21, 2.79], ["c", -.18, 1.02, -.63, 2.34, -1.02, 3.09], ["c", -.15, .33, -.48, .45, -.78, .3], ["c", -.18, -.09, -.27, -.18, -.33, -.33], ["c", -.09, -.18, -.06, -.3, .03, -.54], ["c", .75, -1.5, 1.23, -3.45, 1.17, -4.89], ["c", -.06, -1.02, -.42, -2.01, -1.17, -3.15], ["c", -.48, -.72, -1.02, -1.35, -1.89, -2.22], ["c", -.57, -.57, -1.56, -1.5, -1.92, -1.77], ["l", -.12, -.09], ["l", 0, 
  1.68], ["l", 0, 1.68], ["l", -.21, 0], ["l", -.21, 0], ["l", 0, -15], ["z"], ["m", .93, -8.07], ["c", -.27, -.3, -.48, -.54, -.51, -.54], ["c", -0, 0, -0, .69, .03, 1.02], ["c", .15, 1.47, .75, 2.94, 2.04, 4.83], ["l", 1.08, 1.53], ["c", .39, .57, .84, 1.2, .99, 1.44], ["c", .15, .24, .3, .45, .3, .45], ["c", -0, 0, .03, -.09, .06, -.21], ["c", .36, -1.59, -.15, -3.33, -1.47, -5.4], ["c", -.63, -.93, -1.35, -1.83, -2.52, -3.12], ["z"], ["m", .06, 6.72], ["c", -.24, -.21, -.48, -.42, -.51, -.45], 
  ["l", -.06, -.06], ["l", 0, .33], ["c", 0, 1.2, .3, 2.34, .93, 3.6], ["c", .45, .9, .96, 1.68, 2.25, 3.51], ["c", .39, .54, .84, 1.17, 1.02, 1.44], ["c", .21, .33, .33, .51, .33, .48], ["c", .06, -.09, .21, -.63, .3, -.99], ["c", .06, -.33, .06, -.45, .06, -.96], ["c", -0, -.6, -.03, -.84, -.18, -1.35], ["c", -.3, -1.08, -1.02, -2.28, -2.13, -3.57], ["c", -.39, -.45, -1.44, -1.47, -2.01, -1.98], ["z"], ["m", 0, 6.72], ["c", -.24, -.21, -.48, -.39, -.51, -.42], ["l", -.06, -.06], ["l", 0, .33], 
  ["c", 0, 1.41, .45, 2.82, 1.38, 4.35], ["c", .42, .72, .72, 1.14, 1.86, 2.73], ["c", .36, .45, .75, .99, .87, 1.2], ["c", .15, .21, .3, .36, .3, .36], ["c", .06, 0, .3, -.48, .39, -.75], ["c", .09, -.36, .12, -.63, .12, -1.05], ["c", -.06, -1.05, -.45, -2.04, -1.2, -3.18], ["c", -.57, -.87, -1.11, -1.53, -2.07, -2.49], ["c", -.36, -.33, -.84, -.78, -1.08, -1.02], ["z"]], w:6.682, h:39.694}, "flags.d8th":{d:[["M", 5.67, -21.63], ["c", .24, -.12, .54, -.06, .69, .15], ["c", .06, .06, .21, .36, .39, 
  .66], ["c", .84, 1.77, 1.26, 3.36, 1.32, 5.1], ["c", .03, 1.29, -.21, 2.37, -.81, 3.63], ["c", -.6, 1.23, -1.26, 2.13, -3.21, 4.38], ["c", -1.35, 1.53, -1.86, 2.19, -2.4, 2.97], ["c", -.63, .93, -1.11, 1.92, -1.38, 2.79], ["c", -.15, .54, -.27, 1.35, -.27, 1.8], ["l", 0, .15], ["l", -.21, -0], ["l", -.21, -0], ["l", 0, -3.75], ["l", 0, -3.75], ["l", .21, 0], ["l", .21, 0], ["l", .48, -.3], ["c", 1.83, -1.11, 3.12, -2.1, 4.17, -3.12], ["c", .78, -.81, 1.32, -1.53, 1.71, -2.31], ["c", .45, -.93, 
  .6, -1.74, .51, -2.88], ["c", -.12, -1.56, -.63, -3.18, -1.47, -4.68], ["c", -.12, -.21, -.15, -.33, -.06, -.51], ["c", .06, -.15, .15, -.24, .33, -.33], ["z"]], w:8.492, h:21.691}, "flags.ugrace":{d:[["M", 6.03, 6.93], ["c", .15, -.09, .33, -.06, .51, 0], ["c", .15, .09, .21, .15, .3, .33], ["c", .09, .18, .06, .39, -.03, .54], ["c", -.06, .15, -10.89, 8.88, -11.07, 8.97], ["c", -.15, .09, -.33, .06, -.48, 0], ["c", -.18, -.09, -.24, -.15, -.33, -.33], ["c", -.09, -.18, -.06, -.39, .03, -.54], 
  ["c", .06, -.15, 10.89, -8.88, 11.07, -8.97], ["z"]], w:12.019, h:9.954}, "flags.dgrace":{d:[["M", -6.06, -15.93], ["c", .18, -.09, .33, -.12, .48, -.06], ["c", .18, .09, 14.01, 8.04, 14.1, 8.1], ["c", .12, .12, .18, .33, .18, .51], ["c", -.03, .21, -.15, .39, -.36, .48], ["c", -.18, .09, -.33, .12, -.48, .06], ["c", -.18, -.09, -14.01, -8.04, -14.1, -8.1], ["c", -.12, -.12, -.18, -.33, -.18, -.51], ["c", .03, -.21, .15, -.39, .36, -.48], ["z"]], w:15.12, h:9.212}, "flags.d16th":{d:[["M", 6.84, 
  -22.53], ["c", .27, -.12, .57, -.06, .72, .15], ["c", .15, .15, .33, .87, .45, 1.56], ["c", .06, .33, .06, 1.35, 0, 1.65], ["c", -.06, .33, -.15, .78, -.27, 1.11], ["c", -.12, .33, -.45, .96, -.66, 1.32], ["l", -.18, .27], ["l", .09, .18], ["c", .48, 1.02, .72, 2.25, .69, 3.3], ["c", -.06, 1.23, -.42, 2.28, -1.26, 3.45], ["c", -.57, .87, -.99, 1.32, -3, 3.39], ["c", -1.56, 1.56, -2.22, 2.4, -2.76, 3.45], ["c", -.42, .84, -.66, 1.8, -.66, 2.55], ["l", 0, .15], ["l", -.21, -0], ["l", -.21, -0], ["l", 
  0, -7.5], ["l", 0, -7.5], ["l", .21, -0], ["l", .21, -0], ["l", 0, 1.14], ["l", 0, 1.11], ["l", .27, -.15], ["c", 1.11, -.57, 1.77, -.99, 2.52, -1.47], ["c", 2.37, -1.56, 3.69, -3.15, 4.05, -4.83], ["c", .03, -.18, .03, -.39, .03, -.78], ["c", 0, -.6, -.03, -.93, -.24, -1.5], ["c", -.06, -.18, -.12, -.39, -.15, -.45], ["c", -.03, -.24, .12, -.48, .36, -.6], ["z"], ["m", -.63, 7.5], ["c", -.06, -.18, -.15, -.36, -.15, -.36], ["c", -.03, 0, -.03, .03, -.06, .06], ["c", -.06, .12, -.96, 1.02, -1.95, 
  1.98], ["c", -.63, .57, -1.26, 1.17, -1.44, 1.35], ["c", -1.53, 1.62, -2.28, 2.85, -2.55, 4.32], ["c", -.03, .18, -.03, .54, -.06, .99], ["l", 0, .69], ["l", .18, -.09], ["c", .93, -.54, 2.1, -1.29, 2.82, -1.83], ["c", .69, -.51, 1.02, -.81, 1.53, -1.29], ["c", 1.86, -1.89, 2.37, -3.66, 1.68, -5.82], ["z"]], w:8.475, h:22.591}, "flags.d32nd":{d:[["M", 6.794, -29.13], ["c", .27, -.12, .57, -.06, .72, .15], ["c", .12, .12, .27, .63, .36, 1.11], ["c", .33, 1.59, .06, 3.06, -.81, 4.47], ["l", -.18, 
  .27], ["l", .09, .15], ["c", .12, .24, .33, .69, .45, 1.05], ["c", .63, 1.83, .45, 3.57, -.57, 5.22], ["l", -.18, .3], ["l", .15, .27], ["c", .42, .87, .6, 1.71, .57, 2.61], ["c", -.06, 1.29, -.48, 2.46, -1.35, 3.78], ["c", -.54, .81, -.93, 1.29, -2.46, 3], ["c", -.51, .54, -1.05, 1.17, -1.26, 1.41], ["c", -1.56, 1.86, -2.25, 3.36, -2.37, 5.01], ["l", 0, .33], ["l", -.21, -0], ["l", -.21, -0], ["l", 0, -11.25], ["l", 0, -11.25], ["l", .21, 0], ["l", .21, 0], ["l", 0, 1.35], ["l", .03, 1.35], ["l", 
  .78, -.39], ["c", 1.38, -.69, 2.34, -1.26, 3.24, -1.92], ["c", 1.38, -1.02, 2.28, -2.13, 2.64, -3.21], ["c", .15, -.48, .18, -.72, .18, -1.29], ["c", 0, -.57, -.06, -.9, -.24, -1.47], ["c", -.06, -.18, -.12, -.39, -.15, -.45], ["c", -.03, -.24, .12, -.48, .36, -.6], ["z"], ["m", -.63, 7.2], ["c", -.09, -.18, -.12, -.21, -.12, -.15], ["c", -.03, .09, -1.02, 1.08, -2.04, 2.04], ["c", -1.17, 1.08, -1.65, 1.56, -2.07, 2.04], ["c", -.84, .96, -1.38, 1.86, -1.68, 2.76], ["c", -.21, .57, -.27, .99, -.3, 
  1.65], ["l", 0, .54], ["l", .66, -.33], ["c", 3.57, -1.86, 5.49, -3.69, 5.94, -5.7], ["c", .06, -.39, .06, -1.2, -.03, -1.65], ["c", -.06, -.39, -.24, -.9, -.36, -1.2], ["z"], ["m", -.06, 7.2], ["c", -.06, -.15, -.12, -.33, -.15, -.45], ["l", -.06, -.18], ["l", -.18, .21], ["l", -1.83, 1.83], ["c", -.87, .9, -1.77, 1.8, -1.95, 2.01], ["c", -1.08, 1.29, -1.62, 2.31, -1.89, 3.51], ["c", -.06, .3, -.06, .51, -.09, .93], ["l", 0, .57], ["l", .09, -.06], ["c", .75, -.45, 1.89, -1.26, 2.52, -1.74], ["c", 
  .81, -.66, 1.74, -1.53, 2.22, -2.16], ["c", 1.26, -1.53, 1.68, -3.06, 1.32, -4.47], ["z"]], w:8.475, h:29.191}, "flags.d64th":{d:[["M", 7.08, -32.88], ["c", .3, -.12, .66, -.03, .78, .24], ["c", .18, .33, .27, 2.1, .15, 2.64], ["c", -.09, .39, -.21, .78, -.39, 1.08], ["l", -.15, .3], ["l", .09, .27], ["c", .03, .12, .09, .45, .12, .69], ["c", .27, 1.44, .18, 2.55, -.3, 3.6], ["l", -.12, .33], ["l", .06, .42], ["c", .27, 1.35, .33, 2.82, .21, 3.63], ["c", -.12, .6, -.3, 1.23, -.57, 1.8], ["l", -.15, 
  .27], ["l", .03, .42], ["c", .06, 1.02, .06, 2.7, .03, 3.06], ["c", -.15, 1.47, -.66, 2.76, -1.74, 4.41], ["c", -.45, .69, -.75, 1.11, -1.74, 2.37], ["c", -1.05, 1.38, -1.5, 1.98, -1.95, 2.73], ["c", -.93, 1.5, -1.38, 2.82, -1.44, 4.2], ["l", 0, .42], ["l", -.21, -0], ["l", -.21, -0], ["l", 0, -15], ["l", 0, -15], ["l", .21, -0], ["l", .21, -0], ["l", 0, 1.86], ["l", 0, 1.89], ["c", 0, -0, .21, -.03, .45, -.09], ["c", 2.22, -.39, 4.08, -1.11, 5.19, -2.01], ["c", .63, -.54, 1.02, -1.14, 1.2, -1.8], 
  ["c", .06, -.3, .06, -1.14, -.03, -1.65], ["c", -.03, -.18, -.06, -.39, -.09, -.48], ["c", -.03, -.24, .12, -.48, .36, -.6], ["z"], ["m", -.45, 6.15], ["c", -.03, -.18, -.06, -.42, -.06, -.54], ["l", -.03, -.18], ["l", -.33, .3], ["c", -.42, .36, -.87, .72, -1.68, 1.29], ["c", -1.98, 1.38, -2.25, 1.59, -2.85, 2.16], ["c", -.75, .69, -1.23, 1.44, -1.47, 2.19], ["c", -.15, .45, -.18, .63, -.21, 1.35], ["l", 0, .66], ["l", .39, -.18], ["c", 1.83, -.9, 3.45, -1.95, 4.47, -2.91], ["c", .93, -.9, 1.53, 
  -1.83, 1.74, -2.82], ["c", .06, -.33, .06, -.87, .03, -1.32], ["z"], ["m", -.27, 4.86], ["c", -.03, -.21, -.06, -.36, -.06, -.36], ["c", 0, -.03, -.12, .09, -.24, .24], ["c", -.39, .48, -.99, 1.08, -2.16, 2.19], ["c", -1.47, 1.38, -1.92, 1.83, -2.46, 2.49], ["c", -.66, .87, -1.08, 1.74, -1.29, 2.58], ["c", -.09, .42, -.15, .87, -.15, 1.44], ["l", 0, .54], ["l", .48, -.33], ["c", 1.5, -1.02, 2.58, -1.89, 3.51, -2.82], ["c", 1.47, -1.47, 2.25, -2.85, 2.4, -4.26], ["c", .03, -.39, .03, -1.17, -.03, 
  -1.71], ["z"], ["m", -.66, 7.68], ["c", .03, -.15, .03, -.6, .03, -.99], ["l", 0, -.72], ["l", -.27, .33], ["l", -1.74, 1.98], ["c", -1.77, 1.92, -2.43, 2.76, -2.97, 3.9], ["c", -.51, 1.02, -.72, 1.77, -.75, 2.91], ["c", 0, .63, 0, .63, .06, .6], ["c", .03, -.03, .3, -.27, .63, -.54], ["c", .66, -.6, 1.86, -1.8, 2.31, -2.31], ["c", 1.65, -1.89, 2.52, -3.54, 2.7, -5.16], ["z"]], w:8.485, h:32.932}, "clefs.C":{d:[["M", .06, -14.94], ["l", .09, -.06], ["l", 1.92, 0], ["l", 1.92, 0], ["l", .09, .06], 
  ["l", .06, .09], ["l", 0, 14.85], ["l", 0, 14.82], ["l", -.06, .09], ["l", -.09, .06], ["l", -1.92, 0], ["l", -1.92, 0], ["l", -.09, -.06], ["l", -.06, -.09], ["l", 0, -14.82], ["l", 0, -14.85], ["z"], ["m", 5.37, 0], ["c", .09, -.06, .09, -.06, .57, -.06], ["c", .45, 0, .45, 0, .54, .06], ["l", .06, .09], ["l", 0, 7.14], ["l", 0, 7.11], ["l", .09, -.06], ["c", .18, -.18, .72, -.84, .96, -1.2], ["c", .3, -.45, .66, -1.17, .84, -1.65], ["c", .36, -.9, .57, -1.83, .6, -2.79], ["c", .03, -.48, .03, 
  -.54, .09, -.63], ["c", .12, -.18, .36, -.21, .54, -.12], ["c", .18, .09, .21, .15, .24, .66], ["c", .06, .87, .21, 1.56, .57, 2.22], ["c", .51, 1.02, 1.26, 1.68, 2.22, 1.92], ["c", .21, .06, .33, .06, .78, .06], ["c", .45, -0, .57, -0, .84, -.06], ["c", .45, -.12, .81, -.33, 1.08, -.6], ["c", .57, -.57, .87, -1.41, .99, -2.88], ["c", .06, -.54, .06, -3, 0, -3.57], ["c", -.21, -2.58, -.84, -3.87, -2.16, -4.5], ["c", -.48, -.21, -1.17, -.36, -1.77, -.36], ["c", -.69, 0, -1.29, .27, -1.5, .72], ["c", 
  -.06, .15, -.06, .21, -.06, .42], ["c", 0, .24, 0, .3, .06, .45], ["c", .12, .24, .24, .39, .63, .66], ["c", .42, .3, .57, .48, .69, .72], ["c", .06, .15, .06, .21, .06, .48], ["c", 0, .39, -.03, .63, -.21, .96], ["c", -.3, .6, -.87, 1.08, -1.5, 1.26], ["c", -.27, .06, -.87, .06, -1.14, 0], ["c", -.78, -.24, -1.44, -.87, -1.65, -1.68], ["c", -.12, -.42, -.09, -1.17, .09, -1.71], ["c", .51, -1.65, 1.98, -2.82, 3.81, -3.09], ["c", .84, -.09, 2.46, .03, 3.51, .27], ["c", 2.22, .57, 3.69, 1.8, 4.44, 
  3.75], ["c", .36, .93, .57, 2.13, .57, 3.36], ["c", -0, 1.44, -.48, 2.73, -1.38, 3.81], ["c", -1.26, 1.5, -3.27, 2.43, -5.28, 2.43], ["c", -.48, -0, -.51, -0, -.75, -.09], ["c", -.15, -.03, -.48, -.21, -.78, -.36], ["c", -.69, -.36, -.87, -.42, -1.26, -.42], ["c", -.27, -0, -.3, -0, -.51, .09], ["c", -.57, .3, -.81, .9, -.81, 2.1], ["c", -0, 1.23, .24, 1.83, .81, 2.13], ["c", .21, .09, .24, .09, .51, .09], ["c", .39, -0, .57, -.06, 1.26, -.42], ["c", .3, -.15, .63, -.33, .78, -.36], ["c", .24, 
  -.09, .27, -.09, .75, -.09], ["c", 2.01, -0, 4.02, .93, 5.28, 2.4], ["c", .9, 1.11, 1.38, 2.4, 1.38, 3.84], ["c", -0, 1.5, -.3, 2.88, -.84, 3.96], ["c", -.78, 1.59, -2.19, 2.64, -4.17, 3.15], ["c", -1.05, .24, -2.67, .36, -3.51, .27], ["c", -1.83, -.27, -3.3, -1.44, -3.81, -3.09], ["c", -.18, -.54, -.21, -1.29, -.09, -1.74], ["c", .15, -.6, .63, -1.2, 1.23, -1.47], ["c", .36, -.18, .57, -.21, .99, -.21], ["c", .42, 0, .63, .03, 1.02, .21], ["c", .42, .21, .84, .63, 1.05, 1.05], ["c", .18, .36, 
  .21, .6, .21, .96], ["c", -0, .3, -0, .36, -.06, .51], ["c", -.12, .24, -.27, .42, -.69, .72], ["c", -.57, .42, -.69, .63, -.69, 1.08], ["c", -0, .24, -0, .3, .06, .45], ["c", .12, .21, .3, .39, .57, .54], ["c", .42, .18, .87, .21, 1.53, .15], ["c", 1.08, -.15, 1.8, -.57, 2.34, -1.32], ["c", .54, -.75, .84, -1.83, .99, -3.51], ["c", .06, -.57, .06, -3.03, -0, -3.57], ["c", -.12, -1.47, -.42, -2.31, -.99, -2.88], ["c", -.27, -.27, -.63, -.48, -1.08, -.6], ["c", -.27, -.06, -.39, -.06, -.84, -.06], 
  ["c", -.45, 0, -.57, 0, -.78, .06], ["c", -1.14, .27, -2.01, 1.17, -2.46, 2.49], ["c", -.21, .57, -.3, .99, -.33, 1.65], ["c", -.03, .51, -.06, .57, -.24, .66], ["c", -.12, .06, -.27, .06, -.39, 0], ["c", -.21, -.09, -.21, -.15, -.24, -.75], ["c", -.09, -1.92, -.78, -3.72, -2.01, -5.19], ["c", -.18, -.21, -.36, -.42, -.39, -.45], ["l", -.09, -.06], ["l", -0, 7.11], ["l", -0, 7.14], ["l", -.06, .09], ["c", -.09, .06, -.09, .06, -.54, .06], ["c", -.48, 0, -.48, 0, -.57, -.06], ["l", -.06, -.09], 
  ["l", -0, -14.82], ["l", -0, -14.85], ["z"]], w:20.31, h:29.97}, "clefs.F":{d:[["M", 6.3, -7.8], ["c", .36, -.03, 1.65, 0, 2.13, .03], ["c", 3.6, .42, 6.03, 2.1, 6.93, 4.86], ["c", .27, .84, .36, 1.5, .36, 2.58], ["c", 0, .9, -.03, 1.35, -.18, 2.16], ["c", -.78, 3.78, -3.54, 7.08, -8.37, 9.96], ["c", -1.74, 1.05, -3.87, 2.13, -6.18, 3.12], ["c", -.39, .18, -.75, .33, -.81, .36], ["c", -.06, .03, -.15, .06, -.18, .06], ["c", -.15, 0, -.33, -.18, -.33, -.33], ["c", 0, -.15, .06, -.21, .51, -.48], 
  ["c", 3, -1.77, 5.13, -3.21, 6.84, -4.74], ["c", .51, -.45, 1.59, -1.5, 1.95, -1.95], ["c", 1.89, -2.19, 2.88, -4.32, 3.15, -6.78], ["c", .06, -.42, .06, -1.77, 0, -2.19], ["c", -.24, -2.01, -.93, -3.63, -2.04, -4.71], ["c", -.63, -.63, -1.29, -1.02, -2.07, -1.2], ["c", -1.62, -.39, -3.36, .15, -4.56, 1.44], ["c", -.54, .6, -1.05, 1.47, -1.32, 2.22], ["l", -.09, .21], ["l", .24, -.12], ["c", .39, -.21, .63, -.24, 1.11, -.24], ["c", .3, 0, .45, 0, .66, .06], ["c", 1.92, .48, 2.85, 2.55, 1.95, 4.38], 
  ["c", -.45, .99, -1.41, 1.62, -2.46, 1.71], ["c", -1.47, .09, -2.91, -.87, -3.39, -2.25], ["c", -.18, -.57, -.21, -1.32, -.03, -2.28], ["c", .39, -2.25, 1.83, -4.2, 3.81, -5.19], ["c", .69, -.36, 1.59, -.6, 2.37, -.69], ["z"], ["m", 11.58, 2.52], ["c", .84, -.21, 1.71, .3, 1.89, 1.14], ["c", .3, 1.17, -.72, 2.19, -1.89, 1.89], ["c", -.99, -.21, -1.5, -1.32, -1.02, -2.25], ["c", .18, -.39, .6, -.69, 1.02, -.78], ["z"], ["m", 0, 7.5], ["c", .84, -.21, 1.71, .3, 1.89, 1.14], ["c", .21, .87, -.3, 1.71, 
  -1.14, 1.89], ["c", -.87, .21, -1.71, -.3, -1.89, -1.14], ["c", -.21, -.84, .3, -1.71, 1.14, -1.89], ["z"]], w:20.153, h:23.142}, "clefs.G":{d:[["M", 9.69, -37.41], ["c", .09, -.09, .24, -.06, .36, 0], ["c", .12, .09, .57, .6, .96, 1.11], ["c", 1.77, 2.34, 3.21, 5.85, 3.57, 8.73], ["c", .21, 1.56, .03, 3.27, -.45, 4.86], ["c", -.69, 2.31, -1.92, 4.47, -4.23, 7.44], ["c", -.3, .39, -.57, .72, -.6, .75], ["c", -.03, .06, 0, .15, .18, .78], ["c", .54, 1.68, 1.38, 4.44, 1.68, 5.49], ["l", .09, .42], 
  ["l", .39, -0], ["c", 1.47, .09, 2.76, .51, 3.96, 1.29], ["c", 1.83, 1.23, 3.06, 3.21, 3.39, 5.52], ["c", .09, .45, .12, 1.29, .06, 1.74], ["c", -.09, 1.02, -.33, 1.83, -.75, 2.73], ["c", -.84, 1.71, -2.28, 3.06, -4.02, 3.72], ["l", -.33, .12], ["l", .03, 1.26], ["c", 0, 1.74, -.06, 3.63, -.21, 4.62], ["c", -.45, 3.06, -2.19, 5.49, -4.47, 6.21], ["c", -.57, .18, -.9, .21, -1.59, .21], ["c", -.69, -0, -1.02, -.03, -1.65, -.21], ["c", -1.14, -.27, -2.13, -.84, -2.94, -1.65], ["c", -.99, -.99, -1.56, 
  -2.16, -1.71, -3.54], ["c", -.09, -.81, .06, -1.53, .45, -2.13], ["c", .63, -.99, 1.83, -1.56, 3, -1.53], ["c", 1.5, .09, 2.64, 1.32, 2.73, 2.94], ["c", .06, 1.47, -.93, 2.7, -2.37, 2.97], ["c", -.45, .06, -.84, .03, -1.29, -.09], ["l", -.21, -.09], ["l", .09, .12], ["c", .39, .54, .78, .93, 1.32, 1.26], ["c", 1.35, .87, 3.06, 1.02, 4.35, .36], ["c", 1.44, -.72, 2.52, -2.28, 2.97, -4.35], ["c", .15, -.66, .24, -1.5, .3, -3.03], ["c", .03, -.84, .03, -2.94, -0, -3], ["c", -.03, -0, -.18, -0, -.36, 
  .03], ["c", -.66, .12, -.99, .12, -1.83, .12], ["c", -1.05, -0, -1.71, -.06, -2.61, -.3], ["c", -4.02, -.99, -7.11, -4.35, -7.8, -8.46], ["c", -.12, -.66, -.12, -.99, -.12, -1.83], ["c", -0, -.84, -0, -1.14, .15, -1.92], ["c", .36, -2.28, 1.41, -4.62, 3.3, -7.29], ["l", 2.79, -3.6], ["c", .54, -.66, .96, -1.2, .96, -1.23], ["c", -0, -.03, -.09, -.33, -.18, -.69], ["c", -.96, -3.21, -1.41, -5.28, -1.59, -7.68], ["c", -.12, -1.38, -.15, -3.09, -.06, -3.96], ["c", .33, -2.67, 1.38, -5.07, 3.12, -7.08], 
  ["c", .36, -.42, .99, -1.05, 1.17, -1.14], ["z"], ["m", 2.01, 4.71], ["c", -.15, -.3, -.3, -.54, -.3, -.54], ["c", -.03, 0, -.18, .09, -.3, .21], ["c", -2.4, 1.74, -3.87, 4.2, -4.26, 7.11], ["c", -.06, .54, -.06, 1.41, -.03, 1.89], ["c", .09, 1.29, .48, 3.12, 1.08, 5.22], ["c", .15, .42, .24, .78, .24, .81], ["c", 0, .03, .84, -1.11, 1.23, -1.68], ["c", 1.89, -2.73, 2.88, -5.07, 3.15, -7.53], ["c", .09, -.57, .12, -1.74, .06, -2.37], ["c", -.09, -1.23, -.27, -1.92, -.87, -3.12], ["z"], ["m", -2.94, 
  20.7], ["c", -.21, -.72, -.39, -1.32, -.42, -1.32], ["c", 0, 0, -1.2, 1.47, -1.86, 2.37], ["c", -2.79, 3.63, -4.02, 6.3, -4.35, 9.3], ["c", -.03, .21, -.03, .69, -.03, 1.08], ["c", 0, .69, 0, .75, .06, 1.11], ["c", .12, .54, .27, .99, .51, 1.47], ["c", .69, 1.38, 1.83, 2.55, 3.42, 3.42], ["c", .96, .54, 2.07, .9, 3.21, 1.08], ["c", .78, .12, 2.04, .12, 2.94, -.03], ["c", .51, -.06, .45, -.03, .42, -.3], ["c", -.24, -3.33, -.72, -6.33, -1.62, -10.08], ["c", -.09, -.39, -.18, -.75, -.18, -.78], ["c", 
  -.03, -.03, -.42, -0, -.81, .09], ["c", -.9, .18, -1.65, .57, -2.22, 1.14], ["c", -.72, .72, -1.08, 1.65, -1.05, 2.64], ["c", .06, .96, .48, 1.83, 1.23, 2.58], ["c", .36, .36, .72, .63, 1.17, .9], ["c", .33, .18, .36, .21, .42, .33], ["c", .18, .42, -.18, .9, -.6, .87], ["c", -.18, -.03, -.84, -.36, -1.26, -.63], ["c", -.78, -.51, -1.38, -1.11, -1.86, -1.83], ["c", -1.77, -2.7, -.99, -6.42, 1.71, -8.19], ["c", .3, -.21, .81, -.48, 1.17, -.63], ["c", .3, -.09, 1.02, -.3, 1.14, -.3], ["c", .06, -0, 
  .09, -0, .09, -.03], ["c", .03, -.03, -.51, -1.92, -1.23, -4.26], ["z"], ["m", 3.78, 7.41], ["c", -.18, -.03, -.36, -.06, -.39, -.06], ["c", -.03, 0, 0, .21, .18, 1.02], ["c", .75, 3.18, 1.26, 6.3, 1.5, 9.09], ["c", .06, .72, 0, .69, .51, .42], ["c", .78, -.36, 1.44, -.96, 1.98, -1.77], ["c", 1.08, -1.62, 1.2, -3.69, .3, -5.55], ["c", -.81, -1.62, -2.31, -2.79, -4.08, -3.15], ["z"]], w:19.051, h:57.057}, "clefs.perc":{d:[["M", 5.07, -7.44], ["l", .09, -.06], ["l", 1.53, 0], ["l", 1.53, 0], ["l", 
  .09, .06], ["l", .06, .09], ["l", 0, 7.35], ["l", 0, 7.32], ["l", -.06, .09], ["l", -.09, .06], ["l", -1.53, -0], ["l", -1.53, -0], ["l", -.09, -.06], ["l", -.06, -.09], ["l", 0, -7.32], ["l", 0, -7.35], ["z"], ["m", 6.63, 0], ["l", .09, -.06], ["l", 1.53, 0], ["l", 1.53, 0], ["l", .09, .06], ["l", .06, .09], ["l", 0, 7.35], ["l", 0, 7.32], ["l", -.06, .09], ["l", -.09, .06], ["l", -1.53, -0], ["l", -1.53, -0], ["l", -.09, -.06], ["l", -.06, -.09], ["l", 0, -7.32], ["l", 0, -7.35], ["z"]], w:9.99, 
  h:14.97}, "timesig.common":{d:[["M", 6.66, -7.826], ["c", .72, -.06, 1.41, -.03, 1.98, .09], ["c", 1.2, .27, 2.34, .96, 3.09, 1.92], ["c", .63, .81, 1.08, 1.86, 1.14, 2.73], ["c", .06, 1.02, -.51, 1.92, -1.44, 2.22], ["c", -.24, .09, -.3, .09, -.63, .09], ["c", -.33, -0, -.42, -0, -.63, -.06], ["c", -.66, -.24, -1.14, -.63, -1.41, -1.2], ["c", -.15, -.3, -.21, -.51, -.24, -.9], ["c", -.06, -1.08, .57, -2.04, 1.56, -2.37], ["c", .18, -.06, .27, -.06, .63, -.06], ["l", .45, 0], ["c", .06, .03, .09, 
  .03, .09, 0], ["c", 0, 0, -.09, -.12, -.24, -.27], ["c", -1.02, -1.11, -2.55, -1.68, -4.08, -1.5], ["c", -1.29, .15, -2.04, .69, -2.4, 1.74], ["c", -.36, .93, -.42, 1.89, -.42, 5.37], ["c", 0, 2.97, .06, 3.96, .24, 4.77], ["c", .24, 1.08, .63, 1.68, 1.41, 2.07], ["c", .81, .39, 2.16, .45, 3.18, .09], ["c", 1.29, -.45, 2.37, -1.53, 3.03, -2.97], ["c", .15, -.33, .33, -.87, .39, -1.17], ["c", .09, -.24, .15, -.36, .3, -.39], ["c", .21, -.03, .42, .15, .39, .36], ["c", -.06, .39, -.42, 1.38, -.69, 
  1.89], ["c", -.96, 1.8, -2.49, 2.94, -4.23, 3.18], ["c", -.99, .12, -2.58, -.06, -3.63, -.45], ["c", -.96, -.36, -1.71, -.84, -2.4, -1.5], ["c", -1.11, -1.11, -1.8, -2.61, -2.04, -4.56], ["c", -.06, -.6, -.06, -2.01, 0, -2.61], ["c", .24, -1.95, .9, -3.45, 2.01, -4.56], ["c", .69, -.66, 1.44, -1.11, 2.37, -1.47], ["c", .63, -.24, 1.47, -.42, 2.22, -.48], ["z"]], w:13.038, h:15.697}, "timesig.cut":{d:[["M", 6.24, -10.44], ["c", .09, -.06, .09, -.06, .48, -.06], ["c", .36, 0, .36, 0, .45, .06], ["l", 
  .06, .09], ["l", 0, 1.23], ["l", 0, 1.26], ["l", .27, 0], ["c", 1.26, 0, 2.49, .45, 3.48, 1.29], ["c", 1.05, .87, 1.8, 2.28, 1.89, 3.48], ["c", .06, 1.02, -.51, 1.92, -1.44, 2.22], ["c", -.24, .09, -.3, .09, -.63, .09], ["c", -.33, -0, -.42, -0, -.63, -.06], ["c", -.66, -.24, -1.14, -.63, -1.41, -1.2], ["c", -.15, -.3, -.21, -.51, -.24, -.9], ["c", -.06, -1.08, .57, -2.04, 1.56, -2.37], ["c", .18, -.06, .27, -.06, .63, -.06], ["l", .45, -0], ["c", .06, .03, .09, .03, .09, -0], ["c", 0, -.03, -.45, 
  -.51, -.66, -.69], ["c", -.87, -.69, -1.83, -1.05, -2.94, -1.11], ["l", -.42, 0], ["l", 0, 7.17], ["l", 0, 7.14], ["l", .42, 0], ["c", .69, -.03, 1.23, -.18, 1.86, -.51], ["c", 1.05, -.51, 1.89, -1.47, 2.46, -2.7], ["c", .15, -.33, .33, -.87, .39, -1.17], ["c", .09, -.24, .15, -.36, .3, -.39], ["c", .21, -.03, .42, .15, .39, .36], ["c", -.03, .24, -.21, .78, -.39, 1.2], ["c", -.96, 2.37, -2.94, 3.9, -5.13, 3.9], ["l", -.3, 0], ["l", 0, 1.26], ["l", 0, 1.23], ["l", -.06, .09], ["c", -.09, .06, -.09, 
  .06, -.45, .06], ["c", -.39, 0, -.39, 0, -.48, -.06], ["l", -.06, -.09], ["l", 0, -1.29], ["l", 0, -1.29], ["l", -.21, -.03], ["c", -1.23, -.21, -2.31, -.63, -3.21, -1.29], ["c", -.15, -.09, -.45, -.36, -.66, -.57], ["c", -1.11, -1.11, -1.8, -2.61, -2.04, -4.56], ["c", -.06, -.6, -.06, -2.01, 0, -2.61], ["c", .24, -1.95, .93, -3.45, 2.04, -4.59], ["c", .42, -.39, .78, -.66, 1.26, -.93], ["c", .75, -.45, 1.65, -.75, 2.61, -.9], ["l", .21, -.03], ["l", 0, -1.29], ["l", 0, -1.29], ["z"], ["m", -.06, 
  10.44], ["c", 0, -5.58, 0, -6.99, -.03, -6.99], ["c", -.15, 0, -.63, .27, -.87, .45], ["c", -.45, .36, -.75, .93, -.93, 1.77], ["c", -.18, .81, -.24, 1.8, -.24, 4.74], ["c", 0, 2.97, .06, 3.96, .24, 4.77], ["c", .24, 1.08, .66, 1.68, 1.41, 2.07], ["c", .12, .06, .3, .12, .33, .15], ["l", .09, 0], ["l", 0, -6.96], ["z"]], w:13.038, h:20.97}, 0:{d:[["M", 4.83, -14.97], ["c", .33, -.03, 1.11, 0, 1.47, .06], ["c", 1.68, .36, 2.97, 1.59, 3.78, 3.6], ["c", 1.2, 2.97, .81, 6.96, -.9, 9.27], ["c", -.78, 
  1.08, -1.71, 1.71, -2.91, 1.95], ["c", -.45, .09, -1.32, .09, -1.77, 0], ["c", -.81, -.18, -1.47, -.51, -2.07, -1.02], ["c", -2.34, -2.07, -3.15, -6.72, -1.74, -10.2], ["c", .87, -2.16, 2.28, -3.42, 4.14, -3.66], ["z"], ["m", 1.11, .87], ["c", -.21, -.06, -.69, -.09, -.87, -.06], ["c", -.54, .12, -.87, .42, -1.17, .99], ["c", -.36, .66, -.51, 1.56, -.6, 3], ["c", -.03, .75, -.03, 4.59, -0, 5.31], ["c", .09, 1.5, .27, 2.4, .6, 3.06], ["c", .24, .48, .57, .78, .96, .9], ["c", .27, .09, .78, .09, 
  1.05, -0], ["c", .39, -.12, .72, -.42, .96, -.9], ["c", .33, -.66, .51, -1.56, .6, -3.06], ["c", .03, -.72, .03, -4.56, -0, -5.31], ["c", -.09, -1.47, -.27, -2.37, -.6, -3.03], ["c", -.24, -.48, -.54, -.78, -.93, -.9], ["z"]], w:10.78, h:14.959}, 1:{d:[["M", 3.3, -15.06], ["c", .06, -.06, .21, -.03, .66, .15], ["c", .81, .39, 1.08, .39, 1.83, .03], ["c", .21, -.09, .39, -.15, .42, -.15], ["c", .12, 0, .21, .09, .27, .21], ["c", .06, .12, .06, .33, .06, 5.94], ["c", 0, 3.93, 0, 5.85, .03, 6.03], 
  ["c", .06, .36, .15, .69, .27, .96], ["c", .36, .75, .93, 1.17, 1.68, 1.26], ["c", .3, .03, .39, .09, .39, .3], ["c", 0, .15, -.03, .18, -.09, .24], ["c", -.06, .06, -.09, .06, -.48, .06], ["c", -.42, -0, -.69, -.03, -2.1, -.24], ["c", -.9, -.15, -1.77, -.15, -2.67, -0], ["c", -1.41, .21, -1.68, .24, -2.1, .24], ["c", -.39, -0, -.42, -0, -.48, -.06], ["c", -.06, -.06, -.06, -.09, -.06, -.24], ["c", 0, -.21, .06, -.27, .36, -.3], ["c", .75, -.09, 1.32, -.51, 1.68, -1.26], ["c", .12, -.27, .21, -.6, 
  .27, -.96], ["c", .03, -.18, .03, -1.59, .03, -4.29], ["c", 0, -3.87, 0, -4.05, -.06, -4.14], ["c", -.09, -.15, -.18, -.24, -.39, -.24], ["c", -.12, -0, -.15, .03, -.21, .06], ["c", -.03, .06, -.45, .99, -.96, 2.13], ["c", -.48, 1.14, -.9, 2.1, -.93, 2.16], ["c", -.06, .15, -.21, .24, -.33, .24], ["c", -.24, 0, -.42, -.18, -.42, -.39], ["c", 0, -.06, 3.27, -7.62, 3.33, -7.74], ["z"]], w:8.94, h:15.058}, 2:{d:[["M", 4.23, -14.97], ["c", .57, -.06, 1.68, 0, 2.34, .18], ["c", .69, .18, 1.5, .54, 2.01, 
  .9], ["c", 1.35, .96, 1.95, 2.25, 1.77, 3.81], ["c", -.15, 1.35, -.66, 2.34, -1.68, 3.15], ["c", -.6, .48, -1.44, .93, -3.12, 1.65], ["c", -1.32, .57, -1.8, .81, -2.37, 1.14], ["c", -.57, .33, -.57, .33, -.24, .27], ["c", .39, -.09, 1.26, -.09, 1.68, 0], ["c", .72, .15, 1.41, .45, 2.1, .9], ["c", .99, .63, 1.86, .87, 2.55, .75], ["c", .24, -.06, .42, -.15, .57, -.3], ["c", .12, -.09, .3, -.42, .3, -.51], ["c", 0, -.09, .12, -.21, .24, -.24], ["c", .18, -.03, .39, .12, .39, .3], ["c", 0, .12, -.15, 
  .57, -.3, .87], ["c", -.54, 1.02, -1.56, 1.74, -2.79, 2.01], ["c", -.42, .09, -1.23, .09, -1.62, .03], ["c", -.81, -.18, -1.32, -.45, -2.01, -1.11], ["c", -.45, -.45, -.63, -.57, -.96, -.69], ["c", -.84, -.27, -1.89, .12, -2.25, .9], ["c", -.12, .21, -.21, .54, -.21, .72], ["c", 0, .12, -.12, .21, -.27, .24], ["c", -.15, 0, -.27, -.03, -.33, -.15], ["c", -.09, -.21, .09, -1.08, .33, -1.71], ["c", .24, -.66, .66, -1.26, 1.29, -1.89], ["c", .45, -.45, .9, -.81, 1.92, -1.56], ["c", 1.29, -.93, 1.89, 
  -1.44, 2.34, -1.98], ["c", .87, -1.05, 1.26, -2.19, 1.2, -3.63], ["c", -.06, -1.29, -.39, -2.31, -.96, -2.91], ["c", -.36, -.33, -.72, -.51, -1.17, -.54], ["c", -.84, -.03, -1.53, .42, -1.59, 1.05], ["c", -.03, .33, .12, .6, .57, 1.14], ["c", .45, .54, .54, .87, .42, 1.41], ["c", -.15, .63, -.54, 1.11, -1.08, 1.38], ["c", -.63, .33, -1.2, .33, -1.83, 0], ["c", -.24, -.12, -.33, -.18, -.54, -.39], ["c", -.18, -.18, -.27, -.3, -.36, -.51], ["c", -.24, -.45, -.27, -.84, -.21, -1.38], ["c", .12, -.75, 
  .45, -1.41, 1.02, -1.98], ["c", .72, -.72, 1.74, -1.17, 2.85, -1.32], ["z"]], w:10.764, h:14.993}, 3:{d:[["M", 3.78, -14.97], ["c", .3, -.03, 1.41, 0, 1.83, .06], ["c", 2.22, .3, 3.51, 1.32, 3.72, 2.91], ["c", .03, .33, .03, 1.26, -.03, 1.65], ["c", -.12, .84, -.48, 1.47, -1.05, 1.77], ["c", -.27, .15, -.36, .24, -.45, .39], ["c", -.09, .21, -.09, .36, 0, .57], ["c", .09, .15, .18, .24, .51, .39], ["c", .75, .42, 1.23, 1.14, 1.41, 2.13], ["c", .06, .42, .06, 1.35, 0, 1.71], ["c", -.18, .81, -.48, 
  1.38, -1.02, 1.95], ["c", -.75, .72, -1.8, 1.2, -3.18, 1.38], ["c", -.42, .06, -1.56, .06, -1.95, 0], ["c", -1.89, -.33, -3.18, -1.29, -3.51, -2.64], ["c", -.03, -.12, -.03, -.33, -.03, -.6], ["c", 0, -.36, 0, -.42, .06, -.63], ["c", .12, -.3, .27, -.51, .51, -.75], ["c", .24, -.24, .45, -.39, .75, -.51], ["c", .21, -.06, .27, -.06, .6, -.06], ["c", .33, 0, .39, 0, .6, .06], ["c", .3, .12, .51, .27, .75, .51], ["c", .36, .33, .57, .75, .6, 1.2], ["c", 0, .21, 0, .27, -.06, .42], ["c", -.09, .18, 
  -.12, .24, -.54, .54], ["c", -.51, .36, -.63, .54, -.6, .87], ["c", .06, .54, .54, .9, 1.38, .99], ["c", .36, .06, .72, .03, .96, -.06], ["c", .81, -.27, 1.29, -1.23, 1.44, -2.79], ["c", .03, -.45, .03, -1.95, -.03, -2.37], ["c", -.09, -.75, -.33, -1.23, -.75, -1.44], ["c", -.33, -.18, -.45, -.18, -1.98, -.18], ["c", -1.35, 0, -1.41, 0, -1.5, -.06], ["c", -.18, -.12, -.24, -.39, -.12, -.6], ["c", .12, -.15, .15, -.15, 1.68, -.15], ["c", 1.5, 0, 1.62, 0, 1.89, -.15], ["c", .18, -.09, .42, -.36, 
  .54, -.57], ["c", .18, -.42, .27, -.9, .3, -1.95], ["c", .03, -1.2, -.06, -1.8, -.36, -2.37], ["c", -.24, -.48, -.63, -.81, -1.14, -.96], ["c", -.3, -.06, -1.08, -.06, -1.38, .03], ["c", -.6, .15, -.9, .42, -.96, .84], ["c", -.03, .3, .06, .45, .63, .84], ["c", .33, .24, .42, .39, .45, .63], ["c", .03, .72, -.57, 1.5, -1.32, 1.65], ["c", -1.05, .27, -2.1, -.57, -2.1, -1.65], ["c", 0, -.45, .15, -.96, .39, -1.38], ["c", .12, -.21, .54, -.63, .81, -.81], ["c", .57, -.42, 1.38, -.69, 2.25, -.81], 
  ["z"]], w:9.735, h:14.967}, 4:{d:[["M", 8.64, -14.94], ["c", .27, -.09, .42, -.12, .54, -.03], ["c", .09, .06, .15, .21, .15, .3], ["c", -.03, .06, -1.92, 2.31, -4.23, 5.04], ["c", -2.31, 2.73, -4.23, 4.98, -4.26, 5.01], ["c", -.03, .06, .12, .06, 2.55, .06], ["l", 2.61, 0], ["l", 0, -2.37], ["c", 0, -2.19, .03, -2.37, .06, -2.46], ["c", .03, -.06, .21, -.18, .57, -.42], ["c", 1.08, -.72, 1.38, -1.08, 1.86, -2.16], ["c", .12, -.3, .24, -.54, .27, -.57], ["c", .12, -.12, .39, -.06, .45, .12], ["c", 
  .06, .09, .06, .57, .06, 3.96], ["l", 0, 3.9], ["l", 1.08, 0], ["c", 1.05, 0, 1.11, 0, 1.2, .06], ["c", .24, .15, .24, .54, 0, .69], ["c", -.09, .06, -.15, .06, -1.2, .06], ["l", -1.08, 0], ["l", 0, .33], ["c", 0, .57, .09, 1.11, .3, 1.53], ["c", .36, .75, .93, 1.17, 1.68, 1.26], ["c", .3, .03, .39, .09, .39, .3], ["c", 0, .15, -.03, .18, -.09, .24], ["c", -.06, .06, -.09, .06, -.48, .06], ["c", -.42, 0, -.69, -.03, -2.1, -.24], ["c", -.9, -.15, -1.77, -.15, -2.67, 0], ["c", -1.41, .21, -1.68, 
  .24, -2.1, .24], ["c", -.39, 0, -.42, 0, -.48, -.06], ["c", -.06, -.06, -.06, -.09, -.06, -.24], ["c", 0, -.21, .06, -.27, .36, -.3], ["c", .75, -.09, 1.32, -.51, 1.68, -1.26], ["c", .21, -.42, .3, -.96, .3, -1.53], ["l", 0, -.33], ["l", -2.7, 0], ["c", -2.91, 0, -2.85, 0, -3.09, -.15], ["c", -.18, -.12, -.3, -.39, -.27, -.54], ["c", .03, -.06, .18, -.24, .33, -.45], ["c", .75, -.9, 1.59, -2.07, 2.13, -3.03], ["c", .33, -.54, .84, -1.62, 1.05, -2.16], ["c", .57, -1.41, .84, -2.64, .9, -4.05], ["c", 
  .03, -.63, .06, -.72, .24, -.81], ["l", .12, -.06], ["l", .45, .12], ["c", .66, .18, 1.02, .24, 1.47, .27], ["c", .6, .03, 1.23, -.09, 2.01, -.33], ["z"]], w:11.795, h:14.994}, 5:{d:[["M", 1.02, -14.94], ["c", .12, -.09, .03, -.09, 1.08, .06], ["c", 2.49, .36, 4.35, .36, 6.96, -.06], ["c", .57, -.09, .66, -.06, .81, .06], ["c", .15, .18, .12, .24, -.15, .51], ["c", -1.29, 1.26, -3.24, 2.04, -5.58, 2.31], ["c", -.6, .09, -1.2, .12, -1.71, .12], ["c", -.39, 0, -.45, 0, -.57, .06], ["c", -.09, .06, 
  -.15, .12, -.21, .21], ["l", -.06, .12], ["l", 0, 1.65], ["l", 0, 1.65], ["l", .21, -.21], ["c", .66, -.57, 1.41, -.96, 2.19, -1.14], ["c", .33, -.06, 1.41, -.06, 1.95, 0], ["c", 2.61, .36, 4.02, 1.74, 4.26, 4.14], ["c", .03, .45, .03, 1.08, -.03, 1.44], ["c", -.18, 1.02, -.78, 2.01, -1.59, 2.7], ["c", -.72, .57, -1.62, 1.02, -2.49, 1.2], ["c", -1.38, .27, -3.03, .06, -4.2, -.54], ["c", -1.08, -.54, -1.71, -1.32, -1.86, -2.28], ["c", -.09, -.69, .09, -1.29, .57, -1.74], ["c", .24, -.24, .45, -.39, 
  .75, -.51], ["c", .21, -.06, .27, -.06, .6, -.06], ["c", .33, 0, .39, 0, .6, .06], ["c", .3, .12, .51, .27, .75, .51], ["c", .36, .33, .57, .75, .6, 1.2], ["c", 0, .21, 0, .27, -.06, .42], ["c", -.09, .18, -.12, .24, -.54, .54], ["c", -.18, .12, -.36, .3, -.42, .33], ["c", -.36, .42, -.18, .99, .36, 1.26], ["c", .51, .27, 1.47, .36, 2.01, .27], ["c", .93, -.21, 1.47, -1.17, 1.65, -2.91], ["c", .06, -.45, .06, -1.89, 0, -2.31], ["c", -.15, -1.2, -.51, -2.1, -1.05, -2.55], ["c", -.21, -.18, -.54, 
  -.36, -.81, -.39], ["c", -.3, -.06, -.84, -.03, -1.26, .06], ["c", -.93, .18, -1.65, .6, -2.16, 1.2], ["c", -.15, .21, -.27, .3, -.39, .3], ["c", -.15, 0, -.3, -.09, -.36, -.18], ["c", -.06, -.09, -.06, -.15, -.06, -3.66], ["c", 0, -3.39, 0, -3.57, .06, -3.66], ["c", .03, -.06, .09, -.15, .15, -.18], ["z"]], w:10.212, h:14.997}, 6:{d:[["M", 4.98, -14.97], ["c", .36, -.03, 1.2, 0, 1.59, .06], ["c", .9, .15, 1.68, .51, 2.25, 1.05], ["c", .57, .51, .87, 1.23, .84, 1.98], ["c", -.03, .51, -.21, .9, 
  -.6, 1.26], ["c", -.24, .24, -.45, .39, -.75, .51], ["c", -.21, .06, -.27, .06, -.6, .06], ["c", -.33, 0, -.39, 0, -.6, -.06], ["c", -.3, -.12, -.51, -.27, -.75, -.51], ["c", -.39, -.36, -.57, -.78, -.57, -1.26], ["c", 0, -.27, 0, -.3, .09, -.42], ["c", .03, -.09, .18, -.21, .3, -.3], ["c", .12, -.09, .3, -.21, .39, -.27], ["c", .09, -.06, .21, -.18, .27, -.24], ["c", .06, -.12, .09, -.15, .09, -.33], ["c", 0, -.18, -.03, -.24, -.09, -.36], ["c", -.24, -.39, -.75, -.6, -1.38, -.57], ["c", -.54, 
  .03, -.9, .18, -1.23, .48], ["c", -.81, .72, -1.08, 2.16, -.96, 5.37], ["l", 0, .63], ["l", .3, -.12], ["c", .78, -.27, 1.29, -.33, 2.1, -.27], ["c", 1.47, .12, 2.49, .54, 3.27, 1.29], ["c", .48, .51, .81, 1.11, .96, 1.89], ["c", .06, .27, .06, .42, .06, .93], ["c", 0, .54, 0, .69, -.06, .96], ["c", -.15, .78, -.48, 1.38, -.96, 1.89], ["c", -.54, .51, -1.17, .87, -1.98, 1.08], ["c", -1.14, .3, -2.4, .33, -3.24, .03], ["c", -1.5, -.48, -2.64, -1.89, -3.27, -4.02], ["c", -.36, -1.23, -.51, -2.82, 
  -.42, -4.08], ["c", .3, -3.66, 2.28, -6.3, 4.95, -6.66], ["z"], ["m", .66, 7.41], ["c", -.27, -.09, -.81, -.12, -1.08, -.06], ["c", -.72, .18, -1.08, .69, -1.23, 1.71], ["c", -.06, .54, -.06, 3, 0, 3.54], ["c", .18, 1.26, .72, 1.77, 1.8, 1.74], ["c", .39, -.03, .63, -.09, .9, -.27], ["c", .66, -.42, .9, -1.32, .9, -3.24], ["c", 0, -2.22, -.36, -3.12, -1.29, -3.42], ["z"]], w:9.956, h:14.982}, 7:{d:[["M", .21, -14.97], ["c", .21, -.06, .45, 0, .54, .15], ["c", .06, .09, .06, .15, .06, .39], ["c", 
  0, .24, 0, .33, .06, .42], ["c", .06, .12, .21, .24, .27, .24], ["c", .03, 0, .12, -.12, .24, -.21], ["c", .96, -1.2, 2.58, -1.35, 3.99, -.42], ["c", .15, .12, .42, .3, .54, .45], ["c", .48, .39, .81, .57, 1.29, .6], ["c", .69, .03, 1.5, -.3, 2.13, -.87], ["c", .09, -.09, .27, -.3, .39, -.45], ["c", .12, -.15, .24, -.27, .3, -.3], ["c", .18, -.06, .39, .03, .51, .21], ["c", .06, .18, .06, .24, -.27, .72], ["c", -.18, .24, -.54, .78, -.78, 1.17], ["c", -2.37, 3.54, -3.54, 6.27, -3.87, 9], ["c", 
  -.03, .33, -.03, .66, -.03, 1.26], ["c", 0, .9, 0, 1.08, .15, 1.89], ["c", .06, .45, .06, .48, .03, .6], ["c", -.06, .09, -.21, .21, -.3, .21], ["c", -.03, 0, -.27, -.06, -.54, -.15], ["c", -.84, -.27, -1.11, -.3, -1.65, -.3], ["c", -.57, 0, -.84, .03, -1.56, .27], ["c", -.6, .18, -.69, .21, -.81, .15], ["c", -.12, -.06, -.21, -.18, -.21, -.3], ["c", 0, -.15, .6, -1.44, 1.2, -2.61], ["c", 1.14, -2.22, 2.73, -4.68, 5.1, -8.01], ["c", .21, -.27, .36, -.48, .33, -.48], ["c", 0, 0, -.12, .06, -.27, 
  .12], ["c", -.54, .3, -.99, .39, -1.56, .39], ["c", -.75, .03, -1.2, -.18, -1.83, -.75], ["c", -.99, -.9, -1.83, -1.17, -2.31, -.72], ["c", -.18, .15, -.36, .51, -.45, .84], ["c", -.06, .24, -.06, .33, -.09, 1.98], ["c", 0, 1.62, -.03, 1.74, -.06, 1.8], ["c", -.15, .24, -.54, .24, -.69, 0], ["c", -.06, -.09, -.06, -.15, -.06, -3.57], ["c", 0, -3.42, 0, -3.48, .06, -3.57], ["c", .03, -.06, .09, -.12, .15, -.15], ["z"]], w:10.561, h:15.093}, 8:{d:[["M", 4.98, -14.97], ["c", .33, -.03, 1.02, -.03, 
  1.32, 0], ["c", 1.32, .12, 2.49, .6, 3.21, 1.32], ["c", .39, .39, .66, .81, .78, 1.29], ["c", .09, .36, .09, 1.08, 0, 1.44], ["c", -.21, .84, -.66, 1.59, -1.59, 2.55], ["l", -.3, .3], ["l", .27, .18], ["c", 1.47, .93, 2.31, 2.31, 2.25, 3.75], ["c", -.03, .75, -.24, 1.35, -.63, 1.95], ["c", -.45, .66, -1.02, 1.14, -1.83, 1.53], ["c", -1.8, .87, -4.2, .87, -6, .03], ["c", -1.62, -.78, -2.52, -2.16, -2.46, -3.66], ["c", .06, -.99, .54, -1.77, 1.8, -2.97], ["c", .54, -.51, .54, -.54, .48, -.57], ["c", 
  -.39, -.27, -.96, -.78, -1.2, -1.14], ["c", -.75, -1.11, -.87, -2.4, -.3, -3.6], ["c", .69, -1.35, 2.25, -2.25, 4.2, -2.4], ["z"], ["m", 1.53, .69], ["c", -.42, -.09, -1.11, -.12, -1.38, -.06], ["c", -.3, .06, -.6, .18, -.81, .3], ["c", -.21, .12, -.6, .51, -.72, .72], ["c", -.51, .87, -.42, 1.89, .21, 2.52], ["c", .21, .21, .36, .3, 1.95, 1.23], ["c", .96, .54, 1.74, .99, 1.77, 1.02], ["c", .09, 0, .63, -.6, .99, -1.11], ["c", .21, -.36, .48, -.87, .57, -1.23], ["c", .06, -.24, .06, -.36, .06, 
  -.72], ["c", 0, -.45, -.03, -.66, -.15, -.99], ["c", -.39, -.81, -1.29, -1.44, -2.49, -1.68], ["z"], ["m", -1.44, 8.07], ["l", -1.89, -1.08], ["c", -.03, 0, -.18, .15, -.39, .33], ["c", -1.2, 1.08, -1.65, 1.95, -1.59, 3], ["c", .09, 1.59, 1.35, 2.85, 3.21, 3.24], ["c", .33, .06, .45, .06, .93, .06], ["c", .63, -0, .81, -.03, 1.29, -.27], ["c", .9, -.42, 1.47, -1.41, 1.41, -2.4], ["c", -.06, -.66, -.39, -1.29, -.9, -1.65], ["c", -.12, -.09, -1.05, -.63, -2.07, -1.23], ["z"]], w:10.926, h:14.989}, 
  9:{d:[["M", 4.23, -14.97], ["c", .42, -.03, 1.29, 0, 1.62, .06], ["c", .51, .12, .93, .3, 1.38, .57], ["c", 1.53, 1.02, 2.52, 3.24, 2.73, 5.94], ["c", .18, 2.55, -.48, 4.98, -1.83, 6.57], ["c", -1.05, 1.26, -2.4, 1.89, -3.93, 1.83], ["c", -1.23, -.06, -2.31, -.45, -3.03, -1.14], ["c", -.57, -.51, -.87, -1.23, -.84, -1.98], ["c", .03, -.51, .21, -.9, .6, -1.26], ["c", .24, -.24, .45, -.39, .75, -.51], ["c", .21, -.06, .27, -.06, .6, -.06], ["c", .33, -0, .39, -0, .6, .06], ["c", .3, .12, .51, .27, 
  .75, .51], ["c", .39, .36, .57, .78, .57, 1.26], ["c", 0, .27, 0, .3, -.09, .42], ["c", -.03, .09, -.18, .21, -.3, .3], ["c", -.12, .09, -.3, .21, -.39, .27], ["c", -.09, .06, -.21, .18, -.27, .24], ["c", -.06, .12, -.06, .15, -.06, .33], ["c", 0, .18, 0, .24, .06, .36], ["c", .24, .39, .75, .6, 1.38, .57], ["c", .54, -.03, .9, -.18, 1.23, -.48], ["c", .81, -.72, 1.08, -2.16, .96, -5.37], ["l", 0, -.63], ["l", -.3, .12], ["c", -.78, .27, -1.29, .33, -2.1, .27], ["c", -1.47, -.12, -2.49, -.54, -3.27, 
  -1.29], ["c", -.48, -.51, -.81, -1.11, -.96, -1.89], ["c", -.06, -.27, -.06, -.42, -.06, -.96], ["c", 0, -.51, 0, -.66, .06, -.93], ["c", .15, -.78, .48, -1.38, .96, -1.89], ["c", .15, -.12, .33, -.27, .42, -.36], ["c", .69, -.51, 1.62, -.81, 2.76, -.93], ["z"], ["m", 1.17, .66], ["c", -.21, -.06, -.57, -.06, -.81, -.03], ["c", -.78, .12, -1.26, .69, -1.41, 1.74], ["c", -.12, .63, -.15, 1.95, -.09, 2.79], ["c", .12, 1.71, .63, 2.4, 1.77, 2.46], ["c", 1.08, .03, 1.62, -.48, 1.8, -1.74], ["c", .06, 
  -.54, .06, -3, 0, -3.54], ["c", -.15, -1.05, -.51, -1.53, -1.26, -1.68], ["z"]], w:9.959, h:14.986}, f:{d:[["M", 9.93, -14.28], ["c", 1.53, -.18, 2.88, .45, 3.12, 1.5], ["c", .12, .51, 0, 1.32, -.27, 1.86], ["c", -.15, .3, -.42, .57, -.63, .69], ["c", -.69, .36, -1.56, .03, -1.83, -.69], ["c", -.09, -.24, -.09, -.69, 0, -.87], ["c", .06, -.12, .21, -.24, .45, -.42], ["c", .42, -.24, .57, -.45, .6, -.72], ["c", .03, -.33, -.09, -.39, -.63, -.42], ["c", -.3, 0, -.45, 0, -.6, .03], ["c", -.81, .21, 
  -1.35, .93, -1.74, 2.46], ["c", -.06, .27, -.48, 2.25, -.48, 2.31], ["c", 0, .03, .39, .03, .9, .03], ["c", .72, 0, .9, 0, .99, .06], ["c", .42, .15, .45, .72, .03, .9], ["c", -.12, .06, -.24, .06, -1.17, .06], ["l", -1.05, 0], ["l", -.78, 2.55], ["c", -.45, 1.41, -.87, 2.79, -.96, 3.06], ["c", -.87, 2.37, -2.37, 4.74, -3.78, 5.91], ["c", -1.05, .9, -2.04, 1.23, -3.09, 1.08], ["c", -1.11, -.18, -1.89, -.78, -2.04, -1.59], ["c", -.12, -.66, .15, -1.71, .54, -2.19], ["c", .69, -.75, 1.86, -.54, 2.22, 
  .39], ["c", .06, .15, .09, .27, .09, .48], ["c", -0, .24, -.03, .27, -.12, .42], ["c", -.03, .09, -.15, .18, -.27, .27], ["c", -.09, .06, -.27, .21, -.36, .27], ["c", -.24, .18, -.36, .36, -.39, .6], ["c", -.03, .33, .09, .39, .63, .42], ["c", .42, 0, .63, -.03, .9, -.15], ["c", .6, -.3, .96, -.96, 1.38, -2.64], ["c", .09, -.42, .63, -2.55, 1.17, -4.77], ["l", 1.02, -4.08], ["c", -0, -.03, -.36, -.03, -.81, -.03], ["c", -.72, 0, -.81, 0, -.93, -.06], ["c", -.42, -.18, -.39, -.75, .03, -.9], ["c", 
  .09, -.06, .27, -.06, 1.05, -.06], ["l", .96, 0], ["l", 0, -.09], ["c", .06, -.18, .3, -.72, .51, -1.17], ["c", 1.2, -2.46, 3.3, -4.23, 5.34, -4.5], ["z"]], w:16.155, h:19.445}, m:{d:[["M", 2.79, -8.91], ["c", .09, 0, .3, -.03, .45, -.03], ["c", .24, .03, .3, .03, .45, .12], ["c", .36, .15, .63, .54, .75, 1.02], ["l", .03, .21], ["l", .33, -.3], ["c", .69, -.69, 1.38, -1.02, 2.07, -1.02], ["c", .27, 0, .33, 0, .48, .06], ["c", .21, .09, .48, .36, .63, .6], ["c", .03, .09, .12, .27, .18, .42], ["c", 
  .03, .15, .09, .27, .12, .27], ["c", 0, 0, .09, -.09, .18, -.21], ["c", .33, -.39, .87, -.81, 1.29, -.99], ["c", .78, -.33, 1.47, -.21, 2.01, .33], ["c", .3, .33, .48, .69, .6, 1.14], ["c", .09, .42, .06, .54, -.54, 3.06], ["c", -.33, 1.29, -.57, 2.4, -.57, 2.43], ["c", 0, .12, .09, .21, .21, .21], ["c", .24, -0, .75, -.3, 1.2, -.72], ["c", .45, -.39, .6, -.45, .78, -.27], ["c", .18, .18, .09, .36, -.45, .87], ["c", -1.05, .96, -1.83, 1.47, -2.58, 1.71], ["c", -.93, .33, -1.53, .21, -1.8, -.33], 
  ["c", -.06, -.15, -.06, -.21, -.06, -.45], ["c", 0, -.24, .03, -.48, .6, -2.82], ["c", .42, -1.71, .6, -2.64, .63, -2.79], ["c", .03, -.57, -.3, -.75, -.84, -.48], ["c", -.24, .12, -.54, .39, -.66, .63], ["c", -.03, .09, -.42, 1.38, -.9, 3], ["c", -.9, 3.15, -.84, 3, -1.14, 3.15], ["l", -.15, .09], ["l", -.78, 0], ["c", -.6, 0, -.78, 0, -.84, -.06], ["c", -.09, -.03, -.18, -.18, -.18, -.27], ["c", 0, -.03, .36, -1.38, .84, -2.97], ["c", .57, -2.04, .81, -2.97, .84, -3.12], ["c", .03, -.54, -.3, 
  -.72, -.84, -.45], ["c", -.24, .12, -.57, .42, -.66, .63], ["c", -.06, .09, -.51, 1.44, -1.05, 2.97], ["c", -.51, 1.56, -.99, 2.85, -.99, 2.91], ["c", -.06, .12, -.21, .24, -.36, .3], ["c", -.12, .06, -.21, .06, -.9, .06], ["c", -.6, 0, -.78, 0, -.84, -.06], ["c", -.09, -.03, -.18, -.18, -.18, -.27], ["c", 0, -.03, .45, -1.38, .99, -2.97], ["c", 1.05, -3.18, 1.05, -3.18, .93, -3.45], ["c", -.12, -.27, -.39, -.3, -.72, -.15], ["c", -.54, .27, -1.14, 1.17, -1.56, 2.4], ["c", -.06, .15, -.15, .3, 
  -.18, .36], ["c", -.21, .21, -.57, .27, -.72, .09], ["c", -.09, -.09, -.06, -.21, .06, -.63], ["c", .48, -1.26, 1.26, -2.46, 2.01, -3.21], ["c", .57, -.54, 1.2, -.87, 1.83, -1.02], ["z"]], w:14.687, h:9.126}, p:{d:[["M", 1.92, -8.7], ["c", .27, -.09, .81, -.06, 1.11, .03], ["c", .54, .18, .93, .51, 1.17, .99], ["c", .09, .15, .15, .33, .18, .36], ["l", -0, .12], ["l", .3, -.27], ["c", .66, -.6, 1.35, -1.02, 2.13, -1.2], ["c", .21, -.06, .33, -.06, .78, -.06], ["c", .45, 0, .51, 0, .84, .09], ["c", 
  1.29, .33, 2.07, 1.32, 2.25, 2.79], ["c", .09, .81, -.09, 2.01, -.45, 2.79], ["c", -.54, 1.26, -1.86, 2.55, -3.18, 3.03], ["c", -.45, .18, -.81, .24, -1.29, .24], ["c", -.69, -.03, -1.35, -.18, -1.86, -.45], ["c", -.3, -.15, -.51, -.18, -.69, -.09], ["c", -.09, .03, -.18, .09, -.18, .12], ["c", -.09, .12, -1.05, 2.94, -1.05, 3.06], ["c", 0, .24, .18, .48, .51, .63], ["c", .18, .06, .54, .15, .75, .15], ["c", .21, 0, .36, .06, .42, .18], ["c", .12, .18, .06, .42, -.12, .54], ["c", -.09, .03, -.15, 
  .03, -.78, 0], ["c", -1.98, -.15, -3.81, -.15, -5.79, 0], ["c", -.63, .03, -.69, .03, -.78, 0], ["c", -.24, -.15, -.24, -.57, .03, -.66], ["c", .06, -.03, .48, -.09, .99, -.12], ["c", .87, -.06, 1.11, -.09, 1.35, -.21], ["c", .18, -.06, .33, -.18, .39, -.3], ["c", .06, -.12, 3.24, -9.42, 3.27, -9.6], ["c", .06, -.33, .03, -.57, -.15, -.69], ["c", -.09, -.06, -.12, -.06, -.3, -.06], ["c", -.69, .06, -1.53, 1.02, -2.28, 2.61], ["c", -.09, .21, -.21, .45, -.27, .51], ["c", -.09, .12, -.33, .24, -.48, 
  .24], ["c", -.18, 0, -.36, -.15, -.36, -.3], ["c", 0, -.24, .78, -1.83, 1.26, -2.55], ["c", .72, -1.11, 1.47, -1.74, 2.28, -1.92], ["z"], ["m", 5.37, 1.47], ["c", -.27, -.12, -.75, -.03, -1.14, .21], ["c", -.75, .48, -1.47, 1.68, -1.89, 3.15], ["c", -.45, 1.47, -.42, 2.34, 0, 2.7], ["c", .45, .39, 1.26, .21, 1.83, -.36], ["c", .51, -.51, .99, -1.68, 1.38, -3.27], ["c", .3, -1.17, .33, -1.74, .15, -2.13], ["c", -.09, -.15, -.15, -.21, -.33, -.3], ["z"]], w:14.689, h:13.127}, r:{d:[["M", 6.33, -9.12], 
  ["c", .27, -.03, .93, 0, 1.2, .06], ["c", .84, .21, 1.23, .81, 1.02, 1.53], ["c", -.24, .75, -.9, 1.17, -1.56, .96], ["c", -.33, -.09, -.51, -.3, -.66, -.75], ["c", -.03, -.12, -.09, -.24, -.12, -.3], ["c", -.09, -.15, -.3, -.24, -.48, -.24], ["c", -.57, 0, -1.38, .54, -1.65, 1.08], ["c", -.06, .15, -.33, 1.17, -.9, 3.27], ["c", -.57, 2.31, -.81, 3.12, -.87, 3.21], ["c", -.03, .06, -.12, .15, -.18, .21], ["l", -.12, .06], ["l", -.81, .03], ["c", -.69, 0, -.81, 0, -.9, -.03], ["c", -.09, -.06, -.18, 
  -.21, -.18, -.3], ["c", 0, -.06, .39, -1.62, .9, -3.51], ["c", .84, -3.24, .87, -3.45, .87, -3.72], ["c", 0, -.21, 0, -.27, -.03, -.36], ["c", -.12, -.15, -.21, -.24, -.42, -.24], ["c", -.24, 0, -.45, .15, -.78, .42], ["c", -.33, .36, -.45, .54, -.72, 1.14], ["c", -.03, .12, -.21, .24, -.36, .27], ["c", -.12, 0, -.15, 0, -.24, -.06], ["c", -.18, -.12, -.18, -.21, -.06, -.54], ["c", .21, -.57, .42, -.93, .78, -1.32], ["c", .54, -.51, 1.2, -.81, 1.95, -.87], ["c", .81, -.03, 1.53, .3, 1.92, .87], 
  ["l", .12, .18], ["l", .09, -.09], ["c", .57, -.45, 1.41, -.84, 2.19, -.96], ["z"]], w:9.41, h:9.132}, s:{d:[["M", 4.47, -8.73], ["c", .09, 0, .36, -.03, .57, -.03], ["c", .75, .03, 1.29, .24, 1.71, .63], ["c", .51, .54, .66, 1.26, .36, 1.83], ["c", -.24, .42, -.63, .57, -1.11, .42], ["c", -.33, -.09, -.6, -.36, -.6, -.57], ["c", 0, -.03, .06, -.21, .15, -.39], ["c", .12, -.21, .15, -.33, .18, -.48], ["c", 0, -.24, -.06, -.48, -.15, -.6], ["c", -.15, -.21, -.42, -.24, -.75, -.15], ["c", -.27, .06, 
  -.48, .18, -.69, .36], ["c", -.39, .39, -.51, .96, -.33, 1.38], ["c", .09, .21, .42, .51, .78, .72], ["c", 1.11, .69, 1.59, 1.11, 1.89, 1.68], ["c", .21, .39, .24, .78, .15, 1.29], ["c", -.18, 1.2, -1.17, 2.16, -2.52, 2.52], ["c", -1.02, .24, -1.95, .12, -2.7, -.42], ["c", -.72, -.51, -.99, -1.47, -.6, -2.19], ["c", .24, -.48, .72, -.63, 1.17, -.42], ["c", .33, .18, .54, .45, .57, .81], ["c", 0, .21, -.03, .3, -.33, .51], ["c", -.33, .24, -.39, .42, -.27, .69], ["c", .06, .15, .21, .27, .45, .33], 
  ["c", .3, .09, .87, .09, 1.2, -0], ["c", .75, -.21, 1.23, -.72, 1.29, -1.35], ["c", .03, -.42, -.15, -.81, -.54, -1.2], ["c", -.24, -.24, -.48, -.42, -1.41, -1.02], ["c", -.69, -.42, -1.05, -.93, -1.05, -1.47], ["c", 0, -.39, .12, -.87, .3, -1.23], ["c", .27, -.57, .78, -1.05, 1.38, -1.35], ["c", .24, -.12, .63, -.27, .9, -.3], ["z"]], w:6.632, h:8.758}, z:{d:[["M", 2.64, -7.95], ["c", .36, -.09, .81, -.03, 1.71, .27], ["c", .78, .21, .96, .27, 1.74, .3], ["c", .87, .06, 1.02, .03, 1.38, -.21], 
  ["c", .21, -.15, .33, -.15, .48, -.06], ["c", .15, .09, .21, .3, .15, .45], ["c", -.03, .06, -1.26, 1.26, -2.76, 2.67], ["l", -2.73, 2.55], ["l", .54, .03], ["c", .54, .03, .72, .03, 2.01, .15], ["c", .36, .03, .9, .06, 1.2, .09], ["c", .66, 0, .81, -.03, 1.02, -.24], ["c", .3, -.3, .39, -.72, .27, -1.23], ["c", -.06, -.27, -.06, -.27, -.03, -.39], ["c", .15, -.3, .54, -.27, .69, .03], ["c", .15, .33, .27, 1.02, .27, 1.5], ["c", 0, 1.47, -1.11, 2.7, -2.52, 2.79], ["c", -.57, .03, -1.02, -.09, -2.01, 
  -.51], ["c", -1.02, -.42, -1.23, -.48, -2.13, -.54], ["c", -.81, -.06, -.96, -.03, -1.26, .18], ["c", -.12, .06, -.24, .12, -.27, .12], ["c", -.27, 0, -.45, -.3, -.36, -.51], ["c", .03, -.06, 1.32, -1.32, 2.91, -2.79], ["l", 2.88, -2.73], ["c", -.03, 0, -.21, .03, -.42, .06], ["c", -.21, .03, -.78, .09, -1.23, .12], ["c", -1.11, .12, -1.23, .15, -1.95, .27], ["c", -.72, .15, -1.17, .18, -1.29, .09], ["c", -.27, -.18, -.21, -.75, .12, -1.26], ["c", .39, -.6, .93, -1.02, 1.59, -1.2], ["z"]], w:8.573, 
  h:8.743}, "+":{d:[["M", 3.48, -11.19], ["c", .18, -.09, .36, -.09, .54, 0], ["c", .18, .09, .24, .15, .33, .3], ["l", .06, .15], ["l", 0, 1.29], ["l", 0, 1.29], ["l", 1.29, 0], ["c", 1.23, 0, 1.29, 0, 1.41, .06], ["c", .06, .03, .15, .09, .18, .12], ["c", .12, .09, .21, .33, .21, .48], ["c", 0, .15, -.09, .39, -.21, .48], ["c", -.03, .03, -.12, .09, -.18, .12], ["c", -.12, .06, -.18, .06, -1.41, .06], ["l", -1.29, 0], ["l", 0, 1.29], ["c", 0, 1.23, 0, 1.29, -.06, 1.41], ["c", -.09, .18, -.15, .24, 
  -.3, .33], ["c", -.21, .09, -.39, .09, -.57, 0], ["c", -.18, -.09, -.24, -.15, -.33, -.33], ["c", -.06, -.12, -.06, -.18, -.06, -1.41], ["l", 0, -1.29], ["l", -1.29, 0], ["c", -1.23, 0, -1.29, 0, -1.41, -.06], ["c", -.18, -.09, -.24, -.15, -.33, -.33], ["c", -.09, -.18, -.09, -.36, 0, -.54], ["c", .09, -.18, .15, -.24, .33, -.33], ["l", .15, -.06], ["l", 1.26, 0], ["l", 1.29, 0], ["l", 0, -1.29], ["c", 0, -1.23, 0, -1.29, .06, -1.41], ["c", .09, -.18, .15, -.24, .33, -.33], ["z"]], w:7.507, h:7.515}, 
  ",":{d:[["M", 1.32, -3.36], ["c", .57, -.15, 1.17, .03, 1.59, .45], ["c", .45, .45, .6, .96, .51, 1.89], ["c", -.09, 1.23, -.42, 2.46, -.99, 3.93], ["c", -.3, .72, -.72, 1.62, -.78, 1.68], ["c", -.18, .21, -.51, .18, -.66, -.06], ["c", -.03, -.06, -.06, -.15, -.06, -.18], ["c", 0, -.06, .12, -.33, .24, -.63], ["c", .84, -1.8, 1.02, -2.61, .69, -3.24], ["c", -.12, -.24, -.27, -.36, -.75, -.6], ["c", -.36, -.15, -.42, -.21, -.6, -.39], ["c", -.69, -.69, -.69, -1.71, 0, -2.4], ["c", .21, -.21, .51, 
  -.39, .81, -.45], ["z"]], w:3.452, h:8.143}, "-":{d:[["M", .18, -5.34], ["c", .09, -.06, .15, -.06, 2.31, -.06], ["c", 2.46, 0, 2.37, 0, 2.46, .21], ["c", .12, .21, .03, .42, -.15, .54], ["c", -.09, .06, -.15, .06, -2.28, .06], ["c", -2.16, 0, -2.22, 0, -2.31, -.06], ["c", -.27, -.15, -.27, -.54, -.03, -.69], ["z"]], w:5.001, h:.81}, ".":{d:[["M", 1.32, -3.36], ["c", 1.05, -.27, 2.1, .57, 2.1, 1.65], ["c", 0, 1.08, -1.05, 1.92, -2.1, 1.65], ["c", -.9, -.21, -1.5, -1.14, -1.26, -2.04], ["c", .12, 
  -.63, .63, -1.11, 1.26, -1.26], ["z"]], w:3.413, h:3.402}};
  this.printSymbol = function(c, b, d, k) {
    if (!a[d]) {
      return null;
    }
    d = this.pathClone(a[d].d);
    d[0][1] += c;
    d[0][2] += b;
    return k.path().attr({path:d, stroke:"none", fill:"#000000"});
  };
  this.getPathForSymbol = function(c, b, d, k, g) {
    k = k || 1;
    g = g || 1;
    if (!a[d]) {
      return null;
    }
    d = this.pathClone(a[d].d);
    1 === k && 1 === g || this.pathScale(d, k, g);
    d[0][1] += c;
    d[0][2] += b;
    return d;
  };
  this.getSymbolWidth = function(c) {
    return a[c] ? a[c].w : 0;
  };
  this.getSymbolHeight = function(c) {
    return a[c] ? a[c].h : 0;
  };
  this.getSymbolAlign = function(a) {
    return "scripts" === a.substring(0, 7) && "scripts.roll" !== a ? "center" : "left";
  };
  this.pathClone = function(a) {
    for (var b = [], d = 0, k = a.length;d < k;d++) {
      b[d] = [];
      for (var g = 0, e = a[d].length;g < e;g++) {
        b[d][g] = a[d][g];
      }
    }
    return b;
  };
  this.pathScale = function(a, b, d) {
    for (var k = 0, g = a.length;k < g;k++) {
      var e = a[k], f, h;
      f = 1;
      for (h = e.length;f < h;f++) {
        e[f] *= f % 2 ? b : d;
      }
    }
  };
  this.getYCorr = function(a) {
    switch(a) {
      case "0":
      ;
      case "1":
      ;
      case "2":
      ;
      case "3":
      ;
      case "4":
      ;
      case "5":
      ;
      case "6":
      ;
      case "7":
      ;
      case "8":
      ;
      case "9":
      ;
      case "+":
        return-3;
      case "timesig.common":
      ;
      case "timesig.cut":
        return-1;
      case "flags.d32nd":
        return-1;
      case "flags.d64th":
        return-2;
      case "flags.u32nd":
        return 1;
      case "flags.u64th":
        return 3;
      case "rests.whole":
        return 1;
      case "rests.half":
        return-1;
      case "rests.8th":
        return-1;
      case "rests.quarter":
        return-2;
      case "rests.16th":
        return-1;
      case "rests.32nd":
        return-1;
      case "rests.64th":
        return-1;
      default:
        return 0;
    }
  };
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.write || (window.ABCJS.write = {});
ABCJS.write.StaffGroupElement = function() {
  this.voices = [];
  this.staffs = [];
  this.stafflines = [];
};
ABCJS.write.StaffGroupElement.prototype.addVoice = function(a, c, b) {
  this.voices[this.voices.length] = a;
  this.staffs[c] || (this.staffs[this.staffs.length] = {top:0, highest:7, lowest:7}, this.stafflines[this.stafflines.length] = b);
  a.staff = this.staffs[c];
};
ABCJS.write.StaffGroupElement.prototype.finished = function() {
  for (var a = 0;a < this.voices.length;a++) {
    if (!this.voices[a].layoutEnded()) {
      return!1;
    }
  }
  return!0;
};
ABCJS.write.StaffGroupElement.prototype.layout = function(a, c, b) {
  this.spacingunits = 0;
  this.minspace = 1E3;
  for (var d = c.paddingleft * c.scale, k = 0, g = 0;g < this.voices.length;g++) {
    if (this.voices[g].header) {
      var e = c.paper.text(100 * c.scale, -10 * c.scale, this.voices[g].header).attr({"font-size":12 * c.scale, "font-family":"serif", "font-weight":"bold"}), k = Math.max(k, e.getBBox().width);
      e.remove();
    }
  }
  this.startx = d += 1 / c.scale * k * 1.1;
  e = 0;
  b && console.log("init layout");
  for (g = 0;g < this.voices.length;g++) {
    this.voices[g].beginLayout(d);
  }
  for (;!this.finished();) {
    e = null;
    for (g = 0;g < this.voices.length;g++) {
      this.voices[g].layoutEnded() || e && !(this.voices[g].getDurationIndex() < e) || (e = this.voices[g].getDurationIndex());
    }
    b && console.log("currentduration: ", e);
    c = [];
    k = [];
    for (g = 0;g < this.voices.length;g++) {
      this.voices[g].getDurationIndex() !== e ? k.push(this.voices[g]) : (c.push(this.voices[g]), b && console.log("in: voice ", g));
    }
    for (var f = 0, g = e = 0;g < c.length;g++) {
      c[g].getNextX() > d && (d = c[g].getNextX(), f = c[g].getSpacingUnits(), e = c[g].spacingduration);
    }
    this.spacingunits += f;
    this.minspace = Math.min(this.minspace, f);
    for (g = 0;g < c.length;g++) {
      var h = c[g].layoutOneItem(d, a), l = h - d;
      if (0 < l) {
        for (d = h, h = 0;h < g;h++) {
          c[h].shiftRight(l);
        }
      }
    }
    for (g = 0;g < k.length;g++) {
      k[g].spacingduration -= e, k[g].updateNextX(d, a);
    }
    for (g = 0;g < c.length;g++) {
      c[g].updateIndices();
    }
  }
  for (g = 0;g < this.voices.length;g++) {
    this.voices[g].getNextX() > d && (d = this.voices[g].getNextX(), f = this.voices[g].getSpacingUnits());
  }
  this.spacingunits += f;
  this.w = d;
  for (g = 0;g < this.voices.length;g++) {
    this.voices[g].w = this.w;
  }
};
ABCJS.write.StaffGroupElement.prototype.draw = function(a, c) {
  this.y = c;
  for (var b = 0;b < this.staffs.length;b++) {
    var d = this.staffs[b].highest - (0 === b ? 20 : 15), k = this.staffs[b].lowest - 0;
    this.staffs[b].top = c;
    0 < d && (c += d * ABCJS.write.spacing.STEP);
    this.staffs[b].y = c;
    c += .9 * ABCJS.write.spacing.STAVEHEIGHT;
    0 > k && (c -= k * ABCJS.write.spacing.STEP);
    this.staffs[b].bottom = c;
  }
  this.height = c - this.y;
  for (b = d = 0;b < this.voices.length;b++) {
    this.voices[b].draw(a, d), d = this.voices[b].barbottom;
  }
  1 < this.staffs.length && (a.y = this.staffs[0].y, b = a.calcY(10), a.y = this.staffs[this.staffs.length - 1].y, d = a.calcY(2), a.printStem(this.startx, .6, b, d));
  for (b = 0;b < this.staffs.length;b++) {
    0 !== this.stafflines[b] && (a.y = this.staffs[b].y, void 0 === this.stafflines[b] && (this.stafflines[b] = 5), a.printStave(this.startx, this.w, this.stafflines[b]));
  }
};
ABCJS.write.VoiceElement = function(a, c) {
  this.children = [];
  this.beams = [];
  this.otherchildren = [];
  this.w = 0;
  this.duplicate = !1;
  this.voicenumber = a;
  this.voicetotal = c;
};
ABCJS.write.VoiceElement.prototype.addChild = function(a) {
  this.children[this.children.length] = a;
};
ABCJS.write.VoiceElement.prototype.addOther = function(a) {
  a instanceof ABCJS.write.BeamElem ? this.beams.push(a) : this.otherchildren.push(a);
};
ABCJS.write.VoiceElement.prototype.updateIndices = function() {
  this.layoutEnded() || (this.durationindex += this.children[this.i].duration, 0 === this.children[this.i].duration && (this.durationindex = Math.round(64 * this.durationindex) / 64), this.i++);
};
ABCJS.write.VoiceElement.prototype.layoutEnded = function() {
  return this.i >= this.children.length;
};
ABCJS.write.VoiceElement.prototype.getDurationIndex = function() {
  return this.durationindex - (this.children[this.i] && 0 < this.children[this.i].duration ? 0 : 5E-7);
};
ABCJS.write.VoiceElement.prototype.getSpacingUnits = function() {
  return this.minx < this.nextx ? Math.sqrt(8 * this.spacingduration) : 0;
};
ABCJS.write.VoiceElement.prototype.getNextX = function() {
  return Math.max(this.minx, this.nextx);
};
ABCJS.write.VoiceElement.prototype.beginLayout = function(a) {
  this.durationindex = this.i = 0;
  this.ii = this.children.length;
  this.nextx = this.minx = this.startx = a;
  this.spacingduration = 0;
};
ABCJS.write.VoiceElement.prototype.layoutOneItem = function(a, c) {
  var b = this.children[this.i];
  if (!b) {
    return 0;
  }
  var d = a - this.minx;
  d < b.getExtraWidth() && (a += b.getExtraWidth() - d);
  b.x = a;
  this.spacingduration = b.duration;
  this.minx = a + b.getMinWidth();
  this.i !== this.ii - 1 && (this.minx += b.minspacing);
  this.updateNextX(a, c);
  this.staff.highest = Math.max(b.top, this.staff.highest);
  this.staff.lowest = Math.min(b.bottom, this.staff.lowest);
  return a;
};
ABCJS.write.VoiceElement.prototype.updateNextX = function(a, c) {
  this.nextx = a + c * Math.sqrt(8 * this.spacingduration);
};
ABCJS.write.VoiceElement.prototype.shiftRight = function(a) {
  var c = this.children[this.i];
  c && (c.x += a, this.minx += a, this.nextx += a);
};
ABCJS.write.VoiceElement.prototype.draw = function(a, c) {
  var b = this.w - 1;
  a.y = this.staff.y;
  a.staffbottom = this.staff.bottom;
  this.barbottom = a.calcY(2);
  if (this.header) {
    var d = 12 - 12 / (this.voicetotal + 1) * (this.voicenumber + 1), k = (this.startx - a.paddingleft) / 2 + a.paddingleft, k = k * a.scale;
    a.paper.text(k, a.calcY(d) * a.scale, this.header).attr({"font-size":12 * a.scale, "font-family":"serif", "font-weight":"bold"});
  }
  d = 0;
  for (k = this.children.length;d < k;d++) {
    this.children[d].draw(a, this.barto || d === k - 1 ? c : 0);
  }
  window.ABCJS.parse.each(this.beams, function(b) {
    b.draw(a);
  });
  window.ABCJS.parse.each(this.otherchildren, function(c) {
    c.draw(a, this.startx + 10, b);
  });
};
ABCJS.write.AbsoluteElement = function(a, c, b) {
  this.abcelem = a;
  this.duration = c;
  this.minspacing = b || 0;
  this.x = 0;
  this.children = [];
  this.heads = [];
  this.extra = [];
  this.extraw = 0;
  this.decs = [];
  this.w = 0;
  this.right = [];
  this.invisible = !1;
  this.top = this.bottom = 7;
};
ABCJS.write.AbsoluteElement.prototype.getMinWidth = function() {
  return this.w;
};
ABCJS.write.AbsoluteElement.prototype.getExtraWidth = function() {
  return-this.extraw;
};
ABCJS.write.AbsoluteElement.prototype.addExtra = function(a) {
  a.dx < this.extraw && (this.extraw = a.dx);
  this.extra[this.extra.length] = a;
  this.addChild(a);
};
ABCJS.write.AbsoluteElement.prototype.addHead = function(a) {
  a.dx < this.extraw && (this.extraw = a.dx);
  this.heads[this.heads.length] = a;
  this.addRight(a);
};
ABCJS.write.AbsoluteElement.prototype.addRight = function(a) {
  a.dx + a.w > this.w && (this.w = a.dx + a.w);
  this.right[this.right.length] = a;
  this.addChild(a);
};
ABCJS.write.AbsoluteElement.prototype.addChild = function(a) {
  a.parent = this;
  this.children[this.children.length] = a;
  this.pushTop(a.top);
  this.pushBottom(a.bottom);
};
ABCJS.write.AbsoluteElement.prototype.pushTop = function(a) {
  this.top = Math.max(a, this.top);
};
ABCJS.write.AbsoluteElement.prototype.pushBottom = function(a) {
  this.bottom = Math.min(a, this.bottom);
};
ABCJS.write.AbsoluteElement.prototype.draw = function(a, c) {
  this.elemset = a.paper.set();
  if (!this.invisible) {
    a.beginGroup();
    for (var b = 0;b < this.children.length;b++) {
      this.elemset.push(this.children[b].draw(a, this.x, c));
    }
    this.elemset.push(a.endGroup());
    this.klass && this.setClass("mark", "", "#00ff00");
    var d = this;
    this.elemset.mouseup(function(b) {
      a.notifySelect(d);
    });
    this.abcelem.abselem = this;
    var k = ABCJS.write.spacing.STEP * a.scale, b = function(a, b) {
      b = Math.round(b / k) * k;
      this.translate(0, -this.dy);
      this.dy = b;
      this.translate(0, this.dy);
    };
    "note" === this.abcelem.el_type && a.editable && this.elemset.drag(b, function() {
      this.dy = 0;
    }, function() {
      var b = -Math.round(this.dy / k);
      d.abcelem.pitches[0].pitch += b;
      d.abcelem.pitches[0].verticalPos += b;
      a.notifyChange();
    });
  }
};
ABCJS.write.AbsoluteElement.prototype.isIE = !1;
ABCJS.write.AbsoluteElement.prototype.setClass = function(a, c, b) {
  this.elemset.attr({fill:b});
  if (!this.isIE) {
    for (b = 0;b < this.elemset.length;b++) {
      if (this.elemset[b][0].setAttribute) {
        var d = this.elemset[b][0].getAttribute("class");
        d || (d = "");
        d = d.replace(c, "");
        d = d.replace(a, "");
        0 < a.length && (0 < d.length && " " !== d.charAt(d.length - 1) && (d += " "), d += a);
        this.elemset[b][0].setAttribute("class", d);
      }
    }
  }
};
ABCJS.write.AbsoluteElement.prototype.highlight = function() {
  this.setClass("note_selected", "", "#ff0000");
};
ABCJS.write.AbsoluteElement.prototype.unhighlight = function() {
  this.setClass("", "note_selected", "#000000");
};
ABCJS.write.RelativeElement = function(a, c, b, d, k) {
  k = k || {};
  this.x = 0;
  this.c = a;
  this.dx = c;
  this.w = b;
  this.pitch = d;
  this.scalex = k.scalex || 1;
  this.scaley = k.scaley || 1;
  this.type = k.type || "symbol";
  this.pitch2 = k.pitch2;
  this.linewidth = k.linewidth;
  this.attributes = k.attributes;
  this.top = d + ("above" === k.extreme ? 7 : 0);
  this.bottom = d - ("below" === k.extreme ? 7 : 0);
};
ABCJS.write.RelativeElement.prototype.draw = function(a, c, b) {
  this.x = c + this.dx;
  switch(this.type) {
    case "symbol":
      if (null === this.c) {
        return null;
      }
      this.graphelem = a.printSymbol(this.x, this.pitch, this.c, this.scalex, this.scaley);
      break;
    case "debug":
      this.graphelem = a.debugMsg(this.x, this.c);
      break;
    case "debugLow":
      this.graphelem = a.printLyrics(this.x, this.c);
      break;
    case "text":
      this.graphelem = a.printText(this.x, this.pitch, this.c);
      break;
    case "bar":
      this.graphelem = a.printStem(this.x, this.linewidth, a.calcY(this.pitch), b ? b : a.calcY(this.pitch2));
      break;
    case "stem":
      this.graphelem = a.printStem(this.x, this.linewidth, a.calcY(this.pitch), a.calcY(this.pitch2));
      break;
    case "ledger":
      this.graphelem = a.printStaveLine(this.x, this.x + this.w, this.pitch);
  }
  1 !== this.scalex && this.graphelem && this.graphelem.scale(this.scalex, this.scaley, this.x, a.calcY(this.pitch));
  this.attributes && this.graphelem.attr(this.attributes);
  return this.graphelem;
};
ABCJS.write.EndingElem = function(a, c, b) {
  this.text = a;
  this.anchor1 = c;
  this.anchor2 = b;
};
ABCJS.write.EndingElem.prototype.draw = function(a, c, b) {
  var d;
  this.anchor1 && (c = this.anchor1.x + this.anchor1.w, d = ABCJS.write.sprintf("M %f %f L %f %f", c, a.y, c, a.y + 10), a.printPath({path:d, stroke:"#000000", fill:"#000000"}), a.printText(c + 5 * a.scale, 18.5, this.text).attr({"font-size":"" + 10 * a.scale + "px"}));
  this.anchor2 && (b = this.anchor2.x, d = ABCJS.write.sprintf("M %f %f L %f %f", b, a.y, b, a.y + 10), a.printPath({path:d, stroke:"#000000", fill:"#000000"}));
  d = ABCJS.write.sprintf("M %f %f L %f %f", c, a.y, b, a.y);
  a.printPath({path:d, stroke:"#000000", fill:"#000000"});
};
ABCJS.write.TieElem = function(a, c, b, d) {
  this.anchor1 = a;
  this.anchor2 = c;
  this.above = b;
  this.force = d;
};
ABCJS.write.TieElem.prototype.draw = function(a, c, b) {
  var d, k;
  this.startlimitelem && (c = this.startlimitelem.x + this.startlimitelem.w);
  this.endlimitelem && (b = this.endlimitelem.x);
  !this.force && this.anchor2 && this.anchor2.pitch === this.anchor2.top && (this.above = !0);
  this.anchor1 && (c = this.anchor1.x, d = this.above ? this.anchor1.highestVert : this.anchor1.pitch, this.anchor2 || (k = this.above ? this.anchor1.highestVert : this.anchor1.pitch));
  this.anchor2 && (b = this.anchor2.x, k = this.above ? this.anchor2.highestVert : this.anchor2.pitch, this.anchor1 || (d = this.above ? this.anchor2.highestVert : this.anchor2.pitch));
  a.drawArc(c, b, d, k, this.above);
};
ABCJS.write.DynamicDecoration = function(a, c) {
  this.anchor = a;
  this.dec = c;
};
ABCJS.write.DynamicDecoration.prototype.draw = function(a, c, b) {
  a.printSymbol(this.anchor.x, a.layouter.minY - 7, this.dec, 1, 1);
};
ABCJS.write.CrescendoElem = function(a, c, b) {
  this.anchor1 = a;
  this.anchor2 = c;
  this.dir = b;
};
ABCJS.write.CrescendoElem.prototype.draw = function(a, c, b) {
  "<" === this.dir ? (this.drawLine(a, 0, -4), this.drawLine(a, 0, 4)) : (this.drawLine(a, -4, 0), this.drawLine(a, 4, 0));
};
ABCJS.write.CrescendoElem.prototype.drawLine = function(a, c, b) {
  var d = a.layouter.minY - 7;
  c = ABCJS.write.sprintf("M %f %f L %f %f", this.anchor1.x, a.calcY(d) + c - 4, this.anchor2.x, a.calcY(d) + b - 4);
  a.printPath({path:c, stroke:"#000000"});
};
ABCJS.write.TripletElem = function(a, c, b, d) {
  this.anchor1 = c;
  this.anchor2 = b;
  this.above = d;
  this.number = a;
};
ABCJS.write.TripletElem.prototype.draw = function(a, c, b) {
  if (this.anchor1 && this.anchor2) {
    c = this.above ? 16 : -1;
    if (this.anchor1.parent.beam && this.anchor1.parent.beam === this.anchor2.parent.beam) {
      var d = this.anchor1.parent.beam;
      this.above = d.asc;
      c = d.pos;
    } else {
      this.drawLine(a, a.calcY(c));
    }
    b = this.anchor1.x + this.anchor2.x;
    var k = 0;
    d ? this.above ? (b += this.anchor2.w + this.anchor1.w, k = 4) : k = -4 : b += this.anchor2.w;
    a.printText(b / 2, c + k, this.number, "middle").attr({"font-size":"10px", "font-style":"italic"});
  }
};
ABCJS.write.TripletElem.prototype.drawLine = function(a, c) {
  var b, d = this.anchor1.x;
  b = ABCJS.write.sprintf("M %f %f L %f %f", d, c, d, c + 5);
  a.printPath({path:b, stroke:"#000000"});
  var k = this.anchor2.x + this.anchor2.w;
  b = ABCJS.write.sprintf("M %f %f L %f %f", k, c, k, c + 5);
  a.printPath({path:b, stroke:"#000000"});
  b = ABCJS.write.sprintf("M %f %f L %f %f", d, c, (d + k) / 2 - 5, c);
  a.printPath({path:b, stroke:"#000000"});
  b = ABCJS.write.sprintf("M %f %f L %f %f", (d + k) / 2 + 5, c, k, c);
  a.printPath({path:b, stroke:"#000000"});
};
ABCJS.write.BeamElem = function(a, c) {
  this.isflat = c;
  this.isgrace = a && "grace" === a;
  this.forceup = a && "up" === a;
  this.forcedown = a && "down" === a;
  this.elems = [];
  this.total = 0;
  this.dy = this.asc ? 1.2 * ABCJS.write.spacing.STEP : 1.2 * -ABCJS.write.spacing.STEP;
  this.isgrace && (this.dy *= .4);
  this.allrests = !0;
};
ABCJS.write.BeamElem.prototype.add = function(a) {
  var c = a.abcelem.averagepitch;
  if (void 0 !== c) {
    this.allrests = this.allrests && a.abcelem.rest;
    a.beam = this;
    this.elems.push(a);
    this.total += c;
    if (!this.min || a.abcelem.minpitch < this.min) {
      this.min = a.abcelem.minpitch;
    }
    if (!this.max || a.abcelem.maxpitch > this.max) {
      this.max = a.abcelem.maxpitch;
    }
  }
};
ABCJS.write.BeamElem.prototype.average = function() {
  try {
    return this.total / this.elems.length;
  } catch (a) {
    return 0;
  }
};
ABCJS.write.BeamElem.prototype.draw = function(a) {
  0 === this.elems.length || this.allrests || (this.drawBeam(a), this.drawStems(a));
};
ABCJS.write.BeamElem.prototype.calcDir = function() {
  var a = this.average();
  return this.asc = (this.forceup || this.isgrace || 6 > a) && !this.forcedown;
};
ABCJS.write.BeamElem.prototype.drawBeam = function(a) {
  var c = this.average(), b = this.isgrace ? 5 : 7;
  this.calcDir();
  var d = this.asc ? 5 : 8;
  this.pos = Math.round(this.asc ? Math.max(c + b, this.max + d) : Math.min(c - b, this.min - d));
  c = this.elems[0].abcelem.averagepitch - this.elems[this.elems.length - 1].abcelem.averagepitch;
  this.isflat && (c = 0);
  b = this.elems.length / 2;
  c > b && (c = b);
  c < -b && (c = -b);
  this.starty = a.calcY(this.pos + Math.floor(c / 2));
  this.endy = a.calcY(this.pos + Math.floor(-c / 2));
  c = this.elems[0].heads[this.asc ? 0 : this.elems[0].heads.length - 1];
  b = this.elems[this.elems.length - 1].heads[this.asc ? 0 : this.elems[this.elems.length - 1].heads.length - 1];
  this.startx = c.x;
  this.asc && (this.startx += c.w - .6);
  this.endx = b.x;
  this.asc && (this.endx += b.w);
  this.asc && 6 > this.pos ? (this.starty = a.calcY(6), this.endy = a.calcY(6)) : !this.asc && 6 < this.pos && (this.starty = a.calcY(6), this.endy = a.calcY(6));
  a.printPath({path:"M" + this.startx + " " + this.starty + " L" + this.endx + " " + this.endy + "L" + this.endx + " " + (this.endy + this.dy) + " L" + this.startx + " " + (this.starty + this.dy) + "z", stroke:"none", fill:"#000000"});
};
ABCJS.write.BeamElem.prototype.drawStems = function(a) {
  var c = [];
  a.beginGroup();
  for (var b = 0, d = this.elems.length;b < d;b++) {
    if (!this.elems[b].abcelem.rest) {
      var k = this.elems[b].heads[this.asc ? 0 : this.elems[b].heads.length - 1], g = this.isgrace ? 1 / 3 : .2, e = a.calcY(k.pitch + (this.asc ? g : -g)), k = k.x + (this.asc ? k.w : 0), g = this.getBarYAt(k);
      a.printStem(k, this.asc ? -.6 : .6, e, g);
      e = this.asc ? 1.5 * ABCJS.write.spacing.STEP : -1.5 * ABCJS.write.spacing.STEP;
      this.isgrace && (e = 2 * e / 3);
      for (var f = ABCJS.write.getDurlog(this.elems[b].abcelem.duration);-3 > f;f++) {
        c[-4 - f] ? c[-4 - f].single = !1 : c[-4 - f] = {x:k + (this.asc ? -.6 : 0), y:g + e * (-4 - f + 1), durlog:f, single:!0};
      }
      for (f = c.length - 1;0 <= f;f--) {
        if (b === d - 1 || ABCJS.write.getDurlog(this.elems[b + 1].abcelem.duration) > -f - 4) {
          var h = k, l = g + e * (f + 1);
          c[f].single && (h = 0 === b ? k + 5 : k - 5, l = this.getBarYAt(h) + e * (f + 1));
          a.printPath({path:"M" + c[f].x + " " + c[f].y + " L" + h + " " + l + "L" + h + " " + (l + this.dy) + " L" + c[f].x + " " + (c[f].y + this.dy) + "z", stroke:"none", fill:"#000000"});
          c = c.slice(0, f);
        }
      }
    }
  }
  a.endGroup();
};
ABCJS.write.BeamElem.prototype.getBarYAt = function(a) {
  return this.starty + (this.endy - this.starty) / (this.endx - this.startx) * (a - this.startx);
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.write || (window.ABCJS.write = {});
ABCJS.write.getDuration = function(a) {
  var c = 0;
  a.duration && (c = a.duration);
  return c;
};
ABCJS.write.getDurlog = function(a) {
  return void 0 === a ? 0 : Math.floor(Math.log(a) / Math.log(2));
};
ABCJS.write.Layout = function(a, c) {
  this.glyphs = a;
  this.isBagpipes = c;
  this.chartable = {rest:{0:"rests.whole", 1:"rests.half", 2:"rests.quarter", 3:"rests.8th", 4:"rests.16th", 5:"rests.32nd", 6:"rests.64th", 7:"rests.128th"}, note:{"-1":"noteheads.dbl", 0:"noteheads.whole", 1:"noteheads.half", 2:"noteheads.quarter", 3:"noteheads.quarter", 4:"noteheads.quarter", 5:"noteheads.quarter", 6:"noteheads.quarter"}, uflags:{3:"flags.u8th", 4:"flags.u16th", 5:"flags.u32nd", 6:"flags.u64th"}, dflags:{3:"flags.d8th", 4:"flags.d16th", 5:"flags.d32nd", 6:"flags.d64th"}};
  this.slurs = {};
  this.ties = [];
  this.slursbyvoice = {};
  this.tiesbyvoice = {};
  this.endingsbyvoice = {};
  this.v = this.s = 0;
  this.stafflines = 5;
  this.tripletmultiplier = 1;
};
ABCJS.write.Layout.prototype.getCurrentVoiceId = function() {
  return "s" + this.s + "v" + this.v;
};
ABCJS.write.Layout.prototype.pushCrossLineElems = function() {
  this.slursbyvoice[this.getCurrentVoiceId()] = this.slurs;
  this.tiesbyvoice[this.getCurrentVoiceId()] = this.ties;
  this.endingsbyvoice[this.getCurrentVoiceId()] = this.partstartelem;
};
ABCJS.write.Layout.prototype.popCrossLineElems = function() {
  this.slurs = this.slursbyvoice[this.getCurrentVoiceId()] || {};
  this.ties = this.tiesbyvoice[this.getCurrentVoiceId()] || [];
  this.partstartelem = this.endingsbyvoice[this.getCurrentVoiceId()];
};
ABCJS.write.Layout.prototype.getElem = function() {
  return this.abcline.length <= this.pos ? null : this.abcline[this.pos];
};
ABCJS.write.Layout.prototype.getNextElem = function() {
  return this.abcline.length <= this.pos + 1 ? null : this.abcline[this.pos + 1];
};
ABCJS.write.Layout.prototype.printABCLine = function(a) {
  this.minY = 2;
  this.staffgroup = new ABCJS.write.StaffGroupElement;
  for (this.s = 0;this.s < a.length;this.s++) {
    this.printABCStaff(a[this.s]);
  }
  return this.staffgroup;
};
ABCJS.write.Layout.prototype.printABCStaff = function(a) {
  for (this.v = 0;this.v < a.voices.length;this.v++) {
    this.voice = new ABCJS.write.VoiceElement(this.v, a.voices.length), 0 === this.v ? (this.voice.barfrom = "start" === a.connectBarLines || "continue" === a.connectBarLines, this.voice.barto = "continue" === a.connectBarLines || "end" === a.connectBarLines) : this.voice.duplicate = !0, a.title && a.title[this.v] && (this.voice.header = a.title[this.v]), this.voice.addChild(this.printClef(a.clef)), this.voice.addChild(this.printKeySignature(a.key)), a.meter && this.voice.addChild(this.printTimeSignature(a.meter)), 
    this.printABCVoice(a.voices[this.v]), this.staffgroup.addVoice(this.voice, this.s, this.stafflines);
  }
};
ABCJS.write.Layout.prototype.printABCVoice = function(a) {
  this.popCrossLineElems();
  this.stemdir = this.isBagpipes ? "down" : null;
  this.abcline = a;
  this.partstartelem && (this.partstartelem = new ABCJS.write.EndingElem("", null, null), this.voice.addOther(this.partstartelem));
  for (var c in this.slurs) {
    this.slurs.hasOwnProperty(c) && (this.slurs[c] = new ABCJS.write.TieElem(null, null, this.slurs[c].above, this.slurs[c].force), this.voice.addOther(this.slurs[c]));
  }
  for (a = 0;a < this.ties.length;a++) {
    this.ties[a] = new ABCJS.write.TieElem(null, null, this.ties[a].above, this.ties[a].force), this.voice.addOther(this.ties[a]);
  }
  for (this.pos = 0;this.pos < this.abcline.length;this.pos++) {
    for (c = this.printABCElement(), a = 0;a < c.length;a++) {
      this.voice.addChild(c[a]);
    }
  }
  this.pushCrossLineElems();
};
ABCJS.write.Layout.prototype.printABCElement = function() {
  var a = [], c = this.getElem();
  switch(c.el_type) {
    case "note":
      a = this.printBeam();
      break;
    case "bar":
      a[0] = this.printBarLine(c);
      this.voice.duplicate && (a[0].invisible = !0);
      break;
    case "meter":
      a[0] = this.printTimeSignature(c);
      this.voice.duplicate && (a[0].invisible = !0);
      break;
    case "clef":
      a[0] = this.printClef(c);
      this.voice.duplicate && (a[0].invisible = !0);
      break;
    case "key":
      a[0] = this.printKeySignature(c);
      this.voice.duplicate && (a[0].invisible = !0);
      break;
    case "stem":
      this.stemdir = c.direction;
      break;
    case "part":
      var b = new ABCJS.write.AbsoluteElement(c, 0, 0);
      b.addChild(new ABCJS.write.RelativeElement(c.title, 0, 0, 18, {type:"text", attributes:{"font-weight":"bold", "font-size":"" + 16 * this.printer.scale + "px", "font-family":"serif"}}));
      a[0] = b;
      break;
    default:
      b = new ABCJS.write.AbsoluteElement(c, 0, 0), b.addChild(new ABCJS.write.RelativeElement("element type " + c.el_type, 0, 0, 0, {type:"debug"})), a[0] = b;
  }
  return a;
};
ABCJS.write.Layout.prototype.printBeam = function() {
  var a = [];
  if (this.getElem().startBeam && !this.getElem().endBeam) {
    for (var c = new ABCJS.write.BeamElem(this.stemdir), b = this.pos, d;this.getElem();) {
      d = this.printNote(this.getElem(), !0, !0);
      c.add(d);
      if (this.getElem().endBeam) {
        break;
      }
      this.pos++;
    }
    d = c.calcDir();
    this.pos = b;
    c = new ABCJS.write.BeamElem(d ? "up" : "down");
    b = this.stemdir;
    for (this.stemdir = d ? "up" : "down";this.getElem();) {
      d = this.printNote(this.getElem(), !0);
      a.push(d);
      c.add(d);
      if (this.getElem().endBeam) {
        break;
      }
      this.pos++;
    }
    this.stemdir = b;
    this.voice.addOther(c);
  } else {
    a[0] = this.printNote(this.getElem());
  }
  return a;
};
ABCJS.write.sortPitch = function(a) {
  var c;
  do {
    c = !0;
    for (var b = 0;b < a.pitches.length - 1;b++) {
      if (a.pitches[b].pitch > a.pitches[b + 1].pitch) {
        c = !1;
        var d = a.pitches[b];
        a.pitches[b] = a.pitches[b + 1];
        a.pitches[b + 1] = d;
      }
    }
  } while (!c);
};
ABCJS.write.Layout.prototype.printNote = function(a, c, b) {
  var d = null, k = null, g = this.roomtakenright = this.roomtaken = 0, e = "", k = null, f = [], h, l, n, m, r = ABCJS.write.getDuration(a);
  0 === r && (r = .25, c = !0);
  var s = Math.floor(Math.log(r) / Math.log(2));
  m = 0;
  l = Math.pow(2, s);
  for (h = l / 2;l < r;m++, l += h, h /= 2) {
  }
  a.startTriplet && (this.tripletmultiplier = 2 === a.startTriplet ? 1.5 : (a.startTriplet - 1) / a.startTriplet);
  r = new ABCJS.write.AbsoluteElement(a, r * this.tripletmultiplier, 1);
  if (a.rest) {
    l = 7;
    "down" === this.stemdir && (l = 3);
    "up" === this.stemdir && (l = 11);
    switch(a.rest.type) {
      case "rest":
        e = this.chartable.rest[-s];
        a.averagepitch = l;
        a.minpitch = l;
        a.maxpitch = l;
        break;
      case "invisible":
      ;
      case "spacer":
        e = "";
    }
    b || (d = this.printNoteHead(r, e, {verticalPos:l}, null, 0, -this.roomtaken, null, m, 0, 1));
    d && r.addHead(d);
    this.roomtaken += this.accidentalshiftx;
    this.roomtakenright = Math.max(this.roomtakenright, this.dotshiftx);
  } else {
    ABCJS.write.sortPitch(a);
    var v = 0;
    h = 0;
    for (n = a.pitches.length;h < n;h++) {
      v += a.pitches[h].verticalPos;
    }
    a.averagepitch = v / a.pitches.length;
    a.minpitch = a.pitches[0].verticalPos;
    this.minY = Math.min(a.minpitch, this.minY);
    a.maxpitch = a.pitches[a.pitches.length - 1].verticalPos;
    v = 6 <= a.averagepitch ? "down" : "up";
    this.stemdir && (v = this.stemdir);
    for (h = "down" === v ? a.pitches.length - 2 : 1;"down" === v ? 0 <= h : h < a.pitches.length;h = "down" === v ? h - 1 : h + 1) {
      l = a.pitches["down" === v ? h + 1 : h - 1];
      var B = a.pitches[h], q = "down" === v ? l.pitch - B.pitch : B.pitch - l.pitch;
      1 >= q && !l.printer_shift && (B.printer_shift = q ? "different" : "same", (11 < B.verticalPos || 1 > B.verticalPos) && f.push(B.verticalPos - B.verticalPos % 2), "down" === v ? this.roomtaken = this.glyphs.getSymbolWidth(this.chartable.note[-s]) + 2 : g = this.glyphs.getSymbolWidth(this.chartable.note[-s]) + 2);
    }
    this.accidentalSlot = [];
    for (h = 0;h < a.pitches.length;h++) {
      c ? e = "noteheads.quarter" : (k = "down" === v && 0 !== h || "up" === v && h !== n - 1 ? null : this.chartable["down" === v ? "dflags" : "uflags"][-s], e = this.chartable.note[-s]);
      a.pitches[h].highestVert = a.pitches[h].verticalPos;
      l = ("up" === this.stemdir || "up" === v) && 0 === h;
      B = ("down" === this.stemdir || "down" === v) && h === n - 1;
      if (!b && (l || B)) {
        if (a.startSlur || 1 === n) {
          if (a.pitches[h].highestVert = a.pitches[n - 1].verticalPos, "up" === this.stemdir || "up" === v) {
            a.pitches[h].highestVert += 6;
          }
        }
        if (a.startSlur) {
          for (a.pitches[h].startSlur || (a.pitches[h].startSlur = []), l = 0;l < a.startSlur.length;l++) {
            a.pitches[h].startSlur.push(a.startSlur[l]);
          }
        }
        if (!b && a.endSlur) {
          a.pitches[h].highestVert = a.pitches[n - 1].verticalPos;
          if ("up" === this.stemdir || "up" === v) {
            a.pitches[h].highestVert += 6;
          }
          a.pitches[h].endSlur || (a.pitches[h].endSlur = []);
          for (l = 0;l < a.endSlur.length;l++) {
            a.pitches[h].endSlur.push(a.endSlur[l]);
          }
        }
      }
      b || (d = this.printNoteHead(r, e, a.pitches[h], v, 0, -this.roomtaken, k, m, g, 1));
      d && r.addHead(d);
      this.roomtaken += this.accidentalshiftx;
      this.roomtakenright = Math.max(this.roomtakenright, this.dotshiftx);
    }
    !c && -1 >= s && (m = "down" === v ? a.minpitch - 7 : a.minpitch + 1 / 3, 6 < m && !this.stemdir && (m = 6), h = "down" === v ? a.maxpitch - 1 / 3 : a.maxpitch + 7, 6 > h && !this.stemdir && (h = 6), n = "down" === v || 0 === r.heads.length ? 0 : r.heads[0].w, r.addExtra(new ABCJS.write.RelativeElement(null, n, 0, m, {type:"stem", pitch2:h, linewidth:"down" === v ? 1 : -1})), this.minY = Math.min(m, this.minY), this.minY = Math.min(h, this.minY));
  }
  if (void 0 !== a.lyric) {
    var y = "";
    window.ABCJS.parse.each(a.lyric, function(a) {
      y += a.syllable + a.divider + "\n";
    });
    r.addRight(new ABCJS.write.RelativeElement(y, 0, 5 * y.length, 0, {type:"debugLow"}));
  }
  if (!b && void 0 !== a.gracenotes) {
    c = null;
    1 < a.gracenotes.length && (c = new ABCJS.write.BeamElem("grace", this.isBagpipes));
    s = [];
    for (l = a.gracenotes.length - 1;0 <= l;l--) {
      this.roomtaken += 10, s[l] = this.roomtaken, a.gracenotes[l].accidental && (this.roomtaken += 7);
    }
    for (l = 0;l < a.gracenotes.length;l++) {
      g = a.gracenotes[l].verticalPos, k = c ? null : this.chartable.uflags[this.isBagpipes ? 5 : 3], k = this.printNoteHead(r, "noteheads.quarter", a.gracenotes[l], "up", -s[l], -s[l], k, 0, 0, .6), r.addExtra(k), a.gracenotes[l].acciaccatura && r.addRight(new ABCJS.write.RelativeElement("flags.ugrace", -s[l] + (c ? 5 : 6), 0, a.gracenotes[l].verticalPos + 4.2, {scalex:.6, scaley:.6})), c ? c.add({heads:[k], abcelem:{averagepitch:g, minpitch:g, maxpitch:g}, duration:this.isBagpipes ? .03125 : .0625}) : 
      (m = g + 1 / 3 * .6, h = g + 4.2, n = k.dx + k.w, g = -.6, r.addExtra(new ABCJS.write.RelativeElement(null, n, 0, m, {type:"stem", pitch2:h, linewidth:g}))), 0 !== l || this.isBagpipes || a.rest && ("spacer" === a.rest.type || "invisible" === a.rest.type) || this.voice.addOther(new ABCJS.write.TieElem(k, d, !1, !0));
    }
    c && this.voice.addOther(c);
  }
  !b && a.decoration && this.printDecoration(a.decoration, a.maxpitch, d ? d.w : 0, r, this.roomtaken, v, a.minpitch) && (r.klass = "mark");
  a.barNumber && r.addChild(new ABCJS.write.RelativeElement(a.barNumber, -10, 0, 0, {type:"debug"}));
  for (l = a.maxpitch;11 < l;l--) {
    0 !== l % 2 || a.rest || r.addChild(new ABCJS.write.RelativeElement(null, -2, this.glyphs.getSymbolWidth(e) + 4, l, {type:"ledger"}));
  }
  for (l = a.minpitch;1 > l;l++) {
    0 !== l % 2 || a.rest || r.addChild(new ABCJS.write.RelativeElement(null, -2, this.glyphs.getSymbolWidth(e) + 4, l, {type:"ledger"}));
  }
  for (l = 0;l < f.length;l++) {
    k = this.glyphs.getSymbolWidth(e), "down" === v && (k = -k), r.addChild(new ABCJS.write.RelativeElement(null, k - 2, this.glyphs.getSymbolWidth(e) + 4, f[l], {type:"ledger"}));
  }
  if (void 0 !== a.chord) {
    for (l = 0;l < a.chord.length;l++) {
      switch(e = 0, f = 16, a.chord[l].position) {
        case "left":
          this.roomtaken += 7;
          e = -this.roomtaken;
          f = a.averagepitch;
          r.addExtra(new ABCJS.write.RelativeElement(a.chord[l].name, e, this.glyphs.getSymbolWidth(a.chord[l].name[0]) + 4, f, {type:"text"}));
          break;
        case "right":
          e = this.roomtakenright += 4;
          f = a.averagepitch;
          r.addRight(new ABCJS.write.RelativeElement(a.chord[l].name, e, this.glyphs.getSymbolWidth(a.chord[l].name[0]) + 4, f, {type:"text"}));
          break;
        case "below":
          f = a.minpitch - 4;
          -3 < f && (f = -3);
          v = a.chord[l].name.split("\n");
          for (k = 0;k < v.length;k++) {
            r.addChild(new ABCJS.write.RelativeElement(v[k], e, 0, f, {type:"text"})), f -= 3;
          }
          break;
        default:
          a.chord[l].rel_position ? r.addChild(new ABCJS.write.RelativeElement(a.chord[l].name, e + a.chord[l].rel_position.x, 0, a.minpitch + a.chord[l].rel_position.y / ABCJS.write.spacing.STEP, {type:"text"})) : r.addChild(new ABCJS.write.RelativeElement(a.chord[l].name, e, 0, f, {type:"text"}));
      }
    }
  }
  a.startTriplet && (this.triplet = new ABCJS.write.TripletElem(a.startTriplet, d, null, !0), b || this.voice.addOther(this.triplet));
  a.endTriplet && this.triplet && (this.triplet.anchor2 = d, this.triplet = null, this.tripletmultiplier = 1);
  return r;
};
ABCJS.write.Layout.prototype.printNoteHead = function(a, c, b, d, k, g, e, f, h, l) {
  var n = b.verticalPos, m;
  this.dotshiftx = this.accidentalshiftx = 0;
  if (void 0 === c) {
    a.addChild(new ABCJS.write.RelativeElement("pitch is undefined", 0, 0, 0, {type:"debug"}));
  } else {
    if ("" === c) {
      m = new ABCJS.write.RelativeElement(null, 0, 0, n);
    } else {
      m = k;
      b.printer_shift && (m = "same" === b.printer_shift ? 1 : 0, m = "down" === d ? -this.glyphs.getSymbolWidth(c) * l + m : this.glyphs.getSymbolWidth(c) * l - m);
      m = new ABCJS.write.RelativeElement(c, m, this.glyphs.getSymbolWidth(c) * l, n, {scalex:l, scaley:l, extreme:"down" === d ? "below" : "above"});
      if (e) {
        c = n + ("down" === d ? -7 : 7) * l;
        if (1 === l && "down" === d ? 6 < c : 6 > c) {
          c = 6;
        }
        a.addRight(new ABCJS.write.RelativeElement(e, "down" === d ? k : k + m.w - .6, this.glyphs.getSymbolWidth(e) * l, c, {scalex:l, scaley:l}));
      }
      for (this.dotshiftx = m.w + h - 2 + 5 * f;0 < f;f--) {
        k = 1 - Math.abs(n) % 2, a.addRight(new ABCJS.write.RelativeElement("dots.dot", m.w + h - 2 + 5 * f, this.glyphs.getSymbolWidth("dots.dot"), n + k));
      }
    }
  }
  m && (m.highestVert = b.highestVert);
  if (b.accidental) {
    var r;
    switch(b.accidental) {
      case "quartersharp":
        r = "accidentals.halfsharp";
        break;
      case "dblsharp":
        r = "accidentals.dblsharp";
        break;
      case "sharp":
        r = "accidentals.sharp";
        break;
      case "quarterflat":
        r = "accidentals.halfflat";
        break;
      case "flat":
        r = "accidentals.flat";
        break;
      case "dblflat":
        r = "accidentals.dblflat";
        break;
      case "natural":
        r = "accidentals.nat";
    }
    f = !1;
    for (h = 0;h < this.accidentalSlot.length;h++) {
      if (6 <= n - this.accidentalSlot[h][0]) {
        this.accidentalSlot[h][0] = n;
        g = this.accidentalSlot[h][1];
        f = !0;
        break;
      }
    }
    !1 === f && (g -= this.glyphs.getSymbolWidth(r) * l + 2, this.accidentalSlot.push([n, g]), this.accidentalshiftx = this.glyphs.getSymbolWidth(r) * l + 2);
    a.addExtra(new ABCJS.write.RelativeElement(r, g, this.glyphs.getSymbolWidth(r), n, {scalex:l, scaley:l}));
  }
  b.endTie && this.ties[0] && (this.ties[0].anchor2 = m, this.ties = this.ties.slice(1, this.ties.length));
  b.startTie && (a = new ABCJS.write.TieElem(m, null, ("down" === this.stemdir || "down" === d) && "up" !== this.stemdir, "down" === this.stemdir || "up" === this.stemdir), this.ties[this.ties.length] = a, this.voice.addOther(a));
  if (b.endSlur) {
    for (a = 0;a < b.endSlur.length;a++) {
      l = b.endSlur[a], this.slurs[l] ? (n = this.slurs[l].anchor2 = m, delete this.slurs[l]) : (n = new ABCJS.write.TieElem(null, m, "down" === d, ("up" === this.stemdir || "down" === d) && "down" !== this.stemdir, this.stemdir), this.voice.addOther(n)), this.startlimitelem && (n.startlimitelem = this.startlimitelem);
    }
  }
  if (b.startSlur) {
    for (a = 0;a < b.startSlur.length;a++) {
      l = b.startSlur[a].label, n = new ABCJS.write.TieElem(m, null, ("down" === this.stemdir || "down" === d) && "up" !== this.stemdir, !1), this.slurs[l] = n, this.voice.addOther(n);
    }
  }
  return m;
};
ABCJS.write.Layout.prototype.printDecoration = function(a, c, b, d, k, g, e) {
  var f, h, l, n, m = [], r = 9 < c ? c + 3 : 12, s;
  s = !1;
  var v = this.minY - 4, B;
  k = k || 0;
  5 === c && (r = 14);
  var q = !1;
  for (B = 0;B < a.length;B++) {
    if ("staccato" === a[B] || "tenuto" === a[B]) {
      var y = "scripts." + a[B];
      s = "down" === g ? c + 2 : e - 2;
      switch(s) {
        case 2:
        ;
        case 4:
        ;
        case 6:
        ;
        case 8:
        ;
        case 10:
          "up" === g ? s-- : s++;
      }
      9 < c && r++;
      var A = b / 2;
      "center" !== this.glyphs.getSymbolAlign(y) && (A -= this.glyphs.getSymbolWidth(f) / 2);
      d.addChild(new ABCJS.write.RelativeElement(y, A, this.glyphs.getSymbolWidth(y), s));
    }
    "slide" === a[B] && d.heads[0] && (s = d.heads[0].pitch, A = new ABCJS.write.RelativeElement("", -k - 15, 0, s - 1), s = new ABCJS.write.RelativeElement("", -k - 5, 0, s + 1), d.addChild(A), d.addChild(s), this.voice.addOther(new ABCJS.write.TieElem(A, s, !1)));
  }
  for (B = 0;B < a.length;B++) {
    s = !1;
    switch(a[B]) {
      case "trill":
        f = "scripts.trill";
        break;
      case "roll":
        f = "scripts.roll";
        break;
      case "irishroll":
        f = "scripts.roll";
        break;
      case "marcato":
        f = "scripts.umarcato";
        break;
      case "marcato2":
        f = "scriopts.dmarcato";
        break;
      case "turn":
        f = "scripts.turn";
        break;
      case "uppermordent":
        f = "scripts.prall";
        break;
      case "mordent":
      ;
      case "lowermordent":
        f = "scripts.mordent";
        break;
      case "staccato":
      ;
      case "tenuto":
      ;
      case "slide":
        continue;
      case "downbow":
        f = "scripts.downbow";
        break;
      case "upbow":
        f = "scripts.upbow";
        break;
      case "fermata":
        f = "scripts.ufermata";
        break;
      case "invertedfermata":
        s = !0;
        f = "scripts.dfermata";
        break;
      case "breath":
        f = ",";
        break;
      case "accent":
        f = "scripts.sforzato";
        break;
      case "umarcato":
        f = "scripts.umarcato";
        break;
      case "coda":
        f = "scripts.coda";
        break;
      case "segno":
        f = "scripts.segno";
        break;
      case "/":
        h = ["flags.ugrace", 1];
        continue;
      case "//":
        h = ["flags.ugrace", 2];
        continue;
      case "///":
        h = ["flags.ugrace", 3];
        continue;
      case "////":
        h = ["flags.ugrace", 4];
        continue;
      case "p":
      ;
      case "mp":
      ;
      case "pp":
      ;
      case "ppp":
      ;
      case "pppp":
      ;
      case "f":
      ;
      case "ff":
      ;
      case "fff":
      ;
      case "ffff":
      ;
      case "sfz":
      ;
      case "mf":
        k = new ABCJS.write.DynamicDecoration(d, a[B]);
        this.voice.addOther(k);
        continue;
      case "mark":
        q = !0;
        continue;
      case "diminuendo(":
        ABCJS.write.Layout.prototype.startDiminuendoX = d;
        l = void 0;
        continue;
      case "diminuendo)":
        l = {start:ABCJS.write.Layout.prototype.startDiminuendoX, stop:d};
        ABCJS.write.Layout.prototype.startDiminuendoX = void 0;
        continue;
      case "crescendo(":
        ABCJS.write.Layout.prototype.startCrescendoX = d;
        n = void 0;
        continue;
      case "crescendo)":
        n = {start:ABCJS.write.Layout.prototype.startCrescendoX, stop:d};
        ABCJS.write.Layout.prototype.startCrescendoX = void 0;
        continue;
      default:
        m[m.length] = a[B];
        continue;
    }
    s ? (s = v, v -= 4) : (s = r, r += 3);
    A = b / 2;
    "center" !== this.glyphs.getSymbolAlign(f) && (A -= this.glyphs.getSymbolWidth(f) / 2);
    d.addChild(new ABCJS.write.RelativeElement(f, A, this.glyphs.getSymbolWidth(f), s));
  }
  if (h) {
    for (s = "down" === g ? c + 1 : c + 9, A = b / 2 + ("down" === g ? -5 : 3), a = 0;a < h[1];a++) {
      s -= 1, d.addChild(new ABCJS.write.RelativeElement(h[0], A, this.glyphs.getSymbolWidth(h[0]), s));
    }
  }
  l && (h = new ABCJS.write.CrescendoElem(l.start, l.stop, ">"), this.voice.addOther(h));
  n && (n = new ABCJS.write.CrescendoElem(n.start, n.stop, "<"), this.voice.addOther(n));
  0 < m.length && d.addChild(new ABCJS.write.RelativeElement(m.join(","), 0, 0, 0, {type:"debug"}));
  return q;
};
ABCJS.write.Layout.prototype.printBarLine = function(a) {
  var c = new ABCJS.write.AbsoluteElement(a, 0, 10), b = null, d = 0, k = "bar_right_repeat" === a.type || "bar_dbl_repeat" === a.type, g = "bar_left_repeat" !== a.type && "bar_thick_thin" !== a.type && "bar_invisible" !== a.type, e = "bar_right_repeat" === a.type || "bar_dbl_repeat" === a.type || "bar_left_repeat" === a.type || "bar_thin_thick" === a.type || "bar_thick_thin" === a.type, f = "bar_left_repeat" === a.type || "bar_thick_thin" === a.type || "bar_thin_thin" === a.type || "bar_dbl_repeat" === 
  a.type, h = "bar_left_repeat" === a.type || "bar_dbl_repeat" === a.type;
  if (k || h) {
    for (var l in this.slurs) {
      this.slurs.hasOwnProperty(l) && (this.slurs[l].endlimitelem = c);
    }
    this.startlimitelem = c;
  }
  k && (c.addRight(new ABCJS.write.RelativeElement("dots.dot", d, 1, 7)), c.addRight(new ABCJS.write.RelativeElement("dots.dot", d, 1, 5)), d += 6);
  g && (b = new ABCJS.write.RelativeElement(null, d, 1, 2, {type:"bar", pitch2:10, linewidth:.6}), c.addRight(b));
  "bar_invisible" === a.type && (b = new ABCJS.write.RelativeElement(null, d, 1, 2, {type:"none", pitch2:10, linewidth:.6}), c.addRight(b));
  a.decoration && this.printDecoration(a.decoration, 12, e ? 3 : 1, c, 0, "down", 2);
  e && (d += 4, b = new ABCJS.write.RelativeElement(null, d, 4, 2, {type:"bar", pitch2:10, linewidth:4}), c.addRight(b), d += 5);
  this.partstartelem && a.endEnding && (this.partstartelem.anchor2 = b, this.partstartelem = null);
  f && (d += 3, b = new ABCJS.write.RelativeElement(null, d, 1, 2, {type:"bar", pitch2:10, linewidth:.6}), c.addRight(b));
  h && (d += 3, c.addRight(new ABCJS.write.RelativeElement("dots.dot", d, 1, 7)), c.addRight(new ABCJS.write.RelativeElement("dots.dot", d, 1, 5)));
  a.startEnding && (this.partstartelem = new ABCJS.write.EndingElem(a.startEnding, b, null), this.voice.addOther(this.partstartelem));
  return c;
};
ABCJS.write.Layout.prototype.printClef = function(a) {
  var c = "clefs.G", b = 0, d = new ABCJS.write.AbsoluteElement(a, 0, 10);
  switch(a.type) {
    case "treble":
      break;
    case "tenor":
      c = "clefs.C";
      break;
    case "alto":
      c = "clefs.C";
      break;
    case "bass":
      c = "clefs.F";
      break;
    case "treble+8":
      b = 1;
      break;
    case "tenor+8":
      c = "clefs.C";
      b = 1;
      break;
    case "bass+8":
      c = "clefs.F";
      b = 1;
      break;
    case "alto+8":
      c = "clefs.C";
      b = 1;
      break;
    case "treble-8":
      b = -1;
      break;
    case "tenor-8":
      c = "clefs.C";
      b = -1;
      break;
    case "bass-8":
      c = "clefs.F";
      b = -1;
      break;
    case "alto-8":
      c = "clefs.C";
      b = -1;
      break;
    case "none":
      c = "";
      break;
    case "perc":
      c = "clefs.perc";
      break;
    default:
      d.addChild(new ABCJS.write.RelativeElement("clef=" + a.type, 0, 0, 0, {type:"debug"}));
  }
  "" !== c && d.addRight(new ABCJS.write.RelativeElement(c, 10, this.glyphs.getSymbolWidth(c), a.clefPos));
  if (0 !== b) {
    var k = 2 / 3, c = (this.glyphs.getSymbolWidth(c) - this.glyphs.getSymbolWidth("8") * k) / 2;
    d.addRight(new ABCJS.write.RelativeElement("8", 10 + c, this.glyphs.getSymbolWidth("8") * k, 0 < b ? 16 : -2, {scalex:k, scaley:k}));
  }
  this.stafflines = 0 === a.stafflines ? 0 : a.stafflines;
  return d;
};
ABCJS.write.Layout.prototype.printKeySignature = function(a) {
  var c = new ABCJS.write.AbsoluteElement(a, 0, 10), b = 0;
  a.accidentals && window.ABCJS.parse.each(a.accidentals, function(a) {
    var k = "sharp" === a.acc ? "accidentals.sharp" : "natural" === a.acc ? "accidentals.nat" : "accidentals.flat";
    c.addRight(new ABCJS.write.RelativeElement(k, b, this.glyphs.getSymbolWidth(k), a.verticalPos));
    b += this.glyphs.getSymbolWidth(k) + 2;
  }, this);
  return this.startlimitelem = c;
};
ABCJS.write.Layout.prototype.printTimeSignature = function(a) {
  var c = new ABCJS.write.AbsoluteElement(a, 0, 20);
  if ("specified" === a.type) {
    for (var b = 0;b < a.value.length;b++) {
      0 !== b && c.addRight(new ABCJS.write.RelativeElement("+", 20 * b - 9, this.glyphs.getSymbolWidth("+"), 7)), a.value[b].den ? (c.addRight(new ABCJS.write.RelativeElement(a.value[b].num, 20 * b, this.glyphs.getSymbolWidth(a.value[b].num.charAt(0)) * a.value[b].num.length, 9)), c.addRight(new ABCJS.write.RelativeElement(a.value[b].den, 20 * b, this.glyphs.getSymbolWidth(a.value[b].den.charAt(0)) * a.value[b].den.length, 5))) : c.addRight(new ABCJS.write.RelativeElement(a.value[b].num, 20 * b, 
      this.glyphs.getSymbolWidth(a.value[b].num.charAt(0)) * a.value[b].num.length, 7));
    }
  } else {
    "common_time" === a.type ? c.addRight(new ABCJS.write.RelativeElement("timesig.common", 0, this.glyphs.getSymbolWidth("timesig.common"), 7)) : "cut_time" === a.type && c.addRight(new ABCJS.write.RelativeElement("timesig.cut", 0, this.glyphs.getSymbolWidth("timesig.cut"), 7));
  }
  return this.startlimitelem = c;
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.write || (window.ABCJS.write = {});
ABCJS.write.spacing = function() {
};
ABCJS.write.spacing.FONTEM = 360;
ABCJS.write.spacing.FONTSIZE = 30;
ABCJS.write.spacing.STEP = 93 * ABCJS.write.spacing.FONTSIZE / 720;
ABCJS.write.spacing.SPACE = 10;
ABCJS.write.spacing.TOPNOTE = 20;
ABCJS.write.spacing.STAVEHEIGHT = 100;
ABCJS.write.Printer = function(a, c) {
  c = c || {};
  this.y = 0;
  this.paper = a;
  this.space = 3 * ABCJS.write.spacing.SPACE;
  this.glyphs = new ABCJS.write.Glyphs;
  this.listeners = [];
  this.selected = [];
  this.ingroup = !1;
  this.scale = c.scale || 1;
  this.staffwidth = c.staffwidth || 740;
  this.paddingtop = c.paddingtop || 15;
  this.paddingbottom = c.paddingbottom || 30;
  this.paddingright = c.paddingright || 50;
  this.paddingleft = c.paddingleft || 15;
  this.editable = c.editable || !1;
};
ABCJS.write.Printer.prototype.notifySelect = function(a) {
  this.clearSelection();
  this.selected = [a];
  a.highlight();
  for (var c = 0;c < this.listeners.length;c++) {
    this.listeners[c].highlight(a.abcelem);
  }
};
ABCJS.write.Printer.prototype.notifyChange = function(a) {
  for (a = 0;a < this.listeners.length;a++) {
    this.listeners[a].modelChanged();
  }
};
ABCJS.write.Printer.prototype.clearSelection = function() {
  for (var a = 0;a < this.selected.length;a++) {
    this.selected[a].unhighlight();
  }
  this.selected = [];
};
ABCJS.write.Printer.prototype.addSelectListener = function(a) {
  this.listeners[this.listeners.length] = a;
};
ABCJS.write.Printer.prototype.rangeHighlight = function(a, c) {
  this.clearSelection();
  for (var b = 0;b < this.staffgroups.length;b++) {
    for (var d = this.staffgroups[b].voices, k = 0;k < d.length;k++) {
      for (var g = d[k].children, e = 0;e < g.length;e++) {
        var f = g[e].abcelem.endChar;
        if (c > g[e].abcelem.startChar && a < f || c === a && c === f) {
          this.selected[this.selected.length] = g[e], g[e].highlight();
        }
      }
    }
  }
};
ABCJS.write.Printer.prototype.beginGroup = function() {
  this.path = [];
  this.lastM = [0, 0];
  this.ingroup = !0;
};
ABCJS.write.Printer.prototype.addPath = function(a) {
  a = a || [];
  if (0 !== a.length) {
    a[0][0] = "m";
    a[0][1] -= this.lastM[0];
    a[0][2] -= this.lastM[1];
    this.lastM[0] += a[0][1];
    this.lastM[1] += a[0][2];
    this.path.push(a[0]);
    for (var c = 1, b = a.length;c < b;c++) {
      "m" === a[c][0] && (this.lastM[0] += a[c][1], this.lastM[1] += a[c][2]), this.path.push(a[c]);
    }
  }
};
ABCJS.write.Printer.prototype.endGroup = function() {
  this.ingroup = !1;
  if (0 === this.path.length) {
    return null;
  }
  var a = this.paper.path().attr({path:this.path, stroke:"none", fill:"#000000"});
  1 !== this.scale && a.scale(this.scale, this.scale, 0, 0);
  return a;
};
ABCJS.write.Printer.prototype.printStaveLine = function(a, c, b) {
  b = this.calcY(b);
  a = ABCJS.write.sprintf("M %f %f L %f %f L %f %f L %f %f z", a, b - .35, c, b - .35, c, b + .35, a, b + .35);
  a = this.paper.path().attr({path:a, stroke:"none", fill:"#000000"}).toBack();
  1 !== this.scale && a.scale(this.scale, this.scale, 0, 0);
  return a;
};
ABCJS.write.Printer.prototype.printStem = function(a, c, b, d) {
  if (0 > c) {
    var k = d;
    d = b;
    b = k;
  }
  ~~a === a && (a += .05);
  a = [["M", a, b], ["L", a, d], ["L", a + c, d], ["L", a + c, b], ["z"]];
  if (this.ingroup) {
    this.addPath(a);
  } else {
    return a = this.paper.path().attr({path:a, stroke:"none", fill:"#000000"}).toBack(), 1 !== this.scale && a.scale(this.scale, this.scale, 0, 0), a;
  }
};
ABCJS.write.Printer.prototype.printText = function(a, c, b, d) {
  d = d || "start";
  return this.paper.text(a * this.scale, this.calcY(c) * this.scale, b).attr({"text-anchor":d, "font-size":12 * this.scale});
};
ABCJS.write.Printer.prototype.printSymbol = function(a, c, b, d, k) {
  var g;
  if (!b) {
    return null;
  }
  if (0 < b.length && 0 > b.indexOf(".")) {
    d = this.paper.set();
    for (var e = k = 0;e < b.length;e++) {
      g = this.glyphs.getYCorr(b.charAt(e)), (g = this.glyphs.printSymbol(a + k, this.calcY(c + g), b.charAt(e), this.paper)) ? (d.push(g), k += this.glyphs.getSymbolWidth(b.charAt(e))) : this.debugMsg(a, "no symbol:" + b);
    }
    1 !== this.scale && d.scale(this.scale, this.scale, 0, 0);
    return d;
  }
  g = this.glyphs.getYCorr(b);
  if (this.ingroup) {
    this.addPath(this.glyphs.getPathForSymbol(a, this.calcY(c + g), b, d, k));
  } else {
    if (g = this.glyphs.printSymbol(a, this.calcY(c + g), b, this.paper)) {
      return 1 !== this.scale && g.scale(this.scale, this.scale, 0, 0), g;
    }
    this.debugMsg(a, "no symbol:" + b);
  }
  return null;
};
ABCJS.write.Printer.prototype.printPath = function(a) {
  a = this.paper.path().attr(a);
  1 !== this.scale && a.scale(this.scale, this.scale, 0, 0);
  return a;
};
ABCJS.write.Printer.prototype.drawArc = function(a, c, b, d, k) {
  a += 6;
  c += 4;
  d += k ? 1.5 : -1.5;
  b = this.calcY(b + (k ? 1.5 : -1.5));
  d = this.calcY(d);
  var g = c - a, e = d - b, f = Math.sqrt(g * g + e * e), g = g / f, e = e / f, f = f / 3.5, h = (k ? -1 : 1) * Math.min(25, Math.max(4, f));
  k = a + f * g - h * e;
  var l = b + f * e + h * g, n = c - f * g - h * e, f = d - f * e + h * g;
  a = ABCJS.write.sprintf("M %f %f C %f %f %f %f %f %f C %f %f %f %f %f %f z", a, b, k, l, n, f, c, d, n - 2 * e, f + 2 * g, k - 2 * e, l + 2 * g, a, b);
  a = this.paper.path().attr({path:a, stroke:"none", fill:"#000000"});
  1 !== this.scale && a.scale(this.scale, this.scale, 0, 0);
  return a;
};
ABCJS.write.Printer.prototype.debugMsg = function(a, c) {
  return this.paper.text(a, this.y, c).scale(this.scale, this.scale, 0, 0);
};
ABCJS.write.Printer.prototype.debugMsgLow = function(a, c) {
  return this.paper.text(a, this.calcY(this.layouter.minY - 7), c).attr({"font-family":"serif", "font-size":12, "text-anchor":"begin"}).scale(this.scale, this.scale, 0, 0);
};
ABCJS.write.Printer.prototype.printLyrics = function(a, c) {
  var b = this.paper.text(a, this.calcY(this.layouter.minY - 7), c).attr({"font-family":"Times New Roman", "font-weight":"bold", "font-size":14, "text-anchor":"begin"}).scale(this.scale, this.scale, 0, 0);
  b[0].setAttribute("class", "abc-lyric");
  return b;
};
ABCJS.write.Printer.prototype.calcY = function(a) {
  return this.y + (ABCJS.write.spacing.TOPNOTE - a) * ABCJS.write.spacing.STEP;
};
ABCJS.write.Printer.prototype.printStave = function(a, c, b) {
  if (1 === b) {
    this.printStaveLine(a, c, 6);
  } else {
    for (var d = 0;d < b;d++) {
      this.printStaveLine(a, c, 2 * (d + 1));
    }
  }
};
ABCJS.write.Printer.prototype.printABC = function(a) {
  void 0 === a[0] && (a = [a]);
  for (var c = this.y = 0;c < a.length;c++) {
    this.printTune(a[c]);
  }
};
ABCJS.write.Printer.prototype.printTempo = function(a, c, b, d, k, g) {
  var e = {"text-anchor":"start", "font-size":12 * k.scale, "font-weight":"bold"};
  if (a.preString) {
    var f = c.text(g * k.scale, d * k.scale + 20 * k.scale, a.preString).attr(e);
    g += f.getBBox().width + 20 * k.scale;
  }
  if (a.duration) {
    for (var f = .75 * k.scale, h = a.duration[0], l = new ABCJS.write.AbsoluteElement(a, h, 1), n = Math.floor(Math.log(h) / Math.log(2)), m = 0, r = Math.pow(2, n), s = r / 2;r < h;m++, r += s, s /= 2) {
    }
    b = b.printNoteHead(l, b.chartable.note[-n], {verticalPos:14.5}, "up", 0, 0, b.chartable.uflags[-n], m, 0, f);
    l.addHead(b);
    1 > h && l.addExtra(new ABCJS.write.RelativeElement(null, b.dx + b.w, 0, 14.5 + 1 / 3 * f, {type:"stem", pitch2:14.5 + 7 * f, linewidth:-.6 * k.scale}));
    l.x = 1 / k.scale * g;
    l.draw(k, null);
    g += l.w + 5 * k.scale;
    f = c.text(g, d * k.scale + 20 * k.scale, "= " + a.bpm).attr(e);
    g += f.getBBox().width + 10 * k.scale;
  }
  a.postString && c.text(g, d * k.scale + 20 * k.scale, a.postString).attr(e);
  return d += 15 * k.scale;
};
ABCJS.write.Printer.prototype.printTune = function(a) {
  this.layouter = new ABCJS.write.Layout(this.glyphs, a.formatting.bagpipes);
  this.layouter.printer = this;
  this.y = "print" === a.media ? this.y + (void 0 === a.formatting.topmargin ? 54 : a.formatting.topmargin) : this.y + this.paddingtop;
  this.width = a.formatting.staffwidth ? a.formatting.staffwidth : this.staffwidth;
  this.width += this.paddingleft;
  a.formatting.scale && (this.scale = a.formatting.scale);
  a.metaText.title && this.paper.text(this.width * this.scale / 2, this.y, a.metaText.title).attr({"font-size":20 * this.scale, "font-family":"serif"});
  this.y += 20 * this.scale;
  a.lines[0] && a.lines[0].subtitle && (this.printSubtitleLine(a.lines[0]), this.y += 20 * this.scale);
  a.metaText.rhythm && (this.paper.text(this.paddingleft, this.y, a.metaText.rhythm).attr({"text-anchor":"start", "font-style":"italic", "font-family":"serif", "font-size":12 * this.scale}), a.metaText.author || a.metaText.origin || a.metaText.composer || (this.y += 15 * this.scale));
  var c = "";
  a.metaText.composer && (c += a.metaText.composer);
  a.metaText.origin && (c += " (" + a.metaText.origin + ")");
  0 < c.length && (this.paper.text(this.width * this.scale, this.y, c).attr({"text-anchor":"end", "font-style":"italic", "font-family":"serif", "font-size":12 * this.scale}), this.y += 15);
  a.metaText.author && (this.paper.text(this.width * this.scale, this.y, a.metaText.author).attr({"text-anchor":"end", "font-style":"italic", "font-family":"serif", "font-size":12 * this.scale}), this.y += 15);
  a.metaText.tempo && !a.metaText.tempo.suppress && (this.y = this.printTempo(a.metaText.tempo, this.paper, this.layouter, this.y, this, 50), this.y += 20 * this.scale);
  this.staffgroups = [];
  for (var c = this.width, b = 0;b < a.lines.length;b++) {
    var d = a.lines[b];
    if (d.staff) {
      staffgroup = this.printStaffLine(a, d, b), staffgroup.w > c && (c = staffgroup.w);
    } else {
      if (d.subtitle && 0 !== b) {
        this.printSubtitleLine(d), this.y += 20 * this.scale;
      } else {
        if (d.text) {
          if ("string" === typeof d.text) {
            this.paper.text(100, this.y, "TEXT: " + d.text);
          } else {
            for (var k = "", g = 0;g < d.text.length;g++) {
              k += " FONT " + d.text[g].text;
            }
            this.paper.text(100, this.y, "TEXT: " + k);
          }
          this.y += 20 * this.scale;
        }
      }
    }
  }
  b = "";
  a.metaText.partOrder && (b += "Part Order: " + a.metaText.partOrder + "\n");
  if (a.metaText.unalignedWords) {
    for (d = 0;d < a.metaText.unalignedWords.length;d++) {
      if ("string" === typeof a.metaText.unalignedWords[d]) {
        b += a.metaText.unalignedWords[d] + "\n";
      } else {
        for (k = 0;k < a.metaText.unalignedWords[d].length;k++) {
          b += " FONT " + a.metaText.unalignedWords[d][k].text;
        }
        b += "\n";
      }
    }
    b = this.paper.text(this.paddingleft * this.scale + 50 * this.scale, this.y * this.scale + 25 * this.scale, b).attr({"text-anchor":"start", "font-family":"serif", "font-size":17 * this.scale});
    d = b.getBBox().height + 17 * this.scale;
    b.translate(0, d / 2);
    this.y += d;
    b = "";
  }
  a.metaText.book && (b += "Book: " + a.metaText.book + "\n");
  a.metaText.source && (b += "Source: " + a.metaText.source + "\n");
  a.metaText.discography && (b += "Discography: " + a.metaText.discography + "\n");
  a.metaText.notes && (b += "Notes: " + a.metaText.notes + "\n");
  a.metaText.transcription && (b += "Transcription: " + a.metaText.transcription + "\n");
  a.metaText.history && (b += "History: " + a.metaText.history + "\n");
  b = this.paper.text(this.paddingleft, this.y * this.scale + 25 * this.scale, b).attr({"text-anchor":"start", "font-family":"serif", "font-size":17 * this.scale});
  (d = b.getBBox().height) || (d = 25 * this.scale);
  b.translate(0, d / 2);
  this.y += 25 * this.scale + d * this.scale;
  a = (c + this.paddingright) * this.scale;
  this.paper.setSize(a, (this.y + this.paddingbottom) * this.scale);
  this.paper.canvas.parentNode.setAttribute("style", "width:" + a + "px");
};
ABCJS.write.Printer.prototype.printSubtitleLine = function(a) {
  this.paper.text(this.width / 2, this.y, a.subtitle).attr({"font-size":16}).scale(this.scale, this.scale, 0, 0);
};
ABCJS.write.Printer.prototype.printStaffLine = function(a, c, b) {
  c = this.layouter.printABCLine(c.staff);
  for (var d = this.space, k = 0;3 > k;k++) {
    c.layout(d, this, !1);
    if (b && b === a.lines.length - 1 && .66 > c.w / this.width && !a.formatting.stretchlast) {
      break;
    }
    var g = c.w - c.spacingunits * d;
    0 < c.spacingunits && (d = (this.width - g) / c.spacingunits, 50 < d * c.minspace && (d = 50 / c.minspace));
  }
  c.draw(this, this.y);
  this.staffgroups[this.staffgroups.length] = c;
  this.y = c.y + c.height;
  this.y += .2 * ABCJS.write.spacing.STAVEHEIGHT;
  return c;
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.write || (window.ABCJS.write = {});
ABCJS.write.sprintf = function() {
  for (var a = 0, c, b = arguments[a++], d = [], k, g, e;b;) {
    if (k = /^[^\x25]+/.exec(b)) {
      d.push(k[0]);
    } else {
      if (k = /^\x25{2}/.exec(b)) {
        d.push("%");
      } else {
        if (k = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(b)) {
          if (null == (c = arguments[k[1] || a++]) || void 0 == c) {
            throw "Too few arguments.";
          }
          if (/[^s]/.test(k[7]) && "number" != typeof c) {
            throw "Expecting number but found " + typeof c;
          }
          switch(k[7]) {
            case "b":
              c = c.toString(2);
              break;
            case "c":
              c = String.fromCharCode(c);
              break;
            case "d":
              c = parseInt(c);
              break;
            case "e":
              c = k[6] ? c.toExponential(k[6]) : c.toExponential();
              break;
            case "f":
              c = k[6] ? parseFloat(c).toFixed(k[6]) : parseFloat(c);
              break;
            case "o":
              c = c.toString(8);
              break;
            case "s":
              c = (c = String(c)) && k[6] ? c.substring(0, k[6]) : c;
              break;
            case "u":
              c = Math.abs(c);
              break;
            case "x":
              c = c.toString(16);
              break;
            case "X":
              c = c.toString(16).toUpperCase();
          }
          c = /[def]/.test(k[7]) && k[2] && 0 < c ? "+" + c : c;
          g = k[3] ? "0" == k[3] ? "0" : k[3].charAt(1) : " ";
          e = k[5] - String(c).length;
          g = k[5] ? str_repeat(g, e) : "";
          d.push(k[4] ? c + g : g + c);
        } else {
          throw "Huh ?!";
        }
      }
    }
    b = b.substring(k[0].length);
  }
  return d.join("");
};
window.ABCJS || (window.ABCJS = {});
window.ABCJS.edit || (window.ABCJS.edit = {});
window.ABCJS.edit.EditArea = function(a) {
  this.textarea = document.getElementById(a);
  this.initialText = this.textarea.value;
  this.isDragging = !1;
};
window.ABCJS.edit.EditArea.prototype.addSelectionListener = function(a) {
  this.textarea.onmousemove = function(c) {
    this.isDragging && a.fireSelectionChanged();
  };
};
window.ABCJS.edit.EditArea.prototype.addChangeListener = function(a) {
  this.changelistener = a;
  this.textarea.onkeyup = function() {
    a.fireChanged();
  };
  this.textarea.onmousedown = function() {
    this.isDragging = !0;
    a.fireSelectionChanged();
  };
  this.textarea.onmouseup = function() {
    this.isDragging = !1;
    a.fireChanged();
  };
  this.textarea.onchange = function() {
    a.fireChanged();
  };
};
window.ABCJS.edit.EditArea.prototype.getSelection = function() {
  return{start:this.textarea.selectionStart, end:this.textarea.selectionEnd};
};
window.ABCJS.edit.EditArea.prototype.setSelection = function(a, c) {
  if (this.textarea.setSelectionRange) {
    this.textarea.setSelectionRange(a, c);
  } else {
    if (this.textarea.createTextRange) {
      var b = this.textarea.createTextRange();
      b.collapse(!0);
      b.moveEnd("character", c);
      b.moveStart("character", a);
      b.select();
    }
  }
  this.textarea.focus();
};
window.ABCJS.edit.EditArea.prototype.getString = function() {
  return this.textarea.value;
};
window.ABCJS.edit.EditArea.prototype.setString = function(a) {
  this.textarea.value = a;
  this.initialText = this.getString();
  this.changelistener && this.changelistener.fireChanged();
};
window.ABCJS.edit.EditArea.prototype.getElem = function() {
  return this.textarea;
};
window.ABCJS.Editor = function(a, c) {
  c.indicate_changed && (this.indicate_changed = !0);
  this.editarea = "string" === typeof a ? new window.ABCJS.edit.EditArea(a) : a;
  this.editarea.addSelectionListener(this);
  this.editarea.addChangeListener(this);
  c.canvas_id ? this.div = document.getElementById(c.canvas_id) : c.paper_id ? this.div = document.getElementById(c.paper_id) : (this.div = document.createElement("DIV"), this.editarea.getElem().parentNode.insertBefore(this.div, this.editarea.getElem()));
  if (c.generate_midi || c.midi_id) {
    this.mididiv = c.midi_id ? document.getElementById(c.midi_id) : this.div;
  }
  if (c.generate_warnings || c.warnings_id) {
    this.warningsdiv = c.warnings_id ? document.getElementById(c.warnings_id) : this.div;
  }
  this.parserparams = c.parser_options || {};
  this.midiparams = c.midi_options || {};
  this.onchangeCallback = c.onchange;
  this.printerparams = c.render_options || {};
  c.gui && (this.target = document.getElementById(a), this.printerparams.editable = !0);
  this.oldt = "";
  this.bReentry = !1;
  this.parseABC();
  this.modelChanged();
  this.addClassName = function(a, c) {
    var k = a.className;
    0 < k.length && (k === c || (new RegExp("(^|\\s)" + c + "(\\s|$)")).test(k)) || (a.className += (a.className ? " " : "") + c);
    return a;
  };
  this.removeClassName = function(a, c) {
    a.className = window.ABCJS.parse.strip(a.className.replace(new RegExp("(^|\\s+)" + c + "(\\s+|$)"), " "));
    return a;
  };
  this.setReadOnly = function(a) {
    var c = this.editarea.getElem();
    a ? (c.setAttribute("readonly", "yes"), this.addClassName(c, "abc_textarea_readonly")) : (c.removeAttribute("readonly"), this.removeClassName(c, "abc_textarea_readonly"));
  };
};
window.ABCJS.Editor.prototype.renderTune = function(a, c, b) {
  a = new ABCJS.TuneBook(a);
  var d = window.ABCJS.parse.Parse();
  d.parse(a.tunes[0].abc, c);
  c = d.getTune();
  b = Raphael(b, 800, 400);
  (new ABCJS.write.Printer(b, {})).printABC(c);
};
window.ABCJS.Editor.prototype.modelChanged = function() {
  if (void 0 === this.tunes) {
    void 0 !== this.mididiv && this.mididiv !== this.div && (this.mididiv.innerHTML = ""), this.div.innerHTML = "";
  } else {
    if (!this.bReentry) {
      this.bReentry = !0;
      this.timerId = null;
      this.div.innerHTML = "";
      var a = Raphael(this.div, 800, 400);
      this.printer = new ABCJS.write.Printer(a, this.printerparams);
      this.printer.printABC(this.tunes);
      ABCJS.midi.MidiWriter && this.mididiv && (this.mididiv !== this.div && (this.mididiv.innerHTML = ""), a = new ABCJS.midi.MidiWriter(this.mididiv, this.midiparams), a.addListener(this.printer), a.writeABC(this.tunes[0]));
      this.warningsdiv && (this.warningsdiv.innerHTML = this.warnings ? this.warnings.join("<br />") : "No errors");
      this.target && (new window.ABCJS.transform.TextPrinter(this.target, !0)).printABC(this.tunes[0]);
      this.printer.addSelectListener(this);
      this.updateSelection();
      this.bReentry = !1;
    }
  }
};
window.ABCJS.Editor.prototype.paramChanged = function(a) {
  this.printerparams = a;
  this.oldt = "";
  this.fireChanged();
};
window.ABCJS.Editor.prototype.parseABC = function() {
  var a = this.editarea.getString();
  if (a === this.oldt) {
    return this.updateSelection(), !1;
  }
  this.oldt = a;
  if ("" === a) {
    return this.tunes = void 0, this.warnings = "", !0;
  }
  a = new ABCJS.TuneBook(a);
  this.tunes = [];
  this.warnings = [];
  for (var c = 0;c < a.tunes.length;c++) {
    var b = new window.ABCJS.parse.Parse;
    b.parse(a.tunes[c].abc, this.parserparams);
    this.tunes[c] = b.getTune();
    for (var b = b.getWarnings() || [], d = 0;d < b.length;d++) {
      this.warnings.push(b[d]);
    }
  }
  return!0;
};
window.ABCJS.Editor.prototype.updateSelection = function() {
  var a = this.editarea.getSelection();
  try {
    this.printer.rangeHighlight(a.start, a.end);
  } catch (c) {
  }
};
window.ABCJS.Editor.prototype.fireSelectionChanged = function() {
  this.updateSelection();
};
window.ABCJS.Editor.prototype.setDirtyStyle = function(a) {
  if (void 0 !== this.indicate_changed) {
    var c = function(a, b) {
      var c = a.className;
      0 < c.length && (c === b || (new RegExp("(^|\\s)" + b + "(\\s|$)")).test(c)) || (a.className += (a.className ? " " : "") + b);
      return a;
    }, b = function(a, b) {
      a.className = window.ABCJS.parse.strip(a.className.replace(new RegExp("(^|\\s+)" + b + "(\\s+|$)"), " "));
      return a;
    }, d = this.editarea.getElem();
    a ? c(d, "abc_textarea_dirty") : b(d, "abc_textarea_dirty");
  }
};
window.ABCJS.Editor.prototype.fireChanged = function() {
  if (!this.bIsPaused && this.parseABC()) {
    var a = this;
    this.timerId && clearTimeout(this.timerId);
    this.timerId = setTimeout(function() {
      a.modelChanged();
    }, 300);
    var c = this.isDirty();
    this.wasDirty !== c && (this.wasDirty = c, this.setDirtyStyle(c));
    if (this.onchangeCallback) {
      this.onchangeCallback(this);
    }
  }
};
window.ABCJS.Editor.prototype.setNotDirty = function() {
  this.editarea.initialText = this.editarea.getString();
  this.wasDirty = !1;
  this.setDirtyStyle(!1);
};
window.ABCJS.Editor.prototype.isDirty = function() {
  return void 0 === this.indicate_changed ? !1 : this.editarea.initialText !== this.editarea.getString();
};
window.ABCJS.Editor.prototype.highlight = function(a) {
  this.editarea.setSelection(a.startChar, a.endChar);
};
window.ABCJS.Editor.prototype.pause = function(a) {
  (this.bIsPaused = a) || this.updateRendering();
};
window.ABCJS.Editor.prototype.pauseMidi = function(a) {
  a && this.mididiv ? (this.mididivSave = this.mididiv, this.addClassName(this.mididiv, "hidden"), this.mididiv = null) : !a && this.mididivSave && (this.mididiv = this.mididivSave, this.removeClassName(this.mididiv, "hidden"), this.mididivSave = null);
};
