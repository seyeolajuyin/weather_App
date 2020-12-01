

const weather = {}


weather.temperature = {
    unit: "celsius"
}


const KELVIN = 273

const key = "1fdce5f321b351c349dfdae9c9808e61"


if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else {
    notificationElement.style.display = "block"
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>"
}


function setPosition(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    getWeather(latitude, longitude)
}


function showError(error) {
    notificationElement.style.display = "block"
    notificationElement.classList.add("shadow")
    notificationElement.innerHTML = `<p> ${error.message}</p>`
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        let data = response.json()
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN)
        weather.description = data.weather[0].description
        weather.iconId =  data.weather[0].icon
        weather.city = data.name
        weather.country = data.sys.country

        
    })
    .then(function(){
        displayWeather();
    })
} 


function displayWeather() {
    iconElement.innerHTML = `<img
    class="img-fluid img-icon"
    src="./src/png/${weather.iconId}.png"
    alt="weather-icon"
    srcset=""
  />`;
  
  tempElement.innerHTML = `${weather.temperature.value} &deg <span>C</span>`
  descriptionElement.innerHTML =  weather.description
  locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

