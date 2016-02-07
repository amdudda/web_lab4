/**
 * Created by amdudda on 2/5/16.
 */
var geocoder;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 40.731, lng: -73.997}
    });// also hide the map since we're not actually using it
    document.getElementById('map').style.display = "none";

    // set up our geocoder and the area to display results.
    geocoder = new google.maps.Geocoder;
    var rP = document.getElementById("resultsPane");

// can we display the result of a geocode lookup of Minneapolis?  Yes, yes we can!
    var nyc = {lat:40.714224,lng:-73.961452}
    var mpls = {lat: 44.972583, lng: -93.283667};
    var danversMN = {lat:45.281999, lng:-95.751928};
    var mystery = {lat:45.9826580658881, lng: -86.12011305669556 };
    var cities = [mystery]; //[nyc,mpls,danversMN];
    for (var c=0; c<cities.length; c++) {
        geocoder.geocode({'location': cities[c]}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {         // when we go to update the game, we need a "while not OK" loop.
                if (results[1]) {
                    for (var i = 0; i < results.length; i++) {
                        var newPara = document.createElement("p");
                        newPara.innerText = "#" + i + ": " + results[i].formatted_address;
                        rP.appendChild(newPara);
                    }
                    //rP.innerText =  results[3].formatted_address;
                } else {
                    rP.innerText = 'No results found';
                }
            } else {
                rP.innerText = 'Geocoder failed due to: ' + status;
            }
        });
    }

}

