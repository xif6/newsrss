angular.module("userApp", []).controller("IndexCtrl", ["$scope", "$filter", "$http", function (b, d, c) {
    b.fluxes = {};
    b.items = {};
    b.update = function (a) {
        c.get(userAppCfg.url.items, {params: a}).success(function (a) {
            angular.forEach(a, function (a, c) {
                b.items[c] = a
            })
        })
    };
    c.get(userAppCfg.url.fluxes).success(function (a) {
        b.fluxes = a;
        b.update()
    })
}]);
