/// <reference path="./typings/tsd.d.ts"/>

function init() {
  const input = (<HTMLInputElement>document.getElementById("placeInput"));
  const autocomplete = new google.maps.places.Autocomplete(input);
  const map = L.mapbox.map("map", "mapbox.emerald");
  map.setView([37.783, -122.455], 14);
  $("#add").on("click", function() {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    L.marker([lat, lng]).addTo(map);
  });
}

L.mapbox.accessToken = "pk.eyJ1IjoidmFpcmVkZHkxMSIsImEiOiJhYjVmNmY2MWQ3MmFiNThkZjBiZTA1MzdkNTg3NTJhZiJ9.6YTxS5LbsOmXzVcUWzgE7w";

google.maps.event.addDomListener(window, "load", init);
