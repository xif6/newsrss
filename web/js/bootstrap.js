+function (a) {
    function e() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        }, c;
        for (c in b)if (void 0 !== a.style[c])return {end: b[c]};
        return !1
    }

    a.fn.emulateTransitionEnd = function (d) {
        var b = !1, c = this;
        a(this).one("bsTransitionEnd", function () {
            b = !0
        });
        setTimeout(function () {
            b || a(c).trigger(a.support.transition.end)
        }, d);
        return this
    };
    a(function () {
        a.support.transition = e();
        a.support.transition &&
        (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (d) {
                if (a(d.target).is(this))return d.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery);

+function (a) {
    var b = function (c) {
        a(c).on("click", '[data-dismiss="alert"]', this.close)
    };
    b.VERSION = "3.2.0";
    b.prototype.close = function (c) {
        function f() {
            e.detach().trigger("closed.bs.alert").remove()
        }

        var d = a(this), b = d.attr("data-target");
        b || (b = (b = d.attr("href")) && b.replace(/.*(?=#[^\s]*$)/, ""));
        var e = a(b);
        c && c.preventDefault();
        e.length || (e = d.hasClass("alert") ? d : d.parent());
        e.trigger(c = a.Event("close.bs.alert"));
        c.isDefaultPrevented() || (e.removeClass("in"), a.support.transition && e.hasClass("fade") ? e.one("bsTransitionEnd",
            f).emulateTransitionEnd(150) : f())
    };
    var g = a.fn.alert;
    a.fn.alert = function (c) {
        return this.each(function () {
            var f = a(this), d = f.data("bs.alert");
            d || f.data("bs.alert", d = new b(this));
            "string" == typeof c && d[c].call(f)
        })
    };
    a.fn.alert.Constructor = b;
    a.fn.alert.noConflict = function () {
        a.fn.alert = g;
        return this
    };
    a(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', b.prototype.close)
}(jQuery);

+function (c) {
    function f(a) {
        return this.each(function () {
            var b = c(this), e = b.data("bs.button"), g = "object" == typeof a && a;
            e || b.data("bs.button", e = new d(this, g));
            "toggle" == a ? e.toggle() : a && e.setState(a)
        })
    }

    var d = function (a, b) {
        this.$element = c(a);
        this.options = c.extend({}, d.DEFAULTS, b);
        this.isLoading = !1
    };
    d.VERSION = "3.2.0";
    d.DEFAULTS = {loadingText: "loading..."};
    d.prototype.setState = function (a) {
        var b = this.$element, e = b.is("input") ? "val" : "html", d = b.data();
        a += "Text";
        null == d.resetText && b.data("resetText", b[e]());
        b[e](null ==
        d[a] ? this.options[a] : d[a]);
        setTimeout(c.proxy(function () {
            "loadingText" == a ? (this.isLoading = !0, b.addClass("disabled").attr("disabled", "disabled")) : this.isLoading && (this.isLoading = !1, b.removeClass("disabled").removeAttr("disabled"))
        }, this), 0)
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
    var h = c.fn.button;
    c.fn.button = f;
    c.fn.button.Constructor = d;
    c.fn.button.noConflict = function () {
        c.fn.button = h;
        return this
    };
    c(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (a) {
        var b = c(a.target);
        b.hasClass("btn") || (b = b.closest(".btn"));
        f.call(b, "toggle");
        a.preventDefault()
    })
}(jQuery);

+function (b) {
    function g(a) {
        return this.each(function () {
            var f = b(this), c = f.data("bs.carousel"), e = b.extend({}, d.DEFAULTS, f.data(), "object" == typeof a && a), m = "string" == typeof a ? a : e.slide;
            c || f.data("bs.carousel", c = new d(this, e));
            if ("number" == typeof a)c.to(a); else if (m)c[m](); else e.interval && c.pause().cycle()
        })
    }

    var d = function (a, f) {
        this.$element = b(a).on("keydown.bs.carousel", b.proxy(this.keydown, this));
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = f;
        this.paused = this.sliding = this.interval =
            this.$active = this.$items = null;
        "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", b.proxy(this.pause, this)).on("mouseleave.bs.carousel", b.proxy(this.cycle, this))
    };
    d.VERSION = "3.2.0";
    d.DEFAULTS = {interval: 5E3, pause: "hover", wrap: !0};
    d.prototype.keydown = function (a) {
        switch (a.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        a.preventDefault()
    };
    d.prototype.cycle = function (a) {
        a || (this.paused = !1);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused &&
        (this.interval = setInterval(b.proxy(this.next, this), this.options.interval));
        return this
    };
    d.prototype.getItemIndex = function (a) {
        this.$items = a.parent().children(".item");
        return this.$items.index(a || this.$active)
    };
    d.prototype.to = function (a) {
        var f = this, c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
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
        var c = this.$element.find(".item.active"), e = f || c[a](), d = this.interval, h = "next" == a ? "left" : "right",
            k = "next" == a ? "first" : "last", g = this;
        if (!e.length) {
            if (!this.options.wrap)return;
            e = this.$element.find(".item")[k]()
        }
        if (e.hasClass("active"))return this.sliding = !1;
        var k = e[0], l = b.Event("slide.bs.carousel", {relatedTarget: k, direction: h});
        this.$element.trigger(l);
        if (!l.isDefaultPrevented()) {
            this.sliding = !0;
            d && this.pause();
            this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), (l = b(this.$indicators.children()[this.getItemIndex(e)])) && l.addClass("active"));
            var n = b.Event("slid.bs.carousel",
                {relatedTarget: k, direction: h});
            b.support.transition && this.$element.hasClass("slide") ? (e.addClass(a), e[0].offsetWidth, c.addClass(h), e.addClass(h), c.one("bsTransitionEnd", function () {
                e.removeClass([a, h].join(" ")).addClass("active");
                c.removeClass(["active", h].join(" "));
                g.sliding = !1;
                setTimeout(function () {
                    g.$element.trigger(n)
                }, 0)
            }).emulateTransitionEnd(1E3 * c.css("transition-duration").slice(0, -1))) : (c.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger(n));
            d && this.cycle();
            return this
        }
    };
    var p = b.fn.carousel;
    b.fn.carousel = g;
    b.fn.carousel.Constructor = d;
    b.fn.carousel.noConflict = function () {
        b.fn.carousel = p;
        return this
    };
    b(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (a) {
        var d, c = b(this), e = b(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (e.hasClass("carousel")) {
            d = b.extend({}, e.data(), c.data());
            if (c = c.attr("data-slide-to"))d.interval = !1;
            g.call(e, d);
            c && e.data("bs.carousel").to(c);
            a.preventDefault()
        }
    });
    b(window).on("load",
        function () {
            b('[data-ride="carousel"]').each(function () {
                var a = b(this);
                g.call(a, a.data())
            })
        })
}(jQuery);

+function (b) {
    function f(a) {
        return this.each(function () {
            var c = b(this), d = c.data("bs.collapse"), h = b.extend({}, e.DEFAULTS, c.data(), "object" == typeof a && a);
            !d && h.toggle && "show" == a && (a = !a);
            d || c.data("bs.collapse", d = new e(this, h));
            if ("string" == typeof a)d[a]()
        })
    }

    var e = function (a, c) {
        this.$element = b(a);
        this.options = b.extend({}, e.DEFAULTS, c);
        this.transitioning = null;
        this.options.parent && (this.$parent = b(this.options.parent));
        this.options.toggle && this.toggle()
    };
    e.VERSION = "3.2.0";
    e.DEFAULTS = {toggle: !0};
    e.prototype.dimension =
        function () {
            return this.$element.hasClass("width") ? "width" : "height"
        };
    e.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var a = b.Event("show.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                if ((a = this.$parent && this.$parent.find("> .panel > .in")) && a.length) {
                    var c = a.data("bs.collapse");
                    if (c && c.transitioning)return;
                    f.call(a, "hide");
                    c || a.data("bs.collapse", null)
                }
                var d = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[d](0);
                this.transitioning =
                    1;
                a = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[d]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!b.support.transition)return a.call(this);
                c = b.camelCase(["scroll", d].join("-"));
                this.$element.one("bsTransitionEnd", b.proxy(a, this)).emulateTransitionEnd(350)[d](this.$element[0][c])
            }
        }
    };
    e.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var a = b.Event("hide.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                a =
                    this.dimension();
                this.$element[a](this.$element[a]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
                this.transitioning = 1;
                var c = function () {
                    this.transitioning = 0;
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                if (!b.support.transition)return c.call(this);
                this.$element[a](0).one("bsTransitionEnd", b.proxy(c, this)).emulateTransitionEnd(350)
            }
        }
    };
    e.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" :
            "show"]()
    };
    var l = b.fn.collapse;
    b.fn.collapse = f;
    b.fn.collapse.Constructor = e;
    b.fn.collapse.noConflict = function () {
        b.fn.collapse = l;
        return this
    };
    b(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (a) {
        var c, d = b(this);
        a = d.attr("data-target") || a.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        c = b(a);
        var e = (a = c.data("bs.collapse")) ? "toggle" : d.data(), g = d.attr("data-parent"), k = g && b(g);
        a && a.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + g + '"]').not(d).addClass("collapsed"),
            d[c.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
        f.call(c, e)
    })
}(jQuery);

+function (d) {
    function g(b) {
        b && 3 === b.which || (d(k).remove(), d(f).each(function () {
            var a = h(d(this)), c = {relatedTarget: this};
            a.hasClass("open") && (a.trigger(b = d.Event("hide.bs.dropdown", c)), b.isDefaultPrevented() || a.removeClass("open").trigger("hidden.bs.dropdown", c))
        }))
    }

    function h(b) {
        var a = b.attr("data-target");
        a || (a = (a = b.attr("href")) && /#[A-Za-z]/.test(a) && a.replace(/.*(?=#[^\s]*$)/, ""));
        return (a = a && d(a)) && a.length ? a : b.parent()
    }

    var k = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', e = function (b) {
        d(b).on("click.bs.dropdown",
            this.toggle)
    };
    e.VERSION = "3.2.0";
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
                a.trigger("focus");
                c.toggleClass("open").trigger("shown.bs.dropdown", e)
            }
            return !1
        }
    };
    e.prototype.keydown =
        function (b) {
            if (/(38|40|27)/.test(b.keyCode)) {
                var a = d(this);
                b.preventDefault();
                b.stopPropagation();
                if (!a.is(".disabled, :disabled")) {
                    var c = h(a), e = c.hasClass("open");
                    if (!e || e && 27 == b.keyCode)return 27 == b.which && c.find(f).trigger("focus"), a.trigger("click");
                    a = c.find('[role="menu"] li:not(.divider):visible a, [role="listbox"] li:not(.divider):visible a');
                    a.length && (c = a.index(a.filter(":focus")), 38 == b.keyCode && 0 < c && c--, 40 == b.keyCode && c < a.length - 1 && c++, ~c || (c = 0), a.eq(c).trigger("focus"))
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
    }).on("click.bs.dropdown.data-api", f, e.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]',
        e.prototype.keydown)
}(jQuery);

