+function (a) {
    var d = function (b, c) {
        this.options = c;
        this.$element = a(b);
        this.$backdrop = this.isShown = null;
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    d.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0};
    d.prototype.toggle = function (a) {
        return this[this.isShown ? "hide" : "show"](a)
    };
    d.prototype.show = function (b) {
        var c = this, e = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(e);
        this.isShown || e.isDefaultPrevented() ||
        (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var e = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body);
            c.$element.show().scrollTop(0);
            e && c.$element[0].offsetWidth;
            c.$element.addClass("in").attr("aria-hidden", !1);
            c.enforceFocus();
            var d = a.Event("shown.bs.modal", {relatedTarget: b});
            e ? c.$element.find(".modal-dialog").one(a.support.transition.end,
                function () {
                    c.$element.focus().trigger(d)
                }).emulateTransitionEnd(300) : c.$element.focus().trigger(d)
        }))
    };
    d.prototype.hide = function (b) {
        b && b.preventDefault();
        b = a.Event("hide.bs.modal");
        this.$element.trigger(b);
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal,
            this)).emulateTransitionEnd(300) : this.hideModal())
    };
    d.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        }, this))
    };
    d.prototype.escape = function () {
        if (this.isShown && this.options.keyboard)this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)); else this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    };
    d.prototype.hideModal =
        function () {
            var a = this;
            this.$element.hide();
            this.backdrop(function () {
                a.removeBackdrop();
                a.$element.trigger("hidden.bs.modal")
            })
        };
    d.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    d.prototype.backdrop = function (b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && c;
            this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body);
            this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                a.target ===
                a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this));
            e && this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            b && (e ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b())
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var h = a.fn.modal;
    a.fn.modal =
        function (b, c) {
            return this.each(function () {
                var e = a(this), f = e.data("bs.modal"), g = a.extend({}, d.DEFAULTS, e.data(), "object" == typeof b && b);
                f || e.data("bs.modal", f = new d(this, g));
                if ("string" == typeof b)f[b](c); else g.show && f.show(c)
            })
        };
    a.fn.modal.Constructor = d;
    a.fn.modal.noConflict = function () {
        a.fn.modal = h;
        return this
    };
    a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), e = c.attr("href"), d = a(c.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), e = d.data("bs.modal") ?
            "toggle" : a.extend({remote: !/#/.test(e) && e}, d.data(), c.data());
        c.is("a") && b.preventDefault();
        d.modal(e, this).one("hide", function () {
            c.is(":visible") && c.focus()
        })
    });
    a(document).on("show.bs.modal", ".modal", function () {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function () {
        a(document.body).removeClass("modal-open")
    })
}(jQuery);
