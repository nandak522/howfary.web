angular.module('howfary.directives', []).directive('googleMapsAddressField', function  () {
    return {
        restrict: 'A',
        scope: {
            name: '='
        },
        link: function (scope, element, attrs){
            var autocomplete = new google.maps.places.Autocomplete(element);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                element.value = place.name;
                // scope.journey[element.name] = place.name;
                // scope.apply();
            });
        }
    };
});
