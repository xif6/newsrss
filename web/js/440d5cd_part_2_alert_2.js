+function (a) {
    var g = function (b) {
        a(b).on("click", '[data-dismiss="alert"]', this.close)
    };
    g.prototype.close = function (b) {
        function e() {
            d.trigger("closed.bs.alert").remove()
        }

        var c = a(this), f = c.attr("data-target");
        f || (f = (f = c.attr("href")) && f.replace(/.*(?=#[^\s]*$)/, ""));
        var d = a(f);
        b && b.preventDefault();
        d.length || (d = c.hasClass("alert") ? c : c.parent());
        d.trigger(b = a.Event("close.bs.alert"));
        b.isDefaultPrevented() || (d.removeClass("in"), a.support.transition && d.hasClass("fade") ? d.one(a.support.transition.end, e).emulateTransitionEnd(150) :
            e())
    };
    var h = a.fn.alert;
    a.fn.alert = function (b) {
        return this.each(function () {
            var e = a(this), c = e.data("bs.alert");
            c || e.data("bs.alert", c = new g(this));
            "string" == typeof b && c[b].call(e)
        })
    };
    a.fn.alert.Constructor = g;
    a.fn.alert.noConflict = function () {
        a.fn.alert = h;
        return this
    };
    a(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', g.prototype.close)
}(jQuery);
