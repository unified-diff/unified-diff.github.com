angular.module('unifiedDiffApp', [])
.run(function($window) {

    // send user to video for old hash-style links
    var video = $window.location.hash;
    if (video) {
        window.location.href = 'videos.html' + video;
    }

}).config(function($interpolateProvider, $httpProvider) {

    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');

    // Disable OPTIONS preflight CORS request
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}).controller('NextEventCtrl', function ($scope, $http) {

    angular.extend($scope, {
        events: [],
        rsvps: [],

        getThumb: function(rsvp) {
            if (rsvp.member_photo) {
                return rsvp.member_photo.thumb_link;
            }

            return "https://pbs.twimg.com/profile_images/1777603509/logo-128px_bigger.png";
        },

        loadEvents: function() {
            return $http.get('http://unified-diff.marvelley.com/events.json')
                .success(function(data) {
                    $scope.events = data;
                });
        },

        loadRsvps: function(response) {
            var events = response.data;

            if (events.length) {
                $http.get('http://unified-diff.marvelley.com/rsvps/' + events[0].id + '.json')
                .success(function(data) {
                    $scope.rsvps = _.filter(data, function(user) {
                        return user.response === 'yes';
                    });
                });
            }
        },

        init: function() {
            $scope.loadEvents().then($scope.loadRsvps);
        }
    });

    $scope.init();

});
