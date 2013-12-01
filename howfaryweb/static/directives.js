angular.module('howfary.directives', []).directive('googleMapsAddressField', function  () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function ($scope, element, attrs){
            var autocomplete = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                $scope.journey[element[0].name] = element[0].value;
                $scope.$apply();
            });
        }
    };
});
