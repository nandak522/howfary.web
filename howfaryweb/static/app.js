howfaryModule = angular.module('howfaryModule', []);

howfaryModule.controller('formController', function($scope, $http){
    $scope.howfar = function(journey) {
        $http.post('/howfar/', {'source': $scope.journey.source, 'destination': $scope.journey.destination})
            .success(function(data, status) {
                $scope.journey.duration = data.result.duration;
                $scope.journey.distance = data.result.distance;
            }).error(function(data, status) {
                $scope.error = 'Unable to Calculate Distance!';
            });
    };
});
