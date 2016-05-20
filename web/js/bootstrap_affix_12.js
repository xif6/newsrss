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
