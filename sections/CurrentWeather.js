// Declararea functiei pentru afisarea vremii curente. Apelul se face in alte fisiere.
function displayCurrentWeather(city) {
  // Generam link-ul serverului, pe baza orasului.
  const currentWeatherEndpoint = getCurrentWeatherEndpoint(city);

  fetch(currentWeatherEndpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Extragem proprietatile care ne intereseaza.
      const { name, dt, main, weather, wind } = data;
      // getDayOfTheWeek si getHour sunt creata de noi, in utils/date.
      const day = getDayOfTheWeek(dt);
      const hours = getHour(dt);
      // Rotunjim temperaturile.
      const temperature = Math.round(main.temp);
      const realFeel = Math.round(main.feels_like);
      // Atentie! weather este un array, cu un singur element.
      const weatherDescription = weather[0].description;
      // getWeatherIcon si windToKmPerHour sunt create de noi, in utils/weather.
      const weatherIcon = getWeatherIcon(weather[0].icon);
      const windSpeed = Math.round(windToKmPerHour(wind.speed));

      // Afisam pe ecran informatiile extrase din API.
      let currentWeatherContainer = document.querySelector(".current-weather");
      currentWeatherContainer.innerHTML = `
        <div class="px-3">
          <div class="fs-2 mb-2"><strong>${name}</strong></div>
          <div class="fs-4"><strong>${day}</strong>, ${hours}</div>
          <div class="d-flex align-items-center justify-content-center">
            <strong class="fs-1">${temperature}°C</strong>
            <img src="${weatherIcon}" />
          </div>
        </div>
        <div class="px-3">
          <p class="fs-5">Real feel: <strong>${realFeel}°C</strong></p>
          <p class="fs-5 text-capitalize">${weatherDescription}</p>
          <p class="fs-5">Vânt: <strong>${windSpeed} km/h</strong></p>
        </div>
      `;
    });
}
