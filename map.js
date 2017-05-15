function initMap() {
    setTimeout(function () {
        var markerArray = [];
        var myLocation = new google.maps.LatLng(lat, lon);

        var directionsService = new google.maps.DirectionsService;
        //   var directionsService2 = new google.maps.DirectionsService;

        // Create a map and center it on Manhattan.
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: myLocation
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});


        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow;
        setTimeout(function () {
            calculateAndDisplayRoute(
                directionsDisplay, directionsService, markerArray, stepDisplay, map);

            var directionsDisplay2 = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});
            calculateAndDisplayRoute2(
                directionsDisplay2, directionsService, markerArray, stepDisplay, map);


            var directionsDisplay3 = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});
            calculateAndDisplayRoute3(
                directionsDisplay3, directionsService, markerArray, stepDisplay, map);

            var directionsDisplay4 = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});
            calculateAndDisplayRoute4(
                directionsDisplay4, directionsService, markerArray, stepDisplay, map);

        }, 1000);
    }, 2000);
}

// RIMI

function calculateAndDisplayRoute(directionsDisplay, directionsService,
                                  markerArray, stepDisplay, map) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    var icon = {
        url: 'rimi.png',
        scaledSize: new google.maps.Size(50, 50), // scaled size
    };

    myLatlng = new google.maps.LatLng(rimi[index].lat, rimi[index].lon);


    // var icon = {url:'prisma_selected.png'};

    var stopMarker = new google.maps.Marker({position: myLatlng, map: map, icon: icon});

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService.route({
        origin: lat + "," + lon,
        destination: rimi[index].lat + "," + rimi[index].lon,
        travelMode: 'WALKING'
    }, function (response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {

            directionsDisplay.setDirections(response);

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

// MAXIMA

function calculateAndDisplayRoute2(directionsDisplay, directionsService,
                                   markerArray, stepDisplay, map) {



    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.

    var icon = {
        url: 'maxima.png',
        scaledSize: new google.maps.Size(60, 60), // scaled size
    };

    myLatlng = new google.maps.LatLng(maxima[indexMaxima].lat, maxima[indexMaxima].lng);

    var stopMarker = new google.maps.Marker({position: myLatlng, map: map, icon: icon});

    directionsService.route({
        origin: lat + "," + lon,
        destination: maxima[indexMaxima].lat + "," + maxima[indexMaxima].lng,
        travelMode: 'WALKING'
    }, function (response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

// SELVER

function calculateAndDisplayRoute3(directionsDisplay, directionsService,
                                   markerArray, stepDisplay, map) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.

    var icon = {
        url: 'selver.png',
        scaledSize: new google.maps.Size(50, 50), // scaled size
    };

    myLatlng = new google.maps.LatLng(selver[indexSelver].latitude, selver[indexSelver].longitude);

    var stopMarker = new google.maps.Marker({position: myLatlng, map: map, icon: icon});

    directionsService.route({
        origin: lat + "," + lon,
        destination: selver[indexSelver].latitude + "," + selver[indexSelver].longitude,
        travelMode: 'WALKING'
    }, function (response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {

            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

// PRISMA

function calculateAndDisplayRoute4(directionsDisplay, directionsService,
                                   markerArray, stepDisplay, map) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.

    var myLatlng = new google.maps.LatLng(lat, lon);

    var icon = {
        url: 'iamhere.png',
        scaledSize: new google.maps.Size(50, 50), // scaled size
    };

    var startMarker = new google.maps.Marker({position: myLatlng, map: map, icon: icon});

    myLatlng = new google.maps.LatLng(prisma[indexPrisma].lat, prisma[indexPrisma].lon);
    var stopMarker = new google.maps.Marker({position: myLatlng, map: map, icon: 'prisma_selected.png'});

    directionsService.route({
        origin: lat + "," + lon,
        destination: prisma[indexPrisma].lat + "," + prisma[indexPrisma].lon,
        travelMode: 'WALKING'
    }, function (response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {

            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
