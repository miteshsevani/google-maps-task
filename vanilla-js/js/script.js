$.ajaxSetup({ async: false });

function getData() {
  var markers = new Array;  
  var countries = new Array;  
  $.getJSON( "data/locations.json", function( data ) {    
    for(i = 0; i < data.length; i++) {
      markers.push([data[i].latitude, data[i].longitude]);
      countries.push(['<div>' + data[i].name + '</div>']);
    }        
  });
  return { markers, countries};  
}

function initMap() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  
  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map"));
  map.setTilt(45);
    
  // Multiple Markers
  var markers = getData().markers;
  
  // Country names for on click
  var infoWindowContent = getData().countries;
      
  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;
  
  // Loop through array of markers & place each one on the map  
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map
    });      
    
    // Allow each marker to have an info window    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, marker);
        // Centre map according to clicked marker / position
        map.setZoom(4);
        map.setCenter(marker.getPosition());
      }
    })(marker, i));

    // close info window when map is clicked
    google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
    });

    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }  
}