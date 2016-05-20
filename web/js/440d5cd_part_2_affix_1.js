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
