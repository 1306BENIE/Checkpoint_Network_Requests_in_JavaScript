const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

const apiKey = "d0fb5762bff1524b7caddb5bb8374b59";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";


// Fonction pour récupérer les données météo
const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=fr`);

        if (!response.ok) {
            throw new Error("Ville introuvable");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
};

// Fonction pour afficher les données dans le DOM
const displayWeather = (data) => {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `🌡 Température : ${data.main.temp}°C`;
    descriptionElement.textContent = `🌥️ Condition : ${data.weather[0].description}`;

    // Affiche les résultats
    weatherResult.classList.remove("hidden"); 
};

// Gestion de l'événement sur le bouton de recherche
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Veuillez entrer une ville !");
    }
});
