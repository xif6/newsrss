+function (f) {
    var e = function (a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init("tooltip", a, b)
    };
    e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    };
    e.prototype.init = function (a, b, c) {
        this.enabled = !0;
        this.type = a;
        this.$element = f(b);
        this.options = this.getOptions(c);
        a = this.options.trigger.split(" ");
        for (b = a.length; b--;)if (c = a[b], "click" == c)this.$element.on("click." + this.type, this.options.selector, f.proxy(this.toggle, this)); else if ("manual" != c) {
            var d = "hover" == c ? "mouseleave" : "focusout";
            this.$element.on(("hover" == c ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, f.proxy(this.enter, this));
            this.$element.on(d + "." + this.type, this.options.selector, f.proxy(this.leave, this))
        }
        this.options.selector ? this._options = f.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    e.prototype.getDefaults =
        function () {
            return e.DEFAULTS
        };
    e.prototype.getOptions = function (a) {
        a = f.extend({}, this.getDefaults(), this.$element.data(), a);
        a.delay && "number" == typeof a.delay && (a.delay = {show: a.delay, hide: a.delay});
        return a
    };
    e.prototype.getDelegateOptions = function () {
        var a = {}, b = this.getDefaults();
        this._options && f.each(this._options, function (c, d) {
            b[c] != d && (a[c] = d)
        });
        return a
    };
    e.prototype.enter = function (a) {
        var b = a instanceof this.constructor ? a : f(a.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(b.timeout);
        b.hoverState = "in";
        if (!b.options.delay || !b.options.delay.show)return b.show();
        b.timeout = setTimeout(function () {
            "in" == b.hoverState && b.show()
        }, b.options.delay.show)
    };
    e.prototype.leave = function (a) {
        var b = a instanceof this.constructor ? a : f(a.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(b.timeout);
        b.hoverState = "out";
        if (!b.options.delay || !b.options.delay.hide)return b.hide();
        b.timeout = setTimeout(function () {
            "out" == b.hoverState && b.hide()
        }, b.options.delay.hide)
    };
    e.prototype.show = function () {
        var a = f.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled && (this.$element.trigger(a), !a.isDefaultPrevented())) {
            var b = this, a = this.tip();
            this.setContent();
            this.options.animation && a.addClass("fade");
            var c = "function" == typeof this.options.placement ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, d = /\s?auto?\s?/i, e = d.test(c);
            e && (c = c.replace(d, "") || "top");
            a.detach().css({top: 0, left: 0, display: "block"}).addClass(c);
            this.options.container ?
                a.appendTo(this.options.container) : a.insertAfter(this.$element);
            var d = this.getPosition(), k = a[0].offsetWidth, h = a[0].offsetHeight;
            if (e) {
                var g = this.$element.parent(), e = c, m = document.documentElement.scrollTop || document.body.scrollTop, l = "body" == this.options.container ? window.innerWidth : g.outerWidth(), n = "body" == this.options.container ? window.innerHeight : g.outerHeight(), g = "body" == this.options.container ? 0 : g.offset().left, c = "bottom" == c && d.top + d.height + h - m > n ? "top" : "top" == c && 0 > d.top - m - h ? "bottom" : "right" == c && d.right +
                k > l ? "left" : "left" == c && d.left - k < g ? "right" : c;
                a.removeClass(e).addClass(c)
            }
            d = this.getCalculatedOffset(c, d, k, h);
            this.applyPlacement(d, c);
            this.hoverState = null;
            c = function () {
                b.$element.trigger("shown.bs." + b.type)
            };
            f.support.transition && this.$tip.hasClass("fade") ? a.one(f.support.transition.end, c).emulateTransitionEnd(150) : c()
        }
    };
    e.prototype.applyPlacement = function (a, b) {
        var c, d = this.tip(), e = d[0].offsetWidth, k = d[0].offsetHeight, h = parseInt(d.css("margin-top"), 10), g = parseInt(d.css("margin-left"), 10);
        isNaN(h) &&
        (h = 0);
        isNaN(g) && (g = 0);
        a.top += h;
        a.left += g;
        f.offset.setOffset(d[0], f.extend({
            using: function (a) {
                d.css({top: Math.round(a.top), left: Math.round(a.left)})
            }
        }, a), 0);
        d.addClass("in");
        h = d[0].offsetWidth;
        g = d[0].offsetHeight;
        "top" == b && g != k && (c = !0, a.top = a.top + k - g);
        /bottom|top/.test(b) ? (k = 0, 0 > a.left && (k = -2 * a.left, a.left = 0, d.offset(a), h = d[0].offsetWidth, g = d[0].offsetHeight), this.replaceArrow(k - e + h, h, "left")) : this.replaceArrow(g - k, g, "top");
        c && d.offset(a)
    };
    e.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c,
            a ? 50 * (1 - a / b) + "%" : "")
    };
    e.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b);
        a.removeClass("fade in top bottom left right")
    };
    e.prototype.hide = function () {
        function a() {
            "in" != b.hoverState && c.detach();
            b.$element.trigger("hidden.bs." + b.type)
        }

        var b = this, c = this.tip(), d = f.Event("hide.bs." + this.type);
        this.$element.trigger(d);
        if (!d.isDefaultPrevented())return c.removeClass("in"), f.support.transition && this.$tip.hasClass("fade") ? c.one(f.support.transition.end,
            a).emulateTransitionEnd(150) : a(), this.hoverState = null, this
    };
    e.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    };
    e.prototype.hasContent = function () {
        return this.getTitle()
    };
    e.prototype.getPosition = function () {
        var a = this.$element[0];
        return f.extend({}, "function" == typeof a.getBoundingClientRect ? a.getBoundingClientRect() : {
            width: a.offsetWidth,
            height: a.offsetHeight
        }, this.$element.offset())
    };
    e.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    };
    e.prototype.getTitle = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(a[0]) : b.title)
    };
    e.prototype.tip = function () {
        return this.$tip = this.$tip || f(this.options.template)
    };
    e.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    e.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.options = this.$element = null)
    };
    e.prototype.enable = function () {
        this.enabled = !0
    };
    e.prototype.disable = function () {
        this.enabled = !1
    };
    e.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    };
    e.prototype.toggle = function (a) {
        a = a ? f(a.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        a.tip().hasClass("in") ?
            a.leave(a) : a.enter(a)
    };
    e.prototype.destroy = function () {
        clearTimeout(this.timeout);
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var l = f.fn.tooltip;
    f.fn.tooltip = function (a) {
        return this.each(function () {
            var b = f(this), c = b.data("bs.tooltip"), d = "object" == typeof a && a;
            if (c || "destroy" != a)if (c || b.data("bs.tooltip", c = new e(this, d)), "string" == typeof a)c[a]()
        })
    };
    f.fn.tooltip.Constructor = e;
    f.fn.tooltip.noConflict = function () {
        f.fn.tooltip = l;
        return this
    }
}(jQuery);

+function (b) {
    var f = function (c, a) {
        this.options = b.extend({}, f.DEFAULTS, a);
        this.$window = b(window).on("scroll.bs.affix.data-api", b.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", b.proxy(this.checkPositionWithEventLoop, this));
        this.$element = b(c);
        this.affixed = this.unpin = this.pinnedOffset = null;
        this.checkPosition()
    };
    f.RESET = "affix affix-top affix-bottom";
    f.DEFAULTS = {offset: 0};
    f.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset)return this.pinnedOffset;
        this.$element.removeClass(f.RESET).addClass("affix");
        var b = this.$window.scrollTop();
        return this.pinnedOffset = this.$element.offset().top - b
    };
    f.prototype.checkPositionWithEventLoop = function () {
        setTimeout(b.proxy(this.checkPosition, this), 1)
    };
    f.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var c = b(document).height(), a = this.$window.scrollTop(), d = this.$element.offset(), e = this.options.offset, h = e.top, g = e.bottom;
            "top" == this.affixed && (d.top += a);
            "object" != typeof e && (g = h = e);
            "function" == typeof h && (h = e.top(this.$element));
            "function" == typeof g &&
            (g = e.bottom(this.$element));
            a = null != this.unpin && a + this.unpin <= d.top ? !1 : null != g && d.top + this.$element.height() >= c - g ? "bottom" : null != h && a <= h ? "top" : !1;
            this.affixed !== a && (this.unpin && this.$element.css("top", ""), d = "affix" + (a ? "-" + a : ""), e = b.Event(d + ".bs.affix"), this.$element.trigger(e), e.isDefaultPrevented() || (this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(f.RESET).addClass(d).trigger(b.Event(d.replace("affix", "affixed"))), "bottom" == a && this.$element.offset({
                top: c -
                g - this.$element.height()
            })))
        }
    };
    var k = b.fn.affix;
    b.fn.affix = function (c) {
        return this.each(function () {
            var a = b(this), d = a.data("bs.affix"), e = "object" == typeof c && c;
            d || a.data("bs.affix", d = new f(this, e));
            if ("string" == typeof c)d[c]()
        })
    };
    b.fn.affix.Constructor = f;
    b.fn.affix.noConflict = function () {
        b.fn.affix = k;
        return this
    };
    b(window).on("load", function () {
        b('[data-spy="affix"]').each(function () {
            var c = b(this), a = c.data();
            a.offset = a.offset || {};
            a.offsetBottom && (a.offset.bottom = a.offsetBottom);
            a.offsetTop && (a.offset.top =
                a.offsetTop);
            c.affix(a)
        })
    })
}(jQuery);