+function (b) {
    function g(a, d) {
        return this.each(function () {
            var e = b(this), f = e.data("bs.modal"), h = b.extend({}, c.DEFAULTS, e.data(), "object" == typeof a && a);
            f || e.data("bs.modal", f = new c(this, h));
            if ("string" == typeof a)f[a](d); else h.show && f.show(d)
        })
    }

    var c = function (a, d) {
        this.options = d;
        this.$body = b(document.body);
        this.$element = b(a);
        this.$backdrop = this.isShown = null;
        this.scrollbarWidth = 0;
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, b.proxy(function () {
                this.$element.trigger("loaded.bs.modal")
            },
            this))
    };
    c.VERSION = "3.2.0";
    c.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0};
    c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    };
    c.prototype.show = function (a) {
        var d = this, e = b.Event("show.bs.modal", {relatedTarget: a});
        this.$element.trigger(e);
        this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', b.proxy(this.hide, this)), this.backdrop(function () {
            var e =
                b.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body);
            d.$element.show().scrollTop(0);
            e && d.$element[0].offsetWidth;
            d.$element.addClass("in").attr("aria-hidden", !1);
            d.enforceFocus();
            var c = b.Event("shown.bs.modal", {relatedTarget: a});
            e ? d.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                d.$element.trigger("focus").trigger(c)
            }).emulateTransitionEnd(300) : d.$element.trigger("focus").trigger(c)
        }))
    };
    c.prototype.hide = function (a) {
        a && a.preventDefault();
        a = b.Event("hide.bs.modal");
        this.$element.trigger(a);
        this.isShown && !a.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), b(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), b.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", b.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    };
    c.prototype.enforceFocus = function () {
        b(document).off("focusin.bs.modal").on("focusin.bs.modal",
            b.proxy(function (a) {
                this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
            }, this))
    };
    c.prototype.escape = function () {
        if (this.isShown && this.options.keyboard)this.$element.on("keyup.dismiss.bs.modal", b.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)); else this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    };
    c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide();
        this.backdrop(function () {
            a.$element.trigger("hidden.bs.modal")
        })
    };
    c.prototype.removeBackdrop =
        function () {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null
        };
    c.prototype.backdrop = function (a) {
        var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var c = b.support.transition && e;
            this.$backdrop = b('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", b.proxy(function (a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this));
            c && this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            a && (c ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(150) : a())
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e = function () {
            d.removeBackdrop();
            a && a()
        }, b.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e()) : a && a()
    };
    c.prototype.checkScrollbar = function () {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth ||
            this.measureScrollbar())
    };
    c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    };
    c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    };
    c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure";
        this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        this.$body[0].removeChild(a);
        return b
    };
    var k = b.fn.modal;
    b.fn.modal =
        g;
    b.fn.modal.Constructor = c;
    b.fn.modal.noConflict = function () {
        b.fn.modal = k;
        return this
    };
    b(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (a) {
        var d = b(this), c = d.attr("href"), f = b(d.attr("data-target") || c && c.replace(/.*(?=#[^\s]+$)/, "")), c = f.data("bs.modal") ? "toggle" : b.extend({remote: !/#/.test(c) && c}, f.data(), d.data());
        d.is("a") && a.preventDefault();
        f.one("show.bs.modal", function (a) {
            if (!a.isDefaultPrevented())f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        });
        g.call(f, c, this)
    })
}(jQuery);

+function (e) {
    var c = function (b, a) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init("tooltip", b, a)
    };
    c.VERSION = "3.2.0";
    c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    };
    c.prototype.init = function (b, a, d) {
        this.enabled = !0;
        this.type = b;
        this.$element =
            e(a);
        this.options = this.getOptions(d);
        this.$viewport = this.options.viewport && e(this.options.viewport.selector || this.options.viewport);
        b = this.options.trigger.split(" ");
        for (a = b.length; a--;)if (d = b[a], "click" == d)this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != d) {
            var h = "hover" == d ? "mouseleave" : "focusout";
            this.$element.on(("hover" == d ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, e.proxy(this.enter, this));
            this.$element.on(h + "." + this.type,
                this.options.selector, e.proxy(this.leave, this))
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    c.prototype.getDefaults = function () {
        return c.DEFAULTS
    };
    c.prototype.getOptions = function (b) {
        b = e.extend({}, this.getDefaults(), this.$element.data(), b);
        b.delay && "number" == typeof b.delay && (b.delay = {show: b.delay, hide: b.delay});
        return b
    };
    c.prototype.getDelegateOptions = function () {
        var b = {}, a = this.getDefaults();
        this._options && e.each(this._options, function (d,
                                                         h) {
            a[d] != h && (b[d] = h)
        });
        return b
    };
    c.prototype.enter = function (b) {
        var a = b instanceof this.constructor ? b : e(b.currentTarget).data("bs." + this.type);
        a || (a = new this.constructor(b.currentTarget, this.getDelegateOptions()), e(b.currentTarget).data("bs." + this.type, a));
        clearTimeout(a.timeout);
        a.hoverState = "in";
        if (!a.options.delay || !a.options.delay.show)return a.show();
        a.timeout = setTimeout(function () {
            "in" == a.hoverState && a.show()
        }, a.options.delay.show)
    };
    c.prototype.leave = function (b) {
        var a = b instanceof this.constructor ?
            b : e(b.currentTarget).data("bs." + this.type);
        a || (a = new this.constructor(b.currentTarget, this.getDelegateOptions()), e(b.currentTarget).data("bs." + this.type, a));
        clearTimeout(a.timeout);
        a.hoverState = "out";
        if (!a.options.delay || !a.options.delay.hide)return a.hide();
        a.timeout = setTimeout(function () {
            "out" == a.hoverState && a.hide()
        }, a.options.delay.hide)
    };
    c.prototype.show = function () {
        var b = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var a = e.contains(document.documentElement,
                this.$element[0]);
            if (!b.isDefaultPrevented() && a) {
                var d = this, b = this.tip(), a = this.getUID(this.type);
                this.setContent();
                b.attr("id", a);
                this.$element.attr("aria-describedby", a);
                this.options.animation && b.addClass("fade");
                var a = "function" == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement, h = /\s?auto?\s?/i, c = h.test(a);
                c && (a = a.replace(h, "") || "top");
                b.detach().css({top: 0, left: 0, display: "block"}).addClass(a).data("bs." + this.type, this);
                this.options.container ?
                    b.appendTo(this.options.container) : b.insertAfter(this.$element);
                var h = this.getPosition(), g = b[0].offsetWidth, f = b[0].offsetHeight;
                if (c) {
                    var c = a, k = this.$element.parent(), k = this.getPosition(k), a = "bottom" == a && h.top + h.height + f - k.scroll > k.height ? "top" : "top" == a && 0 > h.top - k.scroll - f ? "bottom" : "right" == a && h.right + g > k.width ? "left" : "left" == a && h.left - g < k.left ? "right" : a;
                    b.removeClass(c).addClass(a)
                }
                h = this.getCalculatedOffset(a, h, g, f);
                this.applyPlacement(h, a);
                a = function () {
                    d.$element.trigger("shown.bs." + d.type);
                    d.hoverState =
                        null
                };
                e.support.transition && this.$tip.hasClass("fade") ? b.one("bsTransitionEnd", a).emulateTransitionEnd(150) : a()
            }
        }
    };
    c.prototype.applyPlacement = function (b, a) {
        var d = this.tip(), c = d[0].offsetWidth, l = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), f = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0);
        isNaN(f) && (f = 0);
        b.top += g;
        b.left += f;
        e.offset.setOffset(d[0], e.extend({
            using: function (a) {
                d.css({top: Math.round(a.top), left: Math.round(a.left)})
            }
        }, b), 0);
        d.addClass("in");
        var f = d[0].offsetWidth, k = d[0].offsetHeight;
        "top" == a && k != l && (b.top = b.top + l - k);
        g = this.getViewportAdjustedDelta(a, b, f, k);
        g.left ? b.left += g.left : b.top += g.top;
        c = g.left ? 2 * g.left - c + f : 2 * g.top - l + k;
        l = g.left ? "left" : "top";
        g = g.left ? "offsetWidth" : "offsetHeight";
        d.offset(b);
        this.replaceArrow(c, d[0][g], l)
    };
    c.prototype.replaceArrow = function (b, a, d) {
        this.arrow().css(d, b ? 50 * (1 - b / a) + "%" : "")
    };
    c.prototype.setContent = function () {
        var b = this.tip(), a = this.getTitle();
        b.find(".tooltip-inner")[this.options.html ? "html" : "text"](a);
        b.removeClass("fade in top bottom left right")
    };
    c.prototype.hide = function () {
        function b() {
            "in" != a.hoverState && d.detach();
            a.$element.trigger("hidden.bs." + a.type)
        }

        var a = this, d = this.tip(), c = e.Event("hide.bs." + this.type);
        this.$element.removeAttr("aria-describedby");
        this.$element.trigger(c);
        if (!c.isDefaultPrevented())return d.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), this.hoverState = null, this
    };
    c.prototype.fixTitle = function () {
        var b = this.$element;
        (b.attr("title") || "string" != typeof b.attr("data-original-title")) && b.attr("data-original-title", b.attr("title") || "").attr("title", "")
    };
    c.prototype.hasContent = function () {
        return this.getTitle()
    };
    c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var a = b[0], d = "BODY" == a.tagName;
        return e.extend({}, "function" == typeof a.getBoundingClientRect ? a.getBoundingClientRect() : null, {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
                width: d ? e(window).width() : b.outerWidth(),
                height: d ? e(window).height() : b.outerHeight()
            },
            d ? {top: 0, left: 0} : b.offset())
    };
    c.prototype.getCalculatedOffset = function (b, a, d, c) {
        return "bottom" == b ? {
            top: a.top + a.height,
            left: a.left + a.width / 2 - d / 2
        } : "top" == b ? {
            top: a.top - c,
            left: a.left + a.width / 2 - d / 2
        } : "left" == b ? {top: a.top + a.height / 2 - c / 2, left: a.left - d} : {
            top: a.top + a.height / 2 - c / 2,
            left: a.left + a.width
        }
    };
    c.prototype.getViewportAdjustedDelta = function (b, a, d, c) {
        var e = {top: 0, left: 0};
        if (!this.$viewport)return e;
        var g = this.options.viewport && this.options.viewport.padding || 0, f = this.getPosition(this.$viewport);
        /right|left/.test(b) ?
            (d = a.top - g - f.scroll, a = a.top + g - f.scroll + c, d < f.top ? e.top = f.top - d : a > f.top + f.height && (e.top = f.top + f.height - a)) : (c = a.left - g, a = a.left + g + d, c < f.left ? e.left = f.left - c : a > f.width && (e.left = f.left + f.width - a));
        return e
    };
    c.prototype.getTitle = function () {
        var b = this.$element, a = this.options;
        return b.attr("data-original-title") || ("function" == typeof a.title ? a.title.call(b[0]) : a.title)
    };
    c.prototype.getUID = function (b) {
        do b += ~~(1E6 * Math.random()); while (document.getElementById(b));
        return b
    };
    c.prototype.tip = function () {
        return this.$tip =
            this.$tip || e(this.options.template)
    };
    c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    c.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.options = this.$element = null)
    };
    c.prototype.enable = function () {
        this.enabled = !0
    };
    c.prototype.disable = function () {
        this.enabled = !1
    };
    c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    };
    c.prototype.toggle = function (b) {
        var a = this;
        b && (a = e(b.currentTarget).data("bs." + this.type), a || (a = new this.constructor(b.currentTarget,
            this.getDelegateOptions()), e(b.currentTarget).data("bs." + this.type, a)));
        a.tip().hasClass("in") ? a.leave(a) : a.enter(a)
    };
    c.prototype.destroy = function () {
        clearTimeout(this.timeout);
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var m = e.fn.tooltip;
    e.fn.tooltip = function (b) {
        return this.each(function () {
            var a = e(this), d = a.data("bs.tooltip"), h = "object" == typeof b && b;
            if (d || "destroy" != b)if (d || a.data("bs.tooltip", d = new c(this, h)), "string" == typeof b)d[b]()
        })
    };
    e.fn.tooltip.Constructor = c;
    e.fn.tooltip.noConflict =
        function () {
            e.fn.tooltip = m;
            return this
        }
}(jQuery);

