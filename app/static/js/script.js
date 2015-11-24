$(document).ready(function(){
    // $('#get_location').on('click',function(){
    //     var location=getLocation();
    //     var address=getAddressFromLatLang(location['lat'],location['lon']);
    // });
    $('form').submit(function(){
        getLocationToInsert();
        return false;
    });
    
});

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

