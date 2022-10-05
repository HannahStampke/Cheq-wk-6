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
