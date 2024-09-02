const apiKey = "bc0916fe8a52be3050729e78d9527eae";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Corrected URL

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather_icon");
const card = document.querySelector(".card"); // Reference to the card for 3D effect

// =====================================================
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  if (response.ok) {
    // Update the DOM with fetched data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C"; // Capitalized C for Celsius
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    if (data.weather[0].main == "Clouds") {
      weather_icon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weather_icon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weather_icon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weather_icon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weather_icon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
  } else {
    // Handle error when city is not found
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";
    weather_icon.src = "images/no.png";
    weather_icon.style.width = "150px";
    weather_icon.style.height = "150px";
    weather_icon.style.marginBottom = "1.5rem";
  }
}

// Function to perform the search
function performSearch() {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name");
  }
}

// Event listener for the search button
searchBtn.addEventListener("click", performSearch);

// Event listener for the Enter key press
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

// Function to handle 3D effect on card
function handle3DEffect(e) {
  const { clientX: x, clientY: y } = e;
  const { innerWidth: width, innerHeight: height } = window;

  // Calculate rotation angles based on cursor position
  const rotateX = (y / height - 0.5) * 20; // Adjust 20 for strength of tilt
  const rotateY = (x / width - 0.5) * -20; // Adjust -20 for strength of tilt

  // Apply the transform to the card
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// Event listener for mouse movement
document.addEventListener("mousemove", handle3DEffect);

// Reset the card to its default position when cursor leaves
document.addEventListener("mouseleave", () => {
  card.style.transform = `rotateX(0deg) rotateY(0deg)`;
});
