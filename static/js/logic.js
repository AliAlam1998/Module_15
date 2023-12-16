var earthquakeDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Use D3 to fetch earthquake data
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson', function (data) {
    // Process data and create markers
    // You'll need to iterate through the data and create L.circleMarker for each earthquake
    // Adjust marker size and color based on magnitude and depth
    // Add popups with additional information

    // Example:
    data.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const magnitude = feature.properties.mag;
        const depth = coordinates[2];

        // Create a circle marker
        const marker = L.circleMarker([coordinates[1], coordinates[0]], {
            radius: magnitude * 2,
            color: getColor(depth),
            fillOpacity: 0.8
        }).addTo(map);

        // Add a popup
        marker.bindPopup(`<b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth}`);
    });
});
// Function to get color based on depth
function getColor(depth) {
    // You need to implement logic to determine color based on depth
    // For simplicity, let's use a linear scale for demonstration purposes
    const maxDepth = 700; // Maximum depth in the dataset
    const scale = d3.scaleLinear().domain([0, maxDepth]).range([0, 1]);
    const colorValue = scale(depth);
    // Use a color scale of your choice, for example, from light to dark blue
    return `rgb(0, 0, ${Math.round(colorValue * 255)})`;
}

// Create legend
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const depthValues = [0, 100, 300, 500, 700]; // Depth intervals, adjust as needed
    div.innerHTML += '<b>Depth Legend</b><br>';
    for (let i = 0; i < depthValues.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depthValues[i] + 1) + '"></i> ' +
            depthValues[i] + (depthValues[i + 1] ? '&ndash;' + depthValues[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(map);
