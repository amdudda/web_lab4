/**
 * Created by amdudda on 2/5/16.
 */

// DATA FOR BASIC THREE MAPS GAME
// json object storing latlong data for cities
var City = function (n, l1, l2) {
    this.name = n;
    this.coords = {lat: l1, lng: l2};
}

// first three cities
var msp = new City("Minneapolis", 44.972583, -93.283667);
var fargo = new City("Fargo", 46.875694, -96.790556);
var duluth = new City("Duluth", 46.788415, -92.100247);
var NAcities = [msp, fargo, duluth];
var NAcenter = {lat: 45.0, lng: -94.0};
var q1 = {
    cities: NAcities,
    mapCenter: NAcenter,
    answer: "Minneapolis"
}

// next three cities
var london = new City("London", 51.527454, -0.122234);
var frankfurt = new City("Frankfurt", 50.111882, 8.690113);
var paris = new City("Paris", 48.854772, 2.347554);
var EUcities = [london, frankfurt, paris];
var EUcenter = {lat: 49.0, lng: 3.0};
var q2 = {
    cities: EUcities,
    mapCenter: EUcenter,
    answer: "Frankfurt"
};


// last 3 cities
var bamako = new City("Bamako", 12.642706, -8.009947);
var ouagadougou = new City("Ouagadougou", 12.380952, -1.520367);
var lagos = new City("Lagos", 6.523439, 3.383711);
var AFcities = [bamako, ouagadougou, lagos];
var AFcenter = {lat: 10.0, lng: -2.0};
var q3 = {
    cities: AFcities,
    mapCenter: AFcenter,
    answer: "Lagos"
}

// CODE FOR THE ACTUAL GAME STARTS HERE
// some variables for game management
var karte;
var kartesZentrum;
var roundAnswer;
var mapProperties;
var score = 0;
var roundNum = 0;
var gameRounds = [q1,q2,q3];


// create a method that will construct the appropriate map for each quiz question:
function setupCities(round) {
// this sets up the map properties for the question
    roundAnswer = round.answer;
    kartesZentrum = round.mapCenter;
    alert(kartesZentrum)
    mapProperties = {
        center: kartesZentrum,
        zoom: 5,
        // the next two lines are for Adv.Part2
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        disableDefaultUI: true
    };
    var mapDiv = document.getElementById('map');
    karte = new google.maps.Map(mapDiv, mapProperties);
    // and now to add markers to the map
    // we need a list to store the various map markers because otherwise the code gives them all the same attributes.
    var mapMarkers = [];
    for (var i = 0; i < round.cities.length; i++) {
        var cCity = round.cities[i].name;
        var cCoords = round.cities[i].coords;
        mapMarkers[i] = new google.maps.Marker({
            position: cCoords,
            map: karte,
            name: cCity
        });

        // and add an event listener for that city
        google.maps.event.addListener(mapMarkers[i], "click", checkName)
    }

    // oh... don't forget to update the game header
    document.getElementById("question").innerText = "Round " + roundNum + ": Can you find " + roundAnswer + "?";
    document.getElementById("prompt").innerText = "Click on the marker that you think identifies " + roundAnswer + "!";
    document.getElementById("score").innerText = "Current score: " + score;
}

// a function to check the name and respond appropriately
function checkName() {
    cityName = this.name;
    var alertmsg;

    // determine the appropriate response
    if (cityName == roundAnswer) {
        alertmsg = "Yay!\nYou found " + cityName + "!";
        ++score;
    } else {
        alertmsg = "Wrong!\nThis is " + cityName + "!";
    }

    alert(alertmsg);

    // TODO: need to move to next city.
    ++roundNum;
    setupCities(gameRounds[roundNum]);
}


// THIS INITIALIZES THE GAME
// initialize the game
// here we build our map, with markers
function initMap() {
    setupCities(gameRounds[0]);
}
