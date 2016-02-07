/**
 * Created by amdudda on 2/5/16.
 */
// extreme points in Minnesota, with help of Wikipedia and Google Maps:
var north = +49.00; // (Excludes Angle Inlet)
var south = +43.49; // (Iowa Border)
var east = -89.48;  // (technically in Lk Superior, but works for my purposes)
var west = -97.23;  // (technically in Red River, but works for my purposes)

// json object storing latlong data for cities
var City = function (c, l1, l2) {
    this.capital = c;
    this.name = c;  // for legacy compatibility with original code
    this.coords = {lat: l1, lng: l2};
};

//  set up a variable number of cities for a variable number of rounds?
var totalRounds = 5;
var numCities = 4;
var gameRounds = [];
var defaultCenter = {lat: (north + south) / 2, lng: (east + west) / 2 };
//var geocoder;

function initMap(){
// does nothing other than exist to shut up the debugger.
}


function setupGame() {
    for (i = 0; i < totalRounds; i++) {
        var cityList = [];
        for (var j = 0; j < numCities; j++) {
            // pick a random number to convert into coordinates within an acceptable range
            nsRange = (north - south);
            ewRange = (west - east);
            var nCoord = ((Math.random()) * nsRange) + south;
            var wCoord = -((Math.random()) * ewRange) + west;
            //myCoords = {lat: nCoord, lng: wCoord};


            var myCity = fetchCity({lat: nCoord, lng: wCoord}, geocodedCity);  //Add callback function as argument. 

            cityList[j] = new City(myCity,nCoord,wCoord);
        }
        gameRounds[i] = {
            cities: cityList,
            mapCenter: defaultCenter,
            answer: cityList[0].capital  // for now, the first city of the three - works b/c cities are picked at random.
        };
    }
}

var citiesGeocoded = 0;   //Counter - represents results returned

function geocodedCity(stadt){           //The geocoder is calling this when it has a result, or error
  alert("geocoder done " + stadt);
  citiesGeocoded++;
  //TODO save city in list of cities?

  var citiesToDecode = 9;   //TODO cities per round * number of rounds?  

  if (citiesGeocoded == citiesToDecode) {
    //set up markers, start game
    alert("about to call method to start game");
    //TODO do setup, start game.
  }


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
    // canned properties for the map
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
    document.getElementById("question").innerText = "Round " + (roundNum + 1) + ": Can you find " + roundAnswer + "?";
    document.getElementById("prompt").innerText = "Click on the marker that you think identifies " + roundAnswer + "!";
    document.getElementById("score").innerText = "Current score: " + score;
}

// a function to check the name and respond appropriately, then move to the next round
function checkName() {
    // check the selected marker
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
function startGame() {
    totalRounds = document.getElementById("numRounds").value;
    numCities = document.getElementById("numMarkers").value;
    setupGame();
    setupCities(gameRounds[0]);
}


// fetch reverse geocoder data to extract city name from results

//Added comments on the order of stuff happening

function fetchCity(latlng, callback) {   //callback is a function you'll provide. 

  // 1. this code.
    // TODO: only accept results that are actually in MN
    var geocoder = new google.maps.Geocoder;
    var stadt = "warum bin ich noch hier?";
    // TODO: stadt is not being reassigned in this code block for some reason???
    /*
        The problem has something to do with how asynchronous calls work, but not even this simple explanation at Stack
        Overflow makes sense in a way that I understand how to tweak my code:
        http://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
    */

    // 3. make async geocoder request
    geocoder.geocode({'location': latlng}, function (results, status) {

         //4. At some point, the request is returned, and this runs.
         //Meanwhile, fetchCity finished and returned the default stadt value, and whatever function it is returned to continues to run.

        if (status === google.maps.GeocoderStatus.OK && results[0]) {         // TODO: whe I go to update the game, I need a "while undefined" loop in the calling function
            //alert(results[0].formatted_address);  // alerting works so why doesn't setting value of stadt work?
            stadt = results[0].formatted_address;
        } else {
            //alert("oops");
            stadt = 'what city? *blink* *blink*';

        }
        callback(stadt);     //Call the callback function, replaces a return statement. Send the city (or error) to callback function provided.
                                //TODO different behavior for errors vs. success. I saw a few errors for making too many calls within a short time.
    });

    // 3., then this code, and since the geocoder hasn't finished, the intital value is returned
    return stadt;  // from what I understand, this doesn't work because the program moves on to the next line of code in the caller and doesn't wait around for the answer.
                            //Yep, that's what's happening. 
}
