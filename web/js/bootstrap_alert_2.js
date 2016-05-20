+function (a) {
    var b = function (c) {
        a(c).on("click", '[data-dismiss="alert"]', this.close)
    };
    b.VERSION = "3.2.0";
    b.prototype.close = function (c) {
        function f() {
            e.detach().trigger("closed.bs.alert").remove()
        }

        var d = a(this), b = d.attr("data-target");
        b || (b = (b = d.attr("href")) && b.replace(/.*(?=#[^\s]*$)/, ""));
        var e = a(b);
        c && c.preventDefault();
        e.length || (e = d.hasClass("alert") ? d : d.parent());
        e.trigger(c = a.Event("close.bs.alert"));
        c.isDefaultPrevented() || (e.removeClass("in"), a.support.transition && e.hasClass("fade") ? e.one("bsTransitionEnd",
            f).emulateTransitionEnd(150) : f())
    };
    var g = a.fn.alert;
    a.fn.alert = function (c) {
        return this.each(function () {
            var f = a(this), d = f.data("bs.alert");
            d || f.data("bs.alert", d = new b(this));
            "string" == typeof c && d[c].call(f)
        })
    };
    a.fn.alert.Constructor = b;
    a.fn.alert.noConflict = function () {
        a.fn.alert = g;
        return this
    };
    a(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', b.prototype.close)
}(jQuery);
