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

        key: '645a70e62472f2b653773757d1f386',

        getThumb: function(rsvp) {
            if (rsvp.photo_url) {
                return rsvp.photo_url;
            }

            return "https://pbs.twimg.com/profile_images/1777603509/logo-128px_bigger.png";
        },

        loadEvents: function() {
            var group = 'unified-diff';
            var url = 'https://api.meetup.com/events?key=' +$scope.key+ '&group_urlname=' +group+ '&callback=JSON_CALLBACK';

            return $http.jsonp(url)
                .success(function(data) {
                    $scope.events = data.results;
                });
        },

        loadRsvps: function(response) {
            var events = response.data.results;

            if (events.length) {
                var eventId = events[0].id;
                var url = 'https://api.meetup.com/rsvps?key=' +$scope.key+ '&callback=JSON_CALLBACK&event_id=' +eventId;

                $http.jsonp(url)
                .success(function(data) {
                    $scope.rsvps = _.filter(data.results, function(user) {
                        return user.response === 'yes';
                    });
                });
            }
        },

        getEventTitle: function(event) {
            var format = 'Do MMM @ ha';
            var utc = parseInt(event.utc_time, 10);

            return moment(utc).format(format) + " - " + event.name;
        },

        init: function() {
            $scope.loadEvents().then($scope.loadRsvps);
        }
    });

    $scope.init();

});
