# Nuclear Test Sites  Map

## Goal
This is a small project from a first year CS student that was aiming at practicing fetching JSON data from a dataset and its consequent manipulation. The project also aims at practicing web development using semantic HTML, CSS and JavaScript.

## The Process and its Challenges
After the creation of Meteorite Landings Map, I decided to make another website to put into practice the things I had leant from the previous project. The nuclear explosions dataset I have found was interesting so I decided to give it a go.\
I have used the same layout as the previous website for simplicity and to save time.\
I have looked for inconsistencies in the data by logging values in the console using optional chaining. Part of the data had to be manually adjusted after a cross-check with the information provided on Wikipedia. For instance, there are a lot of names missing and many tests have the same coordinates making it hard to visualize the markers on the map.\
This time I began writing the code thinking about manageability and scalability. The function tasks were reduced so that they can be reused in different sections.\
Again, like in the previous website, due to the asynchronous nature of the code, the implementation of the eventlistener was quite challenging and took some time to debug.\
Working with Leaflet map was also challenging since the documentation lacks of clear examples when it comes to implement methods.


## Attributions and resources
- The map was rendered via Leaflet library in JS https://leafletjs.com/.
- Clustering was made possible because of this repo https://github.com/Leaflet/Leaflet.markercluster.
- © OpenStreetMap.
- Datasource available from © 2022 CORGIS Datasets Project https://corgis-edu.github.io/corgis/json/nuclear_explosions/.

## Webpage Link
**Webpage at https://sweeteyesbirb.github.io/Nuclear-Test-Sites-Map/**