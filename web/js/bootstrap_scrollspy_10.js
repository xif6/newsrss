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
