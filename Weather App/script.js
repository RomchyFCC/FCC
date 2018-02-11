//const geoLocation = $('.location');
//console.log(geoLocation);
const body = $('body');

function getWeather(lat, long){
  let url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;
  $.getJSON(url, data => {
    let icon = data.weather[0].icon;
    console.log('geo location '+data.name);
    console.log('humidity '+data.main.humidity);
    console.log('pressure '+data.main.pressure);
    currentTemp = data.main.temp;
    console.log('max temp '+data.main.temp_max);
    console.log('min temp '+data.main.temp_min);
    console.log('wind speed ' + data.wind.speed);
    console.log('weather '+data.weather[0].main);
    console.log('weather description '+data.weather[0].description);
    if (currentTemp <= 3) {
      body.css({backgroundImage: "url('https://i.imgur.com/et130z3.jpg')"})
    } else if (currentTemp > 3 && currentTemp <= 20) {
      body.css({backgroundImage: "url('https://i.imgur.com/q6u0fUE.jpg')"})
    } else {
      body.css({backgroundImage: "url('https://i.imgur.com/WgfjbWX.jpg')"})
    }
  });
}

function getGeo () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position);
  } else { 
    //sample.innerHTML = "Geolocation is not available.";
  }
}

function position(coords) {
  lat = coords.coords.latitude;
  long = coords.coords.longitude;
  getWeather(lat, long);
}

$('document').ready(()=>{
  getGeo();
})