(() => {
  if (!window.navigator || !window.navigator.geolocation) {
    alert('Your browser doesn\'t support geolocation!');
    return;
  }

  function geolocate() {
    navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
  }

  function onGeolocateSuccess(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    showMap(latitude, longitude);
  }

  function onGeolocateError(error) {
    console.log(error.code, error.message);

    if (error.code === 1) {
      console.log('User declined geolocation');
    } else if (error.code === 2) {
      console.log('Geolocation position unavailable');
    } else if (error.code === 3) {
      console.log('Timeout determining geolocation');
    }
  }

  function watchLocation() {
    const watchId = navigator.geolocation.watchPosition(onLocationChange, onGeolocateError);
    window.localStorage.setItem('lastWatch', watchId);
    console.log('Set watchId', watchId);
  }

  function onLocationChange(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    console.log('Changed coordinates: ', latitude, longitude);
  }

  function clearWatch() {
    const watchId = window.localStorage.getItem('lastWatch');
    navigator.geolocation.clearWatch(watchId);
    console.log('Cleared watchId: ', watchId);
  }

  function showMap(lat, lng) {
    const $map = document.getElementById('map');
    const position = { lat, lng };
    window.map = new google.maps.Map($map, {
      center: position,
      zoom: 6
    });
    window.markers = window.markers || [];
    const marker = new google.maps.Marker({ map, position });
  }

  function hideMap() {
    const $map = document.getElementById('map');
    $map.innerHTML = '';
  }

  const mockMuseumResponse = [
    {
      id: 1,
      name: "Altes Museum",
      lat: 52.5195,
      lng:13.3987
    },
    {
      id: 2,
      name: "Berlin Wall Memorial",
      lat: 52.4861,
      lng: 13.4720
    },
    {
      id: 3,
      name: "DDR Museum",
      lat: 52.5196,
      lng: 13.4027
    },
    {
      id: 4,
      name: "Gemäldegalerie",
      lat: 51.0534,
      lng: 13.7347
    }
  ];

  function showNearbyMuseums() {
    if (!window.map || !window.markers) { return; }

    mockMuseumResponse.forEach((museum) => {
      const { lat, lng, name } = museum;
      const position = { lat, lng };
      const title = name;
      const marker = new google.maps.Marker({ map, position, title });
      window.markers.push(marker);
    });
  }

  window.enableButtons = () => {
    const $geolocateButton = document.getElementById('geolocation-button');
    const $watchButton =  document.getElementById('watch-button');
    const $clearWatchButton = document.getElementById('clear-watch-button');
    const $showNearbyButton = document.getElementById('show-nearby-button');

    $geolocateButton.disabled = false;
    $watchButton.disabled = false;
    $clearWatchButton.disabled = false;
    $showNearbyButton.disabled = false;

    console.log('Google Maps API loaded');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $geolocateButton = document.getElementById('geolocation-button');
    const $watchButton =  document.getElementById('watch-button');
    const $clearWatchButton = document.getElementById('clear-watch-button');
    const $showNearbyButton = document.getElementById('show-nearby-button');

    $geolocateButton.addEventListener('click', geolocate);
    $watchButton.addEventListener('click', watchLocation);
    $clearWatchButton.addEventListener('click', clearWatch);
    $showNearbyButton.addEventListener('click', showNearbyMuseums);
  });
})();
