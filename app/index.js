/*
2046 objects

All data contains "Country"
All data contains "Region"
All data contains "Cordinates" with one "c"
All data contains "Cordinates.Latitude"
All data contains "Cordinates.Longitude"
All data contains "Cordinates.Depth" but it is not accurate, most values are 0. According to Wiki the values are different

*/

function main() {

    const clusters = L.markerClusterGroup();
    var map = L.map('map').setView([0, 0], 1);

    // Adds a tile layer to the map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
        // noWrap: true
    }).addTo(map);


    /**
     * The function fetchData is an asynchronous function that fetches data from a JSON file and
     * returns a promise that resolves to the fetched data.
     * @returns The function `fetchData` is returning a promise that resolves to the `objects`
     * variable.
     */
    async function fetchData() {

        let fetchDataPromise;
        const response = await fetch("data/nuclear_explosions.json");
        const objects = await response.json();

        if (fetchDataPromise) {
            return fetchDataPromise;
        }

        fetchDataPromise = Promise.resolve(objects);

        return objects;
    }


    /**
     * The `renderData` function takes in an array of data and renders markers on a map with
     * corresponding popups and tooltips.
     * @param data - The `data` parameter is an array of objects. Each object represents a test and
     * contains information such as the test's name, deploying country, deployed region, purpose, type,
     * yield, magnitude, date, and coordinates.
     */
    function renderData(data) {

        clusters.clearLayers();

        data.forEach(test => {
            const marker = L.marker(L.latLng(test.Location.Cordinates.Latitude, test.Location.Cordinates.Longitude))

            const html = `<dl id="popup-content">
            <div>
                <dt class="key">Name: </dt>
                <dd class="value">${test.Data.Name}</dd>
            </div>
            <div>
                <dt class="key">Deploying country: </dt>
                <dd class="value">${test.Location.Country}</dd>
            </div>
            <div>
                <dt class="key">Deployed region: </dt>
                <dd class="value">${test.Location.Region}</dd>
            </div>
            <div>
                <dt class="key">Purpose: </dt>
                <dd class="value">${test.Data.Purpose}</dd>
            </div>
            <div>
                <dt class="key">Type: </dt>
                <dd class="value">${test.Data.Type}</dd>
            </div>
            <div>
                <dt class="key">Yeild: </dt>
                <dd class="value">lower ${test.Data.Yeild.Lower}, upper ${test.Data.Yeild.Upper}</dd>
            </div>
            <div>
                <dt class="key">Magnitude: </dt>
                <dd class="value">Body ${test.Data.Magnitude.Body}, Surface ${test.Data.Magnitude.Surface}</dd>
            </div>
            <div>
                <dt class="key">Date: </dt>
                <dd class="value">${test.Date.Day}-${test.Date.Month}-${test.Date.Year}</dd>
            </div>
            <div>
                <dt class="key">Coordinates: </dt>
                <dd class="value">Lat ${test.Location.Cordinates.Latitude}, Long ${test.Location.Cordinates.Longitude}</dd>
            </div>
        </dl>`

            marker.bindPopup((html), {
                className: 'leaflet-popup'
            });

            marker.bindTooltip(html); // displays a tooltip when hovering on a marker

            clusters.addLayer(marker);

        })
        map.addLayer(clusters)
    }


    /**
     * The function `renderAllData` fetches data and then renders it, handling any errors that occur.
     */
    function renderAllData() {
        fetchData().then(allData => {
            renderData(allData);
        })
            .catch(error => {
                console.error("Error is: " + error);
            });
    }


    /**
     * The function filters data based on selected checkboxes and returns the filtered data.
     * @returns the filteredData array.
     */
    async function filterData() {

        const checkBoxes = document.querySelectorAll(".input");
        let valuesArray = [];
        const filteredData = [];

        checkBoxes.forEach(box => {
            if (box.checked) {
                valuesArray.push(box.value);
            }
        });

        try {
            const dataToFilter = await fetchData();
            dataToFilter.forEach(entry => {
                if (valuesArray.includes(entry.Location.Country)) {
                    filteredData.push(entry);
                }
            });
        } catch (error) {
            console.error("Error is: " + error);
        }
        return filteredData;
    }

const btnGo = document.getElementById("btn-go");

    btnGo.addEventListener("click", async () => {
        try {
            const filteredData = await filterData();
            renderData(filteredData);
        } catch (error) {
            console.error("Error is: " + error);
        }

        btnGo.disabled = true;
        setTimeout(function() {
            btnGo.disabled = false;
        }, 3000);
    });

    window.onload = () => {
        renderAllData();
    }
}

main();