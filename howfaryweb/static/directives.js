angular.module('howfary.directives', []).directive('googleMapsAddressField', function  () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function ($scope, element, attrs){
            var autocomplete = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                $scope.journey[element[0].name] = [place.name,
                                                   place.formatted_address].join(', ');
                $scope.$apply();
            });
        }
    };
});
