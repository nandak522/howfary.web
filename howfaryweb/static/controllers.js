(function () {
   "use strict";
   // this function is strict...
}());

angular.module('howfary.controllers', []).
    controller('formController', function ($scope, $http) {
        $scope.newJournies = [];
        $scope.submit_button_label = 'Calculate';
        $scope.howfar = function () {
            $scope.submit_button_label = 'Calculating...';
            $scope.requestSent = true;
            console.log("$scope.journey:" + $scope.journey);
            $http.post('/howfar/', {'source': $scope.journey.source, 'destination': $scope.journey.destination})
                .success(function(data, status) {
                    $scope.journey.duration = data.result.duration;
                    $scope.journey.distance = data.result.distance;
                    $scope.new_journey = {'source': $scope.journey.source,
                                          'destination': $scope.journey.destination,
                                          'distance': data.result.distance,
                                          'duration': data.result.duration,
                                          'link': data.result.link};
                    $scope.newJournies.unshift($scope.new_journey);
                    $scope.submit_button_label = 'Calculate';
                    $scope.requestSent = false;
                }).error(function(data, status) {
                    $scope.error = 'Unable to Calculate Distance!';
                    $scope.requestSent = false;
                });
        };
    });
