$(document).scroll(function () {
    if ($(".subnav").length) {
        if (!$(".subnav").attr("data-top")) {
            if ($(".subnav").hasClass("subnav-fixed"))return;
            var a = $(".subnav").offset();
            $(".subnav").attr("data-top", a.top)
        }
        $(".subnav").attr("data-top") - $(".subnav").outerHeight() <= $(this).scrollTop() ? $(".subnav").addClass("subnav-fixed") : $(".subnav").removeClass("subnav-fixed")
    }
});
