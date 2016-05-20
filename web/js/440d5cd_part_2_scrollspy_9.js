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
