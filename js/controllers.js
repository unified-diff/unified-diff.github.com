var app = angular.module('unifiedDiffApp', []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.controller('NextEventCtrl', function ($scope, $http)
{
    $scope.$on('$viewContentLoaded', $scope.init);

    $scope.init = function () {
        $scope.loadNextEvent();
    };

    $scope.loadNextEvent = function () {
        $.ajax({
            url: 'http://localhost/unified-diff-meetup-proxy/web/index_dev.php/events.json',
            success: function (data) {
                $scope.$apply(function () {
                    $scope.events = data;

                    if (data.length) {
                        $scope.loadRsvps(data[0]);
                    }
                });
            }
        })
    };

    $scope.loadRsvps = function (event) {
        $.ajax({
            url: 'http://localhost/unified-diff-meetup-proxy/web/index_dev.php/rsvps/' + event.id + '.json',
            success: function (data) {
                $scope.$apply(function () {
                    $scope.rsvps = data;
                });
            }
        })
    };
});
