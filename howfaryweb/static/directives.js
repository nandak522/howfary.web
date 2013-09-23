'use strict';

angular.module('howfary.directives', []).
    directive('addNewJourneyRow', function(){
        return {
            restrict: 'A',
            scope:{
                value: '='
            },
            transclude: true,
            replace: false,
            link: function(scope, element, attrs) {
                scope.value = attrs.value;
            },
            templateUrl: '/static/partials/new_journey_row.html'
        };
    });

// angular.module('howfary.directives', []).
//     directive('addNewJourneyRow', function(){
//         return {
//             restrict: 'A',
//             scope: {new_journey: new_journey},
//             template: "<td>{{new_journey.source}}</td><td>{{new_journey.destination}}</td><td>{{new_journey.distance}}</td><td>{{new_journey.duration}}</td>"
//         };
//         }
//     );