+function (a) {
    var g = function (b) {
        a(b).on("click", '[data-dismiss="alert"]', this.close)
    };
    g.prototype.close = function (b) {
        function e() {
            d.trigger("closed.bs.alert").remove()
        }

        var c = a(this), f = c.attr("data-target");
        f || (f = (f = c.attr("href")) && f.replace(/.*(?=#[^\s]*$)/, ""));
        var d = a(f);
        b && b.preventDefault();
        d.length || (d = c.hasClass("alert") ? c : c.parent());
        d.trigger(b = a.Event("close.bs.alert"));
        b.isDefaultPrevented() || (d.removeClass("in"), a.support.transition && d.hasClass("fade") ? d.one(a.support.transition.end, e).emulateTransitionEnd(150) :
            e())
    };
    var h = a.fn.alert;
    a.fn.alert = function (b) {
        return this.each(function () {
            var e = a(this), c = e.data("bs.alert");
            c || e.data("bs.alert", c = new g(this));
            "string" == typeof b && c[b].call(e)
        })
    };
    a.fn.alert.Constructor = g;
    a.fn.alert.noConflict = function () {
        a.fn.alert = h;
        return this
    };
    a(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', g.prototype.close)
}(jQuery);

+function (c) {
    var d = function (a, b) {
        this.$element = c(a);
        this.options = c.extend({}, d.DEFAULTS, b);
        this.isLoading = !1
    };
    d.DEFAULTS = {loadingText: "loading..."};
    d.prototype.setState = function (a) {
        var b = this.$element, e = b.is("input") ? "val" : "html", d = b.data();
        a += "Text";
        d.resetText || b.data("resetText", b[e]());
        b[e](d[a] || this.options[a]);
        setTimeout(c.proxy(function () {
                "loadingText" == a ? (this.isLoading = !0, b.addClass("disabled").attr("disabled", "disabled")) : this.isLoading && (this.isLoading = !1, b.removeClass("disabled").removeAttr("disabled"))
            },
            this), 0)
    };
    d.prototype.toggle = function () {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active"));
            a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var f = c.fn.button;
    c.fn.button = function (a) {
        return this.each(function () {
            var b = c(this), e = b.data("bs.button"), f = "object" == typeof a && a;
            e || b.data("bs.button", e = new d(this, f));
            "toggle" == a ? e.toggle() : a && e.setState(a)
        })
    };
    c.fn.button.Constructor = d;
    c.fn.button.noConflict = function () {
        c.fn.button = f;
        return this
    };
    c(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (a) {
        var b = c(a.target);
        b.hasClass("btn") || (b = b.closest(".btn"));
        b.button("toggle");
        a.preventDefault()
    })
}(jQuery);

+function (b) {
    var d = function (a, f) {
        this.$element = b(a);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = f;
        this.paused = this.sliding = this.interval = this.$active = this.$items = null;
        "hover" == this.options.pause && this.$element.on("mouseenter", b.proxy(this.pause, this)).on("mouseleave", b.proxy(this.cycle, this))
    };
    d.DEFAULTS = {interval: 5E3, pause: "hover", wrap: !0};
    d.prototype.cycle = function (a) {
        a || (this.paused = !1);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused &&
        (this.interval = setInterval(b.proxy(this.next, this), this.options.interval));
        return this
    };
    d.prototype.getActiveIndex = function () {
        this.$active = this.$element.find(".item.active");
        this.$items = this.$active.parent().children();
        return this.$items.index(this.$active)
    };
    d.prototype.to = function (a) {
        var f = this, c = this.getActiveIndex();
        if (!(a > this.$items.length - 1 || 0 > a))return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            f.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", b(this.$items[a]))
    };
    d.prototype.pause = function (a) {
        a || (this.paused = !0);
        this.$element.find(".next, .prev").length && b.support.transition && (this.$element.trigger(b.support.transition.end), this.cycle(!0));
        this.interval = clearInterval(this.interval);
        return this
    };
    d.prototype.next = function () {
        if (!this.sliding)return this.slide("next")
    };
    d.prototype.prev = function () {
        if (!this.sliding)return this.slide("prev")
    };
    d.prototype.slide = function (a, f) {
        var c = this.$element.find(".item.active"), e = f || c[a](), d = this.interval, g = "next" == a ? "left" : "right",
            h = "next" == a ? "first" : "last", k = this;
        if (!e.length) {
            if (!this.options.wrap)return;
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active"))return this.sliding = !1;
        h = b.Event("slide.bs.carousel", {relatedTarget: e[0], direction: g});
        this.$element.trigger(h);
        if (!h.isDefaultPrevented())return this.sliding = !0, d && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function () {
            var a = b(k.$indicators.children()[k.getActiveIndex()]);
            a && a.addClass("active")
        })),
            b.support.transition && this.$element.hasClass("slide") ? (e.addClass(a), e[0].offsetWidth, c.addClass(g), e.addClass(g), c.one(b.support.transition.end, function () {
                e.removeClass([a, g].join(" ")).addClass("active");
                c.removeClass(["active", g].join(" "));
                k.sliding = !1;
                setTimeout(function () {
                    k.$element.trigger("slid.bs.carousel")
                }, 0)
            }).emulateTransitionEnd(1E3 * c.css("transition-duration").slice(0, -1))) : (c.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), d && this.cycle(),
            this
    };
    var m = b.fn.carousel;
    b.fn.carousel = function (a) {
        return this.each(function () {
            var f = b(this), c = f.data("bs.carousel"), e = b.extend({}, d.DEFAULTS, f.data(), "object" == typeof a && a), l = "string" == typeof a ? a : e.slide;
            c || f.data("bs.carousel", c = new d(this, e));
            if ("number" == typeof a)c.to(a); else if (l)c[l](); else e.interval && c.pause().cycle()
        })
    };
    b.fn.carousel.Constructor = d;
    b.fn.carousel.noConflict = function () {
        b.fn.carousel = m;
        return this
    };
    b(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]",
        function (a) {
            var f = b(this), c, e = b(f.attr("data-target") || (c = f.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""));
            c = b.extend({}, e.data(), f.data());
            var d = f.attr("data-slide-to");
            d && (c.interval = !1);
            e.carousel(c);
            (d = f.attr("data-slide-to")) && e.data("bs.carousel").to(d);
            a.preventDefault()
        });
    b(window).on("load", function () {
        b('[data-ride="carousel"]').each(function () {
            var a = b(this);
            a.carousel(a.data())
        })
    })
}(jQuery);

+function (b) {
    var e = function (a, c) {
        this.$element = b(a);
        this.options = b.extend({}, e.DEFAULTS, c);
        this.transitioning = null;
        this.options.parent && (this.$parent = b(this.options.parent));
        this.options.toggle && this.toggle()
    };
    e.DEFAULTS = {toggle: !0};
    e.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    };
    e.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var a = b.Event("show.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                if ((a = this.$parent &&
                        this.$parent.find("> .panel > .in")) && a.length) {
                    var c = a.data("bs.collapse");
                    if (c && c.transitioning)return;
                    a.collapse("hide");
                    c || a.data("bs.collapse", null)
                }
                var d = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[d](0);
                this.transitioning = 1;
                a = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[d]("auto");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!b.support.transition)return a.call(this);
                c = b.camelCase(["scroll", d].join("-"));
                this.$element.one(b.support.transition.end, b.proxy(a, this)).emulateTransitionEnd(350)[d](this.$element[0][c])
            }
        }
    };
    e.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var a = b.Event("hide.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                a = this.dimension();
                this.$element[a](this.$element[a]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
                this.transitioning = 1;
                var c = function () {
                    this.transitioning = 0;
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                if (!b.support.transition)return c.call(this);
                this.$element[a](0).one(b.support.transition.end, b.proxy(c, this)).emulateTransitionEnd(350)
            }
        }
    };
    e.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var k = b.fn.collapse;
    b.fn.collapse = function (a) {
        return this.each(function () {
            var c = b(this), d = c.data("bs.collapse"), g = b.extend({}, e.DEFAULTS, c.data(), "object" == typeof a && a);
            !d && g.toggle && "show" == a && (a = !a);
            d || c.data("bs.collapse", d = new e(this, g));
            if ("string" == typeof a)d[a]()
        })
    };
    b.fn.collapse.Constructor =
        e;
    b.fn.collapse.noConflict = function () {
        b.fn.collapse = k;
        return this
    };
    b(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (a) {
        var c = b(this), d;
        a = c.attr("data-target") || a.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "");
        d = b(a);
        var e = (a = d.data("bs.collapse")) ? "toggle" : c.data(), f = c.attr("data-parent"), h = f && b(f);
        a && a.transitioning || (h && h.find('[data-toggle=collapse][data-parent="' + f + '"]').not(c).addClass("collapsed"), c[d.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
        d.collapse(e)
    })
}(jQuery);

