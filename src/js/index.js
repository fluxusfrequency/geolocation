function geolocate() {
  if (window.navigator && window.navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(() => {
      console.log('success');
    }, () => {
      console.log('error');
    });
  }
}

geolocate();
