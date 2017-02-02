(() => {
  function onSuccess(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    console.log('coordinates', latitude, longitude);
  }

  function onError(error) {
    console.warn(error.code, error.message);
    if (error.code === 1) {
      console.log('User declined geolocation');
    } else if (error.code === 2) {
      console.log('Geolocation position unavailable');
    } else if (error.code === 3) {
      console.log('Timeout determining geolocation');
    }
  }

  function geolocate() {
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }

  geolocate();
})();
