const geoLocation = $('.location');
const body = $('body');
const wrapper = $('.wrapper');
const temp = $('.temp');
const humidity = $('.humidity');
const weather = $('.weather');
const wind = $('.wind');
const icon = $('.icon');
const button = $('#fahr');
const tempText = $('.cels');
const tempIcon = $('.fa');


function getWeather(lat, long){
  let url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;
  $.getJSON(url, data => {
    icon.attr('src', data.weather[0].icon);
    geoLocation.text(data.name);
    humidity.text(data.main.humidity);
    temp.text(Math.round(data.main.temp));
    wind.text(data.wind.speed);
    weather.text(data.weather[0].main);

    
    if (data.main.temp <= 3) {
      body.css({backgroundImage: "url('https://i.imgur.com/et130z3.jpg')"})
      tempIcon.removeClass();
      tempIcon.addClass('fa fa-thermometer-empty');
    } else if (data.main.temp > 3 && data.main.temp <= 20) {
      body.css({backgroundImage: "url('https://i.imgur.com/q6u0fUE.jpg')"})
      tempIcon.removeClass();
      tempIcon.addClass('fa fa-thermometer-half');
    } else {
      body.css({backgroundImage: "url('https://i.imgur.com/WgfjbWX.jpg')"})
      tempIcon.removeClass();
      tempIcon.addClass('fa fa-thermometer-full');
    }
  });
}

function getGeo () {
  navigator.geolocation.getCurrentPosition(position);
}

function position(coords) {
    lat = coords.coords.latitude;
    long = coords.coords.longitude;
    getWeather(lat, long);
}

button.on('click', (e) => {
  if (button.text() === '°C') {
    temp.text(Math.round((temp.text() - 32) /1.8));
    button.text('°F');
    tempText.text('°C');
  } else {
    temp.text(Math.round((temp.text() * 1.8) + 32));
    button.text('°C');
    tempText.text('°F');
  }
})

$('document').ready(()=>{
  getGeo();
})