+function (d) {
    function g(b) {
        d(k).remove();
        d(f).each(function () {
            var a = h(d(this)), c = {relatedTarget: this};
            a.hasClass("open") && (a.trigger(b = d.Event("hide.bs.dropdown", c)), b.isDefaultPrevented() || a.removeClass("open").trigger("hidden.bs.dropdown", c))
        })
    }

    function h(b) {
        var a = b.attr("data-target");
        a || (a = (a = b.attr("href")) && /#[A-Za-z]/.test(a) && a.replace(/.*(?=#[^\s]*$)/, ""));
        return (a = a && d(a)) && a.length ? a : b.parent()
    }

    var k = ".dropdown-backdrop", f = "[data-toggle=dropdown]", e = function (b) {
        d(b).on("click.bs.dropdown",
            this.toggle)
    };
    e.prototype.toggle = function (b) {
        var a = d(this);
        if (!a.is(".disabled, :disabled")) {
            var c = h(a);
            b = c.hasClass("open");
            g();
            if (!b) {
                if ("ontouchstart" in document.documentElement && !c.closest(".navbar-nav").length)d('<div class="dropdown-backdrop"/>').insertAfter(d(this)).on("click", g);
                var e = {relatedTarget: this};
                c.trigger(b = d.Event("show.bs.dropdown", e));
                if (b.isDefaultPrevented())return;
                c.toggleClass("open").trigger("shown.bs.dropdown", e);
                a.focus()
            }
            return !1
        }
    };
    e.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var a =
                d(this);
            b.preventDefault();
            b.stopPropagation();
            if (!a.is(".disabled, :disabled")) {
                var c = h(a), e = c.hasClass("open");
                if (!e || e && 27 == b.keyCode)return 27 == b.which && c.find(f).focus(), a.click();
                a = c.find("[role=menu] li:not(.divider):visible a, [role=listbox] li:not(.divider):visible a");
                a.length && (c = a.index(a.filter(":focus")), 38 == b.keyCode && 0 < c && c--, 40 == b.keyCode && c < a.length - 1 && c++, ~c || (c = 0), a.eq(c).focus())
            }
        }
    };
    var l = d.fn.dropdown;
    d.fn.dropdown = function (b) {
        return this.each(function () {
            var a = d(this), c = a.data("bs.dropdown");
            c || a.data("bs.dropdown", c = new e(this));
            "string" == typeof b && c[b].call(a)
        })
    };
    d.fn.dropdown.Constructor = e;
    d.fn.dropdown.noConflict = function () {
        d.fn.dropdown = l;
        return this
    };
    d(document).on("click.bs.dropdown.data-api", g).on("click.bs.dropdown.data-api", ".dropdown form", function (b) {
        b.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, e.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ", [role=menu], [role=listbox]", e.prototype.keydown)
}(jQuery);

