// Declararea functiei pentru afisarea vremii curente. Apelul se face in alte fisiere.
function displayCurrentWeather() {
  // Generam link-ul serverului, pe baza orasului.
  const currentWeatherEndpoint = getCurrentWeatherEndpoint("București");

  fetch(currentWeatherEndpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
