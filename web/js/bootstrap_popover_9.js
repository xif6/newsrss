+function (b) {
    var a = function (c, a) {
        this.init("popover", c, a)
    };
    if (!b.fn.tooltip)throw Error("Popover requires tooltip.js");
    a.VERSION = "3.2.0";
    a.DEFAULTS = b.extend({}, b.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    a.prototype = b.extend({}, b.fn.tooltip.Constructor.prototype);
    a.prototype.constructor = a;
    a.prototype.getDefaults = function () {
        return a.DEFAULTS
    };
    a.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), d = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b);
        a.find(".popover-content").empty()[this.options.html ? "string" == typeof d ? "html" : "append" : "text"](d);
        a.removeClass("fade top bottom left right in");
        a.find(".popover-title").html() || a.find(".popover-title").hide()
    };
    a.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    a.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
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
    b.fn.popover.Constructor =
        a;
    b.fn.popover.noConflict = function () {
        b.fn.popover = e;
        return this
    }
}(jQuery);
