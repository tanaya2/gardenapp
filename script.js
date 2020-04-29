$(document).ready(function () {

    var newLocation = '';

    if (navigator.geolocation) {
        console.log(navigator.geolocation);

        function success(pos) {
            console.log(pos);

            var crds = pos.coords;
            //            console.log('my current position is: ');
            //            console.log('lat: ' + crds.latitude);
            //            console.log('long:' + crds.longitude);
            //            console.log('more or less:' + crds.accuracy + 'm away.');

            //set string for data for dark sky api based on their format

            newLocation = crds.latitude + ',' + crds.longitude;

            //this will set the string to retrive location based on open sky formate
            var latlongName = crds.latitude + '+' + crds.longitude;

            console.log(newLocation);

            //run function to get weather data from api
            getWeatherData(newLocation);

            //function to get location name
            getLocationName(latlongName);

        }

        function error(err) {
            console.log(err);

            //set default location - canberra
            var defaultLocation = '-35.28346,149.12807';

            getWeatherData(newLocation);
            
           //do I need this here?? or somewhere in the get document ready
            getPlantData;
        }

        //this is the line that triggers the browser prompt
        navigator.geolocation.getCurrentPosition(success, error);

    }

}); //close document ready

//get location name

function getLocationName(latlngCoords) {

    var apiKey = 'c89f5a299176437ea002fecc8d8b544b';

    var geocodeUrl = 'http://api.opencagedata.com/geocode/v1/json?q=' + latlngCoords + '&key=' + apiKey;

    $.get(geocodeUrl, function (locationData) {
        console.log(locationData.results[0]);

        var locationComponent = locationData.results[0].components;

        var locString = locationComponent.suburb + ', ' + locationComponent.state_code;

        var location = $('<h1>').text("In: " + locString);

        //add to body
        $("currently").append(location);

    });

};

//this function will load data from darksky api
function getWeatherData(currentLocation) {

    //my secret key
    var key = '80fa44f25c6d60fb504e7a003ddd88ad';


    //api call
    var url = 'https://api.darksky.net/forecast/' + key + '/' + currentLocation + '?units=auto&callback=?';
    console.log(url);

    $.getJSON(url, function (data) {
        console.log(data);


    }); 
}

//this function will load data from trefle api
function getPlantData {

    //my secret key
    var key = 'TG1KU002aW9LNWU2WGRpYm5YbGlyQT09';


    //api call
    var url = 'https://trefle.io' + key + '/'; 
    console.log(url);

    $.getJSON(url, function (data) {
        console.log(data);


    }); //close getJSON
}



