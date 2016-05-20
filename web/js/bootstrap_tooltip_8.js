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
