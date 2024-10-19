const COORDS_LS = "coords";

const API_KEY = "d6f2689e6eaf6785ebf5e4883c8ad7bc";

const weatherContainer = document.querySelector(".js-weather");

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const weatherDescription = json.weather[0].description;
      const weatherIcon = json.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      // Форматированный вывод с иконкой и описанием
      weatherContainer.innerHTML = `
        <div style="display: flex; align-items: center;">
          <img src="${iconUrl}" alt="${weatherDescription}" style="margin-right: 10px;" />
          <div>
            <span style="font-size: 24px; font-weight: bold;">${temperature}°C</span> 
            <span>in ${place}</span>
            <p style="margin: 5px 0 0;">${weatherDescription}</p>
          </div>
        </div>
      `;
    });
}

function saveCoords(positionObject) {
  localStorage.setItem(COORDS_LS, JSON.stringify(positionObject));
}

function geoSuccesHandler(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const positionObject = {
    latitude,
    longitude,
  };

  saveCoords(positionObject);
  getWeather(latitude, longitude);
}

function geoErrorHandler() {
  console.log("error");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(geoSuccesHandler, geoErrorHandler);
}

function getCoords() {
  const coords = localStorage.getItem(COORDS_LS);

  if (coords === null) {
    askForCoords();
  } else {
    const loadedCoords = JSON.parse(coords);

    getWeather(loadedCoords.latitude, loadedCoords.longitude);
  }
}

function init() {
  getCoords();
}

init();
