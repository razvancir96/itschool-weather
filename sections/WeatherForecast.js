// Declararea functiei pentru afisarea predictiei pe 5 zile. Apelul se face in alte fisiere.
function displayWeatherForecast(city) {
  // Generam link-ul serverului, pe baza orasului.
  const forecastEndpoint = getForecastEndpoint(city);

  // Inainte sa facem cererea catre server si sa afisam noile informatii, le stergem de pe ecran pe cele vechi.
  let weatherForecastContainer = document.querySelector(".weather-forecast");
  weatherForecastContainer.innerHTML = "";

  fetch(forecastEndpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Din datele venite, ne intereseaza doar list, care e un array.
      const { list } = data;

      // Iteram prin list.
      list.forEach((element) => {
        // Pentru fiecare element, extragem datele de interes.
        const { dt, main, weather } = element;
        // getDayOfTheWeek si getHour sunt creata de noi, in utils/date.
        const day = getDayOfTheWeek(dt);
        const hour = getHour(dt);
        // Rotunjim temperaturile.
        const temperature = Math.round(main.temp);
        const realFeel = Math.round(main.feels_like);
        // Atentie! weather este un array, cu un singur element.
        const weatherDescription = weather[0].description;
        // getWeatherIcon este creata de noi, in utils/weather.
        const weatherIcon = getWeatherIcon(weather[0].icon);

        // Afisam pe ecran informatiile extrase din API.
        weatherForecastContainer.innerHTML += `
          <div class="weather-forecast-box w-100 d-flex justify-content-between align-items-center">
            <div>
              <div><strong>${day}</strong></div>
              <div>${hour}</div>
            </div>
            <div><img src="${weatherIcon}" alt="" /></div>
            <div><strong>${temperature}°</strong></div>
            <div>${weatherDescription}</div>
            <div>Real feel: ${realFeel}</div>
          </div>
        `;
      });

    });
}
