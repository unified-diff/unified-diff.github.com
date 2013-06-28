var app = angular.module('unifiedDiffApp', []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.controller('NextEventCtrl', function ($scope, $http)
{
    $scope.$on('$viewContentLoaded', $scope.init);
    $scope.events = [];
    $scope.rsvps = [];

    $scope.init = function () {
        $scope.loadNextEvent();
    };

    $scope.loadNextEvent = function () {
        $.ajax({
            url: 'http://unified-diff.marvelley.com/events.json',
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
            url: 'http://unified-diff.marvelley.com/rsvps/' + event.id + '.json',
            success: function (data) {
                $scope.$apply(function () {
                    $scope.rsvps = data;
                });
            }
        })
    };
});
