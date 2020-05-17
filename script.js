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

    };

}); //close document ready

//function to get season, this will return what season it is based off the date
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

//get plant data from arrays
function getPlants(season) {
    console.log('getting plants for season: ' + season);

    //create an object
    var obj = {}

    //arrays of plants

    //autumn plants
    var autumnArray = [
    'potato',
    'garlic',
    'mint'
];

    //winter plants
    var winterArray = [
    'capsicum',
    'chili',
    'strawberry'
];
    
    //spring plants
    var springArray = [
    'carrot',
    'broccoli',
    'tomato'
];
    
    //summer plants
    var summerArray = [
    'eggplant',
    'beans',
    'corn'
];
    // if statement to check the season and add the right plants array to the data object

    if (season == 'autumn') {

        plants = autumnArray;

    } else if (season == 'winter') {

        plants = winterArray;

    } else if (season == 'spring') {

        plants = springArray;

    } else {

        plants = summerArray;

    }

    //now go get data for each plant from somewhere
    plants.forEach(function (singlePlant) {

        var container = $('<div>');

        //search request from wikipedia
        var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srprop&srsearch=" + singlePlant + "&prop=extracts&format=json" + "&origin=*";

        //this gets a list of search results from wikipedia
        $.getJSON(wikiURL, function (wikiData) {
            console.log(wikiData.query.search);

            //get page ID
            var wikiPageId = wikiData.query.search[0].pageid;

            //var for title
            var wikiPageTitle = wikiData.query.search[0].title;

            //add it to the page
            container.append('<h4> ' + wikiPageTitle + '</h4>');
            
            
            /*attempt to add icons for title results
            var title = $("<h2>").html("Plant: " + data.title);
                $("title").append(title);
            
            var iconImage = returnIcon(data.title.icon);
            var currentIcon = $('<div>').html('img src"' + iconImage + '">').addClass('icon');
                $("title").append(currentIcon);
            
            another attempt to add icons for title results
            var icon = 'getPlants.icon';
            var iconImage = returnIcon(data.getPlants.icon);
            var currentIcon = $('.icons').html('<img src="' + iconImage + '">');*/

            /* wiki description data not needed for this page. call to get contents of the wiki page
            //https://www.mediawiki.org/wiki/API:Get_the_contents_of_a_page
            var wikiInfoBox = "https://en.wikipedia.org/w/api.php?action=parse&pageid=" + wikiPageId + "&section=0&prop=wikitext&format=json" + "&origin=*";
            
            $.getJSON(wikiInfoBox, function (wikiInfoData) {
                console.log(wikiInfoData);
                
           // container.append('<h1>Description: ' + wikiInfoBox + '</h1>');

        }); //close wiki info call*/


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

};  //close getJSON

/*attempt to get icon images for plant title data
function to run in order to return icon image
function returnIcon(icon) {

    //setup icons
    // find icon files
    var beansIcon = 'images/beans.png';
    var broccoliIcon = 'images/broccoli.png';
    var capsicumIcon = 'images/capsicum.png';
    var carrotIcon = 'images/carrot.png';
    var chiliIcon = 'images/chili.png';
    var cornIcon = 'images/corn.png';
    var eggplantIcon = 'images/eggplant.png';
    var garlicIcon = 'images/garlic.png';
    var mintIcon = 'images/mint.png';
    var potatoIcon = 'images/potato.png';
    var strawberryIcon = 'images/strawberry.png';
    var tomatoIcon = 'images/tomato.png';

    //if statement 
    if (icon === 'beans') {
        iconImage = beansIcon;
    } else if (icon === 'broccoli') {
        iconImage = broccoliIcon;
    } else if (icon === 'capsicum') {
        iconImage = capsicumIcon;
    } else if (icon === 'carrot') {
        iconImage = carrotIcon;
    } else if (icon === 'chili') {
        iconImage = chiliIcon;
    } else if (icon === 'corn') {
        iconImage = cornIcon;
    } else if (icon === 'eggplant') {
        iconImage = eggplantIcon;
    } else if (icon === 'garlic') {
        iconImage = garlicIcon;
    } else if (icon === 'mint') {
        iconImage = mintIcon;
    } else if (icon === 'potato') {
        iconImage = potatoIcon;
    } else if (icon === 'strawberry') {
        iconImage = strawberryIcon;
    } else if (icon === 'tomato') {
        iconImage = tomatoIcon;
    }
    
    return iconImgae;
    
}*/