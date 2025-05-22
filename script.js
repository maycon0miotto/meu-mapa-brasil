const map = document.getElementById('map');
const userDot = document.getElementById('user-location');

const mapWidth = 2235;
const mapHeight = 2122;
const lonMin = -73.99;
const lonMax = -33.75;
const latMin = -33.75;
const latMax = 5.27;

function latLonToXY(lat, lon) {
  const x = ((lon - lonMin) / (lonMax - lonMin)) * mapWidth;
  const y = ((latMax - lat) / (latMax - latMin)) * mapHeight;
  return { x, y };
}

function updateUserLocation(lat, lon) {
  const coords = latLonToXY(lat, lon);
  userDot.style.left = `${coords.x}px`;
  userDot.style.top = `${coords.y}px`;
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition((pos) => {
    updateUserLocation(pos.coords.latitude, pos.coords.longitude);
  }, (err) => {
    console.error('Erro ao obter localização:', err);
  }, {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 10000
  });
} else {
  alert('Geolocalização não suportada.');
}
