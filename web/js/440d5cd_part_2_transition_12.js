+function (b) {
    b.fn.emulateTransitionEnd = function (d) {
        var a = !1, c = this;
        b(this).one(b.support.transition.end, function () {
            a = !0
        });
        setTimeout(function () {
            a || b(c).trigger(b.support.transition.end)
        }, d);
        return this
    };
    b(function () {
        var d = b.support, a;
        a:{
            a = document.createElement("bootstrap");
            var c = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            }, e;
            for (e in c)if (void 0 !== a.style[e]) {
                a = {end: c[e]};
                break a
            }
            a = !1
        }
        d.transition = a
    })
}(jQuery);
