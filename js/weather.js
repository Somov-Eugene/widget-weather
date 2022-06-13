"use strict";

const weatherBlock = document.getElementById("weather");

const showWeather = (data) => {
  const city = data.name;
  const weatherStatus = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;
  const weatherIconAlt = data.weather[0].main;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;

  const template = `
    <div class="weather__header">
      <div class="weather__main">
        <h2 class="weather__city">${city}</h2>
        <p class="weather__status">${weatherStatus}</p>
      </div>
      <div class="weather__icon">
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" width="50" height="50" alt="${weatherIconAlt} icon">
      </div>
    </div>
    <div class="weather__body">
      <p class="weather__temp"><span class="visually-hidden">Temperature: </span>${temp}</p>
      <p class="weather__feels-like">Feels like: <span>${feelsLike}</span></p>
      <p class="weather__humidity">Humidity: <span>${humidity}</span></p>
      <p class="weather__pressure">Pressure: <span>${pressure}</span></p>
    </div>
  `;

  weatherBlock.innerHTML = template;
};

const showError = (message) => {
  weatherBlock.innerHTML = `<p class="weather__error">${message}</p>`;
};

const loaderWeather = async (latitude = "55.7522", longitude = "37.6156") => {
  const units = "metric";
  const language = "en";
  const API_KEY = "5c52978c6bfd04742715a7e3df6cf6f4"; // unactive
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${language}&appid=${API_KEY}`;

  const response = await fetch(URL, { method: "GET" });
  const responseResult = await response.json();

  response.ok ? showWeather(responseResult) : showError(responseResult.message);
};

if (weatherBlock) {
  // CITY: Moscow
  const latitude = "55.7522";
  const longitude = "37.6156";

  loaderWeather(latitude, longitude);
}
