howfaryModule = angular.module('howfaryModule', []);

howfaryModule.controller('formController', function($scope, $http){
    $scope.howfar = function() {
        $http.post('/howfar/', {'source': $scope.journey.source, 'destination': $scope.journey.destination})
            .success(function(data, status) {
                $scope.journey.duration = data.result.duration;
                $scope.journey.distance = data.result.distance;
                new_journey_attrs = {'source': $scope.journey.source,
                                     'destination': $scope.journey.destination,
                                     'distance': data.result.distance,
                                     'duration': data.result.duration}
                $scope.new_journey = new_journey_attrs;
                console.log('new_journey:' + $scope.new_journey);
            }).error(function(data, status) {
                $scope.error = 'Unable to Calculate Distance!';
            });
    };
});
