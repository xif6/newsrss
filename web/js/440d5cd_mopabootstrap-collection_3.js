!function (c) {
    var h = function (a, b) {
        this.$element = c(a);
        this.options = c.extend({}, c.fn.collection.defaults, b);
        var d = c(this.options.collection_id);
        "undefined" === typeof this.options.index && (this.options.index = {});
        this.options.initial_size || (this.options.initial_size = d.children().size());
        this.options.index[this.options.collection_id] = this.options.initial_size - 1
    };
    h.prototype = {
        constructor: h, add: function () {
            if (!("number" == typeof this.options.max && this.getItems().length >= this.options.max)) {
                this.options.index[this.options.collection_id] +=
                    1;
                var a = this.options.index[this.options.collection_id];
                c.isFunction(this.options.addcheckfunc) && !this.options.addcheckfunc() ? c.isFunction(this.options.addfailedfunc) && this.options.addfailedfunc() : this.addPrototype(a)
            }
        }, addPrototype: function (a) {
            var b = c(this.options.collection_id), d = b.data("prototype-name"), e = b.data("prototype-label");
            "undefined" === typeof d && (d = "__name__");
            "undefined" === typeof e && (e = "__name__label__");
            d = new RegExp("((\"|&quot;|'|&#039;)((?!(\"|&quot;|'|&#039;|__name__)).)+?)(" + d + ")",
                "ig");
            e = new RegExp("((\"|&quot;|'|&#039;)((?!(\"|&quot;|'|&#039;|__name__)).)+?)(" + e + ")", "ig");
            e = b.attr("data-prototype").replace(e, "$1" + a).replace(d, "$1" + a);
            e = c(e);
            !1 !== c(window).triggerHandler("before-add.mopa-collection-item", [b, e, a]) && (b.append(e), c(window).triggerHandler("add.mopa-collection-item", [b, e, a]))
        }, remove: function (a) {
            var b = c(this.options.collection_id);
            "undefined" == typeof a && (a = this.$element.closest(".collection-item"));
            if ("undefined" != typeof a) {
                a instanceof jQuery && (a = a.get(0));
                var d =
                    this.getIndex(a);
                if (-1 == d)throw Error("row not contained in collection");
                !1 !== c(window).triggerHandler("before-remove.mopa-collection-item", [b, a, d]) && (a.parentNode.removeChild(a), c(window).triggerHandler("remove.mopa-collection-item", [b, a, d]))
            }
        }, getIndex: function (a) {
            a instanceof jQuery && (a = a.get(0));
            for (var b = c(this.options.collection_id).children(), d = 0; d < b.size(); d++)if (a == b[d])return d;
            return -1
        }, getItem: function (a) {
            return this.getItems()[a]
        }, getItems: function () {
            return c(this.options.collection_id).children()
        }
    };
    c.fn.collection = function (a) {
        var b = arguments;
        return this.each(function () {
            var d = c(this), e = d.data("collection-add-btn"), f = d.data("collection"), g = "object" == typeof a ? a : {};
            if (e)g.collection_id = e; else if (d.closest(".collection-items").attr("id"))g.collection_id = "#" + d.closest(".collection-items").attr("id"); else if (g.collection_id = 0 === this.id.length ? !1 : "#" + this.id, !g.collection_id)throw Error("Could not load collection id");
            f || d.data("collection", f = new h(this, g));
            if (1 < b.length)var l = b[1], k;
            "add" == a && f.add();
            "remove" == a && f.remove(l);
            "getIndex" == a && (k = f.getIndex(l));
            "getItem" == a && (k = f.getItem(l));
            "getItems" == a && (k = f.getItems());
            1 < b.length && "function" == typeof b[2] && b[2].call(this, k)
        })
    };
    c.fn.collection.defaults = {collection_id: null, initial_size: 0, addcheckfunc: !1, addfailedfunc: !1, max: !1};
    c.fn.collection.Constructor = h;
    c(function () {
        c("body").on("click.collection.data-api", "[data-collection-add-btn]", function (a) {
            var b = c(a.target);
            b.hasClass("btn") || (b = b.closest(".btn"));
            b.collection("add");
            a.preventDefault()
        }).on("click.collection.data-api",
            "[data-collection-remove-btn]", function (a) {
                var b = c(a.target);
                b.hasClass("btn") || (b = b.closest(".btn"));
                b.collection("remove");
                a.preventDefault()
            })
    })
}(window.jQuery);
