var app = angular.module('unifiedDiffApp', []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.controller('NextEventCtrl', function ($scope, $http) {
    angular.extend($scope, {
        events: [],
        rsvps: [],

        getThumb: function(rsvp) {
            if (rsvp.member_photo) {
                return rsvp.member_photo.thumb_link;
            }

            return "https://pbs.twimg.com/profile_images/1777603509/logo-128px_bigger.png";
        }
    });

    $scope.$on('$viewContentLoaded', $scope.init);

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
                    var rsvps = _.filter(data, function(user){ 
                        return user.response === 'yes'; 
                    });
                    $scope.rsvps = rsvps;
                });
            }
        })
    };
});
