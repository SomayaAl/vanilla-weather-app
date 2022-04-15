function displayTemperature(response) {}

let apiKey = "7d81cb66d2a78969cfec2f704335508f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
