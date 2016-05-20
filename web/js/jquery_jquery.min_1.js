!function (v, R) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = v.document ? R(v, !0) : function (v) {
        if (!v.document)throw Error("jQuery requires a window with a document");
        return R(v)
    } : R(v)
}("undefined" != typeof window ? window : this, function (v, R) {
    function Aa(a) {
        var b = a.length, c = d.type(a);
        return "function" === c || d.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && 0 < b && b - 1 in a
    }

    function Ba(a, b, c) {
        if (d.isFunction(b))return d.grep(a, function (a, d) {
            return !!b.call(a,
                    d, a) !== c
        });
        if (b.nodeType)return d.grep(a, function (a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (Hb.test(b))return d.filter(b, a, c);
            b = d.filter(b, a)
        }
        return d.grep(a, function (a) {
            return 0 <= la.call(b, a) !== c
        })
    }

    function Oa(a, b) {
        for (; (a = a[b]) && 1 !== a.nodeType;);
        return a
    }

    function Ib(a) {
        var b = Pa[a] = {};
        return d.each(a.match(I) || [], function (a, d) {
            b[d] = !0
        }), b
    }

    function S() {
        w.removeEventListener("DOMContentLoaded", S, !1);
        v.removeEventListener("load", S, !1);
        d.ready()
    }

    function N() {
        Object.defineProperty(this.cache = {},
            0, {
                get: function () {
                    return {}
                }
            });
        this.expando = d.expando + Math.random()
    }

    function Qa(a, b, c) {
        var e;
        if (void 0 === c && 1 === a.nodeType)if (e = "data-" + b.replace(Jb, "-$1").toLowerCase(), c = a.getAttribute(e), "string" == typeof c) {
            try {
                c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : Kb.test(c) ? d.parseJSON(c) : c
            } catch (f) {
            }
            y.set(a, b, c)
        } else c = void 0;
        return c
    }

    function ma() {
        return !0
    }

    function Z() {
        return !1
    }

    function Ra() {
        try {
            return w.activeElement
        } catch (a) {
        }
    }

    function Sa(a, b) {
        return d.nodeName(a, "table") && d.nodeName(11 !==
        b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function Lb(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function Mb(a) {
        var b = Nb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function Ca(a, b) {
        for (var c = 0, d = a.length; d > c; c++)t.set(a[c], "globalEval", !b || t.get(b[c], "globalEval"))
    }

    function Ta(a, b) {
        var c, e, f, g, h, k;
        if (1 === b.nodeType) {
            if (t.hasData(a) && (c = t.access(a), e = t.set(b, c), k = c.events))for (f in delete e.handle,
                e.events = {}, k)for (c = 0, e = k[f].length; e > c; c++)d.event.add(b, f, k[f][c]);
            y.hasData(a) && (g = y.access(a), h = d.extend({}, g), y.set(b, h))
        }
    }

    function D(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && d.nodeName(a, b) ? d.merge([a], c) : c
    }

    function Ua(a, b) {
        var c = d(b.createElement(a)).appendTo(b.body), e = v.getDefaultComputedStyle ? v.getDefaultComputedStyle(c[0]).display : d.css(c[0], "display");
        return c.detach(), e
    }

    function Va(a) {
        var b =
            w, c = Wa[a];
        return c || (c = Ua(a, b), "none" !== c && c || (na = (na || d("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = na[0].contentDocument, b.write(), b.close(), c = Ua(a, b), na.detach()), Wa[a] = c), c
    }

    function O(a, b, c) {
        var e, f, g, h, k = a.style;
        return c = c || oa(a), c && (h = c.getPropertyValue(b) || c[b]), c && ("" !== h || d.contains(a.ownerDocument, a) || (h = d.style(a, b)), Da.test(h) && Xa.test(b) && (e = k.width, f = k.minWidth, g = k.maxWidth, k.minWidth = k.maxWidth = k.width = h, h = c.width, k.width = e, k.minWidth = f, k.maxWidth =
            g)), void 0 !== h ? h + "" : h
    }

    function Ya(a, b) {
        return {
            get: function () {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    function Za(a, b) {
        if (b in a)return b;
        for (var c = b[0].toUpperCase() + b.slice(1), d = b, f = $a.length; f--;)if (b = $a[f] + c, b in a)return b;
        return d
    }

    function ab(a, b, c) {
        return (a = Ob.exec(b)) ? Math.max(0, a[1] - (c || 0)) + (a[2] || "px") : b
    }

    function bb(a, b, c, e, f) {
        b = c === (e ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        for (var g = 0; 4 > b; b += 2)"margin" === c && (g += d.css(a, c + T[b], !0, f)), e ? ("content" === c && (g -= d.css(a,
            "padding" + T[b], !0, f)), "margin" !== c && (g -= d.css(a, "border" + T[b] + "Width", !0, f))) : (g += d.css(a, "padding" + T[b], !0, f), "padding" !== c && (g += d.css(a, "border" + T[b] + "Width", !0, f)));
        return g
    }

    function cb(a, b, c) {
        var e = !0, f = "width" === b ? a.offsetWidth : a.offsetHeight, g = oa(a), h = "border-box" === d.css(a, "boxSizing", !1, g);
        if (0 >= f || null == f) {
            if (f = O(a, b, g), (0 > f || null == f) && (f = a.style[b]), Da.test(f))return f;
            e = h && (x.boxSizingReliable() || f === a.style[b]);
            f = parseFloat(f) || 0
        }
        return f + bb(a, b, c || (h ? "border" : "content"), e, g) + "px"
    }

    function db(a,
                b) {
        for (var c, e, f, g = [], h = 0, k = a.length; k > h; h++)e = a[h], e.style && (g[h] = t.get(e, "olddisplay"), c = e.style.display, b ? (g[h] || "none" !== c || (e.style.display = ""), "" === e.style.display && ea(e) && (g[h] = t.access(e, "olddisplay", Va(e.nodeName)))) : g[h] || (f = ea(e), (c && "none" !== c || !f) && t.set(e, "olddisplay", f ? c : d.css(e, "display"))));
        for (h = 0; k > h; h++)e = a[h], e.style && (b && "none" !== e.style.display && "" !== e.style.display || (e.style.display = b ? g[h] || "" : "none"));
        return a
    }

    function z(a, b, c, d, f) {
        return new z.prototype.init(a, b, c, d, f)
    }

    function eb() {
        return setTimeout(function () {
            U = void 0
        }), U = d.now()
    }

    function $(a, b) {
        var c, d = 0, f = {height: a};
        for (b = b ? 1 : 0; 4 > d; d += 2 - b)c = T[d], f["margin" + c] = f["padding" + c] = a;
        return b && (f.opacity = f.width = a), f
    }

    function fb(a, b, c) {
        for (var d, f = (fa[b] || []).concat(fa["*"]), g = 0, h = f.length; h > g; g++)if (d = f[g].call(c, b, a))return d
    }

    function Pb(a, b) {
        var c, e, f, g, h;
        for (c in a)if (e = d.camelCase(c), f = b[e], g = a[c], d.isArray(g) && (f = g[1], g = a[c] = g[0]), c !== e && (a[e] = g, delete a[c]), h = d.cssHooks[e], h && "expand" in h)for (c in g = h.expand(g), delete a[e], g)c in a || (a[c] = g[c], b[c] = f);
        else b[e] = f
    }

    function gb(a, b, c) {
        var e, f = 0, g = pa.length, h = d.Deferred().always(function () {
            delete k.elem
        }), k = function () {
            if (e)return !1;
            for (var b = U || eb(), b = Math.max(0, l.startTime + l.duration - b), c = 1 - (b / l.duration || 0), d = 0, f = l.tweens.length; f > d; d++)l.tweens[d].run(c);
            return h.notifyWith(a, [l, c, b]), 1 > c && f ? b : (h.resolveWith(a, [l]), !1)
        }, l = h.promise({
            elem: a,
            props: d.extend({}, b),
            opts: d.extend(!0, {specialEasing: {}}, c),
            originalProperties: b,
            originalOptions: c,
            startTime: U || eb(),
            duration: c.duration,
            tweens: [],
            createTween: function (b,
                                   c) {
                var e = d.Tween(a, l.opts, b, c, l.opts.specialEasing[b] || l.opts.easing);
                return l.tweens.push(e), e
            },
            stop: function (b) {
                var c = 0, d = b ? l.tweens.length : 0;
                if (e)return this;
                for (e = !0; d > c; c++)l.tweens[c].run(1);
                return b ? h.resolveWith(a, [l, b]) : h.rejectWith(a, [l, b]), this
            }
        });
        c = l.props;
        for (Pb(c, l.opts.specialEasing); g > f; f++)if (b = pa[f].call(l, a, c, l.opts))return b;
        return d.map(c, fb, l), d.isFunction(l.opts.start) && l.opts.start.call(a, l), d.fx.timer(d.extend(k, {
            elem: a,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done,
            l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function hb(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var e, f = 0, g = b.toLowerCase().match(I) || [];
            if (d.isFunction(c))for (; e = g[f++];)"+" === e[0] ? (e = e.slice(1) || "*", (a[e] = a[e] || []).unshift(c)) : (a[e] = a[e] || []).push(c)
        }
    }

    function ib(a, b, c, e) {
        function f(k) {
            var l;
            return g[k] = !0, d.each(a[k] || [], function (a, d) {
                var k = d(b, c, e);
                return "string" != typeof k || h || g[k] ? h ? !(l = k) : void 0 : (b.dataTypes.unshift(k), f(k), !1)
            }), l
        }

        var g = {}, h = a === Ea;
        return f(b.dataTypes[0]) ||
            !g["*"] && f("*")
    }

    function Fa(a, b) {
        var c, e, f = d.ajaxSettings.flatOptions || {};
        for (c in b)void 0 !== b[c] && ((f[c] ? a : e || (e = {}))[c] = b[c]);
        return e && d.extend(!0, a, e), a
    }

    function Ga(a, b, c, e) {
        var f;
        if (d.isArray(b))d.each(b, function (b, d) {
            c || Qb.test(a) ? e(a, d) : Ga(a + "[" + ("object" == typeof d ? b : "") + "]", d, c, e)
        }); else if (c || "object" !== d.type(b))e(a, b); else for (f in b)Ga(a + "[" + f + "]", b[f], c, e)
    }

    function jb(a) {
        return d.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }

    var V = [], M = V.slice, kb = V.concat, Ha = V.push, la = V.indexOf, ra = {},
        Rb = ra.toString, Ia = ra.hasOwnProperty, Sb = "".trim, x = {}, w = v.document, d = function (a, b) {
            return new d.fn.init(a, b)
        }, Tb = /^-ms-/, Ub = /-([\da-z])/gi, Vb = function (a, b) {
            return b.toUpperCase()
        };
    d.fn = d.prototype = {
        jquery: "2.1.0", constructor: d, selector: "", length: 0, toArray: function () {
            return M.call(this)
        }, get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : M.call(this)
        }, pushStack: function (a) {
            a = d.merge(this.constructor(), a);
            return a.prevObject = this, a.context = this.context, a
        }, each: function (a, b) {
            return d.each(this,
                a, b)
        }, map: function (a) {
            return this.pushStack(d.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, slice: function () {
            return this.pushStack(M.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (a) {
            var b = this.length;
            a = +a + (0 > a ? b : 0);
            return this.pushStack(0 <= a && b > a ? [this[a]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: Ha, sort: V.sort, splice: V.splice
    };
    d.extend = d.fn.extend = function () {
        var a, b, c, e, f, g, h = arguments[0] || {}, k = 1, l = arguments.length,
            n = !1;
        "boolean" == typeof h && (n = h, h = arguments[k] || {}, k++);
        "object" == typeof h || d.isFunction(h) || (h = {});
        for (k === l && (h = this, k--); l > k; k++)if (null != (a = arguments[k]))for (b in a)c = h[b], e = a[b], h !== e && (n && e && (d.isPlainObject(e) || (f = d.isArray(e))) ? (f ? (f = !1, g = c && d.isArray(c) ? c : []) : g = c && d.isPlainObject(c) ? c : {}, h[b] = d.extend(n, g, e)) : void 0 !== e && (h[b] = e));
        return h
    };
    d.extend({
        expando: "jQuery" + ("2.1.0" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
            throw Error(a);
        }, noop: function () {
        }, isFunction: function (a) {
            return "function" ===
                d.type(a)
        }, isArray: Array.isArray, isWindow: function (a) {
            return null != a && a === a.window
        }, isNumeric: function (a) {
            return 0 <= a - parseFloat(a)
        }, isPlainObject: function (a) {
            if ("object" !== d.type(a) || a.nodeType || d.isWindow(a))return !1;
            try {
                if (a.constructor && !Ia.call(a.constructor.prototype, "isPrototypeOf"))return !1
            } catch (b) {
                return !1
            }
            return !0
        }, isEmptyObject: function (a) {
            for (var b in a)return !1;
            return !0
        }, type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ra[Rb.call(a)] || "object" : typeof a
        },
        globalEval: function (a) {
            var b, c = eval;
            (a = d.trim(a)) && (1 === a.indexOf("use strict") ? (b = w.createElement("script"), b.text = a, w.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        }, camelCase: function (a) {
            return a.replace(Tb, "ms-").replace(Ub, Vb)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }, each: function (a, b, c) {
            var d, f = 0, g = a.length, h = Aa(a);
            if (c)if (h)for (; g > f && (d = b.apply(a[f], c), !1 !== d); f++); else for (f in a) {
                if (d = b.apply(a[f], c), !1 === d)break
            } else if (h)for (; g > f && (d =
                b.call(a[f], f, a[f]), !1 !== d); f++); else for (f in a)if (d = b.call(a[f], f, a[f]), !1 === d)break;
            return a
        }, trim: function (a) {
            return null == a ? "" : Sb.call(a)
        }, makeArray: function (a, b) {
            var c = b || [];
            return null != a && (Aa(Object(a)) ? d.merge(c, "string" == typeof a ? [a] : a) : Ha.call(c, a)), c
        }, inArray: function (a, b, c) {
            return null == b ? -1 : la.call(b, a, c)
        }, merge: function (a, b) {
            for (var c = +b.length, d = 0, f = a.length; c > d; d++)a[f++] = b[d];
            return a.length = f, a
        }, grep: function (a, b, c) {
            for (var d = [], f = 0, g = a.length, h = !c; g > f; f++)c = !b(a[f], f), c !== h && d.push(a[f]);
            return d
        }, map: function (a, b, c) {
            var d, f = 0, g = a.length, h = [];
            if (Aa(a))for (; g > f; f++)d = b(a[f], f, c), null != d && h.push(d); else for (f in a)d = b(a[f], f, c), null != d && h.push(d);
            return kb.apply([], h)
        }, guid: 1, proxy: function (a, b) {
            var c, e, f;
            return "string" == typeof b && (c = a[b], b = a, a = c), d.isFunction(a) ? (e = M.call(arguments, 2), f = function () {
                return a.apply(b || this, e.concat(M.call(arguments)))
            }, f.guid = a.guid = a.guid || d.guid++, f) : void 0
        }, now: Date.now, support: x
    });
    d.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
        function (a, b) {
            ra["[object " + b + "]"] = b.toLowerCase()
        });
    var X = function (a) {
        function b(a, b, c, d) {
            var e, f, g, h, k;
            if ((b ? b.ownerDocument || b : G) !== L && P(b), b = b || L, c = c || [], !a || "string" != typeof a)return c;
            if (1 !== (h = b.nodeType) && 9 !== h)return [];
            if (Q && !d) {
                if (e = oa.exec(a))if (g = e[1])if (9 === h) {
                    if (f = b.getElementById(g), !f || !f.parentNode)return c;
                    if (f.id === g)return c.push(f), c
                } else {
                    if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && F(b, f) && f.id === g)return c.push(f), c
                } else {
                    if (e[2])return aa.apply(c, b.getElementsByTagName(a)),
                        c;
                    if ((g = e[3]) && q.getElementsByClassName && b.getElementsByClassName)return aa.apply(c, b.getElementsByClassName(g)), c
                }
                if (q.qsa && (!C || !C.test(a))) {
                    if (f = e = E, g = b, k = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        h = s(a);
                        (e = b.getAttribute("id")) ? f = e.replace(pa, "\\$&") : b.setAttribute("id", f);
                        f = "[id='" + f + "'] ";
                        for (g = h.length; g--;)h[g] = f + r(h[g]);
                        g = $.test(a) && p(b.parentNode) || b;
                        k = h.join(",")
                    }
                    if (k)try {
                        return aa.apply(c, g.querySelectorAll(k)), c
                    } catch (l) {
                    } finally {
                        e || b.removeAttribute("id")
                    }
                }
            }
            var m;
            a:{
                a = a.replace(O,
                    "$1");
                var n, t;
                f = s(a);
                if (!d && 1 === f.length) {
                    if (m = f[0] = f[0].slice(0), 2 < m.length && "ID" === (n = m[0]).type && q.getById && 9 === b.nodeType && Q && u.relative[m[1].type]) {
                        if (b = (u.find.ID(n.matches[0].replace(ba, ca), b) || [])[0], !b) {
                            m = c;
                            break a
                        }
                        a = a.slice(m.shift().value.length)
                    }
                    for (h = S.needsContext.test(a) ? 0 : m.length; h-- && (n = m[h], !u.relative[e = n.type]);)if ((t = u.find[e]) && (d = t(n.matches[0].replace(ba, ca), $.test(m[0].type) && p(b.parentNode) || b))) {
                        if (m.splice(h, 1), a = d.length && r(m), !a) {
                            m = (aa.apply(c, d), c);
                            break a
                        }
                        break
                    }
                }
                m =
                    (Ja(a, f)(d, b, !Q, c, $.test(a) && p(b.parentNode) || b), c)
            }
            return m
        }

        function c() {
            function a(c, d) {
                return b.push(c + " ") > u.cacheLength && delete a[b.shift()], a[c + " "] = d
            }

            var b = [];
            return a
        }

        function d(a) {
            return a[E] = !0, a
        }

        function f(a) {
            var b = L.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b)
            }
        }

        function g(a, b) {
            for (var c = a.split("|"), d = a.length; d--;)u.attrHandle[c[d]] = b
        }

        function h(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || N) - (~a.sourceIndex ||
                N);
            if (d)return d;
            if (c)for (; c = c.nextSibling;)if (c === b)return -1;
            return a ? 1 : -1
        }

        function k(a) {
            return function (b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a
            }
        }

        function l(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function n(a) {
            return d(function (b) {
                return b = +b, d(function (c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;)c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function p(a) {
            return a && typeof a.getElementsByTagName !== B && a
        }

        function m() {
        }

        function s(a,
                   c) {
            var d, e, f, g, h, k, l;
            if (h = mb[a + " "])return c ? 0 : h.slice(0);
            h = a;
            k = [];
            for (l = u.preFilter; h;) {
                d && !(e = ea.exec(h)) || (e && (h = h.slice(e[0].length) || h), k.push(f = []));
                d = !1;
                (e = fa.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(O, " ")
                }), h = h.slice(d.length));
                for (g in u.filter)!(e = S[g].exec(h)) || l[g] && !(e = l[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d)break
            }
            return c ? h.length : h ? b.error(a) : mb(a, k).slice(0)
        }

        function r(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++)d += a[b].value;
            return d
        }

        function t(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = Wb++;
            return b.first ? function (b, c, f) {
                for (; b = b[d];)if (1 === b.nodeType || e)return a(b, c, f)
            } : function (b, c, g) {
                var h, k, l = [J, f];
                if (g)for (; b = b[d];) {
                    if ((1 === b.nodeType || e) && a(b, c, g))return !0
                } else for (; b = b[d];)if (1 === b.nodeType || e) {
                    if (k = b[E] || (b[E] = {}), (h = k[d]) && h[0] === J && h[1] === f)return l[2] = h[2];
                    if (k[d] = l, l[2] = a(b, c, g))return !0
                }
            }
        }

        function v(a) {
            return 1 < a.length ? function (b, c, d) {
                for (var e = a.length; e--;)if (!a[e](b, c, d))return !1;
                return !0
            } : a[0]
        }

        function w(a,
                   b, c, d, e) {
            for (var f, g = [], h = 0, k = a.length, l = null != b; k > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), l && b.push(h));
            return g
        }

        function x(a, c, f, g, h, k) {
            return g && !g[E] && (g = x(g)), h && !h[E] && (h = x(h, k)), d(function (d, e, k, l) {
                var m, n, p = [], s = [], lb = e.length, q;
                if (!(q = d)) {
                    q = c || "*";
                    for (var r = k.nodeType ? [k] : k, t = [], v = 0, u = r.length; u > v; v++)b(q, r[v], t);
                    q = t
                }
                q = !a || !d && c ? q : w(q, p, a, k, l);
                r = f ? h || (d ? a : lb || g) ? [] : e : q;
                if (f && f(q, r, k, l), g)for (m = w(r, s), g(m, [], k, l), k = m.length; k--;)(n = m[k]) && (r[s[k]] = !(q[s[k]] = n));
                if (d) {
                    if (h || a) {
                        if (h) {
                            m = [];
                            for (k = r.length; k--;)(n = r[k]) && m.push(q[k] = n);
                            h(null, r = [], m, l)
                        }
                        for (k = r.length; k--;)(n = r[k]) && -1 < (m = h ? ha.call(d, n) : p[k]) && (d[m] = !(e[m] = n))
                    }
                } else r = w(r === e ? r.splice(lb, r.length) : r), h ? h(null, e, r, l) : aa.apply(e, r)
            })
        }

        function y(a) {
            var b, c, d, e = a.length, f = u.relative[a[0].type];
            c = f || u.relative[" "];
            for (var g = f ? 1 : 0, h = t(function (a) {
                return a === b
            }, c, !0), k = t(function (a) {
                return -1 < ha.call(b, a)
            }, c, !0), l = [function (a, c, d) {
                return !f && (d || c !== ta) || ((b = c).nodeType ? h(a, c, d) : k(a, c, d))
            }]; e > g; g++)if (c = u.relative[a[g].type])l =
                [t(v(l), c)]; else {
                if (c = u.filter[a[g].type].apply(null, a[g].matches), c[E]) {
                    for (d = ++g; e > d && !u.relative[a[d].type]; d++);
                    return x(1 < g && v(l), 1 < g && r(a.slice(0, g - 1).concat({value: " " === a[g - 2].type ? "*" : ""})).replace(O, "$1"), c, d > g && y(a.slice(g, d)), e > d && y(a = a.slice(d)), e > d && r(a))
                }
                l.push(c)
            }
            return v(l)
        }

        function D(a, c) {
            var f = 0 < c.length, g = 0 < a.length, h = function (d, e, h, k, l) {
                var m, n, p, r = 0, s = "0", q = d && [], ga = [], t = ta, v = d || g && u.find.TAG("*", l), ia = J += null == t ? 1 : Math.random() || 0.1, P = v.length;
                for (l && (ta = e !== L && e); s !== P && null !=
                (m = v[s]); s++) {
                    if (g && m) {
                        for (n = 0; p = a[n++];)if (p(m, e, h)) {
                            k.push(m);
                            break
                        }
                        l && (J = ia)
                    }
                    f && ((m = !p && m) && r--, d && q.push(m))
                }
                if (r += s, f && s !== r) {
                    for (n = 0; p = c[n++];)p(q, ga, e, h);
                    if (d) {
                        if (0 < r)for (; s--;)q[s] || ga[s] || (ga[s] = Y.call(k));
                        ga = w(ga)
                    }
                    aa.apply(k, ga);
                    l && !d && 0 < ga.length && 1 < r + c.length && b.uniqueSort(k)
                }
                return l && (J = ia, ta = t), q
            };
            return f ? d(h) : h
        }

        var z, q, u, ia, nb, Ja, ta, A, qa, P, L, W, Q, C, K, ua, F, E = "sizzle" + -new Date, G = a.document, J = 0, Wb = 0, I = c(), mb = c(), M = c(), H = function (a, b) {
                return a === b && (qa = !0), 0
            }, B = "undefined", N = -2147483648,
            T = {}.hasOwnProperty, da = [], Y = da.pop, Z = da.push, aa = da.push, U = da.slice, ha = da.indexOf || function (a) {
                    for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
                    return -1
                }, V = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"), X = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + V + ")|)|)[\\x20\\t\\r\\n\\f]*\\]", R = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
                X.replace(3, 8) + ")*)|.*)\\)|)", O = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), ea = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, fa = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/, ja = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*?)[\\x20\\t\\r\\n\\f]*\\]", "g"), ka = new RegExp(R), la = new RegExp("^" + V + "$"), S = {
                ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                TAG: new RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
                ATTR: new RegExp("^" +
                    X),
                PSEUDO: new RegExp("^" + R),
                CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
                bool: RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"),
                needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
                    "i")
            }, ma = /^(?:input|select|textarea|button)$/i, na = /^h\d$/i, sa = /^[^{]+\{\s*\[native \w/, oa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, $ = /[+~]/, pa = /'|\\/g, ba = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"), ca = function (a, b, c) {
                a = "0x" + b - 65536;
                return a !== a || c ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, 1023 & a | 56320)
            };
        try {
            aa.apply(da = U.call(G.childNodes), G.childNodes), da[G.childNodes.length].nodeType
        } catch (ra) {
            aa = {
                apply: da.length ? function (a, b) {
                    Z.apply(a, U.call(b))
                } :
                    function (a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1
                    }
            }
        }
        q = b.support = {};
        nb = b.isXML = function (a) {
            return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
        };
        P = b.setDocument = function (a) {
            var b, c = a ? a.ownerDocument || a : G;
            a = c.defaultView;
            return c !== L && 9 === c.nodeType && c.documentElement ? (L = c, W = c.documentElement, Q = !nb(c), a && a !== a.top && (a.addEventListener ? a.addEventListener("unload", function () {
                P()
            }, !1) : a.attachEvent && a.attachEvent("onunload", function () {
                P()
            })), q.attributes = f(function (a) {
                return a.className =
                    "i", !a.getAttribute("className")
            }), q.getElementsByTagName = f(function (a) {
                return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
            }), q.getElementsByClassName = sa.test(c.getElementsByClassName) && f(function (a) {
                    return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                }), q.getById = f(function (a) {
                return W.appendChild(a).id = E, !c.getElementsByName || !c.getElementsByName(E).length
            }), q.getById ? (u.find.ID = function (a,
                                                   b) {
                if (typeof b.getElementById !== B && Q) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, u.filter.ID = function (a) {
                var b = a.replace(ba, ca);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete u.find.ID, u.filter.ID = function (a) {
                var b = a.replace(ba, ca);
                return function (a) {
                    return (a = typeof a.getAttributeNode !== B && a.getAttributeNode("id")) && a.value === b
                }
            }), u.find.TAG = q.getElementsByTagName ? function (a, b) {
                return typeof b.getElementsByTagName !== B ? b.getElementsByTagName(a) : void 0
            } : function (a, b) {
                var c,
                    d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];)1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, u.find.CLASS = q.getElementsByClassName && function (a, b) {
                    return typeof b.getElementsByClassName !== B && Q ? b.getElementsByClassName(a) : void 0
                }, K = [], C = [], (q.qsa = sa.test(c.querySelectorAll)) && (f(function (a) {
                a.innerHTML = "<select t=''><option selected=''></option></select>";
                a.querySelectorAll("[t^='']").length && C.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                a.querySelectorAll("[selected]").length || C.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                a.querySelectorAll(":checked").length || C.push(":checked")
            }), f(function (a) {
                var b = c.createElement("input");
                b.setAttribute("type", "hidden");
                a.appendChild(b).setAttribute("name", "D");
                a.querySelectorAll("[name=d]").length && C.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
                a.querySelectorAll(":enabled").length || C.push(":enabled", ":disabled");
                a.querySelectorAll("*,:x");
                C.push(",.*:")
            })), (q.matchesSelector = sa.test(ua = W.webkitMatchesSelector || W.mozMatchesSelector || W.oMatchesSelector || W.msMatchesSelector)) && f(function (a) {
                q.disconnectedMatch =
                    ua.call(a, "div");
                ua.call(a, "[s!='']:x");
                K.push("!=", R)
            }), C = C.length && new RegExp(C.join("|")), K = K.length && new RegExp(K.join("|")), b = sa.test(W.compareDocumentPosition), F = b || sa.test(W.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
                if (b)for (; b = b.parentNode;)if (b === a)return !0;
                return !1
            }, H = b ? function (a, b) {
                if (a === b)return qa = !0, 0;
                var d =
                    !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !q.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === G && F(G, a) ? -1 : b === c || b.ownerDocument === G && F(G, b) ? 1 : A ? ha.call(A, a) - ha.call(A, b) : 0 : 4 & d ? -1 : 1)
            } : function (a, b) {
                if (a === b)return qa = !0, 0;
                var d, e = 0;
                d = a.parentNode;
                var f = b.parentNode, g = [a], k = [b];
                if (!d || !f)return a === c ? -1 : b === c ? 1 : d ? -1 : f ? 1 : A ? ha.call(A, a) - ha.call(A, b) : 0;
                if (d === f)return h(a,
                    b);
                for (d = a; d = d.parentNode;)g.unshift(d);
                for (d = b; d = d.parentNode;)k.unshift(d);
                for (; g[e] === k[e];)e++;
                return e ? h(g[e], k[e]) : g[e] === G ? -1 : k[e] === G ? 1 : 0
            }, c) : L
        };
        b.matches = function (a, c) {
            return b(a, null, null, c)
        };
        b.matchesSelector = function (a, c) {
            if ((a.ownerDocument || a) !== L && P(a), c = c.replace(ja, "='$1']"), q.matchesSelector && Q && !(K && K.test(c) || C && C.test(c)))try {
                var d = ua.call(a, c);
                if (d || q.disconnectedMatch || a.document && 11 !== a.document.nodeType)return d
            } catch (e) {
            }
            return 0 < b(c, L, null, [a]).length
        };
        b.contains = function (a,
                               b) {
            return (a.ownerDocument || a) !== L && P(a), F(a, b)
        };
        b.attr = function (a, b) {
            (a.ownerDocument || a) !== L && P(a);
            var c = u.attrHandle[b.toLowerCase()], c = c && T.call(u.attrHandle, b.toLowerCase()) ? c(a, b, !Q) : void 0;
            return void 0 !== c ? c : q.attributes || !Q ? a.getAttribute(b) : (c = a.getAttributeNode(b)) && c.specified ? c.value : null
        };
        b.error = function (a) {
            throw Error("Syntax error, unrecognized expression: " + a);
        };
        b.uniqueSort = function (a) {
            var b, c = [], d = 0, e = 0;
            if (qa = !q.detectDuplicates, A = !q.sortStable && a.slice(0), a.sort(H), qa) {
                for (; b =
                           a[e++];)b === a[e] && (d = c.push(e));
                for (; d--;)a.splice(c[d], 1)
            }
            return A = null, a
        };
        ia = b.getText = function (a) {
            var b, c = "", d = 0;
            if (b = a.nodeType)if (1 === b || 9 === b || 11 === b) {
                if ("string" == typeof a.textContent)return a.textContent;
                for (a = a.firstChild; a; a = a.nextSibling)c += ia(a)
            } else {
                if (3 === b || 4 === b)return a.nodeValue
            } else for (; b = a[d++];)c += ia(b);
            return c
        };
        u = b.selectors = {
            cacheLength: 50, createPseudo: d, match: S, attrHandle: {}, find: {}, relative: {
                ">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {
                    dir: "previousSibling",
                    first: !0
                }, "~": {dir: "previousSibling"}
            }, preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(ba, ca), a[3] = (a[4] || a[5] || "").replace(ba, ca), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                }, CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                }, PSEUDO: function (a) {
                    var b, c = !a[5] && a[2];
                    return S.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && ka.test(c) &&
                    (b = s(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            }, filter: {
                TAG: function (a) {
                    var b = a.replace(ba, ca).toLowerCase();
                    return "*" === a ? function () {
                        return !0
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                }, CLASS: function (a) {
                    var b = I[a + " "];
                    return b || (b = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && I(a, function (a) {
                            return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== B && a.getAttribute("class") ||
                                "")
                        })
                }, ATTR: function (a, c, d) {
                    return function (e) {
                        e = b.attr(e, a);
                        return null == e ? "!=" === c : c ? (e += "", "=" === c ? e === d : "!=" === c ? e !== d : "^=" === c ? d && 0 === e.indexOf(d) : "*=" === c ? d && -1 < e.indexOf(d) : "$=" === c ? d && e.slice(-d.length) === d : "~=" === c ? -1 < (" " + e + " ").indexOf(d) : "|=" === c ? e === d || e.slice(0, d.length + 1) === d + "-" : !1) : !0
                    }
                }, CHILD: function (a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode
                    } : function (b, c, k) {
                        var l, m, n, p, s;
                        c = f !== g ? "nextSibling" :
                            "previousSibling";
                        var r = b.parentNode, q = h && b.nodeName.toLowerCase();
                        k = !k && !h;
                        if (r) {
                            if (f) {
                                for (; c;) {
                                    for (m = b; m = m[c];)if (h ? m.nodeName.toLowerCase() === q : 1 === m.nodeType)return !1;
                                    s = c = "only" === a && !s && "nextSibling"
                                }
                                return !0
                            }
                            if (s = [g ? r.firstChild : r.lastChild], g && k)for (k = r[E] || (r[E] = {}), l = k[a] || [], p = l[0] === J && l[1], n = l[0] === J && l[2], m = p && r.childNodes[p]; m = ++p && m && m[c] || (n = p = 0, s.pop());) {
                                if (1 === m.nodeType && ++n && m === b) {
                                    k[a] = [J, p, n];
                                    break
                                }
                            } else if (k && (l = (b[E] || (b[E] = {}))[a]) && l[0] === J)n = l[1]; else for (; (m = ++p && m && m[c] ||
                                (n = p = 0, s.pop())) && ((h ? m.nodeName.toLowerCase() !== q : 1 !== m.nodeType) || !++n || (k && ((m[E] || (m[E] = {}))[a] = [J, n]), m !== b)););
                            return n -= e, n === d || 0 === n % d && 0 <= n / d
                        }
                    }
                }, PSEUDO: function (a, c) {
                    var f, g = u.pseudos[a] || u.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return g[E] ? g(c) : 1 < g.length ? (f = [a, a, "", c], u.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
                        for (var d, e = g(a, c), f = e.length; f--;)d = ha.call(a, e[f]), a[d] = !(b[d] = e[f])
                    }) : function (a) {
                        return g(a, 0, f)
                    }) : g
                }
            }, pseudos: {
                not: d(function (a) {
                    var b =
                        [], c = [], f = Ja(a.replace(O, "$1"));
                    return f[E] ? d(function (a, b, c, d) {
                        var e;
                        c = f(a, null, d, []);
                        for (d = a.length; d--;)(e = c[d]) && (a[d] = !(b[d] = e))
                    }) : function (a, d, e) {
                        return b[0] = a, f(b, null, e, c), !c.pop()
                    }
                }), has: d(function (a) {
                    return function (c) {
                        return 0 < b(a, c).length
                    }
                }), contains: d(function (a) {
                    return function (b) {
                        return -1 < (b.textContent || b.innerText || ia(b)).indexOf(a)
                    }
                }), lang: d(function (a) {
                    return la.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(), function (b) {
                        var c;
                        do if (c = Q ? b.lang : b.getAttribute("xml:lang") ||
                            b.getAttribute("lang"))return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }), target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                }, root: function (a) {
                    return a === W
                }, focus: function (a) {
                    return a === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                }, enabled: function (a) {
                    return !1 === a.disabled
                }, disabled: function (a) {
                    return !0 === a.disabled
                }, checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" ===
                        b && !!a.checked || "option" === b && !!a.selected
                }, selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                }, empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling)if (6 > a.nodeType)return !1;
                    return !0
                }, parent: function (a) {
                    return !u.pseudos.empty(a)
                }, header: function (a) {
                    return na.test(a.nodeName)
                }, input: function (a) {
                    return ma.test(a.nodeName)
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                }, text: function (a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() &&
                        "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                }, first: n(function () {
                    return [0]
                }), last: n(function (a, b) {
                    return [b - 1]
                }), eq: n(function (a, b, c) {
                    return [0 > c ? c + b : c]
                }), even: n(function (a, b) {
                    for (var c = 0; b > c; c += 2)a.push(c);
                    return a
                }), odd: n(function (a, b) {
                    for (var c = 1; b > c; c += 2)a.push(c);
                    return a
                }), lt: n(function (a, b, c) {
                    for (b = 0 > c ? c + b : c; 0 <= --b;)a.push(b);
                    return a
                }), gt: n(function (a, b, c) {
                    for (c = 0 > c ? c + b : c; ++c < b;)a.push(c);
                    return a
                })
            }
        };
        u.pseudos.nth = u.pseudos.eq;
        for (z in{
            radio: !0, checkbox: !0,
            file: !0, password: !0, image: !0
        })u.pseudos[z] = k(z);
        for (z in{submit: !0, reset: !0})u.pseudos[z] = l(z);
        m.prototype = u.filters = u.pseudos;
        u.setFilters = new m;
        Ja = b.compile = function (a, b) {
            var c, d = [], e = [], f = M[a + " "];
            if (!f) {
                b || (b = s(a));
                for (c = b.length; c--;)f = y(b[c]), f[E] ? d.push(f) : e.push(f);
                f = M(a, D(e, d))
            }
            return f
        };
        return q.sortStable = E.split("").sort(H).join("") === E, q.detectDuplicates = !!qa, P(), q.sortDetached = f(function (a) {
            return 1 & a.compareDocumentPosition(L.createElement("div"))
        }), f(function (a) {
            return a.innerHTML =
                "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || g("type|href|height|width", function (a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), q.attributes && f(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || g("value", function (a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), f(function (a) {
            return null == a.getAttribute("disabled")
        }) || g("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            function (a, b, c) {
                var d;
                return c ? void 0 : !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), b
    }(v);
    d.find = X;
    d.expr = X.selectors;
    d.expr[":"] = d.expr.pseudos;
    d.unique = X.uniqueSort;
    d.text = X.getText;
    d.isXMLDoc = X.isXML;
    d.contains = X.contains;
    var ob = d.expr.match.needsContext, pb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Hb = /^.[^:#\[\.,]*$/;
    d.filter = function (a, b, c) {
        var e = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === e.nodeType ? d.find.matchesSelector(e, a) ? [e] : [] : d.find.matches(a, d.grep(b, function (a) {
            return 1 ===
                a.nodeType
        }))
    };
    d.fn.extend({
        find: function (a) {
            var b, c = this.length, e = [], f = this;
            if ("string" != typeof a)return this.pushStack(d(a).filter(function () {
                for (b = 0; c > b; b++)if (d.contains(f[b], this))return !0
            }));
            for (b = 0; c > b; b++)d.find(a, f[b], e);
            return e = this.pushStack(1 < c ? d.unique(e) : e), e.selector = this.selector ? this.selector + " " + a : a, e
        }, filter: function (a) {
            return this.pushStack(Ba(this, a || [], !1))
        }, not: function (a) {
            return this.pushStack(Ba(this, a || [], !0))
        }, is: function (a) {
            return !!Ba(this, "string" == typeof a && ob.test(a) ?
                d(a) : a || [], !1).length
        }
    });
    var va, Xb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (d.fn.init = function (a, b) {
        var c, e;
        if (!a)return this;
        if ("string" == typeof a) {
            if (c = "<" === a[0] && ">" === a[a.length - 1] && 3 <= a.length ? [null, a, null] : Xb.exec(a), !c || !c[1] && b)return !b || b.jquery ? (b || va).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof d ? b[0] : b, d.merge(this, d.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : w, !0)), pb.test(c[1]) && d.isPlainObject(b))for (c in b)d.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this
            }
            return e = w.getElementById(c[2]), e && e.parentNode && (this.length = 1, this[0] = e), this.context = w, this.selector = a, this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : d.isFunction(a) ? "undefined" != typeof va.ready ? va.ready(a) : a(d) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), d.makeArray(a, this))
    }).prototype = d.fn;
    va = d(w);
    var Yb = /^(?:parents|prev(?:Until|All))/, Zb = {children: !0, contents: !0, next: !0, prev: !0};
    d.extend({
        dir: function (a, b, c) {
            for (var e = [], f = void 0 !==
                c; (a = a[b]) && 9 !== a.nodeType;)if (1 === a.nodeType) {
                if (f && d(a).is(c))break;
                e.push(a)
            }
            return e
        }, sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    d.fn.extend({
        has: function (a) {
            var b = d(a, this), c = b.length;
            return this.filter(function () {
                for (var a = 0; c > a; a++)if (d.contains(this, b[a]))return !0
            })
        }, closest: function (a, b) {
            for (var c, e = 0, f = this.length, g = [], h = ob.test(a) || "string" != typeof a ? d(a, b || this.context) : 0; f > e; e++)for (c = this[e]; c && c !== b; c = c.parentNode)if (11 > c.nodeType &&
                (h ? -1 < h.index(c) : 1 === c.nodeType && d.find.matchesSelector(c, a))) {
                g.push(c);
                break
            }
            return this.pushStack(1 < g.length ? d.unique(g) : g)
        }, index: function (a) {
            return a ? "string" == typeof a ? la.call(d(a), this[0]) : la.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (a, b) {
            return this.pushStack(d.unique(d.merge(this.get(), d(a, b))))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    d.each({
        parent: function (a) {
            return (a = a.parentNode) &&
            11 !== a.nodeType ? a : null
        }, parents: function (a) {
            return d.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return d.dir(a, "parentNode", c)
        }, next: function (a) {
            return Oa(a, "nextSibling")
        }, prev: function (a) {
            return Oa(a, "previousSibling")
        }, nextAll: function (a) {
            return d.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return d.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return d.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return d.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return d.sibling((a.parentNode ||
            {}).firstChild, a)
        }, children: function (a) {
            return d.sibling(a.firstChild)
        }, contents: function (a) {
            return a.contentDocument || d.merge([], a.childNodes)
        }
    }, function (a, b) {
        d.fn[a] = function (c, e) {
            var f = d.map(this, b, c);
            return "Until" !== a.slice(-5) && (e = c), e && "string" == typeof e && (f = d.filter(e, f)), 1 < this.length && (Zb[a] || d.unique(f), Yb.test(a) && f.reverse()), this.pushStack(f)
        }
    });
    var I = /\S+/g, Pa = {};
    d.Callbacks = function (a) {
        a = "string" == typeof a ? Pa[a] || Ib(a) : d.extend({}, a);
        var b, c, e, f, g, h, k = [], l = !a.once && [], n = function (d) {
            b =
                a.memory && d;
            c = !0;
            h = f || 0;
            f = 0;
            g = k.length;
            for (e = !0; k && g > h; h++)if (!1 === k[h].apply(d[0], d[1]) && a.stopOnFalse) {
                b = !1;
                break
            }
            e = !1;
            k && (l ? l.length && n(l.shift()) : b ? k = [] : p.disable())
        }, p = {
            add: function () {
                if (k) {
                    var c = k.length;
                    !function r(b) {
                        d.each(b, function (b, c) {
                            var e = d.type(c);
                            "function" === e ? a.unique && p.has(c) || k.push(c) : c && c.length && "string" !== e && r(c)
                        })
                    }(arguments);
                    e ? g = k.length : b && (f = c, n(b))
                }
                return this
            }, remove: function () {
                return k && d.each(arguments, function (a, b) {
                    for (var c; -1 < (c = d.inArray(b, k, c));)k.splice(c, 1),
                    e && (g >= c && g--, h >= c && h--)
                }), this
            }, has: function (a) {
                return a ? -1 < d.inArray(a, k) : !(!k || !k.length)
            }, empty: function () {
                return k = [], g = 0, this
            }, disable: function () {
                return k = l = b = void 0, this
            }, disabled: function () {
                return !k
            }, lock: function () {
                return l = void 0, b || p.disable(), this
            }, locked: function () {
                return !l
            }, fireWith: function (a, b) {
                return !k || c && !l || (b = b || [], b = [a, b.slice ? b.slice() : b], e ? l.push(b) : n(b)), this
            }, fire: function () {
                return p.fireWith(this, arguments), this
            }, fired: function () {
                return !!c
            }
        };
        return p
    };
    d.extend({
        Deferred: function (a) {
            var b =
                [["resolve", "done", d.Callbacks("once memory"), "resolved"], ["reject", "fail", d.Callbacks("once memory"), "rejected"], ["notify", "progress", d.Callbacks("memory")]], c = "pending", e = {
                state: function () {
                    return c
                }, always: function () {
                    return f.done(arguments).fail(arguments), this
                }, then: function () {
                    var a = arguments;
                    return d.Deferred(function (c) {
                        d.each(b, function (b, l) {
                            var n = d.isFunction(a[b]) && a[b];
                            f[l[1]](function () {
                                var a = n && n.apply(this, arguments);
                                a && d.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) :
                                    c[l[0] + "With"](this === e ? c.promise() : this, n ? [a] : arguments)
                            })
                        });
                        a = null
                    }).promise()
                }, promise: function (a) {
                    return null != a ? d.extend(a, e) : e
                }
            }, f = {};
            return e.pipe = e.then, d.each(b, function (a, d) {
                var k = d[2], l = d[3];
                e[d[1]] = k.add;
                l && k.add(function () {
                    c = l
                }, b[1 ^ a][2].disable, b[2][2].lock);
                f[d[0]] = function () {
                    return f[d[0] + "With"](this === f ? e : this, arguments), this
                };
                f[d[0] + "With"] = k.fireWith
            }), e.promise(f), a && a.call(f, f), f
        }, when: function (a) {
            var b = 0, c = M.call(arguments), e = c.length, f = 1 !== e || a && d.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : d.Deferred(), h = function (a, b, c) {
                    return function (d) {
                        b[a] = this;
                        c[a] = 1 < arguments.length ? M.call(arguments) : d;
                        c === k ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                }, k, l, n;
            if (1 < e)for (k = Array(e), l = Array(e), n = Array(e); e > b; b++)c[b] && d.isFunction(c[b].promise) ? c[b].promise().done(h(b, n, c)).fail(g.reject).progress(h(b, l, k)) : --f;
            return f || g.resolveWith(n, c), g.promise()
        }
    });
    var wa;
    d.fn.ready = function (a) {
        return d.ready.promise().done(a), this
    };
    d.extend({
        isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? d.readyWait++ :
                d.ready(!0)
        }, ready: function (a) {
            (!0 === a ? --d.readyWait : d.isReady) || (d.isReady = !0, !0 !== a && 0 < --d.readyWait || (wa.resolveWith(w, [d]), d.fn.trigger && d(w).trigger("ready").off("ready")))
        }
    });
    d.ready.promise = function (a) {
        return wa || (wa = d.Deferred(), "complete" === w.readyState ? setTimeout(d.ready) : (w.addEventListener("DOMContentLoaded", S, !1), v.addEventListener("load", S, !1))), wa.promise(a)
    };
    d.ready.promise();
    var H = d.access = function (a, b, c, e, f, g, h) {
        var k = 0, l = a.length, n = null == c;
        if ("object" === d.type(c))for (k in f = !0,
            c)d.access(a, b, k, c[k], !0, g, h); else if (void 0 !== e && (f = !0, d.isFunction(e) || (h = !0), n && (h ? (b.call(a, e), b = null) : (n = b, b = function (a, b, c) {
                return n.call(d(a), c)
            })), b))for (; l > k; k++)b(a[k], c, h ? e : e.call(a[k], k, b(a[k], c)));
        return f ? a : n ? b.call(a) : l ? b(a[0], c) : g
    };
    d.acceptData = function (a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };
    N.uid = 1;
    N.accepts = d.acceptData;
    N.prototype = {
        key: function (a) {
            if (!N.accepts(a))return 0;
            var b = {}, c = a[this.expando];
            if (!c) {
                c = N.uid++;
                try {
                    b[this.expando] = {value: c}, Object.defineProperties(a,
                        b)
                } catch (e) {
                    b[this.expando] = c, d.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c
        }, set: function (a, b, c) {
            var e;
            a = this.key(a);
            var f = this.cache[a];
            if ("string" == typeof b)f[b] = c; else if (d.isEmptyObject(f))d.extend(this.cache[a], b); else for (e in b)f[e] = b[e];
            return f
        }, get: function (a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        }, access: function (a, b, c) {
            var e;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (e = this.get(a, b), void 0 !== e ? e : this.get(a, d.camelCase(b))) : (this.set(a, b, c), void 0 !==
            c ? c : b)
        }, remove: function (a, b) {
            var c, e, f = this.key(a), g = this.cache[f];
            if (void 0 === b)this.cache[f] = {}; else for (d.isArray(b) ? e = b.concat(b.map(d.camelCase)) : (c = d.camelCase(b), b in g ? e = [b, c] : (e = c, e = e in g ? [e] : e.match(I) || [])), c = e.length; c--;)delete g[e[c]]
        }, hasData: function (a) {
            return !d.isEmptyObject(this.cache[a[this.expando]] || {})
        }, discard: function (a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var t = new N, y = new N, Kb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Jb = /([A-Z])/g;
    d.extend({
        hasData: function (a) {
            return y.hasData(a) ||
                t.hasData(a)
        }, data: function (a, b, c) {
            return y.access(a, b, c)
        }, removeData: function (a, b) {
            y.remove(a, b)
        }, _data: function (a, b, c) {
            return t.access(a, b, c)
        }, _removeData: function (a, b) {
            t.remove(a, b)
        }
    });
    d.fn.extend({
        data: function (a, b) {
            var c, e, f, g = this[0], h = g && g.attributes;
            if (void 0 === a) {
                if (this.length && (f = y.get(g), 1 === g.nodeType && !t.get(g, "hasDataAttrs"))) {
                    for (c = h.length; c--;)e = h[c].name, 0 === e.indexOf("data-") && (e = d.camelCase(e.slice(5)), Qa(g, e, f[e]));
                    t.set(g, "hasDataAttrs", !0)
                }
                return f
            }
            return "object" == typeof a ?
                this.each(function () {
                    y.set(this, a)
                }) : H(this, function (b) {
                var c, e = d.camelCase(a);
                if (g && void 0 === b) {
                    if ((c = y.get(g, a), void 0 !== c) || (c = y.get(g, e), void 0 !== c) || (c = Qa(g, e, void 0), void 0 !== c))return c
                } else this.each(function () {
                    var c = y.get(this, e);
                    y.set(this, e, b);
                    -1 !== a.indexOf("-") && void 0 !== c && y.set(this, a, b)
                })
            }, null, b, 1 < arguments.length, null, !0)
        }, removeData: function (a) {
            return this.each(function () {
                y.remove(this, a)
            })
        }
    });
    d.extend({
        queue: function (a, b, c) {
            var e;
            return a ? (b = (b || "fx") + "queue", e = t.get(a, b), c && (!e ||
            d.isArray(c) ? e = t.access(a, b, d.makeArray(c)) : e.push(c)), e || []) : void 0
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = d.queue(a, b), e = c.length, f = c.shift(), g = d._queueHooks(a, b), h = function () {
                d.dequeue(a, b)
            };
            "inprogress" === f && (f = c.shift(), e--);
            f && ("fx" === b && c.unshift("inprogress"), delete g.stop, f.call(a, h, g));
            !e && g && g.empty.fire()
        }, _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return t.get(a, c) || t.access(a, c, {
                    empty: d.Callbacks("once memory").add(function () {
                        t.remove(a, [b + "queue", c])
                    })
                })
        }
    });
    d.fn.extend({
        queue: function (a,
                         b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? d.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = d.queue(this, a, b);
                d._queueHooks(this, a);
                "fx" === a && "inprogress" !== c[0] && d.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                d.dequeue(this, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, b) {
            var c, e = 1, f = d.Deferred(), g = this, h = this.length, k = function () {
                --e || f.resolveWith(g, [g])
            };
            "string" != typeof a && (b = a, a = void 0);
            for (a = a ||
                "fx"; h--;)(c = t.get(g[h], a + "queueHooks")) && c.empty && (e++, c.empty.add(k));
            return k(), f.promise(b)
        }
    });
    var xa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = ["Top", "Right", "Bottom", "Left"], ea = function (a, b) {
        return a = b || a, "none" === d.css(a, "display") || !d.contains(a.ownerDocument, a)
    }, qb = /^(?:checkbox|radio)$/i;
    !function () {
        var a = w.createDocumentFragment().appendChild(w.createElement("div"));
        a.innerHTML = "<input type='radio' checked='checked' name='t'/>";
        x.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked;
        a.innerHTML = "<textarea>x</textarea>";
        x.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue
    }();
    x.focusinBubbles = "onfocusin" in v;
    var $b = /^key/, ac = /^(?:mouse|contextmenu)|click/, rb = /^(?:focusinfocus|focusoutblur)$/, sb = /^([^.]*)(?:\.(.+)|)$/;
    d.event = {
        global: {},
        add: function (a, b, c, e, f) {
            var g, h, k, l, n, p, m, s, r, v;
            if (n = t.get(a))for (c.handler && (g = c, c = g.handler, f = g.selector), c.guid || (c.guid = d.guid++), (l = n.events) || (l = n.events = {}), (h = n.handle) || (h = n.handle = function (b) {
                return "undefined" !== typeof d && d.event.triggered !==
                b.type ? d.event.dispatch.apply(a, arguments) : void 0
            }), b = (b || "").match(I) || [""], n = b.length; n--;)k = sb.exec(b[n]) || [], r = v = k[1], k = (k[2] || "").split(".").sort(), r && (m = d.event.special[r] || {}, r = (f ? m.delegateType : m.bindType) || r, m = d.event.special[r] || {}, p = d.extend({
                type: r,
                origType: v,
                data: e,
                handler: c,
                guid: c.guid,
                selector: f,
                needsContext: f && d.expr.match.needsContext.test(f),
                namespace: k.join(".")
            }, g), (s = l[r]) || (s = l[r] = [], s.delegateCount = 0, m.setup && !1 !== m.setup.call(a, e, k, h) || a.addEventListener && a.addEventListener(r,
                h, !1)), m.add && (m.add.call(a, p), p.handler.guid || (p.handler.guid = c.guid)), f ? s.splice(s.delegateCount++, 0, p) : s.push(p), d.event.global[r] = !0)
        },
        remove: function (a, b, c, e, f) {
            var g, h, k, l, n, p, m, s, r, v, w, x = t.hasData(a) && t.get(a);
            if (x && (l = x.events)) {
                b = (b || "").match(I) || [""];
                for (n = b.length; n--;)if (k = sb.exec(b[n]) || [], r = w = k[1], v = (k[2] || "").split(".").sort(), r) {
                    m = d.event.special[r] || {};
                    r = (e ? m.delegateType : m.bindType) || r;
                    s = l[r] || [];
                    k = k[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    for (h = g = s.length; g--;)p =
                        s[g], !f && w !== p.origType || c && c.guid !== p.guid || k && !k.test(p.namespace) || e && e !== p.selector && ("**" !== e || !p.selector) || (s.splice(g, 1), p.selector && s.delegateCount--, m.remove && m.remove.call(a, p));
                    h && !s.length && (m.teardown && !1 !== m.teardown.call(a, v, x.handle) || d.removeEvent(a, r, x.handle), delete l[r])
                } else for (r in l)d.event.remove(a, r + b[n], c, e, !0);
                d.isEmptyObject(l) && (delete x.handle, t.remove(a, "events"))
            }
        },
        trigger: function (a, b, c, e) {
            var f, g, h, k, l, n, p, m = [c || w], s = Ia.call(a, "type") ? a.type : a;
            f = Ia.call(a, "namespace") ?
                a.namespace.split(".") : [];
            if (g = h = c = c || w, 3 !== c.nodeType && 8 !== c.nodeType && !rb.test(s + d.event.triggered) && (0 <= s.indexOf(".") && (f = s.split("."), s = f.shift(), f.sort()), l = 0 > s.indexOf(":") && "on" + s, a = a[d.expando] ? a : new d.Event(s, "object" == typeof a && a), a.isTrigger = e ? 2 : 3, a.namespace = f.join("."), a.namespace_re = a.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = void 0, a.target || (a.target = c), b = null == b ? [a] : d.makeArray(b, [a]), p = d.event.special[s] || {}, e || !p.trigger || !1 !== p.trigger.apply(c,
                    b))) {
                if (!e && !p.noBubble && !d.isWindow(c)) {
                    k = p.delegateType || s;
                    for (rb.test(k + s) || (g = g.parentNode); g; g = g.parentNode)m.push(g), h = g;
                    h === (c.ownerDocument || w) && m.push(h.defaultView || h.parentWindow || v)
                }
                for (f = 0; (g = m[f++]) && !a.isPropagationStopped();)a.type = 1 < f ? k : p.bindType || s, (n = (t.get(g, "events") || {})[a.type] && t.get(g, "handle")) && n.apply(g, b), (n = l && g[l]) && n.apply && d.acceptData(g) && (a.result = n.apply(g, b), !1 === a.result && a.preventDefault());
                return a.type = s, e || a.isDefaultPrevented() || p._default && !1 !== p._default.apply(m.pop(),
                    b) || !d.acceptData(c) || l && d.isFunction(c[s]) && !d.isWindow(c) && (h = c[l], h && (c[l] = null), d.event.triggered = s, c[s](), d.event.triggered = void 0, h && (c[l] = h)), a.result
            }
        },
        dispatch: function (a) {
            a = d.event.fix(a);
            var b, c, e, f, g, h = [], k = M.call(arguments);
            b = (t.get(this, "events") || {})[a.type] || [];
            var l = d.event.special[a.type] || {};
            if (k[0] = a, a.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, a)) {
                h = d.event.handlers.call(this, a, b);
                for (b = 0; (f = h[b++]) && !a.isPropagationStopped();)for (a.currentTarget = f.elem,
                                                                                c = 0; (g = f.handlers[c++]) && !a.isImmediatePropagationStopped();)a.namespace_re && !a.namespace_re.test(g.namespace) || (a.handleObj = g, a.data = g.data, e = ((d.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, k), void 0 === e || !1 !== (a.result = e) || (a.preventDefault(), a.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, a), a.result
            }
        },
        handlers: function (a, b) {
            var c, e, f, g, h = [], k = b.delegateCount, l = a.target;
            if (k && l.nodeType && (!a.button || "click" !== a.type))for (; l !== this; l = l.parentNode || this)if (!0 !==
                l.disabled || "click" !== a.type) {
                e = [];
                for (c = 0; k > c; c++)g = b[c], f = g.selector + " ", void 0 === e[f] && (e[f] = g.needsContext ? 0 <= d(f, this).index(l) : d.find(f, this, null, [l]).length), e[f] && e.push(g);
                e.length && h.push({elem: l, handlers: e})
            }
            return k < b.length && h.push({elem: this, handlers: b.slice(k)}), h
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"], filter: function (a, b) {
                return null ==
                a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, b) {
                var c, d, f, g = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || w, d = c.documentElement, f = c.body, a.pageX = b.clientX + (d && d.scrollLeft || f && f.scrollLeft || 0) - (d && d.clientLeft || f && f.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || f && f.scrollTop || 0) - (d && d.clientTop || f && f.clientTop || 0)),
                a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
            }
        },
        fix: function (a) {
            if (a[d.expando])return a;
            var b, c, e;
            b = a.type;
            var f = a, g = this.fixHooks[b];
            g || (this.fixHooks[b] = g = ac.test(b) ? this.mouseHooks : $b.test(b) ? this.keyHooks : {});
            e = g.props ? this.props.concat(g.props) : this.props;
            a = new d.Event(f);
            for (b = e.length; b--;)c = e[b], a[c] = f[c];
            return a.target || (a.target = w), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    return this !==
                    Ra() && this.focus ? (this.focus(), !1) : void 0
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === Ra() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && d.nodeName(this, "input") ? (this.click(), !1) : void 0
                }, _default: function (a) {
                    return d.nodeName(a.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function (a, b, c, e) {
            a = d.extend(new d.Event, c, {
                type: a,
                isSimulated: !0, originalEvent: {}
            });
            e ? d.event.trigger(a, null, b) : d.event.dispatch.call(b, a);
            a.isDefaultPrevented() && c.preventDefault()
        }
    };
    d.removeEvent = function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    };
    d.Event = function (a, b) {
        return this instanceof d.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.getPreventDefault && a.getPreventDefault() ? ma : Z) : this.type = a, b && d.extend(this, b), this.timeStamp = a && a.timeStamp ||
            d.now(), void(this[d.expando] = !0)) : new d.Event(a, b)
    };
    d.Event.prototype = {
        isDefaultPrevented: Z,
        isPropagationStopped: Z,
        isImmediatePropagationStopped: Z,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = ma;
            a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = ma;
            a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = ma;
            this.stopPropagation()
        }
    };
    d.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        d.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var e, f = a.relatedTarget, g = a.handleObj;
                return (!f || f !== this && !d.contains(this, f)) && (a.type = g.origType, e = g.handler.apply(this, arguments), a.type = b), e
            }
        }
    });
    x.focusinBubbles || d.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = function (a) {
            d.event.simulate(b, a.target, d.event.fix(a), !0)
        };
        d.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this, f = t.access(d, b);
                f || d.addEventListener(a, c,
                    !0);
                t.access(d, b, (f || 0) + 1)
            }, teardown: function () {
                var d = this.ownerDocument || this, f = t.access(d, b) - 1;
                f ? t.access(d, b, f) : (d.removeEventListener(a, c, !0), t.remove(d, b))
            }
        }
    });
    d.fn.extend({
        on: function (a, b, c, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (h in a)this.on(h, b, c, a[h], f);
                return this
            }
            if (null == c && null == e ? (e = b, c = b = void 0) : null == e && ("string" == typeof b ? (e = c, c = void 0) : (e = c, c = b, b = void 0)), !1 === e)e = Z; else if (!e)return this;
            return 1 === f && (g = e, e = function (a) {
                return d().off(a),
                    g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = d.guid++)), this.each(function () {
                d.event.add(this, a, e, c, b)
            })
        }, one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        }, off: function (a, b, c) {
            var e, f;
            if (a && a.preventDefault && a.handleObj)return e = a.handleObj, d(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof a) {
                for (f in a)this.off(f, b, a[f]);
                return this
            }
            return (!1 === b || "function" == typeof b) && (c = b, b = void 0), !1 === c && (c = Z), this.each(function () {
                d.event.remove(this,
                    a, c, b)
            })
        }, trigger: function (a, b) {
            return this.each(function () {
                d.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            var c = this[0];
            return c ? d.event.trigger(a, b, c, !0) : void 0
        }
    });
    var tb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ub = /<([\w:]+)/, bc = /<|&#?\w+;/, cc = /<(?:script|style|link)/i, dc = /checked\s*(?:[^=]|=\s*.checked.)/i, vb = /^$|\/(?:java|ecma)script/i, Nb = /^true\/(.*)/, ec = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, A = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    A.optgroup = A.option;
    A.tbody = A.tfoot = A.colgroup = A.caption = A.thead;
    A.th = A.td;
    d.extend({
        clone: function (a, b, c) {
            var e, f, g, h, k = a.cloneNode(!0), l = d.contains(a.ownerDocument, a);
            if (!(x.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || d.isXMLDoc(a)))for (h = D(k), g = D(a), e = 0, f = g.length; f > e; e++) {
                var n = g[e], p = h[e], m = p.nodeName.toLowerCase();
                "input" === m && qb.test(n.type) ? p.checked = n.checked : ("input" === m || "textarea" === m) && (p.defaultValue = n.defaultValue)
            }
            if (b)if (c)for (g = g || D(a), h = h || D(k), e = 0, f = g.length; f > e; e++)Ta(g[e], h[e]); else Ta(a, k);
            return h = D(k, "script"), 0 < h.length && Ca(h, !l && D(a, "script")), k
        }, buildFragment: function (a, b, c, e) {
            for (var f, g, h, k, l = b.createDocumentFragment(), n = [], p = 0, m = a.length; m > p; p++)if (f = a[p], f || 0 === f)if ("object" === d.type(f))d.merge(n, f.nodeType ? [f] : f); else if (bc.test(f)) {
                g = g || l.appendChild(b.createElement("div"));
                h = (ub.exec(f) ||
                ["", ""])[1].toLowerCase();
                h = A[h] || A._default;
                g.innerHTML = h[1] + f.replace(tb, "<$1></$2>") + h[2];
                for (h = h[0]; h--;)g = g.lastChild;
                d.merge(n, g.childNodes);
                g = l.firstChild;
                g.textContent = ""
            } else n.push(b.createTextNode(f));
            l.textContent = "";
            for (p = 0; f = n[p++];)if ((!e || -1 === d.inArray(f, e)) && (k = d.contains(f.ownerDocument, f), g = D(l.appendChild(f), "script"), k && Ca(g), c))for (h = 0; f = g[h++];)vb.test(f.type || "") && c.push(f);
            return l
        }, cleanData: function (a) {
            for (var b, c, e, f, g, h, k = d.event.special, l = 0; void 0 !== (c = a[l]); l++) {
                if (d.acceptData(c) &&
                    (g = c[t.expando], g && (b = t.cache[g]))) {
                    if (e = Object.keys(b.events || {}), e.length)for (h = 0; void 0 !== (f = e[h]); h++)k[f] ? d.event.remove(c, f) : d.removeEvent(c, f, b.handle);
                    t.cache[g] && delete t.cache[g]
                }
                delete y.cache[c[y.expando]]
            }
        }
    });
    d.fn.extend({
        text: function (a) {
            return H(this, function (a) {
                return void 0 === a ? d.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                })
            }, null, a, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (a) {
                1 !==
                this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Sa(this, a).appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Sa(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function (a, b) {
            for (var c, e = a ? d.filter(a, this) : this, f = 0; null != (c = e[f]); f++)b || 1 !== c.nodeType || d.cleanData(D(c)), c.parentNode && (b && d.contains(c.ownerDocument, c) && Ca(D(c, "script")), c.parentNode.removeChild(c));
            return this
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++)1 === a.nodeType && (d.cleanData(D(a, !1)), a.textContent = "");
            return this
        }, clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return d.clone(this, a, b)
            })
        }, html: function (a) {
            return H(this, function (a) {
                var c =
                    this[0] || {}, e = 0, f = this.length;
                if (void 0 === a && 1 === c.nodeType)return c.innerHTML;
                if ("string" == typeof a && !cc.test(a) && !A[(ub.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(tb, "<$1></$2>");
                    try {
                        for (; f > e; e++)c = this[e] || {}, 1 === c.nodeType && (d.cleanData(D(c, !1)), c.innerHTML = a);
                        c = 0
                    } catch (g) {
                    }
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function () {
            var a = arguments[0];
            return this.domManip(arguments, function (b) {
                a = this.parentNode;
                d.cleanData(D(this));
                a && a.replaceChild(b, this)
            }), a && (a.length ||
            a.nodeType) ? this : this.remove()
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, b) {
            a = kb.apply([], a);
            var c, e, f, g, h = 0, k = this.length, l = this, n = k - 1, p = a[0], m = d.isFunction(p);
            if (m || 1 < k && "string" == typeof p && !x.checkClone && dc.test(p))return this.each(function (c) {
                var d = l.eq(c);
                m && (a[0] = p.call(this, c, d.html()));
                d.domManip(a, b)
            });
            if (k && (c = d.buildFragment(a, this[0].ownerDocument, !1, this), e = c.firstChild, 1 === c.childNodes.length && (c = e), e)) {
                e = d.map(D(c, "script"), Lb);
                for (f = e.length; k > h; h++)g = c, h !==
                n && (g = d.clone(g, !0, !0), f && d.merge(e, D(g, "script"))), b.call(this[h], g, h);
                if (f)for (c = e[e.length - 1].ownerDocument, d.map(e, Mb), h = 0; f > h; h++)g = e[h], vb.test(g.type || "") && !t.access(g, "globalEval") && d.contains(c, g) && (g.src ? d._evalUrl && d._evalUrl(g.src) : d.globalEval(g.textContent.replace(ec, "")))
            }
            return this
        }
    });
    d.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        d.fn[a] = function (a) {
            for (var e = [], f = d(a), g = f.length - 1, h = 0; g >= h; h++)a = h ===
            g ? this : this.clone(!0), d(f[h])[b](a), Ha.apply(e, a.get());
            return this.pushStack(e)
        }
    });
    var na, Wa = {}, Xa = /^margin/, Da = new RegExp("^(" + xa + ")(?!px)[a-z%]+$", "i"), oa = function (a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null)
    };
    !function () {
        function a() {
            g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
            e.appendChild(f);
            var a = v.getComputedStyle(g, null);
            b = "1%" !== a.top;
            c = "4px" === a.width;
            e.removeChild(f)
        }

        var b, c, e = w.documentElement, f = w.createElement("div"), g = w.createElement("div");
        g.style.backgroundClip = "content-box";
        g.cloneNode(!0).style.backgroundClip = "";
        x.clearCloneStyle = "content-box" === g.style.backgroundClip;
        f.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
        f.appendChild(g);
        v.getComputedStyle && d.extend(x, {
            pixelPosition: function () {
                return a(), b
            }, boxSizingReliable: function () {
                return null == c && a(), c
            }, reliableMarginRight: function () {
                var a,
                    b = g.appendChild(w.createElement("div"));
                return b.style.cssText = g.style.cssText = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", b.style.marginRight = b.style.width = "0", g.style.width = "1px", e.appendChild(f), a = !parseFloat(v.getComputedStyle(b, null).marginRight), e.removeChild(f), g.innerHTML = "", a
            }
        })
    }();
    d.swap = function (a, b, c, d) {
        var f, g = {};
        for (f in b)g[f] = a.style[f], a.style[f] = b[f];
        c = c.apply(a, d || []);
        for (f in b)a.style[f] = g[f];
        return c
    };
    var fc = /^(none|table(?!-c[ea]).+)/, Ob = new RegExp("^(" + xa + ")(.*)$", "i"), gc = new RegExp("^([+-])=(" + xa + ")", "i"), hc = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, wb = {letterSpacing: 0, fontWeight: 400}, $a = ["Webkit", "O", "Moz", "ms"];
    d.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = O(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (a,
                         b, c, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h, k = d.camelCase(b), l = a.style;
                return b = d.cssProps[k] || (d.cssProps[k] = Za(l, k)), h = d.cssHooks[b] || d.cssHooks[k], void 0 === c ? h && "get" in h && void 0 !== (f = h.get(a, !1, e)) ? f : l[b] : (g = typeof c, "string" === g && (f = gc.exec(c)) && (c = (f[1] + 1) * f[2] + parseFloat(d.css(a, b)), g = "number"), null != c && c === c && ("number" !== g || d.cssNumber[k] || (c += "px"), x.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (l[b] = "inherit"), h && "set" in h && void 0 === (c = h.set(a, c, e)) || (l[b] = "",
                    l[b] = c)), void 0)
            }
        },
        css: function (a, b, c, e) {
            var f, g, h, k = d.camelCase(b);
            return b = d.cssProps[k] || (d.cssProps[k] = Za(a.style, k)), h = d.cssHooks[b] || d.cssHooks[k], h && "get" in h && (f = h.get(a, !0, c)), void 0 === f && (f = O(a, b, e)), "normal" === f && b in wb && (f = wb[b]), "" === c || c ? (g = parseFloat(f), !0 === c || d.isNumeric(g) ? g || 0 : f) : f
        }
    });
    d.each(["height", "width"], function (a, b) {
        d.cssHooks[b] = {
            get: function (a, e, f) {
                return e ? 0 === a.offsetWidth && fc.test(d.css(a, "display")) ? d.swap(a, hc, function () {
                    return cb(a, b, f)
                }) : cb(a, b, f) : void 0
            }, set: function (a,
                              e, f) {
                var g = f && oa(a);
                return ab(a, e, f ? bb(a, b, f, "border-box" === d.css(a, "boxSizing", !1, g), g) : 0)
            }
        }
    });
    d.cssHooks.marginRight = Ya(x.reliableMarginRight, function (a, b) {
        return b ? d.swap(a, {display: "inline-block"}, O, [a, "marginRight"]) : void 0
    });
    d.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        d.cssHooks[a + b] = {
            expand: function (c) {
                var d = 0, f = {};
                for (c = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)f[a + T[d] + b] = c[d] || c[d - 2] || c[0];
                return f
            }
        };
        Xa.test(a) || (d.cssHooks[a + b].set = ab)
    });
    d.fn.extend({
        css: function (a, b) {
            return H(this,
                function (a, b, f) {
                    var g, h = {}, k = 0;
                    if (d.isArray(b)) {
                        f = oa(a);
                        for (g = b.length; g > k; k++)h[b[k]] = d.css(a, b[k], !1, f);
                        return h
                    }
                    return void 0 !== f ? d.style(a, b, f) : d.css(a, b)
                }, a, b, 1 < arguments.length)
        }, show: function () {
            return db(this, !0)
        }, hide: function () {
            return db(this)
        }, toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                ea(this) ? d(this).show() : d(this).hide()
            })
        }
    });
    d.Tween = z;
    z.prototype = {
        constructor: z, init: function (a, b, c, e, f, g) {
            this.elem = a;
            this.prop = c;
            this.easing = f || "swing";
            this.options = b;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = g || (d.cssNumber[c] ? "" : "px")
        }, cur: function () {
            var a = z.propHooks[this.prop];
            return a && a.get ? a.get(this) : z.propHooks._default.get(this)
        }, run: function (a) {
            var b, c = z.propHooks[this.prop];
            return this.pos = b = this.options.duration ? d.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : z.propHooks._default.set(this),
                this
        }
    };
    z.prototype.init.prototype = z.prototype;
    z.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = d.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            }, set: function (a) {
                d.fx.step[a.prop] ? d.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[d.cssProps[a.prop]] || d.cssHooks[a.prop]) ? d.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    z.propHooks.scrollTop = z.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode &&
            (a.elem[a.prop] = a.now)
        }
    };
    d.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    };
    d.fx = z.prototype.init;
    d.fx.step = {};
    var U, ya, ic = /^(?:toggle|show|hide)$/, xb = new RegExp("^(?:([+-])=|)(" + xa + ")([a-z%]*)$", "i"), jc = /queueHooks$/, pa = [function (a, b, c) {
        var e, f, g, h, k, l, n = this, p = {}, m = a.style, s = a.nodeType && ea(a), r = t.get(a, "fxshow");
        c.queue || (h = d._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, k = h.empty.fire, h.empty.fire = function () {
            h.unqueued || k()
        }), h.unqueued++, n.always(function () {
            n.always(function () {
                h.unqueued--;
                d.queue(a, "fx").length || h.empty.fire()
            })
        }));
        1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], l = d.css(a, "display"), "none" === l && (l = Va(a.nodeName)), "inline" === l && "none" === d.css(a, "float") && (m.display = "inline-block"));
        c.overflow && (m.overflow = "hidden", n.always(function () {
            m.overflow = c.overflow[0];
            m.overflowX = c.overflow[1];
            m.overflowY = c.overflow[2]
        }));
        for (e in b)if (f = b[e], ic.exec(f)) {
            if (delete b[e], g = g || "toggle" === f, f === (s ? "hide" : "show")) {
                if ("show" !== f || !r || void 0 ===
                    r[e])continue;
                s = !0
            }
            p[e] = r && r[e] || d.style(a, e)
        }
        if (!d.isEmptyObject(p))for (e in r ? "hidden" in r && (s = r.hidden) : r = t.access(a, "fxshow", {}), g && (r.hidden = !s), s ? d(a).show() : n.done(function () {
            d(a).hide()
        }), n.done(function () {
            var b;
            t.remove(a, "fxshow");
            for (b in p)d.style(a, b, p[b])
        }), p)b = fb(s ? r[e] : 0, e, n), e in r || (r[e] = b.start, s && (b.end = b.start, b.start = "width" === e || "height" === e ? 1 : 0))
    }], fa = {
        "*": [function (a, b) {
            var c = this.createTween(a, b), e = c.cur(), f = xb.exec(b), g = f && f[3] || (d.cssNumber[a] ? "" : "px"), h = (d.cssNumber[a] ||
                "px" !== g && +e) && xb.exec(d.css(c.elem, a)), k = 1, l = 20;
            if (h && h[3] !== g) {
                g = g || h[3];
                f = f || [];
                h = +e || 1;
                do k = k || ".5", h /= k, d.style(c.elem, a, h + g); while (k !== (k = c.cur() / e) && 1 !== k && --l)
            }
            return f && (h = c.start = +h || +e || 0, c.unit = g, c.end = f[1] ? h + (f[1] + 1) * f[2] : +f[2]), c
        }]
    };
    d.Animation = d.extend(gb, {
        tweener: function (a, b) {
            d.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, e = 0, f = a.length; f > e; e++)c = a[e], fa[c] = fa[c] || [], fa[c].unshift(b)
        }, prefilter: function (a, b) {
            b ? pa.unshift(a) : pa.push(a)
        }
    });
    d.speed = function (a, b, c) {
        var e = a && "object" == typeof a ? d.extend({}, a) : {
            complete: c || !c && b || d.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !d.isFunction(b) && b
        };
        return e.duration = d.fx.off ? 0 : "number" == typeof e.duration ? e.duration : e.duration in d.fx.speeds ? d.fx.speeds[e.duration] : d.fx.speeds._default, (null == e.queue || !0 === e.queue) && (e.queue = "fx"), e.old = e.complete, e.complete = function () {
            d.isFunction(e.old) && e.old.call(this);
            e.queue && d.dequeue(this, e.queue)
        }, e
    };
    d.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(ea).css("opacity", 0).show().end().animate({opacity: b},
                a, c, d)
        }, animate: function (a, b, c, e) {
            var f = d.isEmptyObject(a), g = d.speed(b, c, e);
            b = function () {
                var b = gb(this, d.extend({}, a), g);
                (f || t.get(this, "finish")) && b.stop(!0)
            };
            return b.finish = b, f || !1 === g.queue ? this.each(b) : this.queue(g.queue, b)
        }, stop: function (a, b, c) {
            var e = function (a) {
                var b = a.stop;
                delete a.stop;
                b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && !1 !== a && this.queue(a || "fx", []), this.each(function () {
                var b = !0, g = null != a && a + "queueHooks", h = d.timers, k = t.get(this);
                if (g)k[g] && k[g].stop && e(k[g]); else for (g in k)k[g] &&
                k[g].stop && jc.test(g) && e(k[g]);
                for (g = h.length; g--;)h[g].elem !== this || null != a && h[g].queue !== a || (h[g].anim.stop(c), b = !1, h.splice(g, 1));
                !b && c || d.dequeue(this, a)
            })
        }, finish: function (a) {
            return !1 !== a && (a = a || "fx"), this.each(function () {
                var b, c = t.get(this), e = c[a + "queue"];
                b = c[a + "queueHooks"];
                var f = d.timers, g = e ? e.length : 0;
                c.finish = !0;
                d.queue(this, a, []);
                b && b.stop && b.stop.call(this, !0);
                for (b = f.length; b--;)f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++)e[b] && e[b].finish && e[b].finish.call(this);
                delete c.finish
            })
        }
    });
    d.each(["toggle", "show", "hide"], function (a, b) {
        var c = d.fn[b];
        d.fn[b] = function (a, d, g) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate($(b, !0), a, d, g)
        }
    });
    d.each({
        slideDown: $("show"),
        slideUp: $("hide"),
        slideToggle: $("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        d.fn[a] = function (a, d, f) {
            return this.animate(b, a, d, f)
        }
    });
    d.timers = [];
    d.fx.tick = function () {
        var a, b = 0, c = d.timers;
        for (U = d.now(); b < c.length; b++)a =
            c[b], a() || c[b] !== a || c.splice(b--, 1);
        c.length || d.fx.stop();
        U = void 0
    };
    d.fx.timer = function (a) {
        d.timers.push(a);
        a() ? d.fx.start() : d.timers.pop()
    };
    d.fx.interval = 13;
    d.fx.start = function () {
        ya || (ya = setInterval(d.fx.tick, d.fx.interval))
    };
    d.fx.stop = function () {
        clearInterval(ya);
        ya = null
    };
    d.fx.speeds = {slow: 600, fast: 200, _default: 400};
    d.fn.delay = function (a, b) {
        return a = d.fx ? d.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, d) {
            var f = setTimeout(b, a);
            d.stop = function () {
                clearTimeout(f)
            }
        })
    };
    (function () {
        var a = w.createElement("input"),
            b = w.createElement("select"), c = b.appendChild(w.createElement("option"));
        a.type = "checkbox";
        x.checkOn = "" !== a.value;
        x.optSelected = c.selected;
        b.disabled = !0;
        x.optDisabled = !c.disabled;
        a = w.createElement("input");
        a.value = "t";
        a.type = "radio";
        x.radioValue = "t" === a.value
    })();
    var yb, ja = d.expr.attrHandle;
    d.fn.extend({
        attr: function (a, b) {
            return H(this, d.attr, a, b, 1 < arguments.length)
        }, removeAttr: function (a) {
            return this.each(function () {
                d.removeAttr(this, a)
            })
        }
    });
    d.extend({
        attr: function (a, b, c) {
            var e, f, g = a.nodeType;
            if (a &&
                3 !== g && 8 !== g && 2 !== g)return "undefined" === typeof a.getAttribute ? d.prop(a, b, c) : (1 === g && d.isXMLDoc(a) || (b = b.toLowerCase(), e = d.attrHooks[b] || (d.expr.match.bool.test(b) ? yb : void 0)), void 0 === c ? e && "get" in e && null !== (f = e.get(a, b)) ? f : (f = d.find.attr(a, b), null == f ? void 0 : f) : null !== c ? e && "set" in e && void 0 !== (f = e.set(a, c, b)) ? f : (a.setAttribute(b, c + ""), c) : void d.removeAttr(a, b))
        }, removeAttr: function (a, b) {
            var c, e, f = 0, g = b && b.match(I);
            if (g && 1 === a.nodeType)for (; c = g[f++];)e = d.propFix[c] || c, d.expr.match.bool.test(c) && (a[e] = !1), a.removeAttribute(c)
        }, attrHooks: {
            type: {
                set: function (a, b) {
                    if (!x.radioValue && "radio" === b && d.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    });
    yb = {
        set: function (a, b, c) {
            return !1 === b ? d.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    };
    d.each(d.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = ja[b] || d.find.attr;
        ja[b] = function (a, b, d) {
            var h, k;
            return d || (k = ja[b], ja[b] = h, h = null != c(a, b, d) ? b.toLowerCase() : null, ja[b] = k), h
        }
    });
    var kc = /^(?:input|select|textarea|button)$/i;
    d.fn.extend({
        prop: function (a, b) {
            return H(this, d.prop, a, b, 1 < arguments.length)
        }, removeProp: function (a) {
            return this.each(function () {
                delete this[d.propFix[a] || a]
            })
        }
    });
    d.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (a, b, c) {
            var e, f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h)return g = 1 !== h || !d.isXMLDoc(a), g && (b = d.propFix[b] || b, f = d.propHooks[b]), void 0 !== c ? f && "set" in f && void 0 !== (e = f.set(a, c, b)) ? e : a[b] = c : f && "get" in f && null !== (e = f.get(a, b)) ? e : a[b]
        }, propHooks: {
            tabIndex: {
                get: function (a) {
                    return a.hasAttribute("tabindex") ||
                    kc.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    });
    x.optSelected || (d.propHooks.selected = {
        get: function (a) {
            a = a.parentNode;
            return a && (a.parentNode && a.parentNode.selectedIndex), null
        }
    });
    d.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function () {
        d.propFix[this.toLowerCase()] = this
    });
    var Ka = /[\t\r\n\f]/g;
    d.fn.extend({
        addClass: function (a) {
            var b, c, e, f, g;
            b = "string" == typeof a && a;
            var h = 0, k = this.length;
            if (d.isFunction(a))return this.each(function (b) {
                d(this).addClass(a.call(this,
                    b, this.className))
            });
            if (b)for (b = (a || "").match(I) || []; k > h; h++)if (c = this[h], e = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ka, " ") : " ")) {
                for (g = 0; f = b[g++];)0 > e.indexOf(" " + f + " ") && (e += f + " ");
                e = d.trim(e);
                c.className !== e && (c.className = e)
            }
            return this
        }, removeClass: function (a) {
            var b, c, e, f, g;
            b = 0 === arguments.length || "string" == typeof a && a;
            var h = 0, k = this.length;
            if (d.isFunction(a))return this.each(function (b) {
                d(this).removeClass(a.call(this, b, this.className))
            });
            if (b)for (b = (a || "").match(I) || []; k >
            h; h++)if (c = this[h], e = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ka, " ") : "")) {
                for (g = 0; f = b[g++];)for (; 0 <= e.indexOf(" " + f + " ");)e = e.replace(" " + f + " ", " ");
                e = a ? d.trim(e) : "";
                c.className !== e && (c.className = e)
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(d.isFunction(a) ? function (c) {
                d(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function () {
                if ("string" === c)for (var b, f = 0, g = d(this), h = a.match(I) ||
                    []; b = h[f++];)g.hasClass(b) ? g.removeClass(b) : g.addClass(b); else("undefined" === c || "boolean" === c) && (this.className && t.set(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : t.get(this, "__className__") || "")
            })
        }, hasClass: function (a) {
            a = " " + a + " ";
            for (var b = 0, c = this.length; c > b; b++)if (1 === this[b].nodeType && 0 <= (" " + this[b].className + " ").replace(Ka, " ").indexOf(a))return !0;
            return !1
        }
    });
    var lc = /\r/g;
    d.fn.extend({
        val: function (a) {
            var b, c, e, f = this[0];
            if (arguments.length)return e = d.isFunction(a),
                this.each(function (c) {
                    var f;
                    1 === this.nodeType && (f = e ? a.call(this, c, d(this).val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : d.isArray(f) && (f = d.map(f, function (a) {
                        return null == a ? "" : a + ""
                    })), b = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, f, "value") || (this.value = f))
                });
            if (f)return b = d.valHooks[f.type] || d.valHooks[f.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(f, "value")) ? c : (c = f.value, "string" == typeof c ? c.replace(lc, "") : null == c ? "" : c)
        }
    });
    d.extend({
        valHooks: {
            select: {
                get: function (a) {
                    for (var b,
                             c = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : c.length, k = 0 > e ? h : f ? e : 0; h > k; k++)if (b = c[k], !(!b.selected && k !== e || (x.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && d.nodeName(b.parentNode, "optgroup"))) {
                        if (a = d(b).val(), f)return a;
                        g.push(a)
                    }
                    return g
                }, set: function (a, b) {
                    for (var c, e, f = a.options, g = d.makeArray(b), h = f.length; h--;)e = f[h], (e.selected = 0 <= d.inArray(d(e).val(), g)) && (c = !0);
                    return c || (a.selectedIndex = -1), g
                }
            }
        }
    });
    d.each(["radio", "checkbox"],
        function () {
            d.valHooks[this] = {
                set: function (a, b) {
                    return d.isArray(b) ? a.checked = 0 <= d.inArray(d(a).val(), b) : void 0
                }
            };
            x.checkOn || (d.valHooks[this].get = function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
    d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        d.fn[b] = function (a, d) {
            return 0 < arguments.length ? this.on(b,
                null, a, d) : this.trigger(b)
        }
    });
    d.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var La = d.now(), Ma = /\?/;
    d.parseJSON = function (a) {
        return JSON.parse(a + "")
    };
    d.parseXML = function (a) {
        var b, c;
        if (!a || "string" != typeof a)return null;
        try {
            c = new DOMParser,
                b = c.parseFromString(a, "text/xml")
        } catch (e) {
            b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && d.error("Invalid XML: " + a), b
    };
    var Y, B, mc = /#.*$/, zb = /([?&])_=[^&]*/, nc = /^(.*?):[ \t]*([^\r\n]*)$/gm, oc = /^(?:GET|HEAD)$/, pc = /^\/\//, Ab = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Bb = {}, Ea = {}, Cb = "*/".concat("*");
    try {
        B = location.href
    } catch (xc) {
        B = w.createElement("a"), B.href = "", B = B.href
    }
    Y = Ab.exec(B.toLowerCase()) || [];
    d.extend({
        active: 0, lastModified: {}, etag: {}, ajaxSettings: {
            url: B,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Y[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Cb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": d.parseJSON, "text xml": d.parseXML},
            flatOptions: {url: !0, context: !0}
        }, ajaxSetup: function (a, b) {
            return b ? Fa(Fa(a, d.ajaxSettings), b) : Fa(d.ajaxSettings, a)
        }, ajaxPrefilter: hb(Bb), ajaxTransport: hb(Ea), ajax: function (a, b) {
            function c(a, b, c, h) {
                var l, p, u, x, y = b;
                if (2 !== z) {
                    z = 2;
                    k && clearTimeout(k);
                    e = void 0;
                    g = h || "";
                    q.readyState = 0 < a ? 4 : 0;
                    h = 200 <= a && 300 > a || 304 === a;
                    if (c) {
                        u = m;
                        for (var A = q, C, K, D, F, E = u.contents, G = u.dataTypes; "*" === G[0];)G.shift(), void 0 === C && (C = u.mimeType || A.getResponseHeader("Content-Type"));
                        if (C)for (K in E)if (E[K] && E[K].test(C)) {
                            G.unshift(K);
                            break
                        }
                        if (G[0] in c)D = G[0]; else {
                            for (K in c) {
                                if (!G[0] || u.converters[K + " " + G[0]]) {
                                    D = K;
                                    break
                                }
                                F || (F = K)
                            }
                            D = D || F
                        }
                        u = D ? (D !== G[0] && G.unshift(D), c[D]) : void 0
                    }
                    var J;
                    a:{
                        c = m;
                        C = u;
                        K = q;
                        D = h;
                        var B, I, H;
                        u = {};
                        A = c.dataTypes.slice();
                        if (A[1])for (B in c.converters)u[B.toLowerCase()] = c.converters[B];
                        for (F = A.shift(); F;)if (c.responseFields[F] && (K[c.responseFields[F]] = C), !H && D && c.dataFilter && (C = c.dataFilter(C, c.dataType)), H = F, F = A.shift())if ("*" === F)F = H; else if ("*" !== H && H !== F) {
                            if (B = u[H + " " + F] || u["* " + F], !B)for (J in u)if (I = J.split(" "),
                                I[1] === F && (B = u[H + " " + I[0]] || u["* " + I[0]])) {
                                !0 === B ? B = u[J] : !0 !== u[J] && (F = I[0], A.unshift(I[1]));
                                break
                            }
                            if (!0 !== B)if (B && c["throws"])C = B(C); else try {
                                C = B(C)
                            } catch (M) {
                                J = {state: "parsererror", error: B ? M : "No conversion from " + H + " to " + F};
                                break a
                            }
                        }
                        J = {state: "success", data: C}
                    }
                    u = J;
                    h ? (m.ifModified && (x = q.getResponseHeader("Last-Modified"), x && (d.lastModified[f] = x), x = q.getResponseHeader("etag"), x && (d.etag[f] = x)), 204 === a || "HEAD" === m.type ? y = "nocontent" : 304 === a ? y = "notmodified" : (y = u.state, l = u.data, p = u.error, h = !p)) : (p = y,
                    (a || !y) && (y = "error", 0 > a && (a = 0)));
                    q.status = a;
                    q.statusText = (b || y) + "";
                    h ? t.resolveWith(s, [l, y, q]) : t.rejectWith(s, [q, y, p]);
                    q.statusCode(w);
                    w = void 0;
                    n && r.trigger(h ? "ajaxSuccess" : "ajaxError", [q, m, h ? l : p]);
                    v.fireWith(s, [q, y]);
                    n && (r.trigger("ajaxComplete", [q, m]), --d.active || d.event.trigger("ajaxStop"))
                }
            }

            "object" == typeof a && (b = a, a = void 0);
            b = b || {};
            var e, f, g, h, k, l, n, p, m = d.ajaxSetup({}, b), s = m.context || m, r = m.context && (s.nodeType || s.jquery) ? d(s) : d.event, t = d.Deferred(), v = d.Callbacks("once memory"), w = m.statusCode ||
                {}, x = {}, y = {}, z = 0, A = "canceled", q = {
                readyState: 0, getResponseHeader: function (a) {
                    var b;
                    if (2 === z) {
                        if (!h)for (h = {}; b = nc.exec(g);)h[b[1].toLowerCase()] = b[2];
                        b = h[a.toLowerCase()]
                    }
                    return null == b ? null : b
                }, getAllResponseHeaders: function () {
                    return 2 === z ? g : null
                }, setRequestHeader: function (a, b) {
                    var c = a.toLowerCase();
                    return z || (a = y[c] = y[c] || a, x[a] = b), this
                }, overrideMimeType: function (a) {
                    return z || (m.mimeType = a), this
                }, statusCode: function (a) {
                    var b;
                    if (a)if (2 > z)for (b in a)w[b] = [w[b], a[b]]; else q.always(a[q.status]);
                    return this
                },
                abort: function (a) {
                    a = a || A;
                    return e && e.abort(a), c(0, a), this
                }
            };
            if (t.promise(q).complete = v.add, q.success = q.done, q.error = q.fail, m.url = ((a || m.url || B) + "").replace(mc, "").replace(pc, Y[1] + "//"), m.type = b.method || b.type || m.method || m.type, m.dataTypes = d.trim(m.dataType || "*").toLowerCase().match(I) || [""], null == m.crossDomain && (l = Ab.exec(m.url.toLowerCase()), m.crossDomain = !(!l || l[1] === Y[1] && l[2] === Y[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (Y[3] || ("http:" === Y[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data &&
                (m.data = d.param(m.data, m.traditional)), ib(Bb, m, b, q), 2 === z)return q;
            (n = m.global) && 0 === d.active++ && d.event.trigger("ajaxStart");
            m.type = m.type.toUpperCase();
            m.hasContent = !oc.test(m.type);
            f = m.url;
            m.hasContent || (m.data && (f = m.url += (Ma.test(f) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (m.url = zb.test(f) ? f.replace(zb, "$1_=" + La++) : f + (Ma.test(f) ? "&" : "?") + "_=" + La++));
            m.ifModified && (d.lastModified[f] && q.setRequestHeader("If-Modified-Since", d.lastModified[f]), d.etag[f] && q.setRequestHeader("If-None-Match", d.etag[f]));
            (m.data && m.hasContent && !1 !== m.contentType || b.contentType) && q.setRequestHeader("Content-Type", m.contentType);
            q.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Cb + "; q=0.01" : "") : m.accepts["*"]);
            for (p in m.headers)q.setRequestHeader(p, m.headers[p]);
            if (m.beforeSend && (!1 === m.beforeSend.call(s, q, m) || 2 === z))return q.abort();
            A = "abort";
            for (p in{success: 1, error: 1, complete: 1})q[p](m[p]);
            if (e = ib(Ea, m, b, q)) {
                q.readyState = 1;
                n && r.trigger("ajaxSend",
                    [q, m]);
                m.async && 0 < m.timeout && (k = setTimeout(function () {
                    q.abort("timeout")
                }, m.timeout));
                try {
                    z = 1, e.send(x, c)
                } catch (u) {
                    if (!(2 > z))throw u;
                    c(-1, u)
                }
            } else c(-1, "No Transport");
            return q
        }, getJSON: function (a, b, c) {
            return d.get(a, b, c, "json")
        }, getScript: function (a, b) {
            return d.get(a, void 0, b, "script")
        }
    });
    d.each(["get", "post"], function (a, b) {
        d[b] = function (a, e, f, g) {
            return d.isFunction(e) && (g = g || f, f = e, e = void 0), d.ajax({
                url: a,
                type: b,
                dataType: g,
                data: e,
                success: f
            })
        }
    });
    d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
        function (a, b) {
            d.fn[b] = function (a) {
                return this.on(b, a)
            }
        });
    d._evalUrl = function (a) {
        return d.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    };
    d.fn.extend({
        wrapAll: function (a) {
            var b;
            return d.isFunction(a) ? this.each(function (b) {
                d(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = d(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                for (var a = this; a.firstElementChild;)a = a.firstElementChild;
                return a
            }).append(this)), this)
        }, wrapInner: function (a) {
            return this.each(d.isFunction(a) ?
                function (b) {
                    d(this).wrapInner(a.call(this, b))
                } : function () {
                var b = d(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = d.isFunction(a);
            return this.each(function (c) {
                d(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                d.nodeName(this, "body") || d(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    d.expr.filters.hidden = function (a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight
    };
    d.expr.filters.visible = function (a) {
        return !d.expr.filters.hidden(a)
    };
    var qc = /%20/g, Qb = /\[\]$/, Db = /\r?\n/g, rc = /^(?:submit|button|image|reset|file)$/i, sc = /^(?:input|select|textarea|keygen)/i;
    d.param = function (a, b) {
        var c, e = [], f = function (a, b) {
            b = d.isFunction(b) ? b() : null == b ? "" : b;
            e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = d.ajaxSettings && d.ajaxSettings.traditional), d.isArray(a) || a.jquery && !d.isPlainObject(a))d.each(a, function () {
            f(this.name, this.value)
        }); else for (c in a)Ga(c, a[c], b, f);
        return e.join("&").replace(qc, "+")
    };
    d.fn.extend({
        serialize: function () {
            return d.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var a = d.prop(this, "elements");
                return a ? d.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !d(this).is(":disabled") && sc.test(this.nodeName) && !rc.test(a) && (this.checked || !qb.test(a))
            }).map(function (a, b) {
                var c = d(this).val();
                return null == c ? null : d.isArray(c) ? d.map(c, function (a) {
                    return {name: b.name, value: a.replace(Db, "\r\n")}
                }) : {name: b.name, value: c.replace(Db, "\r\n")}
            }).get()
        }
    });
    d.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (a) {
        }
    };
    var tc = 0, za = {}, uc = {0: 200, 1223: 204}, ka = d.ajaxSettings.xhr();
    v.ActiveXObject && d(v).on("unload", function () {
        for (var a in za)za[a]()
    });
    x.cors = !!ka && "withCredentials" in ka;
    x.ajax = ka = !!ka;
    d.ajaxTransport(function (a) {
        var b;
        return x.cors || ka && !a.crossDomain ? {
            send: function (c, d) {
                var f, g = a.xhr(), h = ++tc;
                if (g.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)for (f in a.xhrFields)g[f] = a.xhrFields[f];
                a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType);
                a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] =
                    "XMLHttpRequest");
                for (f in c)g.setRequestHeader(f, c[f]);
                b = function (a) {
                    return function () {
                        b && (delete za[h], b = g.onload = g.onerror = null, "abort" === a ? g.abort() : "error" === a ? d(g.status, g.statusText) : d(uc[g.status] || g.status, g.statusText, "string" == typeof g.responseText ? {text: g.responseText} : void 0, g.getAllResponseHeaders()))
                    }
                };
                g.onload = b();
                g.onerror = b("error");
                b = za[h] = b("abort");
                g.send(a.hasContent && a.data || null)
            }, abort: function () {
                b && b()
            }
        } : void 0
    });
    d.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/}, converters: {
            "text script": function (a) {
                return d.globalEval(a), a
            }
        }
    });
    d.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1);
        a.crossDomain && (a.type = "GET")
    });
    d.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function (e, f) {
                    b = d("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function (a) {
                        b.remove();
                        c = null;
                        a && f("error" === a.type ? 404 : 200, a.type)
                    });
                    w.head.appendChild(b[0])
                }, abort: function () {
                    c && c()
                }
            }
        }
    });
    var Eb = [], Na = /(=)\?(?=&|$)|\?\?/;
    d.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = Eb.pop() || d.expando + "_" + La++;
            return this[a] = !0, a
        }
    });
    d.ajaxPrefilter("json jsonp", function (a, b, c) {
        var e, f, g, h = !1 !== a.jsonp && (Na.test(a.url) ? "url" : "string" == typeof a.data && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && Na.test(a.data) && "data");
        return h || "jsonp" === a.dataTypes[0] ? (e = a.jsonpCallback = d.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h ? a[h] = a[h].replace(Na, "$1" +
            e) : !1 !== a.jsonp && (a.url += (Ma.test(a.url) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] = function () {
            return g || d.error(e + " was not called"), g[0]
        }, a.dataTypes[0] = "json", f = v[e], v[e] = function () {
            g = arguments
        }, c.always(function () {
            v[e] = f;
            a[e] && (a.jsonpCallback = b.jsonpCallback, Eb.push(e));
            g && d.isFunction(f) && f(g[0]);
            g = f = void 0
        }), "script") : void 0
    });
    d.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a)return null;
        "boolean" == typeof b && (c = b, b = !1);
        b = b || w;
        var e = pb.exec(a);
        c = !c && [];
        return e ? [b.createElement(e[1])] :
            (e = d.buildFragment([a], b, c), c && c.length && d(c).remove(), d.merge([], e.childNodes))
    };
    var Fb = d.fn.load;
    d.fn.load = function (a, b, c) {
        if ("string" != typeof a && Fb)return Fb.apply(this, arguments);
        var e, f, g, h = this, k = a.indexOf(" ");
        return 0 <= k && (e = a.slice(k), a = a.slice(0, k)), d.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), 0 < h.length && d.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function (a) {
            g = arguments;
            h.html(e ? d("<div>").append(d.parseHTML(a)).find(e) : a)
        }).complete(c && function (a, b) {
                h.each(c,
                    g || [a.responseText, b, a])
            }), this
    };
    d.expr.filters.animated = function (a) {
        return d.grep(d.timers, function (b) {
            return a === b.elem
        }).length
    };
    var Gb = v.document.documentElement;
    d.offset = {
        setOffset: function (a, b, c) {
            var e, f, g, h, k, l, n = d.css(a, "position"), p = d(a), m = {};
            "static" === n && (a.style.position = "relative");
            k = p.offset();
            g = d.css(a, "top");
            l = d.css(a, "left");
            ("absolute" === n || "fixed" === n) && -1 < (g + l).indexOf("auto") ? (e = p.position(), h = e.top, f = e.left) : (h = parseFloat(g) || 0, f = parseFloat(l) || 0);
            d.isFunction(b) && (b = b.call(a,
                c, k));
            null != b.top && (m.top = b.top - k.top + h);
            null != b.left && (m.left = b.left - k.left + f);
            "using" in b ? b.using.call(a, m) : p.css(m)
        }
    };
    d.fn.extend({
        offset: function (a) {
            if (arguments.length)return void 0 === a ? this : this.each(function (b) {
                d.offset.setOffset(this, a, b)
            });
            var b, c, e = this[0], f = {top: 0, left: 0}, g = e && e.ownerDocument;
            if (g)return b = g.documentElement, d.contains(b, e) ? ("undefined" !== typeof e.getBoundingClientRect && (f = e.getBoundingClientRect()), c = jb(g), {
                top: f.top + c.pageYOffset - b.clientTop, left: f.left + c.pageXOffset -
                b.clientLeft
            }) : f
        }, position: function () {
            if (this[0]) {
                var a, b, c = this[0], e = {top: 0, left: 0};
                return "fixed" === d.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), d.nodeName(a[0], "html") || (e = a.offset()), e.top += d.css(a[0], "borderTopWidth", !0), e.left += d.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - e.top - d.css(c, "marginTop", !0),
                    left: b.left - e.left - d.css(c, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || Gb; a && !d.nodeName(a, "html") &&
                "static" === d.css(a, "position");)a = a.offsetParent;
                return a || Gb
            })
        }
    });
    d.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
        var c = "pageYOffset" === b;
        d.fn[a] = function (d) {
            return H(this, function (a, d, e) {
                var k = jb(a);
                return void 0 === e ? k ? k[b] : a[d] : void(k ? k.scrollTo(c ? v.pageXOffset : e, c ? e : v.pageYOffset) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    });
    d.each(["top", "left"], function (a, b) {
        d.cssHooks[b] = Ya(x.pixelPosition, function (a, e) {
            return e ? (e = O(a, b), Da.test(e) ? d(a).position()[b] + "px" : e) : void 0
        })
    });
    d.each({
        Height: "height",
        Width: "width"
    }, function (a, b) {
        d.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, e) {
            d.fn[e] = function (e, g) {
                var h = arguments.length && (c || "boolean" != typeof e), k = c || (!0 === e || !0 === g ? "margin" : "border");
                return H(this, function (b, c, e) {
                    var f;
                    return d.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? d.css(b, c, k) : d.style(b, c, e, k)
                }, b, h ? e : void 0, h, null)
            }
        })
    });
    d.fn.size =
        function () {
            return this.length
        };
    d.fn.andSelf = d.fn.addBack;
    "function" == typeof define && define.amd && define("jquery", [], function () {
        return d
    });
    var vc = v.jQuery, wc = v.$;
    return d.noConflict = function (a) {
        return v.$ === d && (v.$ = wc), a && v.jQuery === d && (v.jQuery = vc), d
    }, "undefined" === typeof R && (v.jQuery = v.$ = d), d
});
