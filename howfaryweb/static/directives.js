// angular.module('howfary.directives', [])
// 	.directive('hfAddressAutcomplete', function () {
//         return {
//             restrict: 'E',
//             replace: true,
//             template: "<input ng-model='source' id='locationType' type='text' autocomplete='off' required/>",
//             scope: {
//                 locationType: '='
//             },
//             link: function($scope, element, attrs){
//                 console.log('scope:'+ $scope);
//                 console.log('element:'+ element);
//                 console.log('attrs:'+ attrs);

//                 var autocomplete = new google.maps.places.Autocomplete(element);
//                 google.maps.event.addListener(autocomplete, 'place_changed', function(){
//                     var place = autocomplete.getPlace();
//                     console.log("place:" + place);
//                     element.value = place.name;
//                      $scope.journey.source = place.name;
//                      $scope.apply();
//                 });
//             }
//         }
//     });
angular.module('howfary.directives', []).directive('googleMapsAddressField', function  () {
    return {

    };
});
