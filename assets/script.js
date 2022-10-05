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

var futureDate = document.getElementById("future-date");
var futureTemperature = document.getElementById("future-temperature");
var futureWindSpeed = document.getElementById("future-wind-speed");
var futureHumidity = document.getElementById("future-humidity");



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

// Five day display
function getFiveDayForecast(data) {
    console.log(data)
    console.log(data.daily[1])

    var futureForecast = document.getElementById("future-forecast");

    for (let i = 1; i < 6; i++) {
        var averageTemperature = data.daily[i].temp.day;
        var averageWindSpeed = data.daily[i].wind_speed;
        var averageHumidity = data.daily[i].humidity;

        var date = moment().add(+i, 'days').format('DD-MM-YYYY');
        console.log(date)

        var dailyWeather = document.createElement("div");
        dailyWeather.classList.add("day-card");
        futureForecast.append(dailyWeather);

        var todayWeather = document.createElement("h3");
        todayWeather.setAttribute("id", "futureDate");
        dailyWeather.append(todayWeather)
        todayWeather.innerHTML = date;

        var todayWeatherIcon = document.createElement("img");
        todayWeatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
        dailyWeather.append(dayWeatherIcon);

        var todayTemperature = document.createElement("p");
        todayTemperature.setAttribute("id", "futureTemperature");
        dailyWeather.append(todayTemperature);
        todayTemperature.innerHTML = "Temperature: " + averageTemperature + "°C";

        var todayWindSpeed = document.createElement("p");
        todayWindSpeed.setAttribute("id", "futureWindSpeed");
        dailyWeather.append(todayWindSpeed);
        todayWindSpeed.innerHTML = "Wind Speed: " + averageWindSpeed + "km/h";

        var todayHumidity = document.createElement("p");
        todayHumidity.setAttribute("id", "futureHumidity");
        dailyWeather.append(todayHumidity);
        todayHumidity.innerHTML = "Humidity: " + averageHumidity + "%";
    }
}

// UV index colour
function getUVIndex(latitude, longitude) {
    let uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude;
    fetch(uvURL)
        .then(function(index) {
            index.json().then(function(data) {

                if (data.value < 4) {
                    currentUVIndex.setAttribute("id", "green-UV");
                } else if (data.value < 8) {
                    currentUVIndex.setAttribute("id", "yellow-UV");
                } else {
                    currentUVIndex.setAttribute("id", "red-UV");
                }

                currentUVIndex.innerHTML = data.value;
            })
        })
}

// Save to local storage
function saveCity(cityName) {
    var localStoreCity = localStorage.getItem("cityNames");

    var arrayCity;
    if (!localStoreCity) {
        arrayCity = [];
    };

    arrayCity.push(cityName);

    var cityString = JSON.stringify(arrayCity)
    window.localStorage.setItem("cityNames", cityString);
    if (arrayCity.length === 0) {
        console.log("Search a city to start!")
        searchHistory.innerHTML = ""
    } else {
        for (var i = 0; i < arrayCity.length; i++) {
            var historyBtn = document.createElement("button");
            historyBtn.classList.add("history-city-btn")
            historyBtn.value = arrayCity;
            historyBtn.textContent = arrayCity[i];
            searchHistory.append(historyBtn);
            historyBtn.addEventListener("click", function(event) {
                getCity(event.target.textContent)
            })
        }
    }
};