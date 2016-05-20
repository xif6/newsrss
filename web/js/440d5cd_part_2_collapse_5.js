+function (b) {
    var e = function (a, c) {
        this.$element = b(a);
        this.options = b.extend({}, e.DEFAULTS, c);
        this.transitioning = null;
        this.options.parent && (this.$parent = b(this.options.parent));
        this.options.toggle && this.toggle()
    };
    e.DEFAULTS = {toggle: !0};
    e.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    };
    e.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var a = b.Event("show.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                if ((a = this.$parent &&
                        this.$parent.find("> .panel > .in")) && a.length) {
                    var c = a.data("bs.collapse");
                    if (c && c.transitioning)return;
                    a.collapse("hide");
                    c || a.data("bs.collapse", null)
                }
                var d = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[d](0);
                this.transitioning = 1;
                a = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[d]("auto");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!b.support.transition)return a.call(this);
                c = b.camelCase(["scroll", d].join("-"));
                this.$element.one(b.support.transition.end, b.proxy(a, this)).emulateTransitionEnd(350)[d](this.$element[0][c])
            }
        }
    };
    e.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var a = b.Event("hide.bs.collapse");
            this.$element.trigger(a);
            if (!a.isDefaultPrevented()) {
                a = this.dimension();
                this.$element[a](this.$element[a]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
                this.transitioning = 1;
                var c = function () {
                    this.transitioning = 0;
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                if (!b.support.transition)return c.call(this);
                this.$element[a](0).one(b.support.transition.end, b.proxy(c, this)).emulateTransitionEnd(350)
            }
        }
    };
    e.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var k = b.fn.collapse;
    b.fn.collapse = function (a) {
        return this.each(function () {
            var c = b(this), d = c.data("bs.collapse"), g = b.extend({}, e.DEFAULTS, c.data(), "object" == typeof a && a);
            !d && g.toggle && "show" == a && (a = !a);
            d || c.data("bs.collapse", d = new e(this, g));
            if ("string" == typeof a)d[a]()
        })
    };
    b.fn.collapse.Constructor =
        e;
    b.fn.collapse.noConflict = function () {
        b.fn.collapse = k;
        return this
    };
    b(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (a) {
        var c = b(this), d;
        a = c.attr("data-target") || a.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "");
        d = b(a);
        var e = (a = d.data("bs.collapse")) ? "toggle" : c.data(), f = c.attr("data-parent"), h = f && b(f);
        a && a.transitioning || (h && h.find('[data-toggle=collapse][data-parent="' + f + '"]').not(c).addClass("collapsed"), c[d.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
        d.collapse(e)
    })
}(jQuery);
