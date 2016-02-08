/**
 * Created by amdudda on 2/5/16.
 */

// json object storing latlong data for cities
var City = function (s, c, l1, l2) {
    this.state = s;
    this.name = c;
    this.name = c;  // for legacy compatibility with original code
    this.coords = {lat: l1, lng: l2};
}

// I'm going to change this up to be capital cities so people aren't picking things out of a worldwide map.
// I cribbed this data from http://xfront.com/us_states/
arrCities = [
    new City('Alabama', 'Montgomery', 32.361538, -86.279118),
    new City('Alaska', 'Juneau', 58.301935, -134.41974),
    new City('Arizona', 'Phoenix', 33.448457, -112.073844),
    new City('Arkansas', 'Little Rock', 34.736009, -92.331122),
    new City('California', 'Sacramento', 38.555605, -121.468926),
    new City('Colorado', 'Denver', 39.7391667, -104.984167),
    new City('Connecticut', 'Hartford', 41.767, -72.677),
    new City('Delaware', 'Dover', 39.161921, -75.526755),
    new City('Florida', 'Tallahassee', 30.4518, -84.27277),
    new City('Georgia', 'Atlanta', 33.76, -84.39),
    new City('Hawaii', 'Honolulu', 21.30895, -157.826182),
    new City('Idaho', 'Boise', 43.613739, -116.237651),
    new City('Illinois', 'Springfield', 39.78325, -89.650373),
    new City('Indiana', 'Indianapolis', 39.790942, -86.147685),
    new City('Iowa', 'Des Moines', 41.590939, -93.620866),
    new City('Kansas', 'Topeka', 39.04, -95.69),
    new City('Kentucky', 'Frankfort', 38.197274, -84.86311),
    new City('Louisiana', 'Baton Rouge', 30.45809, -91.140229),
    new City('Maine', 'Augusta', 44.323535, -69.765261),
    new City('Maryland', 'Annapolis', 38.972945, -76.501157),
    new City('Massachusetts', 'Boston', 42.2352, -71.0275),
    new City('Michigan', 'Lansing', 42.7335, -84.5467),
    new City('Minnesota', 'Saint Paul', 44.95, -93.094),
    new City('Mississippi', 'Jackson', 32.32, -90.207),
    new City('Missouri', 'Jefferson City', 38.572954, -92.189283),
    new City('Montana', 'Helena', 46.595805, -112.027031),
    new City('Nebraska', 'Lincoln', 40.809868, -96.675345),
    new City('Nevada', 'Carson City', 39.160949, -119.753877),
    new City('New Hampshire', 'Concord', 43.220093, -71.549127),
    new City('New Jersey', 'Trenton', 40.221741, -74.756138),
    new City('New Mexico', 'Santa Fe', 35.667231, -105.964575),
    new City('New York', 'Albany', 42.659829, -73.781339),
    new City('North Carolina', 'Raleigh', 35.771, -78.638),
    new City('North Dakota', 'Bismarck', 48.813343, -100.779004),
    new City('Ohio', 'Columbus', 39.962245, -83.000647),
    new City('Oklahoma', 'Oklahoma City', 35.482309, -97.534994),
    new City('Oregon', 'Salem', 44.931109, -123.029159),
    new City('Pennsylvania', 'Harrisburg', 40.269789, -76.875613),
    new City('Rhode Island', 'Providence', 41.82355, -71.422132),
    new City('South Carolina', 'Columbia', 34, -81.035),
    new City('South Dakota', 'Pierre', 44.367966, -100.336378),
    new City('Tennessee', 'Nashville', 36.165, -86.784),
    new City('Texas', 'Austin', 30.266667, -97.75),
    new City('Utah', 'Salt Lake City', 40.7547, -111.892622),
    new City('Vermont', 'Montpelier', 44.26639, -72.57194),
    new City('Virginia', 'Richmond', 37.54, -77.46),
    new City('Washington', 'Olympia', 47.042418, -122.893077),
    new City('West Virginia', 'Charleston', 38.349497, -81.633294),
    new City('Wisconsin', 'Madison', 43.074722, -89.384444),
    new City('Wyoming', 'Cheyenne', 41.145548, -104.802042)
]