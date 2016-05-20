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
