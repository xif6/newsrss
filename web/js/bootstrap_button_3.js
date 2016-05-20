+function (c) {
    function f(a) {
        return this.each(function () {
            var b = c(this), e = b.data("bs.button"), g = "object" == typeof a && a;
            e || b.data("bs.button", e = new d(this, g));
            "toggle" == a ? e.toggle() : a && e.setState(a)
        })
    }

    var d = function (a, b) {
        this.$element = c(a);
        this.options = c.extend({}, d.DEFAULTS, b);
        this.isLoading = !1
    };
    d.VERSION = "3.2.0";
    d.DEFAULTS = {loadingText: "loading..."};
    d.prototype.setState = function (a) {
        var b = this.$element, e = b.is("input") ? "val" : "html", d = b.data();
        a += "Text";
        null == d.resetText && b.data("resetText", b[e]());
        b[e](null ==
        d[a] ? this.options[a] : d[a]);
        setTimeout(c.proxy(function () {
            "loadingText" == a ? (this.isLoading = !0, b.addClass("disabled").attr("disabled", "disabled")) : this.isLoading && (this.isLoading = !1, b.removeClass("disabled").removeAttr("disabled"))
        }, this), 0)
    };
    d.prototype.toggle = function () {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active"));
            a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var h = c.fn.button;
    c.fn.button = f;
    c.fn.button.Constructor = d;
    c.fn.button.noConflict = function () {
        c.fn.button = h;
        return this
    };
    c(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (a) {
        var b = c(a.target);
        b.hasClass("btn") || (b = b.closest(".btn"));
        f.call(b, "toggle");
        a.preventDefault()
    })
}(jQuery);
