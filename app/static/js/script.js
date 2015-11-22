$(document).ready(function() {




});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
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
  geocoder.geocode({'address': address}, function(results, status) {
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
