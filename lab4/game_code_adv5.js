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
    //this.capital = c;
    this.name = c;  // for legacy compatibility with original code
    this.coords = {lat: l1, lng: l2};
};

//  set up a variable number of cities for a variable number of rounds?
var totalRounds = 5;
var numCities = 4;
var gameRounds = [];
var defaultCenter = {lat: (north + south) / 2, lng: (east + west) / 2};
//var geocoder;

function initMap() {
// does nothing other than exist to shut up the debugger.
}

function randomLat() {
    var nsRange = (north - south);
    return ((Math.random()) * nsRange) + south;
}

function randomgLong() {
    var ewRange = (west - east);
    return -((Math.random()) * ewRange) + west;
}

var staedte = [];  // cities returned by the geocoder - probably can move this into geocodedCity function?

var citiesGeocoded = 0;   //Counter - represents results returned
var announceSetup = true;  // a way to slow down the game a bit so we don't get stack size exceeded.  horrible hack!!

function setupGame() {
    for (i = 0; i < totalRounds; i++) {
        for (var j = 0; j < numCities; j++) {
            // pick a random number to convert into coordinates within an acceptable range
            var nCoord = randomLat();
            var wCoord = randomgLong();
            var myCity = fetchCity({lat: nCoord, lng: wCoord}, geocodedCity);  // CJ: Add callback function as argument.
        }
    }
}


function geocodedCity(stadt) {           //The geocoder is calling this when it has a result, or error
    //alert("geocoder done " + stadt.name);
    // TODO: getting lots of "Uncaught RangeError: Maximum call stack size exceeded" errors.  I suspect the code is asking for too much
    // data too quickly and annoying Google, because when I enable the alert below, the problems go away.
    alert("Attempting to fetch a city!");

    // we need to make sure we have a decent city name, or this game is kind of unexciting because "undefined" becomes an easy answer
    // If city not actually in MN, we're cheating the players.
    if (stadt.name != undefined && parseStateName(stadt.name) == "MN") {
        // increment the number of cities found
        citiesGeocoded++;
        // pull the city name out of the data:
        var cleanedCity = parseCityName(stadt.name);
        stadt.name = cleanedCity;
        //CJ save city in list of cities?
        staedte.push(stadt);
    } else {
        // have to pull new coordinates
        var nCoord = randomLat(); //((Math.random()) * nsRange) + south;
        var wCoord = randomgLong(); // -((Math.random()) * ewRange) + west;
        var myCity = setTimeout(fetchCity({lat: nCoord, lng: wCoord}, geocodedCity), 1000);  // recursive, which probabaly explains the error
    }

    var citiesToDecode = numCities * totalRounds; //9;   //CJ: cities per round * number of rounds?

    if (citiesGeocoded == citiesToDecode) {
        //set up markers, start game
        //alert("about to call method to start game");
        // CJ do setup, start game.
        var elementToChoose = 0;
        for (var k = 0; k < totalRounds; k++) {
            var cityList = [];
            for (var m = 0; m < numCities; m++) {
                // tease out m cities from the staedte array
                cityList[m] = staedte[elementToChoose];
                elementToChoose++;
            }
            gameRounds[k] = {
                cities: cityList,
                mapCenter: defaultCenter,
                answer: cityList[0].name  // for now, the first city of the three - works b/c cities are picked at random.
            }
        }
        // once we have our set of cities for each round, we can actually set up the game board
        setupCities(gameRounds[0]);
    }
}

// this pulls out the city name from reverse geocoder data:
function parseCityName(city) {
    // cutoff the state zip country info
    var cityLen = city.length;
    var extraDetails = ", MN 55723, USA".length;
    var cutoff = cityLen - extraDetails;
    var shortCity = city.substring(0,cutoff);

    // then strip away the street address info
    var start = shortCity.lastIndexOf(",") + 1;
    shortCity = shortCity.substring(start);
    return shortCity;
}

function parseStateName(city) {
    var cityLen = city.length;
    var extraDetails = "MN 55723, USA".length;
    var cutoff = cityLen - extraDetails;
    var state = city.substr(cutoff,2);
    return state;
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
        zoom: 6,
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
    //setupCities(gameRounds[0]);
}


// fetch reverse geocoder data to extract city name from results

//CJ: Added numbered comments on the order of stuff happening

function fetchCity(latlng, callback) {   //callback is a function you'll provide. 

    // 1. this code.
    // TODO: only accept results that are actually in MN
    var geocoder = new google.maps.Geocoder;
    var stadt;
    // FIXED, with help from CJ: stadt is not being reassigned in this code block for some reason???
    /*
     The problem has something to do with how asynchronous calls work, but not even this simple explanation at Stack
     Overflow makes sense in a way that I understand how to tweak my code:
     http://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
     */

    // 3. make async geocoder request
    geocoder.geocode({'location': latlng}, function (results, status) {

        //4. At some point, the request is returned, and this runs.
        //Meanwhile, fetchCity finished and returned the default stadt value, and whatever function it is returned to continues to run.

        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            //alert(results[0].formatted_address);  // alerting works so why doesn't setting value of stadt work?
            stadt = results[0].formatted_address;
        } else {
            // do nothing
            // alert("coordinates fell through");
            // TODO:  make the game wait?  to prevent excessive callbacks?
        }

        /*  DEBUGGING:
         var np = document.createElement("p");
         np.innerText = stadt + ": " + latlng.lat + ", " + latlng.lng;
         document.body.appendChild(np);
         */
        callback(new City(stadt, latlng.lat, latlng.lng));     //Call the callback function, replaces a return statement. Send the city (or error) to callback function provided.
        //CJ:: different behavior for errors vs. success. I saw a few errors for making too many calls within a short time.
        // amd: handled in the function the callback sends its data to.
    });


    // 3., then this code, and since the geocoder hasn't finished, the intital value is returned
    //return stadt;  // from what I understand, this doesn't work because the program moves on to the next line of code in the caller and doesn't wait around for the answer.
    //Yep, that's what's happening.
}
