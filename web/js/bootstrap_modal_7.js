+function (b) {
    function g(a, d) {
        return this.each(function () {
            var e = b(this), f = e.data("bs.modal"), h = b.extend({}, c.DEFAULTS, e.data(), "object" == typeof a && a);
            f || e.data("bs.modal", f = new c(this, h));
            if ("string" == typeof a)f[a](d); else h.show && f.show(d)
        })
    }

    var c = function (a, d) {
        this.options = d;
        this.$body = b(document.body);
        this.$element = b(a);
        this.$backdrop = this.isShown = null;
        this.scrollbarWidth = 0;
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, b.proxy(function () {
                this.$element.trigger("loaded.bs.modal")
            },
            this))
    };
    c.VERSION = "3.2.0";
    c.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0};
    c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    };
    c.prototype.show = function (a) {
        var d = this, e = b.Event("show.bs.modal", {relatedTarget: a});
        this.$element.trigger(e);
        this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', b.proxy(this.hide, this)), this.backdrop(function () {
            var e =
                b.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body);
            d.$element.show().scrollTop(0);
            e && d.$element[0].offsetWidth;
            d.$element.addClass("in").attr("aria-hidden", !1);
            d.enforceFocus();
            var c = b.Event("shown.bs.modal", {relatedTarget: a});
            e ? d.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                d.$element.trigger("focus").trigger(c)
            }).emulateTransitionEnd(300) : d.$element.trigger("focus").trigger(c)
        }))
    };
    c.prototype.hide = function (a) {
        a && a.preventDefault();
        a = b.Event("hide.bs.modal");
        this.$element.trigger(a);
        this.isShown && !a.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), b(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), b.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", b.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    };
    c.prototype.enforceFocus = function () {
        b(document).off("focusin.bs.modal").on("focusin.bs.modal",
            b.proxy(function (a) {
                this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
            }, this))
    };
    c.prototype.escape = function () {
        if (this.isShown && this.options.keyboard)this.$element.on("keyup.dismiss.bs.modal", b.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)); else this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    };
    c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide();
        this.backdrop(function () {
            a.$element.trigger("hidden.bs.modal")
        })
    };
    c.prototype.removeBackdrop =
        function () {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null
        };
    c.prototype.backdrop = function (a) {
        var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var c = b.support.transition && e;
            this.$backdrop = b('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", b.proxy(function (a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this));
            c && this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            a && (c ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(150) : a())
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e = function () {
            d.removeBackdrop();
            a && a()
        }, b.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e()) : a && a()
    };
    c.prototype.checkScrollbar = function () {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth ||
            this.measureScrollbar())
    };
    c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    };
    c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    };
    c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure";
        this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        this.$body[0].removeChild(a);
        return b
    };
    var k = b.fn.modal;
    b.fn.modal =
        g;
    b.fn.modal.Constructor = c;
    b.fn.modal.noConflict = function () {
        b.fn.modal = k;
        return this
    };
    b(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (a) {
        var d = b(this), c = d.attr("href"), f = b(d.attr("data-target") || c && c.replace(/.*(?=#[^\s]+$)/, "")), c = f.data("bs.modal") ? "toggle" : b.extend({remote: !/#/.test(c) && c}, f.data(), d.data());
        d.is("a") && a.preventDefault();
        f.one("show.bs.modal", function (a) {
            if (!a.isDefaultPrevented())f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        });
        g.call(f, c, this)
    })
}(jQuery);
