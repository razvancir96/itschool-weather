// Primim o valoare reprezentand m/s si returnam km/h.
function windToKmPerHour(meterPerSec) {
  return (meterPerSec * 3600) / 1000;
}

// Pe baza codului iconitei, generam link-ul acesteia.
function getWeatherIcon(iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
