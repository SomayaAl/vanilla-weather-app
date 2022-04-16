function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatSunrise(timestamp) {
  let date = new Date(timestamp);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function formatSunset(timestamp) {
  let date = new Date(timestamp);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let dateElement = document.querySelector("#date-time");
  let descriptionElement = document.querySelector("#weather-description");
  let highElement = document.querySelector("#high-temp");
  let lowElement = document.querySelector("#low-temp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  sunriseElement.innerHTML = formatSunrise(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatSunset(response.data.sys.sunset * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-text-input");
  search(cityInputElement.value);
}

function search(city) {
  let apiKey = "7d81cb66d2a78969cfec2f704335508f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
         <div class="col">
            <div class="weather-forecast-date">Monday</div> 
            <img src="http://openweathermap.org/img/wn/10d@2x.png" id="icon" width="60" />
            <div class="weather-forecast-temperature">
                <span class="weather-forecast-temp-max">75</span>
                <span class="weather-forecast-temp-min">18</span>
                 <span class="units">°F | °C</span>
             </div>
        </div>`;
  forecastHTML =
    forecastHTML +
    `
         <div class="col">
            <div class="weather-forecast-date">Monday</div> 
            <img src="http://openweathermap.org/img/wn/10d@2x.png" id="icon" width="60" />
            <div class="weather-forecast-temperature">
                <span class="weather-forecast-temp-max">75</span>
                <span class="weather-forecast-temp-min">18</span>
                 <span class="units">°F | °C</span>
             </div>
        </div>`;
  forecastHTML =
    forecastHTML +
    `
         <div class="col">
            <div class="weather-forecast-date">Monday</div> 
            <img src="http://openweathermap.org/img/wn/10d@2x.png" id="icon" width="60" />
            <div class="weather-forecast-temperature">
                <span class="weather-forecast-temp-max">75</span>
                <span class="weather-forecast-temp-min">18</span>
                 <span class="units">°F | °C</span>
             </div>
        </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#farhenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Washington D.C.");
displayForecast();
