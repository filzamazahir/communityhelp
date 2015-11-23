$(document).ready(function(){
    // $('#get_location').on('click',function(){
    //     var location=getLocation();
    //     var address=getAddressFromLatLang(location['lat'],location['lon']);
    // });
    $('form').submit(function(){
        console.log("Submit function");
        var location=getLocationToInsert();
        var address=getAddressFromLatLang(location.lat,location.lon);
        report_data(location.lat,location.lon,address);
       return false;
    });

    $("#user-current-location").on("click", function() {
    getLocation();
    getLatLonFromAddress(geocoder, resultsMap);
  });
});

var getLocation = function() {
  var location = {};
  console.log("Entering location function");
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position){
        var latlng = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
        };
        console.log(latlng);
        location = latlng;
               // send lat and lng to server here
      }); 
    
      return location;
  } else {
    $("#error-message").html("<p>Geolocation is not supported by this browser.</p>");
  }
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


//report data logic

var getLocationToInsert = function() {
  var location = {};
  console.log("Entering location function");
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position){
        var latlng = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
        };
        console.log(latlng);
        location = latlng;
               // send lat and lng to server here
      }); 
    
      return location;
  } else {
    $("#error-message").html("<p>Geolocation is not supported by this browser.</p>");
  }
}

function showError(error) {
switch(error.code) {
    case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
    case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
    case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
    case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
}
}
function getAddressFromLatLang(lat,lng){
    
    var geocoder = new google.maps.Geocoder();
    var latLng = new google.maps.LatLng(lat, lng);
    geocoder.geocode( { 'latLng': latLng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        console.log(results[0].formatted_address);
        address=results[0].formatted_address;
        return address;
    }else{
      alert("Geocode was not successful for the following reason: " + status);
    }
  }
});
}

function report_data(lat,lng,address){
    user_comments=$('#comments').val();
    user_data={'lat':lat,'lng':lng,'address':address,'comments':user_comments};
    console.log(user_data);
    $.ajax({type:'POST',
    data:user_data,
    url:"/insert",
    success:function(data){
        $('.report_data').append('<input type="hidden" id="lat" name="Lat" value=' + latitude+ '>');
        $('.report_data').append('<input type="hidden" id="lng" name="Lng" value=' + longitude+ '>');
        $('.report_data').append('<input type="hidden" id="address" name="address" value=' + address+ '>');
        $('.report_data').append('<p>' + address + '<p>');
        //resetting value of the comment field
        $('#comments').val('');
        console.log("Successfully inserted the user input",user_data);
   }
});
}

