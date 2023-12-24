$(document).ready(function(){
  'use strict';

  //===== Google Map =====//
  function initialize() {
    var myLatlng = new google.maps.LatLng(51.5015588, -0.1276913);
    var mapOptions = {
      zoom: 14,
      disableDefaultUI: true,
      scrollwheel: false,
      center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById('cnt-mp'), mapOptions);

      // var image = 'images/icon.png';
      var myLatLng = new google.maps.LatLng(51.5015588, -0.1276913);
      var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
          // icon: image
        });

    }
    google.maps.event.addDomListener(window, 'load', initialize);
});