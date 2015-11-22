$(document).ready(function() {
  $("#user-current-location").on("click", function() {
    getLocation();
    getLatLonFromAddress(geocoder, resultsMap);
  });


});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $("#error-message").html("<p>Geolocation is not supported by this browser.</p>");
  }
}

function showPosition(position) {
  var location = {
    lat: position.coords.latitude,
    lon: position.coords.longitude
  };
  //console.log(location);
  return location;
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {
      lat: 37.324538,
      lng: -122.030306
    }
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('find').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      $("#error-message").html("");
      resultsMap.setCenter(results[0].geometry.location);

      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      $("#error-message").html("<p>Address is not availabble.</p>");
    }
  });

}


function getLatLonFromAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $("#error-message").html("");
        resultsMap.setCenter(results[0].geometry.location);
        var lat = results[0].geometry.location.lat();
        var lon = results[0].geometry.location.lng();

        get_homeless_location();

      }
  });
}

function get_homeless_location(latitude, longitude){
  $.get( "/get-homeless/"+latitude+'/'+longitude, function(result) {
  //display result in div with id location-list;
});
}