+function (b) {
    var a = function (c, a) {
        this.init("popover", c, a)
    };
    if (!b.fn.tooltip)throw Error("Popover requires tooltip.js");
    a.VERSION = "3.2.0";
    a.DEFAULTS = b.extend({}, b.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    a.prototype = b.extend({}, b.fn.tooltip.Constructor.prototype);
    a.prototype.constructor = a;
    a.prototype.getDefaults = function () {
        return a.DEFAULTS
    };
    a.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), d = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b);
        a.find(".popover-content").empty()[this.options.html ? "string" == typeof d ? "html" : "append" : "text"](d);
        a.removeClass("fade top bottom left right in");
        a.find(".popover-title").html() || a.find(".popover-title").hide()
    };
    a.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    a.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
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
    b.fn.popover.Constructor =
        a;
    b.fn.popover.noConflict = function () {
        b.fn.popover = e;
        return this
    }
}(jQuery);

+function (b) {
    function c(a, h) {
        var f = b.proxy(this.process, this);
        this.$body = b("body");
        this.$scrollElement = b(a).is("body") ? b(window) : b(a);
        this.options = b.extend({}, c.DEFAULTS, h);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", f);
        this.refresh();
        this.process()
    }

    function k(a) {
        return this.each(function () {
            var h = b(this), f = h.data("bs.scrollspy"), d = "object" == typeof a && a;
            f || h.data("bs.scrollspy",
                f = new c(this, d));
            if ("string" == typeof a)f[a]()
        })
    }

    c.VERSION = "3.2.0";
    c.DEFAULTS = {offset: 10};
    c.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    c.prototype.refresh = function () {
        var a = "offset", h = 0;
        b.isWindow(this.$scrollElement[0]) || (a = "position", h = this.$scrollElement.scrollTop());
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        var f = this;
        this.$body.find(this.selector).map(function () {
            var d =
                b(this), d = d.data("target") || d.attr("href"), g = /^#./.test(d) && b(d);
            return g && g.length && g.is(":visible") && [[g[a]().top + h, d]] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            f.offsets.push(this[0]);
            f.targets.push(this[1])
        })
    };
    c.prototype.process = function () {
        var a = this.$scrollElement.scrollTop() + this.options.offset, b = this.getScrollHeight(), f = this.options.offset + b - this.$scrollElement.height(), d = this.offsets, g = this.targets, c = this.activeTarget, e;
        this.scrollHeight != b && this.refresh();
        if (a >= f)return c !=
            (e = g[g.length - 1]) && this.activate(e);
        if (c && a <= d[0])return c != (e = g[0]) && this.activate(e);
        for (e = d.length; e--;)c != g[e] && a >= d[e] && (!d[e + 1] || a <= d[e + 1]) && this.activate(g[e])
    };
    c.prototype.activate = function (a) {
        this.activeTarget = a;
        b(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        a = b(this.selector + '[data-target="' + a + '"],' + this.selector + '[href="' + a + '"]').parents("li").addClass("active");
        a.parent(".dropdown-menu").length && (a = a.closest("li.dropdown").addClass("active"));
        a.trigger("activate.bs.scrollspy")
    };
    var l = b.fn.scrollspy;
    b.fn.scrollspy = k;
    b.fn.scrollspy.Constructor = c;
    b.fn.scrollspy.noConflict = function () {
        b.fn.scrollspy = l;
        return this
    };
    b(window).on("load.bs.scrollspy.data-api", function () {
        b('[data-spy="scroll"]').each(function () {
            var a = b(this);
            k.call(a, a.data())
        })
    })
}(jQuery);

+function (c) {
    function f(a) {
        return this.each(function () {
            var g = c(this), b = g.data("bs.tab");
            b || g.data("bs.tab", b = new d(this));
            if ("string" == typeof a)b[a]()
        })
    }

    var d = function (a) {
        this.element = c(a)
    };
    d.VERSION = "3.2.0";
    d.prototype.show = function () {
        var a = this.element, g = a.closest("ul:not(.dropdown-menu)"), b = a.data("target");
        b || (b = (b = a.attr("href")) && b.replace(/.*(?=#[^\s]*$)/, ""));
        if (!a.parent("li").hasClass("active")) {
            var d = g.find(".active:last a")[0], e = c.Event("show.bs.tab", {relatedTarget: d});
            a.trigger(e);
            e.isDefaultPrevented() ||
            (b = c(b), this.activate(a.closest("li"), g), this.activate(b, b.parent(), function () {
                a.trigger({type: "shown.bs.tab", relatedTarget: d})
            }))
        }
    };
    d.prototype.activate = function (a, d, b) {
        function f() {
            e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
            a.addClass("active");
            h ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade");
            a.parent(".dropdown-menu") && a.closest("li.dropdown").addClass("active");
            b && b()
        }

        var e = d.find("> .active"), h = b && c.support.transition && e.hasClass("fade");
        h ? e.one("bsTransitionEnd",
            f).emulateTransitionEnd(150) : f();
        e.removeClass("in")
    };
    var k = c.fn.tab;
    c.fn.tab = f;
    c.fn.tab.Constructor = d;
    c.fn.tab.noConflict = function () {
        c.fn.tab = k;
        return this
    };
    c(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (a) {
        a.preventDefault();
        f.call(c(this), "show")
    })
}(jQuery);

+function (b) {
    function k(c) {
        return this.each(function () {
            var a = b(this), f = a.data("bs.affix"), d = "object" == typeof c && c;
            f || a.data("bs.affix", f = new e(this, d));
            if ("string" == typeof c)f[c]()
        })
    }

    var e = function (c, a) {
        this.options = b.extend({}, e.DEFAULTS, a);
        this.$target = b(this.options.target).on("scroll.bs.affix.data-api", b.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", b.proxy(this.checkPositionWithEventLoop, this));
        this.$element = b(c);
        this.affixed = this.unpin = this.pinnedOffset = null;
        this.checkPosition()
    };
    e.VERSION = "3.2.0";
    e.RESET = "affix affix-top affix-bottom";
    e.DEFAULTS = {offset: 0, target: window};
    e.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset)return this.pinnedOffset;
        this.$element.removeClass(e.RESET).addClass("affix");
        var b = this.$target.scrollTop();
        return this.pinnedOffset = this.$element.offset().top - b
    };
    e.prototype.checkPositionWithEventLoop = function () {
        setTimeout(b.proxy(this.checkPosition, this), 1)
    };
    e.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var c = b(document).height(),
                a = this.$target.scrollTop(), f = this.$element.offset(), d = this.options.offset, h = d.top, g = d.bottom;
            "object" != typeof d && (g = h = d);
            "function" == typeof h && (h = d.top(this.$element));
            "function" == typeof g && (g = d.bottom(this.$element));
            a = null != this.unpin && a + this.unpin <= f.top ? !1 : null != g && f.top + this.$element.height() >= c - g ? "bottom" : null != h && a <= h ? "top" : !1;
            this.affixed !== a && (null != this.unpin && this.$element.css("top", ""), f = "affix" + (a ? "-" + a : ""), d = b.Event(f + ".bs.affix"), this.$element.trigger(d), d.isDefaultPrevented() || (this.affixed =
                a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(e.RESET).addClass(f).trigger(b.Event(f.replace("affix", "affixed"))), "bottom" == a && this.$element.offset({top: c - this.$element.height() - g})))
        }
    };
    var l = b.fn.affix;
    b.fn.affix = k;
    b.fn.affix.Constructor = e;
    b.fn.affix.noConflict = function () {
        b.fn.affix = l;
        return this
    };
    b(window).on("load", function () {
        b('[data-spy="affix"]').each(function () {
            var c = b(this), a = c.data();
            a.offset = a.offset || {};
            a.offsetBottom && (a.offset.bottom = a.offsetBottom);
            a.offsetTop &&
            (a.offset.top = a.offsetTop);
            k.call(c, a)
        })
    })
}(jQuery);
