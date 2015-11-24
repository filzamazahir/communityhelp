$(document).ready(function() {

  $(".loading-gif").hide();
  $(".loading-gif-bottom").hide();

  //Display Nearby Locations when user enters an address and clicks Find
  $("#find").on("click", function() {
    getLatLonFromAddress(geocoder, map);
  });


  //Display Nearby Locations when user enters an address and presses 'enter'
  $("#address").keypress(function(e) {
    if (e.which === 13) {
      getLatLonFromAddress(geocoder, map);
    }
  });

  //Displays Nearby Locations from the user's current location
  $("#user-current-location").on("click", function() {
    $(".loading-gif").show();
    getCurrentLocation(geocoder,map);
  });

  //Inserts into database the current location where a person needs help
  $('form').submit(function() {
    $(".loading-gif-bottom").show();
    getLocationToInsert();
    return false;
  });

}); //end of document ready


//Global variables of map and geocoder
var map;
var geocoder;

//Initializes the map - this function is called in the callback in the Google API
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {
      lat: 37.324538,
      lng: -122.030306
    }
  });
  geocoder = new google.maps.Geocoder();
  getNearbyLocations(37.324538, -122.030306, map);

  return;
}


//Gets the current location of user, then calls getNearybyLocations()
function getCurrentLocation(geocoder, resultsMap) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(latlng);
      $(".loading-gif").hide();
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
    } else {
      $("#error-message").html("<p>Address is not availabble.</p>");
    }

  });
  return false;
}


//Gets nearby locations given a latitude & longitude
function getNearbyLocations(latitude, longitude, resultsMap) {
  console.log ("Inside get nearby locations");

  $.get("/get_locations/" + latitude + "/" + longitude, function(result) {

    $('#location-table').html("");
    for (var i = 0; i < result['nearby_locations'].length; i++) {
      //Append to table for each location
      var html_location = "<tr>";
      html_location += "<td>" + (i + 1) + "</td>"
      html_location += "<td>" + result['nearby_locations'][i]['address'] + "</td>"
      html_location += "<td>" + result['nearby_locations'][i]['comment'] + "</td>"
      html_location += "<td>" + result['nearby_locations'][i]['distance'].toFixed(2) + "</td>"
      html_location += "</tr>";

      $('#location-table').append(html_location);

      //Pin a marker for each location
      var currentLatLng = {
        lat: result['nearby_locations'][i]['lat'],
        lng: result['nearby_locations'][i]['lng']
      };
      var marker = new google.maps.Marker({
        position: currentLatLng,
        map: resultsMap,
        title: result['nearby_locations'][i]['address']
      });
    } //end of for

  }, "json");
}


//Gets location to insert data if a user is reporting a person in need of help
function getLocationToInsert() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitLongit = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      console.log(latitLongit);
      var geocoder = new google.maps.Geocoder();
      var latLng = new google.maps.LatLng(latitLongit.lat, latitLongit.lon);
      geocoder.geocode({
        'latLng': latLng
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log(results[0].formatted_address);
            var address = results[0].formatted_address;
            report_data(latitLongit.lat, latitLongit.lon, address);
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        }
      });
    });
  } else {
    console.log($("#error-message").html("<p>Geolocation is not supported by this browser.</p>"));
  }
}


//Insert the location and comments into the database
function report_data(lat,lng,address){
  userComments=$('#comments').val();
  userData={'lat':lat,'lng':lng,'address':address,'comments':userComments};
  console.log(userData);
  $.ajax({url:'/insert',
    type:'POST',
    data:userData,
    success:function(data){
      $('.report_data').append('<input type="hidden" id="lat" name="Lat" value=' + lat+ '>');
      $('.report_data').append('<input type="hidden" id="lng" name="Lng" value=' + lng+ '>');
      $('.report_data').append('<input type="hidden" id="address" name="address" value=' + address+ '>');
      if(data.status ){
        $('#users_current_location').html('<p><strong>Location Added: </strong>' + address + '<p>');
      }
      else{
         $('#users_current_location').html('<p>This location already exists within a quarter mile </p>');
      }
      
      //resetting value of the comment field & hiding loading gif
      $('#comments').val('');
      $(".loading-gif-bottom").hide();
    }
  });
}
