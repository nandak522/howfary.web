'use strict';

angular.module('howfary.controllers', []).
    controller('formController', function($scope, $http){
        $scope.newJournies = [];
        $scope.howfar = function() {
            $http.post('/howfar/', {'source': $scope.journey.source, 'destination': $scope.journey.destination})
                .success(function(data, status) {
                    $scope.journey.duration = data.result.duration;
                    $scope.journey.distance = data.result.distance;
                    $scope.new_journey = {'source': $scope.journey.source,
                                          'destination': $scope.journey.destination,
                                          'distance': data.result.distance,
                                          'duration': data.result.duration};
                    $scope.newJournies.unshift($scope.new_journey);
                }).error(function(data, status) {
                    $scope.error = 'Unable to Calculate Distance!';
                });
        };
    });
