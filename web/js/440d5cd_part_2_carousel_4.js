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
