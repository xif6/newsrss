'use strict';

angular.module('userApp', [])
    .controller('IndexCtrl',
        ['$scope', '$filter', '$http',
            function ($scope, $filter, $http) {

                $scope.fluxes = {};
                $scope.items = {};

                $scope.update = function (params) {
                    $scope.items = {};
                    $http.get(userAppCfg.url.items, {'params': params}).success(function (items) {
                        angular.forEach(items, function (item, fluxId) {
                            $scope.items[fluxId] = item;
                        });
                    });
                };

                $scope.updateOne = function (fluxId) {
                    $scope.items['flux_' + fluxId] = [];
                    $http.get(userAppCfg.url.item.replace(0, fluxId)).success(function (item) {
                        $scope.items['flux_' + fluxId] = item
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

                $scope.today = function (date) {
                    var today = new Date();
                    var date = new Date(date);
                    today.setHours(0);
                    today.setMinutes(0);
                    today.setSeconds(0);
                    today.setMilliseconds(0);
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);

                    return (today.getTime() == date.getTime()) ? 'today' : '';
                };
            }
        ])

;
