(function (Q, R, s) {
    function D(b) {
        return function () {
            var a = arguments[0], c, a = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.2.16/" + (b ? b + "/" : "") + a;
            for (c = 1; c < arguments.length; c++)a = a + (1 == c ? "?" : "&") + "p" + (c - 1) + "=" + encodeURIComponent("function" == typeof arguments[c] ? arguments[c].toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof arguments[c] ? "undefined" : "string" != typeof arguments[c] ? JSON.stringify(arguments[c]) : arguments[c]);
            return Error(a)
        }
    }

    function ab(b) {
        if (null == b || Aa(b))return !1;
        var a = b.length;
        return 1 === b.nodeType && a ? !0 : x(b) || K(b) || 0 === a || "number" === typeof a && 0 < a && a - 1 in b
    }

    function q(b, a, c) {
        var d;
        if (b)if (M(b))for (d in b)"prototype" == d || "length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d) || a.call(c, b[d], d); else if (b.forEach && b.forEach !== q)b.forEach(a, c); else if (ab(b))for (d = 0; d < b.length; d++)a.call(c, b[d], d); else for (d in b)b.hasOwnProperty(d) && a.call(c, b[d], d);
        return b
    }

    function Rb(b) {
        var a = [], c;
        for (c in b)b.hasOwnProperty(c) && a.push(c);
        return a.sort()
    }

    function Tc(b, a, c) {
        for (var d =
            Rb(b), e = 0; e < d.length; e++)a.call(c, b[d[e]], d[e]);
        return d
    }

    function Sb(b) {
        return function (a, c) {
            b(c, a)
        }
    }

    function bb() {
        for (var b = ja.length, a; b;) {
            b--;
            a = ja[b].charCodeAt(0);
            if (57 == a)return ja[b] = "A", ja.join("");
            if (90 == a)ja[b] = "0"; else return ja[b] = String.fromCharCode(a + 1), ja.join("")
        }
        ja.unshift("0");
        return ja.join("")
    }

    function Tb(b, a) {
        a ? b.$$hashKey = a : delete b.$$hashKey
    }

    function y(b) {
        var a = b.$$hashKey;
        q(arguments, function (a) {
            a !== b && q(a, function (a, c) {
                b[c] = a
            })
        });
        Tb(b, a);
        return b
    }

    function S(b) {
        return parseInt(b,
            10)
    }

    function Ub(b, a) {
        return y(new (y(function () {
        }, {prototype: b})), a)
    }

    function B() {
    }

    function Ba(b) {
        return b
    }

    function Z(b) {
        return function () {
            return b
        }
    }

    function z(b) {
        return "undefined" === typeof b
    }

    function E(b) {
        return "undefined" !== typeof b
    }

    function T(b) {
        return null != b && "object" === typeof b
    }

    function x(b) {
        return "string" === typeof b
    }

    function wb(b) {
        return "number" === typeof b
    }

    function Ma(b) {
        return "[object Date]" === ua.call(b)
    }

    function K(b) {
        return "[object Array]" === ua.call(b)
    }

    function M(b) {
        return "function" === typeof b
    }

    function cb(b) {
        return "[object RegExp]" === ua.call(b)
    }

    function Aa(b) {
        return b && b.document && b.location && b.alert && b.setInterval
    }

    function Uc(b) {
        return !(!b || !(b.nodeName || b.prop && b.attr && b.find))
    }

    function Vc(b, a, c) {
        var d = [];
        q(b, function (b, f, h) {
            d.push(a.call(c, b, f, h))
        });
        return d
    }

    function db(b, a) {
        if (b.indexOf)return b.indexOf(a);
        for (var c = 0; c < b.length; c++)if (a === b[c])return c;
        return -1
    }

    function Na(b, a) {
        var c = db(b, a);
        0 <= c && b.splice(c, 1);
        return a
    }

    function $(b, a) {
        if (Aa(b) || b && b.$evalAsync && b.$watch)throw Oa("cpws");
        if (a) {
            if (b === a)throw Oa("cpi");
            if (K(b))for (var c = a.length = 0; c < b.length; c++)a.push($(b[c])); else {
                c = a.$$hashKey;
                q(a, function (b, c) {
                    delete a[c]
                });
                for (var d in b)a[d] = $(b[d]);
                Tb(a, c)
            }
        } else(a = b) && (K(b) ? a = $(b, []) : Ma(b) ? a = new Date(b.getTime()) : cb(b) ? a = RegExp(b.source) : T(b) && (a = $(b, {})));
        return a
    }

    function Vb(b, a) {
        a = a || {};
        for (var c in b)!b.hasOwnProperty(c) || "$" === c.charAt(0) && "$" === c.charAt(1) || (a[c] = b[c]);
        return a
    }

    function va(b, a) {
        if (b === a)return !0;
        if (null === b || null === a)return !1;
        if (b !== b && a !== a)return !0;
        var c = typeof b, d;
        if (c == typeof a && "object" == c)if (K(b)) {
            if (!K(a))return !1;
            if ((c = b.length) == a.length) {
                for (d = 0; d < c; d++)if (!va(b[d], a[d]))return !1;
                return !0
            }
        } else {
            if (Ma(b))return Ma(a) && b.getTime() == a.getTime();
            if (cb(b) && cb(a))return b.toString() == a.toString();
            if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || Aa(b) || Aa(a) || K(a))return !1;
            c = {};
            for (d in b)if ("$" !== d.charAt(0) && !M(b[d])) {
                if (!va(b[d], a[d]))return !1;
                c[d] = !0
            }
            for (d in a)if (!c.hasOwnProperty(d) && "$" !== d.charAt(0) && a[d] !== s && !M(a[d]))return !1;
            return !0
        }
        return !1
    }

    function Wb() {
        return R.securityPolicy && R.securityPolicy.isActive || R.querySelector && !(!R.querySelector("[ng-csp]") && !R.querySelector("[data-ng-csp]"))
    }

    function eb(b, a) {
        var c = 2 < arguments.length ? wa.call(arguments, 2) : [];
        return !M(a) || a instanceof RegExp ? a : c.length ? function () {
            return arguments.length ? a.apply(b, c.concat(wa.call(arguments, 0))) : a.apply(b, c)
        } : function () {
            return arguments.length ? a.apply(b, arguments) : a.call(b)
        }
    }

    function Wc(b, a) {
        var c = a;
        "string" === typeof b && "$" === b.charAt(0) ? c =
            s : Aa(a) ? c = "$WINDOW" : a && R === a ? c = "$DOCUMENT" : a && a.$evalAsync && a.$watch && (c = "$SCOPE");
        return c
    }

    function pa(b, a) {
        return "undefined" === typeof b ? s : JSON.stringify(b, Wc, a ? "  " : null)
    }

    function Xb(b) {
        return x(b) ? JSON.parse(b) : b
    }

    function Pa(b) {
        "function" === typeof b ? b = !0 : b && 0 !== b.length ? (b = C("" + b), b = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)) : b = !1;
        return b
    }

    function ga(b) {
        b = w(b).clone();
        try {
            b.empty()
        } catch (a) {
        }
        var c = w("<div>").append(b).html();
        try {
            return 3 === b[0].nodeType ? C(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,
                function (a, b) {
                    return "<" + C(b)
                })
        } catch (d) {
            return C(c)
        }
    }

    function Yb(b) {
        try {
            return decodeURIComponent(b)
        } catch (a) {
        }
    }

    function Zb(b) {
        var a = {}, c, d;
        q((b || "").split("&"), function (b) {
            b && (c = b.split("="), d = Yb(c[0]), E(d) && (b = E(c[1]) ? Yb(c[1]) : !0, a[d] ? K(a[d]) ? a[d].push(b) : a[d] = [a[d], b] : a[d] = b))
        });
        return a
    }

    function $b(b) {
        var a = [];
        q(b, function (b, d) {
            K(b) ? q(b, function (b) {
                a.push(xa(d, !0) + (!0 === b ? "" : "=" + xa(b, !0)))
            }) : a.push(xa(d, !0) + (!0 === b ? "" : "=" + xa(b, !0)))
        });
        return a.length ? a.join("&") : ""
    }

    function xb(b) {
        return xa(b,
            !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function xa(b, a) {
        return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, a ? "%20" : "+")
    }

    function Xc(b, a) {
        function c(a) {
            a && d.push(a)
        }

        var d = [b], e, f, h = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], g = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        q(h, function (a) {
            h[a] = !0;
            c(R.getElementById(a));
            a = a.replace(":", "\\:");
            b.querySelectorAll && (q(b.querySelectorAll("." + a), c), q(b.querySelectorAll("." +
                a + "\\:"), c), q(b.querySelectorAll("[" + a + "]"), c))
        });
        q(d, function (a) {
            if (!e) {
                var b = g.exec(" " + a.className + " ");
                b ? (e = a, f = (b[2] || "").replace(/\s+/g, ",")) : q(a.attributes, function (b) {
                    !e && h[b.name] && (e = a, f = b.value)
                })
            }
        });
        e && a(e, f ? [f] : [])
    }

    function ac(b, a) {
        var c = function () {
            b = w(b);
            if (b.injector()) {
                var c = b[0] === R ? "document" : ga(b);
                throw Oa("btstrpd", c);
            }
            a = a || [];
            a.unshift(["$provide", function (a) {
                a.value("$rootElement", b)
            }]);
            a.unshift("ng");
            c = bc(a);
            c.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate",
                function (a, b, c, d, e) {
                    a.$apply(function () {
                        b.data("$injector", d);
                        c(b)(a)
                    })
                }]);
            return c
        }, d = /^NG_DEFER_BOOTSTRAP!/;
        if (Q && !d.test(Q.name))return c();
        Q.name = Q.name.replace(d, "");
        Ca.resumeBootstrap = function (b) {
            q(b, function (b) {
                a.push(b)
            });
            c()
        }
    }

    function fb(b, a) {
        a = a || "_";
        return b.replace(Yc, function (b, d) {
            return (d ? a : "") + b.toLowerCase()
        })
    }

    function yb(b, a, c) {
        if (!b)throw Oa("areq", a || "?", c || "required");
        return b
    }

    function Qa(b, a, c) {
        c && K(b) && (b = b[b.length - 1]);
        yb(M(b), a, "not a function, got " + (b && "object" == typeof b ?
            b.constructor.name || "Object" : typeof b));
        return b
    }

    function ya(b, a) {
        if ("hasOwnProperty" === b)throw Oa("badname", a);
    }

    function cc(b, a, c) {
        if (!a)return b;
        a = a.split(".");
        for (var d, e = b, f = a.length, h = 0; h < f; h++)d = a[h], b && (b = (e = b)[d]);
        return !c && M(b) ? eb(e, b) : b
    }

    function zb(b) {
        var a = b[0];
        b = b[b.length - 1];
        if (a === b)return w(a);
        var c = [a];
        do {
            a = a.nextSibling;
            if (!a)break;
            c.push(a)
        } while (a !== b);
        return w(c)
    }

    function Zc(b) {
        var a = D("$injector"), c = D("ng");
        b = b.angular || (b.angular = {});
        b.$$minErr = b.$$minErr || D;
        return b.module ||
            (b.module = function () {
                var b = {};
                return function (e, f, h) {
                    if ("hasOwnProperty" === e)throw c("badname", "module");
                    f && b.hasOwnProperty(e) && (b[e] = null);
                    return b[e] || (b[e] = function () {
                            function b(a, d, e) {
                                return function () {
                                    c[e || "push"]([a, d, arguments]);
                                    return n
                                }
                            }

                            if (!f)throw a("nomod", e);
                            var c = [], d = [], l = b("$injector", "invoke"), n = {
                                _invokeQueue: c,
                                _runBlocks: d,
                                requires: f,
                                name: e,
                                provider: b("$provide", "provider"),
                                factory: b("$provide", "factory"),
                                service: b("$provide", "service"),
                                value: b("$provide", "value"),
                                constant: b("$provide",
                                    "constant", "unshift"),
                                animation: b("$animateProvider", "register"),
                                filter: b("$filterProvider", "register"),
                                controller: b("$controllerProvider", "register"),
                                directive: b("$compileProvider", "directive"),
                                config: l,
                                run: function (a) {
                                    d.push(a);
                                    return this
                                }
                            };
                            h && l(h);
                            return n
                        }())
                }
            }())
    }

    function $c(b) {
        y(b, {
            bootstrap: ac,
            copy: $,
            extend: y,
            equals: va,
            element: w,
            forEach: q,
            injector: bc,
            noop: B,
            bind: eb,
            toJson: pa,
            fromJson: Xb,
            identity: Ba,
            isUndefined: z,
            isDefined: E,
            isString: x,
            isFunction: M,
            isObject: T,
            isNumber: wb,
            isElement: Uc,
            isArray: K,
            version: ad,
            isDate: Ma,
            lowercase: C,
            uppercase: Da,
            callbacks: {counter: 0},
            $$minErr: D,
            $$csp: Wb
        });
        Ra = Zc(Q);
        try {
            Ra("ngLocale")
        } catch (a) {
            Ra("ngLocale", []).provider("$locale", bd)
        }
        Ra("ng", ["ngLocale"], ["$provide", function (a) {
            a.provider({$$sanitizeUri: cd});
            a.provider("$compile", dc).directive({
                a: dd,
                input: ec,
                textarea: ec,
                form: ed,
                script: fd,
                select: gd,
                style: hd,
                option: id,
                ngBind: jd,
                ngBindHtml: kd,
                ngBindTemplate: ld,
                ngClass: md,
                ngClassEven: nd,
                ngClassOdd: od,
                ngCloak: pd,
                ngController: qd,
                ngForm: rd,
                ngHide: sd,
                ngIf: td,
                ngInclude: ud,
                ngInit: vd,
                ngNonBindable: wd,
                ngPluralize: xd,
                ngRepeat: yd,
                ngShow: zd,
                ngStyle: Ad,
                ngSwitch: Bd,
                ngSwitchWhen: Cd,
                ngSwitchDefault: Dd,
                ngOptions: Ed,
                ngTransclude: Fd,
                ngModel: Gd,
                ngList: Hd,
                ngChange: Id,
                required: fc,
                ngRequired: fc,
                ngValue: Jd
            }).directive({ngInclude: Kd}).directive(Ab).directive(gc);
            a.provider({
                $anchorScroll: Ld,
                $animate: Md,
                $browser: Nd,
                $cacheFactory: Od,
                $controller: Pd,
                $document: Qd,
                $exceptionHandler: Rd,
                $filter: hc,
                $interpolate: Sd,
                $interval: Td,
                $http: Ud,
                $httpBackend: Vd,
                $location: Wd,
                $log: Xd,
                $parse: Yd,
                $rootScope: Zd,
                $q: $d,
                $sce: ae,
                $sceDelegate: be,
                $sniffer: ce,
                $templateCache: de,
                $timeout: ee,
                $window: fe,
                $$rAF: ge,
                $$asyncCallback: he
            })
        }])
    }

    function Sa(b) {
        return b.replace(ie, function (a, b, d, e) {
            return e ? d.toUpperCase() : d
        }).replace(je, "Moz$1")
    }

    function Bb(b, a, c, d) {
        function e(b) {
            var e = c && b ? [this.filter(b)] : [this], m = a, k, l, n, r, p, t;
            if (!d || null != b)for (; e.length;)for (k = e.shift(), l = 0, n = k.length; l < n; l++)for (r = w(k[l]), m ? r.triggerHandler("$destroy") : m = !m, p = 0, r = (t = r.children()).length; p < r; p++)e.push(Ea(t[p]));
            return f.apply(this, arguments)
        }

        var f = Ea.fn[b], f = f.$original || f;
        e.$original = f;
        Ea.fn[b] = e
    }

    function H(b) {
        if (b instanceof H)return b;
        x(b) && (b = ba(b));
        if (!(this instanceof H)) {
            if (x(b) && "<" != b.charAt(0))throw Cb("nosel");
            return new H(b)
        }
        if (x(b)) {
            var a = b;
            b = R;
            var c;
            if (c = ke.exec(a))b = [b.createElement(c[1])]; else {
                var d = b, e;
                b = d.createDocumentFragment();
                c = [];
                if (Db.test(a)) {
                    d = b.appendChild(d.createElement("div"));
                    e = (le.exec(a) || ["", ""])[1].toLowerCase();
                    e = da[e] || da._default;
                    d.innerHTML = "<div>&#160;</div>" + e[1] + a.replace(me, "<$1></$2>") + e[2];
                    d.removeChild(d.firstChild);
                    for (a = e[0]; a--;)d = d.lastChild;
                    a = 0;
                    for (e = d.childNodes.length; a < e; ++a)c.push(d.childNodes[a]);
                    d = b.firstChild;
                    d.textContent = ""
                } else c.push(d.createTextNode(a));
                b.textContent = "";
                b.innerHTML = "";
                b = c
            }
            Eb(this, b);
            w(R.createDocumentFragment()).append(this)
        } else Eb(this, b)
    }

    function Fb(b) {
        return b.cloneNode(!0)
    }

    function Fa(b) {
        ic(b);
        var a = 0;
        for (b = b.childNodes || []; a < b.length; a++)Fa(b[a])
    }

    function jc(b, a, c, d) {
        if (E(d))throw Cb("offargs");
        var e = ka(b, "events");
        ka(b, "handle") && (z(a) ? q(e,
            function (a, c) {
                Gb(b, c, a);
                delete e[c]
            }) : q(a.split(" "), function (a) {
            z(c) ? (Gb(b, a, e[a]), delete e[a]) : Na(e[a] || [], c)
        }))
    }

    function ic(b, a) {
        var c = b[gb], d = Ta[c];
        d && (a ? delete Ta[c].data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), jc(b)), delete Ta[c], b[gb] = s))
    }

    function ka(b, a, c) {
        var d = b[gb], d = Ta[d || -1];
        if (E(c))d || (b[gb] = d = ++ne, d = Ta[d] = {}), d[a] = c; else return d && d[a]
    }

    function kc(b, a, c) {
        var d = ka(b, "data"), e = E(c), f = !e && E(a), h = f && !T(a);
        d || h || ka(b, "data", d = {});
        if (e)d[a] = c; else if (f) {
            if (h)return d && d[a];
            y(d, a)
        } else return d
    }

    function Hb(b, a) {
        return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1
    }

    function hb(b, a) {
        a && b.setAttribute && q(a.split(" "), function (a) {
            b.setAttribute("class", ba((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + ba(a) + " ", " ")))
        })
    }

    function ib(b, a) {
        if (a && b.setAttribute) {
            var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            q(a.split(" "), function (a) {
                a = ba(a);
                -1 === c.indexOf(" " + a + " ") &&
                (c += a + " ")
            });
            b.setAttribute("class", ba(c))
        }
    }

    function Eb(b, a) {
        if (a) {
            a = a.nodeName || !E(a.length) || Aa(a) ? [a] : a;
            for (var c = 0; c < a.length; c++)b.push(a[c])
        }
    }

    function lc(b, a) {
        return jb(b, "$" + (a || "ngController") + "Controller")
    }

    function jb(b, a, c) {
        b = w(b);
        9 == b[0].nodeType && (b = b.find("html"));
        for (a = K(a) ? a : [a]; b.length;) {
            for (var d = b[0], e = 0, f = a.length; e < f; e++)if ((c = b.data(a[e])) !== s)return c;
            b = w(d.parentNode || 11 === d.nodeType && d.host)
        }
    }

    function mc(b) {
        for (var a = 0, c = b.childNodes; a < c.length; a++)Fa(c[a]);
        for (; b.firstChild;)b.removeChild(b.firstChild)
    }

    function nc(b, a) {
        var c = kb[a.toLowerCase()];
        return c && oc[b.nodeName] && c
    }

    function oe(b, a) {
        var c = function (c, e) {
            c.preventDefault || (c.preventDefault = function () {
                c.returnValue = !1
            });
            c.stopPropagation || (c.stopPropagation = function () {
                c.cancelBubble = !0
            });
            c.target || (c.target = c.srcElement || R);
            if (z(c.defaultPrevented)) {
                var f = c.preventDefault;
                c.preventDefault = function () {
                    c.defaultPrevented = !0;
                    f.call(c)
                };
                c.defaultPrevented = !1
            }
            c.isDefaultPrevented = function () {
                return c.defaultPrevented || !1 === c.returnValue
            };
            var h = Vb(a[e ||
                c.type] || []);
            q(h, function (a) {
                a.call(b, c)
            });
            8 >= O ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, delete c.stopPropagation, delete c.isDefaultPrevented)
        };
        c.elem = b;
        return c
    }

    function Ga(b) {
        var a = typeof b, c;
        "object" == a && null !== b ? "function" == typeof(c = b.$$hashKey) ? c = b.$$hashKey() : c === s && (c = b.$$hashKey = bb()) : c = b;
        return a + ":" + c
    }

    function Ua(b) {
        q(b, this.put, this)
    }

    function pc(b) {
        var a, c;
        "function" == typeof b ? (a = b.$inject) || (a = [], b.length && (c = b.toString().replace(pe,
            ""), c = c.match(qe), q(c[1].split(re), function (b) {
            b.replace(se, function (b, c, d) {
                a.push(d)
            })
        })), b.$inject = a) : K(b) ? (c = b.length - 1, Qa(b[c], "fn"), a = b.slice(0, c)) : Qa(b, "fn", !0);
        return a
    }

    function bc(b) {
        function a(a) {
            return function (b, c) {
                if (T(b))q(b, Sb(a)); else return a(b, c)
            }
        }

        function c(a, b) {
            ya(a, "service");
            if (M(b) || K(b))b = n.instantiate(b);
            if (!b.$get)throw Va("pget", a);
            return l[a + g] = b
        }

        function d(a, b) {
            return c(a, {$get: b})
        }

        function e(a) {
            var b = [], c, d, f, g;
            q(a, function (a) {
                if (!k.get(a)) {
                    k.put(a, !0);
                    try {
                        if (x(a))for (c =
                                          Ra(a), b = b.concat(e(c.requires)).concat(c._runBlocks), d = c._invokeQueue, f = 0, g = d.length; f < g; f++) {
                            var h = d[f], m = n.get(h[0]);
                            m[h[1]].apply(m, h[2])
                        } else M(a) ? b.push(n.invoke(a)) : K(a) ? b.push(n.invoke(a)) : Qa(a, "module")
                    } catch (p) {
                        throw K(a) && (a = a[a.length - 1]), p.message && p.stack && -1 == p.stack.indexOf(p.message) && (p = p.message + "\n" + p.stack), Va("modulerr", a, p.stack || p.message || p);
                    }
                }
            });
            return b
        }

        function f(a, b) {
            function c(d) {
                if (a.hasOwnProperty(d)) {
                    if (a[d] === h)throw Va("cdep", m.join(" <- "));
                    return a[d]
                }
                try {
                    return m.unshift(d),
                        a[d] = h, a[d] = b(d)
                } catch (e) {
                    throw a[d] === h && delete a[d], e;
                } finally {
                    m.shift()
                }
            }

            function d(a, b, e) {
                var f = [], g = pc(a), h, m, k;
                m = 0;
                for (h = g.length; m < h; m++) {
                    k = g[m];
                    if ("string" !== typeof k)throw Va("itkn", k);
                    f.push(e && e.hasOwnProperty(k) ? e[k] : c(k))
                }
                a.$inject || (a = a[h]);
                return a.apply(b, f)
            }

            return {
                invoke: d, instantiate: function (a, b) {
                    var c = function () {
                    }, e;
                    c.prototype = (K(a) ? a[a.length - 1] : a).prototype;
                    c = new c;
                    e = d(a, c, b);
                    return T(e) || M(e) ? e : c
                }, get: c, annotate: pc, has: function (b) {
                    return l.hasOwnProperty(b + g) || a.hasOwnProperty(b)
                }
            }
        }

        var h = {}, g = "Provider", m = [], k = new Ua, l = {
            $provide: {
                provider: a(c),
                factory: a(d),
                service: a(function (a, b) {
                    return d(a, ["$injector", function (a) {
                        return a.instantiate(b)
                    }])
                }),
                value: a(function (a, b) {
                    return d(a, Z(b))
                }),
                constant: a(function (a, b) {
                    ya(a, "constant");
                    l[a] = b;
                    r[a] = b
                }),
                decorator: function (a, b) {
                    var c = n.get(a + g), d = c.$get;
                    c.$get = function () {
                        var a = p.invoke(d, c);
                        return p.invoke(b, null, {$delegate: a})
                    }
                }
            }
        }, n = l.$injector = f(l, function () {
            throw Va("unpr", m.join(" <- "));
        }), r = {}, p = r.$injector = f(r, function (a) {
            a = n.get(a +
                g);
            return p.invoke(a.$get, a)
        });
        q(e(b), function (a) {
            p.invoke(a || B)
        });
        return p
    }

    function Ld() {
        var b = !0;
        this.disableAutoScrolling = function () {
            b = !1
        };
        this.$get = ["$window", "$location", "$rootScope", function (a, c, d) {
            function e(a) {
                var b = null;
                q(a, function (a) {
                    b || "a" !== C(a.nodeName) || (b = a)
                });
                return b
            }

            function f() {
                var b = c.hash(), d;
                b ? (d = h.getElementById(b)) ? d.scrollIntoView() : (d = e(h.getElementsByName(b))) ? d.scrollIntoView() : "top" === b && a.scrollTo(0, 0) : a.scrollTo(0, 0)
            }

            var h = a.document;
            b && d.$watch(function () {
                    return c.hash()
                },
                function () {
                    d.$evalAsync(f)
                });
            return f
        }]
    }

    function he() {
        this.$get = ["$$rAF", "$timeout", function (b, a) {
            return b.supported ? function (a) {
                return b(a)
            } : function (b) {
                return a(b, 0, !1)
            }
        }]
    }

    function te(b, a, c, d) {
        function e(a) {
            try {
                a.apply(null, wa.call(arguments, 1))
            } finally {
                if (t--, 0 === t)for (; A.length;)try {
                    A.pop()()
                } catch (b) {
                    c.error(b)
                }
            }
        }

        function f(a, b) {
            (function lb() {
                q(F, function (a) {
                    a()
                });
                u = b(lb, a)
            })()
        }

        function h() {
            X = null;
            U != g.url() && (U = g.url(), q(I, function (a) {
                a(g.url())
            }))
        }

        var g = this, m = a[0], k = b.location, l = b.history,
            n = b.setTimeout, r = b.clearTimeout, p = {};
        g.isMock = !1;
        var t = 0, A = [];
        g.$$completeOutstandingRequest = e;
        g.$$incOutstandingRequestCount = function () {
            t++
        };
        g.notifyWhenNoOutstandingRequests = function (a) {
            q(F, function (a) {
                a()
            });
            0 === t ? a() : A.push(a)
        };
        var F = [], u;
        g.addPollFn = function (a) {
            z(u) && f(100, n);
            F.push(a);
            return a
        };
        var U = k.href, v = a.find("base"), X = null;
        g.url = function (a, c) {
            k !== b.location && (k = b.location);
            l !== b.history && (l = b.history);
            if (a) {
                if (U != a)return U = a, d.history ? c ? l.replaceState(null, "", a) : (l.pushState(null, "",
                    a), v.attr("href", v.attr("href"))) : (X = a, c ? k.replace(a) : k.href = a), g
            } else return X || k.href.replace(/%27/g, "'")
        };
        var I = [], P = !1;
        g.onUrlChange = function (a) {
            if (!P) {
                if (d.history)w(b).on("popstate", h);
                if (d.hashchange)w(b).on("hashchange", h); else g.addPollFn(h);
                P = !0
            }
            I.push(a);
            return a
        };
        g.baseHref = function () {
            var a = v.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        };
        var aa = {}, la = "", ca = g.baseHref();
        g.cookies = function (a, b) {
            var d, e, f, g;
            if (a)b === s ? m.cookie = escape(a) + "=;path=" + ca + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" :
            x(b) && (d = (m.cookie = escape(a) + "=" + escape(b) + ";path=" + ca).length + 1, 4096 < d && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!")); else {
                if (m.cookie !== la)for (la = m.cookie, d = la.split("; "), aa = {}, f = 0; f < d.length; f++)e = d[f], g = e.indexOf("="), 0 < g && (a = unescape(e.substring(0, g)), aa[a] === s && (aa[a] = unescape(e.substring(g + 1))));
                return aa
            }
        };
        g.defer = function (a, b) {
            var c;
            t++;
            c = n(function () {
                delete p[c];
                e(a)
            }, b || 0);
            p[c] = !0;
            return c
        };
        g.defer.cancel = function (a) {
            return p[a] ?
                (delete p[a], r(a), e(B), !0) : !1
        }
    }

    function Nd() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function (b, a, c, d) {
            return new te(b, d, a, c)
        }]
    }

    function Od() {
        this.$get = function () {
            function b(b, d) {
                function e(a) {
                    a != n && (r ? r == a && (r = a.n) : r = a, f(a.n, a.p), f(a, n), n = a, n.n = null)
                }

                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a))
                }

                if (b in a)throw D("$cacheFactory")("iid", b);
                var h = 0, g = y({}, d, {id: b}), m = {}, k = d && d.capacity || Number.MAX_VALUE, l = {}, n = null, r = null;
                return a[b] = {
                    put: function (a, b) {
                        if (k < Number.MAX_VALUE) {
                            var c = l[a] ||
                                (l[a] = {key: a});
                            e(c)
                        }
                        if (!z(b))return a in m || h++, m[a] = b, h > k && this.remove(r.key), b
                    }, get: function (a) {
                        if (k < Number.MAX_VALUE) {
                            var b = l[a];
                            if (!b)return;
                            e(b)
                        }
                        return m[a]
                    }, remove: function (a) {
                        if (k < Number.MAX_VALUE) {
                            var b = l[a];
                            if (!b)return;
                            b == n && (n = b.p);
                            b == r && (r = b.n);
                            f(b.n, b.p);
                            delete l[a]
                        }
                        delete m[a];
                        h--
                    }, removeAll: function () {
                        m = {};
                        h = 0;
                        l = {};
                        n = r = null
                    }, destroy: function () {
                        l = g = m = null;
                        delete a[b]
                    }, info: function () {
                        return y({}, g, {size: h})
                    }
                }
            }

            var a = {};
            b.info = function () {
                var b = {};
                q(a, function (a, e) {
                    b[e] = a.info()
                });
                return b
            };
            b.get = function (b) {
                return a[b]
            };
            return b
        }
    }

    function de() {
        this.$get = ["$cacheFactory", function (b) {
            return b("templates")
        }]
    }

    function dc(b, a) {
        var c = {}, d = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, e = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, f = /^(on[a-z]+|formaction)$/;
        this.directive = function g(a, d) {
            ya(a, "directive");
            x(a) ? (yb(d, "directiveFactory"), c.hasOwnProperty(a) || (c[a] = [], b.factory(a + "Directive", ["$injector", "$exceptionHandler", function (b, d) {
                var e = [];
                q(c[a], function (c, f) {
                    try {
                        var g = b.invoke(c);
                        M(g) ? g = {compile: Z(g)} :
                        !g.compile && g.link && (g.compile = Z(g.link));
                        g.priority = g.priority || 0;
                        g.index = f;
                        g.name = g.name || a;
                        g.require = g.require || g.controller && g.name;
                        g.restrict = g.restrict || "A";
                        e.push(g)
                    } catch (k) {
                        d(k)
                    }
                });
                return e
            }])), c[a].push(d)) : q(a, Sb(g));
            return this
        };
        this.aHrefSanitizationWhitelist = function (b) {
            return E(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist()
        };
        this.imgSrcSanitizationWhitelist = function (b) {
            return E(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist()
        };
        this.$get =
            ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function (a, b, k, l, n, r, p, t, A, F, u, U) {
                function v(a, b, c, d, e) {
                    a instanceof w || (a = w(a));
                    q(a, function (b, c) {
                        3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = w(b).wrap("<span></span>").parent()[0])
                    });
                    var f = I(a, b, a, c, d, e);
                    X(a, "ng-scope");
                    return function (b, c, d) {
                        yb(b, "scope");
                        var e = c ? Ia.clone.call(a) : a;
                        q(d, function (a, b) {
                            e.data("$" + b + "Controller", a)
                        });
                        d = 0;
                        for (var g =
                            e.length; d < g; d++) {
                            var m = e[d].nodeType;
                            1 !== m && 9 !== m || e.eq(d).data("$scope", b)
                        }
                        c && c(e, b);
                        f && f(b, e, e);
                        return e
                    }
                }

                function X(a, b) {
                    try {
                        a.addClass(b)
                    } catch (c) {
                    }
                }

                function I(a, b, c, d, e, f) {
                    function g(a, c, d, e) {
                        var f, k, l, p, n, r, t;
                        f = c.length;
                        var A = Array(f);
                        for (n = 0; n < f; n++)A[n] = c[n];
                        t = n = 0;
                        for (r = m.length; n < r; t++)k = A[t], c = m[n++], f = m[n++], l = w(k), c ? (c.scope ? (p = a.$new(), l.data("$scope", p)) : p = a, (l = c.transclude) || !e && b ? c(f, p, k, d, P(a, l || b)) : c(f, p, k, d, e)) : f && f(a, k.childNodes, s, e)
                    }

                    for (var m = [], k, l, p, n, r = 0; r < a.length; r++)k =
                        new Ib, l = aa(a[r], [], k, 0 === r ? d : s, e), (f = l.length ? L(l, a[r], k, b, c, null, [], [], f) : null) && f.scope && X(w(a[r]), "ng-scope"), k = f && f.terminal || !(p = a[r].childNodes) || !p.length ? null : I(p, f ? f.transclude : b), m.push(f, k), n = n || f || k, f = null;
                    return n ? g : null
                }

                function P(a, b) {
                    return function (c, d, e) {
                        var f = !1;
                        c || (c = a.$new(), f = c.$$transcluded = !0);
                        d = b(c, d, e);
                        if (f)d.on("$destroy", eb(c, c.$destroy));
                        return d
                    }
                }

                function aa(a, b, c, f, g) {
                    var k = c.$attr, m;
                    switch (a.nodeType) {
                        case 1:
                            Y(b, ma(Ja(a).toLowerCase()), "E", f, g);
                            var l, p, n;
                            m = a.attributes;
                            for (var r = 0, t = m && m.length; r < t; r++) {
                                var A = !1, F = !1;
                                l = m[r];
                                if (!O || 8 <= O || l.specified) {
                                    p = l.name;
                                    n = ma(p);
                                    H.test(n) && (p = fb(n.substr(6), "-"));
                                    var U = n.replace(/(Start|End)$/, "");
                                    n === U + "Start" && (A = p, F = p.substr(0, p.length - 5) + "end", p = p.substr(0, p.length - 6));
                                    n = ma(p.toLowerCase());
                                    k[n] = p;
                                    c[n] = l = ba(l.value);
                                    nc(a, n) && (c[n] = !0);
                                    D(a, b, l, n);
                                    Y(b, n, "A", f, g, A, F)
                                }
                            }
                            a = a.className;
                            if (x(a) && "" !== a)for (; m = e.exec(a);)n = ma(m[2]), Y(b, n, "C", f, g) && (c[n] = ba(m[3])), a = a.substr(m.index + m[0].length);
                            break;
                        case 3:
                            z(b, a.nodeValue);
                            break;
                        case 8:
                            try {
                                if (m = d.exec(a.nodeValue))n = ma(m[1]), Y(b, n, "M", f, g) && (c[n] = ba(m[2]))
                            } catch (u) {
                            }
                    }
                    b.sort(B);
                    return b
                }

                function la(a, b, c) {
                    var d = [], e = 0;
                    if (b && a.hasAttribute && a.hasAttribute(b)) {
                        do {
                            if (!a)throw ia("uterdir", b, c);
                            1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
                            d.push(a);
                            a = a.nextSibling
                        } while (0 < e)
                    } else d.push(a);
                    return w(d)
                }

                function ca(a, b, c) {
                    return function (d, e, f, g, m) {
                        e = la(e[0], b, c);
                        return a(d, e, f, g, m)
                    }
                }

                function L(a, c, d, e, f, g, l, n, t) {
                    function A(a, b, c, d) {
                        if (a) {
                            c && (a = ca(a, c, d));
                            a.require =
                                G.require;
                            if (I === G || G.$$isolateScope)a = qc(a, {isolateScope: !0});
                            l.push(a)
                        }
                        if (b) {
                            c && (b = ca(b, c, d));
                            b.require = G.require;
                            if (I === G || G.$$isolateScope)b = qc(b, {isolateScope: !0});
                            n.push(b)
                        }
                    }

                    function F(a, b, c) {
                        var d, e = "data", f = !1;
                        if (x(a)) {
                            for (; "^" == (d = a.charAt(0)) || "?" == d;)a = a.substr(1), "^" == d && (e = "inheritedData"), f = f || "?" == d;
                            d = null;
                            c && "data" === e && (d = c[a]);
                            d = d || b[e]("$" + a + "Controller");
                            if (!d && !f)throw ia("ctreq", a, C);
                        } else K(a) && (d = [], q(a, function (a) {
                            d.push(F(a, b, c))
                        }));
                        return d
                    }

                    function U(a, e, f, g, t) {
                        function A(a,
                                   b) {
                            var c;
                            2 > arguments.length && (b = a, a = s);
                            z && (c = ca);
                            return t(a, b, c)
                        }

                        var u, v, P, ha, aa, J, ca = {}, mb;
                        u = c === f ? d : Vb(d, new Ib(w(f), d.$attr));
                        v = u.$$element;
                        if (I) {
                            var la = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                            g = w(f);
                            J = e.$new(!0);
                            Y && Y === I.$$originalDirective ? g.data("$isolateScope", J) : g.data("$isolateScopeNoTemplate", J);
                            X(g, "ng-isolate-scope");
                            q(I.scope, function (a, c) {
                                var d = a.match(la) || [], f = d[3] || c, g = "?" == d[2], d = d[1], k, l, n, p;
                                J.$$isolateBindings[c] = d + f;
                                switch (d) {
                                    case "@":
                                        u.$observe(f, function (a) {
                                            J[c] = a
                                        });
                                        u.$$observers[f].$$scope =
                                            e;
                                        u[f] && (J[c] = b(u[f])(e));
                                        break;
                                    case "=":
                                        if (g && !u[f])break;
                                        l = r(u[f]);
                                        p = l.literal ? va : function (a, b) {
                                            return a === b
                                        };
                                        n = l.assign || function () {
                                                k = J[c] = l(e);
                                                throw ia("nonassign", u[f], I.name);
                                            };
                                        k = J[c] = l(e);
                                        J.$watch(function () {
                                            var a = l(e);
                                            p(a, J[c]) || (p(a, k) ? n(e, a = J[c]) : J[c] = a);
                                            return k = a
                                        }, null, l.literal);
                                        break;
                                    case "&":
                                        l = r(u[f]);
                                        J[c] = function (a) {
                                            return l(e, a)
                                        };
                                        break;
                                    default:
                                        throw ia("iscp", I.name, c, a);
                                }
                            })
                        }
                        mb = t && A;
                        L && q(L, function (a) {
                            var b = {
                                    $scope: a === I || a.$$isolateScope ? J : e,
                                    $element: v,
                                    $attrs: u,
                                    $transclude: mb
                                },
                                c;
                            aa = a.controller;
                            "@" == aa && (aa = u[a.name]);
                            c = p(aa, b);
                            ca[a.name] = c;
                            z || v.data("$" + a.name + "Controller", c);
                            a.controllerAs && (b.$scope[a.controllerAs] = c)
                        });
                        g = 0;
                        for (P = l.length; g < P; g++)try {
                            ha = l[g], ha(ha.isolateScope ? J : e, v, u, ha.require && F(ha.require, v, ca), mb)
                        } catch (N) {
                            k(N, ga(v))
                        }
                        g = e;
                        I && (I.template || null === I.templateUrl) && (g = J);
                        a && a(g, f.childNodes, s, t);
                        for (g = n.length - 1; 0 <= g; g--)try {
                            ha = n[g], ha(ha.isolateScope ? J : e, v, u, ha.require && F(ha.require, v, ca), mb)
                        } catch (G) {
                            k(G, ga(v))
                        }
                    }

                    t = t || {};
                    for (var u = -Number.MAX_VALUE,
                             P, L = t.controllerDirectives, I = t.newIsolateScopeDirective, Y = t.templateDirective, B = t.nonTlbTranscludeDirective, Xa = !1, z = t.hasElementTranscludeDirective, y = d.$$element = w(c), G, C, N, D = e, Ha, H = 0, O = a.length; H < O; H++) {
                        G = a[H];
                        var S = G.$$start, nb = G.$$end;
                        S && (y = la(c, S, nb));
                        N = s;
                        if (u > G.priority)break;
                        if (N = G.scope)P = P || G, G.templateUrl || (Wa("new/isolated scope", I, G, y), T(N) && (I = G));
                        C = G.name;
                        !G.templateUrl && G.controller && (N = G.controller, L = L || {}, Wa("'" + C + "' controller", L[C], G, y), L[C] = G);
                        if (N = G.transclude)Xa = !0, G.$$tlb || (Wa("transclusion",
                            B, G, y), B = G), "element" == N ? (z = !0, u = G.priority, N = la(c, S, nb), y = d.$$element = w(R.createComment(" " + C + ": " + d[C] + " ")), c = y[0], Q(f, w(wa.call(N, 0)), c), D = v(N, e, u, g && g.name, {nonTlbTranscludeDirective: B})) : (N = w(Fb(c)).contents(), y.empty(), D = v(N, e));
                        if (G.template)if (Wa("template", Y, G, y), Y = G, N = M(G.template) ? G.template(y, d) : G.template, N = rc(N), G.replace) {
                            g = G;
                            N = Db.test(N) ? w(N) : [];
                            c = N[0];
                            if (1 != N.length || 1 !== c.nodeType)throw ia("tplrt", C, "");
                            Q(f, y, c);
                            O = {$attr: {}};
                            N = aa(c, [], O);
                            var V = a.splice(H + 1, a.length - (H + 1));
                            I && J(N);
                            a = a.concat(N).concat(V);
                            lb(d, O);
                            O = a.length
                        } else y.html(N);
                        if (G.templateUrl)Wa("template", Y, G, y), Y = G, G.replace && (g = G), U = E(a.splice(H, a.length - H), y, d, f, D, l, n, {
                            controllerDirectives: L,
                            newIsolateScopeDirective: I,
                            templateDirective: Y,
                            nonTlbTranscludeDirective: B
                        }), O = a.length; else if (G.compile)try {
                            Ha = G.compile(y, d, D), M(Ha) ? A(null, Ha, S, nb) : Ha && A(Ha.pre, Ha.post, S, nb)
                        } catch (W) {
                            k(W, ga(y))
                        }
                        G.terminal && (U.terminal = !0, u = Math.max(u, G.priority))
                    }
                    U.scope = P && !0 === P.scope;
                    U.transclude = Xa && D;
                    t.hasElementTranscludeDirective =
                        z;
                    return U
                }

                function J(a) {
                    for (var b = 0, c = a.length; b < c; b++)a[b] = Ub(a[b], {$$isolateScope: !0})
                }

                function Y(b, d, e, f, m, l, n) {
                    if (d === m)return null;
                    m = null;
                    if (c.hasOwnProperty(d)) {
                        var p;
                        d = a.get(d + "Directive");
                        for (var r = 0, t = d.length; r < t; r++)try {
                            p = d[r], (f === s || f > p.priority) && -1 != p.restrict.indexOf(e) && (l && (p = Ub(p, {
                                $$start: l,
                                $$end: n
                            })), b.push(p), m = p)
                        } catch (A) {
                            k(A)
                        }
                    }
                    return m
                }

                function lb(a, b) {
                    var c = b.$attr, d = a.$attr, e = a.$$element;
                    q(a, function (d, e) {
                        "$" != e.charAt(0) && (b[e] && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e,
                            d, !0, c[e]))
                    });
                    q(b, function (b, f) {
                        "class" == f ? (X(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                    })
                }

                function E(a, b, c, d, e, f, g, m) {
                    var k = [], p, r, t = b[0], A = a.shift(), u = y({}, A, {
                        templateUrl: null,
                        transclude: null,
                        replace: null,
                        $$originalDirective: A
                    }), U = M(A.templateUrl) ? A.templateUrl(b, c) : A.templateUrl;
                    b.empty();
                    l.get(F.getTrustedResourceUrl(U), {cache: n}).success(function (l) {
                        var n,
                            F;
                        l = rc(l);
                        if (A.replace) {
                            l = Db.test(l) ? w(l) : [];
                            n = l[0];
                            if (1 != l.length || 1 !== n.nodeType)throw ia("tplrt", A.name, U);
                            l = {$attr: {}};
                            Q(d, b, n);
                            var v = aa(n, [], l);
                            T(A.scope) && J(v);
                            a = v.concat(a);
                            lb(c, l)
                        } else n = t, b.html(l);
                        a.unshift(u);
                        p = L(a, n, c, e, b, A, f, g, m);
                        q(d, function (a, c) {
                            a == n && (d[c] = b[0])
                        });
                        for (r = I(b[0].childNodes, e); k.length;) {
                            l = k.shift();
                            F = k.shift();
                            var ca = k.shift(), s = k.shift(), v = b[0];
                            if (F !== t) {
                                var Y = F.className;
                                m.hasElementTranscludeDirective && A.replace || (v = Fb(n));
                                Q(ca, w(F), v);
                                X(w(v), Y)
                            }
                            F = p.transclude ? P(l,
                                p.transclude) : s;
                            p(r, l, v, d, F)
                        }
                        k = null
                    }).error(function (a, b, c, d) {
                        throw ia("tpload", d.url);
                    });
                    return function (a, b, c, d, e) {
                        k ? (k.push(b), k.push(c), k.push(d), k.push(e)) : p(r, b, c, d, e)
                    }
                }

                function B(a, b) {
                    var c = b.priority - a.priority;
                    return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
                }

                function Wa(a, b, c, d) {
                    if (b)throw ia("multidir", b.name, c.name, a, ga(d));
                }

                function z(a, c) {
                    var d = b(c, !0);
                    d && a.push({
                        priority: 0, compile: Z(function (a, b) {
                            var c = b.parent(), e = c.data("$binding") || [];
                            e.push(d);
                            X(c.data("$binding",
                                e), "ng-binding");
                            a.$watch(d, function (a) {
                                b[0].nodeValue = a
                            })
                        })
                    })
                }

                function C(a, b) {
                    if ("srcdoc" == b)return F.HTML;
                    var c = Ja(a);
                    if ("xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b))return F.RESOURCE_URL
                }

                function D(a, c, d, e) {
                    var g = b(d, !0);
                    if (g) {
                        if ("multiple" === e && "SELECT" === Ja(a))throw ia("selmulti", ga(a));
                        c.push({
                            priority: 100, compile: function () {
                                return {
                                    pre: function (c, d, k) {
                                        d = k.$$observers || (k.$$observers = {});
                                        if (f.test(e))throw ia("nodomevents");
                                        if (g = b(k[e], !0, C(a, e)))k[e] = g(c), (d[e] ||
                                        (d[e] = [])).$$inter = !0, (k.$$observers && k.$$observers[e].$$scope || c).$watch(g, function (a, b) {
                                            "class" === e && a != b ? k.$updateClass(a, b) : k.$set(e, a)
                                        })
                                    }
                                }
                            }
                        })
                    }
                }

                function Q(a, b, c) {
                    var d = b[0], e = b.length, f = d.parentNode, g, k;
                    if (a)for (g = 0, k = a.length; g < k; g++)if (a[g] == d) {
                        a[g++] = c;
                        k = g + e - 1;
                        for (var m = a.length; g < m; g++, k++)k < m ? a[g] = a[k] : delete a[g];
                        a.length -= e - 1;
                        break
                    }
                    f && f.replaceChild(c, d);
                    a = R.createDocumentFragment();
                    a.appendChild(d);
                    c[w.expando] = d[w.expando];
                    d = 1;
                    for (e = b.length; d < e; d++)f = b[d], w(f).remove(), a.appendChild(f),
                        delete b[d];
                    b[0] = c;
                    b.length = 1
                }

                function qc(a, b) {
                    return y(function () {
                        return a.apply(null, arguments)
                    }, a, b)
                }

                var Ib = function (a, b) {
                    this.$$element = a;
                    this.$attr = b || {}
                };
                Ib.prototype = {
                    $normalize: ma, $addClass: function (a) {
                        a && 0 < a.length && u.addClass(this.$$element, a)
                    }, $removeClass: function (a) {
                        a && 0 < a.length && u.removeClass(this.$$element, a)
                    }, $updateClass: function (a, b) {
                        var c = sc(a, b), d = sc(b, a);
                        0 === c.length ? u.removeClass(this.$$element, d) : 0 === d.length ? u.addClass(this.$$element, c) : u.setClass(this.$$element, c, d)
                    }, $set: function (a,
                                       b, c, d) {
                        var e = nc(this.$$element[0], a);
                        e && (this.$$element.prop(a, b), d = e);
                        this[a] = b;
                        d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = fb(a, "-"));
                        e = Ja(this.$$element);
                        if ("A" === e && "href" === a || "IMG" === e && "src" === a)this[a] = b = U(b, "src" === a);
                        !1 !== c && (null === b || b === s ? this.$$element.removeAttr(d) : this.$$element.attr(d, b));
                        (c = this.$$observers) && q(c[a], function (a) {
                            try {
                                a(b)
                            } catch (c) {
                                k(c)
                            }
                        })
                    }, $observe: function (a, b) {
                        var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
                        e.push(b);
                        t.$evalAsync(function () {
                            e.$$inter ||
                            b(c[a])
                        });
                        return b
                    }
                };
                var Xa = b.startSymbol(), N = b.endSymbol(), rc = "{{" == Xa || "}}" == N ? Ba : function (a) {
                    return a.replace(/\{\{/g, Xa).replace(/}}/g, N)
                }, H = /^ngAttr[A-Z]/;
                return v
            }]
    }

    function ma(b) {
        return Sa(b.replace(ue, ""))
    }

    function sc(b, a) {
        var c = "", d = b.split(/\s+/), e = a.split(/\s+/), f = 0;
        a:for (; f < d.length; f++) {
            for (var h = d[f], g = 0; g < e.length; g++)if (h == e[g])continue a;
            c += (0 < c.length ? " " : "") + h
        }
        return c
    }

    function Pd() {
        var b = {}, a = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function (a, d) {
            ya(a, "controller");
            T(a) ? y(b, a) :
                b[a] = d
        };
        this.$get = ["$injector", "$window", function (c, d) {
            return function (e, f) {
                var h, g, m;
                x(e) && (h = e.match(a), g = h[1], m = h[3], e = b.hasOwnProperty(g) ? b[g] : cc(f.$scope, g, !0) || cc(d, g, !0), Qa(e, g, !0));
                h = c.instantiate(e, f);
                if (m) {
                    if (!f || "object" != typeof f.$scope)throw D("$controller")("noscp", g || e.name, m);
                    f.$scope[m] = h
                }
                return h
            }
        }]
    }

    function Qd() {
        this.$get = ["$window", function (b) {
            return w(b.document)
        }]
    }

    function Rd() {
        this.$get = ["$log", function (b) {
            return function (a, c) {
                b.error.apply(b, arguments)
            }
        }]
    }

    function tc(b) {
        var a =
        {}, c, d, e;
        if (!b)return a;
        q(b.split("\n"), function (b) {
            e = b.indexOf(":");
            c = C(ba(b.substr(0, e)));
            d = ba(b.substr(e + 1));
            c && (a[c] = a[c] ? a[c] + (", " + d) : d)
        });
        return a
    }

    function uc(b) {
        var a = T(b) ? b : s;
        return function (c) {
            a || (a = tc(b));
            return c ? a[C(c)] || null : a
        }
    }

    function vc(b, a, c) {
        if (M(c))return c(b, a);
        q(c, function (c) {
            b = c(b, a)
        });
        return b
    }

    function Ud() {
        var b = /^\s*(\[|\{[^\{])/, a = /[\}\]]\s*$/, c = /^\)\]\}',?\n/, d = {"Content-Type": "application/json;charset=utf-8"}, e = this.defaults = {
            transformResponse: [function (d) {
                x(d) && (d = d.replace(c,
                    ""), b.test(d) && a.test(d) && (d = Xb(d)));
                return d
            }],
            transformRequest: [function (a) {
                return T(a) && "[object File]" !== ua.call(a) && "[object Blob]" !== ua.call(a) ? pa(a) : a
            }],
            headers: {common: {Accept: "application/json, text/plain, */*"}, post: $(d), put: $(d), patch: $(d)},
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, f = this.interceptors = [], h = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (a, b, c, d, n, r) {
            function p(a) {
                function c(a) {
                    var b =
                        y({}, a, {data: vc(a.data, a.headers, d.transformResponse)});
                    return 200 <= a.status && 300 > a.status ? b : n.reject(b)
                }

                var d = {
                    method: "get",
                    transformRequest: e.transformRequest,
                    transformResponse: e.transformResponse
                }, f = function (a) {
                    function b(a) {
                        var c;
                        q(a, function (b, d) {
                            M(b) && (c = b(), null != c ? a[d] = c : delete a[d])
                        })
                    }

                    var c = e.headers, d = y({}, a.headers), f, g, c = y({}, c.common, c[C(a.method)]);
                    b(c);
                    b(d);
                    a:for (f in c) {
                        a = C(f);
                        for (g in d)if (C(g) === a)continue a;
                        d[f] = c[f]
                    }
                    return d
                }(a);
                y(d, a);
                d.headers = f;
                d.method = Da(d.method);
                (a = Jb(d.url) ?
                    b.cookies()[d.xsrfCookieName || e.xsrfCookieName] : s) && (f[d.xsrfHeaderName || e.xsrfHeaderName] = a);
                var g = [function (a) {
                    f = a.headers;
                    var b = vc(a.data, uc(f), a.transformRequest);
                    z(a.data) && q(f, function (a, b) {
                        "content-type" === C(b) && delete f[b]
                    });
                    z(a.withCredentials) && !z(e.withCredentials) && (a.withCredentials = e.withCredentials);
                    return t(a, b, f).then(c, c)
                }, s], k = n.when(d);
                for (q(u, function (a) {
                    (a.request || a.requestError) && g.unshift(a.request, a.requestError);
                    (a.response || a.responseError) && g.push(a.response, a.responseError)
                }); g.length;) {
                    a =
                        g.shift();
                    var h = g.shift(), k = k.then(a, h)
                }
                k.success = function (a) {
                    k.then(function (b) {
                        a(b.data, b.status, b.headers, d)
                    });
                    return k
                };
                k.error = function (a) {
                    k.then(null, function (b) {
                        a(b.data, b.status, b.headers, d)
                    });
                    return k
                };
                return k
            }

            function t(b, c, f) {
                function k(a, b, c, e) {
                    u && (200 <= a && 300 > a ? u.put(s, [a, b, tc(c), e]) : u.remove(s));
                    h(b, a, c, e);
                    d.$$phase || d.$apply()
                }

                function h(a, c, d, e) {
                    c = Math.max(c, 0);
                    (200 <= c && 300 > c ? r.resolve : r.reject)({
                        data: a,
                        status: c,
                        headers: uc(d),
                        config: b,
                        statusText: e
                    })
                }

                function m() {
                    var a = db(p.pendingRequests,
                        b);
                    -1 !== a && p.pendingRequests.splice(a, 1)
                }

                var r = n.defer(), t = r.promise, u, q, s = A(b.url, b.params);
                p.pendingRequests.push(b);
                t.then(m, m);
                (b.cache || e.cache) && !1 !== b.cache && "GET" == b.method && (u = T(b.cache) ? b.cache : T(e.cache) ? e.cache : F);
                if (u)if (q = u.get(s), E(q)) {
                    if (q.then)return q.then(m, m), q;
                    K(q) ? h(q[1], q[0], $(q[2]), q[3]) : h(q, 200, {}, "OK")
                } else u.put(s, t);
                z(q) && a(b.method, s, c, k, f, b.timeout, b.withCredentials, b.responseType);
                return t
            }

            function A(a, b) {
                if (!b)return a;
                var c = [];
                Tc(b, function (a, b) {
                    null === a || z(a) || (K(a) ||
                    (a = [a]), q(a, function (a) {
                        T(a) && (a = pa(a));
                        c.push(xa(b) + "=" + xa(a))
                    }))
                });
                0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&"));
                return a
            }

            var F = c("$http"), u = [];
            q(f, function (a) {
                u.unshift(x(a) ? r.get(a) : r.invoke(a))
            });
            q(h, function (a, b) {
                var c = x(a) ? r.get(a) : r.invoke(a);
                u.splice(b, 0, {
                    response: function (a) {
                        return c(n.when(a))
                    }, responseError: function (a) {
                        return c(n.reject(a))
                    }
                })
            });
            p.pendingRequests = [];
            (function (a) {
                q(arguments, function (a) {
                    p[a] = function (b, c) {
                        return p(y(c || {}, {method: a, url: b}))
                    }
                })
            })("get", "delete",
                "head", "jsonp");
            (function (a) {
                q(arguments, function (a) {
                    p[a] = function (b, c, d) {
                        return p(y(d || {}, {method: a, url: b, data: c}))
                    }
                })
            })("post", "put");
            p.defaults = e;
            return p
        }]
    }

    function ve(b) {
        if (8 >= O && (!b.match(/^(get|post|head|put|delete|options)$/i) || !Q.XMLHttpRequest))return new Q.ActiveXObject("Microsoft.XMLHTTP");
        if (Q.XMLHttpRequest)return new Q.XMLHttpRequest;
        throw D("$httpBackend")("noxhr");
    }

    function Vd() {
        this.$get = ["$browser", "$window", "$document", function (b, a, c) {
            return we(b, ve, b.defer, a.angular.callbacks,
                c[0])
        }]
    }

    function we(b, a, c, d, e) {
        function f(a, b) {
            var c = e.createElement("script"), d = function () {
                c.onreadystatechange = c.onload = c.onerror = null;
                e.body.removeChild(c);
                b && b()
            };
            c.type = "text/javascript";
            c.src = a;
            O && 8 >= O ? c.onreadystatechange = function () {
                /loaded|complete/.test(c.readyState) && d()
            } : c.onload = c.onerror = function () {
                d()
            };
            e.body.appendChild(c);
            return d
        }

        return function (e, g, m, k, l, n, r, p) {
            function t() {
                F = -1;
                U && U();
                v && v.abort()
            }

            function A(a, d, e, f, k) {
                I && c.cancel(I);
                U = v = null;
                0 === d && (d = e ? 200 : "file" == qa(g).protocol ?
                    404 : 0);
                a(1223 === d ? 204 : d, e, f, k || "");
                b.$$completeOutstandingRequest(B)
            }

            var F;
            b.$$incOutstandingRequestCount();
            g = g || b.url();
            if ("jsonp" == C(e)) {
                var u = "_" + (d.counter++).toString(36);
                d[u] = function (a) {
                    d[u].data = a
                };
                var U = f(g.replace("JSON_CALLBACK", "angular.callbacks." + u), function () {
                    d[u].data ? A(k, 200, d[u].data) : A(k, F || -2);
                    d[u] = Ca.noop
                })
            } else {
                var v = a(e);
                v.open(e, g, !0);
                q(l, function (a, b) {
                    E(a) && v.setRequestHeader(b, a)
                });
                v.onreadystatechange = function () {
                    if (v && 4 == v.readyState) {
                        var a = null, b = null;
                        -1 !== F && (a = v.getAllResponseHeaders(),
                            b = "response" in v ? v.response : v.responseText);
                        A(k, F || v.status, b, a, v.statusText || "")
                    }
                };
                r && (v.withCredentials = !0);
                if (p)try {
                    v.responseType = p
                } catch (X) {
                    if ("json" !== p)throw X;
                }
                v.send(m || null)
            }
            if (0 < n)var I = c(t, n); else n && n.then && n.then(t)
        }
    }

    function Sd() {
        var b = "{{", a = "}}";
        this.startSymbol = function (a) {
            return a ? (b = a, this) : b
        };
        this.endSymbol = function (b) {
            return b ? (a = b, this) : a
        };
        this.$get = ["$parse", "$exceptionHandler", "$sce", function (c, d, e) {
            function f(f, k, l) {
                for (var n, r, p = 0, t = [], A = f.length, F = !1, u = []; p < A;)-1 != (n = f.indexOf(b,
                    p)) && -1 != (r = f.indexOf(a, n + h)) ? (p != n && t.push(f.substring(p, n)), t.push(p = c(F = f.substring(n + h, r))), p.exp = F, p = r + g, F = !0) : (p != A && t.push(f.substring(p)), p = A);
                (A = t.length) || (t.push(""), A = 1);
                if (l && 1 < t.length)throw wc("noconcat", f);
                if (!k || F)return u.length = A, p = function (a) {
                    try {
                        for (var b = 0, c = A, g; b < c; b++)"function" == typeof(g = t[b]) && (g = g(a), g = l ? e.getTrusted(l, g) : e.valueOf(g), null === g || z(g) ? g = "" : "string" != typeof g && (g = pa(g))), u[b] = g;
                        return u.join("")
                    } catch (k) {
                        a = wc("interr", f, k.toString()), d(a)
                    }
                }, p.exp = f, p.parts =
                    t, p
            }

            var h = b.length, g = a.length;
            f.startSymbol = function () {
                return b
            };
            f.endSymbol = function () {
                return a
            };
            return f
        }]
    }

    function Td() {
        this.$get = ["$rootScope", "$window", "$q", function (b, a, c) {
            function d(d, h, g, m) {
                var k = a.setInterval, l = a.clearInterval, n = c.defer(), r = n.promise, p = 0, t = E(m) && !m;
                g = E(g) ? g : 0;
                r.then(null, null, d);
                r.$$intervalId = k(function () {
                    n.notify(p++);
                    0 < g && p >= g && (n.resolve(p), l(r.$$intervalId), delete e[r.$$intervalId]);
                    t || b.$apply()
                }, h);
                e[r.$$intervalId] = n;
                return r
            }

            var e = {};
            d.cancel = function (a) {
                return a &&
                a.$$intervalId in e ? (e[a.$$intervalId].reject("canceled"), clearInterval(a.$$intervalId), delete e[a.$$intervalId], !0) : !1
            };
            return d
        }]
    }

    function bd() {
        this.$get = function () {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "\u00a4",
                        posSuf: "",
                        negPre: "(\u00a4",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January February March April May June July August September October November December".split(" "),
                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function (b) {
                    return 1 === b ? "one" : "other"
                }
            }
        }
    }

    function xc(b) {
        b = b.split("/");
        for (var a = b.length; a--;)b[a] =
            xb(b[a]);
        return b.join("/")
    }

    function yc(b, a, c) {
        b = qa(b, c);
        a.$$protocol = b.protocol;
        a.$$host = b.hostname;
        a.$$port = S(b.port) || xe[b.protocol] || null
    }

    function zc(b, a, c) {
        var d = "/" !== b.charAt(0);
        d && (b = "/" + b);
        b = qa(b, c);
        a.$$path = decodeURIComponent(d && "/" === b.pathname.charAt(0) ? b.pathname.substring(1) : b.pathname);
        a.$$search = Zb(b.search);
        a.$$hash = decodeURIComponent(b.hash);
        a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path)
    }

    function na(b, a) {
        if (0 === a.indexOf(b))return a.substr(b.length)
    }

    function Ya(b) {
        var a =
            b.indexOf("#");
        return -1 == a ? b : b.substr(0, a)
    }

    function Kb(b) {
        return b.substr(0, Ya(b).lastIndexOf("/") + 1)
    }

    function Ac(b, a) {
        this.$$html5 = !0;
        a = a || "";
        var c = Kb(b);
        yc(b, this, b);
        this.$$parse = function (a) {
            var e = na(c, a);
            if (!x(e))throw Lb("ipthprfx", a, c);
            zc(e, this, b);
            this.$$path || (this.$$path = "/");
            this.$$compose()
        };
        this.$$compose = function () {
            var a = $b(this.$$search), b = this.$$hash ? "#" + xb(this.$$hash) : "";
            this.$$url = xc(this.$$path) + (a ? "?" + a : "") + b;
            this.$$absUrl = c + this.$$url.substr(1)
        };
        this.$$rewrite = function (d) {
            var e;
            if ((e = na(b, d)) !== s)return d = e, (e = na(a, e)) !== s ? c + (na("/", e) || e) : b + d;
            if ((e = na(c, d)) !== s)return c + e;
            if (c == d + "/")return c
        }
    }

    function Mb(b, a) {
        var c = Kb(b);
        yc(b, this, b);
        this.$$parse = function (d) {
            var e = na(b, d) || na(c, d), e = "#" == e.charAt(0) ? na(a, e) : this.$$html5 ? e : "";
            if (!x(e))throw Lb("ihshprfx", d, a);
            zc(e, this, b);
            d = this.$$path;
            var f = /^\/?.*?:(\/.*)/;
            0 === e.indexOf(b) && (e = e.replace(b, ""));
            f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d);
            this.$$path = d;
            this.$$compose()
        };
        this.$$compose = function () {
            var c = $b(this.$$search), e = this.$$hash ?
            "#" + xb(this.$$hash) : "";
            this.$$url = xc(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + (this.$$url ? a + this.$$url : "")
        };
        this.$$rewrite = function (a) {
            if (Ya(b) == Ya(a))return a
        }
    }

    function Bc(b, a) {
        this.$$html5 = !0;
        Mb.apply(this, arguments);
        var c = Kb(b);
        this.$$rewrite = function (d) {
            var e;
            if (b == Ya(d))return d;
            if (e = na(c, d))return b + a + e;
            if (c === d + "/")return c
        }
    }

    function ob(b) {
        return function () {
            return this[b]
        }
    }

    function Cc(b, a) {
        return function (c) {
            if (z(c))return this[b];
            this[b] = a(c);
            this.$$compose();
            return this
        }
    }

    function Wd() {
        var b =
            "", a = !1;
        this.hashPrefix = function (a) {
            return E(a) ? (b = a, this) : b
        };
        this.html5Mode = function (b) {
            return E(b) ? (a = b, this) : a
        };
        this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (c, d, e, f) {
            function h(a) {
                c.$broadcast("$locationChangeSuccess", g.absUrl(), a)
            }

            var g, m = d.baseHref(), k = d.url();
            a ? (m = k.substring(0, k.indexOf("/", k.indexOf("//") + 2)) + (m || "/"), e = e.history ? Ac : Bc) : (m = Ya(k), e = Mb);
            g = new e(m, "#" + b);
            g.$$parse(g.$$rewrite(k));
            f.on("click", function (a) {
                if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
                    for (var b =
                        w(a.target); "a" !== C(b[0].nodeName);)if (b[0] === f[0] || !(b = b.parent())[0])return;
                    var e = b.prop("href");
                    T(e) && "[object SVGAnimatedString]" === e.toString() && (e = qa(e.animVal).href);
                    var k = g.$$rewrite(e);
                    e && !b.attr("target") && k && !a.isDefaultPrevented() && (a.preventDefault(), k != d.url() && (g.$$parse(k), c.$apply(), Q.angular["ff-684208-preventDefault"] = !0))
                }
            });
            g.absUrl() != k && d.url(g.absUrl(), !0);
            d.onUrlChange(function (a) {
                g.absUrl() != a && (c.$evalAsync(function () {
                    var b = g.absUrl();
                    g.$$parse(a);
                    c.$broadcast("$locationChangeStart",
                        a, b).defaultPrevented ? (g.$$parse(b), d.url(b)) : h(b)
                }), c.$$phase || c.$digest())
            });
            var l = 0;
            c.$watch(function () {
                var a = d.url(), b = g.$$replace;
                l && a == g.absUrl() || (l++, c.$evalAsync(function () {
                    c.$broadcast("$locationChangeStart", g.absUrl(), a).defaultPrevented ? g.$$parse(a) : (d.url(g.absUrl(), b), h(a))
                }));
                g.$$replace = !1;
                return l
            });
            return g
        }]
    }

    function Xd() {
        var b = !0, a = this;
        this.debugEnabled = function (a) {
            return E(a) ? (b = a, this) : b
        };
        this.$get = ["$window", function (c) {
            function d(a) {
                a instanceof Error && (a.stack ? a = a.message &&
                -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));
                return a
            }

            function e(a) {
                var b = c.console || {}, e = b[a] || b.log || B;
                a = !1;
                try {
                    a = !!e.apply
                } catch (m) {
                }
                return a ? function () {
                    var a = [];
                    q(arguments, function (b) {
                        a.push(d(b))
                    });
                    return e.apply(b, a)
                } : function (a, b) {
                    e(a, null == b ? "" : b)
                }
            }

            return {
                log: e("log"), info: e("info"), warn: e("warn"), error: e("error"), debug: function () {
                    var c = e("debug");
                    return function () {
                        b && c.apply(a, arguments)
                    }
                }()
            }
        }]
    }

    function ea(b,
                a) {
        if ("constructor" === b)throw za("isecfld", a);
        return b
    }

    function Za(b, a) {
        if (b) {
            if (b.constructor === b)throw za("isecfn", a);
            if (b.document && b.location && b.alert && b.setInterval)throw za("isecwindow", a);
            if (b.children && (b.nodeName || b.prop && b.attr && b.find))throw za("isecdom", a);
        }
        return b
    }

    function pb(b, a, c, d, e) {
        e = e || {};
        a = a.split(".");
        for (var f, h = 0; 1 < a.length; h++) {
            f = ea(a.shift(), d);
            var g = b[f];
            g || (g = {}, b[f] = g);
            b = g;
            b.then && e.unwrapPromises && (ra(d), "$$v" in b || function (a) {
                a.then(function (b) {
                    a.$$v = b
                })
            }(b), b.$$v ===
            s && (b.$$v = {}), b = b.$$v)
        }
        f = ea(a.shift(), d);
        return b[f] = c
    }

    function Dc(b, a, c, d, e, f, h) {
        ea(b, f);
        ea(a, f);
        ea(c, f);
        ea(d, f);
        ea(e, f);
        return h.unwrapPromises ? function (g, h) {
            var k = h && h.hasOwnProperty(b) ? h : g, l;
            if (null == k)return k;
            (k = k[b]) && k.then && (ra(f), "$$v" in k || (l = k, l.$$v = s, l.then(function (a) {
                l.$$v = a
            })), k = k.$$v);
            if (!a)return k;
            if (null == k)return s;
            (k = k[a]) && k.then && (ra(f), "$$v" in k || (l = k, l.$$v = s, l.then(function (a) {
                l.$$v = a
            })), k = k.$$v);
            if (!c)return k;
            if (null == k)return s;
            (k = k[c]) && k.then && (ra(f), "$$v" in k || (l = k,
                l.$$v = s, l.then(function (a) {
                l.$$v = a
            })), k = k.$$v);
            if (!d)return k;
            if (null == k)return s;
            (k = k[d]) && k.then && (ra(f), "$$v" in k || (l = k, l.$$v = s, l.then(function (a) {
                l.$$v = a
            })), k = k.$$v);
            if (!e)return k;
            if (null == k)return s;
            (k = k[e]) && k.then && (ra(f), "$$v" in k || (l = k, l.$$v = s, l.then(function (a) {
                l.$$v = a
            })), k = k.$$v);
            return k
        } : function (f, h) {
            var k = h && h.hasOwnProperty(b) ? h : f;
            if (null == k)return k;
            k = k[b];
            if (!a)return k;
            if (null == k)return s;
            k = k[a];
            if (!c)return k;
            if (null == k)return s;
            k = k[c];
            if (!d)return k;
            if (null == k)return s;
            k = k[d];
            return e ? null == k ? s : k[e] : k
        }
    }

    function ye(b, a) {
        ea(b, a);
        return function (a, d) {
            return null == a ? s : (d && d.hasOwnProperty(b) ? d : a)[b]
        }
    }

    function ze(b, a, c) {
        ea(b, c);
        ea(a, c);
        return function (c, e) {
            if (null == c)return s;
            c = (e && e.hasOwnProperty(b) ? e : c)[b];
            return null == c ? s : c[a]
        }
    }

    function Ec(b, a, c) {
        if (Nb.hasOwnProperty(b))return Nb[b];
        var d = b.split("."), e = d.length, f;
        if (a.unwrapPromises || 1 !== e)if (a.unwrapPromises || 2 !== e)if (a.csp)f = 6 > e ? Dc(d[0], d[1], d[2], d[3], d[4], c, a) : function (b, f) {
            var g = 0, h;
            do h = Dc(d[g++], d[g++], d[g++], d[g++],
                d[g++], c, a)(b, f), f = s, b = h; while (g < e);
            return h
        }; else {
            var h = "var p;\n";
            q(d, function (b, d) {
                ea(b, c);
                h += "if(s == null) return undefined;\ns=" + (d ? "s" : '((k&&k.hasOwnProperty("' + b + '"))?k:s)') + '["' + b + '"];\n' + (a.unwrapPromises ? 'if (s && s.then) {\n pw("' + c.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
            });
            var h = h + "return s;", g = new Function("s", "k", "pw", h);
            g.toString = Z(h);
            f = a.unwrapPromises ? function (a, b) {
                return g(a, b,
                    ra)
            } : g
        } else f = ze(d[0], d[1], c); else f = ye(d[0], c);
        "hasOwnProperty" !== b && (Nb[b] = f);
        return f
    }

    function Yd() {
        var b = {}, a = {csp: !1, unwrapPromises: !1, logPromiseWarnings: !0};
        this.unwrapPromises = function (b) {
            return E(b) ? (a.unwrapPromises = !!b, this) : a.unwrapPromises
        };
        this.logPromiseWarnings = function (b) {
            return E(b) ? (a.logPromiseWarnings = b, this) : a.logPromiseWarnings
        };
        this.$get = ["$filter", "$sniffer", "$log", function (c, d, e) {
            a.csp = d.csp;
            ra = function (b) {
                a.logPromiseWarnings && !Fc.hasOwnProperty(b) && (Fc[b] = !0, e.warn("[$parse] Promise found in the expression `" +
                    b + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
            };
            return function (d) {
                var e;
                switch (typeof d) {
                    case "string":
                        if (b.hasOwnProperty(d))return b[d];
                        e = new Ob(a);
                        e = (new $a(e, c, a)).parse(d, !1);
                        "hasOwnProperty" !== d && (b[d] = e);
                        return e;
                    case "function":
                        return d;
                    default:
                        return B
                }
            }
        }]
    }

    function $d() {
        this.$get = ["$rootScope", "$exceptionHandler", function (b, a) {
            return Ae(function (a) {
                b.$evalAsync(a)
            }, a)
        }]
    }

    function Ae(b, a) {
        function c(a) {
            return a
        }

        function d(a) {
            return h(a)
        }

        var e = function () {
            var h =
                [], k, l;
            return l = {
                resolve: function (a) {
                    if (h) {
                        var c = h;
                        h = s;
                        k = f(a);
                        c.length && b(function () {
                            for (var a, b = 0, d = c.length; b < d; b++)a = c[b], k.then(a[0], a[1], a[2])
                        })
                    }
                }, reject: function (a) {
                    l.resolve(g(a))
                }, notify: function (a) {
                    if (h) {
                        var c = h;
                        h.length && b(function () {
                            for (var b, d = 0, e = c.length; d < e; d++)b = c[d], b[2](a)
                        })
                    }
                }, promise: {
                    then: function (b, f, g) {
                        var l = e(), A = function (d) {
                            try {
                                l.resolve((M(b) ? b : c)(d))
                            } catch (e) {
                                l.reject(e), a(e)
                            }
                        }, F = function (b) {
                            try {
                                l.resolve((M(f) ? f : d)(b))
                            } catch (c) {
                                l.reject(c), a(c)
                            }
                        }, u = function (b) {
                            try {
                                l.notify((M(g) ?
                                    g : c)(b))
                            } catch (d) {
                                a(d)
                            }
                        };
                        h ? h.push([A, F, u]) : k.then(A, F, u);
                        return l.promise
                    }, "catch": function (a) {
                        return this.then(null, a)
                    }, "finally": function (a) {
                        function b(a, c) {
                            var d = e();
                            c ? d.resolve(a) : d.reject(a);
                            return d.promise
                        }

                        function d(e, f) {
                            var g = null;
                            try {
                                g = (a || c)()
                            } catch (h) {
                                return b(h, !1)
                            }
                            return g && M(g.then) ? g.then(function () {
                                return b(e, f)
                            }, function (a) {
                                return b(a, !1)
                            }) : b(e, f)
                        }

                        return this.then(function (a) {
                            return d(a, !0)
                        }, function (a) {
                            return d(a, !1)
                        })
                    }
                }
            }
        }, f = function (a) {
            return a && M(a.then) ? a : {
                then: function (c) {
                    var d =
                        e();
                    b(function () {
                        d.resolve(c(a))
                    });
                    return d.promise
                }
            }
        }, h = function (a) {
            var b = e();
            b.reject(a);
            return b.promise
        }, g = function (c) {
            return {
                then: function (f, g) {
                    var h = e();
                    b(function () {
                        try {
                            h.resolve((M(g) ? g : d)(c))
                        } catch (b) {
                            h.reject(b), a(b)
                        }
                    });
                    return h.promise
                }
            }
        };
        return {
            defer: e, reject: h, when: function (g, k, l, n) {
                var r = e(), p, t = function (b) {
                    try {
                        return (M(k) ? k : c)(b)
                    } catch (d) {
                        return a(d), h(d)
                    }
                }, A = function (b) {
                    try {
                        return (M(l) ? l : d)(b)
                    } catch (c) {
                        return a(c), h(c)
                    }
                }, F = function (b) {
                    try {
                        return (M(n) ? n : c)(b)
                    } catch (d) {
                        a(d)
                    }
                };
                b(function () {
                    f(g).then(function (a) {
                        p ||
                        (p = !0, r.resolve(f(a).then(t, A, F)))
                    }, function (a) {
                        p || (p = !0, r.resolve(A(a)))
                    }, function (a) {
                        p || r.notify(F(a))
                    })
                });
                return r.promise
            }, all: function (a) {
                var b = e(), c = 0, d = K(a) ? [] : {};
                q(a, function (a, e) {
                    c++;
                    f(a).then(function (a) {
                        d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
                    }, function (a) {
                        d.hasOwnProperty(e) || b.reject(a)
                    })
                });
                0 === c && b.resolve(d);
                return b.promise
            }
        }
    }

    function ge() {
        this.$get = ["$window", "$timeout", function (b, a) {
            var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame, d =
                b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function (a) {
                var b = c(a);
                return function () {
                    d(b)
                }
            } : function (b) {
                var c = a(b, 16.66, !1);
                return function () {
                    a.cancel(c)
                }
            };
            f.supported = e;
            return f
        }]
    }

    function Zd() {
        var b = 10, a = D("$rootScope"), c = null;
        this.digestTtl = function (a) {
            arguments.length && (b = a);
            return b
        };
        this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (d, e, f, h) {
            function g() {
                this.$id = bb();
                this.$$phase = this.$parent =
                    this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this["this"] = this.$root = this;
                this.$$destroyed = !1;
                this.$$asyncQueue = [];
                this.$$postDigestQueue = [];
                this.$$listeners = {};
                this.$$listenerCount = {};
                this.$$isolateBindings = {}
            }

            function m(b) {
                if (r.$$phase)throw a("inprog", r.$$phase);
                r.$$phase = b
            }

            function k(a, b) {
                var c = f(a);
                Qa(c, b);
                return c
            }

            function l(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent)
            }

            function n() {
            }

            g.prototype = {
                constructor: g, $new: function (a) {
                    a ? (a = new g, a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (a = function () {
                    }, a.prototype = this, a = new a, a.$id = bb());
                    a["this"] = a;
                    a.$$listeners = {};
                    a.$$listenerCount = {};
                    a.$parent = this;
                    a.$$watchers = a.$$nextSibling = a.$$childHead = a.$$childTail = null;
                    a.$$prevSibling = this.$$childTail;
                    this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a;
                    return a
                }, $watch: function (a, b, d) {
                    var e =
                        k(a, "watch"), f = this.$$watchers, g = {fn: b, last: n, get: e, exp: a, eq: !!d};
                    c = null;
                    if (!M(b)) {
                        var h = k(b || B, "listener");
                        g.fn = function (a, b, c) {
                            h(c)
                        }
                    }
                    if ("string" == typeof a && e.constant) {
                        var m = g.fn;
                        g.fn = function (a, b, c) {
                            m.call(this, a, b, c);
                            Na(f, g)
                        }
                    }
                    f || (f = this.$$watchers = []);
                    f.unshift(g);
                    return function () {
                        Na(f, g);
                        c = null
                    }
                }, $watchCollection: function (a, b) {
                    var c = this, d, e, g, h = 1 < b.length, k = 0, m = f(a), l = [], n = {}, r = !0, q = 0;
                    return this.$watch(function () {
                        d = m(c);
                        var a, b;
                        if (T(d))if (ab(d))for (e !== l && (e = l, q = e.length = 0, k++), a = d.length,
                                                q !== a && (k++, e.length = q = a), b = 0; b < a; b++)e[b] !== e[b] && d[b] !== d[b] || e[b] === d[b] || (k++, e[b] = d[b]); else {
                            e !== n && (e = n = {}, q = 0, k++);
                            a = 0;
                            for (b in d)d.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? e[b] !== d[b] && (k++, e[b] = d[b]) : (q++, e[b] = d[b], k++));
                            if (q > a)for (b in k++, e)e.hasOwnProperty(b) && !d.hasOwnProperty(b) && (q--, delete e[b])
                        } else e !== d && (e = d, k++);
                        return k
                    }, function () {
                        r ? (r = !1, b(d, d, c)) : b(d, g, c);
                        if (h)if (T(d))if (ab(d)) {
                            g = Array(d.length);
                            for (var a = 0; a < d.length; a++)g[a] = d[a]
                        } else for (a in g = {}, d)Gc.call(d, a) && (g[a] =
                            d[a]); else g = d
                    })
                }, $digest: function () {
                    var d, f, g, h, k = this.$$asyncQueue, l = this.$$postDigestQueue, q, s, I = b, P, w = [], y, E, L;
                    m("$digest");
                    c = null;
                    do {
                        s = !1;
                        for (P = this; k.length;) {
                            try {
                                L = k.shift(), L.scope.$eval(L.expression)
                            } catch (J) {
                                r.$$phase = null, e(J)
                            }
                            c = null
                        }
                        a:do {
                            if (h = P.$$watchers)for (q = h.length; q--;)try {
                                if (d = h[q])if ((f = d.get(P)) !== (g = d.last) && !(d.eq ? va(f, g) : "number" == typeof f && "number" == typeof g && isNaN(f) && isNaN(g)))s = !0, c = d, d.last = d.eq ? $(f) : f, d.fn(f, g === n ? f : g, P), 5 > I && (y = 4 - I, w[y] || (w[y] = []), E = M(d.exp) ? "fn: " +
                                (d.exp.name || d.exp.toString()) : d.exp, E += "; newVal: " + pa(f) + "; oldVal: " + pa(g), w[y].push(E)); else if (d === c) {
                                    s = !1;
                                    break a
                                }
                            } catch (Y) {
                                r.$$phase = null, e(Y)
                            }
                            if (!(h = P.$$childHead || P !== this && P.$$nextSibling))for (; P !== this && !(h = P.$$nextSibling);)P = P.$parent
                        } while (P = h);
                        if ((s || k.length) && !I--)throw r.$$phase = null, a("infdig", b, pa(w));
                    } while (s || k.length);
                    for (r.$$phase = null; l.length;)try {
                        l.shift()()
                    } catch (B) {
                        e(B)
                    }
                }, $destroy: function () {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy");
                        this.$$destroyed = !0;
                        this !== r && (q(this.$$listenerCount, eb(null, l, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy =
                            this.$digest = this.$apply = B, this.$on = this.$watch = function () {
                            return B
                        })
                    }
                }, $eval: function (a, b) {
                    return f(a)(this, b)
                }, $evalAsync: function (a) {
                    r.$$phase || r.$$asyncQueue.length || h.defer(function () {
                        r.$$asyncQueue.length && r.$digest()
                    });
                    this.$$asyncQueue.push({scope: this, expression: a})
                }, $$postDigest: function (a) {
                    this.$$postDigestQueue.push(a)
                }, $apply: function (a) {
                    try {
                        return m("$apply"), this.$eval(a)
                    } catch (b) {
                        e(b)
                    } finally {
                        r.$$phase = null;
                        try {
                            r.$digest()
                        } catch (c) {
                            throw e(c), c;
                        }
                    }
                }, $on: function (a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []);
                    c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function () {
                        c[db(c, b)] = null;
                        l(e, 1, a)
                    }
                }, $emit: function (a, b) {
                    var c = [], d, f = this, g = !1, h = {
                        name: a, targetScope: f, stopPropagation: function () {
                            g = !0
                        }, preventDefault: function () {
                            h.defaultPrevented = !0
                        }, defaultPrevented: !1
                    }, k = [h].concat(wa.call(arguments, 1)), m, l;
                    do {
                        d = f.$$listeners[a] || c;
                        h.currentScope = f;
                        m = 0;
                        for (l = d.length; m < l; m++)if (d[m])try {
                            d[m].apply(null,
                                k)
                        } catch (n) {
                            e(n)
                        } else d.splice(m, 1), m--, l--;
                        if (g)break;
                        f = f.$parent
                    } while (f);
                    return h
                }, $broadcast: function (a, b) {
                    for (var c = this, d = this, f = {
                        name: a, targetScope: this, preventDefault: function () {
                            f.defaultPrevented = !0
                        }, defaultPrevented: !1
                    }, g = [f].concat(wa.call(arguments, 1)), h, k; c = d;) {
                        f.currentScope = c;
                        d = c.$$listeners[a] || [];
                        h = 0;
                        for (k = d.length; h < k; h++)if (d[h])try {
                            d[h].apply(null, g)
                        } catch (m) {
                            e(m)
                        } else d.splice(h, 1), h--, k--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling))for (; c !== this && !(d =
                            c.$$nextSibling);)c = c.$parent
                    }
                    return f
                }
            };
            var r = new g;
            return r
        }]
    }

    function cd() {
        var b = /^\s*(https?|ftp|mailto|tel|file):/, a = /^\s*(https?|ftp|file):|data:image\//;
        this.aHrefSanitizationWhitelist = function (a) {
            return E(a) ? (b = a, this) : b
        };
        this.imgSrcSanitizationWhitelist = function (b) {
            return E(b) ? (a = b, this) : a
        };
        this.$get = function () {
            return function (c, d) {
                var e = d ? a : b, f;
                if (!O || 8 <= O)if (f = qa(c).href, "" !== f && !f.match(e))return "unsafe:" + f;
                return c
            }
        }
    }

    function Be(b) {
        if ("self" === b)return b;
        if (x(b)) {
            if (-1 < b.indexOf("***"))throw sa("iwcard",
                b);
            b = b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
            return RegExp("^" + b + "$")
        }
        if (cb(b))return RegExp("^" + b.source + "$");
        throw sa("imatcher");
    }

    function Hc(b) {
        var a = [];
        E(b) && q(b, function (b) {
            a.push(Be(b))
        });
        return a
    }

    function be() {
        this.SCE_CONTEXTS = fa;
        var b = ["self"], a = [];
        this.resourceUrlWhitelist = function (a) {
            arguments.length && (b = Hc(a));
            return b
        };
        this.resourceUrlBlacklist = function (b) {
            arguments.length && (a = Hc(b));
            return a
        };
        this.$get =
            ["$injector", function (c) {
                function d(a) {
                    var b = function (a) {
                        this.$$unwrapTrustedValue = function () {
                            return a
                        }
                    };
                    a && (b.prototype = new a);
                    b.prototype.valueOf = function () {
                        return this.$$unwrapTrustedValue()
                    };
                    b.prototype.toString = function () {
                        return this.$$unwrapTrustedValue().toString()
                    };
                    return b
                }

                var e = function (a) {
                    throw sa("unsafe");
                };
                c.has("$sanitize") && (e = c.get("$sanitize"));
                var f = d(), h = {};
                h[fa.HTML] = d(f);
                h[fa.CSS] = d(f);
                h[fa.URL] = d(f);
                h[fa.JS] = d(f);
                h[fa.RESOURCE_URL] = d(h[fa.URL]);
                return {
                    trustAs: function (a, b) {
                        var c =
                            h.hasOwnProperty(a) ? h[a] : null;
                        if (!c)throw sa("icontext", a, b);
                        if (null === b || b === s || "" === b)return b;
                        if ("string" !== typeof b)throw sa("itype", a);
                        return new c(b)
                    }, getTrusted: function (c, d) {
                        if (null === d || d === s || "" === d)return d;
                        var f = h.hasOwnProperty(c) ? h[c] : null;
                        if (f && d instanceof f)return d.$$unwrapTrustedValue();
                        if (c === fa.RESOURCE_URL) {
                            var f = qa(d.toString()), l, n, r = !1;
                            l = 0;
                            for (n = b.length; l < n; l++)if ("self" === b[l] ? Jb(f) : b[l].exec(f.href)) {
                                r = !0;
                                break
                            }
                            if (r)for (l = 0, n = a.length; l < n; l++)if ("self" === a[l] ? Jb(f) : a[l].exec(f.href)) {
                                r = !1;
                                break
                            }
                            if (r)return d;
                            throw sa("insecurl", d.toString());
                        }
                        if (c === fa.HTML)return e(d);
                        throw sa("unsafe");
                    }, valueOf: function (a) {
                        return a instanceof f ? a.$$unwrapTrustedValue() : a
                    }
                }
            }]
    }

    function ae() {
        var b = !0;
        this.enabled = function (a) {
            arguments.length && (b = !!a);
            return b
        };
        this.$get = ["$parse", "$sniffer", "$sceDelegate", function (a, c, d) {
            if (b && c.msie && 8 > c.msieDocumentMode)throw sa("iequirks");
            var e = $(fa);
            e.isEnabled = function () {
                return b
            };
            e.trustAs = d.trustAs;
            e.getTrusted = d.getTrusted;
            e.valueOf = d.valueOf;
            b || (e.trustAs =
                e.getTrusted = function (a, b) {
                    return b
                }, e.valueOf = Ba);
            e.parseAs = function (b, c) {
                var d = a(c);
                return d.literal && d.constant ? d : function (a, c) {
                    return e.getTrusted(b, d(a, c))
                }
            };
            var f = e.parseAs, h = e.getTrusted, g = e.trustAs;
            q(fa, function (a, b) {
                var c = C(b);
                e[Sa("parse_as_" + c)] = function (b) {
                    return f(a, b)
                };
                e[Sa("get_trusted_" + c)] = function (b) {
                    return h(a, b)
                };
                e[Sa("trust_as_" + c)] = function (b) {
                    return g(a, b)
                }
            });
            return e
        }]
    }

    function ce() {
        this.$get = ["$window", "$document", function (b, a) {
            var c = {}, d = S((/android (\d+)/.exec(C((b.navigator ||
            {}).userAgent)) || [])[1]), e = /Boxee/i.test((b.navigator || {}).userAgent), f = a[0] || {}, h = f.documentMode, g, m = /^(Moz|webkit|O|ms)(?=[A-Z])/, k = f.body && f.body.style, l = !1, n = !1;
            if (k) {
                for (var r in k)if (l = m.exec(r)) {
                    g = l[0];
                    g = g.substr(0, 1).toUpperCase() + g.substr(1);
                    break
                }
                g || (g = "WebkitOpacity" in k && "webkit");
                l = !!("transition" in k || g + "Transition" in k);
                n = !!("animation" in k || g + "Animation" in k);
                !d || l && n || (l = x(f.body.style.webkitTransition), n = x(f.body.style.webkitAnimation))
            }
            return {
                history: !(!b.history || !b.history.pushState ||
                4 > d || e), hashchange: "onhashchange" in b && (!h || 7 < h), hasEvent: function (a) {
                    if ("input" == a && 9 == O)return !1;
                    if (z(c[a])) {
                        var b = f.createElement("div");
                        c[a] = "on" + a in b
                    }
                    return c[a]
                }, csp: Wb(), vendorPrefix: g, transitions: l, animations: n, android: d, msie: O, msieDocumentMode: h
            }
        }]
    }

    function ee() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (b, a, c, d) {
            function e(e, g, m) {
                var k = c.defer(), l = k.promise, n = E(m) && !m;
                g = a.defer(function () {
                    try {
                        k.resolve(e())
                    } catch (a) {
                        k.reject(a), d(a)
                    } finally {
                        delete f[l.$$timeoutId]
                    }
                    n ||
                    b.$apply()
                }, g);
                l.$$timeoutId = g;
                f[g] = k;
                return l
            }

            var f = {};
            e.cancel = function (b) {
                return b && b.$$timeoutId in f ? (f[b.$$timeoutId].reject("canceled"), delete f[b.$$timeoutId], a.defer.cancel(b.$$timeoutId)) : !1
            };
            return e
        }]
    }

    function qa(b, a) {
        var c = b;
        O && (V.setAttribute("href", c), c = V.href);
        V.setAttribute("href", c);
        return {
            href: V.href,
            protocol: V.protocol ? V.protocol.replace(/:$/, "") : "",
            host: V.host,
            search: V.search ? V.search.replace(/^\?/, "") : "",
            hash: V.hash ? V.hash.replace(/^#/, "") : "",
            hostname: V.hostname,
            port: V.port,
            pathname: "/" === V.pathname.charAt(0) ? V.pathname : "/" + V.pathname
        }
    }

    function Jb(b) {
        b = x(b) ? qa(b) : b;
        return b.protocol === Ic.protocol && b.host === Ic.host
    }

    function fe() {
        this.$get = Z(Q)
    }

    function hc(b) {
        function a(d, e) {
            if (T(d)) {
                var f = {};
                q(d, function (b, c) {
                    f[c] = a(c, b)
                });
                return f
            }
            return b.factory(d + c, e)
        }

        var c = "Filter";
        this.register = a;
        this.$get = ["$injector", function (a) {
            return function (b) {
                return a.get(b + c)
            }
        }];
        a("currency", Jc);
        a("date", Kc);
        a("filter", Ce);
        a("json", De);
        a("limitTo", Ee);
        a("lowercase", Fe);
        a("number", Lc);
        a("orderBy",
            Mc);
        a("uppercase", Ge)
    }

    function Ce() {
        return function (b, a, c) {
            if (!K(b))return b;
            var d = typeof c, e = [];
            e.check = function (a) {
                for (var b = 0; b < e.length; b++)if (!e[b](a))return !1;
                return !0
            };
            "function" !== d && (c = "boolean" === d && c ? function (a, b) {
                return Ca.equals(a, b)
            } : function (a, b) {
                if (a && b && "object" === typeof a && "object" === typeof b) {
                    for (var d in a)if ("$" !== d.charAt(0) && Gc.call(a, d) && c(a[d], b[d]))return !0;
                    return !1
                }
                b = ("" + b).toLowerCase();
                return -1 < ("" + a).toLowerCase().indexOf(b)
            });
            var f = function (a, b) {
                if ("string" == typeof b &&
                    "!" === b.charAt(0))return !f(a, b.substr(1));
                switch (typeof a) {
                    case "boolean":
                    case "number":
                    case "string":
                        return c(a, b);
                    case "object":
                        switch (typeof b) {
                            case "object":
                                return c(a, b);
                            default:
                                for (var d in a)if ("$" !== d.charAt(0) && f(a[d], b))return !0
                        }
                        return !1;
                    case "array":
                        for (d = 0; d < a.length; d++)if (f(a[d], b))return !0;
                        return !1;
                    default:
                        return !1
                }
            };
            switch (typeof a) {
                case "boolean":
                case "number":
                case "string":
                    a = {$: a};
                case "object":
                    for (var h in a)(function (b) {
                        "undefined" != typeof a[b] && e.push(function (c) {
                            return f("$" ==
                            b ? c : c && c[b], a[b])
                        })
                    })(h);
                    break;
                case "function":
                    e.push(a);
                    break;
                default:
                    return b
            }
            d = [];
            for (h = 0; h < b.length; h++) {
                var g = b[h];
                e.check(g) && d.push(g)
            }
            return d
        }
    }

    function Jc(b) {
        var a = b.NUMBER_FORMATS;
        return function (b, d) {
            z(d) && (d = a.CURRENCY_SYM);
            return Nc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d)
        }
    }

    function Lc(b) {
        var a = b.NUMBER_FORMATS;
        return function (b, d) {
            return Nc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d)
        }
    }

    function Nc(b, a, c, d, e) {
        if (null == b || !isFinite(b) || T(b))return "";
        var f = 0 > b;
        b = Math.abs(b);
        var h = b + "", g = "", m = [], k = !1;
        if (-1 !== h.indexOf("e")) {
            var l = h.match(/([\d\.]+)e(-?)(\d+)/);
            l && "-" == l[2] && l[3] > e + 1 ? h = "0" : (g = h, k = !0)
        }
        if (k)0 < e && -1 < b && 1 > b && (g = b.toFixed(e)); else {
            h = (h.split(Oc)[1] || "").length;
            z(e) && (e = Math.min(Math.max(a.minFrac, h), a.maxFrac));
            h = Math.pow(10, e);
            b = Math.round(b * h) / h;
            b = ("" + b).split(Oc);
            h = b[0];
            b = b[1] || "";
            var l = 0, n = a.lgSize, r = a.gSize;
            if (h.length >= n + r)for (l = h.length - n, k = 0; k < l; k++)0 === (l - k) % r && 0 !== k && (g += c), g += h.charAt(k);
            for (k = l; k < h.length; k++)0 === (h.length - k) % n && 0 !==
            k && (g += c), g += h.charAt(k);
            for (; b.length < e;)b += "0";
            e && "0" !== e && (g += d + b.substr(0, e))
        }
        m.push(f ? a.negPre : a.posPre);
        m.push(g);
        m.push(f ? a.negSuf : a.posSuf);
        return m.join("")
    }

    function Pb(b, a, c) {
        var d = "";
        0 > b && (d = "-", b = -b);
        for (b = "" + b; b.length < a;)b = "0" + b;
        c && (b = b.substr(b.length - a));
        return d + b
    }

    function W(b, a, c, d) {
        c = c || 0;
        return function (e) {
            e = e["get" + b]();
            if (0 < c || e > -c)e += c;
            0 === e && -12 == c && (e = 12);
            return Pb(e, a, d)
        }
    }

    function qb(b, a) {
        return function (c, d) {
            var e = c["get" + b](), f = Da(a ? "SHORT" + b : b);
            return d[f][e]
        }
    }

    function Kc(b) {
        function a(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var f = 0, h = 0, g = b[8] ? a.setUTCFullYear : a.setFullYear, m = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (f = S(b[9] + b[10]), h = S(b[9] + b[11]));
                g.call(a, S(b[1]), S(b[2]) - 1, S(b[3]));
                f = S(b[4] || 0) - f;
                h = S(b[5] || 0) - h;
                g = S(b[6] || 0);
                b = Math.round(1E3 * parseFloat("0." + (b[7] || 0)));
                m.call(a, f, h, g, b)
            }
            return a
        }

        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function (c, e) {
            var f = "", h = [], g, m;
            e = e || "mediumDate";
            e = b.DATETIME_FORMATS[e] || e;
            x(c) &&
            (c = He.test(c) ? S(c) : a(c));
            wb(c) && (c = new Date(c));
            if (!Ma(c))return c;
            for (; e;)(m = Ie.exec(e)) ? (h = h.concat(wa.call(m, 1)), e = h.pop()) : (h.push(e), e = null);
            q(h, function (a) {
                g = Je[a];
                f += g ? g(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            });
            return f
        }
    }

    function De() {
        return function (b) {
            return pa(b, !0)
        }
    }

    function Ee() {
        return function (b, a) {
            if (!K(b) && !x(b))return b;
            a = S(a);
            if (x(b))return a ? 0 <= a ? b.slice(0, a) : b.slice(a, b.length) : "";
            var c = [], d, e;
            a > b.length ? a = b.length : a < -b.length && (a = -b.length);
            for (0 < a ? (d =
                0, e = a) : (d = b.length + a, e = b.length); d < e; d++)c.push(b[d]);
            return c
        }
    }

    function Mc(b) {
        return function (a, c, d) {
            function e(a, b) {
                return Pa(b) ? function (b, c) {
                    return a(c, b)
                } : a
            }

            function f(a, b) {
                var c = typeof a, d = typeof b;
                return c == d ? ("string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1
            }

            if (!K(a) || !c)return a;
            c = K(c) ? c : [c];
            c = Vc(c, function (a) {
                var c = !1, d = a || Ba;
                if (x(a)) {
                    if ("+" == a.charAt(0) || "-" == a.charAt(0))c = "-" == a.charAt(0), a = a.substring(1);
                    d = b(a);
                    if (d.constant) {
                        var g = d();
                        return e(function (a,
                                           b) {
                            return f(a[g], b[g])
                        }, c)
                    }
                }
                return e(function (a, b) {
                    return f(d(a), d(b))
                }, c)
            });
            for (var h = [], g = 0; g < a.length; g++)h.push(a[g]);
            return h.sort(e(function (a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e)return e
                }
                return 0
            }, d))
        }
    }

    function ta(b) {
        M(b) && (b = {link: b});
        b.restrict = b.restrict || "AC";
        return Z(b)
    }

    function Pc(b, a, c, d) {
        function e(a, c) {
            c = c ? "-" + fb(c, "-") : "";
            d.removeClass(b, (a ? rb : sb) + c);
            d.addClass(b, (a ? sb : rb) + c)
        }

        var f = this, h = b.parent().controller("form") || tb, g = 0, m = f.$error = {}, k = [];
        f.$name = a.name ||
            a.ngForm;
        f.$dirty = !1;
        f.$pristine = !0;
        f.$valid = !0;
        f.$invalid = !1;
        h.$addControl(f);
        b.addClass(Ka);
        e(!0);
        f.$addControl = function (a) {
            ya(a.$name, "input");
            k.push(a);
            a.$name && (f[a.$name] = a)
        };
        f.$removeControl = function (a) {
            a.$name && f[a.$name] === a && delete f[a.$name];
            q(m, function (b, c) {
                f.$setValidity(c, !0, a)
            });
            Na(k, a)
        };
        f.$setValidity = function (a, b, c) {
            var d = m[a];
            if (b)d && (Na(d, c), d.length || (g--, g || (e(b), f.$valid = !0, f.$invalid = !1), m[a] = !1, e(!0, a), h.$setValidity(a, !0, f))); else {
                g || e(b);
                if (d) {
                    if (-1 != db(d, c))return
                } else m[a] =
                    d = [], g++, e(!1, a), h.$setValidity(a, !1, f);
                d.push(c);
                f.$valid = !1;
                f.$invalid = !0
            }
        };
        f.$setDirty = function () {
            d.removeClass(b, Ka);
            d.addClass(b, ub);
            f.$dirty = !0;
            f.$pristine = !1;
            h.$setDirty()
        };
        f.$setPristine = function () {
            d.removeClass(b, ub);
            d.addClass(b, Ka);
            f.$dirty = !1;
            f.$pristine = !0;
            q(k, function (a) {
                a.$setPristine()
            })
        }
    }

    function oa(b, a, c, d) {
        b.$setValidity(a, c);
        return c ? d : s
    }

    function Ke(b, a, c) {
        var d = c.prop("validity");
        T(d) && b.$parsers.push(function (c) {
            if (b.$error[a] || !(d.badInput || d.customError || d.typeMismatch) || d.valueMissing)return c;
            b.$setValidity(a, !1)
        })
    }

    function vb(b, a, c, d, e, f) {
        var h = a.prop("validity");
        if (!e.android) {
            var g = !1;
            a.on("compositionstart", function (a) {
                g = !0
            });
            a.on("compositionend", function () {
                g = !1;
                m()
            })
        }
        var m = function () {
            if (!g) {
                var e = a.val();
                Pa(c.ngTrim || "T") && (e = ba(e));
                if (d.$viewValue !== e || h && "" === e && !h.valueMissing)b.$$phase ? d.$setViewValue(e) : b.$apply(function () {
                    d.$setViewValue(e)
                })
            }
        };
        if (e.hasEvent("input"))a.on("input", m); else {
            var k, l = function () {
                k || (k = f.defer(function () {
                    m();
                    k = null
                }))
            };
            a.on("keydown", function (a) {
                a =
                    a.keyCode;
                91 === a || 15 < a && 19 > a || 37 <= a && 40 >= a || l()
            });
            if (e.hasEvent("paste"))a.on("paste cut", l)
        }
        a.on("change", m);
        d.$render = function () {
            a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue)
        };
        var n = c.ngPattern;
        n && ((e = n.match(/^\/(.*)\/([gim]*)$/)) ? (n = RegExp(e[1], e[2]), e = function (a) {
            return oa(d, "pattern", d.$isEmpty(a) || n.test(a), a)
        }) : e = function (c) {
            var e = b.$eval(n);
            if (!e || !e.test)throw D("ngPattern")("noregexp", n, e, ga(a));
            return oa(d, "pattern", d.$isEmpty(c) || e.test(c), c)
        }, d.$formatters.push(e), d.$parsers.push(e));
        if (c.ngMinlength) {
            var r = S(c.ngMinlength);
            e = function (a) {
                return oa(d, "minlength", d.$isEmpty(a) || a.length >= r, a)
            };
            d.$parsers.push(e);
            d.$formatters.push(e)
        }
        if (c.ngMaxlength) {
            var p = S(c.ngMaxlength);
            e = function (a) {
                return oa(d, "maxlength", d.$isEmpty(a) || a.length <= p, a)
            };
            d.$parsers.push(e);
            d.$formatters.push(e)
        }
    }

    function Qb(b, a) {
        b = "ngClass" + b;
        return ["$animate", function (c) {
            function d(a, b) {
                var c = [], d = 0;
                a:for (; d < a.length; d++) {
                    for (var e = a[d], l = 0; l < b.length; l++)if (e == b[l])continue a;
                    c.push(e)
                }
                return c
            }

            function e(a) {
                if (!K(a)) {
                    if (x(a))return a.split(" ");
                    if (T(a)) {
                        var b = [];
                        q(a, function (a, c) {
                            a && b.push(c)
                        });
                        return b
                    }
                }
                return a
            }

            return {
                restrict: "AC", link: function (f, h, g) {
                    function m(a, b) {
                        var c = h.data("$classCounts") || {}, d = [];
                        q(a, function (a) {
                            if (0 < b || c[a])c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a)
                        });
                        h.data("$classCounts", c);
                        return d.join(" ")
                    }

                    function k(b) {
                        if (!0 === a || f.$index % 2 === a) {
                            var k = e(b || []);
                            if (!l) {
                                var p = m(k, 1);
                                g.$addClass(p)
                            } else if (!va(b, l)) {
                                var q = e(l), p = d(k, q), k = d(q, k), k = m(k, -1), p = m(p, 1);
                                0 === p.length ? c.removeClass(h, k) : 0 === k.length ? c.addClass(h, p) :
                                    c.setClass(h, p, k)
                            }
                        }
                        l = $(b)
                    }

                    var l;
                    f.$watch(g[b], k, !0);
                    g.$observe("class", function (a) {
                        k(f.$eval(g[b]))
                    });
                    "ngClass" !== b && f.$watch("$index", function (c, d) {
                        var h = c & 1;
                        if (h !== d & 1) {
                            var k = e(f.$eval(g[b]));
                            h === a ? (h = m(k, 1), g.$addClass(h)) : (h = m(k, -1), g.$removeClass(h))
                        }
                    })
                }
            }
        }]
    }

    var C = function (b) {
        return x(b) ? b.toLowerCase() : b
    }, Gc = Object.prototype.hasOwnProperty, Da = function (b) {
        return x(b) ? b.toUpperCase() : b
    }, O, w, Ea, wa = [].slice, Le = [].push, ua = Object.prototype.toString, Oa = D("ng"), Ca = Q.angular || (Q.angular = {}), Ra, Ja, ja =
        ["0", "0", "0"];
    O = S((/msie (\d+)/.exec(C(navigator.userAgent)) || [])[1]);
    isNaN(O) && (O = S((/trident\/.*; rv:(\d+)/.exec(C(navigator.userAgent)) || [])[1]));
    B.$inject = [];
    Ba.$inject = [];
    var ba = function () {
        return String.prototype.trim ? function (b) {
            return x(b) ? b.trim() : b
        } : function (b) {
            return x(b) ? b.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : b
        }
    }();
    Ja = 9 > O ? function (b) {
        b = b.nodeName ? b : b[0];
        return b.scopeName && "HTML" != b.scopeName ? Da(b.scopeName + ":" + b.nodeName) : b.nodeName
    } : function (b) {
        return b.nodeName ? b.nodeName : b[0].nodeName
    };
    var Yc = /[A-Z]/g, ad = {
        full: "1.2.16",
        major: 1,
        minor: 2,
        dot: 16,
        codeName: "badger-enumeration"
    }, Ta = H.cache = {}, gb = H.expando = "ng-" + (new Date).getTime(), ne = 1, Qc = Q.document.addEventListener ? function (b, a, c) {
        b.addEventListener(a, c, !1)
    } : function (b, a, c) {
        b.attachEvent("on" + a, c)
    }, Gb = Q.document.removeEventListener ? function (b, a, c) {
        b.removeEventListener(a, c, !1)
    } : function (b, a, c) {
        b.detachEvent("on" + a, c)
    };
    H._data = function (b) {
        return this.cache[b[this.expando]] || {}
    };
    var ie = /([\:\-\_]+(.))/g, je = /^moz([A-Z])/, Cb = D("jqLite"),
        ke = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Db = /<|&#?\w+;/, le = /<([\w:]+)/, me = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, da = {
            option: [1, '<select multiple="multiple">', "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    da.optgroup = da.option;
    da.tbody = da.tfoot = da.colgroup = da.caption = da.thead;
    da.th = da.td;
    var Ia = H.prototype = {
        ready: function (b) {
            function a() {
                c ||
                (c = !0, b())
            }

            var c = !1;
            "complete" === R.readyState ? setTimeout(a) : (this.on("DOMContentLoaded", a), H(Q).on("load", a))
        }, toString: function () {
            var b = [];
            q(this, function (a) {
                b.push("" + a)
            });
            return "[" + b.join(", ") + "]"
        }, eq: function (b) {
            return 0 <= b ? w(this[b]) : w(this[this.length + b])
        }, length: 0, push: Le, sort: [].sort, splice: [].splice
    }, kb = {};
    q("multiple selected checked disabled readOnly required open".split(" "), function (b) {
        kb[C(b)] = b
    });
    var oc = {};
    q("input select option textarea button form details".split(" "), function (b) {
        oc[Da(b)] = !0
    });
    q({
        data: kc, inheritedData: jb, scope: function (b) {
            return w(b).data("$scope") || jb(b.parentNode || b, ["$isolateScope", "$scope"])
        }, isolateScope: function (b) {
            return w(b).data("$isolateScope") || w(b).data("$isolateScopeNoTemplate")
        }, controller: lc, injector: function (b) {
            return jb(b, "$injector")
        }, removeAttr: function (b, a) {
            b.removeAttribute(a)
        }, hasClass: Hb, css: function (b, a, c) {
            a = Sa(a);
            if (E(c))b.style[a] = c; else {
                var d;
                8 >= O && (d = b.currentStyle && b.currentStyle[a], "" === d && (d = "auto"));
                d = d || b.style[a];
                8 >= O && (d = "" === d ? s :
                    d);
                return d
            }
        }, attr: function (b, a, c) {
            var d = C(a);
            if (kb[d])if (E(c))c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d)); else return b[a] || (b.attributes.getNamedItem(a) || B).specified ? d : s; else if (E(c))b.setAttribute(a, c); else if (b.getAttribute)return b = b.getAttribute(a, 2), null === b ? s : b
        }, prop: function (b, a, c) {
            if (E(c))b[a] = c; else return b[a]
        }, text: function () {
            function b(b, d) {
                var e = a[b.nodeType];
                if (z(d))return e ? b[e] : "";
                b[e] = d
            }

            var a = [];
            9 > O ? (a[1] = "innerText", a[3] = "nodeValue") : a[1] = a[3] = "textContent";
            b.$dv = "";
            return b
        }(), val: function (b, a) {
            if (z(a)) {
                if ("SELECT" === Ja(b) && b.multiple) {
                    var c = [];
                    q(b.options, function (a) {
                        a.selected && c.push(a.value || a.text)
                    });
                    return 0 === c.length ? null : c
                }
                return b.value
            }
            b.value = a
        }, html: function (b, a) {
            if (z(a))return b.innerHTML;
            for (var c = 0, d = b.childNodes; c < d.length; c++)Fa(d[c]);
            b.innerHTML = a
        }, empty: mc
    }, function (b, a) {
        H.prototype[a] = function (a, d) {
            var e, f;
            if (b !== mc && (2 == b.length && b !== Hb && b !== lc ? a : d) === s) {
                if (T(a)) {
                    for (e = 0; e < this.length; e++)if (b === kc)b(this[e], a); else for (f in a)b(this[e],
                        f, a[f]);
                    return this
                }
                e = b.$dv;
                f = e === s ? Math.min(this.length, 1) : this.length;
                for (var h = 0; h < f; h++) {
                    var g = b(this[h], a, d);
                    e = e ? e + g : g
                }
                return e
            }
            for (e = 0; e < this.length; e++)b(this[e], a, d);
            return this
        }
    });
    q({
        removeData: ic, dealoc: Fa, on: function a(c, d, e, f) {
            if (E(f))throw Cb("onargs");
            var h = ka(c, "events"), g = ka(c, "handle");
            h || ka(c, "events", h = {});
            g || ka(c, "handle", g = oe(c, h));
            q(d.split(" "), function (d) {
                var f = h[d];
                if (!f) {
                    if ("mouseenter" == d || "mouseleave" == d) {
                        var l = R.body.contains || R.body.compareDocumentPosition ? function (a,
                                                                                              c) {
                            var d = 9 === a.nodeType ? a.documentElement : a, e = c && c.parentNode;
                            return a === e || !!(e && 1 === e.nodeType && (d.contains ? d.contains(e) : a.compareDocumentPosition && a.compareDocumentPosition(e) & 16))
                        } : function (a, c) {
                            if (c)for (; c = c.parentNode;)if (c === a)return !0;
                            return !1
                        };
                        h[d] = [];
                        a(c, {mouseleave: "mouseout", mouseenter: "mouseover"}[d], function (a) {
                            var c = a.relatedTarget;
                            c && (c === this || l(this, c)) || g(a, d)
                        })
                    } else Qc(c, d, g), h[d] = [];
                    f = h[d]
                }
                f.push(e)
            })
        }, off: jc, one: function (a, c, d) {
            a = w(a);
            a.on(c, function f() {
                a.off(c, d);
                a.off(c,
                    f)
            });
            a.on(c, d)
        }, replaceWith: function (a, c) {
            var d, e = a.parentNode;
            Fa(a);
            q(new H(c), function (c) {
                d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
                d = c
            })
        }, children: function (a) {
            var c = [];
            q(a.childNodes, function (a) {
                1 === a.nodeType && c.push(a)
            });
            return c
        }, contents: function (a) {
            return a.contentDocument || a.childNodes || []
        }, append: function (a, c) {
            q(new H(c), function (c) {
                1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(c)
            })
        }, prepend: function (a, c) {
            if (1 === a.nodeType) {
                var d = a.firstChild;
                q(new H(c), function (c) {
                    a.insertBefore(c,
                        d)
                })
            }
        }, wrap: function (a, c) {
            c = w(c)[0];
            var d = a.parentNode;
            d && d.replaceChild(c, a);
            c.appendChild(a)
        }, remove: function (a) {
            Fa(a);
            var c = a.parentNode;
            c && c.removeChild(a)
        }, after: function (a, c) {
            var d = a, e = a.parentNode;
            q(new H(c), function (a) {
                e.insertBefore(a, d.nextSibling);
                d = a
            })
        }, addClass: ib, removeClass: hb, toggleClass: function (a, c, d) {
            c && q(c.split(" "), function (c) {
                var f = d;
                z(f) && (f = !Hb(a, c));
                (f ? ib : hb)(a, c)
            })
        }, parent: function (a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        }, next: function (a) {
            if (a.nextElementSibling)return a.nextElementSibling;
            for (a = a.nextSibling; null != a && 1 !== a.nodeType;)a = a.nextSibling;
            return a
        }, find: function (a, c) {
            return a.getElementsByTagName ? a.getElementsByTagName(c) : []
        }, clone: Fb, triggerHandler: function (a, c, d) {
            c = (ka(a, "events") || {})[c];
            d = d || [];
            var e = [{preventDefault: B, stopPropagation: B}];
            q(c, function (c) {
                c.apply(a, e.concat(d))
            })
        }
    }, function (a, c) {
        H.prototype[c] = function (c, e, f) {
            for (var h, g = 0; g < this.length; g++)z(h) ? (h = a(this[g], c, e, f), E(h) && (h = w(h))) : Eb(h, a(this[g], c, e, f));
            return E(h) ? h : this
        };
        H.prototype.bind = H.prototype.on;
        H.prototype.unbind = H.prototype.off
    });
    Ua.prototype = {
        put: function (a, c) {
            this[Ga(a)] = c
        }, get: function (a) {
            return this[Ga(a)]
        }, remove: function (a) {
            var c = this[a = Ga(a)];
            delete this[a];
            return c
        }
    };
    var qe = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, re = /,/, se = /^\s*(_?)(\S+?)\1\s*$/, pe = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, Va = D("$injector"), Me = D("$animate"), Md = ["$provide", function (a) {
        this.$$selectors = {};
        this.register = function (c, d) {
            var e = c + "-animation";
            if (c && "." != c.charAt(0))throw Me("notcsel", c);
            this.$$selectors[c.substr(1)] =
                e;
            a.factory(e, d)
        };
        this.classNameFilter = function (a) {
            1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null);
            return this.$$classNameFilter
        };
        this.$get = ["$timeout", "$$asyncCallback", function (a, d) {
            return {
                enter: function (a, c, h, g) {
                    h ? h.after(a) : (c && c[0] || (c = h.parent()), c.append(a));
                    g && d(g)
                }, leave: function (a, c) {
                    a.remove();
                    c && d(c)
                }, move: function (a, c, d, g) {
                    this.enter(a, c, d, g)
                }, addClass: function (a, c, h) {
                    c = x(c) ? c : K(c) ? c.join(" ") : "";
                    q(a, function (a) {
                        ib(a, c)
                    });
                    h && d(h)
                }, removeClass: function (a, c, h) {
                    c =
                        x(c) ? c : K(c) ? c.join(" ") : "";
                    q(a, function (a) {
                        hb(a, c)
                    });
                    h && d(h)
                }, setClass: function (a, c, h, g) {
                    q(a, function (a) {
                        ib(a, c);
                        hb(a, h)
                    });
                    g && d(g)
                }, enabled: B
            }
        }]
    }], ia = D("$compile");
    dc.$inject = ["$provide", "$$sanitizeUriProvider"];
    var ue = /^(x[\:\-_]|data[\:\-_])/i, wc = D("$interpolate"), Ne = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, xe = {
        http: 80,
        https: 443,
        ftp: 21
    }, Lb = D("$location");
    Bc.prototype = Mb.prototype = Ac.prototype = {
        $$html5: !1, $$replace: !1, absUrl: ob("$$absUrl"), url: function (a, c) {
            if (z(a))return this.$$url;
            var d = Ne.exec(a);
            d[1] &&
            this.path(decodeURIComponent(d[1]));
            (d[2] || d[1]) && this.search(d[3] || "");
            this.hash(d[5] || "", c);
            return this
        }, protocol: ob("$$protocol"), host: ob("$$host"), port: ob("$$port"), path: Cc("$$path", function (a) {
            return "/" == a.charAt(0) ? a : "/" + a
        }), search: function (a, c) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (x(a))this.$$search = Zb(a); else if (T(a))this.$$search = a; else throw Lb("isrcharg");
                    break;
                default:
                    z(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c
            }
            this.$$compose();
            return this
        }, hash: Cc("$$hash",
            Ba), replace: function () {
            this.$$replace = !0;
            return this
        }
    };
    var za = D("$parse"), Fc = {}, ra, La = {
        "null": function () {
            return null
        }, "true": function () {
            return !0
        }, "false": function () {
            return !1
        }, undefined: B, "+": function (a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return E(d) ? E(e) ? d + e : d : E(e) ? e : s
        }, "-": function (a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return (E(d) ? d : 0) - (E(e) ? e : 0)
        }, "*": function (a, c, d, e) {
            return d(a, c) * e(a, c)
        }, "/": function (a, c, d, e) {
            return d(a, c) / e(a, c)
        }, "%": function (a, c, d, e) {
            return d(a, c) % e(a, c)
        }, "^": function (a, c, d, e) {
            return d(a, c) ^ e(a,
                    c)
        }, "=": B, "===": function (a, c, d, e) {
            return d(a, c) === e(a, c)
        }, "!==": function (a, c, d, e) {
            return d(a, c) !== e(a, c)
        }, "==": function (a, c, d, e) {
            return d(a, c) == e(a, c)
        }, "!=": function (a, c, d, e) {
            return d(a, c) != e(a, c)
        }, "<": function (a, c, d, e) {
            return d(a, c) < e(a, c)
        }, ">": function (a, c, d, e) {
            return d(a, c) > e(a, c)
        }, "<=": function (a, c, d, e) {
            return d(a, c) <= e(a, c)
        }, ">=": function (a, c, d, e) {
            return d(a, c) >= e(a, c)
        }, "&&": function (a, c, d, e) {
            return d(a, c) && e(a, c)
        }, "||": function (a, c, d, e) {
            return d(a, c) || e(a, c)
        }, "&": function (a, c, d, e) {
            return d(a,
                    c) & e(a, c)
        }, "|": function (a, c, d, e) {
            return e(a, c)(a, c, d(a, c))
        }, "!": function (a, c, d) {
            return !d(a, c)
        }
    }, Oe = {n: "\n", f: "\f", r: "\r", t: "\t", v: "\v", "'": "'", '"': '"'}, Ob = function (a) {
        this.options = a
    };
    Ob.prototype = {
        constructor: Ob, lex: function (a) {
            this.text = a;
            this.index = 0;
            this.ch = s;
            this.lastCh = ":";
            this.tokens = [];
            var c;
            for (a = []; this.index < this.text.length;) {
                this.ch = this.text.charAt(this.index);
                if (this.is("\"'"))this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek()))this.readNumber();
                else if (this.isIdent(this.ch))this.readIdent(), this.was("{,") && "{" === a[0] && (c = this.tokens[this.tokens.length - 1]) && (c.json = -1 === c.text.indexOf(".")); else if (this.is("(){}[].,;:?"))this.tokens.push({
                    index: this.index,
                    text: this.ch,
                    json: this.was(":[,") && this.is("{[") || this.is("}]:,")
                }), this.is("{[") && a.unshift(this.ch), this.is("}]") && a.shift(), this.index++; else if (this.isWhitespace(this.ch)) {
                    this.index++;
                    continue
                } else {
                    var d = this.ch + this.peek(), e = d + this.peek(2), f = La[this.ch], h = La[d], g = La[e];
                    g ? (this.tokens.push({
                        index: this.index,
                        text: e, fn: g
                    }), this.index += 3) : h ? (this.tokens.push({
                        index: this.index,
                        text: d,
                        fn: h
                    }), this.index += 2) : f ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: f,
                        json: this.was("[,:") && this.is("+-")
                    }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
                this.lastCh = this.ch
            }
            return this.tokens
        }, is: function (a) {
            return -1 !== a.indexOf(this.ch)
        }, was: function (a) {
            return -1 !== a.indexOf(this.lastCh)
        }, peek: function (a) {
            a = a || 1;
            return this.index + a < this.text.length ? this.text.charAt(this.index +
                a) : !1
        }, isNumber: function (a) {
            return "0" <= a && "9" >= a
        }, isWhitespace: function (a) {
            return " " === a || "\r" === a || "\t" === a || "\n" === a || "\v" === a || "\u00a0" === a
        }, isIdent: function (a) {
            return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a
        }, isExpOperator: function (a) {
            return "-" === a || "+" === a || this.isNumber(a)
        }, throwError: function (a, c, d) {
            d = d || this.index;
            c = E(c) ? "s " + c + "-" + this.index + " [" + this.text.substring(c, d) + "]" : " " + d;
            throw za("lexerr", a, c, this.text);
        }, readNumber: function () {
            for (var a = "", c = this.index; this.index < this.text.length;) {
                var d =
                    C(this.text.charAt(this.index));
                if ("." == d || this.isNumber(d))a += d; else {
                    var e = this.peek();
                    if ("e" == d && this.isExpOperator(e))a += d; else if (this.isExpOperator(d) && e && this.isNumber(e) && "e" == a.charAt(a.length - 1))a += d; else if (!this.isExpOperator(d) || e && this.isNumber(e) || "e" != a.charAt(a.length - 1))break; else this.throwError("Invalid exponent")
                }
                this.index++
            }
            a *= 1;
            this.tokens.push({
                index: c, text: a, json: !0, fn: function () {
                    return a
                }
            })
        }, readIdent: function () {
            for (var a = this, c = "", d = this.index, e, f, h, g; this.index < this.text.length;) {
                g =
                    this.text.charAt(this.index);
                if ("." === g || this.isIdent(g) || this.isNumber(g))"." === g && (e = this.index), c += g; else break;
                this.index++
            }
            if (e)for (f = this.index; f < this.text.length;) {
                g = this.text.charAt(f);
                if ("(" === g) {
                    h = c.substr(e - d + 1);
                    c = c.substr(0, e - d);
                    this.index = f;
                    break
                }
                if (this.isWhitespace(g))f++; else break
            }
            d = {index: d, text: c};
            if (La.hasOwnProperty(c))d.fn = La[c], d.json = La[c]; else {
                var m = Ec(c, this.options, this.text);
                d.fn = y(function (a, c) {
                    return m(a, c)
                }, {
                    assign: function (d, e) {
                        return pb(d, c, e, a.text, a.options)
                    }
                })
            }
            this.tokens.push(d);
            h && (this.tokens.push({index: e, text: ".", json: !1}), this.tokens.push({
                index: e + 1,
                text: h,
                json: !1
            }))
        }, readString: function (a) {
            var c = this.index;
            this.index++;
            for (var d = "", e = a, f = !1; this.index < this.text.length;) {
                var h = this.text.charAt(this.index), e = e + h;
                if (f)"u" === h ? (h = this.text.substring(this.index + 1, this.index + 5), h.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + h + "]"), this.index += 4, d += String.fromCharCode(parseInt(h, 16))) : d = (f = Oe[h]) ? d + f : d + h, f = !1; else if ("\\" === h)f = !0; else {
                    if (h === a) {
                        this.index++;
                        this.tokens.push({
                            index: c, text: e, string: d, json: !0, fn: function () {
                                return d
                            }
                        });
                        return
                    }
                    d += h
                }
                this.index++
            }
            this.throwError("Unterminated quote", c)
        }
    };
    var $a = function (a, c, d) {
        this.lexer = a;
        this.$filter = c;
        this.options = d
    };
    $a.ZERO = y(function () {
        return 0
    }, {constant: !0});
    $a.prototype = {
        constructor: $a, parse: function (a, c) {
            this.text = a;
            this.json = c;
            this.tokens = this.lexer.lex(a);
            c && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function () {
                this.throwError("is not valid json",
                    {text: a, index: 0})
            });
            var d = c ? this.primary() : this.statements();
            0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);
            d.literal = !!d.literal;
            d.constant = !!d.constant;
            return d
        }, primary: function () {
            var a;
            if (this.expect("("))a = this.filterChain(), this.consume(")"); else if (this.expect("["))a = this.arrayDeclaration(); else if (this.expect("{"))a = this.object(); else {
                var c = this.expect();
                (a = c.fn) || this.throwError("not a primary expression", c);
                c.json && (a.constant = !0, a.literal = !0)
            }
            for (var d; c =
                this.expect("(", "[", ".");)"(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a
        }, throwError: function (a, c) {
            throw za("syntax", c.text, a, c.index + 1, this.text, this.text.substring(c.index));
        }, peekToken: function () {
            if (0 === this.tokens.length)throw za("ueoe", this.text);
            return this.tokens[0]
        }, peek: function (a, c, d, e) {
            if (0 < this.tokens.length) {
                var f = this.tokens[0], h = f.text;
                if (h === a || h === c || h === d || h ===
                    e || !(a || c || d || e))return f
            }
            return !1
        }, expect: function (a, c, d, e) {
            return (a = this.peek(a, c, d, e)) ? (this.json && !a.json && this.throwError("is not valid json", a), this.tokens.shift(), a) : !1
        }, consume: function (a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
        }, unaryFn: function (a, c) {
            return y(function (d, e) {
                return a(d, e, c)
            }, {constant: c.constant})
        }, ternaryFn: function (a, c, d) {
            return y(function (e, f) {
                return a(e, f) ? c(e, f) : d(e, f)
            }, {constant: a.constant && c.constant && d.constant})
        }, binaryFn: function (a,
                               c, d) {
            return y(function (e, f) {
                return c(e, f, a, d)
            }, {constant: a.constant && d.constant})
        }, statements: function () {
            for (var a = []; ;)if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";"))return 1 === a.length ? a[0] : function (c, d) {
                for (var e, f = 0; f < a.length; f++) {
                    var h = a[f];
                    h && (e = h(c, d))
                }
                return e
            }
        }, filterChain: function () {
            for (var a = this.expression(), c; ;)if (c = this.expect("|"))a = this.binaryFn(a, c.fn, this.filter()); else return a
        }, filter: function () {
            for (var a = this.expect(), c = this.$filter(a.text),
                     d = []; ;)if (a = this.expect(":"))d.push(this.expression()); else {
                var e = function (a, e, g) {
                    g = [g];
                    for (var m = 0; m < d.length; m++)g.push(d[m](a, e));
                    return c.apply(a, g)
                };
                return function () {
                    return e
                }
            }
        }, expression: function () {
            return this.assignment()
        }, assignment: function () {
            var a = this.ternary(), c, d;
            return (d = this.expect("=")) ? (a.assign || this.throwError("implies assignment but [" + this.text.substring(0, d.index) + "] can not be assigned to", d), c = this.ternary(), function (d, f) {
                return a.assign(d, c(d, f), f)
            }) : a
        }, ternary: function () {
            var a =
                this.logicalOR(), c, d;
            if (this.expect("?")) {
                c = this.ternary();
                if (d = this.expect(":"))return this.ternaryFn(a, c, this.ternary());
                this.throwError("expected :", d)
            } else return a
        }, logicalOR: function () {
            for (var a = this.logicalAND(), c; ;)if (c = this.expect("||"))a = this.binaryFn(a, c.fn, this.logicalAND()); else return a
        }, logicalAND: function () {
            var a = this.equality(), c;
            if (c = this.expect("&&"))a = this.binaryFn(a, c.fn, this.logicalAND());
            return a
        }, equality: function () {
            var a = this.relational(), c;
            if (c = this.expect("==", "!=", "===",
                    "!=="))a = this.binaryFn(a, c.fn, this.equality());
            return a
        }, relational: function () {
            var a = this.additive(), c;
            if (c = this.expect("<", ">", "<=", ">="))a = this.binaryFn(a, c.fn, this.relational());
            return a
        }, additive: function () {
            for (var a = this.multiplicative(), c; c = this.expect("+", "-");)a = this.binaryFn(a, c.fn, this.multiplicative());
            return a
        }, multiplicative: function () {
            for (var a = this.unary(), c; c = this.expect("*", "/", "%");)a = this.binaryFn(a, c.fn, this.unary());
            return a
        }, unary: function () {
            var a;
            return this.expect("+") ? this.primary() :
                (a = this.expect("-")) ? this.binaryFn($a.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
        }, fieldAccess: function (a) {
            var c = this, d = this.expect().text, e = Ec(d, this.options, this.text);
            return y(function (c, d, g) {
                return e(g || a(c, d))
            }, {
                assign: function (e, h, g) {
                    return pb(a(e, g), d, h, c.text, c.options)
                }
            })
        }, objectIndex: function (a) {
            var c = this, d = this.expression();
            this.consume("]");
            return y(function (e, f) {
                var h = a(e, f), g = d(e, f), m;
                if (!h)return s;
                (h = Za(h[g], c.text)) && h.then && c.options.unwrapPromises &&
                (m = h, "$$v" in h || (m.$$v = s, m.then(function (a) {
                    m.$$v = a
                })), h = h.$$v);
                return h
            }, {
                assign: function (e, f, h) {
                    var g = d(e, h);
                    return Za(a(e, h), c.text)[g] = f
                }
            })
        }, functionCall: function (a, c) {
            var d = [];
            if (")" !== this.peekToken().text) {
                do d.push(this.expression()); while (this.expect(","))
            }
            this.consume(")");
            var e = this;
            return function (f, h) {
                for (var g = [], m = c ? c(f, h) : f, k = 0; k < d.length; k++)g.push(d[k](f, h));
                k = a(f, h, m) || B;
                Za(m, e.text);
                Za(k, e.text);
                g = k.apply ? k.apply(m, g) : k(g[0], g[1], g[2], g[3], g[4]);
                return Za(g, e.text)
            }
        }, arrayDeclaration: function () {
            var a =
                [], c = !0;
            if ("]" !== this.peekToken().text) {
                do {
                    if (this.peek("]"))break;
                    var d = this.expression();
                    a.push(d);
                    d.constant || (c = !1)
                } while (this.expect(","))
            }
            this.consume("]");
            return y(function (c, d) {
                for (var h = [], g = 0; g < a.length; g++)h.push(a[g](c, d));
                return h
            }, {literal: !0, constant: c})
        }, object: function () {
            var a = [], c = !0;
            if ("}" !== this.peekToken().text) {
                do {
                    if (this.peek("}"))break;
                    var d = this.expect(), d = d.string || d.text;
                    this.consume(":");
                    var e = this.expression();
                    a.push({key: d, value: e});
                    e.constant || (c = !1)
                } while (this.expect(","))
            }
            this.consume("}");
            return y(function (c, d) {
                for (var e = {}, m = 0; m < a.length; m++) {
                    var k = a[m];
                    e[k.key] = k.value(c, d)
                }
                return e
            }, {literal: !0, constant: c})
        }
    };
    var Nb = {}, sa = D("$sce"), fa = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, V = R.createElement("a"), Ic = qa(Q.location.href, !0);
    hc.$inject = ["$provide"];
    Jc.$inject = ["$locale"];
    Lc.$inject = ["$locale"];
    var Oc = ".", Je = {
        yyyy: W("FullYear", 4),
        yy: W("FullYear", 2, 0, !0),
        y: W("FullYear", 1),
        MMMM: qb("Month"),
        MMM: qb("Month", !0),
        MM: W("Month", 2, 1),
        M: W("Month",
            1, 1),
        dd: W("Date", 2),
        d: W("Date", 1),
        HH: W("Hours", 2),
        H: W("Hours", 1),
        hh: W("Hours", 2, -12),
        h: W("Hours", 1, -12),
        mm: W("Minutes", 2),
        m: W("Minutes", 1),
        ss: W("Seconds", 2),
        s: W("Seconds", 1),
        sss: W("Milliseconds", 3),
        EEEE: qb("Day"),
        EEE: qb("Day", !0),
        a: function (a, c) {
            return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1]
        },
        Z: function (a) {
            a = -1 * a.getTimezoneOffset();
            return (0 <= a ? "+" : "") + (Pb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Pb(Math.abs(a % 60), 2))
        }
    }, Ie = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, He = /^\-?\d+$/;
    Kc.$inject = ["$locale"];
    var Fe = Z(C), Ge = Z(Da);
    Mc.$inject = ["$parse"];
    var dd = Z({
        restrict: "E", compile: function (a, c) {
            8 >= O && (c.href || c.name || c.$set("href", ""), a.append(R.createComment("IE fix")));
            if (!c.href && !c.xlinkHref && !c.name)return function (a, c) {
                var f = "[object SVGAnimatedString]" === ua.call(c.prop("href")) ? "xlink:href" : "href";
                c.on("click", function (a) {
                    c.attr(f) || a.preventDefault()
                })
            }
        }
    }), Ab = {};
    q(kb, function (a, c) {
        if ("multiple" != a) {
            var d = ma("ng-" + c);
            Ab[d] = function () {
                return {
                    priority: 100, link: function (a, f,
                                                   h) {
                        a.$watch(h[d], function (a) {
                            h.$set(c, !!a)
                        })
                    }
                }
            }
        }
    });
    q(["src", "srcset", "href"], function (a) {
        var c = ma("ng-" + a);
        Ab[c] = function () {
            return {
                priority: 99, link: function (d, e, f) {
                    var h = a, g = a;
                    "href" === a && "[object SVGAnimatedString]" === ua.call(e.prop("href")) && (g = "xlinkHref", f.$attr[g] = "xlink:href", h = null);
                    f.$observe(c, function (a) {
                        a && (f.$set(g, a), O && h && e.prop(h, f[g]))
                    })
                }
            }
        }
    });
    var tb = {$addControl: B, $removeControl: B, $setValidity: B, $setDirty: B, $setPristine: B};
    Pc.$inject = ["$element", "$attrs", "$scope", "$animate"];
    var Rc =
            function (a) {
                return ["$timeout", function (c) {
                    return {
                        name: "form", restrict: a ? "EAC" : "E", controller: Pc, compile: function () {
                            return {
                                pre: function (a, e, f, h) {
                                    if (!f.action) {
                                        var g = function (a) {
                                            a.preventDefault ? a.preventDefault() : a.returnValue = !1
                                        };
                                        Qc(e[0], "submit", g);
                                        e.on("$destroy", function () {
                                            c(function () {
                                                Gb(e[0], "submit", g)
                                            }, 0, !1)
                                        })
                                    }
                                    var m = e.parent().controller("form"), k = f.name || f.ngForm;
                                    k && pb(a, k, h, k);
                                    if (m)e.on("$destroy", function () {
                                        m.$removeControl(h);
                                        k && pb(a, k, s, k);
                                        y(h, tb)
                                    })
                                }
                            }
                        }
                    }
                }]
            }, ed = Rc(), rd = Rc(!0), Pe = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        Qe = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i, Re = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Sc = {
            text: vb, number: function (a, c, d, e, f, h) {
                vb(a, c, d, e, f, h);
                e.$parsers.push(function (a) {
                    var c = e.$isEmpty(a);
                    if (c || Re.test(a))return e.$setValidity("number", !0), "" === a ? null : c ? a : parseFloat(a);
                    e.$setValidity("number", !1);
                    return s
                });
                Ke(e, "number", c);
                e.$formatters.push(function (a) {
                    return e.$isEmpty(a) ? "" : "" + a
                });
                d.min && (a = function (a) {
                    var c = parseFloat(d.min);
                    return oa(e, "min", e.$isEmpty(a) || a >= c, a)
                }, e.$parsers.push(a),
                    e.$formatters.push(a));
                d.max && (a = function (a) {
                    var c = parseFloat(d.max);
                    return oa(e, "max", e.$isEmpty(a) || a <= c, a)
                }, e.$parsers.push(a), e.$formatters.push(a));
                e.$formatters.push(function (a) {
                    return oa(e, "number", e.$isEmpty(a) || wb(a), a)
                })
            }, url: function (a, c, d, e, f, h) {
                vb(a, c, d, e, f, h);
                a = function (a) {
                    return oa(e, "url", e.$isEmpty(a) || Pe.test(a), a)
                };
                e.$formatters.push(a);
                e.$parsers.push(a)
            }, email: function (a, c, d, e, f, h) {
                vb(a, c, d, e, f, h);
                a = function (a) {
                    return oa(e, "email", e.$isEmpty(a) || Qe.test(a), a)
                };
                e.$formatters.push(a);
                e.$parsers.push(a)
            }, radio: function (a, c, d, e) {
                z(d.name) && c.attr("name", bb());
                c.on("click", function () {
                    c[0].checked && a.$apply(function () {
                        e.$setViewValue(d.value)
                    })
                });
                e.$render = function () {
                    c[0].checked = d.value == e.$viewValue
                };
                d.$observe("value", e.$render)
            }, checkbox: function (a, c, d, e) {
                var f = d.ngTrueValue, h = d.ngFalseValue;
                x(f) || (f = !0);
                x(h) || (h = !1);
                c.on("click", function () {
                    a.$apply(function () {
                        e.$setViewValue(c[0].checked)
                    })
                });
                e.$render = function () {
                    c[0].checked = e.$viewValue
                };
                e.$isEmpty = function (a) {
                    return a !== f
                };
                e.$formatters.push(function (a) {
                    return a === f
                });
                e.$parsers.push(function (a) {
                    return a ? f : h
                })
            }, hidden: B, button: B, submit: B, reset: B, file: B
        }, ec = ["$browser", "$sniffer", function (a, c) {
            return {
                restrict: "E", require: "?ngModel", link: function (d, e, f, h) {
                    h && (Sc[C(f.type)] || Sc.text)(d, e, f, h, c, a)
                }
            }
        }], sb = "ng-valid", rb = "ng-invalid", Ka = "ng-pristine", ub = "ng-dirty", Se = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function (a, c, d, e, f, h) {
            function g(a, c) {
                c = c ? "-" + fb(c, "-") : "";
                h.removeClass(e, (a ? rb : sb) + c);
                h.addClass(e, (a ? sb : rb) + c)
            }

            this.$modelValue = this.$viewValue = Number.NaN;
            this.$parsers = [];
            this.$formatters = [];
            this.$viewChangeListeners = [];
            this.$pristine = !0;
            this.$dirty = !1;
            this.$valid = !0;
            this.$invalid = !1;
            this.$name = d.name;
            var m = f(d.ngModel), k = m.assign;
            if (!k)throw D("ngModel")("nonassign", d.ngModel, ga(e));
            this.$render = B;
            this.$isEmpty = function (a) {
                return z(a) || "" === a || null === a || a !== a
            };
            var l = e.inheritedData("$formController") || tb, n = 0, r = this.$error = {};
            e.addClass(Ka);
            g(!0);
            this.$setValidity = function (a, c) {
                r[a] !== !c && (c ? (r[a] && n--, n || (g(!0), this.$valid = !0, this.$invalid = !1)) : (g(!1), this.$invalid = !0, this.$valid = !1, n++), r[a] = !c, g(c, a), l.$setValidity(a, c, this))
            };
            this.$setPristine = function () {
                this.$dirty = !1;
                this.$pristine = !0;
                h.removeClass(e, ub);
                h.addClass(e, Ka)
            };
            this.$setViewValue = function (d) {
                this.$viewValue = d;
                this.$pristine && (this.$dirty = !0, this.$pristine = !1, h.removeClass(e, Ka), h.addClass(e, ub), l.$setDirty());
                q(this.$parsers, function (a) {
                    d = a(d)
                });
                this.$modelValue !== d && (this.$modelValue = d, k(a, d), q(this.$viewChangeListeners,
                    function (a) {
                        try {
                            a()
                        } catch (d) {
                            c(d)
                        }
                    }))
            };
            var p = this;
            a.$watch(function () {
                var c = m(a);
                if (p.$modelValue !== c) {
                    var d = p.$formatters, e = d.length;
                    for (p.$modelValue = c; e--;)c = d[e](c);
                    p.$viewValue !== c && (p.$viewValue = c, p.$render())
                }
                return c
            })
        }], Gd = function () {
            return {
                require: ["ngModel", "^?form"], controller: Se, link: function (a, c, d, e) {
                    var f = e[0], h = e[1] || tb;
                    h.$addControl(f);
                    a.$on("$destroy", function () {
                        h.$removeControl(f)
                    })
                }
            }
        }, Id = Z({
            require: "ngModel", link: function (a, c, d, e) {
                e.$viewChangeListeners.push(function () {
                    a.$eval(d.ngChange)
                })
            }
        }),
        fc = function () {
            return {
                require: "?ngModel", link: function (a, c, d, e) {
                    if (e) {
                        d.required = !0;
                        var f = function (a) {
                            if (d.required && e.$isEmpty(a))e.$setValidity("required", !1); else return e.$setValidity("required", !0), a
                        };
                        e.$formatters.push(f);
                        e.$parsers.unshift(f);
                        d.$observe("required", function () {
                            f(e.$viewValue)
                        })
                    }
                }
            }
        }, Hd = function () {
            return {
                require: "ngModel", link: function (a, c, d, e) {
                    var f = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ",";
                    e.$parsers.push(function (a) {
                        if (!z(a)) {
                            var c = [];
                            a && q(a.split(f), function (a) {
                                a &&
                                c.push(ba(a))
                            });
                            return c
                        }
                    });
                    e.$formatters.push(function (a) {
                        return K(a) ? a.join(", ") : s
                    });
                    e.$isEmpty = function (a) {
                        return !a || !a.length
                    }
                }
            }
        }, Te = /^(true|false|\d+)$/, Jd = function () {
            return {
                priority: 100, compile: function (a, c) {
                    return Te.test(c.ngValue) ? function (a, c, f) {
                        f.$set("value", a.$eval(f.ngValue))
                    } : function (a, c, f) {
                        a.$watch(f.ngValue, function (a) {
                            f.$set("value", a)
                        })
                    }
                }
            }
        }, jd = ta(function (a, c, d) {
            c.addClass("ng-binding").data("$binding", d.ngBind);
            a.$watch(d.ngBind, function (a) {
                c.text(a == s ? "" : a)
            })
        }), ld = ["$interpolate",
            function (a) {
                return function (c, d, e) {
                    c = a(d.attr(e.$attr.ngBindTemplate));
                    d.addClass("ng-binding").data("$binding", c);
                    e.$observe("ngBindTemplate", function (a) {
                        d.text(a)
                    })
                }
            }], kd = ["$sce", "$parse", function (a, c) {
            return function (d, e, f) {
                e.addClass("ng-binding").data("$binding", f.ngBindHtml);
                var h = c(f.ngBindHtml);
                d.$watch(function () {
                    return (h(d) || "").toString()
                }, function (c) {
                    e.html(a.getTrustedHtml(h(d)) || "")
                })
            }
        }], md = Qb("", !0), od = Qb("Odd", 0), nd = Qb("Even", 1), pd = ta({
            compile: function (a, c) {
                c.$set("ngCloak", s);
                a.removeClass("ng-cloak")
            }
        }),
        qd = [function () {
            return {scope: !0, controller: "@", priority: 500}
        }], gc = {};
    q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) {
        var c = ma("ng-" + a);
        gc[c] = ["$parse", function (d) {
            return {
                compile: function (e, f) {
                    var h = d(f[c]);
                    return function (c, d, e) {
                        d.on(C(a), function (a) {
                            c.$apply(function () {
                                h(c, {$event: a})
                            })
                        })
                    }
                }
            }
        }]
    });
    var td = ["$animate", function (a) {
        return {
            transclude: "element", priority: 600, terminal: !0, restrict: "A",
            $$tlb: !0, link: function (c, d, e, f, h) {
                var g, m, k;
                c.$watch(e.ngIf, function (f) {
                    Pa(f) ? m || (m = c.$new(), h(m, function (c) {
                        c[c.length++] = R.createComment(" end ngIf: " + e.ngIf + " ");
                        g = {clone: c};
                        a.enter(c, d.parent(), d)
                    })) : (k && (k.remove(), k = null), m && (m.$destroy(), m = null), g && (k = zb(g.clone), a.leave(k, function () {
                        k = null
                    }), g = null))
                })
            }
        }
    }], ud = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function (a, c, d, e, f) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: Ca.noop,
            compile: function (h,
                               g) {
                var m = g.ngInclude || g.src, k = g.onload || "", l = g.autoscroll;
                return function (g, h, p, q, A) {
                    var s = 0, u, w, v, X = function () {
                        w && (w.remove(), w = null);
                        u && (u.$destroy(), u = null);
                        v && (e.leave(v, function () {
                            w = null
                        }), w = v, v = null)
                    };
                    g.$watch(f.parseAsResourceUrl(m), function (f) {
                        var m = function () {
                            !E(l) || l && !g.$eval(l) || d()
                        }, p = ++s;
                        f ? (a.get(f, {cache: c}).success(function (a) {
                            if (p === s) {
                                var c = g.$new();
                                q.template = a;
                                a = A(c, function (a) {
                                    X();
                                    e.enter(a, null, h, m)
                                });
                                u = c;
                                v = a;
                                u.$emit("$includeContentLoaded");
                                g.$eval(k)
                            }
                        }).error(function () {
                            p ===
                            s && X()
                        }), g.$emit("$includeContentRequested")) : (X(), q.template = null)
                    })
                }
            }
        }
    }], Kd = ["$compile", function (a) {
        return {
            restrict: "ECA", priority: -400, require: "ngInclude", link: function (c, d, e, f) {
                d.html(f.template);
                a(d.contents())(c)
            }
        }
    }], vd = ta({
        priority: 450, compile: function () {
            return {
                pre: function (a, c, d) {
                    a.$eval(d.ngInit)
                }
            }
        }
    }), wd = ta({terminal: !0, priority: 1E3}), xd = ["$locale", "$interpolate", function (a, c) {
        var d = /{}/g;
        return {
            restrict: "EA", link: function (e, f, h) {
                var g = h.count, m = h.$attr.when && f.attr(h.$attr.when), k = h.offset ||
                    0, l = e.$eval(m) || {}, n = {}, r = c.startSymbol(), p = c.endSymbol(), s = /^when(Minus)?(.+)$/;
                q(h, function (a, c) {
                    s.test(c) && (l[C(c.replace("when", "").replace("Minus", "-"))] = f.attr(h.$attr[c]))
                });
                q(l, function (a, e) {
                    n[e] = c(a.replace(d, r + g + "-" + k + p))
                });
                e.$watch(function () {
                    var c = parseFloat(e.$eval(g));
                    if (isNaN(c))return "";
                    c in l || (c = a.pluralCat(c - k));
                    return n[c](e, f, !0)
                }, function (a) {
                    f.text(a)
                })
            }
        }
    }], yd = ["$parse", "$animate", function (a, c) {
        var d = D("ngRepeat");
        return {
            transclude: "element", priority: 1E3, terminal: !0, $$tlb: !0,
            link: function (e, f, h, g, m) {
                var k = h.ngRepeat, l = k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), n, r, p, s, A, F, u = {$id: Ga};
                if (!l)throw d("iexp", k);
                h = l[1];
                g = l[2];
                (l = l[3]) ? (n = a(l), r = function (a, c, d) {
                    F && (u[F] = a);
                    u[A] = c;
                    u.$index = d;
                    return n(e, u)
                }) : (p = function (a, c) {
                    return Ga(c)
                }, s = function (a) {
                    return a
                });
                l = h.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                if (!l)throw d("iidexp", h);
                A = l[3] || l[1];
                F = l[2];
                var y = {};
                e.$watchCollection(g, function (a) {
                    var g, h, l = f[0], n, u = {}, E, L, J, B, C, x,
                        z = [];
                    if (ab(a))C = a, n = r || p; else {
                        n = r || s;
                        C = [];
                        for (J in a)a.hasOwnProperty(J) && "$" != J.charAt(0) && C.push(J);
                        C.sort()
                    }
                    E = C.length;
                    h = z.length = C.length;
                    for (g = 0; g < h; g++)if (J = a === C ? g : C[g], B = a[J], B = n(J, B, g), ya(B, "`track by` id"), y.hasOwnProperty(B))x = y[B], delete y[B], u[B] = x, z[g] = x; else {
                        if (u.hasOwnProperty(B))throw q(z, function (a) {
                            a && a.scope && (y[a.id] = a)
                        }), d("dupes", k, B);
                        z[g] = {id: B};
                        u[B] = !1
                    }
                    for (J in y)y.hasOwnProperty(J) && (x = y[J], g = zb(x.clone), c.leave(g), q(g, function (a) {
                        a.$$NG_REMOVED = !0
                    }), x.scope.$destroy());
                    g = 0;
                    for (h = C.length; g < h; g++) {
                        J = a === C ? g : C[g];
                        B = a[J];
                        x = z[g];
                        z[g - 1] && (l = z[g - 1].clone[z[g - 1].clone.length - 1]);
                        if (x.scope) {
                            L = x.scope;
                            n = l;
                            do n = n.nextSibling; while (n && n.$$NG_REMOVED);
                            x.clone[0] != n && c.move(zb(x.clone), null, w(l));
                            l = x.clone[x.clone.length - 1]
                        } else L = e.$new();
                        L[A] = B;
                        F && (L[F] = J);
                        L.$index = g;
                        L.$first = 0 === g;
                        L.$last = g === E - 1;
                        L.$middle = !(L.$first || L.$last);
                        L.$odd = !(L.$even = 0 === (g & 1));
                        x.scope || m(L, function (a) {
                            a[a.length++] = R.createComment(" end ngRepeat: " + k + " ");
                            c.enter(a, null, w(l));
                            l = a;
                            x.scope = L;
                            x.clone =
                                a;
                            u[x.id] = x
                        })
                    }
                    y = u
                })
            }
        }
    }], zd = ["$animate", function (a) {
        return function (c, d, e) {
            c.$watch(e.ngShow, function (c) {
                a[Pa(c) ? "removeClass" : "addClass"](d, "ng-hide")
            })
        }
    }], sd = ["$animate", function (a) {
        return function (c, d, e) {
            c.$watch(e.ngHide, function (c) {
                a[Pa(c) ? "addClass" : "removeClass"](d, "ng-hide")
            })
        }
    }], Ad = ta(function (a, c, d) {
        a.$watch(d.ngStyle, function (a, d) {
            d && a !== d && q(d, function (a, d) {
                c.css(d, "")
            });
            a && c.css(a)
        }, !0)
    }), Bd = ["$animate", function (a) {
        return {
            restrict: "EA", require: "ngSwitch", controller: ["$scope", function () {
                this.cases =
                {}
            }], link: function (c, d, e, f) {
                var h, g, m, k = [];
                c.$watch(e.ngSwitch || e.on, function (d) {
                    var n, r = k.length;
                    if (0 < r) {
                        if (m) {
                            for (n = 0; n < r; n++)m[n].remove();
                            m = null
                        }
                        m = [];
                        for (n = 0; n < r; n++) {
                            var p = g[n];
                            k[n].$destroy();
                            m[n] = p;
                            a.leave(p, function () {
                                m.splice(n, 1);
                                0 === m.length && (m = null)
                            })
                        }
                    }
                    g = [];
                    k = [];
                    if (h = f.cases["!" + d] || f.cases["?"])c.$eval(e.change), q(h, function (d) {
                        var e = c.$new();
                        k.push(e);
                        d.transclude(e, function (c) {
                            var e = d.element;
                            g.push(c);
                            a.enter(c, e.parent(), e)
                        })
                    })
                })
            }
        }
    }], Cd = ta({
        transclude: "element", priority: 800, require: "^ngSwitch",
        link: function (a, c, d, e, f) {
            e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || [];
            e.cases["!" + d.ngSwitchWhen].push({transclude: f, element: c})
        }
    }), Dd = ta({
        transclude: "element", priority: 800, require: "^ngSwitch", link: function (a, c, d, e, f) {
            e.cases["?"] = e.cases["?"] || [];
            e.cases["?"].push({transclude: f, element: c})
        }
    }), Fd = ta({
        link: function (a, c, d, e, f) {
            if (!f)throw D("ngTransclude")("orphan", ga(c));
            f(function (a) {
                c.empty();
                c.append(a)
            })
        }
    }), fd = ["$templateCache", function (a) {
        return {
            restrict: "E", terminal: !0, compile: function (c,
                                                            d) {
                "text/ng-template" == d.type && a.put(d.id, c[0].text)
            }
        }
    }], Ue = D("ngOptions"), Ed = Z({terminal: !0}), gd = ["$compile", "$parse", function (a, c) {
        var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, e = {$setViewValue: B};
        return {
            restrict: "E",
            require: ["select", "?ngModel"],
            controller: ["$element", "$scope", "$attrs", function (a, c, d) {
                var m = this, k = {}, l = e, n;
                m.databound =
                    d.ngModel;
                m.init = function (a, c, d) {
                    l = a;
                    n = d
                };
                m.addOption = function (c) {
                    ya(c, '"option value"');
                    k[c] = !0;
                    l.$viewValue == c && (a.val(c), n.parent() && n.remove())
                };
                m.removeOption = function (a) {
                    this.hasOption(a) && (delete k[a], l.$viewValue == a && this.renderUnknownOption(a))
                };
                m.renderUnknownOption = function (c) {
                    c = "? " + Ga(c) + " ?";
                    n.val(c);
                    a.prepend(n);
                    a.val(c);
                    n.prop("selected", !0)
                };
                m.hasOption = function (a) {
                    return k.hasOwnProperty(a)
                };
                c.$on("$destroy", function () {
                    m.renderUnknownOption = B
                })
            }],
            link: function (e, h, g, m) {
                function k(a,
                           c, d, e) {
                    d.$render = function () {
                        var a = d.$viewValue;
                        e.hasOption(a) ? (v.parent() && v.remove(), c.val(a), "" === a && y.prop("selected", !0)) : z(a) && y ? c.val("") : e.renderUnknownOption(a)
                    };
                    c.on("change", function () {
                        a.$apply(function () {
                            v.parent() && v.remove();
                            d.$setViewValue(c.val())
                        })
                    })
                }

                function l(a, c, d) {
                    var e;
                    d.$render = function () {
                        var a = new Ua(d.$viewValue);
                        q(c.find("option"), function (c) {
                            c.selected = E(a.get(c.value))
                        })
                    };
                    a.$watch(function () {
                        va(e, d.$viewValue) || (e = $(d.$viewValue), d.$render())
                    });
                    c.on("change", function () {
                        a.$apply(function () {
                            var a =
                                [];
                            q(c.find("option"), function (c) {
                                c.selected && a.push(c.value)
                            });
                            d.$setViewValue(a)
                        })
                    })
                }

                function n(e, f, g) {
                    function h() {
                        var a = {"": []}, c = [""], d, k, s, t, v;
                        t = g.$modelValue;
                        v = y(e) || [];
                        var C = n ? Rb(v) : v, F, z, D;
                        z = {};
                        s = !1;
                        var H, I;
                        if (p)if (w && K(t))for (s = new Ua([]), D = 0; D < t.length; D++)z[m] = t[D], s.put(w(e, z), t[D]); else s = new Ua(t);
                        for (D = 0; F = C.length, D < F; D++) {
                            k = D;
                            if (n) {
                                k = C[D];
                                if ("$" === k.charAt(0))continue;
                                z[n] = k
                            }
                            z[m] = v[k];
                            d = q(e, z) || "";
                            (k = a[d]) || (k = a[d] = [], c.push(d));
                            p ? d = E(s.remove(w ? w(e, z) : r(e, z))) : (w ? (d = {}, d[m] = t, d =
                                w(e, d) === w(e, z)) : d = t === r(e, z), s = s || d);
                            H = l(e, z);
                            H = E(H) ? H : "";
                            k.push({id: w ? w(e, z) : n ? C[D] : D, label: H, selected: d})
                        }
                        p || (A || null === t ? a[""].unshift({
                            id: "",
                            label: "",
                            selected: !s
                        }) : s || a[""].unshift({id: "?", label: "", selected: !0}));
                        z = 0;
                        for (C = c.length; z < C; z++) {
                            d = c[z];
                            k = a[d];
                            x.length <= z ? (t = {
                                element: B.clone().attr("label", d),
                                label: k.label
                            }, v = [t], x.push(v), f.append(t.element)) : (v = x[z], t = v[0], t.label != d && t.element.attr("label", t.label = d));
                            H = null;
                            D = 0;
                            for (F = k.length; D < F; D++)s = k[D], (d = v[D + 1]) ? (H = d.element, d.label !== s.label &&
                            H.text(d.label = s.label), d.id !== s.id && H.val(d.id = s.id), d.selected !== s.selected && H.prop("selected", d.selected = s.selected)) : ("" === s.id && A ? I = A : (I = u.clone()).val(s.id).attr("selected", s.selected).text(s.label), v.push({
                                element: I,
                                label: s.label,
                                id: s.id,
                                selected: s.selected
                            }), H ? H.after(I) : t.element.append(I), H = I);
                            for (D++; v.length > D;)v.pop().element.remove()
                        }
                        for (; x.length > z;)x.pop()[0].element.remove()
                    }

                    var k;
                    if (!(k = t.match(d)))throw Ue("iexp", t, ga(f));
                    var l = c(k[2] || k[1]), m = k[4] || k[6], n = k[5], q = c(k[3] || ""), r =
                        c(k[2] ? k[1] : m), y = c(k[7]), w = k[8] ? c(k[8]) : null, x = [[{element: f, label: ""}]];
                    A && (a(A)(e), A.removeClass("ng-scope"), A.remove());
                    f.empty();
                    f.on("change", function () {
                        e.$apply(function () {
                            var a, c = y(e) || [], d = {}, h, k, l, q, t, u, v;
                            if (p)for (k = [], q = 0, u = x.length; q < u; q++)for (a = x[q], l = 1, t = a.length; l < t; l++) {
                                if ((h = a[l].element)[0].selected) {
                                    h = h.val();
                                    n && (d[n] = h);
                                    if (w)for (v = 0; v < c.length && (d[m] = c[v], w(e, d) != h); v++); else d[m] = c[h];
                                    k.push(r(e, d))
                                }
                            } else {
                                h = f.val();
                                if ("?" == h)k = s; else if ("" === h)k = null; else if (w)for (v = 0; v < c.length; v++) {
                                    if (d[m] =
                                            c[v], w(e, d) == h) {
                                        k = r(e, d);
                                        break
                                    }
                                } else d[m] = c[h], n && (d[n] = h), k = r(e, d);
                                1 < x[0].length && x[0][1].id !== h && (x[0][1].selected = !1)
                            }
                            g.$setViewValue(k)
                        })
                    });
                    g.$render = h;
                    e.$watch(h)
                }

                if (m[1]) {
                    var r = m[0];
                    m = m[1];
                    var p = g.multiple, t = g.ngOptions, A = !1, y, u = w(R.createElement("option")), B = w(R.createElement("optgroup")), v = u.clone();
                    g = 0;
                    for (var x = h.children(), C = x.length; g < C; g++)if ("" === x[g].value) {
                        y = A = x.eq(g);
                        break
                    }
                    r.init(m, A, v);
                    p && (m.$isEmpty = function (a) {
                        return !a || 0 === a.length
                    });
                    t ? n(e, h, m) : p ? l(e, h, m) : k(e, h, m, r)
                }
            }
        }
    }], id = ["$interpolate",
        function (a) {
            var c = {addOption: B, removeOption: B};
            return {
                restrict: "E", priority: 100, compile: function (d, e) {
                    if (z(e.value)) {
                        var f = a(d.text(), !0);
                        f || e.$set("value", d.text())
                    }
                    return function (a, d, e) {
                        var k = d.parent(), l = k.data("$selectController") || k.parent().data("$selectController");
                        l && l.databound ? d.prop("selected", !1) : l = c;
                        f ? a.$watch(f, function (a, c) {
                            e.$set("value", a);
                            a !== c && l.removeOption(c);
                            l.addOption(a)
                        }) : l.addOption(e.value);
                        d.on("$destroy", function () {
                            l.removeOption(e.value)
                        })
                    }
                }
            }
        }], hd = Z({restrict: "E", terminal: !0});
    Q.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : ((Ea = Q.jQuery) ? (w = Ea, y(Ea.fn, {
        scope: Ia.scope,
        isolateScope: Ia.isolateScope,
        controller: Ia.controller,
        injector: Ia.injector,
        inheritedData: Ia.inheritedData
    }), Bb("remove", !0, !0, !1), Bb("empty", !1, !1, !1), Bb("html", !1, !1, !0)) : w = H, Ca.element = w, $c(Ca), w(R).ready(function () {
        Xc(R, ac)
    }))
})(window, document);
!angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>');
