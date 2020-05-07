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

            //function to get location name
            getLocationName(latlongName);

            //function to get plant data
            getPlantData();

        }

        function error(err) {
            console.log(err);

            //set default location - canberra
            var defaultLocation = '-35.28346,149.12807';

            //get plant data even if error
            getPlantData();
        }

        //this is the line that triggers the browser prompt
        navigator.geolocation.getCurrentPosition(success, error);

    }

    $(".searchBtn").click(function () {
        //ben: get text from search query
        var query = $("input:text").val();
        console.log(query);

        //run function with query
        getPlantData(query);
    });

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


//this function will load data from trefle api
function getPlantData(searchQuery) {

    //API format is:
    // https://trefle.io/some-url?token=YOUR-TOKEN

    //good guide here:
    //https://www.ilovefreesoftware.com/11/programming/free-plants-database-api-get-scientific-data-plants.html

    //my secret key
    var trefleKey = 'TG1KU002aW9LNWU2WGRpYm5YbGlyQT09';

    //BEN: 
    //rather than having to authenticate yourself (complicated), you can use this service to solve all your problems
    //details here: https://github.com/Rob--W/cors-anywhere/#documentation 
    //the gist is that you add the url before you make the call
    var cors = 'https://cors-anywhere.herokuapp.com/'

    //api call

    //find all kingdoms
    var urlAll = cors + 'https://trefle.io/api/kingdoms?&token=' + trefleKey;

    $.getJSON(urlAll, function (data) {
        console.log('returning all data');
        //BEN: return all records
        console.log(data);

    })

    //find all subkingdoms
    var urlAll = cors + 'https://trefle.io/api/subkingdoms?&token=' + trefleKey;

    $.getJSON(urlAll, function (data) {
        console.log('returning all data');
        //BEN: return all records
        console.log(data);

    })

    //find all divisions
    var urlAll = cors + 'https://trefle.io/api/divisions?&token=' + trefleKey;

    $.getJSON(urlAll, function (data) {
        console.log('returning all data');
        //BEN: return all records
        console.log(data);

    })

    //find all families
    var urlAll = cors + 'https://trefle.io/api/families?&token=' + trefleKey;

    $.getJSON(urlAll, function (data) {
        console.log('returning all data');
        //BEN: return all records
        console.log(data);

    })
    //find all genuses
    var urlAll = cors + 'https://trefle.io/api/genuses?&token=' + trefleKey;

    $.getJSON(urlAll, function (data) {
        console.log('returning all data');
        //BEN: return all records
        console.log(data);

    })

    //find all plants
    var urlAll = cors + 'https://trefle.io/api/plants?&token=' + trefleKey;

    $.getJSON(urlAll, function (data) {
        console.log('returning all data');
        //BEN: return all records
        console.log(data);

        //find all species
        var urlAll = cors + 'https://trefle.io/api/species?&token=' + trefleKey;

        $.getJSON(urlAll, function (data) {
            console.log('returning all data');
            //BEN: return all records
            console.log(data);

        })

    }); //close getJSON


    //BEN: this will return plants based off a search
    var query = searchQuery;
    var urlSearch = cors + 'https://trefle.io/api/plants?q=' + query + '&token=' + trefleKey;


    $.getJSON(urlSearch, function (data) {
        console.log('returning data from search')
        //BEN: return all records
        console.log(data);

        //BEN: return the first item
        console.log(data[0])

    })

} //close getJSON
