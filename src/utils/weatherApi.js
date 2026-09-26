import { apiKey, coordinates } from "./constants";

// Resolves with the browser's location, or the default coordinates if the
// user declines, the browser doesn't support it, or it takes too long.
export function getUserCoordinates() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(coordinates);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lon: coords.longitude }),
      () => resolve(coordinates),
      { timeout: 10000, maximumAge: 30 * 60 * 1000 }
    );
  });
}

export function getWeatherData({ lat, lon } = coordinates) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error from weather API: ${res.status}`);
  });
}

export function parseWeatherData(data) {
  const parsedData = {};
  parsedData.city = data.name;
  parsedData.temperature = {};
  parsedData.temperature.F = Math.round(data.main.temp);
  parsedData.temperature.C = Math.round(((data.main.temp - 32) * 5) / 9);
  parsedData.dt = data.dt;
  parsedData.sys = data.sys;
  parsedData.weather = data.weather;
  return parsedData;
}

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
}
