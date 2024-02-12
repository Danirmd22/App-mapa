let map;
let marker;
let savedLocation;
let history = [];
 
function initMap() {
    map = L.map("map");
 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latlng = [position.coords.latitude, position.coords.longitude];
            map.setView(latlng, 13);
 
            marker = L.marker(latlng, { draggable: true }).addTo(map);
            marker.on("dragend", updateDistance);
            savedLocation = latlng;
            updateInfoPanel();
        }, () => {
            alert("No se pudo obtener la ubicación actual.");
        });
    } else {
        alert("Geolocalización no soportada por este navegador.");
    }
}
 
function updateDistance() {
    if (!savedLocation) return;
 
    const currentPos = marker.getLatLng();
    const distance = savedLocation.distanceTo(currentPos);
    document.getElementById("distance").textContent = `Distancia al coche: ${distance.toFixed(2)} metros`;
}
 
function saveLocation() {
    const currentPos = marker.getLatLng();
    savedLocation = currentPos;
    const name = prompt("Introduce un nombre para la ubicación:");
    const time = new Date().toLocaleTimeString();
    const location = {
        name: name || "Ubicación guardada",
        position: savedLocation,
        time: time
    };
    history.push(location);
    updateInfoPanel();
    alert("Ubicación guardada correctamente.");
}
 
function clearLocation() {
    savedLocation = null;
    document.getElementById("location-name").textContent = "Nombre de la ubicación";
    document.getElementById("distance").textContent = "Distancia al coche: --";
    document.getElementById("time").textContent = "Tiempo transcurrido: --";
}
 
function updateInfoPanel() {
    const currentPos = marker.getLatLng();
    document.getElementById("location-name").textContent = "Nombre de la ubicación";
    document.getElementById("distance").textContent = `Distancia al coche: ${savedLocation.distanceTo(currentPos).toFixed(2)} metros`;
    document.getElementById("time").textContent = `Tiempo transcurrido: ${new Date().toLocaleTimeString()}`;
}
 
function showHistory() {
    let historyString = "Historial de ubicaciones:\n\n";
    history.forEach((location, index) => {
        historyString += `${index + 1}. ${location.name} - ${location.time}\n`;
    });
    alert(historyString);

}


 
document.getElementById("save-location").addEventListener("click", saveLocation);
document.getElementById("clear-location").addEventListener("click", clearLocation);
document.getElementById("show-history").addEventListener("click", showHistory);


 
initMap(); // Llamamos a la función para inicializar el mapa cuando la página cargue