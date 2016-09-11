'use strict';

angular.module('userApp', [])
    .controller('IndexCtrl',
        ['$scope', '$filter', '$http',
            function ($scope, $filter, $http) {

                $scope.fluxes = {};
                $scope.items = {};

                $scope.update = function (params) {
                    $http.get(userAppCfg.url.items, {'params': params}).success(function (items) {
                        angular.forEach(items, function (item, fluxId) {
                            $scope.items[fluxId] = item;
                        });
                    });
                };

                $http.get(userAppCfg.url.fluxes).success(function (fluxes) {
                    $scope.fluxes = fluxes;
                    $scope.update();
                });

                $scope.separateDate = function (current, old) {
                    if (typeof old != 'undefined') {
                        return (current.split('T')[0] != old.split('T')[0]) ? 'separator' : '';
                    }
                    return '';
                };
            }
        ])

;
