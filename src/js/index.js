(() => {
  function onGeolocateSuccess(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    showMap(latitude, longitude);
  }

  function onGeolocateError(error) {
    console.warn(error.code, error.message);
    if (error.code === 1) {
      console.log('User declined geolocation');
    } else if (error.code === 2) {
      console.log('Geolocation position unavailable');
    } else if (error.code === 3) {
      console.log('Timeout determining geolocation');
    }
  }

  function onLocationChange(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    console.log('changed coordinates', latitude, longitude);
  }

  function geolocate() {
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
    }
  }

  function watchLocation() {
    // TODO: why can't I trigger another watch
    if (window.navigator && window.navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(onLocationChange, onGeolocateError);
      window.localStorage.setItem('lastWatch', watchId);
    }
  }

  function clearWatch() {
    if (window.navigator && window.navigator.geolocation) {
      const watchId = window.localStorage.getItem('lastWatch');
      console.log('watchId', watchId);
      navigator.geolocation.clearWatch(watchId);
    }
  }

  function showMap(latitude, longitude) {
    const $map = document.getElementById('map');
    const img = new Image();
    img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=13&size=300x300&sensor=false&markers=color:blue|' + latitude + ',' + longitude;

    // Remove the old maps
    while ($map.firstChild) {
      $map.removeChild($map.firstChild);
    }
    $map.appendChild(img);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $geolocateButton = document.getElementById('geolocation-button');
    const $watchButton =  document.getElementById('watch-button');
    const $clearWatchButton = document.getElementById('clear-watch-button');
    $geolocateButton && $geolocateButton.addEventListener('click', geolocate);
    $watchButton && $watchButton.addEventListener('click', watchLocation);
    $clearWatchButton && $clearWatchButton.addEventListener('click', clearWatch);
  });
})();
