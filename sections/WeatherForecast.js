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

      // Avem nevoie de un obiect in care sa grupam predictiile pe zile:
      const daysMap = {};

      // Iteram prin cele 40 de predictii primite de la server.
      list.forEach((element) => {
        // Extragem data predictiei.
        const { dt } = element;
        // getDayOfTheWeek este creata de noi, in utils/date.
        const day = getDayOfTheWeek(dt);
        // Daca deja avem ziua saptamanii in obiect, ii aduagam o noua predictie.
        if (daysMap[day]) {
          daysMap[day].push(element);
          // Altfel, adaugam ziua saptamanii in obiect, alaturi de noua predictie.
        } else {
          daysMap[day] = [element];
        }
      });

      // Parcurgem cu for...in continutul obiectului daysMap. Cheile sunt zilele saptamanii pentru care avem predictii.
      for (key in daysMap) {
        // Afisam ziua saptamanii pe ecran.
        weatherForecastContainer.innerHTML += `<h3 class="text-primary">${key}</h3>`;
        // Pentru fiecare zi a saptamanii, extragem predictiile asociate si iteram prin ele.
        days = daysMap[key];
        days.forEach((element) => {
          // Pentru fiecare element (predictie), extragem datele de interes.
          const { dt, main, weather } = element;
          // getHour este creata de noi, in utils/date.
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
            <div class="weather-forecast-box w-100 d-flex justify-content-between align-items-center border rounded p-3 mb-3">
              <div>${hour}</div>
              <div><img src="${weatherIcon}" alt="" /></div>
              <div class="fs-3"><strong>${temperature}°C</strong></div>
              <div>${weatherDescription}</div>
              <div class="real-feel">Real feel: <strong>${realFeel}°C</strong></div>
            </div>
          `;
        });
      }
    });
}