+function (a) {
    var d = function (b, c) {
        this.options = c;
        this.$element = a(b);
        this.$backdrop = this.isShown = null;
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    d.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0};
    d.prototype.toggle = function (a) {
        return this[this.isShown ? "hide" : "show"](a)
    };
    d.prototype.show = function (b) {
        var c = this, e = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(e);
        this.isShown || e.isDefaultPrevented() ||
        (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var e = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body);
            c.$element.show().scrollTop(0);
            e && c.$element[0].offsetWidth;
            c.$element.addClass("in").attr("aria-hidden", !1);
            c.enforceFocus();
            var d = a.Event("shown.bs.modal", {relatedTarget: b});
            e ? c.$element.find(".modal-dialog").one(a.support.transition.end,
                function () {
                    c.$element.focus().trigger(d)
                }).emulateTransitionEnd(300) : c.$element.focus().trigger(d)
        }))
    };
    d.prototype.hide = function (b) {
        b && b.preventDefault();
        b = a.Event("hide.bs.modal");
        this.$element.trigger(b);
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal,
            this)).emulateTransitionEnd(300) : this.hideModal())
    };
    d.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        }, this))
    };
    d.prototype.escape = function () {
        if (this.isShown && this.options.keyboard)this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)); else this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    };
    d.prototype.hideModal =
        function () {
            var a = this;
            this.$element.hide();
            this.backdrop(function () {
                a.removeBackdrop();
                a.$element.trigger("hidden.bs.modal")
            })
        };
    d.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    d.prototype.backdrop = function (b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && c;
            this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body);
            this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                a.target ===
                a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this));
            e && this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            b && (e ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b())
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var h = a.fn.modal;
    a.fn.modal =
        function (b, c) {
            return this.each(function () {
                var e = a(this), f = e.data("bs.modal"), g = a.extend({}, d.DEFAULTS, e.data(), "object" == typeof b && b);
                f || e.data("bs.modal", f = new d(this, g));
                if ("string" == typeof b)f[b](c); else g.show && f.show(c)
            })
        };
    a.fn.modal.Constructor = d;
    a.fn.modal.noConflict = function () {
        a.fn.modal = h;
        return this
    };
    a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), e = c.attr("href"), d = a(c.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), e = d.data("bs.modal") ?
            "toggle" : a.extend({remote: !/#/.test(e) && e}, d.data(), c.data());
        c.is("a") && b.preventDefault();
        d.modal(e, this).one("hide", function () {
            c.is(":visible") && c.focus()
        })
    });
    a(document).on("show.bs.modal", ".modal", function () {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function () {
        a(document.body).removeClass("modal-open")
    })
}(jQuery);

