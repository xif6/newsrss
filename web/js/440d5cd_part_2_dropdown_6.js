+function (d) {
    function g(b) {
        d(k).remove();
        d(f).each(function () {
            var a = h(d(this)), c = {relatedTarget: this};
            a.hasClass("open") && (a.trigger(b = d.Event("hide.bs.dropdown", c)), b.isDefaultPrevented() || a.removeClass("open").trigger("hidden.bs.dropdown", c))
        })
    }

    function h(b) {
        var a = b.attr("data-target");
        a || (a = (a = b.attr("href")) && /#[A-Za-z]/.test(a) && a.replace(/.*(?=#[^\s]*$)/, ""));
        return (a = a && d(a)) && a.length ? a : b.parent()
    }

    var k = ".dropdown-backdrop", f = "[data-toggle=dropdown]", e = function (b) {
        d(b).on("click.bs.dropdown",
            this.toggle)
    };
    e.prototype.toggle = function (b) {
        var a = d(this);
        if (!a.is(".disabled, :disabled")) {
            var c = h(a);
            b = c.hasClass("open");
            g();
            if (!b) {
                if ("ontouchstart" in document.documentElement && !c.closest(".navbar-nav").length)d('<div class="dropdown-backdrop"/>').insertAfter(d(this)).on("click", g);
                var e = {relatedTarget: this};
                c.trigger(b = d.Event("show.bs.dropdown", e));
                if (b.isDefaultPrevented())return;
                c.toggleClass("open").trigger("shown.bs.dropdown", e);
                a.focus()
            }
            return !1
        }
    };
    e.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var a =
                d(this);
            b.preventDefault();
            b.stopPropagation();
            if (!a.is(".disabled, :disabled")) {
                var c = h(a), e = c.hasClass("open");
                if (!e || e && 27 == b.keyCode)return 27 == b.which && c.find(f).focus(), a.click();
                a = c.find("[role=menu] li:not(.divider):visible a, [role=listbox] li:not(.divider):visible a");
                a.length && (c = a.index(a.filter(":focus")), 38 == b.keyCode && 0 < c && c--, 40 == b.keyCode && c < a.length - 1 && c++, ~c || (c = 0), a.eq(c).focus())
            }
        }
    };
    var l = d.fn.dropdown;
    d.fn.dropdown = function (b) {
        return this.each(function () {
            var a = d(this), c = a.data("bs.dropdown");
            c || a.data("bs.dropdown", c = new e(this));
            "string" == typeof b && c[b].call(a)
        })
    };
    d.fn.dropdown.Constructor = e;
    d.fn.dropdown.noConflict = function () {
        d.fn.dropdown = l;
        return this
    };
    d(document).on("click.bs.dropdown.data-api", g).on("click.bs.dropdown.data-api", ".dropdown form", function (b) {
        b.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, e.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ", [role=menu], [role=listbox]", e.prototype.keydown)
}(jQuery);
