/// <reference path="./typings/tsd.d.ts"/>

function init() {
  const places = {};
  const input = (<HTMLInputElement>document.getElementById("placeInput"));
  const autocomplete = new google.maps.places.Autocomplete(input);
  const map = L.mapbox.map("map", "mapbox.emerald");
  map.setView([37.783, -122.455], 14);
  const myLayer = L.mapbox.featureLayer().addTo(map);
  const geojson = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-77.031952, 38.913184]
      },
      "properties": {
        "title": "Mapbox DC",
        "description": "1714 14th St NW, Washington DC",
        "marker-color": "#3ca0d3",
        "marker-size": "large",
        "marker-symbol": "rocket"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-122.413682, 37.775408]
      },
      "properties": {
        "title": "Mapbox SF",
        "description": "155 9th St, San Francisco",
        "marker-color": "#63b6e5",
        "marker-size": "large",
        "marker-symbol": "rocket"
      }
    }
  ];
  L.mapbox.featureLayer().setGeoJSON(geojson);
  //  map.scrollWheelZoom.disable();


  const placeNote = $("#placeNote");
  $("#placeInput").on("input", () => {
    const placeInput = $("#placeInput");
    const val = placeInput.val();
    if (val.length > 0) {
      placeNote.removeAttr("disabled");
    } else {
      placeNote.attr("disabled", "disabled");
    }
    console.log(val.length);
  });
  $("#add").on("click", () => {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    L.marker([lat, lng]).addTo(map);
    places[{ lat: lat, lng: lng }.toString()] = placeNote.val();
  });
}
L.mapbox.accessToken = "pk.eyJ1IjoidmFpcmVkZHkxMSIsImEiOiJhYjVmNmY2MWQ3MmFiNThkZjBiZTA1MzdkNTg3NTJhZiJ9.6YTxS5LbsOmXzVcUWzgE7w";
google.maps.event.addDomListener(window, "load", init);
