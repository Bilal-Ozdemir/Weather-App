const weatherForm = document.querySelector(".weatherForm");
const cityEntered = document.querySelector(".cityEntered");
const box = document.querySelector(".box");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityEntered.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            errorDisplay(error);
        }
    } else {
        errorDisplay("Please enter a city!!");
    }
});

async function getWeatherData(city) {
    const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
        throw new Error("Could not fetch weather data!");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    box.textContent = "";
    box.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `Description: ${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("emojiDisplay");

    box.appendChild(cityDisplay);
    box.appendChild(tempDisplay);
    box.appendChild(humidityDisplay);
    box.appendChild(descDisplay);
    box.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "⁉️";
    }
}



function errorDisplay (message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    box.textContent = "";
    box.style.display = "flex";
    box.appendChild(errorDisplay);
}



