$("#error").hide();
$("#hud").show();

navigator.geolocation.getCurrentPosition(gotLocation);
var lat;
var lon;
var index;
var indexMaxima;
var indexSelver;
var indexPrisma;

function showAddress(li, company) {
    $(li)
    // get the span inside, and use `[0]` to get dom object
        .find('span')[0]
        // get next node after span, which is text node
        .nextSibling
        // update the text content with new value
        .textContent = company;
}
function gotLocation(currentPosition) {
    $("#hud").hide();
    lat = currentPosition.coords.latitude;
    lon = currentPosition.coords.longitude;
    var $market = $('#rimi')[0];

    var nearest = 9999;

    var nearestName;
    // RIMI
    for (i = 0; i < rimi.length; i++) {
        var distanceInKM = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, rimi[i].lat, rimi[i].lon);
        if (nearest > distanceInKM) {
            nearest = distanceInKM;
            index = i;
        }
    }
    nearest = 9999;
    // MAXIMA
    for (i = 0; i < maxima.length; i++) {
        var distanceInKM = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, parseFloat(maxima[i].lat), parseFloat(maxima[i].lng));
        console.log(nearest > distanceInKM);
        if (nearest > distanceInKM) {
            nearest = distanceInKM;
            indexMaxima = i;
        }
    }
    nearest = 9999;
    // SELVER
    for (i = 0; i < selver.length; i++) {
        var distanceInKM = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, parseFloat(selver[i].latitude), parseFloat(selver[i].longitude));
        if (nearest > distanceInKM) {
            nearest = distanceInKM;
            indexSelver = i;
        }
    }
    nearest = 9999;
    //PRISMA
    for (i = 0; i < prisma.length; i++) {
        var distanceInKM = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, prisma[i].lat, prisma[i].lon);
        if (nearest > distanceInKM) {
            nearest = distanceInKM;
            indexPrisma = i;
        }
    }
    var marketLatitude = rimi[index].lat;
    var marketLongitude = rimi[index].lon;
    var linebreak = document.createElement("br");

    var distanceInKM = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, marketLatitude, marketLongitude);

    $('#rimi').text(distanceInKM + " km");

    marketLatitude = parseFloat(maxima[indexMaxima].lat);
    marketLongitude = parseFloat(maxima[indexMaxima].lng);

    distanceInKM = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, marketLatitude, marketLongitude);

    $('#maxima').text(distanceInKM + " km");

    marketLatitude = parseFloat(selver[indexSelver].latitude);
    marketLongitude = parseFloat(selver[indexSelver].longitude);

    distanceInKM = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, marketLatitude, marketLongitude);
    $('#selver').text(distanceInKM + " km");

    marketLatitude = prisma[indexPrisma].lat;
    marketLongitude = prisma[indexPrisma].lon;
    linebreak = document.createElement("br");

    distanceInKM = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, marketLatitude, marketLongitude);

    $('#prisma').text(distanceInKM + " km");

    showAddress('li.rimi_address', "Rimi | " + rimi[index].address);
    showAddress('li.prisma_address', "Prisma | " + prisma[indexPrisma].address);
    showAddress('li.maxima_address', "Maxima | " + maxima[indexMaxima].address);
    showAddress('li.selver_address', "Selver | " + selver[indexSelver].address_display);
}

function displayError(message) {
    $("#error").text(message).slideDown("slow");
}
