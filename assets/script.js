var apiKey = "74b589766e2c1c1f69016c5e5740ff80";

var searchField = document.getElementById("search-field");
var searchBtn = document.getElementById("search-btn");
var searchHistory = document.getElementById("search-history")

var cityName = document.getElementById("city-name");
var dayOfWeek = document.getElementById("day-of-week");
var forecastIcon = document.getElementById("forecast-icon");
var temperature = document.getElementById("temperature");
var uvIndex = document.getElementById("uv-index");
var windSpeed = document.getElementById("wind-speed");
var humidity = document.getElementById("humidity");



var todaysDate = moment().format("MMM Do, YYYY");

// Load the page
function pageinit() {
    getPrevCities()
}

// Search button listener
searchBtn.addEventListener('click', function() {
    getCity(cityName.value)
    event.preventDefault();
})

// Connect search to API
function displayCityData(data) {
    var searchCityName = data.name;
    var cityTemperature = data.main.temperature;
    var cityWindSpeed = data.wind.speed;
    var cityHumidity = data.main.humidity;
    var longitude = data.coord.lon;
    var latitude = data.coord.lat;

    cityName.innerHTML = searchCityName;
    temperature.innerHTML = cityTemperature + "°C";
    windSpeed.innerHTML = cityWindSpeed + "km/h";
    humidity.innerHTML = cityHumidity + "%";
    dayOfWeek.innerHTML = todaysDate;

    var cityForecastIcon = document.createElement("img");
    cityForecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
    forecastIcon.appendChild(cityForecastIcon);

    getFiveDayCity(latitude, longitude);
    getUVIndex(latitude, longitude);
}

// Five day forecast from API
function getFiveDayCity(latitude, longitude) {
    let apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=current,minutely,hourly,alerts&units=metric&appid=" + apiKey
    fetch(apiURL)
        .then(function(response) {
            response.json().then(function(data) {
                getFiveDayForecast(data);
            })
        });
}