$(document).ready(function(){
    $('form').submit(function(){
        getLocationToInsert();
        return false;
    });


    $("#find").on("click", function() {
      var geocoderMap = initMap();
      getLatLonFromAddress(geocoderMap['geocoder'], geocoderMap['map']);
    });

    $("#user-current-location").on("click", function() {
      console.log("Inside user current click");
      var geocoderMap = initMap();
      getCurrentLocation(geocoderMap['geocoder'], geocoderMap['map']);
    
  });
});


//Initialize a map, with San Jose's position as default
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {
      lat: 37.324538,
      lng: -122.030306
    }
  });
  var geocoder = new google.maps.Geocoder();

  return {'geocoder': geocoder, 'map': map};
}


//Gets the current location of user, then calls getNearybyLocations()
function getCurrentLocation(geocoder, resultsMap) {
 if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position){
       var latlng = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
       };
       console.log(latlng);
       getNearbyLocations(latlng['lat'], latlng['lng'], resultsMap);

    }); 
 } else {
   console.log($("#error-message").html("<p>Geolocation is not supported by this browser.</p>"));
 }
}



//Gets the latitude & longitude from an address, then calls getNearbyLocations()
function getLatLonFromAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $("#error-message").html("");
        resultsMap.setCenter(results[0].geometry.location);
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        console.log(latitude);
        console.log(longitude);
        getNearbyLocations(latitude, longitude, resultsMap);
      }

      else {
      $("#error-message").html("<p>Address is not availabble.</p>");
      }

  });
}

//Gets nearby locations given a latitude & longitude
function getNearbyLocations(latitude, longitude, resultsMap){

  $.get( "/get_locations/"+latitude+"/"+longitude, function(result) {

    $('#location-table').html("<thead><th>Location</th><th>Comment</th></thead><tbody></tbody>"); 

    for (var i =0; i< result['nearby_locations'].length; i++) {

      //append to table for each location
      var html_location = "";
      html_location += "<tr><td>"+result['nearby_locations'][i]['address']+"</td>"
      html_location += "<td>"+result['nearby_locations'][i]['comment']+"</td></tr>";
      $('#location-table').append(html_location);
      
      //pin a marker for each location
      var currentLatLng = {lat: result['nearby_locations'][i]['lat'], lng: result['nearby_locations'][i]['lng']};  
      var marker = new google.maps.Marker({
        position: currentLatLng,
        map: resultsMap,
        title: 'Hello World!'
      });

    }
    $('#location-table').append("</tbody>"); 
   
  }, "json");
}



//report data logic
function getLocationToInsert() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position){
        var latitLongit = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
        };
        console.log(latitLongit);
        // var currentAddress=getAddressFromLatLang(latlng['lat'],latlng['lon']);
        var geocoder = new google.maps.Geocoder();
        var latLng = new google.maps.LatLng(latitLongit.lat, latitLongit.lon);
        geocoder.geocode( { 'latLng': latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log(results[0].formatted_address);
            var address=results[0].formatted_address;
            report_data(latitLongit.lat, latitLongit.lon,address);
        }else{
          alert("Geocode was not successful for the following reason: " + status);
        }
      }
    });
  }); 
  } else {
    console.log($("#error-message").html("<p>Geolocation is not supported by this browser.</p>"));
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

function report_data(lat,lng,address){
    userComments=$('#comments').val();
    userData={'lat':lat,'lng':lng,'address':address,'comments':userComments};
    console.log(userData);
    $.ajax({url:"/insert",
          type:'POST',
          data:userData,
          success:function(data){
            $('.report_data').append('<input type="hidden" id="lat" name="Lat" value=' + lat+ '>');
            $('.report_data').append('<input type="hidden" id="lng" name="Lng" value=' + lng+ '>');
            $('.report_data').append('<input type="hidden" id="address" name="address" value=' + address+ '>');
            $('#users_current_location').html('<p>' + address + '<p>');
            //resetting value of the comment field
            $('#comments').val('');
            console.log("Successfully inserted the user input",userData);
   }
});
}
