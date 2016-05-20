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
