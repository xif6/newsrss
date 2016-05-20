+function (c) {
    var d = function (a) {
        this.element = c(a)
    };
    d.prototype.show = function () {
        var a = this.element, e = a.closest("ul:not(.dropdown-menu)"), b = a.data("target");
        b || (b = (b = a.attr("href")) && b.replace(/.*(?=#[^\s]*$)/, ""));
        if (!a.parent("li").hasClass("active")) {
            var g = e.find(".active:last a")[0], f = c.Event("show.bs.tab", {relatedTarget: g});
            a.trigger(f);
            f.isDefaultPrevented() || (b = c(b), this.activate(a.parent("li"), e), this.activate(b, b.parent(), function () {
                a.trigger({type: "shown.bs.tab", relatedTarget: g})
            }))
        }
    };
    d.prototype.activate =
        function (a, e, b) {
            function g() {
                f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
                a.addClass("active");
                d ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade");
                a.parent(".dropdown-menu") && a.closest("li.dropdown").addClass("active");
                b && b()
            }

            var f = e.find("> .active"), d = b && c.support.transition && f.hasClass("fade");
            d ? f.one(c.support.transition.end, g).emulateTransitionEnd(150) : g();
            f.removeClass("in")
        };
    var h = c.fn.tab;
    c.fn.tab = function (a) {
        return this.each(function () {
            var e = c(this),
                b = e.data("bs.tab");
            b || e.data("bs.tab", b = new d(this));
            if ("string" == typeof a)b[a]()
        })
    };
    c.fn.tab.Constructor = d;
    c.fn.tab.noConflict = function () {
        c.fn.tab = h;
        return this
    };
    c(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (a) {
        a.preventDefault();
        c(this).tab("show")
    })
}(jQuery);
