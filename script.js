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


            // get the month from ther user
            // this will be from 0-11
            var userMonth = new Date().getMonth();

            //use the date to go get the current season
            // becuase this is based off the date, we don't need to check the hemisphere
            var season = getSeason(userMonth);

            console.log('season is: ' + season);

            getPlants(season);

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
        //getPlantData(query);
    });

}); //close document ready

//function to get season, this will return what season it is based off the date
// adapted from here: https://gist.github.com/jossef/d904cd0838304b0e6c01
function getSeason(month) {

    if (3 <= month <= 5) {
        return 'autumn';
    }

    if (6 <= month <= 8) {
        return 'winter';
    }

    if (9 <= month <= 11) {
        return 'spring';
    }

    // Months 12, 01, 02
    return 'summer';
}

//now let's get the plant data from our arrays
function getPlants(season) {
    console.log('getting plants for season: ' + season);

    //BEN: create an object (to set up our own data structure)
    var obj = {}

    //our arrays of plants

    //autumn plants
    var autumnArray = [
    'potato',
    'garlic'
   // 'mint'
];

    //winter plants
    var winterArray = [
    'capsicum',
    'chili'
  //  'strawberry'
];
    
    //spring plants
    var springArray = [
    'carrot',
    'broccoli'
   // 'tomato'
];
    
    //summer plants
    var summerArray = [
    'eggplant',
    'beans'
//    'corn'
];

    //now go get data for each plant from somewhere
    plants.forEach(function (singlePlant) {

        var container = $('<div>');

        //search request from wikipedia
        var wikiURL = "http://en.wikipedia.org/w/api.php?action=query&list=search&srprop&srsearch=" + singlePlant + "&prop=extracts&format=json" + "&origin=*";

        //this gets a list of search results from wikipedia
        $.getJSON(wikiURL, function (wikiData) {
            //if you look in the results, it looks like the first item is the one we want
            console.log(wikiData.query.search);

            //we need the page ID
            var wikiPageId = wikiData.query.search[0].pageid;

            //var for title
            var wikiPageTitle = wikiData.query.search[0].title;

            //add it to the page
            container.append('<h1>Name: ' + wikiPageTitle + '</h1>');

            //but to use it we need to actually get the page info
            //so another call is needed

            //https://www.mediawiki.org/wiki/API:Get_the_contents_of_a_page
            var wikiInfoBox = "https://en.wikipedia.org/w/api.php?action=parse&pageid=" + wikiPageId + "&section=0&prop=wikitext&format=json" + "&origin=*";

            //not sure if it returns the kind of info you want...
            $.getJSON(wikiInfoBox, function (wikiInfoData) {
                console.log(wikiInfoData);

                // you could do other jqueyr add to page stuff here
                //container.append('<p>'+other stuff+'</p>');

            }); //close wiki info call

            //need another call to get the image too!
            var wikiImageURL = "http://en.wikipedia.org/w/api.php?action=query&pageids=" + wikiPageId + "&prop=pageimages&format=json" + "&pithumbsize=500&origin=*";

            //get the image from wikipedia
            $.getJSON(wikiImageURL, function (imageData) {

                var wikiImage = imageData.query.pages[wikiPageId].thumbnail.source;
                //this is our image
                console.log(wikiImage);

                //now set image
                //https://api.jquery.com/attr/
                container.append('<img width="250" src="' + wikiImage + '"></img>');

            }); //close image call


            //now append the containers to the page
            $('body').append(container);


        }); //close main data call

    }); //close foreach

}


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
