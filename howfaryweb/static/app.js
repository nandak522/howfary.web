howfaryModule = angular.module('howfaryModule', []);

howfaryModule.controller('formController', function($scope, $http){
    $scope.howfar = function(journey) {
        console.log('clicked scope:'+journey.source);
        $http.post('/howfar/', {'source': $scope.journey.source, 'destination': $scope.journey.destination})
            .success(function(data, status) {
                $scope.journey.duration = data.result.duration;
                $scope.journey.distance = data.result.distance;
            }).error(function(data, status) {
                console.log('Something Went Wrong');
                console.log('error status:'+status);
            });
    };
});