+function (b) {
    var a = function (c, a) {
        this.init("popover", c, a)
    };
    if (!b.fn.tooltip)throw Error("Popover requires tooltip.js");
    a.DEFAULTS = b.extend({}, b.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    a.prototype = b.extend({}, b.fn.tooltip.Constructor.prototype);
    a.prototype.constructor = a;
    a.prototype.getDefaults = function () {
        return a.DEFAULTS
    };
    a.prototype.setContent =
        function () {
            var c = this.tip(), a = this.getTitle(), b = this.getContent();
            c.find(".popover-title")[this.options.html ? "html" : "text"](a);
            c.find(".popover-content")[this.options.html ? "string" == typeof b ? "html" : "append" : "text"](b);
            c.removeClass("fade top bottom left right in");
            c.find(".popover-title").html() || c.find(".popover-title").hide()
        };
    a.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    a.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") ||
            ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    };
    a.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    a.prototype.tip = function () {
        this.$tip || (this.$tip = b(this.options.template));
        return this.$tip
    };
    var e = b.fn.popover;
    b.fn.popover = function (c) {
        return this.each(function () {
            var f = b(this), d = f.data("bs.popover"), e = "object" == typeof c && c;
            if (d || "destroy" != c)if (d || f.data("bs.popover", d = new a(this, e)), "string" == typeof c)d[c]()
        })
    };
    b.fn.popover.Constructor = a;
    b.fn.popover.noConflict =
        function () {
            b.fn.popover = e;
            return this
        }
}(jQuery);

