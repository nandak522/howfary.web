"use strict";

angular.module('howfary', ['howfary.controllers', 'howfary.directives']);

function autocompleteFy (element) {
    var autocomplete = new google.maps.places.Autocomplete(element);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        element.value = place.name;
    });
}
