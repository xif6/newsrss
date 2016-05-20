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
