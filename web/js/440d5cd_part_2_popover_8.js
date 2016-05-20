+function (b) {
    var a = function (c, a) {
        this.init("popover", c, a)
    };
    if (!b.fn.tooltip)throw Error("Popover requires tooltip.js");
    a.DEFAULTS = b.extend({}, b.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    a.prototype = b.extend({}, b.fn.tooltip.Constructor.prototype);
    a.prototype.constructor = a;
    a.prototype.getDefaults = function () {
        return a.DEFAULTS
    };
    a.prototype.setContent =
        function () {
            var c = this.tip(), a = this.getTitle(), b = this.getContent();
            c.find(".popover-title")[this.options.html ? "html" : "text"](a);
            c.find(".popover-content")[this.options.html ? "string" == typeof b ? "html" : "append" : "text"](b);
            c.removeClass("fade top bottom left right in");
            c.find(".popover-title").html() || c.find(".popover-title").hide()
        };
    a.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    a.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") ||
            ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    };
    a.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    a.prototype.tip = function () {
        this.$tip || (this.$tip = b(this.options.template));
        return this.$tip
    };
    var e = b.fn.popover;
    b.fn.popover = function (c) {
        return this.each(function () {
            var f = b(this), d = f.data("bs.popover"), e = "object" == typeof c && c;
            if (d || "destroy" != c)if (d || f.data("bs.popover", d = new a(this, e)), "string" == typeof c)d[c]()
        })
    };
    b.fn.popover.Constructor = a;
    b.fn.popover.noConflict =
        function () {
            b.fn.popover = e;
            return this
        }
}(jQuery);
