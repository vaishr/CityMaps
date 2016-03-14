/// <reference path="./typings/tsd.d.ts"/>

const geojson: any[] = [];

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
  const input = (<HTMLInputElement>document.getElementById("placeInput"));
  const autocomplete = new google.maps.places.Autocomplete(input);
  const map = L.mapbox.map("map", "mapbox.emerald");
  map.setView([37.783, -122.455], 14);
  const myLayer = L.mapbox.featureLayer().addTo(map);
  const addMarker = (lati: number, long: number, description: string, name: string) => {
    const newMarker = L.marker([lati, long]);
    const content = `<h2>${name}</h2><h3>${description}</h3>`;
    newMarker.addTo(map);
    newMarker.bindPopup(content);
    map.scrollWheelZoom.disable();
  };

  const placeNote = $("#placeNote");
  $("#placeInput").on("input", () => {
    const placeInput = $("#placeInput");
    const val = placeInput.val();
    if (val.length > 0) {
      placeNote.removeAttr("disabled");
    } else {
      placeNote.attr("disabled", "disabled");
    }
  });
  $("#add").on("click", () => {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const note = placeNote.val();
    console.log("place", place);
    geojson.push(templateGeo(place.name, lat, lng, note));
    console.log("geoJson", geojson);
    addMarker(lat, lng, place.name, note);
  });
}
L.mapbox.accessToken = "pk.eyJ1IjoidmFpcmVkZHkxMSIsImEiOiJhYjVmNmY2MWQ3MmFiNThkZjBiZTA1MzdkNTg3NTJhZiJ9.6YTxS5LbsOmXzVcUWzgE7w";
google.maps.event.addDomListener(window, "load", init);
