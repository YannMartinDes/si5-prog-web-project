import L from "leaflet";

var gasStationIcon = L.icon({
        iconUrl: '../assets/gasMarker.png',
        
        iconSize:     [60, 60], // size of the icon
        iconAnchor:   [18, 14], // point of the icon which will correspond to marker's location
        popupAnchor:  [13, -5] // point from which the popup should open relative to the iconAnchor
});

export default gasStationIcon;