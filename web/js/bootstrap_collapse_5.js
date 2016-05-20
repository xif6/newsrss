+function (b) {
    function f(a) {
        return this.each(function () {
            var c = b(this), d = c.data("bs.collapse"), h = b.extend({}, e.DEFAULTS, c.data(), "object" == typeof a && a);
            !d && h.toggle && "show" == a && (a = !a);
            d || c.data("bs.collapse", d = new e(this, h));
            if ("string" == typeof a)d[a]()
        })
    }

    var e = function (a, c) {
        this.$element = b(a);
        this.options = b.extend({}, e.DEFAULTS, c);
        this.transitioning = null;
        this.options.parent && (this.$parent = b(this.options.parent));
        this.options.toggle && this.toggle()
    };
    e.VERSION = "3.2.0";
    e.DEFAULTS = {toggle: !0};
    e.prototype.dimension =
        function () {
            return this.$element.hasClass("width") ? "width" : "height"
        };
    e.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var a = b.Event("show.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                if ((a = this.$parent && this.$parent.find("> .panel > .in")) && a.length) {
                    var c = a.data("bs.collapse");
                    if (c && c.transitioning)return;
                    f.call(a, "hide");
                    c || a.data("bs.collapse", null)
                }
                var d = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[d](0);
                this.transitioning =
                    1;
                a = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[d]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!b.support.transition)return a.call(this);
                c = b.camelCase(["scroll", d].join("-"));
                this.$element.one("bsTransitionEnd", b.proxy(a, this)).emulateTransitionEnd(350)[d](this.$element[0][c])
            }
        }
    };
    e.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var a = b.Event("hide.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                a =
                    this.dimension();
                this.$element[a](this.$element[a]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
                this.transitioning = 1;
                var c = function () {
                    this.transitioning = 0;
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                if (!b.support.transition)return c.call(this);
                this.$element[a](0).one("bsTransitionEnd", b.proxy(c, this)).emulateTransitionEnd(350)
            }
        }
    };
    e.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" :
            "show"]()
    };
    var l = b.fn.collapse;
    b.fn.collapse = f;
    b.fn.collapse.Constructor = e;
    b.fn.collapse.noConflict = function () {
        b.fn.collapse = l;
        return this
    };
    b(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (a) {
        var c, d = b(this);
        a = d.attr("data-target") || a.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        c = b(a);
        var e = (a = c.data("bs.collapse")) ? "toggle" : d.data(), g = d.attr("data-parent"), k = g && b(g);
        a && a.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + g + '"]').not(d).addClass("collapsed"),
            d[c.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
        f.call(c, e)
    })
}(jQuery);
