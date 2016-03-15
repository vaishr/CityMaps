/// <reference path="./typings/tsd.d.ts"/>


const geojson: any[] = [];
let autocomplete;
let addMarker;
let map;
let input;
let myLayer;

function templateGeo(title: string, lat: number, lng: number, description: string): any {
  return {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [lat, lng]
    },
    "properties": {
      "title": title,
      "description": description,
      "marker-color": "#3ca0d3",
      "marker-size": "large"
    }
  };
}

function init() {
  input = (<HTMLInputElement>document.getElementById("placeInput"));
  autocomplete = new google.maps.places.Autocomplete(input);
  map = L.mapbox.map("map", "mapbox.emerald");
  map.setView([37.783, -122.455], 14);
  myLayer = L.mapbox.featureLayer().addTo(map);
};

L.mapbox.accessToken = "pk.eyJ1IjoidmFpcmVkZHkxMSIsImEiOiJhYjVmNmY2MWQ3MmFiNThkZjBiZTA1MzdkNTg3NTJhZiJ9.6YTxS5LbsOmXzVcUWzgE7w";
google.maps.event.addDomListener(window, "load", init);

let app = angular.module("app", ["firebase"]);

app.controller("MapCtrl", ["$scope", "$timeout", function($scope, $timeout) {
  $scope.submit = function() {
    const note = $scope.placeNote;
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    console.log("place", place);
    console.log($scope.placeNote);
    geojson.push(templateGeo(place.name, lat, lng, note));
    console.log("geoJson", geojson);
    addMarker = (lati: number, long: number, name: string, description: string) => {
      const newMarker = L.marker([lati, long]);
      const content = `<h2>${name}</h2><h3>${description}</h3>`;
      newMarker.addTo(map);
      newMarker.bindPopup(content);
      map.scrollWheelZoom.disable();
    };
    addMarker(lat, lng, place.name, note);
  };
}]);

angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name], {
    strictDi: true
  });
});
