$.ajaxSetup({ async: false });

function getData() {
  
  const feed = 'data/locations.json';

  /* #######
  Can only use if CORS is disable din the browser due to CORS policy: No 'Access-Control-Allow-Origin'
  //const feed = 'https://s3-eu-west-1.amazonaws.com/omnifi/techtests/locations.json';
  ######## */

  let markers = new Array;
  let countries = new Array;    

  $.getJSON(feed, function( data ) {    
    for(i = 0; i < data.length; i++) {
      markers.push([data[i].latitude, data[i].longitude]);
      countries.push([data[i].name, data[i].capital]);
    }        
  });
  return { markers, countries };
}

// Display locations
(function() {
  let locations = "";
  getData().countries.map((value) => {
    locations += `<li>${value[0]}</li>`;
  })
  document.getElementById('locations').innerHTML = locations;  
}());

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
        infoWindow.setContent(`<div>${infoWindowContent[i][0]}, ${infoWindowContent[i][1]}</div>`);
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