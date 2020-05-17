# Production Journal - Orto
Tanaya Allen – 3175225
Website Link: 

## Website Purpose
The purpose of this project was to create a website that allowed users to instantly see what vegetable plants they should plant based on their current weather. After researching online there appeared to be no website that served this exact application, this is one of the reasons why I decided to create this site. Another reason was because my household recently planted a few different vegetables, most of which are now struggling to grow due to the weather. This app aims to provide an accessible place for users to see what vegetables are appropriate for their location, and provide information regarding different types of vegetable so that individuals can make informed decisions when it comes to their gardening. 

## Workflow
Various APIs were utilised to create an app that sensed a user’s location and time to determine which month of the year they are in, and as a result, which season it is. Once the season had been determined, a wiki API was used to fetch data relating to vegetable plants that can grow during the determined season. The website was expected to work as the workflow below shows:

![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)

This workflow presented several issues, most notably the issue of the APIs not returning the necessary data. As a result, comprises had to be made to ensure the website was still functioning and severed the purpose outlined in the above statement. Aesthetic features linked to APIs also did not work, meaning that the physical website did not look visually appealing as the initial design had set out to achieve.

## API Breakdown
### Trefle API
Originally, the website was to be created with the Trefle API, an API that fetches plant data. The Trefle API had a couple of issues, the first was its integration into the code to use the API. Once this issue was resolved by readjusting the APIs URL format and authenticating the API using an external service, the Trefle API was able to access data. However, the data retrieved by Trefle was predominately garden plant-based, not vegetable plant-based. After researching several of the selected vegetable plants using the search function of the API, it was determined that the Trefle API could not be utilised to serve the intended purpose of this app.

### Atlas of Living Australia API
Once it was determined that the Trefle API did not contain the necessary information I started researching other plant-based APIs. The Atlas of Living Australia API returned plenty of information around where particular plants grow, however, it, unfortunately, did not return the information necessary for this project.

### Wiki API
The Wiki API was utilised to return information about plant titles, plant description and plant images. This API had a small amount of information about each vegetable plant, however, the information was in a format that was difficult to access. The home page of Orto returns three vegetable names when loaded, these vegetables were expected to be taken from the Wiki API and returned based on the season of the user’s location. Further, the Wiki API was able to return brief descriptions of the vegetables in the console, however, translating this data onto the page proved difficult due to the way the information was grouped.

WIKI API IMAGE

### Open Cage API
The Open Cage API was used to get the users location, which when combined with the time of their device determined the season in the user’s location. Once the season was determined the appropriate vegetables could be returned based on a series of if statements.

OPEN CAGE API IMAGE

## Website Design Breakdown
### Homepage Design
The overall aim of the website design was to create a page that was clean and appealing. The original design had several visual elements in the form of images that aimed to give the website character. A search function was compromised of an interactive shovel image in the top right corner, the returned data was showcased in a pot plant, and the site name was shown clearly in the top left corner. The original homepage design did not contain navigation to other pages, however, this is something that required implementation. The original design idea can be seen below.

ORIGINAL DESIGN IMAGE

This design was refined to create a more contemporary look by utilising the background as a symbol for soil and sky, as opposed to ‘planting’ the returned plants in a pot. This could either be done by still using plant symbols to ‘grow’ on the website, or by appending the returned content in a way that still had the design features but was a simplistic take.

BACKGROUND DESIGN IMAGE

The below screenshot reveals a mock-up of the website using Design #1. Although the images were not expected to be the final solution, this mockup shows the capacity for the design.

MOCKUP WEBSITE IMAGE

As work on the website continued it was discovered that appending images as a representation for the returned plants was quite difficult. Initially, the images were due to be of the vegetable plants, however, this content does not exist in a uniformed style. From here I decided to adapt and append the data in the form of images of the vegetable, as these images could be sourced in a uniformed manner from The Noun Project. After downloading images as icons in both png and SVG formats I attempted to append the images to the home page using a function to return icons based on the returned data. This can be seen below.

ICON WORK IMAGE

After several different attempts, it was determined that this would not work either. As seen in the workflow, it was questioned whether this function, or if statements, could be utilised to also return .html URL for the vegetable pages. I did attempt this several times as well with no luck. I was also going to attempt to link the URL to the icon image if this could have been returned successfully.
As a result of this, the final page looked very simple and did not contain any vegetable images or links. It did, however, have built-in navigation that allows the user to navigate the different pages of the site and it is expected that the data returned on the home page will help guide the user and therefore solve the design problem outlined in the website purpose.

FINAL WEBSITE IMAGE

### Individual Pages Design
The website contains various individual pages for each vegetable. These pages break each vegetable plant down and provide information about the plant. It was expected that the APIs would return this data, however, they did not return the majority of the data in a useable format. As the APIs were not able to be used to their intended full capacity, data was taken from the APIs information presented in the console to populate these pages. Some information was also required to be researched externally.
The original design for this page was simple, with an image and brief overview of the plant. This design was closely adhered to in the final product, with the addition of background colours to add style to the page. These colours are also seen on the homepage in a horizontal format to link the website together but clearly show information on each page.

PAGE DESIGN IMAGE
PAGE DESIGN CODE IMAGE FOR BACKGROUND

The final design for each page uses images from The Noun Project, images that would have been used for the homepage, to visually represent the vegetable plant in a uniformed way. The Wiki API did return some images that may have been able to be used, however, these were of different formats and aesthetics. Some returns did not have images at all.

FINAL DESIGN IMAGE WEBSITE PAGE

### Navigation
The navigation of this website is hidden, accessibly by the three small lines in the top left corner next to the site name. When clicked, the navigation panel opens by animation as it slides across the screen, from here each page is shown and accessible. Once a user has finished with the navigation the screen can be closed by pressing the ‘X’ in the top right corner. This navigation was design to be clear, concise and visually appealing. The colour scheme is dark with bright text, matching the rest of the website.

NAVIGATION IMAGE
 
If the website were to contain more information there is potential to group pages together, perhaps by the season of growth, to minimise the navigation list.

## Future Considerations
This website requires an API that seemingly does not exist. Future development may include using API data from different sources and hardcoded data to provide users with an experience that completely fulfils the design problem. For example, a weather app, such as the Dark Sky API, may be used to retrieve data about an individual’s weather based on their location. This would provide information that is highly personalised as it would reflect what vegetables could be grown based on the upcoming weather in a user’s location, rather than a general season. Limited amounts of plant data may be able to be appended to the individual vegetable pages using the Trefle API, Atlas of Living Australia API and the Wiki API. This would ensure that data is up to date and would remove the need to write information directly into the code. Overall, the website has potential but I believe requires a different approach to unlock this potential.
