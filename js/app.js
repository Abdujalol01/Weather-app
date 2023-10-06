const changeLocation = document.getElementById("change-location");
const card = document.getElementById("card");
const details = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");
const overlay = document.getElementById("overlay");

// Loading
function loader(state) {
  if (state) {
    overlay.classList.remove("d-none");
  } else {
    overlay.classList.add("d-none");
  }
}

// Focus
changeLocation.city.focus();

// UpdateUi
const updateUi = (cityName) => {
  console.log(cityName);
  const { name, sys, weather, main } = cityName;
  details.innerHTML = `
  <h5 class="mb-3">${name} ${sys.country}</h5>
  <p class="mb-3">${weather[0].description}</p>
  <div class="display-4 mb-3">
    <span>${Math.round(main.temp)}</span>
    <span>&deg;C</span>
  `;
  // card visibility
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  // card img
  weatherIcon.src = `
  https://openweathermap.org/img/wn/${weather[0].icon}.png`;
};

// Get weather
const getWeather = async (city) => {
  const data = await getData(city);
  return data;
};

// location
changeLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = changeLocation.city.value.trim();
  changeLocation.reset();
  getWeather(cityName).then((data) => updateUi(data));
});
