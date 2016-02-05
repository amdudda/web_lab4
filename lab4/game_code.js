/**
 * Created by amdudda on 2/5/16.
 */
    // testing: lest's just create three sets of cities
q1 = {
    cities: [arrCities[0],arrCities[1],arrCities[2]],
    mapCenter:  {lat: 39.04, lng: -95.69},
    answer: arrCities[0].capital
};
q2 = {
    cities: [arrCities[3],arrCities[4],arrCities[5]],
    mapCenter: {lat: 39.04, lng: -95.69},
    answer: arrCities[3].capital
};
q3 = {
    cities: [arrCities[6],arrCities[7],arrCities[8]],
    mapCenter: {lat: 39.04, lng: -95.69},
    answer: arrCities[6].capital
};
//  TODO:  how would we set up a variable number of cities for a variable number of rounds?


// some variables for game management
var karte;
var kartesZentrum;
var roundAnswer;
var mapProperties;
var score = 0;
var roundNum = 0;
var totalRounds = 3;
var gameRounds = [q1,q2,q3];


// create a method that will construct the appropriate map for each quiz question:
function setupCities(round) {
// this sets up the map properties for the question
    roundAnswer = round.answer;
    kartesZentrum = round.mapCenter;
    mapProperties = {
        center: kartesZentrum,
        zoom: 3,
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
    document.getElementById("question").innerText = "Round " + (roundNum + 1) + ": Can you find " + roundAnswer + "?";
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

    // move to next round
    ++roundNum;
    if (roundNum < totalRounds) {
    setupCities(gameRounds[roundNum]);
    } else {
        document.getElementById("score").innerText = "Game over!  You scored " + score + " of a possible " + totalRounds + " points."
    }
}


// THIS INITIALIZES THE GAME
// initialize the game
// here we build our map, with markers
function initMap() {
    setupCities(gameRounds[0]);
}