+function (a) {
    function e(b, g) {
        var c, d = a.proxy(this.process, this);
        this.$element = a(b).is("body") ? a(window) : a(b);
        this.$body = a("body");
        this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", d);
        this.options = a.extend({}, e.DEFAULTS, g);
        this.selector = (this.options.target || (c = a(b).attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
        this.offsets = a([]);
        this.targets = a([]);
        this.activeTarget = null;
        this.refresh();
        this.process()
    }

    e.DEFAULTS = {offset: 10};
    e.prototype.refresh = function () {
        var b =
            this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]);
        this.targets = a([]);
        var g = this;
        this.$body.find(this.selector).map(function () {
            var c = a(this), c = c.data("target") || c.attr("href"), d = /^#./.test(c) && a(c);
            return d && d.length && d.is(":visible") && [[d[b]().top + (!a.isWindow(g.$scrollElement.get(0)) && g.$scrollElement.scrollTop()), c]] || null
        }).sort(function (b, a) {
            return b[0] - a[0]
        }).each(function () {
            g.offsets.push(this[0]);
            g.targets.push(this[1])
        })
    };
    e.prototype.process = function () {
        var b = this.$scrollElement.scrollTop() +
            this.options.offset, a = (this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight) - this.$scrollElement.height(), c = this.offsets, d = this.targets, e = this.activeTarget, f;
        if (b >= a)return e != (f = d.last()[0]) && this.activate(f);
        if (e && b <= c[0])return e != (f = d[0]) && this.activate(f);
        for (f = c.length; f--;)e != d[f] && b >= c[f] && (!c[f + 1] || b <= c[f + 1]) && this.activate(d[f])
    };
    e.prototype.activate = function (b) {
        this.activeTarget = b;
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        b = a(this.selector +
            '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]').parents("li").addClass("active");
        b.parent(".dropdown-menu").length && (b = b.closest("li.dropdown").addClass("active"));
        b.trigger("activate.bs.scrollspy")
    };
    var h = a.fn.scrollspy;
    a.fn.scrollspy = function (b) {
        return this.each(function () {
            var g = a(this), c = g.data("bs.scrollspy"), d = "object" == typeof b && b;
            c || g.data("bs.scrollspy", c = new e(this, d));
            if ("string" == typeof b)c[b]()
        })
    };
    a.fn.scrollspy.Constructor = e;
    a.fn.scrollspy.noConflict = function () {
        a.fn.scrollspy =
            h;
        return this
    };
    a(window).on("load", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(jQuery);

+function (c) {
    var d = function (a) {
        this.element = c(a)
    };
    d.prototype.show = function () {
        var a = this.element, e = a.closest("ul:not(.dropdown-menu)"), b = a.data("target");
        b || (b = (b = a.attr("href")) && b.replace(/.*(?=#[^\s]*$)/, ""));
        if (!a.parent("li").hasClass("active")) {
            var g = e.find(".active:last a")[0], f = c.Event("show.bs.tab", {relatedTarget: g});
            a.trigger(f);
            f.isDefaultPrevented() || (b = c(b), this.activate(a.parent("li"), e), this.activate(b, b.parent(), function () {
                a.trigger({type: "shown.bs.tab", relatedTarget: g})
            }))
        }
    };
    d.prototype.activate =
        function (a, e, b) {
            function g() {
                f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
                a.addClass("active");
                d ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade");
                a.parent(".dropdown-menu") && a.closest("li.dropdown").addClass("active");
                b && b()
            }

            var f = e.find("> .active"), d = b && c.support.transition && f.hasClass("fade");
            d ? f.one(c.support.transition.end, g).emulateTransitionEnd(150) : g();
            f.removeClass("in")
        };
    var h = c.fn.tab;
    c.fn.tab = function (a) {
        return this.each(function () {
            var e = c(this),
                b = e.data("bs.tab");
            b || e.data("bs.tab", b = new d(this));
            if ("string" == typeof a)b[a]()
        })
    };
    c.fn.tab.Constructor = d;
    c.fn.tab.noConflict = function () {
        c.fn.tab = h;
        return this
    };
    c(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (a) {
        a.preventDefault();
        c(this).tab("show")
    })
}(jQuery);

+function (b) {
    b.fn.emulateTransitionEnd = function (d) {
        var a = !1, c = this;
        b(this).one(b.support.transition.end, function () {
            a = !0
        });
        setTimeout(function () {
            a || b(c).trigger(b.support.transition.end)
        }, d);
        return this
    };
    b(function () {
        var d = b.support, a;
        a:{
            a = document.createElement("bootstrap");
            var c = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            }, e;
            for (e in c)if (void 0 !== a.style[e]) {
                a = {end: c[e]};
                break a
            }
            a = !1
        }
        d.transition = a
    })
}(jQuery);

!function (c) {
    var h = function (a, b) {
        this.$element = c(a);
        this.options = c.extend({}, c.fn.collection.defaults, b);
        var d = c(this.options.collection_id);
        "undefined" === typeof this.options.index && (this.options.index = {});
        this.options.initial_size || (this.options.initial_size = d.children().size());
        this.options.index[this.options.collection_id] = this.options.initial_size - 1
    };
    h.prototype = {
        constructor: h, add: function () {
            if (!("number" == typeof this.options.max && this.getItems().length >= this.options.max)) {
                this.options.index[this.options.collection_id] +=
                    1;
                var a = this.options.index[this.options.collection_id];
                c.isFunction(this.options.addcheckfunc) && !this.options.addcheckfunc() ? c.isFunction(this.options.addfailedfunc) && this.options.addfailedfunc() : this.addPrototype(a)
            }
        }, addPrototype: function (a) {
            var b = c(this.options.collection_id), d = b.data("prototype-name"), e = b.data("prototype-label");
            "undefined" === typeof d && (d = "__name__");
            "undefined" === typeof e && (e = "__name__label__");
            d = new RegExp("((\"|&quot;|'|&#039;)((?!(\"|&quot;|'|&#039;|__name__)).)+?)(" + d + ")",
                "ig");
            e = new RegExp("((\"|&quot;|'|&#039;)((?!(\"|&quot;|'|&#039;|__name__)).)+?)(" + e + ")", "ig");
            e = b.attr("data-prototype").replace(e, "$1" + a).replace(d, "$1" + a);
            e = c(e);
            !1 !== c(window).triggerHandler("before-add.mopa-collection-item", [b, e, a]) && (b.append(e), c(window).triggerHandler("add.mopa-collection-item", [b, e, a]))
        }, remove: function (a) {
            var b = c(this.options.collection_id);
            "undefined" == typeof a && (a = this.$element.closest(".collection-item"));
            if ("undefined" != typeof a) {
                a instanceof jQuery && (a = a.get(0));
                var d =
                    this.getIndex(a);
                if (-1 == d)throw Error("row not contained in collection");
                !1 !== c(window).triggerHandler("before-remove.mopa-collection-item", [b, a, d]) && (a.parentNode.removeChild(a), c(window).triggerHandler("remove.mopa-collection-item", [b, a, d]))
            }
        }, getIndex: function (a) {
            a instanceof jQuery && (a = a.get(0));
            for (var b = c(this.options.collection_id).children(), d = 0; d < b.size(); d++)if (a == b[d])return d;
            return -1
        }, getItem: function (a) {
            return this.getItems()[a]
        }, getItems: function () {
            return c(this.options.collection_id).children()
        }
    };
    c.fn.collection = function (a) {
        var b = arguments;
        return this.each(function () {
            var d = c(this), e = d.data("collection-add-btn"), f = d.data("collection"), g = "object" == typeof a ? a : {};
            if (e)g.collection_id = e; else if (d.closest(".collection-items").attr("id"))g.collection_id = "#" + d.closest(".collection-items").attr("id"); else if (g.collection_id = 0 === this.id.length ? !1 : "#" + this.id, !g.collection_id)throw Error("Could not load collection id");
            f || d.data("collection", f = new h(this, g));
            if (1 < b.length)var l = b[1], k;
            "add" == a && f.add();
            "remove" == a && f.remove(l);
            "getIndex" == a && (k = f.getIndex(l));
            "getItem" == a && (k = f.getItem(l));
            "getItems" == a && (k = f.getItems());
            1 < b.length && "function" == typeof b[2] && b[2].call(this, k)
        })
    };
    c.fn.collection.defaults = {collection_id: null, initial_size: 0, addcheckfunc: !1, addfailedfunc: !1, max: !1};
    c.fn.collection.Constructor = h;
    c(function () {
        c("body").on("click.collection.data-api", "[data-collection-add-btn]", function (a) {
            var b = c(a.target);
            b.hasClass("btn") || (b = b.closest(".btn"));
            b.collection("add");
            a.preventDefault()
        }).on("click.collection.data-api",
            "[data-collection-remove-btn]", function (a) {
                var b = c(a.target);
                b.hasClass("btn") || (b = b.closest(".btn"));
                b.collection("remove");
                a.preventDefault()
            })
    })
}(window.jQuery);

$(document).scroll(function () {
    if ($(".subnav").length) {
        if (!$(".subnav").attr("data-top")) {
            if ($(".subnav").hasClass("subnav-fixed"))return;
            var a = $(".subnav").offset();
            $(".subnav").attr("data-top", a.top)
        }
        $(".subnav").attr("data-top") - $(".subnav").outerHeight() <= $(this).scrollTop() ? $(".subnav").addClass("subnav-fixed") : $(".subnav").removeClass("subnav-fixed")
    }
});
