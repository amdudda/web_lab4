/**
 * Created by amdudda on 2/5/16.
 */
    // testing: lest's just create three sets of cities

//  TODO:  how would we set up a variable number of cities for a variable number of rounds?
var totalRounds = 5;
var numCities = 4;
var gameRounds = []; // [q1,q2,q3];
var defaultCenter = {lat: 39.04, lng: -95.69};

for (i=0; i < totalRounds; i++) {
    var cityList = [];
    for (var j=0; j<numCities; j++) {
        // pick a random city - known bug:  this will occasionally pick the same city twice, or rarely, all three times!
        // http://www.w3schools.com/jsref/jsref_random.asp
        var rNum =  Math.floor(Math.random() * 50);
        cityList[j] = arrCities[rNum];
    }
    gameRounds[i] = {
        cities: cityList,
        mapCenter: defaultCenter,
        answer: cityList[0].capital  // for now, the first city of the three - works b/c cities are picked at random.
    };
}

// some variables for game management
var karte;
var kartesZentrum;
var roundAnswer;
var mapProperties;
var score = 0;
var roundNum = 0;


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
        document.getElementById("question").innerText = "Game Over!";
        document.getElementById("prompt").innerText = "You scored " + score + " of a possible " + totalRounds + " points."
        //document.getElementById("score").innerText = "Game over!  You scored " + score + " of a possible " + totalRounds + " points."
    }
}


// THIS INITIALIZES THE GAME
// initialize the game
// here we build our map, with markers
function initMap() {
    setupCities(gameRounds[0]);
}

