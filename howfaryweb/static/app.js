function formCtrl($scope){

    $scope.howFar = function($http){
        $scope.alert('Hey');
        $http({method: 'POST', url: '/', data: {'source': $scope.src, 'destination': $scope.dest}
        }).success(function(data, status, headers, config){
            alert('success data:' + data);
        }).error(function(data, status, headers, config){
            alert('error data:'+ data);
        });
    };
}
